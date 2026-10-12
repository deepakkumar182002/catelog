import React from "react";
import { Gem, Sparkles, Shield, Sliders, Briefcase } from "lucide-react";

export function WhyChooseUsSection() {
  const pillars = [
    {
      icon: Gem,
      title: "PREMIUM MATERIALS",
      description: "Carefully selected natural hardwoods, architectural veneers and structural steel for lasting beauty and structural density.",
    },
    {
      icon: Sparkles,
      title: "MODERN & FUNCTIONAL DESIGNS",
      description: "Timeless style that fits modern spaces, balancing visual minimalism with ergonomic utility and daily comfort.",
    },
    {
      icon: Shield,
      title: "STRONG & DURABLE BUILD",
      description: "Engineered with reinforced welded joints and durable powder coatings for lifetime commercial reliability.",
    },
    {
      icon: Sliders,
      title: "CUSTOMIZATION AVAILABLE",
      description: "Tailored solutions depending on product and project requirements — custom sizing, wood species and frame colors.",
    },
    {
      icon: Briefcase,
      title: "MADE FOR HOME & OFFICE",
      description: "Versatile furniture pieces designed to bridge executive boardrooms and inspiring residential work environments.",
    },
  ];

  return (
    <section className="py-28 md:py-36 px-6 md:px-12 bg-[#FAF8F5] border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl pb-12 border-b border-stone-300">
          <span className="text-[11px] font-mono tracking-widest uppercase text-amber-800 font-semibold">
            Brand Commitment
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-editorial font-bold text-stone-950 uppercase tracking-tight mt-2">
            WHY EXPERIENCE LIFE?
          </h2>
          <p className="text-stone-700 text-sm md:text-base font-sans mt-4 leading-relaxed">
            We don't simply produce furniture. We engineer thoughtful, long-lasting furniture systems tailored around the practical needs of modern spaces.
          </p>
        </div>

        {/* 5 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-12">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="bg-white p-8 rounded-2xl border border-stone-200/90 shadow-xs hover:border-stone-900 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-stone-100 flex items-center justify-center text-stone-900">
                      <Icon className="w-6 h-6 stroke-[1.5]" />
                    </div>
                    <span className="text-xs font-mono text-stone-400">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold font-editorial text-stone-950 uppercase tracking-tight mb-2">
                    {p.title}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed font-sans">
                    {p.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-100 text-[10px] font-mono uppercase tracking-wider text-amber-800">
                  Standard across all catalogue models
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
