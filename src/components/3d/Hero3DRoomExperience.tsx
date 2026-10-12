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
  ChevronUp,
  Sparkles,
  SlidersHorizontal,
  Check,
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
  const [tableFrameColor, setTableFrameColor] = useState<TableFrameColor>("silver");
  const [isControlsOpen, setIsControlsOpen] = useState(false);
  const [isLampOn, setIsLampOn] = useState(true);
  const [screenMode, setScreenMode] = useState<"clock" | "code">("clock");
  const [currentDate, setCurrentDate] = useState<Date>(() => new Date());

  useEffect(() => {
    const clockTimer = setInterval(() => {
      setCurrentDate(new Date());
    }, 2000);
    return () => clearInterval(clockTimer);
  }, []);

  const dynamicTimeText = React.useMemo(() => {
    const hours24 = currentDate.getHours();
    const hours12 = hours24 % 12 || 12;
    const minutes = currentDate.getMinutes().toString().padStart(2, "0");
    const ampm = hours24 >= 12 ? "PM" : "AM";
    return `${hours12.toString().padStart(2, "0")}:${minutes} ${ampm}`;
  }, [currentDate]);
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
                  currentTime={currentDate}
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
            {/* <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-stone-200/90 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              <span className="text-[10px] font-mono tracking-widest uppercase text-stone-700 font-semibold">
                Live 3D Home Visit
              </span>
            </div>
            <span className="hidden sm:inline-block text-[11px] font-mono tracking-widest uppercase text-stone-500 bg-white/70 backdrop-blur-sm px-3.5 py-1.5 rounded-full border border-stone-200/60">
              Architectural Room Walkthrough
            </span> */}
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
        {/* STAGE 1 HERO EDITORIAL HEADLINE (Hidden on mobile screens) */}
        {/* ========================================================= */}
        {heroOverlayOpacity > 0.04 && (
          <div
            className="hidden sm:block relative z-10 max-w-xl w-full pointer-events-none transition-opacity duration-300 my-auto ml-2 sm:ml-4"
            style={{ opacity: heroOverlayOpacity }}
          >
            <div className="text-left flex flex-col items-start p-6 sm:p-8">
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
        {/* ========================================================= */}
        {/* CANVAS-BOUND HUD: ONLY VISIBLE WITHIN 3D HERO SECTION     */}
        {/* ========================================================= */}
        {/* 1. BOTTOM-LEFT: SCROLL PROGRESS HUD (Canvas-anchored, mobile friendly) */}
        <div
          className={`absolute bottom-4 sm:bottom-7 left-3 sm:left-8 z-30 pointer-events-auto flex items-center gap-2 sm:gap-2.5 bg-white px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-full border border-stone-200/90 shadow-xl select-none transition-opacity duration-300 ${
            scrollProgress >= 0.98 ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          <span className="text-[8px] sm:text-[9px] font-mono uppercase tracking-wider text-stone-700 font-semibold">
            <span className="hidden xs:inline">Room </span>Visit
          </span>
          <div className="w-16 sm:w-24 h-1.5 bg-stone-100 rounded-full overflow-hidden border border-stone-200">
            <div
              className="h-full bg-stone-900 rounded-full transition-all duration-150"
              style={{ width: `${Math.round(scrollProgress * 100)}%` }}
            />
          </div>
          <span className="text-[8px] sm:text-[9px] font-mono text-stone-900 font-bold min-w-[20px] sm:min-w-[24px]">
            {Math.round(scrollProgress * 100)}%
          </span>
        </div>

        {/* 2. BOTTOM-RIGHT: CONTROLS DOCK (Canvas-anchored, mobile friendly) */}
        <div
          className={`absolute bottom-4 sm:bottom-7 right-3 sm:right-8 z-30 max-w-[320px] sm:max-w-[355px] w-[calc(100vw-1.5rem)] flex flex-col items-end pointer-events-none transition-opacity duration-300 ${
            scrollProgress >= 0.98 ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          {/* EXPANDABLE DROP-UP PANEL (Expands smoothly UPWARDS on canvas) */}
          {isControlsOpen && (
            <div className="pointer-events-auto w-full mb-2 p-3 sm:p-3.5 rounded-2xl bg-white border border-stone-200/90 shadow-2xl transition-all duration-300 ease-out origin-bottom animate-in fade-in slide-in-from-bottom-3 max-h-[75vh] overflow-y-auto">
              {/* Compact Top Header with Close Toggle */}
              <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[8px] sm:text-[9px] font-mono uppercase text-amber-900 tracking-wider font-bold">
                    {scrollProgress < 0.32
                      ? "Phase 01 / Spatial Sanctuary"
                      : scrollProgress < 0.68
                      ? "Phase 02 / Tech Architecture"
                      : "Phase 03 / Storage & Hardware"}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsControlsOpen(false)}
                  className="cursor-pointer flex items-center gap-1 text-[9px] sm:text-[10px] font-mono text-stone-600 hover:text-stone-950 bg-stone-100 hover:bg-stone-200 px-2 py-0.5 rounded-full border border-stone-200 transition-colors"
                  title="Collapse Controls"
                >
                  <span>Drop Down</span>
                  <ChevronDown className="w-3 h-3" />
                </button>
              </div>

              {/* Stage Title and Compact Description */}
              <div className="py-2">
                {scrollProgress < 0.32 && (
                  <div>
                    <h3 className="text-xs font-semibold text-stone-900 leading-snug">
                      The Architect & Engineer Study
                    </h3>
                    <p className="text-[10px] sm:text-[11px] text-stone-600 mt-0.5 leading-snug">
                      Scandinavian ash-oak flooring, executive workstation with ergonomic seating & floating shelving.
                    </p>
                  </div>
                )}

                {scrollProgress >= 0.32 && scrollProgress < 0.68 && (
                  <div>
                    <h3 className="text-xs font-semibold text-stone-900 leading-snug">
                      Apple Studio Display, Mac Mini & Steaming Coffee
                    </h3>
                    <p className="text-[10px] sm:text-[11px] text-stone-600 mt-0.5 leading-snug">
                      Apple Studio Display, unibody Mac mini, Magic Keyboard, Amkette ergonomic mouse, and steaming coffee.
                    </p>
                  </div>
                )}

                {scrollProgress >= 0.68 && (
                  <div>
                    <h3 className="text-xs font-semibold text-stone-900 leading-snug">
                      Pedestal Risers & Architectural Workstation
                    </h3>
                    <p className="text-[10px] sm:text-[11px] text-stone-600 mt-0.5 leading-snug">
                      Metallic riser pegs, 3-drawer storage pedestal with telescopic runners, and solid hardwood.
                    </p>
                  </div>
                )}
              </div>

              {/* Interactive Compact Room Controls */}
              <div className="pt-2 border-t border-stone-100 flex flex-col gap-2">
                {/* Control 1: Wood Species Switcher */}
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between text-[8px] sm:text-[9px] font-mono">
                    <span className="text-stone-500 uppercase tracking-tight">Tabletop Hardwood</span>
                    <span className="font-semibold text-stone-800 bg-stone-100 px-1.5 py-0.2 rounded-full border border-stone-200">
                      {currentWoodDef.name}
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-1 bg-stone-50 p-1 rounded-lg border border-stone-200/80">
                    {WOOD_OPTIONS.map((w) => {
                      const isSelected = selectedWood === w.id;
                      return (
                        <button
                          key={w.id}
                          type="button"
                          title={`${w.name} - ${w.subtitle}`}
                          onClick={() => setSelectedWood(w.id)}
                          className={`cursor-pointer flex items-center justify-center gap-1 py-1 px-1 rounded-md text-[8px] sm:text-[9px] font-mono transition-all ${
                            isSelected
                              ? "bg-white shadow-xs text-stone-950 font-bold ring-1 ring-stone-900/15"
                              : "text-stone-600 hover:text-stone-900 hover:bg-stone-100"
                          }`}
                        >
                          <span
                            className="w-2.5 h-2.5 rounded-full border border-stone-300 shrink-0"
                            style={{ backgroundColor: w.color }}
                          />
                          <span className="truncate">{w.name.split(" ")[0]}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Control 2: Table Frame Metal Switcher (Default Silver) */}
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between text-[8px] sm:text-[9px] font-mono">
                    <span className="text-stone-500 uppercase tracking-tight">Table Metal Frame</span>
                    <span className="font-semibold text-stone-800 bg-stone-100 px-1.5 py-0.2 rounded-full border border-stone-200">
                      {TABLE_FRAME_CONFIG[tableFrameColor]?.name}
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-1 bg-stone-50 p-1 rounded-lg border border-stone-200/80">
                    {(["silver", "black", "brass", "white"] as TableFrameColor[]).map((fColor) => {
                      const cfg = TABLE_FRAME_CONFIG[fColor];
                      const isSelected = tableFrameColor === fColor;
                      return (
                        <button
                          key={fColor}
                          type="button"
                          title={`Frame Finish: ${cfg.name}`}
                          onClick={() => setTableFrameColor(fColor)}
                          className={`cursor-pointer flex items-center justify-center gap-1 py-1 px-1 rounded-md text-[8px] sm:text-[9px] font-mono transition-all ${
                            isSelected
                              ? "bg-white shadow-xs text-stone-950 font-bold ring-1 ring-stone-900/15"
                              : "text-stone-600 hover:text-stone-900 hover:bg-stone-100"
                          }`}
                        >
                          <span
                            className="w-2.5 h-2.5 rounded-full border border-stone-300 shrink-0"
                            style={{ backgroundColor: cfg.swatch }}
                          />
                          <span className="capitalize truncate">{fColor}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Control 3: Screen Mode (Dynamic Time), Lamp & Drawer Controls */}
                <div className="grid grid-cols-3 gap-1.5 pt-1 border-t border-stone-100">
                  {/* Screen toggle with Dynamic Real Time */}
                  <button
                    type="button"
                    onClick={() => setScreenMode(screenMode === "clock" ? "code" : "clock")}
                    className="cursor-pointer text-[8px] sm:text-[9px] font-mono uppercase text-stone-700 bg-stone-100 hover:bg-stone-200/80 p-1.5 rounded-lg transition-all flex flex-col items-center justify-center gap-0.5 border border-stone-200"
                    title="Toggle Screen Display (Clock / Code)"
                  >
                    <Monitor className="w-3 h-3 text-stone-700" />
                    <span className="truncate">{screenMode === "clock" ? dynamicTimeText : "VS CODE"}</span>
                  </button>

                  {/* Desk Lamp Switcher */}
                  <button
                    type="button"
                    onClick={() => setIsLampOn(!isLampOn)}
                    className={`cursor-pointer text-[8px] sm:text-[9px] font-mono uppercase p-1.5 rounded-lg transition-all flex flex-col items-center justify-center gap-0.5 border ${
                      isLampOn
                        ? "bg-amber-100/90 text-amber-950 border-amber-300 shadow-xs font-semibold"
                        : "bg-stone-100 text-stone-700 border-stone-200 hover:bg-stone-200/80"
                    }`}
                    title="Toggle Desk Lamp"
                  >
                    <Lightbulb className={`w-3 h-3 ${isLampOn ? "text-amber-600 fill-amber-500" : ""}`} />
                    <span>LAMP: {isLampOn ? "ON" : "OFF"}</span>
                  </button>

                  {/* Drawer toggle */}
                  <button
                    type="button"
                    onClick={() => setManualDrawerOverride(isDrawerOpen ? false : true)}
                    className={`cursor-pointer text-[8px] sm:text-[9px] font-mono uppercase p-1.5 rounded-lg transition-all duration-200 flex flex-col items-center justify-center gap-0.5 border ${
                      isDrawerOpen
                        ? "bg-stone-900 text-white border-stone-900 shadow-xs"
                        : "bg-stone-100 hover:bg-stone-200/80 text-stone-800 border-stone-200"
                    }`}
                    title="Toggle Workstation Drawer"
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isDrawerOpen ? "bg-amber-400 animate-pulse" : "bg-stone-400"
                      }`}
                    />
                    <span>{isDrawerOpen ? "CLOSE" : "DRAWER"}</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* FIXED BOTTOM TRIGGER BUTTON (Canvas anchored, Solid White) */}
          <button
            type="button"
            onClick={() => setIsControlsOpen(!isControlsOpen)}
            className="pointer-events-auto w-full cursor-pointer flex items-center justify-between gap-2.5 sm:gap-3 bg-white hover:bg-stone-50 p-2 sm:p-2.5 px-3 sm:px-3.5 rounded-2xl border border-stone-200/90 shadow-xl hover:shadow-2xl transition-all duration-200 select-none hover:-translate-y-0.5 active:translate-y-0"
          >
            <div className="flex items-center gap-2 sm:gap-2.5">
              <div className="w-6 sm:w-7 h-6 sm:h-7 rounded-lg bg-stone-900 text-amber-400 flex items-center justify-center shadow-xs">
                <SlidersHorizontal className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[8px] sm:text-[9px] font-mono uppercase tracking-wider font-bold text-amber-900 leading-tight">
                  {scrollProgress < 0.32
                    ? "Phase 01"
                    : scrollProgress < 0.68
                    ? "Phase 02"
                    : "Phase 03"}
                </span>
                <span className="text-[10px] sm:text-[11px] font-semibold text-stone-900 leading-tight">
                  {isControlsOpen ? "Hide Controls" : "Studio Controls"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2 pl-2 border-l border-stone-200">
              <span
                className="w-3 sm:w-3.5 h-3 sm:h-3.5 rounded-full border border-stone-300 shadow-2xs"
                style={{ backgroundColor: currentWoodDef.color }}
                title={`Wood: ${currentWoodDef.name}`}
              />
              <span
                className="w-3 sm:w-3.5 h-3 sm:h-3.5 rounded-full border border-stone-300 shadow-2xs"
                style={{ backgroundColor: TABLE_FRAME_CONFIG[tableFrameColor]?.swatch }}
                title={`Frame: ${TABLE_FRAME_CONFIG[tableFrameColor]?.name}`}
              />
              <div className="w-4.5 sm:w-5 h-4.5 sm:h-5 rounded-full bg-stone-100 text-stone-700 flex items-center justify-center transition-transform duration-200">
                {isControlsOpen ? (
                  <ChevronDown className="w-3 h-3" />
                ) : (
                  <ChevronUp className="w-3 h-3" />
                )}
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}