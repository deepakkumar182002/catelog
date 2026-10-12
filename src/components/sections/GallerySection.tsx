"use client";

import React, { useState, useEffect } from "react";
import { X, ZoomIn } from "lucide-react";
import { BackendImage } from "@/components/ui/BackendImage";

interface GalleryItem {
  _id?: string;
  title: string;
  image: string;
  category: string;
  description: string;
}

export function GallerySection() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [activeImage, setActiveImage] = useState<GalleryItem | null>(null);

  useEffect(() => {
    async function loadGallery() {
      try {
        const res = await fetch("/api/gallery");
        if (res.ok) {
          const data = await res.json();
          if (data.gallery && data.gallery.length > 0) {
            setItems(data.gallery);
          }
        }
      } catch {
        // Fallback
      }
    }
    loadGallery();
  }, []);

  const categories = [
    "ALL",
    "PRODUCTS",
    "DETAILS",
    "MATERIALS",
    "LIFESTYLE",
    "WORKSPACES",
    "CUSTOM DESIGNS",
  ];

  const filteredItems =
    activeCategory === "ALL"
      ? items
      : items.filter((item) => item.category?.toUpperCase() === activeCategory);

  return (
    <section id="gallery" className="py-28 md:py-36 px-6 md:px-12 bg-[#FAF8F5] border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-12 border-b border-stone-300">
          <div>
            <span className="text-[11px] font-mono tracking-widest uppercase text-amber-800 font-semibold">
              Visual Archive
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-editorial font-bold text-stone-950 uppercase tracking-tight mt-2">
              CURATED GALLERY
            </h2>
            <p className="text-stone-700 text-sm md:text-base font-sans mt-3">
              Explore photography of our furniture, structural details, material swatches and workspaces.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="mt-6 md:mt-0 flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCategory(c)}
                className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all ${
                  activeCategory === c
                    ? "bg-stone-900 text-white shadow-xs"
                    : "bg-stone-100 text-stone-700 hover:bg-stone-200 border border-stone-200"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-12">
          {filteredItems.map((item, idx) => (
            <div
              key={item._id || idx}
              onClick={() => setActiveImage(item)}
              className="cursor-pointer group relative rounded-2xl bg-white border border-stone-200/90 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-500"
            >
              <div
                className="relative w-full h-64 bg-stone-100 overflow-hidden"
                style={{ position: "relative" }}
              >
                <BackendImage
                  src={item.image}
                  alt={item.title}
                  fill
                  objectFit="cover"
                  className="group-hover:scale-106 transition-transform duration-700 ease-out"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
                  fallbackLabel="Gallery Photograph"
                  loadingLabel="Loading Archive..."
                />
                <div className="absolute inset-0 bg-stone-950/20 group-hover:bg-stone-950/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 duration-300">
                  <div className="w-10 h-10 rounded-full bg-white/90 text-stone-900 flex items-center justify-center shadow-md">
                    <ZoomIn className="w-4 h-4" />
                  </div>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center justify-between text-[10px] font-mono text-stone-500 uppercase">
                  <span>{item.category}</span>
                  <span>View</span>
                </div>
                <h3 className="text-xs font-bold font-editorial text-stone-900 uppercase mt-1 line-clamp-1">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {activeImage && (
          <div
            className="fixed inset-0 z-50 bg-stone-950/90 backdrop-blur-md flex items-center justify-center p-4 md:p-12 animate-in fade-in duration-200"
            onClick={() => setActiveImage(null)}
          >
            <div
              className="relative max-w-4xl w-full bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden p-6 text-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveImage(null)}
                className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div
                className="relative w-full h-[380px] sm:h-[480px] md:h-[540px] bg-black/40 rounded-xl overflow-hidden"
                style={{ position: "relative" }}
              >
                <BackendImage
                  src={activeImage.image}
                  alt={activeImage.title}
                  fill
                  objectFit="contain"
                  sizes="(max-width: 1024px) 100vw, 900px"
                  fallbackLabel="Archive Photograph"
                  loadingLabel="Loading Visual..."
                />
              </div>

              <div className="mt-4 pt-4 border-t border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-base font-bold font-editorial uppercase">
                    {activeImage.title}
                  </h3>
                  <p className="text-xs text-stone-400 mt-1 font-mono">
                    {activeImage.description}
                  </p>
                </div>
                <span className="text-[10px] font-mono uppercase text-amber-400 tracking-wider">
                  Experience Life Archive
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
