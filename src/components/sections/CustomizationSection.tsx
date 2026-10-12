import React from "react";
import Link from "next/link";
import { ArrowUpRight, Ruler, TreePine, Archive, Palette, Wrench, LayoutTemplate } from "lucide-react";

export function CustomizationSection() {
  const options = [
    {
      icon: Ruler,
      title: "SIZE & DIMENSIONS",
      desc: "Custom lengths, depths and heights calculated to fit exact executive corners, alcoves or multi-person cluster layouts.",
    },
    {
      icon: TreePine,
      title: "SURFACE MATERIAL",
      desc: "Selected hardwood timber, real wood architectural veneers, or heavy-duty scratch-resistant laminate varieties.",
    },
    {
      icon: Archive,
      title: "STORAGE ARCHITECTURE",
      desc: "Add, remove or reconfigure pedestal drawers. Options for file suspension folders, CPU cradles and lock mechanisms.",
    },
    {
      icon: Palette,
      title: "COLOR & FINISH",
      desc: "Custom wood tones (Oak, Teak, Walnut, Sheesham) paired with electrostatic powder-coat colors according to your palette.",
    },
    {
      icon: Wrench,
      title: "HARDWARE & HANDLES",
      desc: "Black profile edge handles, push-to-open soft-close mechanisms, cable management wire grommets and wireless power wells.",
    },
    {
      icon: LayoutTemplate,
      title: "SPATIAL LAYOUT",
      desc: "Left or right drawer orientation, L-shaped return executive attachments, and modular shared work cluster arrays.",
    },
  ];

  return (
    <section id="customization" className="py-28 md:py-36 px-6 md:px-12 bg-[#F6F3ED] border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-12 border-b border-stone-300">
          <div className="max-w-3xl">
            <span className="text-[11px] font-mono tracking-widest uppercase text-amber-800 font-semibold">
              Bespoke Studio Flexibility
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-editorial font-bold text-stone-950 uppercase tracking-tight mt-2">
              DESIGNED AROUND YOUR REQUIREMENTS
            </h2>
            <p className="text-stone-700 text-sm md:text-base font-sans mt-4 leading-relaxed">
              We collaborate with architects, interior consultants and project directors to adapt our core designs to unique project briefs.
            </p>
          </div>

          <div className="mt-6 md:mt-0">
            <span className="text-xs font-mono text-stone-500 uppercase block">
              Direct Studio Dialogue
            </span>
            <Link
              href="#enquiry"
              className="mt-2 inline-flex items-center gap-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-mono uppercase tracking-widest px-6 py-3.5 rounded-full transition-all shadow-md"
            >
              <span>Discuss Custom Spec</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* 6 Customization Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-12">
          {options.map((opt, idx) => {
            const Icon = opt.icon;
            return (
              <div
                key={opt.title}
                className="bg-white p-8 rounded-2xl border border-stone-200 shadow-xs hover:border-stone-900 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-stone-100 flex items-center justify-center text-stone-900 mb-6">
                    <Icon className="w-6 h-6 stroke-[1.5]" />
                  </div>
                  <span className="text-[10px] font-mono uppercase text-stone-400">
                    Category 0{idx + 1}
                  </span>
                  <h3 className="text-lg font-bold font-editorial text-stone-950 uppercase tracking-tight mt-1 mb-2">
                    {opt.title}
                  </h3>
                  <p className="text-xs text-stone-600 font-sans leading-relaxed">
                    {opt.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-100 text-[11px] font-mono text-amber-800">
                  Customizable on request →
                </div>
              </div>
            );
          })}
        </div>

        {/* Realistic boundary disclaimer */}
        <div className="mt-12 p-6 rounded-2xl bg-stone-100 border border-stone-300 text-center max-w-3xl mx-auto">
          <p className="text-xs font-mono text-stone-700 leading-relaxed">
            * Customization is available depending on the selected model, minimum order quantities, and project structural feasibility.
          </p>
        </div>
      </div>
    </section>
  );
}
