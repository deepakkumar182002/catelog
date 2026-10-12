"use client";

import React, { useState, useEffect } from "react";
import { Save, Loader2, CheckCircle2 } from "lucide-react";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    brandName: "EXPERIENCE LIFE",
    tagline: "Furniture for Every Space",
    receiverEmail: "contact@experiencelife.design",
    contactEmail: "info@experiencelife.design",
    contactPhone: "+91 98765 43210",
    contactAddress: "Experience Life Design & Manufacturing Studio",
    metaTitle: "EXPERIENCE LIFE | Furniture for Every Space",
    metaDescription:
      "Thoughtful designs. Functional spaces. Lasting quality. Architectural furniture crafted for modern workspaces, homes and commercial environments.",
  });

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/settings");
        if (res.ok) {
          const data = await res.json();
          if (data.settings) setSettings((prev) => ({ ...prev, ...data.settings }));
        }
      } catch {}
    }
    load();
  }, []);

  const handleChange = (e: any) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch {
      alert("Failed to save settings.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div className="pb-6 border-b border-stone-200">
        <span className="text-[11px] font-mono tracking-widest uppercase text-amber-800 font-semibold">
          Studio Configuration
        </span>
        <h1 className="text-2xl sm:text-3xl font-editorial font-bold uppercase tracking-tight text-stone-900 mt-1">
          SITE & EMAIL SETTINGS
        </h1>
        <p className="text-xs font-mono text-stone-500 mt-1">
          Configure notification recipient emails, contact coordinates and SEO metadata
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl border border-stone-200 shadow-xs space-y-6">
        {saved && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>Settings saved successfully.</span>
          </div>
        )}

        {/* Email settings */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold font-editorial uppercase tracking-tight text-stone-900 border-b border-stone-100 pb-2">
            Enquiry Notification Route
          </h3>

          <div>
            <label className="block text-[11px] font-mono uppercase text-stone-600 mb-1">
              Admin Receiver Email (Receives New Client Inquiries)
            </label>
            <input
              type="email"
              name="receiverEmail"
              required
              value={settings.receiverEmail}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-300 text-xs font-mono"
            />
            <p className="text-[10px] font-mono text-stone-400 mt-1">
              All website form submissions will be forwarded to this inbox via Nodemailer Gmail SMTP.
            </p>
          </div>
        </div>

        {/* Brand & Contact */}
        <div className="space-y-4 pt-4 border-t border-stone-100">
          <h3 className="text-sm font-bold font-editorial uppercase tracking-tight text-stone-900 border-b border-stone-100 pb-2">
            Studio Coordinates
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-mono uppercase text-stone-600 mb-1">
                Brand Name
              </label>
              <input
                type="text"
                name="brandName"
                value={settings.brandName}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-300 text-xs font-mono"
              />
            </div>
            <div>
              <label className="block text-[11px] font-mono uppercase text-stone-600 mb-1">
                Tagline
              </label>
              <input
                type="text"
                name="tagline"
                value={settings.tagline}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-300 text-xs font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-mono uppercase text-stone-600 mb-1">
                Contact Phone
              </label>
              <input
                type="text"
                name="contactPhone"
                value={settings.contactPhone}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-300 text-xs font-mono"
              />
            </div>
            <div>
              <label className="block text-[11px] font-mono uppercase text-stone-600 mb-1">
                Contact Email
              </label>
              <input
                type="email"
                name="contactEmail"
                value={settings.contactEmail}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-300 text-xs font-mono"
              />
            </div>
          </div>
        </div>

        {/* SEO Meta */}
        <div className="space-y-4 pt-4 border-t border-stone-100">
          <h3 className="text-sm font-bold font-editorial uppercase tracking-tight text-stone-900 border-b border-stone-100 pb-2">
            SEO & Metadata
          </h3>

          <div>
            <label className="block text-[11px] font-mono uppercase text-stone-600 mb-1">
              Meta Title
            </label>
            <input
              type="text"
              name="metaTitle"
              value={settings.metaTitle}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-300 text-xs font-mono"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono uppercase text-stone-600 mb-1">
              Meta Description
            </label>
            <textarea
              name="metaDescription"
              rows={3}
              value={settings.metaDescription}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-300 text-xs font-mono resize-none"
            />
          </div>
        </div>

        <div className="pt-6 border-t border-stone-200 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-mono uppercase tracking-widest px-8 py-3.5 rounded-xl transition-all shadow-md font-semibold disabled:opacity-50"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Site Settings</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
