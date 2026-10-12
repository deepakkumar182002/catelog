"use client";

import React, { useEffect, useState, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { ExecutiveDeskModel } from "./ExecutiveDeskModel";
import { ContactShadows } from "@react-three/drei";
import { Rotate3d } from "lucide-react";
import { WOOD_OPTIONS, WoodSpecies } from "@/lib/woodTextures";

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
  const [selectedWood, setSelectedWood] = useState<WoodSpecies>("teak");
  const [selectedFrame, setSelectedFrame] = useState("#1A1A1A"); // Matte Black
  const [manualDrawerOverride, setManualDrawerOverride] = useState<boolean | null>(null);
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

  // Compute drawer slide offset [0 to 1]
  const computedDrawer =
    manualDrawerOverride !== null
      ? (manualDrawerOverride ? 1 : 0)
      : (scrollProgress > 0.4 ? Math.min((scrollProgress - 0.4) * 2.2, 1) : 0);

  const isDrawerOpen = computedDrawer > 0.3;

  const currentWoodDef = WOOD_OPTIONS.find((w) => w.id === selectedWood) || WOOD_OPTIONS[0];

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

        {/* 3D Canvas Container */}
        <div className="absolute inset-0 z-0 flex items-center justify-center">
          {/* Fallback loader for 3D initialization */}
          {!is3DReady && (
            <div className="absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-700 pointer-events-none">
              <div className="w-12 h-12 rounded-full border-2 border-stone-300 border-t-amber-800 animate-spin mb-4" />
              <span className="text-xs font-mono uppercase tracking-widest text-stone-500 font-medium">
                Initializing Architectural 3D Scene...
              </span>
            </div>
          )}

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
                  woodSpecies={selectedWood}
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
          <div className="bg-white/95 backdrop-blur-md p-4 rounded-xl border border-stone-200/80 shadow-lg max-w-sm pointer-events-auto transition-all duration-500">
            {scrollProgress < 0.35 && (
              <div>
                <p className="text-[10px] font-mono uppercase text-amber-700 tracking-wider font-semibold">
                  Phase 01 / Proportions & Grain
                </p>
                <h3 className="text-sm font-semibold text-stone-900 mt-1">
                  Architectural Balance & Natural Hardwood
                </h3>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  5 ft length × 2 ft width × 2.5 ft height. Real grain texture with natural annular rings and precision-welded steel framework.
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
                  Heavy-duty telescopic slide channels with birch plywood interior drawer box and flush profile handles.
                </p>
              </div>
            )}

            {/* Quick interactive controls */}
            <div className="mt-3 pt-3 border-t border-stone-100 flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                {/* Wood selector */}
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-mono text-stone-500 uppercase">
                    Wood ({currentWoodDef.name}):
                  </span>
                  <div className="flex items-center gap-1">
                    {WOOD_OPTIONS.map((w) => {
                      const isSelected = selectedWood === w.id;
                      return (
                        <button
                          key={w.id}
                          type="button"
                          title={`${w.name} - ${w.subtitle}`}
                          onClick={() => setSelectedWood(w.id)}
                          className={`w-4 h-4 rounded-full border transition-all duration-150 ${
                            isSelected
                              ? "scale-125 ring-2 ring-stone-900 ring-offset-1 border-white shadow-sm"
                              : "border-stone-300 hover:scale-110"
                          }`}
                          style={{ backgroundColor: w.color }}
                        />
                      );
                    })}
                  </div>
                </div>

                {/* Frame selector */}
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-mono text-stone-500 uppercase">Frame:</span>
                  {[
                    { name: "Matte Black", color: "#1A1A1A" },
                    { name: "Graphite", color: "#3E4042" },
                    { name: "White", color: "#F0EFEA" },
                  ].map((f) => (
                    <button
                      key={f.name}
                      type="button"
                      title={f.name}
                      onClick={() => setSelectedFrame(f.color)}
                      className={`w-4 h-4 rounded-full border transition-all duration-150 ${
                        selectedFrame === f.color ? "scale-125 ring-2 ring-stone-900 ring-offset-1 border-white shadow-sm" : "border-stone-300"
                      }`}
                      style={{ backgroundColor: f.color }}
                    />
                  ))}
                </div>
              </div>

              {/* Drawer Toggle Button */}
              <div className="flex items-center justify-between pt-1 border-t border-stone-100">
                <span className="text-[10px] font-mono text-stone-500 uppercase">
                  Drawer Mechanism:
                </span>
                <button
                  type="button"
                  onClick={() => setManualDrawerOverride(isDrawerOpen ? false : true)}
                  className={`text-[11px] font-mono uppercase px-2.5 py-1 rounded transition-all duration-200 flex items-center gap-1.5 ${
                    isDrawerOpen
                      ? "bg-stone-900 text-white shadow-sm"
                      : "bg-stone-100 hover:bg-stone-200 text-stone-800"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isDrawerOpen ? "bg-amber-400 animate-pulse" : "bg-stone-400"
                    }`}
                  />
                  {isDrawerOpen ? "Close Drawer" : "Open Drawer"}
                </button>
              </div>
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
