import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/db";
import { Finish } from "@/models/Finish";
import { getSessionAdmin } from "@/lib/auth";
import { initialFinishes } from "@/lib/seedData";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const db = await connectDB();
    if (!db) {
      return NextResponse.json({ success: true, finishes: initialFinishes });
    }
    const finishes = await Finish.find().sort({ sortOrder: 1, createdAt: 1 });
    if (!finishes || finishes.length === 0) {
      return NextResponse.json({ success: true, finishes: initialFinishes });
    }
    return NextResponse.json({ success: true, finishes });
  } catch (error) {
    console.error("Finishes GET error:", error);
    return NextResponse.json({ success: true, finishes: initialFinishes });
  }
}

export async function POST(req: NextRequest) {
  try {
    const admin = await getSessionAdmin();
    if (!admin) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    const db = await connectDB();
    if (!db) return NextResponse.json({ error: "Database not connected." }, { status: 503 });

    const body = await req.json();
    const created = await Finish.create(body);

    try {
      revalidatePath("/");
    } catch (e) {
      console.warn("Revalidate error:", e);
    }

    return NextResponse.json({ success: true, finish: created }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
