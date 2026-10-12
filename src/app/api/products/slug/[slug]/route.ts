import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Product } from "@/models/Product";
import { initialProducts } from "@/lib/seedData";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const db = await connectDB();

    if (!db) {
      const found = initialProducts.find((p) => p.slug === slug);
      if (found) return NextResponse.json({ success: true, product: found });
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const product = await Product.findOne({ slug, isPublished: true });
    if (!product) {
      const fallback = initialProducts.find((p) => p.slug === slug);
      if (fallback) return NextResponse.json({ success: true, product: fallback });
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, product });
  } catch (error) {
    console.error("Product slug lookup error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
