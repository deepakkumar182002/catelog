import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/db";
import { Gallery } from "@/models/Gallery";
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
    const updated = await Gallery.findByIdAndUpdate(id, body, { new: true });

    try {
      revalidatePath("/");
    } catch (e) {
      console.warn("Revalidate error:", e);
    }

    return NextResponse.json({ success: true, galleryItem: updated });
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

    await Gallery.findByIdAndDelete(id);

    try {
      revalidatePath("/");
    } catch (e) {
      console.warn("Revalidate error:", e);
    }

    return NextResponse.json({ success: true, message: "Gallery item deleted." });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
