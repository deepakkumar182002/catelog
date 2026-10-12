import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/db";
import { Gallery } from "@/models/Gallery";
import { getSessionAdmin, getAdminFromRequest } from "@/lib/auth";
import { initialGallery } from "@/lib/seedData";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    const db = await connectDB();
    if (!db) {
      let items = [...initialGallery];
      if (category && category !== "ALL") {
        items = items.filter((g) => g.category?.toLowerCase() === category.toLowerCase());
      }
      return NextResponse.json({ success: true, gallery: items });
    }

    const query: Record<string, any> = {};
    if (category && category !== "ALL") {
      query.category = new RegExp(`^${category}$`, "i");
    }

    const gallery = await Gallery.find(query).sort({ sortOrder: 1, createdAt: -1 });
    if (!gallery || gallery.length === 0) {
      let items = [...initialGallery];
      if (category && category !== "ALL") {
        items = items.filter((g) => g.category?.toLowerCase() === category.toLowerCase());
      }
      return NextResponse.json({ success: true, gallery: items });
    }

    return NextResponse.json({ success: true, gallery });
  } catch (error) {
    console.error("Gallery GET error:", error);
    return NextResponse.json({ success: true, gallery: initialGallery });
  }
}

export async function POST(req: NextRequest) {
  try {
    let admin = getAdminFromRequest(req);
    if (!admin) {
      admin = await getSessionAdmin();
    }
    if (!admin) return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });

    const db = await connectDB();
    if (!db) return NextResponse.json({ error: "Database not connected." }, { status: 503 });

    const body = await req.json();
    if (!body.title) {
      return NextResponse.json({ error: "Title is required for gallery image." }, { status: 400 });
    }

    const payload = {
      ...body,
      isFeatured: body.isFeatured ?? body.featured ?? true,
    };

    const created = await Gallery.create(payload);

    try {
      revalidatePath("/");
      revalidatePath("/gallery");
    } catch (e) {
      console.warn("Revalidate error:", e);
    }

    return NextResponse.json({ success: true, galleryItem: created }, { status: 201 });
  } catch (error: any) {
    console.error("Gallery POST error:", error);
    return NextResponse.json({ error: error.message || "Failed to create gallery item." }, { status: 500 });
  }
}
