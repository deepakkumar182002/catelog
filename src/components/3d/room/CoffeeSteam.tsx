"use client";

import React, { useRef, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

interface CoffeeSteamProps {
  position?: [number, number, number];
}

// Procedural soft radial puff texture for steam
function createSteamTexture(): THREE.CanvasTexture | null {
  if (typeof document === "undefined") return null;

  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;

  const gradient = ctx.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2
  );
  gradient.addColorStop(0, "rgba(255, 255, 255, 0.85)");
  gradient.addColorStop(0.3, "rgba(245, 240, 235, 0.45)");
  gradient.addColorStop(0.7, "rgba(240, 235, 230, 0.12)");
  gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export function CoffeeSteam({ position = [0, 0, 0] }: CoffeeSteamProps) {
  const groupRef = useRef<THREE.Group>(null);

  const particleCount = 14;

  const texture = useMemo(() => createSteamTexture(), []);

  // Material setup: transparent, additive/alpha blending, soft smoke
  const material = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      map: texture || undefined,
      transparent: true,
      opacity: 0.28,
      depthWrite: false,
      blending: THREE.NormalBlending,
      side: THREE.DoubleSide,
    });
  }, [texture]);

  // Particle state arrays
  const particles = useMemo(() => {
    return Array.from({ length: particleCount }, (_, i) => ({
      x: (Math.random() - 0.5) * 0.02,
      y: (i / particleCount) * 0.22,
      z: (Math.random() - 0.5) * 0.02,
      speed: 0.035 + Math.random() * 0.025,
      swaySpeed: 1.5 + Math.random() * 1.5,
      swayOffset: Math.random() * Math.PI * 2,
      scale: 0.015 + Math.random() * 0.01,
      maxHeight: 0.22,
    }));
  }, [particleCount]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();

    groupRef.current.children.forEach((child, i) => {
      const p = particles[i];
      if (!p) return;

      // Rise smoothly
      p.y += p.speed * delta;

      // Reset when reaching top
      if (p.y > p.maxHeight) {
        p.y = 0.005;
        p.x = (Math.random() - 0.5) * 0.015;
        p.z = (Math.random() - 0.5) * 0.015;
      }

      // Height progress [0 to 1]
      const progress = p.y / p.maxHeight;

      // Gentle horizontal curling drift
      const sway = Math.sin(time * p.swaySpeed + p.swayOffset) * 0.018 * progress;
      const swayZ = Math.cos(time * (p.swaySpeed * 0.8) + p.swayOffset) * 0.014 * progress;

      child.position.set(p.x + sway, p.y, p.z + swayZ);

      // Expand as it rises and cools
      const currentScale = p.scale + progress * 0.045;
      child.scale.set(currentScale, currentScale, currentScale);

      // Fade in quickly, then gently fade out as it disperses
      const alpha = Math.sin(progress * Math.PI) * 0.32;
      (child as THREE.Mesh).material = material;
      material.opacity = Math.max(alpha, 0.02);

      // Face camera (billboard effect)
      child.quaternion.copy(state.camera.quaternion);
    });
  });

  return (
    <group ref={groupRef} position={position}>
      {particles.map((_, i) => (
        <mesh key={i}>
          <planeGeometry args={[1, 1]} />
          <primitive object={material} attach="material" />
        </mesh>
      ))}
    </group>
  );
}
