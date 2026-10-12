import * as THREE from "three";

export type WoodSpecies = "teak" | "walnut" | "oak" | "sheesham";

export interface WoodOptionItem {
  id: WoodSpecies;
  name: string;
  subtitle: string;
  color: string; // Swatch preview hex
}

export const WOOD_OPTIONS: WoodOptionItem[] = [
  {
    id: "teak",
    name: "Teak",
    subtitle: "Golden Teak",
    color: "#B8864E",
  },
  {
    id: "walnut",
    name: "Walnut",
    subtitle: "American Walnut",
    color: "#523626",
  },
  {
    id: "oak",
    name: "Oak",
    subtitle: "Natural White Oak",
    color: "#D4BE9E",
  },
  {
    id: "sheesham",
    name: "Sheesham",
    subtitle: "Indian Rosewood",
    color: "#8A3E22",
  },
];

interface SpeciesDef {
  dark: [number, number, number];
  mid: [number, number, number];
  light: [number, number, number];
  pore: [number, number, number];
  roughness: number;
  metalness: number;
  bumpScale: number;
  rings: number;
  warp: number;
}

const SPECIES_CONFIGS: Record<WoodSpecies, SpeciesDef> = {
  teak: {
    dark: [136, 92, 54],
    mid: [194, 142, 88],
    light: [224, 180, 126],
    pore: [108, 70, 36],
    roughness: 0.32,
    metalness: 0.03,
    bumpScale: 0.010,
    rings: 20,
    warp: 1.4,
  },
  walnut: {
    dark: [56, 38, 26],
    mid: [88, 60, 44],
    light: [120, 88, 66],
    pore: [42, 26, 18],
    roughness: 0.28,
    metalness: 0.04,
    bumpScale: 0.012,
    rings: 22,
    warp: 1.7,
  },
  oak: {
    dark: [180, 156, 126],
    mid: [216, 196, 166],
    light: [240, 224, 198],
    pore: [154, 128, 98],
    roughness: 0.38,
    metalness: 0.02,
    bumpScale: 0.014,
    rings: 24,
    warp: 1.1,
  },
  sheesham: {
    dark: [74, 32, 22],
    mid: [142, 66, 38],
    light: [184, 96, 56],
    pore: [52, 22, 14],
    roughness: 0.29,
    metalness: 0.03,
    bumpScale: 0.012,
    rings: 20,
    warp: 1.9,
  },
};

// Procedural noise generator
const perm = new Uint8Array(512);
let seed = 1337;
function rnd() {
  seed = (seed * 16807) % 2147483647;
  return (seed - 1) / 2147483646;
}
for (let i = 0; i < 256; i++) {
  perm[i] = perm[i + 256] = Math.floor(rnd() * 256);
}

function hash(x: number, y: number) {
  return perm[(perm[x & 255] + y) & 255] / 255;
}

function noise(x: number, y: number) {
  const X = Math.floor(x);
  const Y = Math.floor(y);
  const fx = x - X;
  const fy = y - Y;
  const u = fx * fx * (3 - 2 * fx);
  const v = fy * fy * (3 - 2 * fy);
  const a0 = hash(X, Y);
  const a1 = hash(X + 1, Y);
  const b0 = hash(X, Y + 1);
  const b1 = hash(X + 1, Y + 1);
  return (a0 * (1 - u) + a1 * u) * (1 - v) + (b0 * (1 - u) + b1 * u) * v;
}

function fbm(x: number, y: number) {
  return noise(x, y) * 0.55 + noise(x * 2.2, y * 2.2) * 0.3 + noise(x * 4.4, y * 4.4) * 0.15;
}

export interface WoodMaterialBundle {
  map: THREE.CanvasTexture | null;
  bumpMap: THREE.CanvasTexture | null;
  roughness: number;
  metalness: number;
  bumpScale: number;
  fallbackColor: string;
}

const textureCache = new Map<WoodSpecies, WoodMaterialBundle>();

export function getWoodMaterialConfig(species: WoodSpecies = "teak"): WoodMaterialBundle {
  if (typeof document === "undefined") {
    // Server-side fallback
    return {
      map: null,
      bumpMap: null,
      roughness: 0.35,
      metalness: 0.04,
      bumpScale: 0.015,
      fallbackColor: SPECIES_CONFIGS[species]?.mid
        ? `rgb(${SPECIES_CONFIGS[species].mid.join(",")})`
        : "#B8864E",
    };
  }

  const cached = textureCache.get(species);
  if (cached) return cached;

  const def = SPECIES_CONFIGS[species] || SPECIES_CONFIGS.teak;
  const width = 1024;
  const height = 512;

  // Diffuse Color Canvas
  const colorCanvas = document.createElement("canvas");
  colorCanvas.width = width;
  colorCanvas.height = height;
  const colorCtx = colorCanvas.getContext("2d")!;
  const colorImg = colorCtx.createImageData(width, height);
  const colorData = colorImg.data;

  // Bump Map Canvas
  const bumpCanvas = document.createElement("canvas");
  bumpCanvas.width = width;
  bumpCanvas.height = height;
  const bumpCtx = bumpCanvas.getContext("2d")!;
  const bumpImg = bumpCtx.createImageData(width, height);
  const bumpData = bumpImg.data;

  const numPlanks = 6; // Realistic furniture stave glue-up across desktop depth

  for (let y = 0; y < height; y++) {
    const ny = y / height;
    const plankIdx = Math.floor(ny * numPlanks);
    const plankY = ny * numPlanks - plankIdx;
    const plankSeed = (plankIdx * 1.618) % 1.0;
    const plankShift = (plankSeed - 0.5) * 0.10;

    // Subtle natural seam between jointed hardwood staves
    const seamDist = Math.min(plankY, 1 - plankY) * numPlanks;
    const seamFactor = seamDist < 0.007 ? Math.max(0.88, 0.88 + (seamDist / 0.007) * 0.12) : 1;

    for (let x = 0; x < width; x++) {
      const nx = x / width;

      // Fine, tight cathedral arches and natural grain flowing lengthwise
      const cathedral = Math.sin((nx * 3.0 + plankSeed * 2.5) * Math.PI) * 0.42;
      const warp = fbm(nx * 4.5, (ny * numPlanks) * 1.6) * def.warp + cathedral;
      
      // Tight, fine annual growth rings with natural earlywood/latewood gradient
      const ringRaw = Math.sin((plankY * def.rings + warp) * Math.PI * 2);
      const ring = Math.sign(ringRaw) * Math.pow(Math.abs(ringRaw), 0.72) * 0.5 + 0.5;

      // High-frequency longitudinal micro-pores & ray flecks
      const fiber = (noise(nx * 3.5, ny * 85.0) - 0.5) * 0.22;
      const poreMask = noise(nx * 5.0, ny * 130.0) > 0.80 ? 0.18 : 0;

      // Composite fine grain value [0, 1]
      const grain = Math.min(
        Math.max(ring * 0.58 + fiber + 0.21 + plankShift, 0),
        1
      );

      // Interpolate colors: dark grain (ring) <-> mid <-> light (highlight)
      let r: number, g: number, b: number;
      if (grain < 0.5) {
        const t = grain * 2;
        r = def.dark[0] * (1 - t) + def.mid[0] * t;
        g = def.dark[1] * (1 - t) + def.mid[1] * t;
        b = def.dark[2] * (1 - t) + def.mid[2] * t;
      } else {
        const t = (grain - 0.5) * 2;
        r = def.mid[0] * (1 - t) + def.light[0] * t;
        g = def.mid[1] * (1 - t) + def.light[1] * t;
        b = def.mid[2] * (1 - t) + def.light[2] * t;
      }

      // Add pore streaks
      if (poreMask > 0) {
        r = r * (1 - poreMask) + def.pore[0] * poreMask;
        g = g * (1 - poreMask) + def.pore[1] * poreMask;
        b = b * (1 - poreMask) + def.pore[2] * poreMask;
      }

      // Apply subtle plank seam shadow
      r = Math.floor(r * seamFactor);
      g = Math.floor(g * seamFactor);
      b = Math.floor(b * seamFactor);

      const idx = (y * width + x) * 4;
      colorData[idx] = r;
      colorData[idx + 1] = g;
      colorData[idx + 2] = b;
      colorData[idx + 3] = 255;

      // Bump map: grayscale height (grain grooves + pore indents)
      const bumpVal = Math.floor(
        Math.min(
          Math.max(
            (1.0 - grain * 0.4 - Math.abs(fiber) * 0.2 - poreMask * 0.25) *
              255 *
              seamFactor,
            0
          ),
          255
        )
      );
      bumpData[idx] = bumpVal;
      bumpData[idx + 1] = bumpVal;
      bumpData[idx + 2] = bumpVal;
      bumpData[idx + 3] = 255;
    }
  }

  colorCtx.putImageData(colorImg, 0, 0);
  bumpCtx.putImageData(bumpImg, 0, 0);

  // Create Three.js Canvas Textures - 1.0 repeat maps seamlessly across desk length with NO seam
  const map = new THREE.CanvasTexture(colorCanvas);
  map.wrapS = THREE.ClampToEdgeWrapping;
  map.wrapT = THREE.ClampToEdgeWrapping;
  map.repeat.set(1.0, 1.0);
  map.colorSpace = THREE.SRGBColorSpace;
  map.generateMipmaps = true;
  map.minFilter = THREE.LinearMipmapLinearFilter;
  map.magFilter = THREE.LinearFilter;
  map.needsUpdate = true;

  const bumpMap = new THREE.CanvasTexture(bumpCanvas);
  bumpMap.wrapS = THREE.ClampToEdgeWrapping;
  bumpMap.wrapT = THREE.ClampToEdgeWrapping;
  bumpMap.repeat.set(1.0, 1.0);
  bumpMap.generateMipmaps = true;
  bumpMap.minFilter = THREE.LinearMipmapLinearFilter;
  bumpMap.magFilter = THREE.LinearFilter;
  bumpMap.needsUpdate = true;

  const bundle: WoodMaterialBundle = {
    map,
    bumpMap,
    roughness: def.roughness,
    metalness: def.metalness,
    bumpScale: def.bumpScale,
    fallbackColor: `rgb(${def.mid.join(",")})`,
  };

  textureCache.set(species, bundle);
  return bundle;
}
