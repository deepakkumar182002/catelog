"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2, Layers, Cpu, ShieldCheck } from "lucide-react";

interface FeaturedProductSectionProps {
  content?: {
    featuredTagline?: string;
    featuredModel?: string;
    featuredHeading?: string;
    featuredDescription?: string;
  };
}

export function FeaturedProductSection({ content }: FeaturedProductSectionProps) {
  const [activeHotspot, setActiveHotspot] = useState<number>(0);

  const tagline = content?.featuredTagline || "Catalogue Focus";
  const model = content?.featuredModel || "MODEL EL-D01";
  const heading = content?.featuredHeading || "EXECUTIVE WORK DESK";

  const hotspots = [
    {
      id: 0,
      title: "TABLE TOP",
      spec: "Natural Wood Finish • 18–25 mm Thickness",
      description:
        "Kiln-dried hardwood and natural veneer tops with bevelled edges. Treated with commercial-grade scratch-resistant matte clear coat that preserves natural wood grain warmth.",
      image: "/images/details/tabletop-detail.png",
      tag: "Surfaces",
    },
    {
      id: 1,
      title: "DRAWER SYSTEM",
      spec: "Four Smooth Drawers • Full-Extension Channels",
      description:
        "Precision telescopic channels allow 100% full-extension access. Constructed with 12mm plywood drawer boxes and integrated flush profile metal handles.",
      image: "/images/details/drawer-detail.png",
      tag: "Storage",
    },
    {
      id: 2,
      title: "METAL FRAME",
      spec: "Strong MS Square-Pipe • Matte Black Coating",
      description:
        "High-tensile Mild Steel square-tube perimeter framework. Finished in electrostatic matte black powder coat for corrosion resistance and architectural minimalism.",
      image: "/images/details/metalframe-detail.png",
      tag: "Structure",
    },
    {
      id: 3,
      title: "X SUPPORT",
      spec: "Metal Cross-Support • Zero Lateral Deflection",
      description:
        "Signature industrial X-brace provides structural triangulated reinforcement. Ensures total rock-solid stability even under heavy dual-monitor executive setups.",
      image: "/images/details/xsupport-detail.png",
      tag: "Stability",
    },
  ];

  return (
    <section id="featured" className="py-28 md:py-36 px-6 md:px-12 bg-[#FAF8F5] border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-12 border-b border-stone-300">
          <div>
            <div className="flex items-center gap-3">
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
          </div>

          <div className="mt-4 md:mt-0 flex items-center gap-4">
            <Link
              href="#enquiry"
              className="inline-flex items-center gap-2 bg-stone-900 hover:bg-amber-900 text-[#FAF8F5] text-xs font-mono uppercase tracking-widest px-6 py-3.5 rounded-full transition-all duration-300 shadow-md"
            >
              <span>Request This Design</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Master Showcase Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-12 items-start">
          {/* Left Column: Product Photo & Dimensions Summary */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div
              className="relative w-full h-[400px] sm:h-[480px] md:h-[540px] rounded-2xl bg-white border border-stone-200/90 shadow-lg overflow-hidden group"
              style={{ position: "relative" }}
            >
              <Image
                src="/images/products/executive-work-desk.png"
                alt="Executive Work Desk Full View"
                fill
                priority
                className="object-contain p-6 md:p-10 group-hover:scale-102 transition-transform duration-700 ease-out"
                sizes="(max-width: 1024px) 100vw, 700px"
              />

              {/* Badges */}
              <div className="absolute top-6 left-6 flex flex-col gap-2">
                <span className="bg-stone-900 text-[#FAF8F5] text-[10px] font-mono uppercase px-3 py-1 rounded-full tracking-wider shadow">
                  Executive Series
                </span>
                <span className="bg-stone-100/90 backdrop-blur-sm text-stone-800 border border-stone-300 text-[10px] font-mono uppercase px-3 py-1 rounded-full tracking-wider">
                  Customization Available
                </span>
              </div>
            </div>

            {/* Product Specifications Table */}
            <div className="bg-stone-100/80 p-6 md:p-8 rounded-2xl border border-stone-200">
              <h3 className="text-xs font-mono uppercase tracking-widest text-stone-500 mb-4">
                Standard Engineering Dimensions
              </h3>
              <div className="grid grid-cols-3 gap-6 text-stone-900">
                <div className="border-l-2 border-stone-900 pl-4">
                  <span className="text-[11px] font-mono text-stone-500 uppercase block">Length</span>
                  <p className="text-base md:text-lg font-bold font-editorial mt-0.5">5 FT / 60 INCH</p>
                </div>
                <div className="border-l-2 border-stone-900 pl-4">
                  <span className="text-[11px] font-mono text-stone-500 uppercase block">Width</span>
                  <p className="text-base md:text-lg font-bold font-editorial mt-0.5">2 FT / 24 INCH</p>
                </div>
                <div className="border-l-2 border-stone-900 pl-4">
                  <span className="text-[11px] font-mono text-stone-500 uppercase block">Height</span>
                  <p className="text-base md:text-lg font-bold font-editorial mt-0.5">2.5 FT / 30 INCH</p>
                </div>
              </div>

              {/* Core Features Bullets */}
              <div className="mt-6 pt-6 border-t border-stone-200/80 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-stone-700 font-mono">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-800 shrink-0" />
                  <span>Natural wood finish (18–25 mm)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-800 shrink-0" />
                  <span>Strong MS square-pipe metal frame</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-800 shrink-0" />
                  <span>Matte black electrostatic powder coat</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-800 shrink-0" />
                  <span>Four smooth full-extension drawers</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-800 shrink-0" />
                  <span>Signature X-shaped support structure</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-800 shrink-0" />
                  <span>Integrated side storage cabinet</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Hotspot Details */}
          <div className="lg:col-span-5 flex flex-col">
            <span className="text-[11px] font-mono uppercase tracking-widest text-stone-500 mb-2">
              Component Examination
            </span>
            <h3 className="text-2xl md:text-3xl font-editorial font-bold text-stone-900 uppercase tracking-tight">
              DESIGN DETAILS
            </h3>
            <p className="text-xs text-stone-600 font-mono mt-1 mb-6 leading-relaxed">
              Every detail is crafted for strength, stability and a premium look. Select a component to inspect its engineering:
            </p>

            {/* Hotspot Accordion / Switcher */}
            <div className="space-y-3">
              {hotspots.map((item, idx) => {
                const isActive = activeHotspot === idx;
                return (
                  <div
                    key={item.id}
                    onClick={() => setActiveHotspot(idx)}
                    className={`cursor-pointer rounded-xl transition-all duration-300 border ${
                      isActive
                        ? "bg-white border-stone-900 shadow-md p-5"
                        : "bg-stone-50/70 border-stone-200/80 hover:bg-stone-100/80 p-4"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-mono font-bold ${
                            isActive ? "bg-stone-900 text-white" : "bg-stone-200 text-stone-700"
                          }`}
                        >
                          0{idx + 1}
                        </span>
                        <div>
                          <h4 className="text-sm font-bold text-stone-900 uppercase font-editorial tracking-tight">
                            {item.title}
                          </h4>
                          <span className="text-[11px] font-mono text-stone-500">
                            {item.spec}
                          </span>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-stone-100 border border-stone-200 text-stone-600">
                        {item.tag}
                      </span>
                    </div>

                    {/* Expanded Content with Photo Preview */}
                    {isActive && (
                      <div className="mt-4 pt-4 border-t border-stone-100 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                        <div className="sm:col-span-7">
                          <p className="text-xs text-stone-700 leading-relaxed font-sans">
                            {item.description}
                          </p>
                        </div>
                        <div className="sm:col-span-5">
                          <div
                            className="relative w-full h-24 rounded-lg overflow-hidden border border-stone-200 bg-stone-100"
                            style={{ position: "relative" }}
                          >
                            <Image
                              src={item.image}
                              alt={item.title}
                              fill
                              className="object-cover"
                              sizes="160px"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bottom Callout */}
            <div className="mt-8 p-6 rounded-xl bg-amber-950 text-[#FAF8F5] flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-300">
                  Custom Orders & Dimensions
                </span>
                <p className="text-xs text-stone-200 mt-1 leading-relaxed">
                  Need this model tailored in specific length, wood tone or reversed drawer pedestal for your space?
                </p>
              </div>
              <Link
                href="#enquiry"
                className="mt-4 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-300 hover:text-white transition-colors"
              >
                <span>Request Custom Specifications</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
