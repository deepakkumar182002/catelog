import React from "react";
import Link from "next/link";
import { headers } from "next/headers";
import {
  LayoutDashboard,
  Package,
  Layers,
  Palette,
  Image as ImageIcon,
  Mail,
  FileText,
  Settings,
  LogOut,
  ExternalLink,
} from "lucide-react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "";
  const isAdminHost = headersList.get("x-is-admin-host") === "true";

  // If on login page, render clean full-screen wrapper
  if (pathname.includes("/admin/login") || pathname === "/login") {
    return <div className="min-h-screen bg-[#121212]">{children}</div>;
  }

  const prefix = isAdminHost ? "" : "/admin";

  const navItems = [
    { label: "Dashboard", href: isAdminHost ? "/" : "/admin", icon: LayoutDashboard },
    { label: "Products", href: `${prefix}/products`, icon: Package },
    { label: "Materials", href: `${prefix}/materials`, icon: Layers },
    { label: "Finishes", href: `${prefix}/finishes`, icon: Palette },
    { label: "Gallery", href: `${prefix}/gallery`, icon: ImageIcon },
    { label: "Enquiries", href: `${prefix}/enquiries`, icon: Mail },
    { label: "Page Content", href: `${prefix}/pages`, icon: FileText },
    { label: "Site Settings", href: `${prefix}/settings`, icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#F6F4EF] flex text-stone-900 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-[#141414] text-stone-300 flex flex-col justify-between p-6 border-r border-stone-800 shrink-0">
        <div>
          {/* Brand */}
          <div className="pb-6 border-b border-stone-800">
            <Link href="/admin" className="flex flex-col">
              <span className="font-editorial text-sm font-bold tracking-widest text-white uppercase">
                EXPERIENCE LIFE
              </span>
              <span className="text-[10px] font-mono text-amber-500 uppercase tracking-widest mt-0.5">
                Studio CMS Portal
              </span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="mt-6 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider text-stone-400 hover:text-white hover:bg-stone-800/80 transition-colors"
                >
                  <Icon className="w-4 h-4 text-stone-400" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="pt-6 border-t border-stone-800 space-y-2">
          <Link
            href={process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-mono uppercase text-stone-400 hover:text-stone-200 hover:bg-stone-800/50 transition-colors"
          >
            <span>Live Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <form action="/api/admin/logout" method="POST">
            <button
              type="submit"
              className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-mono uppercase text-red-400 hover:bg-red-950/30 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out</span>
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <header className="h-16 bg-white border-b border-stone-200 px-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-xs font-mono text-stone-500 uppercase">
              Production Studio Online
            </span>
          </div>
          <div className="text-xs font-mono text-stone-600">
            Admin: <span className="font-bold text-stone-900">Experience Life Master</span>
          </div>
        </header>

        <main className="p-8 flex-1">{children}</main>
      </div>
    </div>
  );
}
