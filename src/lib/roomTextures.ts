import * as THREE from "three";

let cachedFloorTexture: THREE.CanvasTexture | null = null;
let clockCanvas: HTMLCanvasElement | null = null;
let clockTexture: THREE.CanvasTexture | null = null;
let cachedCodeTexture: THREE.CanvasTexture | null = null;
let cachedPegboardTexture: THREE.CanvasTexture | null = null;

/**
 * Procedural Natural Oak Parquet Floor Texture
 */
export function getFloorTexture(): THREE.CanvasTexture | null {
  if (typeof document === "undefined") return null;
  if (cachedFloorTexture) return cachedFloorTexture;

  const w = 512;
  const h = 512;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;
  const imgData = ctx.createImageData(w, h);
  const data = imgData.data;

  const plankH = 32;
  const plankW = 128;

  for (let y = 0; y < h; y++) {
    const row = Math.floor(y / plankH);
    const rowY = y % plankH;
    const isRowJoint = rowY === 0 || rowY === plankH - 1;
    const offsetX = (row % 2) * (plankW / 2);

    for (let x = 0; x < w; x++) {
      const colX = Math.floor((x + offsetX) % plankW);
      const isColJoint = colX === 0 || colX === plankW - 1;
      const isJoint = isRowJoint || isColJoint;

      // Organic plank variation
      const plankId = row * 17 + Math.floor((x + offsetX) / plankW) * 31;
      const toneShift = ((plankId % 7) - 3) * 6;
      const grainStripe = Math.sin((colX * 0.15 + (y % plankH) * 0.05) * Math.PI) * 8;

      let r = 224 + toneShift + grainStripe;
      let g = 216 + Math.floor(toneShift * 0.95) + Math.floor(grainStripe * 0.9);
      let b = 205 + Math.floor(toneShift * 0.9) + Math.floor(grainStripe * 0.85);

      if (isJoint) {
        r = Math.floor(r * 0.8);
        g = Math.floor(g * 0.8);
        b = Math.floor(b * 0.8);
      }

      const idx = (y * w + x) * 4;
      data[idx] = Math.min(255, Math.max(0, Math.floor(r)));
      data[idx + 1] = Math.min(255, Math.max(0, Math.floor(g)));
      data[idx + 2] = Math.min(255, Math.max(0, Math.floor(b)));
      data[idx + 3] = 255;
    }
  }

  ctx.putImageData(imgData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(8, 8);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.needsUpdate = true;

  cachedFloorTexture = texture;
  return texture;
}

/**
 * Procedural Apple Studio Display Screen (Clock or Code Editor)
 */
export function getMonitorTexture(
  mode: "clock" | "code" = "clock",
  dateObj?: Date
): THREE.CanvasTexture | null {
  if (typeof document === "undefined") return null;

  const w = 512;
  const h = 288; // 16:9 ratio

  if (mode === "clock") {
    if (!clockCanvas) {
      clockCanvas = document.createElement("canvas");
      clockCanvas.width = w;
      clockCanvas.height = h;
      clockTexture = new THREE.CanvasTexture(clockCanvas);
      clockTexture.colorSpace = THREE.SRGBColorSpace;
    }

    const canvas = clockCanvas;
    const ctx = canvas.getContext("2d")!;
    ctx.clearRect(0, 0, w, h);

    const now = dateObj || new Date();
    const hours24 = now.getHours();
    const hours12 = hours24 % 12 || 12;
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const ampm = hours24 >= 12 ? "PM" : "AM";
    const timeStr = `${hours12.toString().padStart(2, "0")}:${minutes}`;

    const monthNames = [
      "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
      "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"
    ];
    const monthShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const topBarTime = `${dayNames[now.getDay()]} ${monthShort[now.getMonth()]} ${now.getDate()}`;
    const dateBadge = `${ampm}  •  ${monthNames[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;

    // Deep matte black / slate screen background
    const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
    bgGrad.addColorStop(0, "#111418");
    bgGrad.addColorStop(1, "#0A0C0E");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);

    // Subtle warm ambient radial center backlight
    const rad = ctx.createRadialGradient(w / 2, h / 2, 10, w / 2, h / 2, 220);
    rad.addColorStop(0, "rgba(255, 235, 200, 0.08)");
    rad.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = rad;
    ctx.fillRect(0, 0, w, h);

    // Apple-style top menu bar
    ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
    ctx.fillRect(0, 0, w, 14);
    ctx.fillStyle = "rgba(255, 255, 255, 0.75)";
    ctx.font = "bold 8px system-ui, sans-serif";
    ctx.fillText("  Terminal  Code  Window  Help", 16, 10);
    ctx.fillText(`100% ⚡  ${topBarTime}`, w - 100, 10);

    // Main Architectural Live Dynamic Clock Digits
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "bold 96px system-ui, -apple-system, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(timeStr, w / 2, h / 2 - 8);

    // AM/PM label & Dynamic Date badge
    ctx.font = "bold 13px system-ui, sans-serif";
    ctx.fillStyle = "#F59E0B"; // Warm amber accent
    ctx.fillText(dateBadge, w / 2, h / 2 + 56);

    ctx.font = "10px system-ui, sans-serif";
    ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
    ctx.fillText("EXPERIENCE LIFE STUDIO • WORKSTATION ACTIVE", w / 2, h / 2 + 76);

    if (clockTexture) {
      clockTexture.needsUpdate = true;
    }
    return clockTexture;
  }

  // Dark Mode VS Code Editor
  if (cachedCodeTexture) return cachedCodeTexture;

  const codeCanvas = document.createElement("canvas");
  codeCanvas.width = w;
  codeCanvas.height = h;
  const ctx = codeCanvas.getContext("2d")!;

  ctx.fillStyle = "#1E1E1E";
  ctx.fillRect(0, 0, w, h);

  // Title bar
  ctx.fillStyle = "#2D2D2D";
  ctx.fillRect(0, 0, w, 16);
  // macOS traffic lights
  ctx.fillStyle = "#FF5F56";
  ctx.beginPath();
  ctx.arc(10, 8, 3, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#FFBD2E";
  ctx.beginPath();
  ctx.arc(18, 8, 3, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#27C93F";
  ctx.beginPath();
  ctx.arc(26, 8, 3, 0, Math.PI * 2);
  ctx.fill();

  // Tab
  ctx.fillStyle = "#1E1E1E";
  ctx.fillRect(40, 0, 90, 16);
  ctx.fillStyle = "#CCCCCC";
  ctx.font = "8px monospace";
  ctx.fillText("ExecutiveDesk.tsx", 48, 11);

  // Sidebar
  ctx.fillStyle = "#252526";
  ctx.fillRect(0, 16, 26, h - 30);

  // Line Numbers & Code
  const lines = [
    { num: "1", text: 'import { ExecutiveDesk } from "@/studio";', color: "#C586C0" },
    { num: "2", text: 'import { SolidWood, MSFramework } from "@/materials";', color: "#4EC9B0" },
    { num: "3", text: "", color: "#D4D4D4" },
    { num: "4", text: "export function ArchitectStudio() {", color: "#569CD6" },
    { num: "5", text: "  const proportions = { length: 2.4, width: 1.0 };", color: "#9CDCFE" },
    { num: "6", text: "  const hardware = useTelescopicRunners(4);", color: "#DCDCAA" },
    { num: "7", text: "  const woodSpecies = 'Teak' || 'Walnut';", color: "#CE9178" },
    { num: "8", text: "", color: "#D4D4D4" },
    { num: "9", text: "  return <Workstation craftsmanship='100%' />;", color: "#4EC9B0" },
    { num: "10", text: "}", color: "#569CD6" },
  ];

  ctx.font = "8.5px Consolas, monospace";
  lines.forEach((line, i) => {
    const y = 30 + i * 14;
    ctx.fillStyle = "#858585";
    ctx.fillText(line.num, 30, y);
    ctx.fillStyle = line.color;
    ctx.fillText(line.text, 50, y);
  });

  // Bottom Status Bar
  ctx.fillStyle = "#007ACC";
  ctx.fillRect(0, h - 14, w, 14);
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "7.5px monospace";
  ctx.fillText("TSX • UTF-8 • Prettier • Ready", 8, h - 4);

  const texture = new THREE.CanvasTexture(codeCanvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.needsUpdate = true;

  cachedCodeTexture = texture;
  return texture;
}

/**
 * Procedural Pegboard Metal Texture
 */
export function getPegboardTexture(): THREE.CanvasTexture | null {
  if (typeof document === "undefined") return null;
  if (cachedPegboardTexture) return cachedPegboardTexture;

  const w = 256;
  const h = 256;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = "#222426";
  ctx.fillRect(0, 0, w, h);

  const step = 16;
  const radius = 2.2;
  ctx.fillStyle = "#0D0E0F";

  for (let y = step / 2; y < h; y += step) {
    for (let x = step / 2; x < w; x += step) {
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 4);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;

  cachedPegboardTexture = texture;
  return texture;
}

let cachedMacMiniTexture: THREE.CanvasTexture | null = null;

/**
 * Procedural Bead-Blasted Aluminum Mac Mini Top Face with Glossy Apple Logo (Image 3)
 */
export function getMacMiniTopTexture(): THREE.CanvasTexture | null {
  if (typeof document === "undefined") return null;
  if (cachedMacMiniTexture) return cachedMacMiniTexture;

  const w = 512;
  const h = 512;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;

  // Bead-blasted aluminum anodized silver gradient
  const grad = ctx.createLinearGradient(0, 0, w, h);
  grad.addColorStop(0, "#EAECEF");
  grad.addColorStop(0.5, "#D8DCE2");
  grad.addColorStop(1, "#E4E7EB");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // Subtle corner radius vignette
  const rad = ctx.createRadialGradient(256, 256, 180, 256, 256, 320);
  rad.addColorStop(0, "rgba(255,255,255,0)");
  rad.addColorStop(1, "rgba(0,0,0,0.06)");
  ctx.fillStyle = rad;
  ctx.fillRect(0, 0, w, h);

  // Exact vector Apple Logo with bite and leaf (Image 3)
  const applePath = new Path2D(
    "M155.8 178.6c-7.2 11.5-12.7 18.8-19.4 18.8-6.3 0-16.1-8.5-29.3-8.5-13.6 0-24.6 8.8-30.6 8.8-6.6 0-13.1-8.7-21.7-22.3C40 152 28.5 125.7 28.5 99.8c0-41.2 26.8-63 53.2-63 13.9 0 25.4 9.1 34.2 9.1 8.3 0 21.8-9.6 37.7-9.6 6.3 0 28.8 2.5 42.4 22.4-33.1 16.1-27.7 59.8 4 72.8-6.8 17.5-16.1 36.6-24.2 47.1z M136.2 36.1c6.5-7.9 10.9-18.9 9.7-29.9-9.5.4-20.9 6.3-27.7 14.3-5.9 6.9-11.2 18.1-9.8 28.9 10.6.8 21.3-5.4 27.8-13.3z"
  );

  ctx.save();
  ctx.translate(256, 256);
  ctx.scale(1.22, 1.22);
  ctx.translate(-104, -102);
  ctx.fillStyle = "#0B0C0E"; // Mirror-gloss black Apple Logo
  ctx.fill(applePath);
  ctx.restore();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.needsUpdate = true;

  cachedMacMiniTexture = texture;
  return texture;
}
