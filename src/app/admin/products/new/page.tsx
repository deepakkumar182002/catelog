"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Loader2, AlertCircle } from "lucide-react";
import { ImageUploadField } from "@/components/admin/ImageUploadField";

export default function NewProductPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    modelNumber: "MODEL EL-D05",
    name: "",
    slug: "",
    category: "Work Desks",
    shortDescription: "",
    longDescription: "",
    heroImage: "",
    dimensions: {
      length: "5 ft / 60 inch",
      width: "2 ft / 24 inch",
      height: "2.5 ft / 30 inch",
    },
    materialsStr: "Natural Wood Finish, MS Square Pipe Frame",
    finishesStr: "Matte Black (Standard), Graphite Grey, Clean White",
    featuresStr: "Natural wood finish\nStrong MS square-pipe frame\nFull-extension telescopic drawers",
    hardwareStr: "16–20 inch telescopic channels\n12mm plywood drawer box",
    isPublished: true,
    isFeatured: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (name.startsWith("dim_")) {
      const dimKey = name.replace("dim_", "");
      setFormData((prev) => ({
        ...prev,
        dimensions: { ...prev.dimensions, [dimKey]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.name || !formData.modelNumber) {
      setError("Model number and Product name are required.");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        ...formData,
        materials: formData.materialsStr.split(",").map((s) => s.trim()).filter(Boolean),
        finishes: formData.finishesStr.split(",").map((s) => s.trim()).filter(Boolean),
        features: formData.featuresStr.split("\n").map((s) => s.trim()).filter(Boolean),
        hardware: formData.hardwareStr.split("\n").map((s) => s.trim()).filter(Boolean),
        images: [formData.heroImage],
      };

      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to save product.");
      }

      router.push("/admin/products");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Failed to create product.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-stone-200">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/products"
            className="p-2 rounded-xl bg-white border border-stone-200 text-stone-600 hover:text-stone-900"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <span className="text-[11px] font-mono tracking-widest uppercase text-amber-800 font-semibold">
              Catalogue Management
            </span>
            <h1 className="text-2xl font-editorial font-bold uppercase tracking-tight text-stone-900">
              CREATE NEW PRODUCT
            </h1>
          </div>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs font-mono flex items-center gap-3">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl border border-stone-200 space-y-6 shadow-xs">
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-xs font-mono uppercase text-stone-600 mb-2">
              Model Number *
            </label>
            <input
              type="text"
              name="modelNumber"
              required
              value={formData.modelNumber}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 text-xs font-mono focus:outline-none focus:border-stone-900"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-stone-600 mb-2">
              Product Name *
            </label>
            <input
              type="text"
              name="name"
              required
              placeholder="e.g. Architectural Studio Desk"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 text-xs font-mono focus:outline-none focus:border-stone-900"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-stone-600 mb-2">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 text-xs font-mono focus:outline-none focus:border-stone-900"
            >
              <option value="Work Desks">Work Desks</option>
              <option value="Executive Desks">Executive Desks</option>
              <option value="Workstations">Workstations</option>
              <option value="Architectural Desks">Architectural Desks</option>
              <option value="Tables & Lounges">Tables & Lounges</option>
              <option value="Custom Commissions">Custom Commissions</option>
            </select>
          </div>
        </div>

        {/* Descriptions */}
        <div>
          <label className="block text-xs font-mono uppercase text-stone-600 mb-2">
            Short Description *
          </label>
          <input
            type="text"
            name="shortDescription"
            required
            placeholder="A concise 1-sentence summary for catalogue cards..."
            value={formData.shortDescription}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 text-xs font-mono focus:outline-none focus:border-stone-900"
          />
        </div>

        <div>
          <label className="block text-xs font-mono uppercase text-stone-600 mb-2">
            Long Architectural Description
          </label>
          <textarea
            name="longDescription"
            rows={3}
            placeholder="Detailed narrative regarding joinery, structural engineering and spaces suited for..."
            value={formData.longDescription}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 text-xs font-mono focus:outline-none focus:border-stone-900 resize-none"
          />
        </div>

        {/* Hero Image */}
        <div>
          <ImageUploadField
            label="Hero Product Image *"
            value={formData.heroImage}
            onChange={(url) => setFormData((prev) => ({ ...prev, heroImage: url }))}
            folder="experience-life/products"
            placeholder="/images/products/el-d02-minimal-desk.png or Cloudinary URL"
            recommendedSize="1200 x 800 (Clean transparent PNG or studio render)"
          />
        </div>

        {/* Dimensions */}
        <div className="p-6 bg-stone-50 rounded-xl border border-stone-200">
          <span className="text-xs font-mono uppercase text-stone-600 block mb-4">
            Standard Engineering Dimensions
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-[11px] font-mono text-stone-500 uppercase mb-1">
                Length
              </label>
              <input
                type="text"
                name="dim_length"
                value={formData.dimensions.length}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg bg-white border border-stone-300 text-stone-900 text-xs font-mono"
              />
            </div>
            <div>
              <label className="block text-[11px] font-mono text-stone-500 uppercase mb-1">
                Width
              </label>
              <input
                type="text"
                name="dim_width"
                value={formData.dimensions.width}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg bg-white border border-stone-300 text-stone-900 text-xs font-mono"
              />
            </div>
            <div>
              <label className="block text-[11px] font-mono text-stone-500 uppercase mb-1">
                Height
              </label>
              <input
                type="text"
                name="dim_height"
                value={formData.dimensions.height}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg bg-white border border-stone-300 text-stone-900 text-xs font-mono"
              />
            </div>
          </div>
        </div>

        {/* Materials & Finishes Strings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-mono uppercase text-stone-600 mb-2">
              Materials (Comma Separated)
            </label>
            <input
              type="text"
              name="materialsStr"
              value={formData.materialsStr}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 text-xs font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-stone-600 mb-2">
              Finishes (Comma Separated)
            </label>
            <input
              type="text"
              name="finishesStr"
              value={formData.finishesStr}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 text-xs font-mono"
            />
          </div>
        </div>

        {/* Features & Hardware Multiline */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-mono uppercase text-stone-600 mb-2">
              Craftsmanship Highlights (1 per line)
            </label>
            <textarea
              name="featuresStr"
              rows={3}
              value={formData.featuresStr}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 text-xs font-mono resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-stone-600 mb-2">
              Hardware Components (1 per line)
            </label>
            <textarea
              name="hardwareStr"
              rows={3}
              value={formData.hardwareStr}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 text-xs font-mono resize-none"
            />
          </div>
        </div>

        {/* Flags */}
        <div className="pt-2 flex items-center gap-6">
          <label className="flex items-center gap-2 cursor-pointer text-xs font-mono text-stone-700">
            <input
              type="checkbox"
              name="isPublished"
              checked={formData.isPublished}
              onChange={handleChange}
              className="w-4 h-4 rounded text-stone-900"
            />
            <span>Publish publicly on website</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer text-xs font-mono text-stone-700">
            <input
              type="checkbox"
              name="isFeatured"
              checked={formData.isFeatured}
              onChange={handleChange}
              className="w-4 h-4 rounded text-stone-900"
            />
            <span>Highlight as Featured Hero Product</span>
          </label>
        </div>

        {/* Submit */}
        <div className="pt-6 border-t border-stone-200 flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-mono uppercase tracking-widest px-8 py-3.5 rounded-xl transition-all shadow-md font-semibold disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Saving to CMS...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save & Publish Product</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
