import React from "react";
import { BackendImage } from "@/components/ui/BackendImage";

interface StorageHardwareSectionProps {
  content?: {
    hardwareTagline?: string;
    hardwareHeading?: string;
    hardwareSubheading?: string;

    hardwareItem1Title?: string;
    hardwareItem1Spec?: string;
    hardwareItem1Desc?: string;
    hardwareItem1Detail?: string;
    hardwareItem1Image?: string;

    hardwareItem2Title?: string;
    hardwareItem2Spec?: string;
    hardwareItem2Desc?: string;
    hardwareItem2Detail?: string;
    hardwareItem2Image?: string;

    hardwareItem3Title?: string;
    hardwareItem3Spec?: string;
    hardwareItem3Desc?: string;
    hardwareItem3Detail?: string;
    hardwareItem3Image?: string;

    hardwareItem4Title?: string;
    hardwareItem4Spec?: string;
    hardwareItem4Desc?: string;
    hardwareItem4Detail?: string;
    hardwareItem4Image?: string;
  };
}

export function StorageHardwareSection({ content }: StorageHardwareSectionProps) {
  const tagline = content?.hardwareTagline || "Technical Construction";
  const heading = content?.hardwareHeading || "STORAGE & HARDWARE";
  const subheading =
    content?.hardwareSubheading ||
    "High-quality hardware designed for smooth and long-lasting everyday use. We never cut corners on internal mechanics, runners or joinery components.";

  const hardwareItems = [
    {
      title: content?.hardwareItem1Title || "FULL-EXTENSION TELESCOPIC CHANNEL",
      spec: content?.hardwareItem1Spec || "16–20 INCH LENGTH",
      description:
        content?.hardwareItem1Desc ||
        "Heavy-gauge ball-bearing runners providing 100% full extension drawer access, smooth dampening, and high load capacity without sagging.",
      image: content?.hardwareItem1Image || "",
      detail: content?.hardwareItem1Detail || "Silent steel ball-bearings",
    },
    {
      title: content?.hardwareItem2Title || "DRAWER BOX CONSTRUCTION",
      spec: content?.hardwareItem2Spec || "12 MM SIDES • 6 MM BOTTOM",
      description:
        content?.hardwareItem2Desc ||
        "Engineered from calibrated structural marine-grade plywood with interlocking joints, ensuring lifetime squareness under heavy storage loads.",
      image: content?.hardwareItem2Image || "",
      detail: content?.hardwareItem2Detail || "Calibrated Birch / Hardwood Ply",
    },
    {
      title: content?.hardwareItem3Title || "HANDLE OPTIONS",
      spec: content?.hardwareItem3Spec || "BLACK METAL / PROFILE HANDLE",
      description:
        content?.hardwareItem3Desc ||
        "Minimalist aluminum and steel J-profile and edge-mount handles, powder-coated in matte black to integrate seamlessly into drawer faces.",
      image: content?.hardwareItem3Image || "",
      detail: content?.hardwareItem3Detail || "Ergonomic flush grip profile",
    },
    {
      title: content?.hardwareItem4Title || "SIDE CABINET PANEL",
      spec: content?.hardwareItem4Spec || "18 MM PLYWOOD • MATTE BLACK FINISH",
      description:
        content?.hardwareItem4Desc ||
        "Substantial 18mm plywood perimeter side casing with seamless polyurethane edge banding, safeguarding the pedestal against daily scuffs.",
      image: content?.hardwareItem4Image || "",
      detail: content?.hardwareItem4Detail || "Impact-resistant matte casing",
    },
  ];

  return (
    <section id="hardware" className="py-28 md:py-36 px-6 md:px-12 bg-[#F6F3ED] border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl pb-12 border-b border-stone-300">
          <span className="text-[11px] font-mono tracking-widest uppercase text-amber-800 font-semibold">
            {tagline}
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-editorial font-bold text-stone-950 uppercase tracking-tight mt-2">
            {heading}
          </h2>
          <p className="text-stone-700 text-sm md:text-base font-sans mt-4 leading-relaxed">
            {subheading}
          </p>
        </div>

        {/* 4 Technical Component Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-12">
          {hardwareItems.map((item, idx) => (
            <div
              key={item.title}
              className="bg-white rounded-2xl border border-stone-200/90 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-md transition-shadow"
            >
              <div>
                {/* Photo Header */}
                <div
                  className="relative w-full h-52 bg-stone-100 overflow-hidden"
                  style={{ position: "relative" }}
                >
                  <BackendImage
                    src={item.image}
                    alt={item.title}
                    fill
                    objectFit="cover"
                    className="group-hover:scale-103 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 550px"
                    fallbackLabel={`${item.title} Photo — Upload in Admin`}
                    loadingLabel="Loading hardware photo..."
                  />
                  <div className="absolute top-4 left-4 z-10 bg-stone-900 text-white text-[10px] font-mono uppercase px-3 py-1 rounded-full">
                    0{idx + 1}
                  </div>
                </div>

                {/* Details */}
                <div className="p-8">
                  <span className="text-xs font-mono uppercase tracking-wider text-amber-800 font-semibold">
                    {item.spec}
                  </span>
                  <h3 className="text-xl font-bold font-editorial text-stone-950 uppercase tracking-tight mt-1 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed font-sans">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="px-8 pb-8 pt-2">
                <div className="py-2.5 px-4 rounded-xl bg-stone-50 border border-stone-200 text-xs font-mono text-stone-700 flex items-center justify-between">
                  <span className="text-stone-500 uppercase text-[10px]">Specification:</span>
                  <span className="font-semibold text-stone-900">{item.detail}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
