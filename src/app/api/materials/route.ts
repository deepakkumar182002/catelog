import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Material } from "@/models/Material";
import { getSessionAdmin } from "@/lib/auth";
import { initialMaterials } from "@/lib/seedData";

export async function GET() {
  try {
    const db = await connectDB();
    if (!db) {
      return NextResponse.json({ success: true, materials: initialMaterials });
    }
    const materials = await Material.find().sort({ sortOrder: 1, createdAt: 1 });
    if (!materials || materials.length === 0) {
      return NextResponse.json({ success: true, materials: initialMaterials });
    }
    return NextResponse.json({ success: true, materials });
  } catch (error) {
    console.error("Materials GET error:", error);
    return NextResponse.json({ success: true, materials: initialMaterials });
  }
}

export async function POST(req: NextRequest) {
  try {
    const admin = await getSessionAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }
    const db = await connectDB();
    if (!db) {
      return NextResponse.json({ error: "Database not connected." }, { status: 503 });
    }
    const body = await req.json();
    const created = await Material.create(body);
    return NextResponse.json({ success: true, material: created }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
