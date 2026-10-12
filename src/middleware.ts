import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const host = req.headers.get("host") || "";
  const { pathname } = req.nextUrl;

  // Bypass Next.js internals, static files, images and public uploads
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/uploads") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/robots.txt") ||
    pathname.startsWith("/sitemap.xml")
  ) {
    return NextResponse.next();
  }

  const isAdminHost = host.toLowerCase().startsWith("admin.") || host.toLowerCase().startsWith("admin-");
  const token = req.cookies.get("el_admin_token")?.value;

  // Subdomain Routing (e.g. http://admin.localhost:3000/...)
  if (isAdminHost) {
    // API routes bypass subdomain rewriting
    if (pathname.startsWith("/api")) {
      return NextResponse.next();
    }

    const isLoginPage = pathname === "/login" || pathname === "/admin/login";

    // Authentication guard on admin subdomain
    if (!token && !isLoginPage) {
      const loginUrl = new URL("/login", req.url);
      return NextResponse.redirect(loginUrl);
    }

    if (token && isLoginPage) {
      const dashboardUrl = new URL("/", req.url);
      return NextResponse.redirect(dashboardUrl);
    }

    // Rewrite path to /admin internal route
    let targetPath = pathname;
    if (pathname === "/") {
      targetPath = "/admin";
    } else if (pathname === "/login") {
      targetPath = "/admin/login";
    } else if (!pathname.startsWith("/admin")) {
      targetPath = `/admin${pathname}`;
    }

    const rewriteUrl = new URL(targetPath, req.url);
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-pathname", targetPath);
    requestHeaders.set("x-is-admin-host", "true");

    return NextResponse.rewrite(rewriteUrl, {
      request: {
        headers: requestHeaders,
      },
    });
  }

  // Standard Routing (e.g. http://localhost:3000/admin/...)
  if (pathname.startsWith("/admin")) {
    const isLoginPage = pathname === "/admin/login";

    if (!token && !isLoginPage) {
      const loginUrl = new URL("/admin/login", req.url);
      return NextResponse.redirect(loginUrl);
    }

    if (token && isLoginPage) {
      const dashboardUrl = new URL("/admin", req.url);
      return NextResponse.redirect(dashboardUrl);
    }
  }

  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-pathname", pathname);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
