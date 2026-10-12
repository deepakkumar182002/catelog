"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Plus, Edit2, Trash2, Image as ImageIcon, X, Save, Loader2 } from "lucide-react";
import { initialGallery } from "@/lib/seedData";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { BackendImage } from "@/components/ui/BackendImage";

export default function AdminGalleryPage() {
  const [gallery, setGallery] = useState<any[]>(initialGallery);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [newItem, setNewItem] = useState({
    title: "",
    category: "Office Desks",
    modelNumber: "EL-D01",
    image: "",
    featured: true,
  });

  const fetchGallery = async () => {
    try {
      const res = await fetch("/api/gallery");
      if (res.ok) {
        const data = await res.json();
        if (data.gallery && data.gallery.length > 0) {
          setGallery(data.gallery);
        }
      }
    } catch {}
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.title) return;
    setIsAdding(true);
    try {
      const res = await fetch("/api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItem),
      });
      if (res.ok) {
        setNewItem({
          title: "",
          category: "Office Desks",
          modelNumber: "EL-D01",
          image: "",
          featured: true,
        });
        fetchGallery();
      }
    } catch {
      alert("Failed to add photo.");
    } finally {
      setIsAdding(false);
    }
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    setIsSaving(true);
    try {
      const id = editingItem._id;
      if (id) {
        const res = await fetch(`/api/gallery/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editingItem),
        });
        if (res.ok) {
          setGallery((prev) =>
            prev.map((g) => (g._id === id ? { ...g, ...editingItem } : g))
          );
        }
      } else {
        setGallery((prev) =>
          prev.map((g) => (g.title === editingItem.title ? { ...g, ...editingItem } : g))
        );
      }
      setEditingItem(null);
    } catch {
      alert("Failed to update photo.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete gallery photo "${title}"?`)) return;
    try {
      if (id) {
        await fetch(`/api/gallery/${id}`, { method: "DELETE" });
      }
      setGallery((prev) => prev.filter((g) => g._id !== id && g.title !== title));
    } catch {
      alert("Failed to delete photo.");
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="pb-6 border-b border-stone-200">
        <span className="text-[11px] font-mono tracking-widest uppercase text-amber-800 font-semibold">
          Visual Assets CMS
        </span>
        <h1 className="text-2xl sm:text-3xl font-editorial font-bold uppercase tracking-tight text-stone-900 mt-1">
          GALLERY & INSTALLATIONS
        </h1>
        <p className="text-xs font-mono text-stone-500 mt-1">
          Architectural photography, client installations and studio details
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* List */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {gallery.map((g, idx) => (
            <div
              key={g._id || idx}
              className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden flex flex-col justify-between"
            >
              <div style={{ position: "relative" }} className="relative w-full h-40 bg-stone-100">
                <BackendImage
                  src={g.image?.startsWith("/images/") ? "" : (g.image || "")}
                  alt={g.title}
                  fill
                  objectFit="cover"
                  sizes="250px"
                  fallbackLabel="Photograph"
                  loadingLabel="Loading..."
                />
                <div className="absolute top-2 left-2 z-10 bg-stone-900/80 backdrop-blur-xs text-white text-[9px] font-mono uppercase px-2 py-0.5 rounded-full">
                  {g.category}
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono text-stone-400 uppercase">
                    {g.modelNumber || "Studio Photo"}
                  </span>
                  <h3 className="text-xs font-bold font-editorial text-stone-900 uppercase mt-0.5 line-clamp-1">
                    {g.title}
                  </h3>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                  <button
                    onClick={() => setEditingItem(g)}
                    className="inline-flex items-center gap-1 text-[11px] font-mono text-stone-600 hover:text-stone-900"
                  >
                    <Edit2 className="w-3 h-3" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(g._id, g.title)}
                    className="text-stone-400 hover:text-red-600 transition-colors"
                    title="Delete Photo"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add New Photo Form */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-stone-200 shadow-xs">
          <h2 className="text-base font-bold font-editorial uppercase text-stone-900 mb-4">
            Upload New Photo
          </h2>

          <form onSubmit={handleAdd} className="space-y-4">
            <div>
              <label className="block text-[11px] font-mono uppercase text-stone-600 mb-1">
                Title / Caption *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Modern Workspace Installation"
                value={newItem.title}
                onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-300 text-xs font-mono text-stone-900"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-mono uppercase text-stone-600 mb-1">
                  Category
                </label>
                <select
                  value={newItem.category}
                  onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-300 text-xs font-mono text-stone-900"
                >
                  <option value="Office Desks">Office Desks</option>
                  <option value="Workstations">Workstations</option>
                  <option value="Materials">Materials</option>
                  <option value="Details">Details & Joinery</option>
                  <option value="Craftsmanship">Craftsmanship</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-stone-600 mb-1">
                  Model Code
                </label>
                <input
                  type="text"
                  placeholder="e.g. EL-D01"
                  value={newItem.modelNumber}
                  onChange={(e) => setNewItem({ ...newItem, modelNumber: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-300 text-xs font-mono text-stone-900"
                />
              </div>
            </div>

            {/* Cloudinary & Local Upload */}
            <ImageUploadField
              label="Gallery Image"
              value={newItem.image}
              onChange={(url) => setNewItem({ ...newItem, image: url })}
              folder="experience-life/gallery"
              placeholder="/images/lifestyle/... or Cloudinary URL"
              recommendedSize="1200 x 900 architectural photo"
            />

            <button
              type="submit"
              disabled={isAdding}
              className="w-full py-3 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-mono uppercase tracking-widest font-semibold transition-colors flex items-center justify-center gap-2"
            >
              {isAdding ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Adding Photo...</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>Add to Gallery</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Edit Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl border border-stone-200">
            <div className="flex items-center justify-between pb-4 border-b border-stone-200">
              <h2 className="text-lg font-editorial font-bold uppercase text-stone-900">
                Edit Gallery Photo
              </h2>
              <button
                onClick={() => setEditingItem(null)}
                className="p-1 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="mt-4 space-y-4">
              <div>
                <label className="block text-[11px] font-mono uppercase text-stone-600 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.title}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, title: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-300 text-xs font-mono text-stone-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono uppercase text-stone-600 mb-1">
                    Category
                  </label>
                  <select
                    value={editingItem.category}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, category: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-300 text-xs font-mono text-stone-900"
                  >
                    <option value="Office Desks">Office Desks</option>
                    <option value="Workstations">Workstations</option>
                    <option value="Materials">Materials</option>
                    <option value="Details">Details & Joinery</option>
                    <option value="Craftsmanship">Craftsmanship</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-mono uppercase text-stone-600 mb-1">
                    Model Code
                  </label>
                  <input
                    type="text"
                    value={editingItem.modelNumber || ""}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, modelNumber: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-300 text-xs font-mono text-stone-900"
                  />
                </div>
              </div>

              <ImageUploadField
                label="Gallery Image"
                value={editingItem.image || ""}
                onChange={(url) => setEditingItem({ ...editingItem, image: url })}
                folder="experience-life/gallery"
                placeholder="/images/lifestyle/... or Cloudinary URL"
              />

              <div className="pt-4 border-t border-stone-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
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
