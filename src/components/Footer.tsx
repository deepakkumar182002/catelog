import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#121212] text-[#FAF8F5] pt-20 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-stone-800">
          {/* Brand info */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-stone-400">
                Studio & Manufacturing
              </span>
              <h2 className="text-2xl md:text-3xl font-serif tracking-tight mt-2 text-stone-100 uppercase">
                EXPERIENCE LIFE
              </h2>
              <p className="text-stone-400 text-sm mt-1 font-mono">
                Furniture for Every Space
              </p>
              <p className="text-stone-400 text-xs mt-6 leading-relaxed max-w-sm">
                Thoughtful designs. Functional spaces. Lasting quality. We engineer architectural, durable and visually refined furniture tailored for residences, corporate offices, interior projects and commercial spaces.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-stone-800/80">
              <span className="text-[10px] font-mono tracking-widest uppercase text-stone-500">
                Direct Inquiries
              </span>
              <p className="text-stone-300 text-xs font-mono mt-1">
                projects@experiencelife.design
              </p>
            </div>
          </div>

          {/* Quick links */}
          <div className="md:col-span-3">
            <span className="text-[11px] font-mono tracking-widest uppercase text-stone-400 block mb-6">
              Navigation
            </span>
            <ul className="space-y-3 text-xs font-mono uppercase tracking-wider text-stone-400">
              <li>
                <Link href="/" className="hover:text-stone-100 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#collection" className="hover:text-stone-100 transition-colors">
                  Collection
                </Link>
              </li>
              <li>
                <Link href="/#materials" className="hover:text-stone-100 transition-colors">
                  Materials & Woods
                </Link>
              </li>
              <li>
                <Link href="/#finishes" className="hover:text-stone-100 transition-colors">
                  Metal Finishes
                </Link>
              </li>
              <li>
                <Link href="/#hardware" className="hover:text-stone-100 transition-colors">
                  Hardware Specs
                </Link>
              </li>
              <li>
                <Link href="/#customization" className="hover:text-stone-100 transition-colors">
                  Customization
                </Link>
              </li>
              <li>
                <Link href="/#gallery" className="hover:text-stone-100 transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/#about" className="hover:text-stone-100 transition-colors">
                  About Brand
                </Link>
              </li>
            </ul>
          </div>

          {/* Applications */}
          <div className="md:col-span-4">
            <span className="text-[11px] font-mono tracking-widest uppercase text-stone-400 block mb-6">
              Project Solutions
            </span>
            <ul className="space-y-3 text-xs text-stone-400 font-mono">
              <li>• Corporate Workstations & Executive Suites</li>
              <li>• Interior Designer Custom Commissions</li>
              <li>• Architectural Studio Desking</li>
              <li>• Boutique Hospitality & Lounge Tables</li>
              <li>• Bulk Commercial Furnishing</li>
            </ul>

            <div className="mt-8 bg-stone-900/90 border border-stone-800 p-6 rounded-lg">
              <span className="text-[10px] font-mono tracking-widest uppercase text-amber-500">
                Partner With Us
              </span>
              <p className="text-xs text-stone-300 mt-2 leading-relaxed">
                Need CAD drawings, material swatches or custom bulk project quotations?
              </p>
              <Link
                href="/#enquiry"
                className="mt-4 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-stone-100 hover:text-amber-400 transition-colors"
              >
                <span>Request Project Proposal</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-[11px] font-mono text-stone-500 gap-4">
          <p>© 2026 EXPERIENCE LIFE. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <span>Furniture for Every Space</span>
            <span className="text-stone-700">•</span>
            <Link href="/admin/login" className="hover:text-stone-300 transition-colors">
              Studio Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
