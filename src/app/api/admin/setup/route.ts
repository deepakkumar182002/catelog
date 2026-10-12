import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import { Admin } from "@/models/Admin";

export async function POST(req: NextRequest) {
  try {
    const db = await connectDB();
    if (!db) {
      return NextResponse.json(
        { error: "Database not connected. Please verify MONGODB_URI." },
        { status: 503 }
      );
    }

    const adminCount = await Admin.countDocuments();
    if (adminCount > 0) {
      return NextResponse.json(
        { error: "Admin account is already configured. Setup route is disabled." },
        { status: 403 }
      );
    }

    const body = await req.json();
    const email = body.email || process.env.ADMIN_EMAIL;
    const password = body.password || process.env.ADMIN_PASSWORD;
    const name = body.name || "Studio Administrator";

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required for initial setup." },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters long." },
        { status: 400 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const newAdmin = await Admin.create({
      email: email.toLowerCase().trim(),
      passwordHash,
      name,
      role: "superadmin",
    });

    return NextResponse.json({
      success: true,
      message: "Admin created successfully.",
      admin: { email: newAdmin.email, name: newAdmin.name },
    });
  } catch (error) {
    console.error("Admin setup error:", error);
    return NextResponse.json(
      { error: "Failed to initialize admin." },
      { status: 500 }
    );
  }
}
