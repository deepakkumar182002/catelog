import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/db";
import { PageContent } from "@/models/PageContent";
import { getSessionAdmin } from "@/lib/auth";
import { defaultPageContent, mergePageContent } from "@/lib/pageDefaults";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const db = await connectDB();
    if (!db) {
      return NextResponse.json({ success: true, content: defaultPageContent });
    }
    let content = await PageContent.findOne();
    if (!content) {
      content = await PageContent.create(defaultPageContent);
    }
    const merged = mergePageContent(content.toObject());
    return NextResponse.json({ success: true, content: merged });
  } catch (error) {
    console.error("PageContent GET error:", error);
    return NextResponse.json({ success: true, content: defaultPageContent });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const admin = await getSessionAdmin();
    if (!admin) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    const db = await connectDB();
    if (!db) return NextResponse.json({ error: "Database not connected." }, { status: 503 });

    const body = await req.json();
    let content = await PageContent.findOne();
    if (!content) {
      content = await PageContent.create({ ...defaultPageContent, ...body });
    } else {
      Object.assign(content, body);
      await content.save();
    }
    
    // Invalidate Next.js cache so updates are immediately visible
    try {
      revalidatePath("/");
      revalidatePath("/admin/pages");
    } catch (e) {
      console.warn("Revalidation error:", e);
    }

    return NextResponse.json({ success: true, content: mergePageContent(content.toObject()) });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
