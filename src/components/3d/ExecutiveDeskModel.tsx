"use client";

import React, { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

interface DeskProps {
  woodColor?: string;
  frameColor?: string;
  drawerOpenOffset?: number; // 0 to 1
  isRotating?: boolean;
}

export function ExecutiveDeskModel({
  woodColor = "#A87C4F",
  frameColor = "#1A1A1A",
  drawerOpenOffset = 0,
  isRotating = false,
}: DeskProps) {
  const groupRef = useRef<THREE.Group>(null);
  const drawerRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (isRotating && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.25;
    }
    if (drawerRef.current) {
      // Smoothly interpolate drawer slide (Z-axis forward)
      const targetZ = drawerOpenOffset * 0.45;
      drawerRef.current.position.z = THREE.MathUtils.lerp(
        drawerRef.current.position.z,
        targetZ,
        0.1
      );
    }
  });

  // Dimensions scaled: 5ft length (X=2.5), 2ft width (Z=1.0), 2.5ft height (Y=1.25)
  // Tabletop thickness: ~25mm -> 0.04
  const topLength = 2.4;
  const topWidth = 1.0;
  const topThickness = 0.045;
  const deskHeight = 1.25;
  const legThickness = 0.04;

  const woodMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color(woodColor),
    roughness: 0.35,
    metalness: 0.05,
  });

  const frameMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color(frameColor),
    roughness: 0.85,
    metalness: 0.2,
  });

  const handleMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#0A0A0A"),
    roughness: 0.3,
    metalness: 0.8,
  });

  return (
    <group ref={groupRef} position={[0, -0.6, 0]}>
      {/* 1. TABLE TOP */}
      <mesh
        position={[0, deskHeight - topThickness / 2, 0]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[topLength, topThickness, topWidth]} />
        <primitive object={woodMaterial} attach="material" />
      </mesh>

      {/* Tabletop Under-frame perimeter */}
      <mesh position={[0, deskHeight - topThickness - 0.015, topWidth / 2 - legThickness / 2]} castShadow>
        <boxGeometry args={[topLength - 0.02, 0.03, legThickness]} />
        <primitive object={frameMaterial} attach="material" />
      </mesh>
      <mesh position={[0, deskHeight - topThickness - 0.015, -topWidth / 2 + legThickness / 2]} castShadow>
        <boxGeometry args={[topLength - 0.02, 0.03, legThickness]} />
        <primitive object={frameMaterial} attach="material" />
      </mesh>

      {/* 2. METAL FRAME LEGS (Left Side - Open Leg structure) */}
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

      {/* Four Drawers Faces */}
      {[0, 1, 2, 3].map((idx) => {
        const drawerHeight = 0.25;
        const yPos = 0.16 + idx * (drawerHeight + 0.02);
        const isTopDrawer = idx === 3;

        if (isTopDrawer) {
          // Top animated drawer
          return (
            <group
              key={idx}
              ref={drawerRef}
              position={[topLength / 2 - 0.35, yPos, topWidth / 2 - 0.05]}
            >
              {/* Drawer Face Plate (Natural wood matching top) */}
              <mesh position={[0, 0, 0.015]} castShadow>
                <boxGeometry args={[0.58, drawerHeight, 0.025]} />
                <primitive object={woodMaterial} attach="material" />
              </mesh>
              {/* Profile Handle */}
              <mesh position={[0, 0.08, 0.035]} castShadow>
                <boxGeometry args={[0.22, 0.018, 0.02]} />
                <primitive object={handleMaterial} attach="material" />
              </mesh>
              {/* Inner Drawer Box Sides */}
              <mesh position={[0, -0.02, -0.22]}>
                <boxGeometry args={[0.54, drawerHeight - 0.04, 0.44]} />
                <meshStandardMaterial color="#3E3832" roughness={0.7} />
              </mesh>
            </group>
          );
        }

        return (
          <group
            key={idx}
            position={[topLength / 2 - 0.35, yPos, topWidth / 2 - 0.05]}
          >
            {/* Drawer Face Plate */}
            <mesh position={[0, 0, 0.015]} castShadow>
              <boxGeometry args={[0.58, drawerHeight, 0.025]} />
              <primitive object={woodMaterial} attach="material" />
            </mesh>
            {/* Profile Handle */}
            <mesh position={[0, 0.08, 0.035]} castShadow>
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
