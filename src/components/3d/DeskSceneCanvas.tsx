"use client";

import React, { Suspense } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, ContactShadows } from "@react-three/drei";
import { ExecutiveDeskModel } from "./ExecutiveDeskModel";

interface DeskSceneCanvasProps {
  woodColor?: string;
  frameColor?: string;
  drawerOpenOffset?: number;
  interactive?: boolean;
  autoRotate?: boolean;
  cameraPosition?: [number, number, number];
}

export function DeskSceneCanvas({
  woodColor = "#A87C4F",
  frameColor = "#1A1A1A",
  drawerOpenOffset = 0,
  interactive = true,
  autoRotate = false,
  cameraPosition = [2.6, 1.8, 3.2],
}: DeskSceneCanvasProps) {
  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
      <Canvas
        shadows={{ type: THREE.PCFShadowMap }}
        camera={{ position: cameraPosition, fov: 36 }}
        dpr={1}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <Suspense fallback={null}>
          {/* Studio Lighting */}
          <ambientLight intensity={0.8} />
          <directionalLight
            position={[5, 8, 5]}
            intensity={1.4}
            castShadow
            shadow-mapSize-width={512}
            shadow-mapSize-height={512}
            shadow-bias={-0.0001}
          />
          <directionalLight position={[-4, 4, -4]} intensity={0.5} />
          <directionalLight position={[0, -2, 4]} intensity={0.3} />

          {/* 3D Desk Model */}
          <ExecutiveDeskModel
            woodColor={woodColor}
            frameColor={frameColor}
            drawerOpenOffset={drawerOpenOffset}
          />

          {/* Soft Ground Contact Shadow */}
          <ContactShadows
            position={[0, -0.61, 0]}
            opacity={0.65}
            scale={5}
            blur={2.4}
            far={1.6}
            color="#121212"
          />

          {interactive && (
            <OrbitControls
              enablePan={false}
              minDistance={2.0}
              maxDistance={6.0}
              maxPolarAngle={Math.PI / 2 - 0.05} // don't go below floor
              autoRotate={autoRotate}
              autoRotateSpeed={0.8}
              makeDefault
            />
          )}
        </Suspense>
      </Canvas>
    </div>
  );
}
