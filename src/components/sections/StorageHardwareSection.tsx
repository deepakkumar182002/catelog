import React from "react";
import Image from "next/image";

interface StorageHardwareSectionProps {
  content?: {
    hardwareTagline?: string;
    hardwareHeading?: string;
    hardwareSubheading?: string;
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
      title: "FULL-EXTENSION TELESCOPIC CHANNEL",
      spec: "16–20 INCH LENGTH",
      description: "Heavy-gauge ball-bearing runners providing 100% full extension drawer access, smooth dampening, and high load capacity without sagging.",
      image: "/images/hardware/telescopic-channel.png",
      detail: "Silent steel ball-bearings",
    },
    {
      title: "DRAWER BOX CONSTRUCTION",
      spec: "12 MM SIDES • 6 MM BOTTOM",
      description: "Engineered from calibrated structural marine-grade plywood with interlocking joints, ensuring lifetime squareness under heavy storage loads.",
      image: "/images/hardware/drawer-box.png",
      detail: "Calibrated Birch / Hardwood Ply",
    },
    {
      title: "HANDLE OPTIONS",
      spec: "BLACK METAL / PROFILE HANDLE",
      description: "Minimalist aluminum and steel J-profile and edge-mount handles, powder-coated in matte black to integrate seamlessly into drawer faces.",
      image: "/images/hardware/profile-handle.png",
      detail: "Ergonomic flush grip profile",
    },
    {
      title: "SIDE CABINET PANEL",
      spec: "18 MM PLYWOOD • MATTE BLACK FINISH",
      description: "Substantial 18mm plywood perimeter side casing with seamless polyurethane edge banding, safeguarding the pedestal against daily scuffs.",
      image: "/images/hardware/side-cabinet.png",
      detail: "Impact-resistant matte casing",
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
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-103 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 550px"
                  />
                  <div className="absolute top-4 left-4 bg-stone-900 text-white text-[10px] font-mono uppercase px-3 py-1 rounded-full">
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
