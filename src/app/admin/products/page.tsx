"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Edit2, Trash2, CheckCircle2, XCircle, Loader2, X, Save, ExternalLink } from "lucide-react";
import { initialProducts, SeedProduct } from "@/lib/seedData";
import { ImageUploadField } from "@/components/admin/ImageUploadField";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<SeedProduct[]>(initialProducts);
  const [loading, setLoading] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [editError, setEditError] = useState("");

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/products?all=true");
      if (res.ok) {
        const data = await res.json();
        if (data.products && data.products.length > 0) {
          setProducts(data.products);
        }
      }
    } catch (e) {
      console.warn("Using offline products data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (idOrSlug: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      const res = await fetch(`/api/products/${idOrSlug}`, { method: "DELETE" });
      if (res.ok) {
        setProducts((prev) => prev.filter((p: any) => p._id !== idOrSlug && p.slug !== idOrSlug));
      }
    } catch {
      alert("Failed to delete product.");
    }
  };

  const openEditModal = (p: any) => {
    setEditingProduct({
      ...p,
      materialsStr: Array.isArray(p.materials) ? p.materials.join(", ") : p.materials || "",
      finishesStr: Array.isArray(p.finishes) ? p.finishes.join(", ") : p.finishes || "",
      featuresStr: Array.isArray(p.features) ? p.features.join("\n") : p.features || "",
      hardwareStr: Array.isArray(p.hardware) ? p.hardware.join("\n") : p.hardware || "",
      dimensions: {
        length: p.dimensions?.length || "5 ft / 60 inch",
        width: p.dimensions?.width || "2 ft / 24 inch",
        height: p.dimensions?.height || "2.5 ft / 30 inch",
      },
    });
    setEditError("");
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    setIsSaving(true);
    setEditError("");

    try {
      const payload = {
        ...editingProduct,
        materials: editingProduct.materialsStr.split(",").map((s: string) => s.trim()).filter(Boolean),
        finishes: editingProduct.finishesStr.split(",").map((s: string) => s.trim()).filter(Boolean),
        features: editingProduct.featuresStr.split("\n").map((s: string) => s.trim()).filter(Boolean),
        hardware: editingProduct.hardwareStr.split("\n").map((s: string) => s.trim()).filter(Boolean),
      };

      const identifier = editingProduct._id || editingProduct.slug;
      const res = await fetch(`/api/products/${identifier}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to update product.");
      }

      setProducts((prev) =>
        prev.map((p: any) =>
          p._id === identifier || p.slug === identifier ? { ...p, ...payload } : p
        )
      );

      setEditingProduct(null);
    } catch (err: any) {
      setEditError(err.message || "Failed to update product.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
        <div>
          <span className="text-[11px] font-mono tracking-widest uppercase text-amber-800 font-semibold">
            Product Catalog CMS
          </span>
          <h1 className="text-2xl sm:text-3xl font-editorial font-bold uppercase tracking-tight text-stone-900 mt-1">
            MANAGE PRODUCTS
          </h1>
          <p className="text-xs font-mono text-stone-500 mt-1">
            Catalogue items displayed to potential clients and architects
          </p>
        </div>

        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-mono uppercase tracking-widest px-5 py-3 rounded-xl transition-all shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </Link>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-stone-50 text-stone-500 uppercase border-b border-stone-200">
              <tr>
                <th className="px-6 py-4">Item</th>
                <th className="px-6 py-4">Model & Name</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Dimensions</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {products.map((p: any) => (
                <tr key={p.slug} className="hover:bg-stone-50 transition-colors">
                  <td className="px-6 py-4">
                    <div style={{ position: "relative" }} className="relative w-12 h-12 rounded-lg bg-stone-100 overflow-hidden border border-stone-200">
                      <Image
                        src={p.heroImage || p.images?.[0] || "/images/products/executive-work-desk.png"}
                        alt={p.name}
                        fill
                        className="object-contain p-1"
                        sizes="48px"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-[10px] font-mono text-stone-400 uppercase">
                      {p.modelNumber}
                    </div>
                    <div className="font-bold text-stone-900 text-sm">
                      {p.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-stone-600">
                    {p.category}
                  </td>
                  <td className="px-6 py-4 text-stone-600">
                    {p.dimensions?.length} × {p.dimensions?.width}
                  </td>
                  <td className="px-6 py-4">
                    {p.isPublished !== false ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] uppercase font-semibold">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Published</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-600 text-[10px] uppercase font-semibold">
                        <XCircle className="w-3 h-3" />
                        <span>Draft</span>
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <button
                        onClick={() => openEditModal(p)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-mono transition-colors"
                        title="Edit Product"
                      >
                        <Edit2 className="w-3.5 h-3.5 text-stone-600" />
                        <span>Edit</span>
                      </button>
                      <Link
                        href={`/collection/${p.slug}`}
                        target="_blank"
                        className="text-stone-500 hover:text-stone-900 text-xs font-mono flex items-center gap-1"
                        title="View Public Page"
                      >
                        <span>Preview</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                      <button
                        onClick={() => handleDelete(p._id || p.slug)}
                        className="p-1 text-stone-400 hover:text-red-600 transition-colors"
                        title="Delete Product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Product Modal */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 shadow-2xl border border-stone-200">
            <div className="flex items-center justify-between pb-4 border-b border-stone-200">
              <div>
                <span className="text-[10px] font-mono uppercase text-amber-800 font-semibold tracking-wider">
                  Update Catalogue Item
                </span>
                <h2 className="text-xl font-editorial font-bold uppercase text-stone-900 mt-0.5">
                  Edit {editingProduct.name} ({editingProduct.modelNumber})
                </h2>
              </div>
              <button
                onClick={() => setEditingProduct(null)}
                className="p-1 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {editError && (
              <div className="mt-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-mono">
                {editError}
              </div>
            )}

            <form onSubmit={handleSaveEdit} className="mt-6 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-stone-600 mb-1">
                    Model Number
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProduct.modelNumber}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, modelNumber: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-stone-600 mb-1">
                    Product Name
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProduct.name}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, name: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 text-xs font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-stone-600 mb-1">
                  Category
                </label>
                <select
                  value={editingProduct.category}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, category: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 text-xs font-mono"
                >
                  <option value="Work Desks">Work Desks</option>
                  <option value="Executive Desks">Executive Desks</option>
                  <option value="Workstations">Workstations</option>
                  <option value="Architectural Desks">Architectural Desks</option>
                  <option value="Tables & Lounges">Tables & Lounges</option>
                  <option value="Custom Commissions">Custom Commissions</option>
                </select>
              </div>

              {/* Image Upload with Cloudinary Support */}
              <ImageUploadField
                label="Product Hero Image"
                value={editingProduct.heroImage || ""}
                onChange={(url) => setEditingProduct({ ...editingProduct, heroImage: url })}
                folder="experience-life/products"
                placeholder="/images/products/... or Cloudinary URL"
                recommendedSize="1200 x 800 (Clean transparent PNG or studio render)"
              />

              <div>
                <label className="block text-xs font-mono uppercase text-stone-600 mb-1">
                  Short Description
                </label>
                <input
                  type="text"
                  required
                  value={editingProduct.shortDescription || ""}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, shortDescription: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-stone-600 mb-1">
                  Long Architectural Description
                </label>
                <textarea
                  rows={3}
                  value={editingProduct.longDescription || ""}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, longDescription: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 text-xs font-mono resize-none"
                />
              </div>

              {/* Dimensions */}
              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200">
                <span className="text-xs font-mono uppercase text-stone-600 block mb-2 font-semibold">
                  Dimensions
                </span>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[10px] font-mono text-stone-500 uppercase">Length</label>
                    <input
                      type="text"
                      value={editingProduct.dimensions?.length || ""}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          dimensions: { ...editingProduct.dimensions, length: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-white border border-stone-300 text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-stone-500 uppercase">Width</label>
                    <input
                      type="text"
                      value={editingProduct.dimensions?.width || ""}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          dimensions: { ...editingProduct.dimensions, width: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-white border border-stone-300 text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-stone-500 uppercase">Height</label>
                    <input
                      type="text"
                      value={editingProduct.dimensions?.height || ""}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          dimensions: { ...editingProduct.dimensions, height: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-white border border-stone-300 text-xs font-mono"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-stone-600 mb-1">
                    Materials (Comma Separated)
                  </label>
                  <input
                    type="text"
                    value={editingProduct.materialsStr || ""}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, materialsStr: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-stone-600 mb-1">
                    Finishes (Comma Separated)
                  </label>
                  <input
                    type="text"
                    value={editingProduct.finishesStr || ""}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, finishesStr: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 text-xs font-mono"
                  />
                </div>
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-mono text-stone-700">
                  <input
                    type="checkbox"
                    checked={editingProduct.isPublished !== false}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, isPublished: e.target.checked })
                    }
                    className="w-4 h-4 rounded text-stone-900"
                  />
                  <span>Published on Website</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-xs font-mono text-stone-700">
                  <input
                    type="checkbox"
                    checked={editingProduct.isFeatured || false}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, isFeatured: e.target.checked })
                    }
                    className="w-4 h-4 rounded text-stone-900"
                  />
                  <span>Featured Hero Highlight</span>
                </label>
              </div>

              <div className="pt-4 border-t border-stone-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-5 py-2.5 rounded-xl border border-stone-300 text-stone-700 text-xs font-mono uppercase hover:bg-stone-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="inline-flex items-center gap-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-mono uppercase tracking-widest px-6 py-2.5 rounded-xl transition-all font-semibold disabled:opacity-50"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
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
