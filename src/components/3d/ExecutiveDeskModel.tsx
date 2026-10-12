"use client";

import React, { useRef, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { WoodSpecies, getWoodMaterialConfig } from "@/lib/woodTextures";

interface DeskProps {
  woodColor?: string;
  woodSpecies?: WoodSpecies;
  frameColor?: string;
  drawerOpenOffset?: number; // 0 to 1
  isRotating?: boolean;
}

export function ExecutiveDeskModel({
  woodColor = "#B8864E",
  woodSpecies,
  frameColor = "#B4BCC6",
  drawerOpenOffset = 0,
  isRotating = false,
}: DeskProps) {
  const groupRef = useRef<THREE.Group>(null);
  const drawerRef = useRef<THREE.Group>(null);

  // Desk Architectural Proportions
  // Scaled: 5ft length (X=2.4), 2ft width (Z=1.0), 2.5ft height (Y=1.25)
  const topLength = 2.4;
  const topWidth = 1.0;
  const topThickness = 0.045;
  const deskHeight = 1.25;
  const legThickness = 0.04;

  const closedZ = topWidth / 2 - 0.05; // 0.45m (cabinet front face)
  const slideExtension = 0.40; // 40cm smooth forward glide

  // Resolve Wood Material with real grain texture and depth mapping
  const woodConfig = useMemo(() => {
    let resolvedSpecies: WoodSpecies = "teak";
    if (woodSpecies) {
      resolvedSpecies = woodSpecies;
    } else if (woodColor) {
      const lower = woodColor.toLowerCase();
      if (lower.includes("533b2b") || lower.includes("523626") || lower.includes("walnut")) {
        resolvedSpecies = "walnut";
      } else if (lower.includes("cbb393") || lower.includes("d4be9e") || lower.includes("oak")) {
        resolvedSpecies = "oak";
      } else if (lower.includes("7a3e26") || lower.includes("8a3e22") || lower.includes("sheesham")) {
        resolvedSpecies = "sheesham";
      }
    }
    return getWoodMaterialConfig(resolvedSpecies);
  }, [woodSpecies, woodColor]);

  // High-fidelity wood material with realistic grain diffuse map + bump normal depth
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

  // Metal structural framework material (powder coated MS square tube)
  const frameMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color(frameColor),
      roughness: 0.85,
      metalness: 0.25,
    });
  }, [frameColor]);

  // Drawer edge profile handle material
  const handleMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color("#0D0D0D"),
      roughness: 0.25,
      metalness: 0.85,
    });
  }, []);

  // Natural Birch Plywood interior for drawer box
  const innerWoodMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color("#D4BE9E"),
      roughness: 0.55,
      metalness: 0.02,
    });
  }, []);

  // Telescopic metallic channel runners (chrome/zinc plated steel)
  const runnerMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color("#B8BFC6"),
      roughness: 0.2,
      metalness: 0.9,
    });
  }, []);

  // Executive felt lining pad inside the drawer
  const feltMatMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color("#1E1C1A"),
      roughness: 0.92,
      metalness: 0.0,
    });
  }, []);

  useFrame((_, delta) => {
    if (isRotating && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.25;
    }
    if (drawerRef.current) {
      // Smoothly interpolate drawer slide (Z-axis forward from closedZ)
      const targetZ = closedZ + drawerOpenOffset * slideExtension;
      drawerRef.current.position.z = THREE.MathUtils.lerp(
        drawerRef.current.position.z,
        targetZ,
        0.12
      );
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.6, 0]}>
      {/* 1. TABLE TOP (Real Wood Texture with directional grain) */}
      <mesh
        position={[0, deskHeight - topThickness / 2, 0]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[topLength, topThickness, topWidth]} />
        <primitive object={woodMaterial} attach="material" />
      </mesh>

      {/* Tabletop Under-frame perimeter bracing */}
      <mesh position={[0, deskHeight - topThickness - 0.015, topWidth / 2 - legThickness / 2]} castShadow>
        <boxGeometry args={[topLength - 0.02, 0.03, legThickness]} />
        <primitive object={frameMaterial} attach="material" />
      </mesh>
      <mesh position={[0, deskHeight - topThickness - 0.015, -topWidth / 2 + legThickness / 2]} castShadow>
        <boxGeometry args={[topLength - 0.02, 0.03, legThickness]} />
        <primitive object={frameMaterial} attach="material" />
      </mesh>

      {/* 2. METAL FRAME LEGS (Left Side - Open Architectural Leg Structure) */}
      {/* Front Left Leg */}
      <mesh
        position={[-topLength / 2 + legThickness / 2 + 0.05, deskHeight / 2 - 0.02, topWidth / 2 - legThickness / 2 - 0.05]}
        castShadow
      >
        <boxGeometry args={[legThickness, deskHeight - 0.04, legThickness]} />
        <primitive object={frameMaterial} attach="material" />
      </mesh>
      {/* Back Left Leg */}
      <mesh
        position={[-topLength / 2 + legThickness / 2 + 0.05, deskHeight / 2 - 0.02, -topWidth / 2 + legThickness / 2 + 0.05]}
        castShadow
      >
        <boxGeometry args={[legThickness, deskHeight - 0.04, legThickness]} />
        <primitive object={frameMaterial} attach="material" />
      </mesh>
      {/* Left Bottom Base Cross-bar */}
      <mesh
        position={[-topLength / 2 + legThickness / 2 + 0.05, 0.03, 0]}
        castShadow
      >
        <boxGeometry args={[legThickness, legThickness, topWidth - 0.1]} />
        <primitive object={frameMaterial} attach="material" />
      </mesh>
      {/* Left Top Cross-bar */}
      <mesh
        position={[-topLength / 2 + legThickness / 2 + 0.05, deskHeight - topThickness - 0.03, 0]}
        castShadow
      >
        <boxGeometry args={[legThickness, legThickness, topWidth - 0.1]} />
        <primitive object={frameMaterial} attach="material" />
      </mesh>

      {/* 3. SIGNATURE X-BRACE SUPPORT (On Left / Back Side) */}
      <group position={[-0.45, (deskHeight - 0.05) / 2, -topWidth / 2 + 0.06]} rotation={[0, 0, 0.58]}>
        <mesh castShadow>
          <boxGeometry args={[0.025, 1.35, 0.015]} />
          <primitive object={frameMaterial} attach="material" />
        </mesh>
      </group>
      <group position={[-0.45, (deskHeight - 0.05) / 2, -topWidth / 2 + 0.06]} rotation={[0, 0, -0.58]}>
        <mesh castShadow>
          <boxGeometry args={[0.025, 1.35, 0.015]} />
          <primitive object={frameMaterial} attach="material" />
        </mesh>
      </group>

      {/* 4. RIGHT PEDESTAL CABINET & 4-DRAWER SYSTEM */}
      {/* Pedestal Box Outer Shell (Right side) */}
      <mesh
        position={[topLength / 2 - 0.35, (deskHeight - 0.05) / 2, 0]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[0.62, deskHeight - 0.06, topWidth - 0.1]} />
        <primitive object={frameMaterial} attach="material" />
      </mesh>

      {/* Four Drawers Faces (Wood Grain Match) */}
      {[0, 1, 2, 3].map((idx) => {
        const drawerHeight = 0.25;
        const yPos = 0.16 + idx * (drawerHeight + 0.02);
        const isTopDrawer = idx === 3;

        if (isTopDrawer) {
          // Top Animated Drawer with interior box & telescopic runners
          return (
            <group
              key={idx}
              ref={drawerRef}
              position={[topLength / 2 - 0.35, yPos, closedZ]}
            >
              {/* Drawer Face Plate (Matching Tabletop Real Wood Grain) */}
              <mesh position={[0, 0, 0.015]} castShadow>
                <boxGeometry args={[0.58, drawerHeight, 0.025]} />
                <primitive object={woodMaterial} attach="material" />
              </mesh>
              {/* Profile Handle */}
              <mesh position={[0, 0.075, 0.035]} castShadow>
                <boxGeometry args={[0.22, 0.018, 0.02]} />
                <primitive object={handleMaterial} attach="material" />
              </mesh>

              {/* Realistic Inner Drawer Box */}
              {/* Bottom Base */}
              <mesh position={[0, -drawerHeight / 2 + 0.015, -0.21]} receiveShadow>
                <boxGeometry args={[0.52, 0.014, 0.42]} />
                <primitive object={innerWoodMaterial} attach="material" />
              </mesh>
              {/* Inner Velvet/Felt Liner */}
              <mesh position={[0, -drawerHeight / 2 + 0.024, -0.21]}>
                <boxGeometry args={[0.51, 0.004, 0.41]} />
                <primitive object={feltMatMaterial} attach="material" />
              </mesh>
              {/* Left Plywood Side Wall */}
              <mesh position={[-0.52 / 2 + 0.007, -0.01, -0.21]} castShadow receiveShadow>
                <boxGeometry args={[0.014, drawerHeight - 0.045, 0.42]} />
                <primitive object={innerWoodMaterial} attach="material" />
              </mesh>
              {/* Right Plywood Side Wall */}
              <mesh position={[0.52 / 2 - 0.007, -0.01, -0.21]} castShadow receiveShadow>
                <boxGeometry args={[0.014, drawerHeight - 0.045, 0.42]} />
                <primitive object={innerWoodMaterial} attach="material" />
              </mesh>
              {/* Rear Plywood Back Wall */}
              <mesh position={[0, -0.01, -0.42 + 0.007]} castShadow receiveShadow>
                <boxGeometry args={[0.495, drawerHeight - 0.045, 0.014]} />
                <primitive object={innerWoodMaterial} attach="material" />
              </mesh>
              {/* Minimalist Divider Slat */}
              <mesh position={[0, -drawerHeight / 2 + 0.045, -0.16]}>
                <boxGeometry args={[0.49, 0.045, 0.008]} />
                <primitive object={innerWoodMaterial} attach="material" />
              </mesh>

              {/* Heavy-Duty Steel Telescopic Side Runners */}
              <mesh position={[-0.52 / 2 - 0.008, -0.02, -0.21]}>
                <boxGeometry args={[0.008, 0.034, 0.42]} />
                <primitive object={runnerMaterial} attach="material" />
              </mesh>
              <mesh position={[0.52 / 2 + 0.008, -0.02, -0.21]}>
                <boxGeometry args={[0.008, 0.034, 0.42]} />
                <primitive object={runnerMaterial} attach="material" />
              </mesh>
            </group>
          );
        }

        // Drawers 0, 1, 2 (Lower drawers)
        return (
          <group
            key={idx}
            position={[topLength / 2 - 0.35, yPos, closedZ]}
          >
            {/* Drawer Face Plate */}
            <mesh position={[0, 0, 0.015]} castShadow>
              <boxGeometry args={[0.58, drawerHeight, 0.025]} />
              <primitive object={woodMaterial} attach="material" />
            </mesh>
            {/* Profile Handle */}
            <mesh position={[0, 0.075, 0.035]} castShadow>
              <boxGeometry args={[0.22, 0.018, 0.02]} />
              <primitive object={handleMaterial} attach="material" />
            </mesh>
          </group>
        );
      })}

      {/* Right End Frame Outline */}
      <mesh
        position={[topLength / 2 - 0.03, deskHeight / 2 - 0.02, topWidth / 2 - 0.05]}
        castShadow
      >
        <boxGeometry args={[legThickness, deskHeight - 0.04, legThickness]} />
        <primitive object={frameMaterial} attach="material" />
      </mesh>
      <mesh
        position={[topLength / 2 - 0.03, deskHeight / 2 - 0.02, -topWidth / 2 + 0.05]}
        castShadow
      >
        <boxGeometry args={[legThickness, deskHeight - 0.04, legThickness]} />
        <primitive object={frameMaterial} attach="material" />
      </mesh>

      {/* Rear Modesty / Stretcher Beam */}
      <mesh
        position={[-0.45, deskHeight - topThickness - 0.06, -topWidth / 2 + 0.06]}
        castShadow
      >
        <boxGeometry args={[1.25, 0.04, 0.02]} />
        <primitive object={frameMaterial} attach="material" />
      </mesh>
    </group>
  );
}
