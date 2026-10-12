"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Eye } from "lucide-react";
import { initialProducts, SeedProduct } from "@/lib/seedData";

interface CollectionSectionProps {
  content?: {
    collectionTagline?: string;
    collectionHeading?: string;
    collectionDescription?: string;
  };
}

export function CollectionSection({ content }: CollectionSectionProps) {
  const [products, setProducts] = useState<SeedProduct[]>(initialProducts);
  const [filter, setFilter] = useState<string>("ALL");

  const tagline = content?.collectionTagline || "Collection 2026 • Architectural Furniture";
  const heading = content?.collectionHeading || "THE COLLECTION";
  const description =
    content?.collectionDescription ||
    "Explore meticulously engineered designs from the Experience Life catalogue.";

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch("/api/products");
        if (res.ok) {
          const data = await res.json();
          if (data.products && data.products.length > 0) {
            setProducts(data.products);
          }
        }
      } catch (err) {
        console.warn("Using offline catalogue collection data");
      }
    }
    loadProducts();
  }, []);

  const categories = ["ALL", "Executive Desks", "Workstations", "Architectural Desks", "Tables & Lounges"];

  const filteredProducts =
    filter === "ALL"
      ? products
      : products.filter((p) => p.category.toLowerCase() === filter.toLowerCase());

  return (
    <section id="collection" className="py-28 md:py-36 px-6 md:px-12 bg-[#FAF8F5] border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-12 border-b border-stone-300">
          <div>
            <span className="text-[11px] font-mono tracking-widest uppercase text-amber-800 font-semibold">
              {tagline}
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-editorial font-bold text-stone-950 uppercase tracking-tight mt-2">
              {heading}
            </h2>
            <p className="text-stone-700 text-sm md:text-base font-sans mt-3">
              {description}
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="mt-6 md:mt-0 flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all ${
                  filter === c
                    ? "bg-stone-900 text-white shadow-xs"
                    : "bg-stone-100 text-stone-700 hover:bg-stone-200 border border-stone-200"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Collection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 pt-12">
          {filteredProducts.map((p) => (
            <div
              key={p.modelNumber}
              className="bg-white rounded-2xl border border-stone-200/90 shadow-sm overflow-hidden flex flex-col justify-between group hover:border-stone-900 transition-all duration-300 hover:shadow-lg"
            >
              <div>
                {/* Product Image Stage */}
                <div
                  className="relative w-full h-[320px] sm:h-[380px] bg-stone-50 overflow-hidden flex items-center justify-center p-8"
                  style={{ position: "relative" }}
                >
                  <Image
                    src={p.heroImage || p.images[0] || "/images/products/executive-work-desk.png"}
                    alt={p.name}
                    fill
                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-700 ease-out"
                    sizes="(max-width: 768px) 100vw, 600px"
                  />
                  <div className="absolute top-4 left-4 bg-stone-900 text-white text-[10px] font-mono uppercase px-3 py-1 rounded-full tracking-wider shadow">
                    {p.modelNumber}
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-xs text-stone-700 text-[10px] font-mono uppercase px-3 py-1 rounded-full border border-stone-200">
                    {p.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-2xl font-bold font-editorial text-stone-950 uppercase tracking-tight">
                        {p.name}
                      </h3>
                      <p className="text-xs font-mono text-stone-500 mt-1">
                        Dimensions: {p.dimensions.length} × {p.dimensions.width} × {p.dimensions.height}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-stone-600 mt-4 leading-relaxed font-sans line-clamp-2">
                    {p.shortDescription}
                  </p>

                  {/* Highlights pills */}
                  <div className="flex flex-wrap gap-1.5 mt-5">
                    {p.materials.slice(0, 3).map((m) => (
                      <span
                        key={m}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-sm bg-stone-100 text-stone-600 border border-stone-200"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons: View Details & Request Enquiry */}
              <div className="px-8 pb-8 pt-2 flex items-center gap-3">
                <Link
                  href={`/collection/${p.slug}`}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-900 text-xs font-mono uppercase tracking-wider transition-colors border border-stone-200"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Details</span>
                </Link>

                <Link
                  href={`#enquiry?product=${encodeURIComponent(p.name)}`}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-stone-900 hover:bg-amber-900 text-white text-xs font-mono uppercase tracking-wider transition-colors shadow-xs"
                >
                  <span>Request Enquiry</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
