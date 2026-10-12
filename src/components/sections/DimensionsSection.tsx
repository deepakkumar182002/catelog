"use client";

import React, { useState } from "react";
import Image from "next/image";

interface DimensionsSectionProps {
  content?: {
    dimensionsTagline?: string;
    dimensionsModel?: string;
    dimensionsHeading?: string;
    dimensionsSubheading?: string;
  };
}

export function DimensionsSection({ content }: DimensionsSectionProps) {
  const [activeView, setActiveView] = useState<"blueprint" | "front" | "side" | "top">("blueprint");

  const tagline = content?.dimensionsTagline || "Orthographic Projections";
  const model = content?.dimensionsModel || "EXECUTIVE WORK DESK";
  const heading = content?.dimensionsHeading || "DIMENSIONS";
  const subheading =
    content?.dimensionsSubheading ||
    "Standard size with custom dimensional scaling available to match specific architectural room layouts.";

  const views = [
    { id: "blueprint", label: "Full Technical Drawing", image: "/images/technical/desk-dimensions.png" },
    { id: "front", label: "Front Elevation", image: "/images/technical/desk-front-view.png" },
    { id: "side", label: "Side Elevation", image: "/images/technical/desk-side-view.png" },
    { id: "top", label: "Plan / Top View", image: "/images/technical/desk-top-view.png" },
  ];

  return (
    <section className="py-28 md:py-36 px-6 md:px-12 bg-[#FAF8F5] border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-12 border-b border-stone-300">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono tracking-widest uppercase text-amber-800 font-semibold">
                {tagline}
              </span>
              <span className="text-stone-400 font-mono text-xs">•</span>
              <span className="text-xs font-mono text-stone-600 uppercase">
                {model}
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-editorial font-bold text-stone-950 uppercase tracking-tight mt-2">
              {heading}
            </h2>
            <p className="text-stone-700 text-sm md:text-base font-sans mt-3">
              {subheading}
            </p>
          </div>

          {/* View Toggles */}
          <div className="mt-6 md:mt-0 flex flex-wrap gap-2">
            {views.map((v) => (
              <button
                key={v.id}
                onClick={() => setActiveView(v.id as any)}
                className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all ${
                  activeView === v.id
                    ? "bg-stone-900 text-white shadow"
                    : "bg-stone-100 text-stone-700 hover:bg-stone-200 border border-stone-200"
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>
        </div>

        {/* Blueprint & Dimension Callouts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-12 items-center">
          {/* Left Column: Dimensions Metric Cards */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs">
              <div className="flex items-center justify-between text-xs font-mono text-stone-500 uppercase">
                <span>Primary Dimension</span>
                <span>Length (X)</span>
              </div>
              <p className="text-3xl font-bold font-editorial text-stone-950 uppercase mt-2">
                5 FT / 60 INCH
              </p>
              <p className="text-xs text-stone-600 mt-2 font-mono">
                1524 mm standard desk run. Scalable to 4 ft, 6 ft, or custom modular runs.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs">
              <div className="flex items-center justify-between text-xs font-mono text-stone-500 uppercase">
                <span>Working Depth</span>
                <span>Width (Y)</span>
              </div>
              <p className="text-3xl font-bold font-editorial text-stone-950 uppercase mt-2">
                2 FT / 24 INCH
              </p>
              <p className="text-xs text-stone-600 mt-2 font-mono">
                610 mm ergonomic arm reach depth. Ideal for laptop, monitor and paperwork.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs">
              <div className="flex items-center justify-between text-xs font-mono text-stone-500 uppercase">
                <span>Working Height</span>
                <span>Height (Z)</span>
              </div>
              <p className="text-3xl font-bold font-editorial text-stone-950 uppercase mt-2">
                2.5 FT / 30 INCH
              </p>
              <p className="text-xs text-stone-600 mt-2 font-mono">
                762 mm standard executive working height accommodating modern task seating.
              </p>
            </div>
          </div>

          {/* Right Column: Blueprint Graphic Display */}
          <div className="lg:col-span-8">
            <div className="relative w-full h-[420px] sm:h-[500px] rounded-2xl bg-white border border-stone-300 shadow-xl overflow-hidden p-6 md:p-10 flex flex-col items-center justify-center bg-grid-pattern">
              <div
                className="relative w-full h-full max-h-[420px]"
                style={{ position: "relative" }}
              >
                <Image
                  src={
                    views.find((v) => v.id === activeView)?.image ||
                    "/images/technical/desk-dimensions.png"
                  }
                  alt={`Technical Drawing - ${activeView}`}
                  fill
                  className="object-contain transition-opacity duration-500"
                  sizes="(max-width: 1024px) 100vw, 800px"
                />
              </div>

              <div className="w-full pt-4 border-t border-stone-200 flex items-center justify-between text-xs font-mono text-stone-500">
                <span>Scale: 1:20 Metric / Imperial Reference</span>
                <span className="uppercase text-stone-900 font-semibold">
                  {views.find((v) => v.id === activeView)?.label}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
