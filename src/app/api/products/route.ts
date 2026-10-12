import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Product } from "@/models/Product";
import { getSessionAdmin } from "@/lib/auth";
import { autoSeedDatabase } from "@/lib/seed";
import { initialProducts } from "@/lib/seedData";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");
    const all = searchParams.get("all");

    const db = await connectDB();

    if (!db) {
      // Fallback data when DB is not configured
      let list = [...initialProducts];
      if (category && category !== "ALL") {
        list = list.filter((p) => p.category.toLowerCase() === category.toLowerCase());
      }
      if (featured === "true") {
        list = list.filter((p) => p.isFeatured);
      }
      return NextResponse.json({ success: true, products: list });
    }

    // Auto seed on first call if empty
    await autoSeedDatabase();

    const query: Record<string, any> = {};
    const admin = await getSessionAdmin();

    // If not authenticated admin asking for all, only show published
    if (!admin || all !== "true") {
      query.isPublished = true;
    }

    if (category && category !== "ALL") {
      query.category = new RegExp(`^${category}$`, "i");
    }

    if (featured === "true") {
      query.isFeatured = true;
    }

    const products = await Product.find(query).sort({ sortOrder: 1, createdAt: -1 });
    return NextResponse.json({ success: true, products });
  } catch (error) {
    console.error("Products GET error:", error);
    return NextResponse.json(
      { success: false, products: initialProducts, error: "Database query error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const admin = await getSessionAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    const db = await connectDB();
    if (!db) {
      return NextResponse.json(
        { error: "Database not configured. Cannot save product." },
        { status: 503 }
      );
    }

    const body = await req.json();

    if (!body.name || !body.modelNumber || !body.heroImage) {
      return NextResponse.json(
        { error: "Model number, product name and hero image are required." },
        { status: 400 }
      );
    }

    // Auto-generate slug if not provided
    const slug =
      body.slug?.trim().toLowerCase().replace(/\s+/g, "-") ||
      body.name.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-");

    const newProduct = await Product.create({
      ...body,
      slug,
    });

    return NextResponse.json({ success: true, product: newProduct }, { status: 201 });
  } catch (error: any) {
    console.error("Product create error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create product." },
      { status: 500 }
    );
  }
}
