import React from "react";
import Image from "next/image";

interface AboutSectionProps {
  content?: {
    aboutTagline?: string;
    aboutHeading?: string;
    aboutParagraph1?: string;
    aboutParagraph2?: string;
    aboutParagraph3?: string;
    aboutImage?: string;
  };
}

export function AboutSection({ content }: AboutSectionProps) {
  const tagline = content?.aboutTagline || "About the Brand";
  const heading = content?.aboutHeading || "DESIGNED FOR THE WAY YOU LIVE";
  const p1 =
    content?.aboutParagraph1 ||
    "Experience Life is built around a simple idea: furniture should be more than something that fills a room.";
  const p2 =
    content?.aboutParagraph2 ||
    "It should work with the space, support the way people use it and remain visually relevant over time.";
  const p3 =
    content?.aboutParagraph3 ||
    "We focus on modern forms, practical functionality, strong construction and material combinations that bring warmth and character to everyday spaces.";
  const image = content?.aboutImage || "/images/lifestyle/craftsmanship.png";

  return (
    <section id="about" className="py-28 md:py-36 px-6 md:px-12 bg-[#F6F3ED] border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Lifestyle Photo */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div
              className="relative w-full h-[450px] sm:h-[520px] rounded-2xl overflow-hidden border border-stone-300 shadow-xl group"
              style={{ position: "relative" }}
            >
              <Image
                src={image}
                alt="Experience Life Studio Construction & Materials"
                fill
                className="object-cover group-hover:scale-103 transition-transform duration-700 ease-out"
                sizes="(max-width: 1024px) 100vw, 500px"
              />
              <div className="absolute inset-0 bg-stone-900/10 group-hover:bg-transparent transition-colors duration-500" />
            </div>
          </div>

          {/* Right: Story */}
          <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col justify-center">
            <span className="text-[11px] font-mono tracking-widest uppercase text-amber-800 font-semibold mb-3">
              {tagline}
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-editorial font-bold text-stone-950 uppercase tracking-tight leading-[1.05]">
              {heading}
            </h2>
            <div className="w-16 h-[2px] bg-stone-900 my-8" />
            
            <p className="text-stone-800 text-base md:text-lg leading-relaxed font-sans">
              {p1}
            </p>
            <p className="text-stone-700 text-sm md:text-base leading-relaxed font-sans mt-4">
              {p2}
            </p>
            <p className="text-stone-600 text-xs md:text-sm leading-relaxed font-mono mt-6">
              {p3}
            </p>

            <div className="mt-10 pt-8 border-t border-stone-300 flex items-center gap-8">
              <div>
                <span className="text-2xl font-bold font-editorial text-stone-900">
                  EST. 2026
                </span>
                <span className="text-[10px] font-mono uppercase text-stone-500 block mt-0.5">
                  Collection Standard
                </span>
              </div>
              <div className="h-8 w-[1px] bg-stone-300" />
              <div>
                <span className="text-2xl font-bold font-editorial text-stone-900">
                  PRECISION
                </span>
                <span className="text-[10px] font-mono uppercase text-stone-500 block mt-0.5">
                  Hand-Finished
                </span>
              </div>
              <div className="h-8 w-[1px] bg-stone-300" />
              <div>
                <span className="text-2xl font-bold font-editorial text-stone-900">
                  ENDURING
                </span>
                <span className="text-[10px] font-mono uppercase text-stone-500 block mt-0.5">
                  Decade Durability
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
