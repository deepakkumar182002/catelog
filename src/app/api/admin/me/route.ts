import { NextResponse } from "next/server";
import { AUTH_COOKIE_NAME, getSessionAdmin } from "@/lib/auth";

export async function POST() {
  const response = NextResponse.json({ success: true, message: "Logged out successfully" });
  response.cookies.delete(AUTH_COOKIE_NAME);
  return response;
}

export async function GET() {
  const admin = await getSessionAdmin();
  if (!admin) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
  return NextResponse.json({
    authenticated: true,
    admin: {
      email: admin.email,
      name: admin.name,
      role: admin.role,
    },
  });
}
