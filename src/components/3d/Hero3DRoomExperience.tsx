"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import {
  ArchitecturalRoomModel,
  TableFrameColor,
  TABLE_FRAME_CONFIG,
} from "./room/ArchitecturalRoomModel";
import { ContactShadows } from "@react-three/drei";
import {
  ArrowDown,
  Lightbulb,
  Monitor,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { WOOD_OPTIONS, WoodSpecies } from "@/lib/woodTextures";

interface Hero3DRoomExperienceProps {
  content?: {
    heroHeadline?: string;
    heroSubheadline?: string;
    heroTagline?: string;
  };
}

// 4-Stage Cinematic Camera Controller
function CinematicRoomCameraController({ scrollProgress }: { scrollProgress: number }) {
  const { camera } = useThree();

  // Waypoints for smooth cinematic camera choreography through the room:
  // Waypoint 0 (t=0.0): Room entrance doorway wide-angle view
  // Waypoint 1 (t=0.3): Walking across oak parquet floor toward ergonomic chair & L-desk
  // Waypoint 2 (t=0.6): Close-up desk study: Apple Studio display, keyboard, iPhone, lamp
  // Waypoint 3 (t=1.0): Pan to multi-tier hutch, warm LED strip, and 4-drawer pedestal
  useFrame(() => {
    const t = scrollProgress;

    const targetPos = new THREE.Vector3();
    const targetLook = new THREE.Vector3();

    if (t <= 0.32) {
      // Stage 1: Room entrance to chair approach
      const localT = t / 0.32;
      const smoothT = THREE.MathUtils.smoothstep(localT, 0, 1);
      targetPos.lerpVectors(
        new THREE.Vector3(3.2, 2.15, 3.8),
        new THREE.Vector3(1.4, 1.5, 2.3),
        smoothT
      );
      targetLook.lerpVectors(
        new THREE.Vector3(0.05, 0.85, 0),
        new THREE.Vector3(0.05, 0.95, 0),
        smoothT
      );
    } else if (t <= 0.68) {
      // Stage 2: Approaching the Software Engineer Desk, Monitor & Steaming Coffee
      const localT = (t - 0.32) / 0.36;
      const smoothT = THREE.MathUtils.smoothstep(localT, 0, 1);
      targetPos.lerpVectors(
        new THREE.Vector3(1.4, 1.5, 2.3),
        new THREE.Vector3(0.42, 1.35, 0.96),
        smoothT
      );
      targetLook.lerpVectors(
        new THREE.Vector3(0.05, 0.95, 0),
        new THREE.Vector3(0.08, 1.15, -0.15),
        smoothT
      );
    } else {
      // Stage 3: Pan to Pedestal Cabinet, Risers & Workstation Details
      const localT = (t - 0.68) / 0.32;
      const smoothT = THREE.MathUtils.smoothstep(localT, 0, 1);
      targetPos.lerpVectors(
        new THREE.Vector3(0.42, 1.35, 0.96),
        new THREE.Vector3(1.65, 1.4, 1.55),
        smoothT
      );
      targetLook.lerpVectors(
        new THREE.Vector3(0.08, 1.15, -0.15),
        new THREE.Vector3(0.45, 1.05, 0.05),
        smoothT
      );
    }

    camera.position.lerp(targetPos, 0.08);

    // Smooth lookAt tracking
    const currentLook = new THREE.Vector3();
    camera.getWorldDirection(currentLook);
    const targetDirection = targetLook.clone().sub(camera.position).normalize();
    currentLook.lerp(targetDirection, 0.08);
    camera.lookAt(camera.position.clone().add(currentLook));
  });

  return null;
}

export function Hero3DRoomExperience({ content }: Hero3DRoomExperienceProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [is3DReady, setIs3DReady] = useState(false);
  const [selectedWood, setSelectedWood] = useState<WoodSpecies>("teak");
  const [tableFrameColor, setTableFrameColor] = useState<TableFrameColor>("black");
  const [isLampOn, setIsLampOn] = useState(true);
  const [screenMode, setScreenMode] = useState<"clock" | "code">("clock");
  const [manualDrawerOverride, setManualDrawerOverride] = useState<boolean | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  const headline = content?.heroHeadline || "EXPERIENCE LIFE";
  const subheadline = content?.heroSubheadline || "Furniture for Every Space";
  const tagline =
    content?.heroTagline ||
    "Immersive Architectural Workstation. Precision-engineered for modern software engineers, architects, and discerning studios.";

  useEffect(() => {
    const timer = setTimeout(() => {
      setIs3DReady(true);
    }, 250);

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalHeight = containerRef.current.offsetHeight;

      const currentScroll = -rect.top;
      const progress = Math.min(
        Math.max(currentScroll / (totalHeight - windowHeight), 0),
        1
      );
      setScrollProgress(progress);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Drawer slide offset [0 to 1]
  const computedDrawer =
    manualDrawerOverride !== null
      ? manualDrawerOverride
        ? 1
        : 0
      : scrollProgress > 0.72
      ? Math.min((scrollProgress - 0.72) * 3.5, 1)
      : 0;

  const isDrawerOpen = computedDrawer > 0.3;
  const currentWoodDef =
    WOOD_OPTIONS.find((w) => w.id === selectedWood) || WOOD_OPTIONS[0];

  // Opacity for the Hero editorial text: fades out as user scrolls into the room
  const heroOverlayOpacity = Math.max(1 - scrollProgress * 3.8, 0);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[360vh] md:h-[400vh] bg-[#FAF8F5]"
    >
      {/* Sticky Fullscreen 3D Viewport Frame */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-between pt-24 pb-6 px-4 sm:px-8 md:px-12 select-none">
        {/* ========================================================= */}
        {/* BACKGROUND 3D CANVAS                                      */}
        {/* ========================================================= */}
        <div className="absolute inset-0 z-0">
          {!is3DReady && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#FAF8F5] transition-opacity duration-700">
              <div className="w-12 h-12 rounded-full border-2 border-stone-300 border-t-amber-800 animate-spin mb-4" />
              <span className="text-xs font-mono uppercase tracking-widest text-stone-500 font-medium">
                Loading Architectural 3D Room Experience...
              </span>
            </div>
          )}

          {is3DReady && (
            <div className="w-full h-full">
              <Canvas
                shadows={{ type: THREE.PCFShadowMap }}
                camera={{ position: [3.6, 2.3, 4.4], fov: 38 }}
                dpr={1}
                gl={{
                  antialias: true,
                  alpha: true,
                  powerPreference: "high-performance",
                }}
              >
                {/* Natural Architectural Sunlight from Side Window */}
                <ambientLight intensity={0.75} color="#FFF8F0" />
                <directionalLight
                  position={[5, 8.5, 4.5]}
                  intensity={1.45}
                  castShadow
                  shadow-mapSize-width={2048}
                  shadow-mapSize-height={2048}
                  shadow-bias={-0.0002}
                  shadow-normalBias={0.02}
                  shadow-camera-top={5.5}
                  shadow-camera-bottom={-3.5}
                  shadow-camera-left={-5.5}
                  shadow-camera-right={5.5}
                  shadow-camera-near={1}
                  shadow-camera-far={24}
                  color="#FFF4E6"
                />
                {/* Soft interior fill light */}
                <directionalLight position={[-4, 4, -3]} intensity={0.35} color="#F0F4F8" />

                {/* Smooth Multi-Stage Camera Choreography */}
                <CinematicRoomCameraController scrollProgress={scrollProgress} />

                {/* Full 3D Room Scene with Engineer Workstation, Tech, Chair & Shelving */}
                <ArchitecturalRoomModel
                  woodSpecies={selectedWood}
                  tableFrameColor={tableFrameColor}
                  drawerOpenOffset={computedDrawer}
                  isLampOn={isLampOn}
                  screenMode={screenMode}
                  chairRotation={2.15}
                />

                {/* Ground Contact Shadow - slightly elevated (y = -0.647) to eliminate z-fighting with floor */}
                <ContactShadows
                  position={[0, -0.647, 0]}
                  opacity={0.62}
                  scale={10}
                  blur={2.4}
                  far={2.2}
                  color="#151413"
                />
              </Canvas>
            </div>
          )}
        </div>

        {/* ========================================================= */}
        {/* TOP STATUS & NAVIGATION OVERLAY                           */}
        {/* ========================================================= */}
        <div className="relative z-10 flex justify-between items-start pointer-events-none">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-stone-200/90 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              <span className="text-[10px] font-mono tracking-widest uppercase text-stone-700 font-semibold">
                Live 3D Home Visit
              </span>
            </div>
            <span className="hidden sm:inline-block text-[11px] font-mono tracking-widest uppercase text-stone-500 bg-white/70 backdrop-blur-sm px-3.5 py-1.5 rounded-full border border-stone-200/60">
              Architectural Room Walkthrough
            </span>
          </div>

          <div className="pointer-events-auto flex items-center gap-2">
            <Link
              href="#collection"
              className="bg-white/90 hover:bg-stone-900 hover:text-white transition-all backdrop-blur-md px-4 py-1.5 rounded-full border border-stone-200/90 text-xs font-mono uppercase tracking-wider text-stone-800 shadow-sm flex items-center gap-1.5"
            >
              <span>Skip to Collection</span>
              <ArrowDown className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* ========================================================= */}
        {/* STAGE 1 HERO EDITORIAL HEADLINE (Left showroom layout)    */}
        {/* ========================================================= */}
        {heroOverlayOpacity > 0.04 && (
          <div
            className="relative z-10 max-w-xl w-full pointer-events-none transition-opacity duration-300 my-auto ml-2 sm:ml-4"
            style={{ opacity: heroOverlayOpacity }}
          >
            <div className="text-left flex flex-col items-start bg-white/35 md:bg-white/40 backdrop-blur-2xl backdrop-saturate-150 p-6 sm:p-8 rounded-3xl border border-white/60 shadow-[0_8px_32px_0_rgba(0,0,0,0.12)]">
              <div className="inline-flex items-center gap-2 mb-3 bg-white/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/70 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                <span className="text-[11px] font-mono tracking-widest uppercase text-stone-700 font-semibold">
                  Collection 2026 • Architectural Furniture
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-editorial font-bold tracking-tighter text-stone-950 uppercase leading-none drop-shadow-sm">
                {headline.includes(" ") ? (
                  <>
                    {headline.split(" ")[0]}
                    <br />
                    <span className="font-serif italic font-normal text-amber-900/95 lowercase tracking-normal text-3xl sm:text-4xl md:text-5xl">
                      {headline.split(" ").slice(1).join(" ")}
                    </span>
                  </>
                ) : (
                  headline
                )}
              </h1>

              <p className="font-editorial text-base sm:text-lg text-stone-800 font-medium tracking-tight mt-3">
                {subheadline}
              </p>

              <p className="text-xs sm:text-sm text-stone-600 mt-2 font-mono leading-relaxed max-w-md">
                {tagline}
              </p>

              <div className="pointer-events-auto flex flex-wrap items-center gap-3 mt-6">
                <Link
                  href="#collection"
                  className="inline-flex items-center gap-2 bg-stone-900/90 hover:bg-stone-900 text-stone-50 text-xs font-mono uppercase tracking-widest px-6 py-3.5 rounded-full transition-all duration-300 shadow-md backdrop-blur-sm"
                >
                  <span>Explore Collection</span>
                  <ArrowDown className="w-3.5 h-3.5" />
                </Link>
                <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase text-stone-800 bg-white/60 hover:bg-white/80 backdrop-blur-md px-4 py-3.5 rounded-full border border-white/80 shadow-sm transition-all duration-200">
                  <span>Scroll to Enter Room</span>
                  <ChevronDown className="w-3.5 h-3.5 text-amber-800" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* BOTTOM HUD / DYNAMIC STAGE CONTROLS & INSPECTOR           */}
        {/* ========================================================= */}
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-end gap-4 pointer-events-none">
          {/* Dynamic Stage Commentary Card */}
          <div className="bg-white/80 backdrop-blur-xl p-4 sm:p-5 rounded-2xl border border-white/80 shadow-xl max-w-md w-full pointer-events-auto transition-all duration-500">
            {/* Stage Title and Description */}
            {scrollProgress < 0.32 && (
              <div>
                <p className="text-[10px] font-mono uppercase text-amber-800 tracking-wider font-bold">
                  Phase 01 / Spatial Sanctuary
                </p>
                <h3 className="text-sm font-semibold text-stone-900 mt-1">
                  The Architect & Engineer Study
                </h3>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  Light Scandinavian ash-oak flooring, custom solid hardwood executive workstation with rounded ergonomic seating and architectural floating shelving.
                </p>
              </div>
            )}

            {scrollProgress >= 0.32 && scrollProgress < 0.68 && (
              <div>
                <p className="text-[10px] font-mono uppercase text-amber-800 tracking-wider font-bold">
                  Phase 02 / Tech Architecture
                </p>
                <h3 className="text-sm font-semibold text-stone-900 mt-1">
                  Apple Studio Display, Mac Mini & Steaming Coffee
                </h3>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  Apple Studio Display, unibody Mac mini, Magic Keyboard with individual keys, Magic Mouse, fresh coffee with rising steam, and ergonomic mesh chair.
                </p>
              </div>
            )}

            {scrollProgress >= 0.68 && (
              <div>
                <p className="text-[10px] font-mono uppercase text-amber-800 tracking-wider font-bold">
                  Phase 03 / Storage & Hardware
                </p>
                <h3 className="text-sm font-semibold text-stone-900 mt-1">
                  Pedestal Risers & Architectural Workstation
                </h3>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  Tabletop metallic riser pegs, 3-drawer storage pedestal with telescopic runners, and solid hardwood master workstation craftsmanship.
                </p>
              </div>
            )}

            {/* Interactive Room Controls Bar */}
            <div className="mt-3.5 pt-3 border-t border-stone-100 flex flex-col gap-2.5">
              {/* Row 1: Wood Species & Table Frame Metallic Finish Customization */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                {/* Wood Texture Switcher */}
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-mono text-stone-500 uppercase tracking-tight">
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

                {/* Table Frame Color Switcher */}
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-mono text-stone-500 uppercase tracking-tight">
                    Frame ({TABLE_FRAME_CONFIG[tableFrameColor]?.name}):
                  </span>
                  <div className="flex items-center gap-1 bg-stone-100/90 p-0.5 rounded-full border border-stone-200/80">
                    {(["black", "silver", "brass", "white"] as TableFrameColor[]).map((fColor) => {
                      const cfg = TABLE_FRAME_CONFIG[fColor];
                      const isSelected = tableFrameColor === fColor;
                      return (
                        <button
                          key={fColor}
                          type="button"
                          title={`Frame Color: ${cfg.name}`}
                          onClick={() => setTableFrameColor(fColor)}
                          className={`flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-mono transition-all duration-150 ${
                            isSelected
                              ? "bg-white shadow-xs text-stone-950 font-semibold"
                              : "text-stone-600 hover:text-stone-900"
                          }`}
                        >
                          <span
                            className="w-2.5 h-2.5 rounded-full border border-stone-300 shadow-2xs"
                            style={{ backgroundColor: cfg.swatch }}
                          />
                          <span className="capitalize hidden sm:inline">{fColor}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Row 2: Screen Mode, Lamp & Drawer Controls */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-stone-100">
                {/* Screen toggle */}
                <button
                  type="button"
                  onClick={() => setScreenMode(screenMode === "clock" ? "code" : "clock")}
                  className="text-[10px] font-mono uppercase text-stone-700 bg-stone-100 hover:bg-stone-200 px-2 py-1 rounded transition-colors flex items-center gap-1"
                >
                  <Monitor className="w-3 h-3 text-stone-600" />
                  <span>Screen: {screenMode === "clock" ? "10:39" : "VS Code"}</span>
                </button>

                {/* Desk Lamp Switcher */}
                <button
                  type="button"
                  onClick={() => setIsLampOn(!isLampOn)}
                  className={`text-[10px] font-mono uppercase px-2 py-1 rounded transition-all flex items-center gap-1 border ${
                    isLampOn
                      ? "bg-amber-100/90 text-amber-900 border-amber-300 shadow-sm"
                      : "bg-stone-100 text-stone-600 border-stone-200"
                  }`}
                >
                  <Lightbulb className={`w-3 h-3 ${isLampOn ? "text-amber-600 fill-amber-500" : ""}`} />
                  <span>Lamp: {isLampOn ? "ON" : "OFF"}</span>
                </button>

                {/* Drawer toggle */}
                <button
                  type="button"
                  onClick={() => setManualDrawerOverride(isDrawerOpen ? false : true)}
                  className={`text-[10px] font-mono uppercase px-2.5 py-1 rounded transition-all duration-200 flex items-center gap-1.5 ${
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
                  <span>{isDrawerOpen ? "Close Drawer" : "Open Drawer"}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Scroll Progress Bar HUD */}
          <div className="flex items-center gap-3 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full border border-stone-200 shadow-sm">
            <span className="text-[10px] font-mono uppercase tracking-wider text-stone-600 font-semibold">
              Room Visit
            </span>
            <div className="w-28 h-1.5 bg-stone-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-stone-900 rounded-full transition-all duration-150"
                style={{ width: `${Math.round(scrollProgress * 100)}%` }}
              />
            </div>
            <span className="text-[10px] font-mono text-stone-800 font-bold min-w-[28px]">
              {Math.round(scrollProgress * 100)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
