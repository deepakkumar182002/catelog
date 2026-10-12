import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Gallery } from "@/models/Gallery";
import { getSessionAdmin } from "@/lib/auth";
import { initialGallery } from "@/lib/seedData";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    const db = await connectDB();
    if (!db) {
      let items = [...initialGallery];
      if (category && category !== "ALL") {
        items = items.filter((g) => g.category.toUpperCase() === category.toUpperCase());
      }
      return NextResponse.json({ success: true, gallery: items });
    }

    const query: Record<string, any> = {};
    if (category && category !== "ALL") {
      query.category = category.toUpperCase();
    }

    const gallery = await Gallery.find(query).sort({ sortOrder: 1, createdAt: -1 });
    if (!gallery || gallery.length === 0) {
      let items = [...initialGallery];
      if (category && category !== "ALL") {
        items = items.filter((g) => g.category.toUpperCase() === category.toUpperCase());
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
    const admin = await getSessionAdmin();
    if (!admin) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    const db = await connectDB();
    if (!db) return NextResponse.json({ error: "Database not connected." }, { status: 503 });

    const body = await req.json();
    const created = await Gallery.create(body);
    return NextResponse.json({ success: true, galleryItem: created }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
