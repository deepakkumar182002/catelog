"use client";

import React, { useState, useEffect } from "react";
import {
  Save,
  Loader2,
  CheckCircle2,
  Sparkles,
  SlidersHorizontal,
  BookOpen,
  Layers,
  Maximize2,
  Compass,
  Award,
  Info,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { defaultPageContent, PageContentData } from "@/lib/pageDefaults";
import { ImageUploadField } from "@/components/admin/ImageUploadField";

export default function AdminPagesContentPage() {
  const [content, setContent] = useState<PageContentData>(defaultPageContent);
  const [activeTab, setActiveTab] = useState<string>("philosophy");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/pages");
        if (res.ok) {
          const data = await res.json();
          if (data.content) {
            setContent((prev) => ({ ...prev, ...data.content }));
          }
        }
      } catch (e) {
        console.warn("Failed to load page content from DB, using defaults");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setContent({ ...content, [e.target.name]: e.target.value });
  };

  const handleImageChange = (fieldName: keyof PageContentData, url: string) => {
    setContent((prev) => ({ ...prev, [fieldName]: url }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    try {
      const res = await fetch("/api/pages", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      const data = await res.json();
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3500);
      } else {
        alert(data.error || "Failed to save changes.");
      }
    } catch (err: any) {
      alert(err.message || "Failed to save page content.");
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    { id: "philosophy", label: "Design Philosophy", icon: Compass },
    { id: "featured", label: "Catalogue Focus", icon: Sparkles },
    { id: "hardware", label: "Technical Construction", icon: Layers },
    { id: "dimensions", label: "Orthographic Projections", icon: Maximize2 },
    { id: "collection", label: "Collection 2026", icon: BookOpen },
    { id: "about", label: "About the Brand", icon: Award },
    { id: "hero", label: "Hero & B2B", icon: SlidersHorizontal },
  ];

  return (
    <div className="max-w-5xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
        <div>
          <span className="text-[11px] font-mono tracking-widest uppercase text-amber-800 font-semibold">
            Section Copy & Imagery CMS
          </span>
          <h1 className="text-2xl sm:text-3xl font-editorial font-bold uppercase tracking-tight text-stone-900 mt-1">
            HOMEPAGE SECTIONS CONTENT
          </h1>
          <p className="text-xs font-mono text-stone-500 mt-1">
            Live editable copy and images for all public website architectural sections
          </p>
        </div>

        {saved && (
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-xl text-xs font-mono animate-in fade-in duration-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span className="font-semibold">Published Successfully</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-stone-200 overflow-x-auto pb-2">
          {tabs.map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setActiveTab(t.id)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-all whitespace-nowrap shrink-0 ${
                  activeTab === t.id
                    ? "bg-stone-900 text-white shadow-xs font-semibold"
                    : "text-stone-600 hover:text-stone-900 hover:bg-stone-100"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* ============================================================== */}
        {/* TAB 1: DESIGN PHILOSOPHY */}
        {/* ============================================================== */}
        {activeTab === "philosophy" && (
          <div className="bg-white p-6 md:p-8 rounded-2xl border border-stone-200 shadow-xs space-y-6 animate-in fade-in duration-200">
            <div className="border-b border-stone-100 pb-4">
              <span className="text-[10px] font-mono uppercase text-amber-800 font-semibold tracking-wider">
                Section 03
              </span>
              <h2 className="text-lg font-editorial font-bold uppercase text-stone-900">
                Our Design Philosophy
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase text-stone-600 mb-1">
                  Tagline / Badge
                </label>
                <input
                  type="text"
                  name="philosophyTagline"
                  value={content.philosophyTagline || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-stone-600 mb-1">
                  Main Headline
                </label>
                <input
                  type="text"
                  name="philosophyHeading"
                  value={content.philosophyHeading || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 text-xs font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-stone-600 mb-1">
                Primary Narrative Statement
              </label>
              <textarea
                name="philosophyParagraph1"
                rows={2}
                value={content.philosophyParagraph1 || ""}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 text-xs font-mono resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-stone-600 mb-1">
                Secondary Architectural Note
              </label>
              <textarea
                name="philosophyParagraph2"
                rows={3}
                value={content.philosophyParagraph2 || ""}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 text-xs font-mono resize-none"
              />
            </div>

            <div className="grid grid-cols-3 gap-4 p-4 bg-stone-50 rounded-xl border border-stone-200">
              <div>
                <label className="block text-[10px] font-mono uppercase text-stone-500 mb-1">
                  Pillar 01
                </label>
                <input
                  type="text"
                  name="philosophyPillar1"
                  value={content.philosophyPillar1 || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-stone-300 text-xs font-mono"
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono uppercase text-stone-500 mb-1">
                  Pillar 02
                </label>
                <input
                  type="text"
                  name="philosophyPillar2"
                  value={content.philosophyPillar2 || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-stone-300 text-xs font-mono"
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono uppercase text-stone-500 mb-1">
                  Pillar 03
                </label>
                <input
                  type="text"
                  name="philosophyPillar3"
                  value={content.philosophyPillar3 || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-stone-300 text-xs font-mono"
                />
              </div>
            </div>

            <div className="pt-2 border-t border-stone-100">
              <ImageUploadField
                label="Design Philosophy Section Architectural Image"
                value={content.philosophyImage || ""}
                onChange={(url) => handleImageChange("philosophyImage", url)}
                folder="experience-life/philosophy"
                recommendedSize="1000 x 900 architectural photo"
              />
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 2: CATALOGUE FOCUS */}
        {/* ============================================================== */}
        {activeTab === "featured" && (
          <div className="bg-white p-6 md:p-8 rounded-2xl border border-stone-200 shadow-xs space-y-8 animate-in fade-in duration-200">
            <div className="border-b border-stone-100 pb-4">
              <span className="text-[10px] font-mono uppercase text-amber-800 font-semibold tracking-wider">
                Section 04
              </span>
              <h2 className="text-lg font-editorial font-bold uppercase text-stone-900">
                Catalogue Focus Spotlight
              </h2>
              <p className="text-xs text-stone-500 font-mono mt-1">
                Interactive component examination: clicking right-hand numbered points updates the left-hand main viewer with that component image.
              </p>
            </div>

            {/* General Copy */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase text-stone-600 mb-1">
                  Tagline Label
                </label>
                <input
                  type="text"
                  name="featuredTagline"
                  value={content.featuredTagline || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-stone-600 mb-1">
                  Model Reference Code
                </label>
                <input
                  type="text"
                  name="featuredModel"
                  value={content.featuredModel || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 text-xs font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-stone-600 mb-1">
                Featured Desk Name
              </label>
              <input
                type="text"
                name="featuredHeading"
                value={content.featuredHeading || ""}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 text-xs font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-stone-600 mb-1">
                Engineering Headline & Description
              </label>
              <textarea
                name="featuredDescription"
                rows={2}
                value={content.featuredDescription || ""}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 text-xs font-mono resize-none"
              />
            </div>

            {/* Main Product Showcase Image */}
            <div className="p-5 bg-stone-50 rounded-2xl border border-stone-200 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-800" />
                <h3 className="text-xs font-mono uppercase font-bold text-stone-900">
                  Main Showcase Desk Image (Left Section Default)
                </h3>
              </div>
              <p className="text-[11px] font-mono text-stone-500">
                Shown as default in the left column until a specific component number is selected.
              </p>
              <ImageUploadField
                label="Full Executive Work Desk Image"
                value={content.featuredMainImage || ""}
                onChange={(url) => handleImageChange("featuredMainImage", url)}
                folder="experience-life/products"
                recommendedSize="1200 x 900 transparent PNG or photo"
              />
            </div>

            {/* 4 Interactive Hotspot Components */}
            <div className="space-y-6 pt-4 border-t border-stone-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-mono uppercase font-bold text-stone-900">
                    Interactive Examination Points (4 Components)
                  </h3>
                  <p className="text-xs text-stone-500 font-mono mt-0.5">
                    When the visitor clicks on point 01, 02, 03, or 04 on the website, this component image is dynamically displayed in the left section as the primary main showcase!
                  </p>
                </div>
              </div>

              {/* Point 01: Table Top */}
              <div className="p-5 bg-white rounded-2xl border-2 border-stone-200 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-stone-900 text-white flex items-center justify-center text-xs font-mono font-bold">
                      01
                    </span>
                    <span className="text-xs font-mono uppercase font-bold text-stone-900">
                      Component 01 — Surfaces
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-stone-600 mb-1">Title</label>
                    <input
                      type="text"
                      name="featuredHotspot1Title"
                      value={content.featuredHotspot1Title || ""}
                      onChange={handleChange}
                      className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-300 text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-stone-600 mb-1">Specification</label>
                    <input
                      type="text"
                      name="featuredHotspot1Spec"
                      value={content.featuredHotspot1Spec || ""}
                      onChange={handleChange}
                      className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-300 text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-stone-600 mb-1">Tag</label>
                    <input
                      type="text"
                      name="featuredHotspot1Tag"
                      value={content.featuredHotspot1Tag || ""}
                      onChange={handleChange}
                      className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-300 text-xs font-mono"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase text-stone-600 mb-1">Engineering Description</label>
                  <textarea
                    name="featuredHotspot1Desc"
                    rows={2}
                    value={content.featuredHotspot1Desc || ""}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-300 text-xs font-mono resize-none"
                  />
                </div>
                <ImageUploadField
                  label="Component 01 Image (Displays in Left Viewer on Click)"
                  value={content.featuredHotspot1Image || ""}
                  onChange={(url) => handleImageChange("featuredHotspot1Image", url)}
                  folder="experience-life/details"
                  recommendedSize="800 x 600 detailed macro photo"
                />
              </div>

              {/* Point 02: Drawer System */}
              <div className="p-5 bg-white rounded-2xl border-2 border-stone-200 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-stone-900 text-white flex items-center justify-center text-xs font-mono font-bold">
                      02
                    </span>
                    <span className="text-xs font-mono uppercase font-bold text-stone-900">
                      Component 02 — Storage & Runners
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-stone-600 mb-1">Title</label>
                    <input
                      type="text"
                      name="featuredHotspot2Title"
                      value={content.featuredHotspot2Title || ""}
                      onChange={handleChange}
                      className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-300 text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-stone-600 mb-1">Specification</label>
                    <input
                      type="text"
                      name="featuredHotspot2Spec"
                      value={content.featuredHotspot2Spec || ""}
                      onChange={handleChange}
                      className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-300 text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-stone-600 mb-1">Tag</label>
                    <input
                      type="text"
                      name="featuredHotspot2Tag"
                      value={content.featuredHotspot2Tag || ""}
                      onChange={handleChange}
                      className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-300 text-xs font-mono"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase text-stone-600 mb-1">Engineering Description</label>
                  <textarea
                    name="featuredHotspot2Desc"
                    rows={2}
                    value={content.featuredHotspot2Desc || ""}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-300 text-xs font-mono resize-none"
                  />
                </div>
                <ImageUploadField
                  label="Component 02 Image (Displays in Left Viewer on Click)"
                  value={content.featuredHotspot2Image || ""}
                  onChange={(url) => handleImageChange("featuredHotspot2Image", url)}
                  folder="experience-life/details"
                  recommendedSize="800 x 600 detailed macro photo"
                />
              </div>

              {/* Point 03: Metal Frame */}
              <div className="p-5 bg-white rounded-2xl border-2 border-stone-200 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-stone-900 text-white flex items-center justify-center text-xs font-mono font-bold">
                      03
                    </span>
                    <span className="text-xs font-mono uppercase font-bold text-stone-900">
                      Component 03 — Structure
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-stone-600 mb-1">Title</label>
                    <input
                      type="text"
                      name="featuredHotspot3Title"
                      value={content.featuredHotspot3Title || ""}
                      onChange={handleChange}
                      className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-300 text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-stone-600 mb-1">Specification</label>
                    <input
                      type="text"
                      name="featuredHotspot3Spec"
                      value={content.featuredHotspot3Spec || ""}
                      onChange={handleChange}
                      className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-300 text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-stone-600 mb-1">Tag</label>
                    <input
                      type="text"
                      name="featuredHotspot3Tag"
                      value={content.featuredHotspot3Tag || ""}
                      onChange={handleChange}
                      className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-300 text-xs font-mono"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase text-stone-600 mb-1">Engineering Description</label>
                  <textarea
                    name="featuredHotspot3Desc"
                    rows={2}
                    value={content.featuredHotspot3Desc || ""}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-300 text-xs font-mono resize-none"
                  />
                </div>
                <ImageUploadField
                  label="Component 03 Image (Displays in Left Viewer on Click)"
                  value={content.featuredHotspot3Image || ""}
                  onChange={(url) => handleImageChange("featuredHotspot3Image", url)}
                  folder="experience-life/details"
                  recommendedSize="800 x 600 detailed macro photo"
                />
              </div>

              {/* Point 04: X Support */}
              <div className="p-5 bg-white rounded-2xl border-2 border-stone-200 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-stone-900 text-white flex items-center justify-center text-xs font-mono font-bold">
                      04
                    </span>
                    <span className="text-xs font-mono uppercase font-bold text-stone-900">
                      Component 04 — Stability
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-stone-600 mb-1">Title</label>
                    <input
                      type="text"
                      name="featuredHotspot4Title"
                      value={content.featuredHotspot4Title || ""}
                      onChange={handleChange}
                      className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-300 text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-stone-600 mb-1">Specification</label>
                    <input
                      type="text"
                      name="featuredHotspot4Spec"
                      value={content.featuredHotspot4Spec || ""}
                      onChange={handleChange}
                      className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-300 text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-stone-600 mb-1">Tag</label>
                    <input
                      type="text"
                      name="featuredHotspot4Tag"
                      value={content.featuredHotspot4Tag || ""}
                      onChange={handleChange}
                      className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-300 text-xs font-mono"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase text-stone-600 mb-1">Engineering Description</label>
                  <textarea
                    name="featuredHotspot4Desc"
                    rows={2}
                    value={content.featuredHotspot4Desc || ""}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-300 text-xs font-mono resize-none"
                  />
                </div>
                <ImageUploadField
                  label="Component 04 Image (Displays in Left Viewer on Click)"
                  value={content.featuredHotspot4Image || ""}
                  onChange={(url) => handleImageChange("featuredHotspot4Image", url)}
                  folder="experience-life/details"
                  recommendedSize="800 x 600 detailed macro photo"
                />
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 3: TECHNICAL CONSTRUCTION */}
        {/* ============================================================== */}
        {activeTab === "hardware" && (
          <div className="bg-white p-6 md:p-8 rounded-2xl border border-stone-200 shadow-xs space-y-8 animate-in fade-in duration-200">
            <div className="border-b border-stone-100 pb-4">
              <span className="text-[10px] font-mono uppercase text-amber-800 font-semibold tracking-wider">
                Section 07
              </span>
              <h2 className="text-lg font-editorial font-bold uppercase text-stone-900">
                Technical Construction & Hardware
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase text-stone-600 mb-1">
                  Tagline
                </label>
                <input
                  type="text"
                  name="hardwareTagline"
                  value={content.hardwareTagline || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-stone-600 mb-1">
                  Section Headline
                </label>
                <input
                  type="text"
                  name="hardwareHeading"
                  value={content.hardwareHeading || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 text-xs font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-stone-600 mb-1">
                Hardware Construction Subtitle
              </label>
              <textarea
                name="hardwareSubheading"
                rows={2}
                value={content.hardwareSubheading || ""}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 text-xs font-mono resize-none"
              />
            </div>

            {/* 4 Hardware Cards Image Uploads */}
            <div className="space-y-6 pt-4 border-t border-stone-200">
              <h3 className="text-sm font-mono uppercase font-bold text-stone-900">
                4 Technical Hardware Cards (Images & Details)
              </h3>

              {/* Hardware 01 */}
              <div className="p-5 bg-stone-50 rounded-2xl border border-stone-200 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-stone-900 text-white flex items-center justify-center text-xs font-mono font-bold">
                    01
                  </span>
                  <span className="text-xs font-mono uppercase font-bold text-stone-900">
                    Full-Extension Telescopic Channel
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-stone-600 mb-1">Title</label>
                    <input
                      type="text"
                      name="hardwareItem1Title"
                      value={content.hardwareItem1Title || ""}
                      onChange={handleChange}
                      className="w-full px-3 py-2 rounded-lg bg-white border border-stone-300 text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-stone-600 mb-1">Spec</label>
                    <input
                      type="text"
                      name="hardwareItem1Spec"
                      value={content.hardwareItem1Spec || ""}
                      onChange={handleChange}
                      className="w-full px-3 py-2 rounded-lg bg-white border border-stone-300 text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-stone-600 mb-1">Detail Callout</label>
                    <input
                      type="text"
                      name="hardwareItem1Detail"
                      value={content.hardwareItem1Detail || ""}
                      onChange={handleChange}
                      className="w-full px-3 py-2 rounded-lg bg-white border border-stone-300 text-xs font-mono"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase text-stone-600 mb-1">Description</label>
                  <textarea
                    name="hardwareItem1Desc"
                    rows={2}
                    value={content.hardwareItem1Desc || ""}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-stone-300 text-xs font-mono resize-none"
                  />
                </div>
                <ImageUploadField
                  label="Hardware 01 Photo"
                  value={content.hardwareItem1Image || ""}
                  onChange={(url) => handleImageChange("hardwareItem1Image", url)}
                  folder="experience-life/hardware"
                  recommendedSize="800 x 500 macro photo"
                />
              </div>

              {/* Hardware 02 */}
              <div className="p-5 bg-stone-50 rounded-2xl border border-stone-200 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-stone-900 text-white flex items-center justify-center text-xs font-mono font-bold">
                    02
                  </span>
                  <span className="text-xs font-mono uppercase font-bold text-stone-900">
                    Drawer Box Construction
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-stone-600 mb-1">Title</label>
                    <input
                      type="text"
                      name="hardwareItem2Title"
                      value={content.hardwareItem2Title || ""}
                      onChange={handleChange}
                      className="w-full px-3 py-2 rounded-lg bg-white border border-stone-300 text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-stone-600 mb-1">Spec</label>
                    <input
                      type="text"
                      name="hardwareItem2Spec"
                      value={content.hardwareItem2Spec || ""}
                      onChange={handleChange}
                      className="w-full px-3 py-2 rounded-lg bg-white border border-stone-300 text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-stone-600 mb-1">Detail Callout</label>
                    <input
                      type="text"
                      name="hardwareItem2Detail"
                      value={content.hardwareItem2Detail || ""}
                      onChange={handleChange}
                      className="w-full px-3 py-2 rounded-lg bg-white border border-stone-300 text-xs font-mono"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase text-stone-600 mb-1">Description</label>
                  <textarea
                    name="hardwareItem2Desc"
                    rows={2}
                    value={content.hardwareItem2Desc || ""}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-stone-300 text-xs font-mono resize-none"
                  />
                </div>
                <ImageUploadField
                  label="Hardware 02 Photo"
                  value={content.hardwareItem2Image || ""}
                  onChange={(url) => handleImageChange("hardwareItem2Image", url)}
                  folder="experience-life/hardware"
                  recommendedSize="800 x 500 macro photo"
                />
              </div>

              {/* Hardware 03 */}
              <div className="p-5 bg-stone-50 rounded-2xl border border-stone-200 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-stone-900 text-white flex items-center justify-center text-xs font-mono font-bold">
                    03
                  </span>
                  <span className="text-xs font-mono uppercase font-bold text-stone-900">
                    Handle Options
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-stone-600 mb-1">Title</label>
                    <input
                      type="text"
                      name="hardwareItem3Title"
                      value={content.hardwareItem3Title || ""}
                      onChange={handleChange}
                      className="w-full px-3 py-2 rounded-lg bg-white border border-stone-300 text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-stone-600 mb-1">Spec</label>
                    <input
                      type="text"
                      name="hardwareItem3Spec"
                      value={content.hardwareItem3Spec || ""}
                      onChange={handleChange}
                      className="w-full px-3 py-2 rounded-lg bg-white border border-stone-300 text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-stone-600 mb-1">Detail Callout</label>
                    <input
                      type="text"
                      name="hardwareItem3Detail"
                      value={content.hardwareItem3Detail || ""}
                      onChange={handleChange}
                      className="w-full px-3 py-2 rounded-lg bg-white border border-stone-300 text-xs font-mono"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase text-stone-600 mb-1">Description</label>
                  <textarea
                    name="hardwareItem3Desc"
                    rows={2}
                    value={content.hardwareItem3Desc || ""}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-stone-300 text-xs font-mono resize-none"
                  />
                </div>
                <ImageUploadField
                  label="Hardware 03 Photo"
                  value={content.hardwareItem3Image || ""}
                  onChange={(url) => handleImageChange("hardwareItem3Image", url)}
                  folder="experience-life/hardware"
                  recommendedSize="800 x 500 macro photo"
                />
              </div>

              {/* Hardware 04 */}
              <div className="p-5 bg-stone-50 rounded-2xl border border-stone-200 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-stone-900 text-white flex items-center justify-center text-xs font-mono font-bold">
                    04
                  </span>
                  <span className="text-xs font-mono uppercase font-bold text-stone-900">
                    Side Cabinet Panel
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-stone-600 mb-1">Title</label>
                    <input
                      type="text"
                      name="hardwareItem4Title"
                      value={content.hardwareItem4Title || ""}
                      onChange={handleChange}
                      className="w-full px-3 py-2 rounded-lg bg-white border border-stone-300 text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-stone-600 mb-1">Spec</label>
                    <input
                      type="text"
                      name="hardwareItem4Spec"
                      value={content.hardwareItem4Spec || ""}
                      onChange={handleChange}
                      className="w-full px-3 py-2 rounded-lg bg-white border border-stone-300 text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-stone-600 mb-1">Detail Callout</label>
                    <input
                      type="text"
                      name="hardwareItem4Detail"
                      value={content.hardwareItem4Detail || ""}
                      onChange={handleChange}
                      className="w-full px-3 py-2 rounded-lg bg-white border border-stone-300 text-xs font-mono"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase text-stone-600 mb-1">Description</label>
                  <textarea
                    name="hardwareItem4Desc"
                    rows={2}
                    value={content.hardwareItem4Desc || ""}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-stone-300 text-xs font-mono resize-none"
                  />
                </div>
                <ImageUploadField
                  label="Hardware 04 Photo"
                  value={content.hardwareItem4Image || ""}
                  onChange={(url) => handleImageChange("hardwareItem4Image", url)}
                  folder="experience-life/hardware"
                  recommendedSize="800 x 500 macro photo"
                />
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 4: ORTHOGRAPHIC PROJECTIONS */}
        {/* ============================================================== */}
        {activeTab === "dimensions" && (
          <div className="bg-white p-6 md:p-8 rounded-2xl border border-stone-200 shadow-xs space-y-8 animate-in fade-in duration-200">
            <div className="border-b border-stone-100 pb-4">
              <span className="text-[10px] font-mono uppercase text-amber-800 font-semibold tracking-wider">
                Section 08
              </span>
              <h2 className="text-lg font-editorial font-bold uppercase text-stone-900">
                Orthographic Projections & Technical Dimensions
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase text-stone-600 mb-1">
                  Tagline Label
                </label>
                <input
                  type="text"
                  name="dimensionsTagline"
                  value={content.dimensionsTagline || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-stone-600 mb-1">
                  Model Specifier
                </label>
                <input
                  type="text"
                  name="dimensionsModel"
                  value={content.dimensionsModel || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-stone-600 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  name="dimensionsHeading"
                  value={content.dimensionsHeading || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 text-xs font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-stone-600 mb-1">
                Dimensional Scaling Note
              </label>
              <textarea
                name="dimensionsSubheading"
                rows={2}
                value={content.dimensionsSubheading || ""}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 text-xs font-mono resize-none"
              />
            </div>

            {/* 4 Orthographic Views Image Uploads */}
            <div className="space-y-6 pt-4 border-t border-stone-200">
              <div>
                <h3 className="text-sm font-mono uppercase font-bold text-stone-900">
                  Orthographic Projection Drawings (4 Views)
                </h3>
                <p className="text-xs text-stone-500 font-mono mt-0.5">
                  Uploaded blueprints will display seamlessly with full pan/view options in the technical drawing stage.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 bg-stone-50 rounded-2xl border border-stone-200 space-y-3">
                  <span className="text-xs font-mono uppercase font-bold text-stone-900 block">
                    01 • Full Technical Drawing / Blueprint
                  </span>
                  <ImageUploadField
                    label="Full Blueprint Projection"
                    value={content.dimensionsBlueprintImage || ""}
                    onChange={(url) => handleImageChange("dimensionsBlueprintImage", url)}
                    folder="experience-life/technical"
                    recommendedSize="1200 x 800 CAD vector or drawing"
                  />
                </div>

                <div className="p-5 bg-stone-50 rounded-2xl border border-stone-200 space-y-3">
                  <span className="text-xs font-mono uppercase font-bold text-stone-900 block">
                    02 • Front Elevation View
                  </span>
                  <ImageUploadField
                    label="Front Elevation Drawing"
                    value={content.dimensionsFrontImage || ""}
                    onChange={(url) => handleImageChange("dimensionsFrontImage", url)}
                    folder="experience-life/technical"
                    recommendedSize="1200 x 800 CAD drawing"
                  />
                </div>

                <div className="p-5 bg-stone-50 rounded-2xl border border-stone-200 space-y-3">
                  <span className="text-xs font-mono uppercase font-bold text-stone-900 block">
                    03 • Side Elevation View
                  </span>
                  <ImageUploadField
                    label="Side Elevation Drawing"
                    value={content.dimensionsSideImage || ""}
                    onChange={(url) => handleImageChange("dimensionsSideImage", url)}
                    folder="experience-life/technical"
                    recommendedSize="1200 x 800 CAD drawing"
                  />
                </div>

                <div className="p-5 bg-stone-50 rounded-2xl border border-stone-200 space-y-3">
                  <span className="text-xs font-mono uppercase font-bold text-stone-900 block">
                    04 • Plan / Top View
                  </span>
                  <ImageUploadField
                    label="Plan / Top View Drawing"
                    value={content.dimensionsTopImage || ""}
                    onChange={(url) => handleImageChange("dimensionsTopImage", url)}
                    folder="experience-life/technical"
                    recommendedSize="1200 x 800 CAD drawing"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 5: COLLECTION 2026 */}
        {/* ============================================================== */}
        {activeTab === "collection" && (
          <div className="bg-white p-6 md:p-8 rounded-2xl border border-stone-200 shadow-xs space-y-6 animate-in fade-in duration-200">
            <div className="border-b border-stone-100 pb-4">
              <span className="text-[10px] font-mono uppercase text-amber-800 font-semibold tracking-wider">
                Section 10
              </span>
              <h2 className="text-lg font-editorial font-bold uppercase text-stone-900">
                Collection 2026 • Architectural Furniture
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase text-stone-600 mb-1">
                  Tagline / Edition Label
                </label>
                <input
                  type="text"
                  name="collectionTagline"
                  value={content.collectionTagline || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-stone-600 mb-1">
                  Section Headline
                </label>
                <input
                  type="text"
                  name="collectionHeading"
                  value={content.collectionHeading || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 text-xs font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-stone-600 mb-1">
                Collection Overview Subtitle
              </label>
              <textarea
                name="collectionDescription"
                rows={2}
                value={content.collectionDescription || ""}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 text-xs font-mono resize-none"
              />
            </div>

            <div className="pt-2 border-t border-stone-100">
              <ImageUploadField
                label="Collection Showcase / Editorial Header Banner"
                value={content.collectionBannerImage || ""}
                onChange={(url) => handleImageChange("collectionBannerImage", url)}
                folder="experience-life/collection"
                recommendedSize="1400 x 600 architectural banner"
              />
            </div>

            {/* Quick Product Management Shortcut */}
            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between">
              <div>
                <span className="text-xs font-mono font-bold uppercase text-stone-900 block">
                  Individual Catalogue Products
                </span>
                <p className="text-[11px] font-mono text-stone-500 mt-0.5">
                  Products displayed in this section are fetched directly from your MongoDB Products catalog.
                </p>
              </div>
              <Link
                href="/admin/products"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-mono uppercase tracking-wider"
              >
                <span>Manage Products</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 6: ABOUT THE BRAND */}
        {/* ============================================================== */}
        {activeTab === "about" && (
          <div className="bg-white p-6 md:p-8 rounded-2xl border border-stone-200 shadow-xs space-y-6 animate-in fade-in duration-200">
            <div className="border-b border-stone-100 pb-4">
              <span className="text-[10px] font-mono uppercase text-amber-800 font-semibold tracking-wider">
                Section 13
              </span>
              <h2 className="text-lg font-editorial font-bold uppercase text-stone-900">
                About the Brand & Studio
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase text-stone-600 mb-1">
                  Badge / Tagline
                </label>
                <input
                  type="text"
                  name="aboutTagline"
                  value={content.aboutTagline || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-stone-600 mb-1">
                  Main Title
                </label>
                <input
                  type="text"
                  name="aboutHeading"
                  value={content.aboutHeading || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 text-xs font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-stone-600 mb-1">
                Paragraph 1 (Lead Idea)
              </label>
              <textarea
                name="aboutParagraph1"
                rows={2}
                value={content.aboutParagraph1 || ""}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 text-xs font-mono resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-stone-600 mb-1">
                Paragraph 2 (Functional Value)
              </label>
              <textarea
                name="aboutParagraph2"
                rows={2}
                value={content.aboutParagraph2 || ""}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 text-xs font-mono resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-stone-600 mb-1">
                Paragraph 3 (Material Warmth & Durability)
              </label>
              <textarea
                name="aboutParagraph3"
                rows={2}
                value={content.aboutParagraph3 || ""}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 text-xs font-mono resize-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-stone-100">
              <ImageUploadField
                label="Brand Studio Craftsmanship Photo (Primary)"
                value={content.aboutImage || ""}
                onChange={(url) => handleImageChange("aboutImage", url)}
                folder="experience-life/lifestyle"
                recommendedSize="800 x 900 studio photo"
              />

              <ImageUploadField
                label="Secondary Studio Detail Photo (Optional)"
                value={content.aboutSecondaryImage || ""}
                onChange={(url) => handleImageChange("aboutSecondaryImage", url)}
                folder="experience-life/lifestyle"
                recommendedSize="800 x 900 studio detail"
              />
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 7: HERO & B2B */}
        {/* ============================================================== */}
        {activeTab === "hero" && (
          <div className="bg-white p-6 md:p-8 rounded-2xl border border-stone-200 shadow-xs space-y-6 animate-in fade-in duration-200">
            <div className="border-b border-stone-100 pb-4">
              <span className="text-[10px] font-mono uppercase text-amber-800 font-semibold tracking-wider">
                Hero & B2B
              </span>
              <h2 className="text-lg font-editorial font-bold uppercase text-stone-900">
                Hero Headlines, Editorial Imagery & B2B Callout
              </h2>
            </div>

            {/* Hero Copy */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase text-stone-600 mb-1">
                  Hero Headline
                </label>
                <input
                  type="text"
                  name="heroHeadline"
                  value={content.heroHeadline || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-stone-600 mb-1">
                  Hero Tagline / Subtitle
                </label>
                <input
                  type="text"
                  name="heroSubheadline"
                  value={content.heroSubheadline || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 text-xs font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-stone-600 mb-1">
                Hero Editorial Description
              </label>
              <input
                type="text"
                name="heroTagline"
                value={content.heroTagline || ""}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 text-xs font-mono"
              />
            </div>

            {/* Hero Image Upload */}
            <div className="p-5 bg-stone-50 rounded-2xl border border-stone-200 space-y-3">
              <span className="text-xs font-mono uppercase font-bold text-stone-900 block">
                Hero Section Main Editorial Banner Image
              </span>
              <p className="text-[11px] font-mono text-stone-500">
                Primary full-width hero presentation image displayed immediately below the main headlines.
              </p>
              <ImageUploadField
                label="Hero Main Editorial Photograph"
                value={content.heroImage || ""}
                onChange={(url) => handleImageChange("heroImage", url)}
                folder="experience-life/hero"
                recommendedSize="1600 x 900 architectural photograph"
              />
            </div>

            {/* B2B Section */}
            <div className="pt-6 border-t border-stone-200 space-y-4">
              <span className="text-xs font-mono uppercase text-stone-700 font-semibold block">
                B2B Commercial Callout Section
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono uppercase text-stone-600 mb-1">
                    B2B Section Title
                  </label>
                  <input
                    type="text"
                    name="b2bHeading"
                    value={content.b2bHeading || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono uppercase text-stone-600 mb-1">
                    Why Choose Heading
                  </label>
                  <input
                    type="text"
                    name="whyChooseHeading"
                    value={content.whyChooseHeading || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 text-xs font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-stone-600 mb-1">
                  B2B Text (Architects, Commercial & Bulk Orders)
                </label>
                <textarea
                  name="b2bText"
                  rows={3}
                  value={content.b2bText || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 text-xs font-mono resize-none"
                />
              </div>

              {/* B2B Image Upload */}
              <div className="p-5 bg-stone-50 rounded-2xl border border-stone-200 space-y-3">
                <span className="text-xs font-mono uppercase font-bold text-stone-900 block">
                  B2B Commercial Showcase Image
                </span>
                <ImageUploadField
                  label="B2B Commercial Division Photograph"
                  value={content.b2bImage || ""}
                  onChange={(url) => handleImageChange("b2bImage", url)}
                  folder="experience-life/b2b"
                  recommendedSize="1200 x 800 corporate / architecture photo"
                />
              </div>
            </div>
          </div>
        )}

        {/* Floating Save Actions */}
        <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
          <p className="text-xs font-mono text-stone-500">
            Changes save to MongoDB and apply live across the public portfolio.
          </p>

          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-mono uppercase tracking-widest px-8 py-3.5 rounded-xl transition-all shadow-md font-semibold disabled:opacity-50"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Publishing Changes...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save & Publish All Sections</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
