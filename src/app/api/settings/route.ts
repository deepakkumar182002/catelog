import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { SiteSettings } from "@/models/SiteSettings";
import { getSessionAdmin } from "@/lib/auth";

const defaultSettings = {
  brandName: "EXPERIENCE LIFE",
  tagline: "Furniture for Every Space",
  receiverEmail: "contact@experiencelife.design",
  contactEmail: "info@experiencelife.design",
  contactPhone: "+91 98765 43210",
  contactAddress: "Experience Life Design & Manufacturing Studio",
  instagramUrl: "",
  linkedinUrl: "",
  metaTitle: "EXPERIENCE LIFE | Furniture for Every Space",
  metaDescription:
    "Thoughtful designs. Functional spaces. Lasting quality. Architectural furniture crafted for modern workspaces, homes and commercial environments.",
};

export async function GET() {
  try {
    const db = await connectDB();
    if (!db) {
      return NextResponse.json({ success: true, settings: defaultSettings });
    }
    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = await SiteSettings.create(defaultSettings);
    }
    return NextResponse.json({ success: true, settings });
  } catch (error) {
    console.error("Settings GET error:", error);
    return NextResponse.json({ success: true, settings: defaultSettings });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const admin = await getSessionAdmin();
    if (!admin) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    const db = await connectDB();
    if (!db) return NextResponse.json({ error: "Database not connected." }, { status: 503 });

    const body = await req.json();
    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = await SiteSettings.create({ ...defaultSettings, ...body });
    } else {
      Object.assign(settings, body);
      await settings.save();
    }
    return NextResponse.json({ success: true, settings });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
