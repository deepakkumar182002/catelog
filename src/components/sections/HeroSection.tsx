"use client";

import React from "react";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { BackendImage } from "@/components/ui/BackendImage";

interface HeroSectionProps {
  content?: {
    heroHeadline?: string;
    heroSubheadline?: string;
    heroTagline?: string;
    heroImage?: string;
  };
}

export function HeroSection({ content }: HeroSectionProps) {
  const headline = content?.heroHeadline || "EXPERIENCE LIFE";
  const subheadline = content?.heroSubheadline || "Furniture for Every Space";
  const tagline =
    content?.heroTagline ||
    "Thoughtful designs. Functional spaces. Lasting quality. Engineered around the functional demands of modern offices, homes and commercial projects.";
  const heroImage = content?.heroImage || "";

  return (
    <section className="relative min-h-screen flex flex-col justify-between pt-32 pb-16 px-6 md:px-12 bg-[#FAF8F5] overflow-hidden border-b border-stone-200/60">
      {/* Background Architectural Blueprint Lines */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      {/* Hero Top Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-8 border-b border-stone-300/70">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-amber-700 animate-pulse" />
              <span className="text-[11px] font-mono tracking-widest uppercase text-stone-500">
                Collection 2026 • Architectural Furniture
              </span>
            </div>
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-editorial font-bold tracking-tighter text-stone-950 uppercase leading-none">
              {headline.includes(" ") ? (
                <>
                  {headline.split(" ")[0]}
                  <br />
                  <span className="font-serif italic font-normal text-amber-900/90 lowercase text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-normal mr-3">
                    {headline.split(" ").slice(1).join(" ")}
                  </span>
                </>
              ) : (
                headline
              )}
            </h1>
          </div>

          <div className="max-w-md">
            <p className="font-editorial text-lg md:text-xl text-stone-800 font-medium tracking-tight">
              {subheadline}
            </p>
            <p className="text-xs md:text-sm text-stone-600 mt-2 font-mono leading-relaxed">
              {tagline}
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-6">
              <Link
                href="#collection"
                className="inline-flex items-center gap-2 bg-stone-900 hover:bg-stone-800 text-[#FAF8F5] text-xs font-mono uppercase tracking-widest px-6 py-3.5 rounded-full transition-all duration-300 shadow-md"
              >
                <span>Explore Collection</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="#enquiry"
                className="inline-flex items-center gap-2 bg-transparent hover:bg-stone-200/80 text-stone-900 text-xs font-mono uppercase tracking-widest px-6 py-3.5 rounded-full border border-stone-400/80 transition-all duration-300"
              >
                <span>Start a Project</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Hero Visual Presentation */}
        <div
          className="relative mt-8 md:mt-12 w-full h-[380px] sm:h-[480px] md:h-[600px] rounded-2xl overflow-hidden bg-stone-100 border border-stone-200/90 shadow-xl group"
          style={{ position: "relative" }}
        >
          <BackendImage
            src={heroImage}
            alt="Experience Life Executive Work Desk Environment"
            fill
            priority
            objectFit="cover"
            className="group-hover:scale-102 transition-transform duration-1000 ease-out"
            sizes="(max-width: 1280px) 100vw, 1280px"
            fallbackLabel="Hero Editorial Image — Upload in Admin"
            loadingLabel="Loading Hero Visual..."
          />

          {/* Overlay Tag */}
          <div className="absolute bottom-6 left-6 right-6 md:left-10 md:right-auto z-10 flex flex-col md:flex-row items-start md:items-center gap-4 bg-white/90 backdrop-blur-md p-4 md:px-6 md:py-3.5 rounded-xl border border-stone-200/80 shadow-md">
            <div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-stone-500">
                Featured Architecture
              </span>
              <p className="text-sm font-semibold text-stone-900">
                EL-D01 Executive Work Desk
              </p>
            </div>
            <div className="hidden md:block h-6 w-[1px] bg-stone-200" />
            <div className="text-xs text-stone-600 font-mono">
              Natural Wood • MS Square Pipe • X-Brace
            </div>
            <Link
              href="#featured"
              className="ml-auto inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-amber-900 font-semibold hover:underline"
            >
              <span>Explore Features</span>
              <ArrowDown className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Bottom Bar */}
      <div className="relative z-10 max-w-7xl mx-auto w-full pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-stone-500 gap-4">
        <div className="flex items-center gap-6">
          <span>01 / 10 CATALOGUE MASTER</span>
          <span>•</span>
          <span>CUSTOM BULK & B2B AVAILABLE</span>
        </div>
        <div className="flex items-center gap-2 animate-bounce">
          <span>SCROLL TO EXPLORE 3D & SPECS</span>
          <ArrowDown className="w-3.5 h-3.5" />
        </div>
      </div>
    </section>
  );
}
