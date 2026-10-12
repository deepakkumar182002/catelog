"use client";

import React, { useMemo } from "react";
import * as THREE from "three";

interface PlantStandProps {
  position?: [number, number, number];
  woodMaterial: THREE.Material;
}

export function PlantStand({ position = [-2.2, 0, -0.6], woodMaterial }: PlantStandProps) {
  // Materials for pots and plants
  const ceramicWhiteMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#F4F1EA"),
        roughness: 0.25,
        metalness: 0.05,
      }),
    []
  );

  const ceramicDarkMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#2E3033"),
        roughness: 0.35,
        metalness: 0.1,
      }),
    []
  );

  const ceramicTerracottaMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#C26D45"),
        roughness: 0.65,
        metalness: 0.02,
      }),
    []
  );

  const leafGreenMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#3E7E45"),
        roughness: 0.5,
        metalness: 0.02,
        side: THREE.DoubleSide,
      }),
    []
  );

  const leafBrightGreenMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#55A35C"),
        roughness: 0.45,
        metalness: 0.02,
        side: THREE.DoubleSide,
      }),
    []
  );

  const leafDeepGreenMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#275A30"),
        roughness: 0.55,
        metalness: 0.02,
        side: THREE.DoubleSide,
      }),
    []
  );

  const ledLightMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#FFF6E5"),
        emissive: new THREE.Color("#FFD994"),
        emissiveIntensity: 2.2,
        roughness: 0.2,
      }),
    []
  );

  // Stand dimensions (matching Image 2)
  const shelfWidth = 0.52;
  const shelfDepth = 0.48;
  const shelfThick = 0.038;
  const postThick = 0.045;

  return (
    <group position={position}>
      {/* 4 Feet on Floor */}
      {[
        [-shelfWidth / 2 + 0.05, -shelfDepth / 2 + 0.05],
        [shelfWidth / 2 - 0.05, -shelfDepth / 2 + 0.05],
        [-shelfWidth / 2 + 0.05, shelfDepth / 2 - 0.05],
        [shelfWidth / 2 - 0.05, shelfDepth / 2 - 0.05],
      ].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.02, z]} castShadow>
          <boxGeometry args={[0.055, 0.04, 0.055]} />
          <primitive object={woodMaterial} attach="material" />
        </mesh>
      ))}

      {/* TIER 1: Bottom Base Shelf */}
      <mesh position={[0, 0.05, 0]} castShadow receiveShadow>
        <boxGeometry args={[shelfWidth, shelfThick, shelfDepth]} />
        <primitive object={woodMaterial} attach="material" />
      </mesh>

      {/* Vertical Posts (Tier 1 to Tier 2) */}
      <mesh position={[-shelfWidth / 2 + postThick / 2 + 0.04, 0.32, 0]} castShadow>
        <boxGeometry args={[postThick, 0.52, postThick]} />
        <primitive object={woodMaterial} attach="material" />
      </mesh>
      <mesh position={[shelfWidth / 2 - postThick / 2 - 0.04, 0.32, -shelfDepth / 4]} castShadow>
        <boxGeometry args={[postThick, 0.52, postThick]} />
        <primitive object={woodMaterial} attach="material" />
      </mesh>

      {/* TIER 2: Middle-Lower Shelf */}
      <mesh position={[0, 0.6, 0]} castShadow receiveShadow>
        <boxGeometry args={[shelfWidth, shelfThick, shelfDepth]} />
        <primitive object={woodMaterial} attach="material" />
      </mesh>
      {/* Under-shelf LED light strip */}
      <mesh position={[0, 0.578, 0]}>
        <boxGeometry args={[shelfWidth - 0.08, 0.008, 0.025]} />
        <primitive object={ledLightMaterial} attach="material" />
      </mesh>
      <pointLight position={[0, 0.55, 0]} color="#FFD994" intensity={0.7} distance={1.2} decay={2} />

      {/* Vertical Posts (Tier 2 to Tier 3) */}
      <mesh position={[-shelfWidth / 2 + postThick / 2 + 0.04, 0.88, shelfDepth / 4]} castShadow>
        <boxGeometry args={[postThick, 0.52, postThick]} />
        <primitive object={woodMaterial} attach="material" />
      </mesh>
      <mesh position={[shelfWidth / 2 - postThick / 2 - 0.04, 0.88, 0]} castShadow>
        <boxGeometry args={[postThick, 0.52, postThick]} />
        <primitive object={woodMaterial} attach="material" />
      </mesh>

      {/* TIER 3: Middle-Upper Shelf */}
      <mesh position={[0, 1.16, 0]} castShadow receiveShadow>
        <boxGeometry args={[shelfWidth, shelfThick, shelfDepth]} />
        <primitive object={woodMaterial} attach="material" />
      </mesh>
      {/* Under-shelf LED light strip */}
      <mesh position={[0, 1.138, 0]}>
        <boxGeometry args={[shelfWidth - 0.08, 0.008, 0.025]} />
        <primitive object={ledLightMaterial} attach="material" />
      </mesh>
      <pointLight position={[0, 1.11, 0]} color="#FFD994" intensity={0.8} distance={1.4} decay={2} />

      {/* Vertical Posts (Tier 3 to Tier 4) */}
      <mesh position={[-shelfWidth / 2 + postThick / 2 + 0.04, 1.42, 0]} castShadow>
        <boxGeometry args={[postThick, 0.48, postThick]} />
        <primitive object={woodMaterial} attach="material" />
      </mesh>
      <mesh position={[0, 1.42, -shelfDepth / 2 + postThick / 2 + 0.04]} castShadow>
        <boxGeometry args={[postThick, 0.48, postThick]} />
        <primitive object={woodMaterial} attach="material" />
      </mesh>

      {/* TIER 4: Top Crown Shelf */}
      <mesh position={[0, 1.68, 0]} castShadow receiveShadow>
        <boxGeometry args={[shelfWidth, shelfThick, shelfDepth]} />
        <primitive object={woodMaterial} attach="material" />
      </mesh>
      {/* Under-shelf LED light strip */}
      <mesh position={[0, 1.658, 0]}>
        <boxGeometry args={[shelfWidth - 0.08, 0.008, 0.025]} />
        <primitive object={ledLightMaterial} attach="material" />
      </mesh>
      <pointLight position={[0, 1.63, 0]} color="#FFD994" intensity={0.9} distance={1.5} decay={2} />

      {/* ========================================================= */}
      {/* POTTED PLANTS (Tier by tier matching Image 2)            */}
      {/* ========================================================= */}

      {/* Plant on Tier 1 (Bottom) */}
      <group position={[0.02, 0.07, 0.02]}>
        <mesh position={[0, 0.07, 0]} castShadow>
          <sphereGeometry args={[0.085, 16, 12]} />
          <primitive object={ceramicDarkMaterial} attach="material" />
        </mesh>
        {/* Plant Leaves */}
        {[0, 1, 2, 3, 4].map((i) => {
          const angle = (i * Math.PI * 2) / 5;
          return (
            <group key={i} rotation={[0.2, angle, 0.35]}>
              <mesh position={[0, 0.16, 0.06]} rotation={[-0.4, 0, 0]} castShadow>
                <boxGeometry args={[0.065, 0.14, 0.005]} />
                <primitive object={i % 2 === 0 ? leafGreenMaterial : leafDeepGreenMaterial} attach="material" />
              </mesh>
            </group>
          );
        })}
      </group>

      {/* Plants on Tier 2 (Middle-Lower) */}
      <group position={[-0.09, 0.62, 0.04]}>
        <mesh position={[0, 0.06, 0]} castShadow>
          <cylinderGeometry args={[0.055, 0.042, 0.09, 16]} />
          <primitive object={ceramicTerracottaMaterial} attach="material" />
        </mesh>
        {/* Delicate leafy stem */}
        {[0, 1, 2, 3].map((i) => (
          <mesh key={i} position={[0, 0.12 + i * 0.03, (i % 2 ? 0.03 : -0.03)]} rotation={[0.3, i * 1.5, 0.2]} castShadow>
            <sphereGeometry args={[0.032, 8, 6]} />
            <primitive object={leafBrightGreenMaterial} attach="material" />
          </mesh>
        ))}
      </group>

      <group position={[0.1, 0.62, -0.02]}>
        <mesh position={[0, 0.07, 0]} castShadow>
          <sphereGeometry args={[0.08, 16, 12]} />
          <primitive object={ceramicWhiteMaterial} attach="material" />
        </mesh>
        {/* Lush bush foliage */}
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const angle = (i * Math.PI * 2) / 6;
          return (
            <mesh key={i} position={[Math.cos(angle) * 0.06, 0.14, Math.sin(angle) * 0.06]} rotation={[0.4, angle, 0]} castShadow>
              <boxGeometry args={[0.05, 0.11, 0.004]} />
              <primitive object={leafGreenMaterial} attach="material" />
            </mesh>
          );
        })}
      </group>

      {/* Plants on Tier 3 (Middle-Upper) */}
      <group position={[-0.08, 1.18, 0]}>
        <mesh position={[0, 0.075, 0]} castShadow>
          <sphereGeometry args={[0.085, 16, 12]} />
          <primitive object={ceramicDarkMaterial} attach="material" />
        </mesh>
        {/* Broad philodendron leaves */}
        {[0, 1, 2, 3].map((i) => {
          const angle = (i * Math.PI * 2) / 4 + 0.3;
          return (
            <mesh key={i} position={[Math.cos(angle) * 0.07, 0.17, Math.sin(angle) * 0.07]} rotation={[0.5, angle, 0]} castShadow>
              <boxGeometry args={[0.08, 0.16, 0.005]} />
              <primitive object={leafDeepGreenMaterial} attach="material" />
            </mesh>
          );
        })}
      </group>

      <group position={[0.1, 1.18, 0]}>
        <mesh position={[0, 0.065, 0]} castShadow>
          <sphereGeometry args={[0.075, 16, 12]} />
          <primitive object={ceramicWhiteMaterial} attach="material" />
        </mesh>
        {[0, 1, 2, 3, 4].map((i) => {
          const angle = (i * Math.PI * 2) / 5;
          return (
            <mesh key={i} position={[Math.cos(angle) * 0.05, 0.15, Math.sin(angle) * 0.05]} rotation={[0.35, angle, 0]} castShadow>
              <boxGeometry args={[0.06, 0.12, 0.004]} />
              <primitive object={leafBrightGreenMaterial} attach="material" />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}
