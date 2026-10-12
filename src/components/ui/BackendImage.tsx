"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Loader2, ImageOff, ImageIcon } from "lucide-react";

interface BackendImageProps {
  src?: string | null;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
  loadingLabel?: string;
  fallbackLabel?: string;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
}

export function BackendImage({
  src,
  alt,
  fill = false,
  width,
  height,
  className = "",
  sizes,
  priority = false,
  loadingLabel = "Loading image...",
  fallbackLabel = "No image uploaded",
  objectFit = "cover",
}: BackendImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // If no source is provided from backend or explicitly empty, show clean architectural loader/placeholder
  const hasValidSrc = Boolean(src && typeof src === "string" && src.trim().length > 0);

  if (!hasValidSrc || hasError) {
    return (
      <div
        className={`w-full h-full min-h-[140px] flex flex-col items-center justify-center p-4 bg-stone-100/90 border border-dashed border-stone-300 rounded-xl text-stone-400 select-none ${
          fill ? "absolute inset-0" : ""
        } ${className}`}
        style={!fill && width && height ? { width, height } : undefined}
      >
        <div className="w-10 h-10 rounded-full bg-stone-200/80 flex items-center justify-center mb-2 text-stone-500 animate-pulse">
          {hasError ? <ImageOff className="w-5 h-5 text-stone-400" /> : <ImageIcon className="w-5 h-5 text-stone-400" />}
        </div>
        <span className="text-[11px] font-mono uppercase tracking-wider text-stone-500 font-medium text-center">
          {hasError ? "Unable to load image" : fallbackLabel}
        </span>
        <span className="text-[9px] font-mono text-stone-400 mt-0.5 text-center">
          Configure in Admin &gt; Page Content
        </span>
      </div>
    );
  }

  const cleanSrc = src!.trim();
  const isExternal = cleanSrc.startsWith("http://") || cleanSrc.startsWith("https://");

  return (
    <div
      className={`relative overflow-hidden ${fill ? "w-full h-full" : "inline-block"}`}
      style={!fill && width && height ? { width, height } : undefined}
    >
      {/* Loading Spinner & Shimmer Overlay */}
      {isLoading && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-stone-100/95 backdrop-blur-[2px] transition-opacity duration-300">
          <Loader2 className="w-6 h-6 text-amber-800 animate-spin" />
          <span className="text-[10px] font-mono uppercase tracking-widest text-stone-500 mt-2">
            {loadingLabel}
          </span>
        </div>
      )}

      {/* Actual Image from Backend */}
      <Image
        src={cleanSrc}
        alt={alt || "Product visual"}
        fill={fill}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        sizes={sizes}
        priority={priority}
        unoptimized={isExternal}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
        className={`transition-all duration-700 ease-out ${
          isLoading ? "opacity-0 scale-98" : "opacity-100 scale-100"
        } ${objectFit === "contain" ? "object-contain" : "object-cover"} ${className}`}
      />
    </div>
  );
}
