"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2, RotateCcw, Eye } from "lucide-react";
import { BackendImage } from "@/components/ui/BackendImage";

interface FeaturedProductSectionProps {
  content?: {
    featuredTagline?: string;
    featuredModel?: string;
    featuredHeading?: string;
    featuredDescription?: string;
    featuredMainImage?: string;

    featuredHotspot1Title?: string;
    featuredHotspot1Spec?: string;
    featuredHotspot1Desc?: string;
    featuredHotspot1Tag?: string;
    featuredHotspot1Image?: string;

    featuredHotspot2Title?: string;
    featuredHotspot2Spec?: string;
    featuredHotspot2Desc?: string;
    featuredHotspot2Tag?: string;
    featuredHotspot2Image?: string;

    featuredHotspot3Title?: string;
    featuredHotspot3Spec?: string;
    featuredHotspot3Desc?: string;
    featuredHotspot3Tag?: string;
    featuredHotspot3Image?: string;

    featuredHotspot4Title?: string;
    featuredHotspot4Spec?: string;
    featuredHotspot4Desc?: string;
    featuredHotspot4Tag?: string;
    featuredHotspot4Image?: string;
  };
}

export function FeaturedProductSection({ content }: FeaturedProductSectionProps) {
  // activeHotspot: null means showing the Main Desk full view, 0..3 means showing that specific component
  const [activeHotspot, setActiveHotspot] = useState<number | null>(0);

  const tagline = content?.featuredTagline || "Catalogue Focus";
  const model = content?.featuredModel || "MODEL EL-D01";
  const heading = content?.featuredHeading || "EXECUTIVE WORK DESK";
  const mainImage = content?.featuredMainImage || "";

  const hotspots = [
    {
      id: 0,
      title: content?.featuredHotspot1Title || "TABLE TOP",
      spec: content?.featuredHotspot1Spec || "Natural Wood Finish • 18–25 mm Thickness",
      description:
        content?.featuredHotspot1Desc ||
        "Kiln-dried hardwood and natural veneer tops with bevelled edges. Treated with commercial-grade scratch-resistant matte clear coat that preserves natural wood grain warmth.",
      image: content?.featuredHotspot1Image || "",
      tag: content?.featuredHotspot1Tag || "Surfaces",
    },
    {
      id: 1,
      title: content?.featuredHotspot2Title || "DRAWER SYSTEM",
      spec: content?.featuredHotspot2Spec || "Four Smooth Drawers • Full-Extension Channels",
      description:
        content?.featuredHotspot2Desc ||
        "Precision telescopic channels allow 100% full-extension access. Constructed with 12mm plywood drawer boxes and integrated flush profile metal handles.",
      image: content?.featuredHotspot2Image || "",
      tag: content?.featuredHotspot2Tag || "Storage",
    },
    {
      id: 2,
      title: content?.featuredHotspot3Title || "METAL FRAME",
      spec: content?.featuredHotspot3Spec || "Strong MS Square-Pipe • Matte Black Coating",
      description:
        content?.featuredHotspot3Desc ||
        "High-tensile Mild Steel square-tube perimeter framework. Finished in electrostatic matte black powder coat for corrosion resistance and architectural minimalism.",
      image: content?.featuredHotspot3Image || "",
      tag: content?.featuredHotspot3Tag || "Structure",
    },
    {
      id: 3,
      title: content?.featuredHotspot4Title || "X SUPPORT",
      spec: content?.featuredHotspot4Spec || "Metal Cross-Support • Zero Lateral Deflection",
      description:
        content?.featuredHotspot4Desc ||
        "Signature industrial X-brace provides structural triangulated reinforcement. Ensures total rock-solid stability even under heavy dual-monitor executive setups.",
      image: content?.featuredHotspot4Image || "",
      tag: content?.featuredHotspot4Tag || "Stability",
    },
  ];

  // Determine which image to show in the Left Main Stage
  const selectedComponent = activeHotspot !== null ? hotspots[activeHotspot] : null;
  // If a hotspot is clicked and has an image, show that; if hotspot has no image, fallback to mainImage, otherwise empty string (BackendImage handles loader/placeholder)
  const activeLeftImage =
    selectedComponent && selectedComponent.image
      ? selectedComponent.image
      : mainImage;

  const activeLeftLabel = selectedComponent
    ? `Component 0${selectedComponent.id + 1}: ${selectedComponent.title}`
    : "Full View Executive Work Desk";

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
          {/* Left Column: Primary Interactive Showcase Viewer (Dynamically switches on right clicks) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div
              className="relative w-full h-[400px] sm:h-[480px] md:h-[540px] rounded-2xl bg-white border border-stone-200/90 shadow-lg overflow-hidden group"
              style={{ position: "relative" }}
            >
              {/* Dynamic Image in Left Stage */}
              <BackendImage
                key={activeLeftImage || "featured-main"}
                src={activeLeftImage}
                alt={activeLeftLabel}
                fill
                priority
                objectFit="contain"
                className="p-6 md:p-10 group-hover:scale-102 transition-transform duration-700 ease-out"
                sizes="(max-width: 1024px) 100vw, 700px"
                fallbackLabel={`${activeLeftLabel} — Upload in Admin`}
                loadingLabel="Loading Inspection Image..."
              />

              {/* Badges / Active Component Indicator */}
              <div className="absolute top-6 left-6 flex flex-col gap-2 z-10">
                <span className="bg-stone-900 text-[#FAF8F5] text-[10px] font-mono uppercase px-3 py-1 rounded-full tracking-wider shadow">
                  Executive Series
                </span>
                <span className="bg-white/90 backdrop-blur-sm text-stone-800 border border-stone-300 text-[10px] font-mono uppercase px-3 py-1 rounded-full tracking-wider">
                  Customization Available
                </span>
                {selectedComponent && (
                  <span className="bg-amber-800 text-white text-[10px] font-mono uppercase px-3 py-1 rounded-full tracking-wider shadow animate-in fade-in duration-200">
                    Inspecting: 0{selectedComponent.id + 1} {selectedComponent.title}
                  </span>
                )}
              </div>

              {/* Switch to Full Desk View button if inspecting a component */}
              {selectedComponent && (
                <div className="absolute bottom-6 right-6 z-10">
                  <button
                    type="button"
                    onClick={() => setActiveHotspot(null)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-900/90 hover:bg-stone-900 text-white text-[10px] font-mono uppercase tracking-wider shadow-md backdrop-blur-xs transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>View Full Desk</span>
                  </button>
                </div>
              )}
            </div>

            {/* Product Specifications Table */}
            <div className="bg-stone-100/80 p-6 md:p-8 rounded-2xl border border-stone-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-mono uppercase tracking-widest text-stone-500">
                  Standard Engineering Dimensions
                </h3>
                {activeHotspot === null ? (
                  <span className="text-[10px] font-mono uppercase text-emerald-800 font-semibold">
                    Full Desk Selected
                  </span>
                ) : (
                  <button
                    onClick={() => setActiveHotspot(null)}
                    className="text-[10px] font-mono uppercase text-amber-800 hover:underline"
                  >
                    Show Full Desk Model
                  </button>
                )}
              </div>
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

          {/* Right Column: Interactive Hotspot Examination Points */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono uppercase tracking-widest text-stone-500">
                Component Examination
              </span>
              <span className="text-[10px] font-mono text-amber-800 uppercase font-semibold">
                Click any item to view on left
              </span>
            </div>
            <h3 className="text-2xl md:text-3xl font-editorial font-bold text-stone-900 uppercase tracking-tight">
              DESIGN DETAILS
            </h3>
            <p className="text-xs text-stone-600 font-mono mt-1 mb-6 leading-relaxed">
              Every detail is crafted for strength, stability and a premium look. Select a numbered component to inspect its engineering and reveal its image on the left:
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
                        ? "bg-white border-stone-900 shadow-md p-5 ring-1 ring-stone-900/10"
                        : "bg-stone-50/70 border-stone-200/80 hover:bg-stone-100/80 p-4"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-mono font-bold transition-colors ${
                            isActive ? "bg-stone-900 text-white" : "bg-stone-200 text-stone-700"
                          }`}
                        >
                          0{idx + 1}
                        </span>
                        <div>
                          <h4 className="text-sm font-bold text-stone-900 uppercase font-editorial tracking-tight flex items-center gap-2">
                            <span>{item.title}</span>
                            {isActive && (
                              <span className="inline-flex items-center gap-1 text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-amber-100 text-amber-900">
                                <Eye className="w-2.5 h-2.5" /> Shown on Left
                              </span>
                            )}
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
                          <span className="text-[10px] font-mono text-amber-900 mt-2 block font-semibold">
                            &larr; Displayed in main stage on left
                          </span>
                        </div>
                        <div className="sm:col-span-5">
                          <div
                            className="relative w-full h-24 rounded-lg overflow-hidden border border-stone-200 bg-stone-100"
                            style={{ position: "relative" }}
                          >
                            <BackendImage
                              src={item.image}
                              alt={item.title}
                              fill
                              objectFit="cover"
                              sizes="160px"
                              fallbackLabel="Upload in Admin"
                              loadingLabel="Loading..."
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
