"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Plus, Edit2, Trash2, Palette, X, Save, Loader2 } from "lucide-react";
import { initialFinishes } from "@/lib/seedData";
import { ImageUploadField } from "@/components/admin/ImageUploadField";

export default function AdminFinishesPage() {
  const [finishes, setFinishes] = useState<any[]>(initialFinishes);
  const [editingFinish, setEditingFinish] = useState<any | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [newFinish, setNewFinish] = useState({
    name: "",
    code: "",
    ralCode: "",
    description: "",
    image: "/images/finishes/matte-black.png",
    isAvailable: true,
  });

  const fetchFinishes = async () => {
    try {
      const res = await fetch("/api/finishes");
      if (res.ok) {
        const data = await res.json();
        if (data.finishes && data.finishes.length > 0) {
          setFinishes(data.finishes);
        }
      }
    } catch {}
  };

  useEffect(() => {
    fetchFinishes();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFinish.name) return;
    setIsAdding(true);
    try {
      const res = await fetch("/api/finishes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newFinish),
      });
      if (res.ok) {
        setNewFinish({
          name: "",
          code: "",
          ralCode: "",
          description: "",
          image: "/images/finishes/matte-black.png",
          isAvailable: true,
        });
        fetchFinishes();
      }
    } catch {
      alert("Failed to add finish.");
    } finally {
      setIsAdding(false);
    }
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFinish) return;
    setIsSaving(true);
    try {
      const id = editingFinish._id;
      if (id) {
        const res = await fetch(`/api/finishes/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editingFinish),
        });
        if (res.ok) {
          setFinishes((prev) =>
            prev.map((f) => (f._id === id ? { ...f, ...editingFinish } : f))
          );
        }
      } else {
        setFinishes((prev) =>
          prev.map((f) => (f.name === editingFinish.name ? { ...f, ...editingFinish } : f))
        );
      }
      setEditingFinish(null);
    } catch {
      alert("Failed to update finish.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete metal finish "${name}"?`)) return;
    try {
      if (id) {
        await fetch(`/api/finishes/${id}`, { method: "DELETE" });
      }
      setFinishes((prev) => prev.filter((f) => f._id !== id && f.name !== name));
    } catch {
      alert("Failed to delete finish.");
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="pb-6 border-b border-stone-200">
        <span className="text-[11px] font-mono tracking-widest uppercase text-amber-800 font-semibold">
          Surface Coatings CMS
        </span>
        <h1 className="text-2xl sm:text-3xl font-editorial font-bold uppercase tracking-tight text-stone-900 mt-1">
          POWDER COATINGS & FINISHES
        </h1>
        <p className="text-xs font-mono text-stone-500 mt-1">
          Metal frame treatments, RAL powder coat shades and protective finishes
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* List */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {finishes.map((f) => (
            <div
              key={f._id || f.name}
              className="bg-white rounded-2xl border border-stone-200 shadow-xs p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-base font-bold font-editorial text-stone-900 uppercase">
                    {f.name}
                  </h3>
                  <span className="text-[10px] font-mono uppercase bg-stone-100 px-2 py-0.5 rounded text-stone-600">
                    {f.ralCode || "Powder Coat"}
                  </span>
                </div>

                <div style={{ position: "relative" }} className="relative w-full h-28 rounded-xl bg-stone-50 border border-stone-200 overflow-hidden mb-4">
                  <Image
                    src={f.image || "/images/finishes/matte-black.png"}
                    alt={f.name}
                    fill
                    className="object-contain p-2"
                    sizes="250px"
                  />
                </div>

                <p className="text-xs text-stone-600 font-mono line-clamp-2">
                  {f.description}
                </p>
              </div>

              <div className="mt-4 pt-4 border-t border-stone-100 flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                  In Production
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setEditingFinish(f)}
                    className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-mono transition-colors"
                    title="Edit Finish"
                  >
                    <Edit2 className="w-3.5 h-3.5 text-stone-600" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(f._id, f.name)}
                    className="p-1 text-stone-400 hover:text-red-600 transition-colors"
                    title="Delete Finish"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add New Finish Form */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-stone-200 shadow-xs">
          <h2 className="text-base font-bold font-editorial uppercase text-stone-900 mb-4">
            Add New Metal Finish
          </h2>

          <form onSubmit={handleAdd} className="space-y-4">
            <div>
              <label className="block text-[11px] font-mono uppercase text-stone-600 mb-1">
                Finish Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Matte Black"
                value={newFinish.name}
                onChange={(e) => setNewFinish({ ...newFinish, name: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-300 text-xs font-mono text-stone-900"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase text-stone-600 mb-1">
                RAL Code / Reference
              </label>
              <input
                type="text"
                placeholder="e.g. RAL 9005"
                value={newFinish.ralCode}
                onChange={(e) => setNewFinish({ ...newFinish, ralCode: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-300 text-xs font-mono text-stone-900"
              />
            </div>

            {/* Cloudinary & Local Upload */}
            <ImageUploadField
              label="Finish Swatch Image"
              value={newFinish.image}
              onChange={(url) => setNewFinish({ ...newFinish, image: url })}
              folder="experience-life/finishes"
              placeholder="/images/finishes/matte-black.png or Cloudinary URL"
              recommendedSize="500 x 500 swatch or sample"
            />

            <div>
              <label className="block text-[11px] font-mono uppercase text-stone-600 mb-1">
                Description
              </label>
              <textarea
                rows={3}
                placeholder="Finish properties, sheen level and recommended environments..."
                value={newFinish.description}
                onChange={(e) => setNewFinish({ ...newFinish, description: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-300 text-xs font-mono text-stone-900 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isAdding}
              className="w-full py-3 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-mono uppercase tracking-widest font-semibold transition-colors flex items-center justify-center gap-2"
            >
              {isAdding ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Adding...</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>Add Finish</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Edit Modal */}
      {editingFinish && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl border border-stone-200">
            <div className="flex items-center justify-between pb-4 border-b border-stone-200">
              <h2 className="text-lg font-editorial font-bold uppercase text-stone-900">
                Edit Finish: {editingFinish.name}
              </h2>
              <button
                onClick={() => setEditingFinish(null)}
                className="p-1 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="mt-4 space-y-4">
              <div>
                <label className="block text-[11px] font-mono uppercase text-stone-600 mb-1">
                  Finish Name
                </label>
                <input
                  type="text"
                  required
                  value={editingFinish.name}
                  onChange={(e) =>
                    setEditingFinish({ ...editingFinish, name: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-300 text-xs font-mono text-stone-900"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-stone-600 mb-1">
                  RAL Code
                </label>
                <input
                  type="text"
                  value={editingFinish.ralCode || ""}
                  onChange={(e) =>
                    setEditingFinish({ ...editingFinish, ralCode: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-300 text-xs font-mono text-stone-900"
                />
              </div>

              <ImageUploadField
                label="Finish Swatch Image"
                value={editingFinish.image || ""}
                onChange={(url) => setEditingFinish({ ...editingFinish, image: url })}
                folder="experience-life/finishes"
                placeholder="/images/finishes/... or Cloudinary URL"
              />

              <div>
                <label className="block text-[11px] font-mono uppercase text-stone-600 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={editingFinish.description || ""}
                  onChange={(e) =>
                    setEditingFinish({ ...editingFinish, description: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-300 text-xs font-mono text-stone-900 resize-none"
                />
              </div>

              <div className="pt-4 border-t border-stone-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingFinish(null)}
                  className="px-4 py-2 rounded-xl border border-stone-300 text-stone-700 text-xs font-mono uppercase hover:bg-stone-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="inline-flex items-center gap-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-mono uppercase px-5 py-2 rounded-xl transition-all font-semibold disabled:opacity-50"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-3.5 h-3.5" />
                      <span>Save Changes</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
