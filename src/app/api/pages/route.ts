import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { PageContent } from "@/models/PageContent";
import { getSessionAdmin } from "@/lib/auth";
import { defaultPageContent, PageContentData } from "@/lib/pageDefaults";

function sanitizeContent(data: any): PageContentData {
  const sanitized: any = { ...defaultPageContent, ...data };
  for (const key of Object.keys(sanitized)) {
    // Strip legacy static assets so no built-in static image renders
    if (typeof sanitized[key] === "string" && sanitized[key].startsWith("/images/")) {
      sanitized[key] = "";
    }
  }
  return sanitized;
}

export async function GET() {
  try {
    const db = await connectDB();
    if (!db) {
      return NextResponse.json({ success: true, content: sanitizeContent(defaultPageContent) });
    }
    let content = await PageContent.findOne();
    if (!content) {
      content = await PageContent.create(defaultPageContent);
    }
    const merged = sanitizeContent(content.toObject());
    return NextResponse.json({ success: true, content: merged });
  } catch (error) {
    console.error("PageContent GET error:", error);
    return NextResponse.json({ success: true, content: sanitizeContent(defaultPageContent) });
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
    return NextResponse.json({ success: true, content: sanitizeContent(content.toObject()) });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
