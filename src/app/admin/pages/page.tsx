"use client";

import React, { useState, useEffect } from "react";
import { Save, Loader2, CheckCircle2, Sparkles, SlidersHorizontal, BookOpen, Layers, Maximize2, Compass, Award } from "lucide-react";
import { defaultPageContent } from "@/lib/pageDefaults";
import { ImageUploadField } from "@/components/admin/ImageUploadField";

export default function AdminPagesContentPage() {
  const [content, setContent] = useState(defaultPageContent);
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
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3500);
      } else {
        alert("Failed to save changes.");
      }
    } catch {
      alert("Failed to save page content.");
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

        {/* Tab 1: Our Design Philosophy */}
        {activeTab === "philosophy" && (
          <div className="bg-white p-6 md:p-8 rounded-2xl border border-stone-200 shadow-xs space-y-5 animate-in fade-in duration-200">
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

            <ImageUploadField
              label="Philosophy Section Architecture Image"
              value={content.philosophyImage || ""}
              onChange={(url) => setContent({ ...content, philosophyImage: url })}
              folder="experience-life/lifestyle"
              placeholder="/images/lifestyle/workspace-space.png or Cloudinary URL"
              recommendedSize="1000 x 900 architectural photo"
            />
          </div>
        )}

        {/* Tab 2: Catalogue Focus */}
        {activeTab === "featured" && (
          <div className="bg-white p-6 md:p-8 rounded-2xl border border-stone-200 shadow-xs space-y-5 animate-in fade-in duration-200">
            <div className="border-b border-stone-100 pb-4">
              <span className="text-[10px] font-mono uppercase text-amber-800 font-semibold tracking-wider">
                Section 04
              </span>
              <h2 className="text-lg font-editorial font-bold uppercase text-stone-900">
                Catalogue Focus Spotlight
              </h2>
            </div>

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
                rows={3}
                value={content.featuredDescription || ""}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 text-xs font-mono resize-none"
              />
            </div>
          </div>
        )}

        {/* Tab 3: Technical Construction */}
        {activeTab === "hardware" && (
          <div className="bg-white p-6 md:p-8 rounded-2xl border border-stone-200 shadow-xs space-y-5 animate-in fade-in duration-200">
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
                rows={3}
                value={content.hardwareSubheading || ""}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 text-xs font-mono resize-none"
              />
            </div>
          </div>
        )}

        {/* Tab 4: Orthographic Projections */}
        {activeTab === "dimensions" && (
          <div className="bg-white p-6 md:p-8 rounded-2xl border border-stone-200 shadow-xs space-y-5 animate-in fade-in duration-200">
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
                rows={3}
                value={content.dimensionsSubheading || ""}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 text-xs font-mono resize-none"
              />
            </div>
          </div>
        )}

        {/* Tab 5: Collection 2026 */}
        {activeTab === "collection" && (
          <div className="bg-white p-6 md:p-8 rounded-2xl border border-stone-200 shadow-xs space-y-5 animate-in fade-in duration-200">
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
                rows={3}
                value={content.collectionDescription || ""}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 text-xs font-mono resize-none"
              />
            </div>
          </div>
        )}

        {/* Tab 6: About the Brand */}
        {activeTab === "about" && (
          <div className="bg-white p-6 md:p-8 rounded-2xl border border-stone-200 shadow-xs space-y-5 animate-in fade-in duration-200">
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
                rows={3}
                value={content.aboutParagraph3 || ""}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 text-xs font-mono resize-none"
              />
            </div>

            <ImageUploadField
              label="Brand Craftsmanship Photo"
              value={content.aboutImage || ""}
              onChange={(url) => setContent({ ...content, aboutImage: url })}
              folder="experience-life/lifestyle"
              placeholder="/images/lifestyle/craftsmanship.png or Cloudinary URL"
              recommendedSize="800 x 900 studio craftsmanship photo"
            />
          </div>
        )}

        {/* Tab 7: Hero & B2B */}
        {activeTab === "hero" && (
          <div className="bg-white p-6 md:p-8 rounded-2xl border border-stone-200 shadow-xs space-y-5 animate-in fade-in duration-200">
            <div className="border-b border-stone-100 pb-4">
              <span className="text-[10px] font-mono uppercase text-amber-800 font-semibold tracking-wider">
                Hero & B2B
              </span>
              <h2 className="text-lg font-editorial font-bold uppercase text-stone-900">
                Hero Headlines & B2B Commercial Callout
              </h2>
            </div>

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

            <div className="pt-4 border-t border-stone-100">
              <span className="text-xs font-mono uppercase text-stone-700 font-semibold block mb-3">
                B2B Commercial Callout
              </span>
              <div className="space-y-4">
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
