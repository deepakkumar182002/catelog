"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { UploadCloud, Link as LinkIcon, X, Loader2, CheckCircle2 } from "lucide-react";

interface ImageUploadFieldProps {
  label?: string;
  value: string;
  onChange: (url: string) => void;
  folder?: string;
  placeholder?: string;
  recommendedSize?: string;
}

export function ImageUploadField({
  label = "Image",
  value,
  onChange,
  folder = "experience-life",
  placeholder = "/images/products/... or https://res.cloudinary.com/...",
  recommendedSize,
}: ImageUploadFieldProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [activeTab, setActiveTab] = useState<"file" | "url">(value?.startsWith("http") || !value ? "file" : "url");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError("");
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to upload image.");
      }

      onChange(data.url);
    } catch (err: any) {
      setUploadError(err.message || "Failed to upload file.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-mono uppercase text-stone-700 font-semibold">
          {label}
        </label>
        {recommendedSize && (
          <span className="text-[10px] font-mono text-stone-400">
            Recommended: {recommendedSize}
          </span>
        )}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-stone-200 pb-2 text-xs font-mono">
        <button
          type="button"
          onClick={() => setActiveTab("file")}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-colors ${
            activeTab === "file"
              ? "bg-stone-900 text-white"
              : "text-stone-600 hover:text-stone-900"
          }`}
        >
          <UploadCloud className="w-3.5 h-3.5" />
          <span>Upload From Computer</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("url")}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-colors ${
            activeTab === "url"
              ? "bg-stone-900 text-white"
              : "text-stone-600 hover:text-stone-900"
          }`}
        >
          <LinkIcon className="w-3.5 h-3.5" />
          <span>Paste Image URL</span>
        </button>
      </div>

      {/* Preview Card if Image Exists */}
      {value && (
        <div className="relative inline-flex items-center gap-3 p-2 bg-stone-100 rounded-xl border border-stone-200">
          <div style={{ position: "relative" }} className="relative w-16 h-16 rounded-lg overflow-hidden bg-white border border-stone-200 shrink-0">
            <Image
              src={value}
              alt="Preview"
              fill
              className="object-contain p-1"
              sizes="64px"
              unoptimized={value.startsWith("http")}
            />
          </div>
          <div className="flex-1 min-w-0 pr-6">
            <div className="text-[10px] font-mono text-emerald-700 flex items-center gap-1 font-semibold">
              <CheckCircle2 className="w-3 h-3 shrink-0" />
              <span>Image Attached</span>
            </div>
            <p className="text-xs font-mono text-stone-600 truncate max-w-xs mt-0.5">
              {value}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute top-2 right-2 p-1 text-stone-400 hover:text-red-600 rounded-full hover:bg-stone-200 transition-colors"
            title="Remove image"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Upload View */}
      {activeTab === "file" && (
        <div className="space-y-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif,image/svg+xml"
            onChange={handleFileUpload}
            className="hidden"
            id={`file-upload-${label.replace(/\s+/g, "-").toLowerCase()}`}
          />
          <label
            htmlFor={`file-upload-${label.replace(/\s+/g, "-").toLowerCase()}`}
            className={`w-full border-2 border-dashed border-stone-300 hover:border-stone-900 rounded-xl p-4 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors bg-stone-50 hover:bg-stone-100/80 ${
              isUploading ? "opacity-60 pointer-events-none" : ""
            }`}
          >
            {isUploading ? (
              <div className="flex flex-col items-center gap-2 py-2">
                <Loader2 className="w-6 h-6 animate-spin text-amber-700" />
                <span className="text-xs font-mono text-stone-700">
                  Uploading to Cloudinary...
                </span>
              </div>
            ) : (
              <>
                <UploadCloud className="w-6 h-6 text-stone-500" />
                <div className="text-center">
                  <span className="text-xs font-mono font-semibold text-stone-900 block">
                    Choose local file or click to browse
                  </span>
                  <span className="text-[10px] font-mono text-stone-500">
                    JPG, PNG, WebP or SVG up to 10MB
                  </span>
                </div>
              </>
            )}
          </label>
        </div>
      )}

      {/* URL View */}
      {activeTab === "url" && (
        <div>
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full px-4 py-2.5 rounded-xl bg-white border border-stone-300 text-stone-900 text-xs font-mono focus:outline-none focus:border-stone-900 transition-colors"
          />
        </div>
      )}

      {uploadError && (
        <p className="text-xs font-mono text-red-600 mt-1">
          {uploadError}
        </p>
      )}
    </div>
  );
}
