"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { UploadCloud, Link as LinkIcon, X, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

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
  placeholder = "https://res.cloudinary.com/... or /images/... or upload file",
  recommendedSize,
}: ImageUploadFieldProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);
  const [activeTab, setActiveTab] = useState<"file" | "url">("file");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadFile = async (file: File) => {
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      uploadFile(file);
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
          className={`cursor-pointer flex items-center gap-1.5 px-3 py-1 rounded-md transition-colors ${
            activeTab === "file"
              ? "bg-stone-900 text-white font-medium"
              : "text-stone-600 hover:text-stone-900 hover:bg-stone-100"
          }`}
        >
          <UploadCloud className="w-3.5 h-3.5" />
          <span>Upload From Device</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("url")}
          className={`cursor-pointer flex items-center gap-1.5 px-3 py-1 rounded-md transition-colors ${
            activeTab === "url"
              ? "bg-stone-900 text-white font-medium"
              : "text-stone-600 hover:text-stone-900 hover:bg-stone-100"
          }`}
        >
          <LinkIcon className="w-3.5 h-3.5" />
          <span>Paste Image URL</span>
        </button>
      </div>

      {/* Preview Card if Image Exists */}
      {value && (
        <div className="relative flex items-center gap-3 p-2.5 bg-stone-100 rounded-xl border border-stone-200">
          <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-white border border-stone-200 shrink-0">
            <Image
              src={value}
              alt="Preview"
              fill
              className="object-contain p-1"
              sizes="64px"
              unoptimized={value.startsWith("http") || value.startsWith("/uploads/")}
            />
          </div>
          <div className="flex-1 min-w-0 pr-6">
            <div className="text-[10px] font-mono text-emerald-700 flex items-center gap-1 font-semibold">
              <CheckCircle2 className="w-3 h-3 shrink-0" />
              <span>Image Attached</span>
            </div>
            <p className="text-xs font-mono text-stone-600 truncate max-w-xs sm:max-w-md mt-0.5" title={value}>
              {value}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onChange("")}
            className="cursor-pointer absolute top-2 right-2 p-1.5 text-stone-400 hover:text-red-600 rounded-full hover:bg-stone-200 transition-colors"
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
            accept="image/*,.jpg,.jpeg,.png,.webp,.avif,.svg,.gif"
            onChange={handleFileChange}
            className="hidden"
          />
          <div
            onClick={() => !isUploading && fileInputRef.current?.click()}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`w-full border-2 border-dashed rounded-xl p-5 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all ${
              isDragOver
                ? "border-amber-800 bg-amber-50/60 scale-[0.99]"
                : "border-stone-300 hover:border-stone-900 bg-stone-50 hover:bg-stone-100/80"
            } ${isUploading ? "opacity-60 pointer-events-none" : ""}`}
          >
            {isUploading ? (
              <div className="flex flex-col items-center gap-2 py-2">
                <Loader2 className="w-6 h-6 animate-spin text-amber-700" />
                <span className="text-xs font-mono text-stone-700 font-medium">
                  Uploading image to cloud storage...
                </span>
              </div>
            ) : (
              <>
                <UploadCloud className={`w-7 h-7 ${isDragOver ? "text-amber-800" : "text-stone-500"}`} />
                <div className="text-center">
                  <span className="text-xs font-mono font-semibold text-stone-900 block">
                    {isDragOver ? "Drop image to upload" : "Click to select or drag & drop image"}
                  </span>
                  <span className="text-[10px] font-mono text-stone-500">
                    JPG, PNG, WebP, SVG, AVIF up to 15MB
                  </span>
                </div>
              </>
            )}
          </div>
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
        <div className="p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-mono flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{uploadError}</span>
        </div>
      )}
    </div>
  );
}
