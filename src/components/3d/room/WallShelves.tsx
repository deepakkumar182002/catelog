"use client";

import React, { useMemo } from "react";
import * as THREE from "three";

interface WallShelvesProps {
  woodMaterial: THREE.Material;
}

export function WallShelves({ woodMaterial }: WallShelvesProps) {
  // Ceramic pot materials
  const ceramicWhiteMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#F8F6F0"),
        roughness: 0.25,
        metalness: 0.05,
      }),
    []
  );

  const glassAmberMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#C86820"),
        transmission: 0.8,
        opacity: 0.9,
        transparent: true,
        roughness: 0.15,
        ior: 1.52,
      }),
    []
  );

  const brassMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#D4AF37"),
        roughness: 0.3,
        metalness: 0.85,
      }),
    []
  );

  const ledLightMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#FFF8EA"),
        emissive: new THREE.Color("#FFD994"),
        emissiveIntensity: 2.2,
        roughness: 0.2,
      }),
    []
  );

  const vineGreenMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#44884E"),
        roughness: 0.45,
        metalness: 0.02,
        side: THREE.DoubleSide,
      }),
    []
  );



  return (
    <>
      {/* ========================================================= */}
      {/* 1. INTERLOCKING FLOATING BOOKSHELF UNIT (Back Wall, Image 3) */}
      {/* ========================================================= */}
      <group position={[0.2, 2.55, -2.088]}>
        {/* Subtle flush mounting wall backplate for pristine shadow alignment */}
        <mesh position={[0.06, -0.06, -0.108]} receiveShadow>
          <planeGeometry args={[1.96, 1.34]} />
          <meshStandardMaterial color="#F2EFE8" roughness={0.95} />
        </mesh>

        {/* TOP LEFT BOX CUBBY */}
        {/* Top plank */}
        <mesh position={[-0.48, 0.46, 0]} castShadow>
          <boxGeometry args={[0.55, 0.035, 0.22]} />
          <primitive object={woodMaterial} attach="material" />
        </mesh>
        {/* Bottom plank */}
        <mesh position={[-0.48, 0.08, 0]} castShadow>
          <boxGeometry args={[0.55, 0.035, 0.22]} />
          <primitive object={woodMaterial} attach="material" />
        </mesh>
        {/* Left vertical side */}
        <mesh position={[-0.74, 0.27, 0]} castShadow>
          <boxGeometry args={[0.035, 0.38, 0.22]} />
          <primitive object={woodMaterial} attach="material" />
        </mesh>
        {/* Right vertical side */}
        <mesh position={[-0.22, 0.27, 0]} castShadow>
          <boxGeometry args={[0.035, 0.38, 0.22]} />
          <primitive object={woodMaterial} attach="material" />
        </mesh>
        {/* Top cubby LED strip */}
        <mesh position={[-0.48, 0.435, 0]}>
          <boxGeometry args={[0.48, 0.008, 0.02]} />
          <primitive object={ledLightMaterial} attach="material" />
        </mesh>
        <pointLight position={[-0.48, 0.41, 0.05]} color="#FFD994" intensity={0.4} distance={0.9} decay={2} />

        {/* Antique books inside Top Cubby */}
        <mesh position={[-0.62, 0.24, 0.02]} castShadow>
          <boxGeometry args={[0.055, 0.28, 0.16]} />
          <meshStandardMaterial color="#6E2C1A" roughness={0.6} />
        </mesh>
        <mesh position={[-0.56, 0.24, 0.02]} castShadow>
          <boxGeometry args={[0.05, 0.26, 0.15]} />
          <meshStandardMaterial color="#223A52" roughness={0.6} />
        </mesh>
        <mesh position={[-0.50, 0.24, 0.02]} castShadow>
          <boxGeometry args={[0.045, 0.29, 0.16]} />
          <meshStandardMaterial color="#7A6038" roughness={0.6} />
        </mesh>
        {/* Stacked books flat */}
        <mesh position={[-0.34, 0.15, 0.02]} castShadow>
          <boxGeometry args={[0.16, 0.07, 0.14]} />
          <meshStandardMaterial color="#8F4822" roughness={0.6} />
        </mesh>

        {/* MIDDLE CONNECTING CANTILEVER SHELF */}
        <mesh position={[0.26, 0.22, 0]} castShadow>
          <boxGeometry args={[0.96, 0.035, 0.22]} />
          <primitive object={woodMaterial} attach="material" />
        </mesh>
        {/* Middle shelf LED strip */}
        <mesh position={[0.26, 0.198, 0]}>
          <boxGeometry args={[0.88, 0.008, 0.02]} />
          <primitive object={ledLightMaterial} attach="material" />
        </mesh>
        <pointLight position={[0.26, 0.18, 0.05]} color="#FFD994" intensity={0.45} distance={1.0} decay={2} />

        {/* Stacked books on Middle shelf */}
        <mesh position={[-0.4, -0.07, 0.02]} castShadow>
          <boxGeometry args={[0.18, 0.065, 0.15]} />
          <meshStandardMaterial color="#2B4436" roughness={0.6} />
        </mesh>

        {/* Vertical divider linking to right box */}
        <mesh position={[0.16, 0.04, 0]} castShadow>
          <boxGeometry args={[0.035, 0.34, 0.22]} />
          <primitive object={woodMaterial} attach="material" />
        </mesh>

        {/* Brass Hourglass on middle shelf */}
        <group position={[0.14, -0.18, 0.03]}>
          <mesh position={[0, 0.005, 0]} castShadow>
            <cylinderGeometry args={[0.04, 0.04, 0.01, 16]} />
            <primitive object={brassMaterial} attach="material" />
          </mesh>
          <mesh position={[0, 0.14, 0]} castShadow>
            <cylinderGeometry args={[0.04, 0.04, 0.01, 16]} />
            <primitive object={brassMaterial} attach="material" />
          </mesh>
          <mesh position={[0, 0.07, 0]}>
            <cylinderGeometry args={[0.025, 0.025, 0.12, 16]} />
            <meshPhysicalMaterial color="#FFFFFF" transmission={0.9} transparent opacity={0.6} roughness={0.1} />
          </mesh>
        </group>

        {/* RIGHT LOWER BOX CUBBY */}
        {/* Top plank */}
        <mesh position={[0.54, -0.08, 0]} castShadow>
          <boxGeometry args={[0.68, 0.035, 0.22]} />
          <primitive object={woodMaterial} attach="material" />
        </mesh>
        {/* Bottom plank */}
        <mesh position={[0.54, -0.44, 0]} castShadow>
          <boxGeometry args={[0.68, 0.035, 0.22]} />
          <primitive object={woodMaterial} attach="material" />
        </mesh>
        {/* Right vertical side */}
        <mesh position={[0.86, -0.26, 0]} castShadow>
          <boxGeometry args={[0.035, 0.36, 0.22]} />
          <primitive object={woodMaterial} attach="material" />
        </mesh>
        {/* Right cubby LED strip */}
        <mesh position={[0.54, -0.105, 0]}>
          <boxGeometry args={[0.62, 0.008, 0.02]} />
          <primitive object={ledLightMaterial} attach="material" />
        </mesh>
        <pointLight position={[0.54, -0.13, 0.05]} color="#FFD994" intensity={0.4} distance={0.9} decay={2} />

        {/* Vintage Amber Glass Apothecary Bottles */}
        <group position={[0.52, -0.28, 0.03]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.042, 0.042, 0.14, 16]} />
            <primitive object={glassAmberMaterial} attach="material" />
          </mesh>
          <mesh position={[0, 0.09, 0]}>
            <cylinderGeometry args={[0.018, 0.018, 0.04, 16]} />
            <primitive object={glassAmberMaterial} attach="material" />
          </mesh>
          {/* Label */}
          <mesh position={[0, 0, 0.043]}>
            <planeGeometry args={[0.05, 0.07]} />
            <meshStandardMaterial color="#EAE2D2" roughness={0.8} />
          </mesh>
        </group>
        <group position={[0.66, -0.3, 0.03]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.038, 0.038, 0.11, 16]} />
            <primitive object={glassAmberMaterial} attach="material" />
          </mesh>
          <mesh position={[0, 0.07, 0]}>
            <cylinderGeometry args={[0.016, 0.016, 0.035, 16]} />
            <primitive object={glassAmberMaterial} attach="material" />
          </mesh>
          <mesh position={[0, 0, 0.039]}>
            <planeGeometry args={[0.045, 0.055]} />
            <meshStandardMaterial color="#EAE2D2" roughness={0.8} />
          </mesh>
        </group>

        {/* BOTTOM EXTENSION LEDGE */}
        <mesh position={[-0.12, -0.58, 0]} castShadow>
          <boxGeometry args={[1.08, 0.035, 0.22]} />
          <primitive object={woodMaterial} attach="material" />
        </mesh>
        {/* Bottom ledge LED strip */}
        <mesh position={[-0.12, -0.602, 0]}>
          <boxGeometry args={[1.0, 0.008, 0.02]} />
          <primitive object={ledLightMaterial} attach="material" />
        </mesh>
        <pointLight position={[-0.12, -0.62, 0.05]} color="#FFD994" intensity={0.4} distance={1.0} decay={2} />

        {/* Round Glass Terrarium with Succulent */}
        <group position={[-0.42, -0.48, 0.04]}>
          <mesh castShadow>
            <sphereGeometry args={[0.075, 16, 16]} />
            <meshPhysicalMaterial color="#FFFFFF" transmission={0.9} transparent opacity={0.65} roughness={0.1} />
          </mesh>
          {/* Succulent inside */}
          <mesh position={[0, -0.02, 0]}>
            <sphereGeometry args={[0.04, 8, 8]} />
            <primitive object={vineGreenMaterial} attach="material" />
          </mesh>
        </group>

        {/* Scented Candle Tumbler */}
        <mesh position={[-0.12, -0.51, 0.03]} castShadow>
          <cylinderGeometry args={[0.042, 0.04, 0.08, 16]} />
          <primitive object={ceramicWhiteMaterial} attach="material" />
        </mesh>

        {/* Leather Bound Journals stacked flat */}
        <mesh position={[0.22, -0.53, 0.03]} castShadow>
          <boxGeometry args={[0.18, 0.055, 0.14]} />
          <meshStandardMaterial color="#8B4E26" roughness={0.6} />
        </mesh>
      </group>

    </>
  );
}
