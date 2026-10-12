import { NextRequest, NextResponse } from "next/server";
import { AUTH_COOKIE_NAME } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const host = req.headers.get("host") || "";
  const isAdminHost = host.toLowerCase().startsWith("admin.") || host.toLowerCase().startsWith("admin-");
  const redirectTarget = isAdminHost ? "/login" : "/admin/login";

  const acceptsHtml = req.headers.get("accept")?.includes("text/html");

  const response = acceptsHtml
    ? NextResponse.redirect(new URL(redirectTarget, req.url))
    : NextResponse.json({ success: true, message: "Logged out successfully" });

  response.cookies.delete(AUTH_COOKIE_NAME);
  response.cookies.set({
    name: AUTH_COOKIE_NAME,
    value: "",
    maxAge: 0,
    path: "/",
  });

  return response;
}
