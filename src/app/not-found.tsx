import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900 flex flex-col justify-between p-8 md:p-16">
      <div className="flex items-center justify-between border-b border-stone-200 pb-4">
        <span className="font-editorial text-sm font-bold uppercase tracking-widest">
          EXPERIENCE LIFE
        </span>
        <span className="text-[10px] font-mono uppercase text-stone-500">
          Error 404
        </span>
      </div>

      <div className="max-w-2xl mx-auto text-center my-auto py-16">
        <span className="text-xs font-mono uppercase text-amber-800 tracking-widest font-semibold">
          Design Archive
        </span>
        <h1 className="text-5xl md:text-7xl font-editorial font-bold uppercase tracking-tight text-stone-950 mt-2">
          PAGE NOT FOUND
        </h1>
        <p className="text-stone-600 text-sm md:text-base font-sans mt-4 max-w-md mx-auto leading-relaxed">
          The furniture piece or section you are looking for does not exist or has been relocated in the catalogue.
        </p>

        <div className="mt-8 flex items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-stone-900 text-white text-xs font-mono uppercase tracking-widest px-6 py-3.5 rounded-full hover:bg-stone-800 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Studio Home</span>
          </Link>
          <Link
            href="/#collection"
            className="inline-flex items-center gap-2 border border-stone-300 text-stone-800 text-xs font-mono uppercase tracking-widest px-6 py-3.5 rounded-full hover:bg-stone-100 transition-colors"
          >
            <span>Explore Collection</span>
          </Link>
        </div>
      </div>

      <div className="border-t border-stone-200 pt-4 text-center text-xs font-mono text-stone-500">
        © 2026 EXPERIENCE LIFE • Furniture for Every Space
      </div>
    </div>
  );
}
