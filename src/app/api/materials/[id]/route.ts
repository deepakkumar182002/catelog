import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/db";
import { Material } from "@/models/Material";
import { getSessionAdmin, getAdminFromRequest } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    let admin = getAdminFromRequest(req);
    if (!admin) {
      admin = await getSessionAdmin();
    }
    if (!admin) return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    const { id } = await params;
    const db = await connectDB();
    if (!db) return NextResponse.json({ error: "Database not connected." }, { status: 503 });

    const body = await req.json();
    const updated = await Material.findByIdAndUpdate(id, body, { new: true });

    try {
      revalidatePath("/");
    } catch (e) {
      console.warn("Revalidate error:", e);
    }

    return NextResponse.json({ success: true, material: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    let admin = getAdminFromRequest(req);
    if (!admin) {
      admin = await getSessionAdmin();
    }
    if (!admin) return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    const { id } = await params;
    const db = await connectDB();
    if (!db) return NextResponse.json({ error: "Database not connected." }, { status: 503 });

    await Material.findByIdAndDelete(id);

    try {
      revalidatePath("/");
    } catch (e) {
      console.warn("Revalidate error:", e);
    }

    return NextResponse.json({ success: true, message: "Material deleted." });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
