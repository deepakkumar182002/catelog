"use client";

import React, { useRef, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { WoodSpecies, getWoodMaterialConfig } from "@/lib/woodTextures";
import { getFloorTexture, getMonitorTexture } from "@/lib/roomTextures";
import { CoffeeSteam } from "./CoffeeSteam";
// import { PlantStand } from "./PlantStand"; // removed per user request
import { WallShelves } from "./WallShelves";

export type TableFrameColor = "black" | "silver" | "brass" | "white";

export const TABLE_FRAME_CONFIG: Record<
  TableFrameColor,
  {
    name: string;
    color: string;
    roughness: number;
    metalness: number;
    swatch: string;
  }
> = {
  black: {
    name: "Matte Noir",
    color: "#1A1B1C",
    roughness: 0.72,
    metalness: 0.35,
    swatch: "#1A1B1C",
  },
  silver: {
    name: "Brushed Titanium",
    color: "#B4BCC6",
    roughness: 0.28,
    metalness: 0.88,
    swatch: "#B4BCC6",
  },
  brass: {
    name: "Warm Brass",
    color: "#C5A059",
    roughness: 0.32,
    metalness: 0.82,
    swatch: "#C5A059",
  },
  white: {
    name: "Studio Chalk",
    color: "#E8E6E1",
    roughness: 0.65,
    metalness: 0.15,
    swatch: "#E8E6E1",
  },
};

interface ArchitecturalRoomModelProps {
  woodSpecies?: WoodSpecies;
  tableFrameColor?: TableFrameColor;
  drawerOpenOffset?: number; // 0 to 1
  isLampOn?: boolean;
  screenMode?: "clock" | "code";
  chairRotation?: number;
}

export function ArchitecturalRoomModel({
  woodSpecies = "teak",
  tableFrameColor = "black",
  drawerOpenOffset = 0,
  isLampOn = true,
  screenMode = "clock",
  chairRotation = 2.15, // Swiveled 60 degrees towards the screen/viewer
}: ArchitecturalRoomModelProps) {
  const drawerRef = useRef<THREE.Group>(null);
  const chairRef = useRef<THREE.Group>(null);

  // 1. High-fidelity Wood Material
  const woodConfig = useMemo(() => getWoodMaterialConfig(woodSpecies), [woodSpecies]);
  const woodMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      map: woodConfig.map || undefined,
      bumpMap: woodConfig.bumpMap || undefined,
      bumpScale: woodConfig.bumpScale,
      roughness: woodConfig.roughness,
      metalness: woodConfig.metalness,
      color: woodConfig.map ? new THREE.Color(0xffffff) : new THREE.Color(woodConfig.fallbackColor),
    });
  }, [woodConfig]);

  // 2. Dynamic Table Framework Metal Material
  const frameConfig = TABLE_FRAME_CONFIG[tableFrameColor] || TABLE_FRAME_CONFIG.black;
  const tableFrameMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color(frameConfig.color),
      roughness: frameConfig.roughness,
      metalness: frameConfig.metalness,
    });
  }, [frameConfig]);

  // Ergonomic Chair Geometries with Soft Radius & Curvature (No sharp blocks!)
  const chairSeatGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    const w = 0.25; // half width (0.50m)
    const d = 0.23; // half depth (0.46m)
    const r = 0.07; // smooth corner radius
    shape.moveTo(-w + r, -d);
    shape.lineTo(w - r, -d);
    shape.quadraticCurveTo(w, -d, w, -d + r);
    shape.lineTo(w, d - r);
    shape.quadraticCurveTo(w, d, w - r, d);
    shape.lineTo(-w + r, d);
    shape.quadraticCurveTo(-w, d, -w, d - r);
    shape.lineTo(-w, -d + r);
    shape.quadraticCurveTo(-w, -d, -w + r, -d);

    return new THREE.ExtrudeGeometry(shape, {
      depth: 0.045,
      bevelEnabled: true,
      bevelSegments: 5,
      steps: 1,
      bevelSize: 0.024,
      bevelThickness: 0.024,
    });
  }, []);

  const chairBackrestFrameGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    const topW = 0.23;
    const waistW = 0.185;
    const botW = 0.21;
    const h = 0.33;

    shape.moveTo(-botW + 0.05, -h);
    shape.lineTo(botW - 0.05, -h);
    shape.quadraticCurveTo(botW, -h, botW, -h + 0.05);
    shape.quadraticCurveTo(waistW, 0, topW - 0.04, h - 0.07);
    shape.quadraticCurveTo(topW, h, 0, h);
    shape.quadraticCurveTo(-topW, h, -topW + 0.04, h - 0.07);
    shape.quadraticCurveTo(-waistW, 0, -botW, -h + 0.05);
    shape.quadraticCurveTo(-botW, -h, -botW + 0.05, -h);

    return new THREE.ExtrudeGeometry(shape, {
      depth: 0.02,
      bevelEnabled: true,
      bevelSegments: 5,
      steps: 1,
      bevelSize: 0.016,
      bevelThickness: 0.016,
    });
  }, []);

  const chairBackrestMeshGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    const topW = 0.205;
    const waistW = 0.16;
    const botW = 0.185;
    const h = 0.305;

    shape.moveTo(-botW + 0.04, -h);
    shape.lineTo(botW - 0.04, -h);
    shape.quadraticCurveTo(botW, -h, botW, -h + 0.04);
    shape.quadraticCurveTo(waistW, 0, topW - 0.03, h - 0.06);
    shape.quadraticCurveTo(topW, h, 0, h);
    shape.quadraticCurveTo(-topW, h, -topW + 0.03, h - 0.06);
    shape.quadraticCurveTo(-waistW, 0, -botW, -h + 0.04);
    shape.quadraticCurveTo(-botW, -h, -botW + 0.04, -h);

    return new THREE.ExtrudeGeometry(shape, {
      depth: 0.008,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelSize: 0.006,
      bevelThickness: 0.006,
    });
  }, []);

  // 2. Light Bleached Ash-Oak Floor (Image 1)
  const floorTexture = useMemo(() => getFloorTexture(), []);
  const floorMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      map: floorTexture || undefined,
      roughness: 0.38,
      metalness: 0.04,
      color: floorTexture ? new THREE.Color(0xffffff) : new THREE.Color("#DFD8CD"),
    });
  }, [floorTexture]);

  // 3. Clean Gallery Cream Architectural Walls (Image 1)
  const wallMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color("#F5F2EB"),
      roughness: 0.92,
      metalness: 0.0,
    });
  }, []);

  // 4. Matte Black Metal Framework
  const matteBlackMetalMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color("#1A1B1C"),
      roughness: 0.75,
      metalness: 0.3,
    });
  }, []);

  // 5. Chrome / Metallic Spacer Risers
  const chromeRiserMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color("#A8B0B8"),
      roughness: 0.2,
      metalness: 0.9,
    });
  }, []);

  // 6. Apple Bead-Blasted Aluminum (Studio Display, Mac mini, Keyboard)
  const appleAluminumMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color("#E0E3E8"),
      roughness: 0.28,
      metalness: 0.85,
    });
  }, []);

  // 7. Apple Keycaps Material (Contrasting low-profile dark chiclet keys)
  const appleKeycapMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color("#1E2022"),
      roughness: 0.45,
      metalness: 0.15,
    });
  }, []);

  // 8. Apple Magic Mouse Material (Glossy glass/polycarbonate top)
  const magicMouseMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color("#FAFAFA"),
      roughness: 0.1,
      metalness: 0.05,
    });
  }, []);

  // 9. Apple Studio Display Screen
  const monitorTexture = useMemo(() => getMonitorTexture(screenMode), [screenMode]);
  const monitorScreenMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      map: monitorTexture || undefined,
      roughness: 0.18,
      metalness: 0.08,
      emissive: new THREE.Color(0xffffff),
      emissiveMap: monitorTexture || undefined,
      emissiveIntensity: 0.92,
    });
  }, [monitorTexture]);

  // 10. Ergonomic Office Chair Mesh Fabric
  const chairMeshMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color("#2C2E30"),
      roughness: 0.8,
      metalness: 0.1,
    });
  }, []);

  const chairFrameMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color("#18191A"),
      roughness: 0.6,
      metalness: 0.4,
    });
  }, []);

  // 11. Clear Glass (Water Carafe)
  const clearGlassMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#FFFFFF"),
      transmission: 0.92,
      opacity: 0.4,
      transparent: true,
      roughness: 0.08,
      ior: 1.5,
    });
  }, []);

  // 12. Ceramic Coffee Cup & Coffee Liquid
  const ceramicCupMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color("#F6F4EE"),
      roughness: 0.2,
      metalness: 0.05,
    });
  }, []);

  const coffeeLiquidMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color("#26140B"), // Dark roasted espresso
      roughness: 0.1,
      metalness: 0.0,
    });
  }, []);

  // 13. Inner Drawer Plywood & Telescopic Runner
  const innerWoodMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color("#D4BE9E"),
      roughness: 0.55,
      metalness: 0.02,
    });
  }, []);

  const runnerMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color("#B8BFC6"),
      roughness: 0.2,
      metalness: 0.9,
    });
  }, []);

  // Desk Proportions (Image 1)
  const deskLength = 2.15;
  const deskWidth = 0.88;
  const deskHeight = 1.25;
  const topThickness = 0.042;
  const closedDrawerZ = deskWidth / 2 - 0.05; // 0.39m

  useFrame((_, delta) => {
    if (drawerRef.current) {
      const targetZ = closedDrawerZ + drawerOpenOffset * 0.42;
      drawerRef.current.position.z = THREE.MathUtils.lerp(
        drawerRef.current.position.z,
        targetZ,
        0.12
      );
    }
    if (chairRef.current) {
      chairRef.current.rotation.y = THREE.MathUtils.lerp(
        chairRef.current.rotation.y,
        chairRotation,
        0.05
      );
    }
  });

  return (
    <group position={[0, -0.65, 0]}>
      {/* ============================================================== */}
      {/* 1. ROOM ARCHITECTURE (Floor, Walls, Light & Shadows, Image 1)  */}
      {/* ============================================================== */}

      {/* Light Ash-Oak Parquet Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[14, 14]} />
        <primitive object={floorMaterial} attach="material" />
      </mesh>

      {/* Back Wall */}
      <mesh position={[0, 3.5, -2.2]} receiveShadow>
        <planeGeometry args={[14, 7]} />
        <primitive object={wallMaterial} attach="material" />
      </mesh>

      {/* Right Wall */}
      <mesh position={[3.2, 3.5, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[14, 7]} />
        <primitive object={wallMaterial} attach="material" />
      </mesh>

      {/* Baseboard Skirting Trim (Back Wall) */}
      <mesh position={[0, 0.06, -2.18]}>
        <boxGeometry args={[14, 0.12, 0.02]} />
        <primitive object={wallMaterial} attach="material" />
      </mesh>
      {/* Baseboard Skirting Trim (Right Wall) */}
      <mesh position={[3.18, 0.06, 0]}>
        <boxGeometry args={[0.02, 0.12, 14]} />
        <primitive object={wallMaterial} attach="material" />
      </mesh>

      {/* ============================================================== */}
      {/* 2. WALL SHELVES (Back Interlocking Floating Bookshelf)          */}
      {/* ============================================================== */}
      <WallShelves woodMaterial={woodMaterial} />

      {/* ============================================================== */}
      {/* 3. MODERN EXECUTIVE WORKSTATION DESK (Image 1)                 */}
      {/* ============================================================== */}
      <group position={[0.1, 0, 0]}>
        {/* Main Solid Hardwood Desktop */}
        <mesh
          position={[0, deskHeight - topThickness / 2, 0]}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[deskLength, topThickness, deskWidth]} />
          <primitive object={woodMaterial} attach="material" />
        </mesh>

        {/* LEFT LEG: Dynamic Metallic/Matte Square Tube U-Frame */}
        <mesh position={[-deskLength / 2 + 0.06, deskHeight / 2 - 0.02, deskWidth / 2 - 0.06]} castShadow>
          <boxGeometry args={[0.045, deskHeight - 0.04, 0.045]} />
          <primitive object={tableFrameMaterial} attach="material" />
        </mesh>
        <mesh position={[-deskLength / 2 + 0.06, deskHeight / 2 - 0.02, -deskWidth / 2 + 0.06]} castShadow>
          <boxGeometry args={[0.045, deskHeight - 0.04, 0.045]} />
          <primitive object={tableFrameMaterial} attach="material" />
        </mesh>
        <mesh position={[-deskLength / 2 + 0.06, 0.025, 0]} castShadow>
          <boxGeometry args={[0.045, 0.045, deskWidth - 0.12]} />
          <primitive object={tableFrameMaterial} attach="material" />
        </mesh>

        {/* LEFT UNDER-DESK SHALLOW DRAWER (Image 1) */}
        <mesh position={[-deskLength / 2 + 0.32, deskHeight - topThickness - 0.05, 0]} castShadow>
          <boxGeometry args={[0.42, 0.075, deskWidth - 0.16]} />
          <primitive object={woodMaterial} attach="material" />
        </mesh>
        {/* Handle on Left Drawer */}
        <mesh position={[-deskLength / 2 + 0.32, deskHeight - topThickness - 0.05, deskWidth / 2 - 0.07]}>
          <boxGeometry args={[0.14, 0.015, 0.012]} />
          <primitive object={tableFrameMaterial} attach="material" />
        </mesh>

        {/* 4 ARCHITECTURAL CORNER PILLARS OVER PEDESTAL CABINET */}
        {/* These pillars elevate the desktop floatingly above the 4 corners of the cabinet */}
        {[
          [deskLength / 2 - 0.32 - 0.54 / 2 + 0.045, - (deskWidth - 0.1) / 2 + 0.045], // Back Left Corner
          [deskLength / 2 - 0.32 + 0.54 / 2 - 0.045, - (deskWidth - 0.1) / 2 + 0.045], // Back Right Corner
          [deskLength / 2 - 0.32 - 0.54 / 2 + 0.045, (deskWidth - 0.1) / 2 - 0.045],  // Front Left Corner
          [deskLength / 2 - 0.32 + 0.54 / 2 - 0.045, (deskWidth - 0.1) / 2 - 0.045],  // Front Right Corner
        ].map(([px, pz], i) => {
          const pillarHeight = 0.258; // spans from cabinet top (0.95) to desktop underside (1.208)
          const pillarCenterY = 0.95 + pillarHeight / 2; // 1.079
          return (
            <group key={i}>
              {/* Main Solid Metallic Pillar Column */}
              <mesh position={[px, pillarCenterY, pz]} castShadow>
                <cylinderGeometry args={[0.018, 0.018, pillarHeight, 20]} />
                <primitive object={tableFrameMaterial} attach="material" />
              </mesh>
              {/* Top Chrome Mounting Collar */}
              <mesh position={[px, 1.208 - 0.008, pz]} castShadow>
                <cylinderGeometry args={[0.028, 0.028, 0.016, 20]} />
                <primitive object={chromeRiserMaterial} attach="material" />
              </mesh>
              {/* Bottom Chrome Mounting Collar */}
              <mesh position={[px, 0.95 + 0.008, pz]} castShadow>
                <cylinderGeometry args={[0.028, 0.028, 0.016, 20]} />
                <primitive object={chromeRiserMaterial} attach="material" />
              </mesh>
            </group>
          );
        })}

        {/* RIGHT PEDESTAL CABINET (Compactly sized to 3 drawers, eliminating unwanted upper frame space) */}
        {/* Cabinet Shell Body */}
        <mesh
          position={[deskLength / 2 - 0.32, 0.95 / 2, 0]}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[0.54, 0.95, deskWidth - 0.1]} />
          <primitive object={tableFrameMaterial} attach="material" />
        </mesh>
        {/* Cabinet Solid Top Counter Plate */}
        <mesh
          position={[deskLength / 2 - 0.32, 0.95 - 0.008, 0]}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[0.54, 0.016, deskWidth - 0.1]} />
          <primitive object={tableFrameMaterial} attach="material" />
        </mesh>

        {/* 3 DRAWERS (with Matching Wood Grain Fronts & Slim Pull Bars) */}
        {[0, 1, 2].map((idx) => {
          const drawerH = 0.28;
          const yPos = 0.18 + idx * (drawerH + 0.025);
          const isTop = idx === 2; // Top drawer animated

          if (isTop) {
            return (
              <group
                key={idx}
                ref={drawerRef}
                position={[deskLength / 2 - 0.32, yPos, closedDrawerZ]}
              >
                {/* Wood Grain Face Plate */}
                <mesh position={[0, 0, 0.015]} castShadow>
                  <boxGeometry args={[0.5, drawerH, 0.025]} />
                  <primitive object={woodMaterial} attach="material" />
                </mesh>
                {/* Slim Matching Metal Pull Bar Handle */}
                <mesh position={[0, 0.065, 0.035]} castShadow>
                  <boxGeometry args={[0.22, 0.016, 0.018]} />
                  <primitive object={tableFrameMaterial} attach="material" />
                </mesh>

                {/* Hollow Birch Plywood Drawer Box Interior */}
                <mesh position={[0, -drawerH / 2 + 0.015, -0.21]} receiveShadow>
                  <boxGeometry args={[0.46, 0.014, 0.42]} />
                  <primitive object={innerWoodMaterial} attach="material" />
                </mesh>
                <mesh position={[-0.46 / 2 + 0.007, -0.01, -0.21]} castShadow>
                  <boxGeometry args={[0.014, drawerH - 0.045, 0.42]} />
                  <primitive object={innerWoodMaterial} attach="material" />
                </mesh>
                <mesh position={[0.46 / 2 - 0.007, -0.01, -0.21]} castShadow>
                  <boxGeometry args={[0.014, drawerH - 0.045, 0.42]} />
                  <primitive object={innerWoodMaterial} attach="material" />
                </mesh>
                <mesh position={[0, -0.01, -0.42 + 0.007]} castShadow>
                  <boxGeometry args={[0.435, drawerH - 0.045, 0.014]} />
                  <primitive object={innerWoodMaterial} attach="material" />
                </mesh>

                {/* Steel Telescopic Runners on sides */}
                <mesh position={[-0.46 / 2 - 0.008, -0.02, -0.21]}>
                  <boxGeometry args={[0.008, 0.032, 0.42]} />
                  <primitive object={runnerMaterial} attach="material" />
                </mesh>
                <mesh position={[0.46 / 2 + 0.008, -0.02, -0.21]}>
                  <boxGeometry args={[0.008, 0.032, 0.42]} />
                  <primitive object={runnerMaterial} attach="material" />
                </mesh>
              </group>
            );
          }

          // Drawers 0 and 1
          return (
            <group
              key={idx}
              position={[deskLength / 2 - 0.32, yPos, closedDrawerZ]}
            >
              <mesh position={[0, 0, 0.015]} castShadow>
                <boxGeometry args={[0.5, drawerH, 0.025]} />
                <primitive object={woodMaterial} attach="material" />
              </mesh>
              <mesh position={[0, 0.065, 0.035]} castShadow>
                <boxGeometry args={[0.22, 0.016, 0.018]} />
                <primitive object={tableFrameMaterial} attach="material" />
              </mesh>
            </group>
          );
        })}
      </group>

      {/* ============================================================== */}
      {/* 5. APPLE TECH HARDWARE & ENGINEER WORKSPACE (Image 1)          */}
      {/* ============================================================== */}
      <group position={[0.05, deskHeight, 0]}>
        {/* Large Charcoal Felt/Leather Desk Mat */}
        <mesh position={[0, 0.003, 0.06]} receiveShadow>
          <boxGeometry args={[0.96, 0.005, 0.44]} />
          <meshStandardMaterial color="#222426" roughness={0.9} />
        </mesh>

        {/* APPLE STUDIO DISPLAY (Centered, Image 1) */}
        <group position={[0, 0, -0.18]}>
          {/* Aluminum Stand Base */}
          <mesh position={[0, 0.008, 0]} castShadow>
            <boxGeometry args={[0.24, 0.008, 0.18]} />
            <primitive object={appleAluminumMaterial} attach="material" />
          </mesh>
          {/* Stand Stem */}
          <mesh position={[0, 0.16, -0.04]} castShadow>
            <boxGeometry args={[0.07, 0.32, 0.02]} />
            <primitive object={appleAluminumMaterial} attach="material" />
          </mesh>
          {/* Outer Unibody Enclosure */}
          <mesh position={[0, 0.34, -0.02]} castShadow>
            <boxGeometry args={[0.92, 0.52, 0.025]} />
            <primitive object={appleAluminumMaterial} attach="material" />
          </mesh>
          {/* Retina Screen with 10:39 Clock or VS Code */}
          <mesh position={[0, 0.34, -0.006]}>
            <planeGeometry args={[0.88, 0.48]} />
            <primitive object={monitorScreenMaterial} attach="material" />
          </mesh>
        </group>

        {/* APPLE MAC MINI (Positioned beside monitor stand) */}
        <group position={[-0.42, 0.018, -0.22]}>
          <mesh castShadow>
            <boxGeometry args={[0.18, 0.034, 0.18]} />
            <primitive object={appleAluminumMaterial} attach="material" />
          </mesh>
          {/* Top Apple Logo badge */}
          <mesh position={[0, 0.018, 0]}>
            <boxGeometry args={[0.04, 0.001, 0.04]} />
            <meshStandardMaterial color="#111111" roughness={0.15} metalness={0.9} />
          </mesh>
          {/* Front tiny white power LED */}
          <mesh position={[0.07, 0, 0.091]}>
            <sphereGeometry args={[0.002, 8, 8]} />
            <meshStandardMaterial color="#FFFFFF" emissive="#FFFFFF" emissiveIntensity={1.5} />
          </mesh>
        </group>

        {/* APPLE MAGIC KEYBOARD (Ultra-Realistic with Individual Keycaps) */}
        <group position={[0, 0.008, 0.12]}>
          {/* Aluminum Wedge Base */}
          <mesh castShadow>
            <boxGeometry args={[0.36, 0.01, 0.125]} />
            <primitive object={appleAluminumMaterial} attach="material" />
          </mesh>
          {/* Recessed Key Bed */}
          <mesh position={[0, 0.006, 0]}>
            <boxGeometry args={[0.345, 0.002, 0.11]} />
            <meshStandardMaterial color="#2B2D30" roughness={0.6} />
          </mesh>
          {/* Individual Chiclet Keycaps Rows */}
          {/* Top Row: Function Keys (12 keys) */}
          {Array.from({ length: 12 }).map((_, k) => (
            <mesh key={`f-${k}`} position={[-0.15 + k * 0.027, 0.008, -0.042]}>
              <boxGeometry args={[0.022, 0.004, 0.014]} />
              <primitive object={appleKeycapMaterial} attach="material" />
            </mesh>
          ))}
          {/* Row 2: Numbers (13 keys) */}
          {Array.from({ length: 13 }).map((_, k) => (
            <mesh key={`num-${k}`} position={[-0.155 + k * 0.0255, 0.008, -0.024]}>
              <boxGeometry args={[0.021, 0.004, 0.016]} />
              <primitive object={appleKeycapMaterial} attach="material" />
            </mesh>
          ))}
          {/* Row 3: QWERTY Row (13 keys) */}
          {Array.from({ length: 13 }).map((_, k) => (
            <mesh key={`qwerty-${k}`} position={[-0.152 + k * 0.0255, 0.008, -0.005]}>
              <boxGeometry args={[0.021, 0.004, 0.016]} />
              <primitive object={appleKeycapMaterial} attach="material" />
            </mesh>
          ))}
          {/* Row 4: ASDF Row (12 keys) */}
          {Array.from({ length: 12 }).map((_, k) => (
            <mesh key={`asdf-${k}`} position={[-0.142 + k * 0.0255, 0.008, 0.014]}>
              <boxGeometry args={[0.021, 0.004, 0.016]} />
              <primitive object={appleKeycapMaterial} attach="material" />
            </mesh>
          ))}
          {/* Bottom Row: Spacebar and Modifiers */}
          <mesh position={[-0.14, 0.008, 0.034]}>
            <boxGeometry args={[0.028, 0.004, 0.016]} />
            <primitive object={appleKeycapMaterial} attach="material" />
          </mesh>
          <mesh position={[-0.105, 0.008, 0.034]}>
            <boxGeometry args={[0.028, 0.004, 0.016]} />
            <primitive object={appleKeycapMaterial} attach="material" />
          </mesh>
          {/* Spacebar */}
          <mesh position={[0, 0.008, 0.034]}>
            <boxGeometry args={[0.13, 0.004, 0.016]} />
            <primitive object={appleKeycapMaterial} attach="material" />
          </mesh>
          <mesh position={[0.105, 0.008, 0.034]}>
            <boxGeometry args={[0.028, 0.004, 0.016]} />
            <primitive object={appleKeycapMaterial} attach="material" />
          </mesh>
          <mesh position={[0.14, 0.008, 0.034]}>
            <boxGeometry args={[0.028, 0.004, 0.016]} />
            <primitive object={appleKeycapMaterial} attach="material" />
          </mesh>
        </group>

        {/* APPLE MAGIC MOUSE (Curved glass/polycarbonate top) */}
        <group position={[0.28, 0.01, 0.13]}>
          <mesh castShadow>
            <boxGeometry args={[0.065, 0.018, 0.115]} />
            <primitive object={magicMouseMaterial} attach="material" />
          </mesh>
          <mesh position={[0, -0.008, 0]}>
            <boxGeometry args={[0.058, 0.004, 0.105]} />
            <primitive object={appleAluminumMaterial} attach="material" />
          </mesh>
        </group>

        {/* CLEAR GLASS WATER CARAFE & TUMBLER (Left side of desk, Image 1) */}
        <group position={[-0.48, 0, 0.08]}>
          <mesh position={[0, 0.09, 0]} castShadow>
            <cylinderGeometry args={[0.045, 0.055, 0.18, 16]} />
            <primitive object={clearGlassMaterial} attach="material" />
          </mesh>
          <mesh position={[0, 0.07, 0]}>
            <cylinderGeometry args={[0.042, 0.05, 0.14, 16]} />
            <meshPhysicalMaterial color="#EBF4FA" transmission={0.95} transparent opacity={0.5} roughness={0.05} />
          </mesh>
        </group>

        {/* CERAMIC COFFEE CUP WITH REAL COFFEE & BILLOWING HOT STEAM/FOG! */}
        <group position={[0.42, 0, 0.02]}>
          {/* Ceramic Cup Body */}
          <mesh position={[0, 0.045, 0]} castShadow>
            <cylinderGeometry args={[0.044, 0.036, 0.08, 20]} />
            <primitive object={ceramicCupMaterial} attach="material" />
          </mesh>
          {/* Coffee Liquid inside cup */}
          <mesh position={[0, 0.076, 0]}>
            <cylinderGeometry args={[0.041, 0.041, 0.004, 18]} />
            <primitive object={coffeeLiquidMaterial} attach="material" />
          </mesh>
          {/* Cup Handle */}
          <mesh position={[0.05, 0.045, 0]} rotation={[0, 0, Math.PI / 2]}>
            <torusGeometry args={[0.02, 0.006, 8, 16]} />
            <primitive object={ceramicCupMaterial} attach="material" />
          </mesh>

          {/* REALISTIC HOT STEAM / FOG BILLOWING UPWARDS FROM COFFEE! */}
          <CoffeeSteam position={[0, 0.08, 0]} />
        </group>
      </group>

      {/* ============================================================== */}
      {/* 5. MODERN ERGONOMIC MESH EXECUTIVE CHAIR (Smooth Contoured Radius) */}
      {/* ============================================================== */}
      <group ref={chairRef} position={[0.05, 0, 0.82]}>
        {/* 5-Star Arched Steel Base with Dual-Wheel Polyurethane Casters */}
        {[0, 1, 2, 3, 4].map((i) => {
          const angle = (i * Math.PI * 2) / 5;
          return (
            <group key={i} rotation={[0, angle, 0]}>
              {/* Arched Streamlined Leg Bar */}
              <mesh position={[0, 0.052, 0.17]} rotation={[-0.12, 0, 0]} castShadow>
                <boxGeometry args={[0.032, 0.018, 0.32]} />
                <primitive object={chairFrameMaterial} attach="material" />
              </mesh>
              {/* Caster Socket Knuckle */}
              <mesh position={[0, 0.035, 0.32]}>
                <cylinderGeometry args={[0.015, 0.015, 0.025, 12]} />
                <primitive object={chairFrameMaterial} attach="material" />
              </mesh>
              {/* Twin Dual Wheels */}
              <mesh position={[-0.015, 0.022, 0.32]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.022, 0.022, 0.012, 16]} />
                <meshStandardMaterial color="#111111" roughness={0.35} />
              </mesh>
              <mesh position={[0.015, 0.022, 0.32]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.022, 0.022, 0.012, 16]} />
                <meshStandardMaterial color="#111111" roughness={0.35} />
              </mesh>
            </group>
          );
        })}

        {/* Central Hydraulic Piston with Chrome Sleeve */}
        <mesh position={[0, 0.16, 0]} castShadow>
          <cylinderGeometry args={[0.026, 0.03, 0.22, 20]} />
          <meshStandardMaterial color="#141516" roughness={0.4} metalness={0.7} />
        </mesh>
        <mesh position={[0, 0.28, 0]} castShadow>
          <cylinderGeometry args={[0.022, 0.022, 0.16, 20]} />
          <primitive object={chromeRiserMaterial} attach="material" />
        </mesh>

        {/* Under-Seat Cast Tilt Mechanism Box */}
        <group position={[0, 0.37, 0]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.24, 0.05, 0.22]} />
            <primitive object={chairFrameMaterial} attach="material" />
          </mesh>
          {/* Tension Adjustment Knob */}
          <mesh position={[0, -0.04, 0.04]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.025, 0.025, 0.05, 16]} />
            <primitive object={chairFrameMaterial} attach="material" />
          </mesh>
          {/* Height Adjustment Paddle Lever */}
          <mesh position={[0.13, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.006, 0.006, 0.1, 12]} />
            <primitive object={chromeRiserMaterial} attach="material" />
          </mesh>
          <mesh position={[0.18, 0, 0]}>
            <sphereGeometry args={[0.012, 10, 10]} />
            <primitive object={chairFrameMaterial} attach="material" />
          </mesh>
        </group>

        {/* Ergonomic Contoured Seat Cushion (Soft Waterfall Radius Edges) */}
        <mesh
          geometry={chairSeatGeometry}
          position={[0, 0.445, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          castShadow
          receiveShadow
        >
          <primitive object={chairMeshMaterial} attach="material" />
        </mesh>

        {/* Ergonomic S-Curve Contoured Backrest with Rounded Shoulders */}
        <group position={[0, 0.82, -0.22]} rotation={[-0.07, 0, 0]}>
          {/* Outer Curved Aerodynamic Frame */}
          <mesh geometry={chairBackrestFrameGeometry} castShadow>
            <primitive object={chairFrameMaterial} attach="material" />
          </mesh>

          {/* Inner Breathable Mesh Panel */}
          <mesh geometry={chairBackrestMeshGeometry} position={[0, 0, 0.012]}>
            <primitive object={chairMeshMaterial} attach="material" />
          </mesh>

          {/* Contoured Cylindrical Lumbar Support Pillow */}
          <group position={[0, -0.1, 0.024]}>
            <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
              <cylinderGeometry args={[0.024, 0.024, 0.34, 18]} />
              <primitive object={chairFrameMaterial} attach="material" />
            </mesh>
            <mesh position={[-0.17, 0, 0]}>
              <sphereGeometry args={[0.024, 12, 12]} />
              <primitive object={chairFrameMaterial} attach="material" />
            </mesh>
            <mesh position={[0.17, 0, 0]}>
              <sphereGeometry args={[0.024, 12, 12]} />
              <primitive object={chairFrameMaterial} attach="material" />
            </mesh>
          </group>

          {/* Rear Aerodynamic Y-Spine Support Uprights */}
          <mesh position={[-0.1, -0.2, -0.04]} rotation={[0.2, 0.1, 0]} castShadow>
            <boxGeometry args={[0.022, 0.32, 0.024]} />
            <primitive object={chairFrameMaterial} attach="material" />
          </mesh>
          <mesh position={[0.1, -0.2, -0.04]} rotation={[0.2, -0.1, 0]} castShadow>
            <boxGeometry args={[0.022, 0.32, 0.024]} />
            <primitive object={chairFrameMaterial} attach="material" />
          </mesh>

          {/* Executive Ergonomic Neck/Headrest Cushion with Soft Radius */}
          <group position={[0, 0.42, 0.02]} rotation={[-0.08, 0, 0]}>
            {/* Chrome Support Struts */}
            <mesh position={[-0.05, -0.06, -0.02]} rotation={[0.2, 0, 0]}>
              <cylinderGeometry args={[0.006, 0.006, 0.12, 12]} />
              <primitive object={chromeRiserMaterial} attach="material" />
            </mesh>
            <mesh position={[0.05, -0.06, -0.02]} rotation={[0.2, 0, 0]}>
              <cylinderGeometry args={[0.006, 0.006, 0.12, 12]} />
              <primitive object={chromeRiserMaterial} attach="material" />
            </mesh>
            {/* Pillowed Headrest Pad with Soft Radius Capsule */}
            <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
              <capsuleGeometry args={[0.04, 0.22, 10, 16]} />
              <primitive object={chairMeshMaterial} attach="material" />
            </mesh>
          </group>
        </group>

        {/* Ergonomic 3D Armrests with Smooth Capsule Pads & Tubular Uprights */}
        {/* Left Armrest */}
        <group position={[-0.29, 0.58, 0]}>
          {/* Tubular Upright */}
          <mesh position={[0, 0.02, 0]} rotation={[0, 0, -0.05]} castShadow>
            <cylinderGeometry args={[0.015, 0.018, 0.22, 16]} />
            <primitive object={chairFrameMaterial} attach="material" />
          </mesh>
          {/* Smooth Radius Capsule Armrest Pad */}
          <mesh position={[0, 0.14, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
            <capsuleGeometry args={[0.033, 0.21, 10, 16]} />
            <primitive object={chairFrameMaterial} attach="material" />
          </mesh>
        </group>

        {/* Right Armrest */}
        <group position={[0.29, 0.58, 0]}>
          {/* Tubular Upright */}
          <mesh position={[0, 0.02, 0]} rotation={[0, 0, 0.05]} castShadow>
            <cylinderGeometry args={[0.015, 0.018, 0.22, 16]} />
            <primitive object={chairFrameMaterial} attach="material" />
          </mesh>
          {/* Smooth Radius Capsule Armrest Pad */}
          <mesh position={[0, 0.14, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
            <capsuleGeometry args={[0.033, 0.21, 10, 16]} />
            <primitive object={chairFrameMaterial} attach="material" />
          </mesh>
        </group>
      </group>
    </group>
  );
}
