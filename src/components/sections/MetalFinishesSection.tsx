"use client";

import React, { useState, useEffect } from "react";
import { Check } from "lucide-react";
import { BackendImage } from "@/components/ui/BackendImage";

interface FinishItem {
  id?: number | string;
  _id?: string;
  name: string;
  colorCode: string;
  description: string;
  image?: string;
  tag?: string;
}

export function MetalFinishesSection() {
  const [selectedFinish, setSelectedFinish] = useState<number>(0);
  const [finishes, setFinishes] = useState<FinishItem[]>([
    {
      id: 0,
      name: "MATTE BLACK — STANDARD",
      colorCode: "#121212",
      description: "Our signature electrostatic powder coat. Deep matte texture resistant to fingerprints, everyday handling and abrasion.",
      image: "",
      tag: "Standard Issue",
    },
    {
      id: 1,
      name: "GRAPHITE GREY — MODERN",
      colorCode: "#3E4042",
      description: "Subtle industrial charcoal finish offering soft contrast against light woods, raw concrete and neutral architectural environments.",
      image: "",
      tag: "Architectural",
    },
    {
      id: 2,
      name: "WHITE — CLEAN & MINIMAL",
      colorCode: "#FAFAFA",
      description: "Pristine matte architectural white finish creating bright, open spaces with Scandinavian clarity.",
      image: "",
      tag: "Contemporary",
    },
    {
      id: 3,
      name: "CUSTOM COLOUR — ON REQUEST",
      colorCode: "#7A5E4D",
      description: "Custom RAL powder coat formulations matched precisely to your interior designer palette, corporate brand colors or project specifications.",
      image: "",
      tag: "Bespoke RAL",
    },
  ]);

  useEffect(() => {
    async function loadFinishes() {
      try {
        const res = await fetch("/api/finishes");
        if (res.ok) {
          const data = await res.json();
          if (data.finishes && data.finishes.length > 0) {
            const mapped = data.finishes.map((f: any, idx: number) => ({
              id: idx,
              _id: f._id,
              name: f.name,
              colorCode: f.colorHex || "#121212",
              description: f.description || "Durable powder-coated finish with premium appearance.",
              image: f.image?.startsWith("/images/") ? "" : f.image,
              tag: f.type === "powder_coat" ? "Powder Coat" : "Custom RAL",
            }));
            setFinishes(mapped);
          }
        }
      } catch (err) {
        console.warn("Using offline finishes list");
      }
    }
    loadFinishes();
  }, []);

  const currentFinish = finishes[selectedFinish] || finishes[0];

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
                    key={f.id ?? idx}
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
                {currentFinish.name}
              </span>
            </div>
          </div>

          {/* Right Column: Visual Preview */}
          <div className="lg:col-span-6">
            <div
              className="relative w-full h-[450px] sm:h-[500px] rounded-2xl bg-white border border-stone-200 overflow-hidden shadow-xl"
              style={{ position: "relative" }}
            >
              <BackendImage
                key={currentFinish.name}
                src={currentFinish.image}
                alt={currentFinish.name}
                fill
                objectFit="cover"
                sizes="(max-width: 1024px) 100vw, 600px"
                fallbackLabel={`${currentFinish.name} Texture`}
                loadingLabel="Loading Finish Visual..."
              />

              {/* Color swatch floating tag */}
              <div className="absolute bottom-6 left-6 right-6 z-10 flex items-center justify-between bg-white/95 backdrop-blur-md p-4 rounded-xl border border-stone-200 shadow-md">
                <div className="flex items-center gap-3">
                  <div
                    className="w-6 h-6 rounded-md border border-stone-300 shadow-inner"
                    style={{ backgroundColor: currentFinish.colorCode }}
                  />
                  <div>
                    <p className="text-xs font-bold text-stone-900 uppercase font-editorial">
                      {currentFinish.name}
                    </p>
                    <span className="text-[10px] font-mono text-stone-500">
                      Hex: {currentFinish.colorCode}
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-mono uppercase text-amber-800 font-semibold">
                  Electrostatic Matte
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
