import React from "react";
import Link from "next/link";
import { connectDB } from "@/lib/db";
import { Product } from "@/models/Product";
import { Material } from "@/models/Material";
import { Finish } from "@/models/Finish";
import { Gallery } from "@/models/Gallery";
import { Enquiry } from "@/models/Enquiry";
import { initialProducts, initialMaterials, initialFinishes, initialGallery } from "@/lib/seedData";
import {
  Package,
  Layers,
  Palette,
  Image as ImageIcon,
  Mail,
  Plus,
  ArrowUpRight,
  Clock,
  CheckCircle,
} from "lucide-react";

export default async function AdminDashboardPage() {
  const db = await connectDB();

  let productCount = initialProducts.length;
  let materialCount = initialMaterials.length;
  let finishCount = initialFinishes.length;
  let galleryCount = initialGallery.length;
  let enquiriesCount = 0;
  let recentEnquiries: any[] = [];

  if (db) {
    try {
      productCount = await Product.countDocuments();
      materialCount = await Material.countDocuments();
      finishCount = await Finish.countDocuments();
      galleryCount = await Gallery.countDocuments();
      enquiriesCount = await Enquiry.countDocuments();
      recentEnquiries = await Enquiry.find().sort({ createdAt: -1 }).limit(5);
    } catch (e) {
      console.warn("DB query notice:", e);
    }
  }

  const kpis = [
    { label: "Catalogue Products", count: productCount, icon: Package, href: "/admin/products" },
    { label: "Materials & Woods", count: materialCount, icon: Layers, href: "/admin/materials" },
    { label: "Frame Finishes", count: finishCount, icon: Palette, href: "/admin/finishes" },
    { label: "Gallery Assets", count: galleryCount, icon: ImageIcon, href: "/admin/gallery" },
    { label: "Client Enquiries", count: enquiriesCount, icon: Mail, href: "/admin/enquiries" },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
        <div>
          <span className="text-[11px] font-mono tracking-widest uppercase text-amber-800 font-semibold">
            Overview & Telemetry
          </span>
          <h1 className="text-2xl sm:text-3xl font-editorial font-bold uppercase tracking-tight text-stone-900 mt-1">
            STUDIO CMS DASHBOARD
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/products/new"
            className="inline-flex items-center gap-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-mono uppercase tracking-widest px-4 py-2.5 rounded-xl transition-all shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>New Product</span>
          </Link>
          <Link
            href="/admin/enquiries"
            className="inline-flex items-center gap-2 bg-white hover:bg-stone-50 text-stone-900 text-xs font-mono uppercase tracking-widest px-4 py-2.5 rounded-xl border border-stone-300 transition-all shadow-xs"
          >
            <Mail className="w-4 h-4" />
            <span>View Enquiries</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <Link
              key={kpi.label}
              href={kpi.href}
              className="bg-white p-5 rounded-2xl border border-stone-200/90 shadow-xs hover:border-stone-900 transition-all group flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-9 h-9 rounded-xl bg-stone-100 flex items-center justify-center text-stone-800 group-hover:bg-stone-900 group-hover:text-white transition-colors">
                  <Icon className="w-4 h-4" />
                </div>
                <ArrowUpRight className="w-4 h-4 text-stone-400 group-hover:text-stone-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>

              <div>
                <span className="text-2xl font-bold font-editorial text-stone-950">
                  {kpi.count}
                </span>
                <p className="text-xs font-mono uppercase text-stone-500 mt-1">
                  {kpi.label}
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Recent Enquiries & Fast Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Recent Enquiries Table */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
          <div className="p-6 border-b border-stone-200 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold font-editorial uppercase tracking-tight text-stone-900">
                Recent Client Enquiries
              </h2>
              <p className="text-xs font-mono text-stone-500 mt-0.5">
                Latest submissions from website lead generation
              </p>
            </div>
            <Link
              href="/admin/enquiries"
              className="text-xs font-mono uppercase text-amber-800 hover:underline flex items-center gap-1 font-semibold"
            >
              <span>View All</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            {recentEnquiries.length === 0 ? (
              <div className="p-8 text-center text-xs font-mono text-stone-500">
                No client enquiries yet. Test the enquiry form on the live site!
              </div>
            ) : (
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-stone-50 text-stone-500 uppercase border-b border-stone-200">
                  <tr>
                    <th className="px-6 py-3">Client</th>
                    <th className="px-6 py-3">Requirement</th>
                    <th className="px-6 py-3">Product</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {recentEnquiries.map((enq) => (
                    <tr key={enq._id} className="hover:bg-stone-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-bold text-stone-900">{enq.name}</div>
                        <div className="text-stone-500 text-[11px]">{enq.email}</div>
                      </td>
                      <td className="px-6 py-4 text-stone-700">
                        {enq.requirementType}
                      </td>
                      <td className="px-6 py-4 text-stone-700">
                        {enq.productInterested}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] uppercase font-semibold ${
                            enq.status === "new"
                              ? "bg-amber-100 text-amber-800"
                              : enq.status === "quoted"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-emerald-100 text-emerald-800"
                          }`}
                        >
                          {enq.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link
                          href="/admin/enquiries"
                          className="text-stone-900 hover:text-amber-800 font-bold"
                        >
                          Review →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Quick Management Shortcuts */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs">
            <h3 className="text-sm font-bold font-editorial uppercase tracking-tight text-stone-900 mb-4">
              Catalogue Management
            </h3>
            <div className="space-y-2">
              <Link
                href="/admin/products"
                className="flex items-center justify-between p-3 rounded-xl bg-stone-50 hover:bg-stone-100 text-xs font-mono text-stone-800 transition-colors"
              >
                <span>Edit Products & Specifications</span>
                <span>→</span>
              </Link>
              <Link
                href="/admin/materials"
                className="flex items-center justify-between p-3 rounded-xl bg-stone-50 hover:bg-stone-100 text-xs font-mono text-stone-800 transition-colors"
              >
                <span>Manage Woods & Veneers</span>
                <span>→</span>
              </Link>
              <Link
                href="/admin/finishes"
                className="flex items-center justify-between p-3 rounded-xl bg-stone-50 hover:bg-stone-100 text-xs font-mono text-stone-800 transition-colors"
              >
                <span>Manage Metal Finishes</span>
                <span>→</span>
              </Link>
              <Link
                href="/admin/gallery"
                className="flex items-center justify-between p-3 rounded-xl bg-stone-50 hover:bg-stone-100 text-xs font-mono text-stone-800 transition-colors"
              >
                <span>Upload Gallery Photography</span>
                <span>→</span>
              </Link>
            </div>
          </div>

          <div className="bg-stone-900 text-stone-100 p-6 rounded-2xl shadow-xs">
            <span className="text-[10px] font-mono uppercase text-amber-400 tracking-wider">
              Studio Configuration
            </span>
            <h4 className="text-base font-bold font-editorial uppercase mt-1">
              Global Content & Settings
            </h4>
            <p className="text-xs text-stone-400 font-mono mt-2 leading-relaxed">
              Edit the hero statement, brand philosophy, receiver notification email and B2B copy.
            </p>
            <div className="mt-4 pt-4 border-t border-stone-800 flex gap-3">
              <Link
                href="/admin/pages"
                className="text-xs font-mono text-amber-400 hover:text-white uppercase tracking-wider"
              >
                Edit Pages →
              </Link>
              <Link
                href="/admin/settings"
                className="text-xs font-mono text-stone-300 hover:text-white uppercase tracking-wider"
              >
                Site Settings →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
