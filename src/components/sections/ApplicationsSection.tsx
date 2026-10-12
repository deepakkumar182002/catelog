import React from "react";
import { Home, Briefcase, Building2, Compass, Coffee, Boxes } from "lucide-react";

export function ApplicationsSection() {
  const applications = [
    {
      icon: Home,
      title: "HOME",
      subtitle: "Study & Workspaces",
      description: "Modern home workspaces and dedicated study sanctuaries designed for calm, distraction-free productivity.",
    },
    {
      icon: Briefcase,
      title: "OFFICE",
      subtitle: "Executive Suites",
      description: "Functional workstations, leadership suites and collaborative pods engineered for high-intensity commercial use.",
    },
    {
      icon: Building2,
      title: "COMMERCIAL",
      subtitle: "Business Environments",
      description: "Durable, high-traffic furniture solutions built for modern business parks, studios and corporate facilities.",
    },
    {
      icon: Compass,
      title: "INTERIOR PROJECTS",
      subtitle: "Architect Collaborations",
      description: "Tailored custom furniture crafted to integrate seamlessly with interior design palettes and material schedules.",
    },
    {
      icon: Coffee,
      title: "HOSPITALITY",
      subtitle: "Lounges & Boutiques",
      description: "Visually refined furniture concepts for boutique hotels, executive club lounges and reception waiting areas.",
    },
    {
      icon: Boxes,
      title: "BULK PROJECTS",
      subtitle: "Large Scale Rollouts",
      description: "End-to-end manufacturing and precision delivery for corporate campuses, real estate developments and builders.",
    },
  ];

  return (
    <section className="py-28 md:py-36 px-6 md:px-12 bg-[#F6F3ED] border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl pb-12 border-b border-stone-300">
          <span className="text-[11px] font-mono tracking-widest uppercase text-amber-800 font-semibold">
            Spatial Applications
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-editorial font-bold text-stone-950 uppercase tracking-tight mt-2">
            BUILT FOR DIFFERENT SPACES
          </h2>
          <p className="text-stone-700 text-sm md:text-base font-sans mt-4 leading-relaxed">
            Our furniture adapts to diverse architectural settings — engineered with the durability required for commercial projects and the refined warmth desired for modern homes.
          </p>
        </div>

        {/* 6 Application Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-12">
          {applications.map((app, idx) => {
            const Icon = app.icon;
            return (
              <div
                key={app.title}
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

                  <span className="text-[10px] font-mono uppercase text-amber-800 tracking-wider font-semibold">
                    {app.subtitle}
                  </span>
                  <h3 className="text-xl font-bold font-editorial text-stone-950 uppercase tracking-tight mt-1 mb-3">
                    {app.title}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed font-sans">
                    {app.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-[11px] font-mono text-stone-500">
                  <span>Standard & Custom specs</span>
                  <span>Enquire →</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
