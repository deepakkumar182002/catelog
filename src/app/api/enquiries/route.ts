import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "@/lib/db";
import { Enquiry } from "@/models/Enquiry";
import { getSessionAdmin } from "@/lib/auth";
import { sendEnquiryNotificationEmail } from "@/lib/email";

// In-memory rate limiting map (IP -> timestamp array)
const rateLimitMap = new Map<string, number[]>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute
  const maxRequests = 5;

  const timestamps = rateLimitMap.get(ip) || [];
  const validTimestamps = timestamps.filter((t) => now - t < windowMs);

  if (validTimestamps.length >= maxRequests) {
    return false;
  }

  validTimestamps.push(now);
  rateLimitMap.set(ip, validTimestamps);
  return true;
}

const enquirySchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email address is required"),
  phone: z.string().min(6, "Phone number is required"),
  company: z.string().optional().default(""),
  city: z.string().optional().default(""),
  requirementType: z.string().default("Commercial / Bulk Order"),
  quantity: z.string().optional().default(""),
  productInterested: z.string().optional().default("Executive Work Desk"),
  preferredMaterial: z.string().optional().default(""),
  preferredFinish: z.string().optional().default(""),
  message: z.string().min(5, "Message is required"),
  referenceFileUrl: z.string().optional().default(""),
  honeypot: z.string().optional().default(""), // bot honeypot
});

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "local";
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many enquiries submitted. Please wait a minute before trying again." },
        { status: 429 }
      );
    }

    const body = await req.json();

    // Check honeypot: bots will fill hidden input
    if (body.honeypot && body.honeypot.trim() !== "") {
      // Silent discard for bots
      return NextResponse.json({
        success: true,
        message: "Your enquiry has been received.",
      });
    }

    const parsed = enquirySchema.safeParse(body);
    if (!parsed.success) {
      const errorMsg = parsed.error.issues[0]?.message || "Invalid input data.";
      return NextResponse.json({ error: errorMsg }, { status: 400 });
    }

    const data = parsed.data;

    // 1. Save to MongoDB if available
    let enquiryRecord = null;
    const db = await connectDB();
    if (db) {
      enquiryRecord = await Enquiry.create({
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.company,
        city: data.city,
        requirementType: data.requirementType,
        quantity: data.quantity,
        productInterested: data.productInterested,
        preferredMaterial: data.preferredMaterial,
        preferredFinish: data.preferredFinish,
        message: data.message,
        referenceFileUrl: data.referenceFileUrl,
        status: "new",
      });
    }

    // 2. Dispatch email notification asynchronously
    try {
      await sendEnquiryNotificationEmail(data);
    } catch (mailError) {
      console.warn("Mail dispatch notice:", mailError);
    }

    return NextResponse.json({
      success: true,
      message: "Your enquiry has been received. Our studio team will get back to you shortly.",
      enquiryId: enquiryRecord?._id || "recorded",
    });
  } catch (error) {
    console.error("Enquiry submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit enquiry. Please try again." },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const admin = await getSessionAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");

    const db = await connectDB();
    if (!db) {
      return NextResponse.json({ success: true, enquiries: [] });
    }

    const query: Record<string, any> = {};
    if (status && status !== "ALL") {
      query.status = status;
    }

    const enquiries = await Enquiry.find(query).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, enquiries });
  } catch (error) {
    console.error("Enquiries GET error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
