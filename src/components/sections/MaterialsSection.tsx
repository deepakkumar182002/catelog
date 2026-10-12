"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Check } from "lucide-react";

export function MaterialsSection() {
  const [selectedMaterial, setSelectedMaterial] = useState<string>("TEAK");

  const woods = [
    {
      name: "OAK",
      tagline: "Light Natural Wood Grain",
      description: "Gentle Scandinavian warmth with light, tight grain structures. Ideal for open, naturally lit modern workspaces.",
      image: "/images/materials/oak.png",
      tone: "#D8C7A5",
    },
    {
      name: "TEAK",
      tagline: "Warm Golden Wood Tone",
      description: "Timeless golden-brown hues celebrated for natural oil richness, structural density and enduring character over generations.",
      image: "/images/materials/teak.png",
      tone: "#B7864B",
    },
    {
      name: "WALNUT",
      tagline: "Rich Premium Dark Wood Grain",
      description: "Deep, sophisticated dark chocolate tones with expressive grain figure. Standard choice for executive luxury environments.",
      image: "/images/materials/walnut.png",
      tone: "#5B4028",
    },
    {
      name: "SHEESHAM",
      tagline: "Natural Indian Hardwood Character",
      description: "Dramatic contrasting grain patterns and high physical hardness. Imparts unmistakable organic individuality to each desktop.",
      image: "/images/materials/sheesham.png",
      tone: "#8A542D",
    },
  ];

  return (
    <section id="materials" className="py-28 md:py-36 px-6 md:px-12 bg-[#F6F3ED] border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="max-w-3xl pb-12 border-b border-stone-300">
          <span className="text-[11px] font-mono tracking-widest uppercase text-amber-800 font-semibold">
            Top Material Options
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-editorial font-bold text-stone-950 uppercase tracking-tight mt-2">
            MATERIALS THAT DEFINE THE DESIGN
          </h2>
          <p className="text-stone-700 text-sm md:text-base font-sans mt-4 leading-relaxed">
            Choose the finish that matches your architectural style. Natural veneer, solid wood and laminate options are available depending on the selected model and project requirements.
          </p>
        </div>

        {/* Wood Material Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-12">
          {woods.map((wood) => {
            const isSelected = selectedMaterial === wood.name;
            return (
              <div
                key={wood.name}
                onClick={() => setSelectedMaterial(wood.name)}
                className={`cursor-pointer rounded-2xl bg-white border transition-all duration-300 overflow-hidden flex flex-col justify-between ${
                  isSelected
                    ? "border-stone-900 shadow-xl ring-2 ring-stone-900/10"
                    : "border-stone-200/90 hover:border-stone-400 shadow-sm"
                }`}
              >
                <div>
                  {/* Texture swatch */}
                  <div
                    className="relative w-full h-44 bg-stone-100 overflow-hidden"
                    style={{ position: "relative" }}
                  >
                    <Image
                      src={wood.image}
                      alt={`${wood.name} wood texture`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
                    />
                    <div className="absolute top-3 right-3">
                      <span
                        className="w-4 h-4 rounded-full border border-white/60 inline-block shadow-sm"
                        style={{ backgroundColor: wood.tone }}
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-lg font-bold font-editorial text-stone-950 uppercase tracking-tight">
                        {wood.name}
                      </h3>
                      {isSelected && (
                        <Check className="w-4 h-4 text-stone-900" />
                      )}
                    </div>
                    <p className="text-xs font-mono text-amber-800 font-medium mb-3">
                      {wood.tagline}
                    </p>
                    <p className="text-xs text-stone-600 leading-relaxed font-sans">
                      {wood.description}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2">
                  <div className="w-full py-2 text-center rounded-lg bg-stone-100 text-[11px] font-mono uppercase text-stone-700 tracking-wider">
                    {isSelected ? "Selected Preference" : "Click to Preview"}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tabletop Thickness Comparison */}
        <div className="mt-16 pt-12 border-t border-stone-300">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
            <div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-stone-500">
                Structural Profile
              </span>
              <h3 className="text-2xl md:text-3xl font-editorial font-bold text-stone-900 uppercase tracking-tight mt-1">
                TABLE TOP THICKNESS
              </h3>
            </div>
            <p className="text-xs font-mono text-stone-500 mt-2 md:mt-0">
              Select between slimline ergonomics and substantial architectural presence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* 18 MM Standard */}
            <div className="bg-white p-8 rounded-2xl border border-stone-200/90 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono uppercase tracking-widest text-stone-500">
                    Option A
                  </span>
                  <span className="bg-stone-100 text-stone-700 text-[10px] font-mono uppercase px-3 py-1 rounded-full border border-stone-200">
                    Standard Profile
                  </span>
                </div>
                <h4 className="text-2xl font-bold font-editorial text-stone-950 uppercase tracking-tight">
                  18 MM — STANDARD
                </h4>
                <p className="text-xs text-stone-600 mt-2 font-mono leading-relaxed">
                  Clean, minimalist visual weight. Balances high structural rigidity with a lightweight contemporary aesthetic suited for compact modern spaces.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-stone-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* Visual gauge */}
                  <div className="w-24 h-4.5 bg-amber-800/80 rounded-xs border border-amber-950" />
                  <span className="text-xs font-mono font-bold text-stone-800">18 mm</span>
                </div>
                <span className="text-[11px] font-mono text-stone-500">Calibrated Plywood / Solid</span>
              </div>
            </div>

            {/* 25 MM Premium */}
            <div className="bg-white p-8 rounded-2xl border border-stone-900 shadow-md flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono uppercase tracking-widest text-amber-800 font-semibold">
                    Option B
                  </span>
                  <span className="bg-stone-900 text-white text-[10px] font-mono uppercase px-3 py-1 rounded-full">
                    Executive Profile
                  </span>
                </div>
                <h4 className="text-2xl font-bold font-editorial text-stone-950 uppercase tracking-tight">
                  25 MM — PREMIUM LOOK
                </h4>
                <p className="text-xs text-stone-600 mt-2 font-mono leading-relaxed">
                  Substantial executive stature with pronounced edge profiling. Imparts an authoritative architectural gravity to boardroom and executive private offices.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-stone-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* Visual gauge */}
                  <div className="w-24 h-6 bg-amber-900 rounded-xs border border-amber-950" />
                  <span className="text-xs font-mono font-bold text-stone-800">25 mm</span>
                </div>
                <span className="text-[11px] font-mono text-stone-500">Heavy-Gauge Solid / Veneer</span>
              </div>
            </div>
          </div>
        </div>

        {/* Note on model dependency */}
        <div className="mt-8 text-center">
          <p className="text-xs font-mono text-stone-500">
            * Material and thickness availability depends on selected model and project engineering requirements.
          </p>
        </div>
      </div>
    </section>
  );
}
