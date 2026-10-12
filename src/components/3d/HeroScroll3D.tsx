"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { ExecutiveDeskModel } from "./ExecutiveDeskModel";
import { ContactShadows } from "@react-three/drei";
import { Rotate3d, Eye, SlidersHorizontal, ChevronDown } from "lucide-react";

// Scroll camera controller
function ScrollCameraController({ scrollProgress }: { scrollProgress: number }) {
  const { camera } = useThree();

  useFrame(() => {
    // Stage 1 (0.0 to 0.3): Hero wide angle overview
    // Stage 2 (0.3 to 0.6): Tabletop zoom and rotate
    // Stage 3 (0.6 to 1.0): Architectural X-brace and drawer opening view

    const t = scrollProgress;

    // Camera position interpolation based on scroll
    const targetX = 2.8 * Math.cos(t * Math.PI * 1.2 + 0.6);
    const targetZ = 3.2 * Math.sin(t * Math.PI * 1.2 + 0.6);
    const targetY = THREE.MathUtils.lerp(1.7, 1.2, t);

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.08);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.08);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.08);

    camera.lookAt(0, 0, 0);
  });

  return null;
}

export function HeroScroll3D() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [is3DReady, setIs3DReady] = useState(false);
  const [selectedWood, setSelectedWood] = useState("#A87C4F"); // Teak/Oak tone
  const [selectedFrame, setSelectedFrame] = useState("#1A1A1A"); // Matte Black
  const [manualDrawerOpen, setManualDrawerOpen] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Delay mounting 3D slightly to prioritize critical hero text & poster
    const timer = setTimeout(() => {
      setIs3DReady(true);
    }, 400);

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalHeight = containerRef.current.offsetHeight;
      
      // Calculate progress across container
      const currentScroll = -rect.top;
      const progress = Math.min(Math.max(currentScroll / (totalHeight - windowHeight), 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Drawer opens when user scrolls past 50%
  const computedDrawer = Math.max(manualDrawerOpen, scrollProgress > 0.4 ? (scrollProgress - 0.4) * 1.6 : 0);

  return (
    <div ref={containerRef} className="relative w-full h-[180vh] md:h-[220vh] bg-[#FAF8F5]">
      {/* Sticky viewport frame */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-between pt-24 pb-8 px-6 md:px-12">
        
        {/* Top Header Label in 3D frame */}
        <div className="flex justify-between items-start z-10 pointer-events-none">
          <div>
            <span className="text-[11px] font-mono tracking-widest uppercase text-stone-500">
              Interactive 3D Study & Architecture
            </span>
            <h2 className="text-xl md:text-2xl font-serif text-stone-900 mt-1 font-normal tracking-tight">
              Executive Work Desk <span className="text-stone-400 font-sans text-sm ml-2">EL-D01</span>
            </h2>
          </div>

          <div className="pointer-events-auto flex items-center gap-2 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-stone-200 text-xs text-stone-700 shadow-sm">
            <Rotate3d className="w-3.5 h-3.5 text-stone-500 animate-pulse" />
            <span className="hidden sm:inline">Scroll to Inspect Angles</span>
            <span className="sm:hidden">Scroll</span>
          </div>
        </div>

        {/* 3D Canvas / Fallback Poster Container */}
        <div className="absolute inset-0 z-0 flex items-center justify-center">
          {/* Fallback poster image for instant first-paint */}
          <div
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 pointer-events-none ${
              is3DReady ? "opacity-0" : "opacity-100"
            }`}
          >
            <div
              className="relative w-full max-w-2xl h-[420px]"
              style={{ position: "relative" }}
            >
              <Image
                src="/images/products/executive-work-desk.png"
                alt="Executive Work Desk 3D Model Poster"
                fill
                priority
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </div>
          </div>

          {/* Real Three.js Canvas */}
          {is3DReady && (
            <div className="w-full h-full">
              <Canvas
                shadows={{ type: THREE.PCFShadowMap }}
                camera={{ position: [2.8, 1.7, 3.2], fov: 36 }}
                dpr={1}
                gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
              >
                <ambientLight intensity={0.9} />
                <directionalLight
                  position={[5, 8, 5]}
                  intensity={1.5}
                  castShadow
                  shadow-mapSize-width={512}
                  shadow-mapSize-height={512}
                />
                <directionalLight position={[-4, 4, -4]} intensity={0.4} />

                <ScrollCameraController scrollProgress={scrollProgress} />

                <ExecutiveDeskModel
                  woodColor={selectedWood}
                  frameColor={selectedFrame}
                  drawerOpenOffset={computedDrawer}
                />

                <ContactShadows
                  position={[0, -0.61, 0]}
                  opacity={0.6}
                  scale={4.8}
                  blur={2.2}
                  far={1.6}
                  color="#121212"
                />
              </Canvas>
            </div>
          )}
        </div>

        {/* Floating Scroll Hotspot Annotations based on scroll depth */}
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-end gap-6 pointer-events-none">
          {/* Dynamic Scroll Stage Indicator */}
          <div className="bg-white/90 backdrop-blur-md p-4 rounded-xl border border-stone-200/80 shadow-lg max-w-sm pointer-events-auto transition-all duration-500">
            {scrollProgress < 0.35 && (
              <div>
                <p className="text-[10px] font-mono uppercase text-amber-700 tracking-wider font-semibold">
                  Phase 01 / Proportions
                </p>
                <h3 className="text-sm font-semibold text-stone-900 mt-1">
                  Architectural Balance & Presence
                </h3>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  5 ft length × 2 ft width × 2.5 ft height. Precision-welded MS square tube framework sustaining daily executive usage.
                </p>
              </div>
            )}

            {scrollProgress >= 0.35 && scrollProgress < 0.7 && (
              <div>
                <p className="text-[10px] font-mono uppercase text-amber-700 tracking-wider font-semibold">
                  Phase 02 / Stability & Structure
                </p>
                <h3 className="text-sm font-semibold text-stone-900 mt-1">
                  Signature Architectural X-Brace
                </h3>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  Cross-diagonal steel bracing engineered to prevent lateral wobble. Matte black electrostatic powder coat.
                </p>
              </div>
            )}

            {scrollProgress >= 0.7 && (
              <div>
                <p className="text-[10px] font-mono uppercase text-amber-700 tracking-wider font-semibold">
                  Phase 03 / Storage & Hardware
                </p>
                <h3 className="text-sm font-semibold text-stone-900 mt-1">
                  Four Full-Extension Drawers
                </h3>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  16–20 inch telescopic channels with 12mm plywood drawer boxes and flush matte profile handles.
                </p>
              </div>
            )}

            {/* Quick interactive controls */}
            <div className="mt-3 pt-3 border-t border-stone-100 flex items-center justify-between gap-3">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-mono text-stone-500 uppercase">Wood:</span>
                {[
                  { name: "Teak", color: "#A87C4F" },
                  { name: "Walnut", color: "#533B2B" },
                  { name: "Oak", color: "#CBB393" },
                ].map((w) => (
                  <button
                    key={w.name}
                    title={w.name}
                    onClick={() => setSelectedWood(w.color)}
                    className={`w-4 h-4 rounded-full border transition-all ${
                      selectedWood === w.color ? "scale-125 border-stone-900 shadow-sm" : "border-stone-300"
                    }`}
                    style={{ backgroundColor: w.color }}
                  />
                ))}
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-mono text-stone-500 uppercase">Frame:</span>
                {[
                  { name: "Matte Black", color: "#1A1A1A" },
                  { name: "Graphite", color: "#3E4042" },
                  { name: "White", color: "#F0EFEA" },
                ].map((f) => (
                  <button
                    key={f.name}
                    title={f.name}
                    onClick={() => setSelectedFrame(f.color)}
                    className={`w-4 h-4 rounded-full border transition-all ${
                      selectedFrame === f.color ? "scale-125 border-stone-900 shadow-sm" : "border-stone-300"
                    }`}
                    style={{ backgroundColor: f.color }}
                  />
                ))}
              </div>

              <button
                onClick={() => setManualDrawerOpen(manualDrawerOpen > 0 ? 0 : 1)}
                className="text-[11px] font-mono uppercase text-stone-700 bg-stone-100 hover:bg-stone-200 px-2 py-0.5 rounded transition-colors"
              >
                {manualDrawerOpen > 0 ? "Close Drawer" : "Open Drawer"}
              </button>
            </div>
          </div>

          {/* Scroll progress bar */}
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-mono text-stone-500">3D INSPECT</span>
            <div className="w-24 h-1 bg-stone-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-stone-900 transition-all duration-150"
                style={{ width: `${Math.round(scrollProgress * 100)}%` }}
              />
            </div>
            <span className="text-[11px] font-mono text-stone-500">
              {Math.round(scrollProgress * 100)}%
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
