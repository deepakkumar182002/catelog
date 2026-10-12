import React from "react";
import Link from "next/link";
import { ArrowUpRight, ShieldCheck, Truck, Ruler, FileText } from "lucide-react";
import { BackendImage } from "@/components/ui/BackendImage";

interface B2BSectionProps {
  content?: {
    b2bHeading?: string;
    b2bText?: string;
    b2bImage?: string;
  };
}

export function B2BSection({ content }: B2BSectionProps) {
  const heading = content?.b2bHeading || "BUILDING SOMETHING BIGGER?";
  const text =
    content?.b2bText ||
    "Whether you are furnishing an office, developing an interior project, setting up a commercial space or sourcing furniture in quantity, we can discuss the right design, materials, dimensions and finish for your requirement.";
  const b2bImage = content?.b2bImage || "";

  const b2bHighlights = [
    {
      icon: Ruler,
      title: "Architectural Customization",
      desc: "Tailored dimensions, wood veneer selection, cable pathways and frame powder coat colors to match your client render schedules.",
    },
    {
      icon: FileText,
      title: "Spec Sheets & CAD Support",
      desc: "Comprehensive dimensional drawings, finish samples and technical specifications provided for interior consultants.",
    },
    {
      icon: ShieldCheck,
      title: "Commercial Durability",
      desc: "Heavy-duty MS structural frames and marine-grade joinery engineered for continuous commercial facility use.",
    },
    {
      icon: Truck,
      title: "Project Timeline Coordination",
      desc: "Staged batch deliveries and logistics scheduled directly around your interior contractor handover dates.",
    },
  ];

  return (
    <section className="py-28 md:py-36 px-6 md:px-12 bg-[#121212] text-[#FAF8F5] border-b border-stone-800">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Heading and CTAs */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span className="text-[11px] font-mono tracking-widest uppercase text-amber-400 font-semibold">
                Bulk Orders & Commercial Division
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-editorial font-bold text-white uppercase tracking-tight leading-[1.05]">
              {heading}
            </h2>
            <div className="w-16 h-[2px] bg-amber-600 my-8" />
            <p className="text-stone-300 text-sm md:text-base font-sans leading-relaxed max-w-xl">
              {text}
            </p>
            <p className="text-stone-500 text-xs font-mono mt-4 leading-relaxed max-w-xl">
              We work directly with builders, corporate clients, procurement officers and interior design firms across India.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 mt-8">
              <Link
                href="#enquiry"
                className="inline-flex items-center gap-2 bg-[#FAF8F5] hover:bg-stone-200 text-stone-950 text-xs font-mono uppercase tracking-widest px-7 py-4 rounded-full transition-all duration-300 shadow-md font-semibold"
              >
                <span>Discuss Your Project</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                href="#enquiry"
                className="inline-flex items-center gap-2 bg-transparent hover:bg-stone-900 text-stone-200 text-xs font-mono uppercase tracking-widest px-7 py-4 rounded-full border border-stone-700 transition-all duration-300"
              >
                <span>Request a Quote</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: B2B Highlights + Image */}
          <div className="lg:col-span-6 space-y-6">
            {b2bImage && (
              <div
                className="relative w-full h-56 rounded-2xl overflow-hidden border border-stone-800 shadow-xl"
                style={{ position: "relative" }}
              >
                <BackendImage
                  src={b2bImage}
                  alt="Commercial Architecture & Bulk Division"
                  fill
                  objectFit="cover"
                  sizes="(max-width: 1024px) 100vw, 600px"
                  loadingLabel="Loading Commercial Visual..."
                />
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {b2bHighlights.map((b) => {
                const Icon = b.icon;
                return (
                  <div
                    key={b.title}
                    className="p-5 rounded-2xl bg-stone-900/90 border border-stone-800 flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-9 h-9 rounded-lg bg-stone-800 flex items-center justify-center text-amber-400 mb-3">
                        <Icon className="w-4 h-4 stroke-[1.5]" />
                      </div>
                      <h3 className="text-sm font-bold font-editorial text-stone-100 uppercase tracking-tight mb-1.5">
                        {b.title}
                      </h3>
                      <p className="text-xs text-stone-400 leading-relaxed font-sans">
                        {b.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
