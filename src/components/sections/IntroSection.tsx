import React from "react";
import { BackendImage } from "@/components/ui/BackendImage";

interface IntroSectionProps {
  content?: {
    philosophyTagline?: string;
    philosophyHeading?: string;
    philosophyParagraph1?: string;
    philosophyParagraph2?: string;
    philosophyPillar1?: string;
    philosophyPillar2?: string;
    philosophyPillar3?: string;
    philosophyImage?: string;
  };
}

export function IntroSection({ content }: IntroSectionProps) {
  const tagline = content?.philosophyTagline || "Our Design Philosophy";
  const heading = content?.philosophyHeading || "MODERN FURNITURE FOR A BETTER TOMORROW";
  const p1 =
    content?.philosophyParagraph1 ||
    "We create furniture that combines thoughtful design, practical functionality and lasting quality — built for modern homes, workspaces and commercial environments.";
  const p2 =
    content?.philosophyParagraph2 ||
    "Every curve, weld and joint is engineered to balance visual tranquility with heavy structural durability. We avoid disposable trends, focusing instead on purposeful materials that age gracefully over decades.";
  const pillar1 = content?.philosophyPillar1 || "Thoughtful";
  const pillar2 = content?.philosophyPillar2 || "Functional";
  const pillar3 = content?.philosophyPillar3 || "Enduring";
  const image = content?.philosophyImage || "";

  return (
    <section className="py-28 md:py-36 px-6 md:px-12 bg-[#F6F3ED] border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Editorial Statement */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <span className="text-[11px] font-mono tracking-widest uppercase text-amber-800 font-semibold mb-4">
              {tagline}
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-editorial font-bold text-stone-950 uppercase tracking-tighter leading-[1.05]">
              {heading}
            </h2>
            <div className="w-16 h-[2px] bg-stone-900 my-8" />
            <p className="text-stone-700 text-base md:text-lg leading-relaxed font-sans font-normal max-w-xl">
              {p1}
            </p>
            <p className="text-stone-500 text-xs md:text-sm font-mono mt-6 leading-relaxed max-w-xl">
              {p2}
            </p>

            {/* Quick Pillars */}
            <div className="grid grid-cols-3 gap-4 mt-10 pt-8 border-t border-stone-300">
              <div>
                <span className="text-[10px] font-mono text-stone-400 block uppercase">
                  Pillar 01
                </span>
                <span className="text-xs font-semibold text-stone-900 mt-1 block uppercase">
                  {pillar1}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-stone-400 block uppercase">
                  Pillar 02
                </span>
                <span className="text-xs font-semibold text-stone-900 mt-1 block uppercase">
                  {pillar2}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-stone-400 block uppercase">
                  Pillar 03
                </span>
                <span className="text-xs font-semibold text-stone-900 mt-1 block uppercase">
                  {pillar3}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Architectural Image Display */}
          <div className="lg:col-span-6">
            <div
              className="relative w-full h-[450px] sm:h-[550px] rounded-2xl overflow-hidden shadow-2xl border border-stone-300 bg-stone-100"
              style={{ position: "relative" }}
            >
              <BackendImage
                src={image}
                alt="Experience Life Architectural Workspace"
                fill
                objectFit="cover"
                className="hover:scale-103 transition-transform duration-700 ease-out"
                sizes="(max-width: 1024px) 100vw, 600px"
                fallbackLabel="Design Philosophy Photo — Upload in Admin"
                loadingLabel="Loading Architecture Photo..."
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 text-white pointer-events-none">
                <span className="text-[10px] font-mono tracking-widest uppercase text-amber-200">
                  Designed for Modern Living
                </span>
                <p className="text-sm font-medium mt-1">
                  Create a productive and stylish workspace with furniture designed around modern living.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
