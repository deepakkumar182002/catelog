"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Check } from "lucide-react";

export function MetalFinishesSection() {
  const [selectedFinish, setSelectedFinish] = useState<number>(0);

  const finishes = [
    {
      id: 0,
      name: "MATTE BLACK — STANDARD",
      colorCode: "#121212",
      description: "Our signature electrostatic powder coat. Deep matte texture resistant to fingerprints, everyday handling and abrasion.",
      image: "/images/finishes/matte-black.png",
      tag: "Standard Issue",
    },
    {
      id: 1,
      name: "GRAPHITE GREY — MODERN",
      colorCode: "#3E4042",
      description: "Subtle industrial charcoal finish offering soft contrast against light woods, raw concrete and neutral architectural environments.",
      image: "/images/finishes/graphite-grey.png",
      tag: "Architectural",
    },
    {
      id: 2,
      name: "WHITE — CLEAN & MINIMAL",
      colorCode: "#FAFAFA",
      description: "Pristine matte architectural white finish creating bright, open spaces with Scandinavian clarity.",
      image: "/images/finishes/white.png",
      tag: "Contemporary",
    },
    {
      id: 3,
      name: "CUSTOM COLOUR — ON REQUEST",
      colorCode: "#7A5E4D",
      description: "Custom RAL powder coat formulations matched precisely to your interior designer palette, corporate brand colors or project specifications.",
      image: "/images/finishes/custom-colour.png",
      tag: "Bespoke RAL",
    },
  ];

  return (
    <section id="finishes" className="py-28 md:py-36 px-6 md:px-12 bg-[#FAF8F5] border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Heading and Finish Selector */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <span className="text-[11px] font-mono tracking-widest uppercase text-amber-800 font-semibold mb-3">
              Surface Treatment
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-editorial font-bold text-stone-950 uppercase tracking-tight">
              METAL FRAME FINISHES
            </h2>
            <p className="text-stone-700 text-sm md:text-base font-sans mt-4 leading-relaxed">
              Durable powder-coated finishes with a premium matte appearance. Cured at high temperatures for permanent metal bonding and lifetime scratch resistance.
            </p>

            {/* Interactive Selectors */}
            <div className="mt-8 space-y-3">
              {finishes.map((f, idx) => {
                const isSelected = selectedFinish === idx;
                return (
                  <div
                    key={f.id}
                    onClick={() => setSelectedFinish(idx)}
                    className={`cursor-pointer p-4 rounded-xl border transition-all duration-300 flex items-center justify-between ${
                      isSelected
                        ? "bg-white border-stone-900 shadow-md ring-1 ring-stone-900/10"
                        : "bg-stone-50/60 border-stone-200/80 hover:bg-stone-100"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      {/* Color indicator swatch */}
                      <span
                        className="w-7 h-7 rounded-full border border-stone-300 shadow-inner shrink-0 flex items-center justify-center"
                        style={{ backgroundColor: f.colorCode }}
                      >
                        {isSelected && (
                          <Check
                            className={`w-3.5 h-3.5 ${
                              f.colorCode === "#FAFAFA" ? "text-stone-900" : "text-white"
                            }`}
                          />
                        )}
                      </span>
                      <div>
                        <h4 className="text-sm font-bold font-editorial text-stone-950 uppercase tracking-tight">
                          {f.name}
                        </h4>
                        <p className="text-xs text-stone-500 font-mono mt-0.5 line-clamp-1">
                          {f.description}
                        </p>
                      </div>
                    </div>

                    <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded-full bg-stone-100 border border-stone-200 text-stone-600 shrink-0 ml-2">
                      {f.tag}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 p-4 bg-stone-100/70 rounded-xl border border-stone-200 text-xs font-mono text-stone-600 flex items-center justify-between">
              <span>Selected Preview:</span>
              <span className="font-bold text-stone-900">
                {finishes[selectedFinish].name}
              </span>
            </div>
          </div>

          {/* Right Column: Active Finish Visual Showcase */}
          <div className="lg:col-span-6">
            <div className="relative w-full h-[400px] sm:h-[480px] rounded-2xl bg-white border border-stone-300 shadow-xl overflow-hidden p-8 flex flex-col justify-between">
              <div
                className="relative w-full h-[280px] sm:h-[320px]"
                style={{ position: "relative" }}
              >
                <Image
                  src={finishes[selectedFinish].image}
                  alt={finishes[selectedFinish].name}
                  fill
                  className="object-contain transition-all duration-500"
                  sizes="(max-width: 1024px) 100vw, 600px"
                />
              </div>

              <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono tracking-widest uppercase text-stone-500">
                    Finish Specification
                  </span>
                  <p className="text-sm font-bold font-editorial text-stone-900 uppercase">
                    {finishes[selectedFinish].name}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className="w-5 h-5 rounded-full border border-stone-300"
                    style={{ backgroundColor: finishes[selectedFinish].colorCode }}
                  />
                  <span className="text-xs font-mono text-stone-600 uppercase">
                    Electrostatic Coated
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
