import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { DeskSceneCanvas } from "@/components/3d/DeskSceneCanvas";
import { connectDB } from "@/lib/db";
import { Product } from "@/models/Product";
import { BackendImage } from "@/components/ui/BackendImage";
import { initialProducts, SeedProduct } from "@/lib/seedData";
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  Ruler,
  Layers,
  Wrench,
  Boxes,
  Eye,
} from "lucide-react";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return initialProducts.map((p: SeedProduct) => ({
    slug: p.slug,
  }));
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;

  let product: any = null;
  try {
    const db = await connectDB();
    if (db) {
      const dbProduct = await Product.findOne({ slug });
      if (dbProduct) {
        product = dbProduct.toObject();
      }
    }
  } catch (err) {
    // fallback
  }

  if (!product) {
    product = initialProducts.find((p: SeedProduct) => p.slug === slug);
  }

  if (!product) {
    notFound();
  }

  // Clean static /images/ path
  const heroImage = product.heroImage?.startsWith("/images/") ? "" : product.heroImage;
  const images = (product.images || []).map((img: string) => (img.startsWith("/images/") ? "" : img));

  const relatedProducts = initialProducts.filter((p: SeedProduct) => p.slug !== slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900">
      <Navbar />

      <main className="pt-28 pb-20">
        {/* Breadcrumb Bar */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between border-b border-stone-200/80 text-xs font-mono text-stone-500">
          <Link
            href="/#collection"
            className="inline-flex items-center gap-1.5 hover:text-stone-900 transition-colors uppercase"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Collection</span>
          </Link>
          <div className="flex items-center gap-2 uppercase">
            <span>Catalogue</span>
            <span>/</span>
            <span className="text-stone-900 font-semibold">{product.modelNumber}</span>
          </div>
        </div>

        {/* Product Hero Grid */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 pt-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Visual Showcase (3D for Executive desk or multi-image carousel) */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div
                style={{ position: "relative" }}
                className="relative w-full h-[400px] sm:h-[500px] md:h-[560px] rounded-3xl bg-white border border-stone-200 shadow-xl overflow-hidden group"
              >
                {product.slug === "executive-work-desk" ? (
                  <div className="w-full h-full relative">
                    <DeskSceneCanvas interactive autoRotate />
                    <div className="absolute top-4 left-4 z-10 bg-stone-900 text-white text-[10px] font-mono uppercase px-3 py-1 rounded-full tracking-wider shadow">
                      Interactive 3D Model • Drag to Rotate
                    </div>
                  </div>
                ) : (
                  <BackendImage
                    src={heroImage}
                    alt={product.name}
                    fill
                    priority
                    objectFit="contain"
                    className="p-8 group-hover:scale-103 transition-transform duration-700"
                    sizes="(max-width: 1024px) 100vw, 700px"
                    fallbackLabel={`${product.name} — Upload in Admin`}
                    loadingLabel="Loading Product Visual..."
                  />
                )}
              </div>

              {/* Detail Gallery Thumbs */}
              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                  {images.slice(0, 4).map((img: string, idx: number) => (
                    <div
                      key={idx}
                      style={{ position: "relative" }}
                      className="relative h-24 rounded-xl bg-white border border-stone-200 overflow-hidden"
                    >
                      <BackendImage
                        src={img}
                        alt={`${product.name} thumbnail ${idx + 1}`}
                        fill
                        objectFit="cover"
                        sizes="180px"
                        fallbackLabel="Thumbnail"
                        loadingLabel="Loading..."
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column: Specifications & Inquiries */}
            <div className="lg:col-span-5 flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono uppercase text-amber-800 font-semibold tracking-wider">
                  {product.modelNumber}
                </span>
                <span className="text-stone-300">•</span>
                <span className="text-xs font-mono uppercase text-stone-500">
                  {product.category}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-editorial font-bold text-stone-950 uppercase tracking-tight">
                {product.name}
              </h1>

              <div className="w-12 h-[2px] bg-stone-900 my-6" />

              <p className="text-stone-700 text-sm md:text-base leading-relaxed font-sans">
                {product.shortDescription}
              </p>

              <p className="text-stone-600 text-xs md:text-sm leading-relaxed font-mono mt-4">
                {product.longDescription}
              </p>

              {/* Dimensions Box */}
              <div className="mt-8 p-6 rounded-2xl bg-stone-100 border border-stone-200/90">
                <div className="flex items-center gap-2 text-xs font-mono uppercase text-stone-500 mb-3">
                  <Ruler className="w-3.5 h-3.5 text-stone-700" />
                  <span>Standard Engineering Dimensions</span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-stone-900 font-editorial">
                  <div>
                    <span className="text-[10px] font-mono text-stone-500 uppercase block">Length</span>
                    <span className="text-sm font-bold">{product.dimensions.length}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-stone-500 uppercase block">Width</span>
                    <span className="text-sm font-bold">{product.dimensions.width}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-stone-500 uppercase block">Height</span>
                    <span className="text-sm font-bold">{product.dimensions.height}</span>
                  </div>
                </div>
              </div>

              {/* Key Features List */}
              <div className="mt-8 space-y-2.5">
                <span className="text-xs font-mono uppercase tracking-widest text-stone-500 block mb-3">
                  Craftsmanship Highlights
                </span>
                {(product.features || []).map((feat: string, idx: number) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs font-mono text-stone-700">
                    <CheckCircle2 className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* CTA Action */}
              <div className="mt-10 pt-8 border-t border-stone-200 flex flex-col sm:flex-row items-center gap-4">
                <Link
                  href={`/#enquiry?product=${encodeURIComponent(product.name)}`}
                  className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 bg-stone-900 hover:bg-amber-900 text-white text-xs font-mono uppercase tracking-widest py-4 px-6 rounded-full transition-all duration-300 shadow-md font-semibold"
                >
                  <span>Request Project Enquiry</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>

                <Link
                  href="#specs"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-4 px-6 rounded-full border border-stone-300 text-stone-800 text-xs font-mono uppercase tracking-wider hover:bg-stone-100 transition-colors"
                >
                  <span>Technical Specs</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Technical Specifications Section */}
        <section id="specs" className="max-w-7xl mx-auto px-6 md:px-12 pt-28">
          <div className="pb-8 border-b border-stone-300">
            <span className="text-[11px] font-mono tracking-widest uppercase text-amber-800 font-semibold">
              Specification Sheet
            </span>
            <h2 className="text-3xl md:text-4xl font-editorial font-bold text-stone-950 uppercase tracking-tight mt-1">
              FULL PRODUCT SPECIFICATIONS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
            {/* Materials & Finishes */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200">
              <div className="flex items-center gap-2 text-xs font-mono uppercase text-amber-800 font-semibold mb-4">
                <Layers className="w-4 h-4" />
                <span>Materials & Finishes</span>
              </div>
              <ul className="space-y-2 text-xs font-mono text-stone-700">
                {(product.materials || []).map((m: string) => (
                  <li key={m} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-stone-400" />
                    <span>{m}</span>
                  </li>
                ))}
                {(product.finishes || []).map((f: string) => (
                  <li key={f} className="flex items-center gap-2 text-stone-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-stone-400" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Hardware */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200">
              <div className="flex items-center gap-2 text-xs font-mono uppercase text-amber-800 font-semibold mb-4">
                <Wrench className="w-4 h-4" />
                <span>Hardware Components</span>
              </div>
              <ul className="space-y-2 text-xs font-mono text-stone-700">
                {(product.hardware || []).map((h: string) => (
                  <li key={h} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-stone-400" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Spatial Applications */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200">
              <div className="flex items-center gap-2 text-xs font-mono uppercase text-amber-800 font-semibold mb-4">
                <Boxes className="w-4 h-4" />
                <span>Recommended Applications</span>
              </div>
              <ul className="space-y-2 text-xs font-mono text-stone-700">
                {(product.applications || []).map((a: string) => (
                  <li key={a} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-stone-400" />
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Related Designs */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 pt-28">
          <div className="pb-8 border-b border-stone-300 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-mono tracking-widest uppercase text-amber-800 font-semibold">
                Alternative Models
              </span>
              <h2 className="text-2xl md:text-3xl font-editorial font-bold text-stone-950 uppercase tracking-tight mt-1">
                RELATED DESIGNS
              </h2>
            </div>
            <Link
              href="/#collection"
              className="text-xs font-mono uppercase tracking-wider text-stone-600 hover:text-stone-950 flex items-center gap-1"
            >
              <span>All Collection</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
            {(relatedProducts || []).map((rel: any) => (
              <Link
                key={rel.modelNumber}
                href={`/collection/${rel.slug}`}
                className="group bg-white rounded-2xl border border-stone-200 p-6 flex flex-col justify-between hover:border-stone-900 transition-all hover:shadow-lg"
              >
                <div>
                  <div
                    style={{ position: "relative" }}
                    className="relative w-full h-48 bg-stone-50 rounded-xl overflow-hidden mb-4"
                  >
                    <BackendImage
                      src={rel.heroImage?.startsWith("/images/") ? "" : rel.heroImage}
                      alt={rel.name}
                      fill
                      objectFit="contain"
                      className="p-4 group-hover:scale-105 transition-transform duration-500"
                      sizes="350px"
                      fallbackLabel={rel.name}
                      loadingLabel="Loading..."
                    />
                  </div>
                  <span className="text-[10px] font-mono uppercase text-stone-400">
                    {rel.modelNumber}
                  </span>
                  <h3 className="text-base font-bold font-editorial text-stone-900 uppercase mt-0.5">
                    {rel.name}
                  </h3>
                  <p className="text-xs text-stone-600 mt-2 font-mono line-clamp-2">
                    {rel.shortDescription}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-xs font-mono text-stone-900">
                  <span>Explore Model</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
