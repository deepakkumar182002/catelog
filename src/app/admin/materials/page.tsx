"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Plus, Edit2, Trash2, CheckCircle2, XCircle, Layers, X, Save, Loader2 } from "lucide-react";
import { initialMaterials } from "@/lib/seedData";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { BackendImage } from "@/components/ui/BackendImage";

export default function AdminMaterialsPage() {
  const [materials, setMaterials] = useState<any[]>(initialMaterials);
  const [editingMaterial, setEditingMaterial] = useState<any | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [newMaterial, setNewMaterial] = useState({
    name: "",
    type: "wood",
    tone: "#C49A6C",
    description: "",
    image: "",
    isAvailable: true,
  });

  const fetchMaterials = async () => {
    try {
      const res = await fetch("/api/materials");
      if (res.ok) {
        const data = await res.json();
        if (data.materials && data.materials.length > 0) {
          setMaterials(data.materials);
        }
      }
    } catch {}
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMaterial.name) return;
    setIsAdding(true);
    try {
      const res = await fetch("/api/materials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMaterial),
      });
      if (res.ok) {
        setNewMaterial({
          name: "",
          type: "wood",
          tone: "#C49A6C",
          description: "",
          image: "",
          isAvailable: true,
        });
        fetchMaterials();
      }
    } catch {
      alert("Failed to add material.");
    } finally {
      setIsAdding(false);
    }
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMaterial) return;
    setIsSaving(true);
    try {
      const id = editingMaterial._id;
      if (id) {
        const res = await fetch(`/api/materials/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editingMaterial),
        });
        if (res.ok) {
          setMaterials((prev) =>
            prev.map((m) => (m._id === id ? { ...m, ...editingMaterial } : m))
          );
        }
      } else {
        // Local state update
        setMaterials((prev) =>
          prev.map((m) => (m.name === editingMaterial.name ? { ...m, ...editingMaterial } : m))
        );
      }
      setEditingMaterial(null);
    } catch {
      alert("Failed to update material.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete material "${name}"?`)) return;
    try {
      if (id) {
        await fetch(`/api/materials/${id}`, { method: "DELETE" });
      }
      setMaterials((prev) => prev.filter((m) => m._id !== id && m.name !== name));
    } catch {
      alert("Failed to delete material.");
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="pb-6 border-b border-stone-200">
        <span className="text-[11px] font-mono tracking-widest uppercase text-amber-800 font-semibold">
          Material Swatches CMS
        </span>
        <h1 className="text-2xl sm:text-3xl font-editorial font-bold uppercase tracking-tight text-stone-900 mt-1">
          MATERIALS & WOODS
        </h1>
        <p className="text-xs font-mono text-stone-500 mt-1">
          Hardwood species, natural veneers and surface cores displayed on the website
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* List */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {materials.map((m) => (
            <div
              key={m._id || m.name}
              className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div style={{ position: "relative" }} className="relative w-full h-36 bg-stone-100">
                  <BackendImage
                    src={m.image?.startsWith("/images/") ? "" : (m.image || "")}
                    alt={m.name}
                    fill
                    objectFit="cover"
                    sizes="300px"
                    fallbackLabel="Texture Preview"
                    loadingLabel="Loading..."
                  />
                  <div className="absolute top-3 right-3 z-10 bg-stone-900/80 backdrop-blur-xs text-white text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full">
                    {m.type}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-base font-bold font-editorial text-stone-900 uppercase">
                    {m.name}
                  </h3>
                  <p className="text-xs text-stone-600 mt-2 font-mono line-clamp-2">
                    {m.description}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 border-t border-stone-100 flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                  Available in Studio
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setEditingMaterial(m)}
                    className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-mono transition-colors"
                    title="Edit Material"
                  >
                    <Edit2 className="w-3.5 h-3.5 text-stone-600" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(m._id, m.name)}
                    className="p-1 text-stone-400 hover:text-red-600 transition-colors"
                    title="Delete Material"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add New Material Form */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-stone-200 shadow-xs">
          <h2 className="text-base font-bold font-editorial uppercase text-stone-900 mb-4">
            Add New Material
          </h2>

          <form onSubmit={handleAdd} className="space-y-4">
            <div>
              <label className="block text-[11px] font-mono uppercase text-stone-600 mb-1">
                Material Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. American Walnut"
                value={newMaterial.name}
                onChange={(e) => setNewMaterial({ ...newMaterial, name: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-300 text-xs font-mono text-stone-900"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase text-stone-600 mb-1">
                Category Type
              </label>
              <select
                value={newMaterial.type}
                onChange={(e) => setNewMaterial({ ...newMaterial, type: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-300 text-xs font-mono text-stone-900"
              >
                <option value="wood">Wood / Timber</option>
                <option value="veneer">Natural Veneer</option>
                <option value="laminate">Laminate</option>
                <option value="plywood">Engineered Plywood</option>
              </select>
            </div>

            {/* Cloudinary & Local Upload for Texture */}
            <ImageUploadField
              label="Texture Swatch Image"
              value={newMaterial.image}
              onChange={(url) => setNewMaterial({ ...newMaterial, image: url })}
              folder="experience-life/materials"
              placeholder="/images/materials/oak.png or Cloudinary URL"
              recommendedSize="600 x 600 texture swatch"
            />

            <div>
              <label className="block text-[11px] font-mono uppercase text-stone-600 mb-1">
                Description
              </label>
              <textarea
                rows={3}
                placeholder="Grain pattern, durability and aesthetic characteristics..."
                value={newMaterial.description}
                onChange={(e) => setNewMaterial({ ...newMaterial, description: e.target.value })}
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
                  <span>Add Material</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Edit Modal */}
      {editingMaterial && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl border border-stone-200">
            <div className="flex items-center justify-between pb-4 border-b border-stone-200">
              <h2 className="text-lg font-editorial font-bold uppercase text-stone-900">
                Edit Material: {editingMaterial.name}
              </h2>
              <button
                onClick={() => setEditingMaterial(null)}
                className="p-1 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="mt-4 space-y-4">
              <div>
                <label className="block text-[11px] font-mono uppercase text-stone-600 mb-1">
                  Material Name
                </label>
                <input
                  type="text"
                  required
                  value={editingMaterial.name}
                  onChange={(e) =>
                    setEditingMaterial({ ...editingMaterial, name: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-300 text-xs font-mono text-stone-900"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-stone-600 mb-1">
                  Type
                </label>
                <select
                  value={editingMaterial.type}
                  onChange={(e) =>
                    setEditingMaterial({ ...editingMaterial, type: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-300 text-xs font-mono text-stone-900"
                >
                  <option value="wood">Wood / Timber</option>
                  <option value="veneer">Natural Veneer</option>
                  <option value="laminate">Laminate</option>
                  <option value="plywood">Engineered Plywood</option>
                </select>
              </div>

              <ImageUploadField
                label="Texture Swatch Image"
                value={editingMaterial.image || ""}
                onChange={(url) => setEditingMaterial({ ...editingMaterial, image: url })}
                folder="experience-life/materials"
                placeholder="/images/materials/... or Cloudinary URL"
              />

              <div>
                <label className="block text-[11px] font-mono uppercase text-stone-600 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={editingMaterial.description || ""}
                  onChange={(e) =>
                    setEditingMaterial({ ...editingMaterial, description: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-300 text-xs font-mono text-stone-900 resize-none"
                />
              </div>

              <div className="pt-4 border-t border-stone-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingMaterial(null)}
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
