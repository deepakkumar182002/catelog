import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/db";
import { Product } from "@/models/Product";
import { getSessionAdmin, getAdminFromRequest } from "@/lib/auth";
import { initialProducts } from "@/lib/seedData";

export const dynamic = "force-dynamic";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const db = await connectDB();

    if (!db) {
      const found = initialProducts.find((p) => p.slug === id);
      if (found) return NextResponse.json({ success: true, product: found });
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    let product = null;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      product = await Product.findById(id);
    }
    if (!product) {
      product = await Product.findOne({ slug: id });
    }

    if (!product) {
      // Check initial products fallback
      const fallback = initialProducts.find((p) => p.slug === id);
      if (fallback) return NextResponse.json({ success: true, product: fallback });
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, product });
  } catch (error) {
    console.error("Product GET error:", error);
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    let admin = getAdminFromRequest(req);
    if (!admin) {
      admin = await getSessionAdmin();
    }
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    const { id } = await params;
    const db = await connectDB();
    if (!db) {
      return NextResponse.json({ error: "Database not configured." }, { status: 503 });
    }

    const body = await req.json();

    const query = id.match(/^[0-9a-fA-F]{24}$/) ? { _id: id } : { slug: id };
    const updated = await Product.findOneAndUpdate(query, body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    try {
      revalidatePath("/");
      revalidatePath("/collection");
      if (updated.slug) revalidatePath(`/collection/${updated.slug}`);
    } catch (e) {
      console.warn("Revalidate error:", e);
    }

    return NextResponse.json({ success: true, product: updated });
  } catch (error: any) {
    console.error("Product update error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update product." },
      { status: 500 }
    );
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
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    const { id } = await params;
    const db = await connectDB();
    if (!db) {
      return NextResponse.json({ error: "Database not configured." }, { status: 503 });
    }

    const query = id.match(/^[0-9a-fA-F]{24}$/) ? { _id: id } : { slug: id };
    const deleted = await Product.findOneAndDelete(query);
    if (!deleted) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    try {
      revalidatePath("/");
      revalidatePath("/collection");
      if (deleted.slug) revalidatePath(`/collection/${deleted.slug}`);
    } catch (e) {
      console.warn("Revalidate error:", e);
    }

    return NextResponse.json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error("Product delete error:", error);
    return NextResponse.json({ error: "Failed to delete product." }, { status: 500 });
  }
}
