const fs = require('fs');
const path = require('path');

const dirs = [
  'public/images/products',
  'public/images/details',
  'public/images/materials',
  'public/images/finishes',
  'public/images/hardware',
  'public/images/technical',
  'public/images/lifestyle'
];

dirs.forEach(d => {
  fs.mkdirSync(path.join(__dirname, '..', d), { recursive: true });
});

// Map from extracted_assets/ to public/images/
const mappings = [
  // Products
  { src: 'p2_img5_364.png', dest: 'public/images/products/executive-work-desk.png' },
  { src: 'p9_img4_557.png', dest: 'public/images/products/el-d01-executive-desk.png' },
  { src: 'p9_img5_560.png', dest: 'public/images/products/el-d02-minimal-desk.png' },
  { src: 'p9_img7_564.png', dest: 'public/images/products/el-d03-z-frame-desk.png' },
  { src: 'p9_img8_567.png', dest: 'public/images/products/el-d04-modern-coffee-table.png' },

  // Details
  { src: 'p4_img4_403.png', dest: 'public/images/details/tabletop-detail.png' },
  { src: 'p4_img5_406.png', dest: 'public/images/details/drawer-detail.png' },
  { src: 'p4_img6_409.png', dest: 'public/images/details/metalframe-detail.png' },
  { src: 'p4_img7_411.png', dest: 'public/images/details/xsupport-detail.png' },

  // Dimensions & Technical
  { src: 'p5_img5_430.png', dest: 'public/images/technical/desk-dimensions.png' },
  { src: 'p5_img9_436.png', dest: 'public/images/technical/desk-front-view.png' },
  { src: 'p5_img10_437.png', dest: 'public/images/technical/desk-side-view.png' },
  { src: 'p5_img12_440.png', dest: 'public/images/technical/desk-top-view.png' },

  // Materials
  { src: 'p6_img6_462.png', dest: 'public/images/materials/oak.png' },
  { src: 'p6_img8_465.png', dest: 'public/images/materials/teak.png' },
  { src: 'p6_img10_469.png', dest: 'public/images/materials/walnut.png' },
  { src: 'p6_img12_473.png', dest: 'public/images/materials/sheesham.png' },
  { src: 'p6_img15_479.png', dest: 'public/images/materials/thickness-18mm.png' },
  { src: 'p6_img16_480.png', dest: 'public/images/materials/thickness-25mm.png' },

  // Finishes
  { src: 'p7_img6_502.png', dest: 'public/images/finishes/matte-black.png' },
  { src: 'p7_img7_503.png', dest: 'public/images/finishes/graphite-grey.png' },
  { src: 'p7_img8_504.png', dest: 'public/images/finishes/white.png' },
  { src: 'p7_img9_506.png', dest: 'public/images/finishes/custom-colour.png' },

  // Hardware
  { src: 'p8_img5_524.png', dest: 'public/images/hardware/telescopic-channel.png' },
  { src: 'p8_img9_529.png', dest: 'public/images/hardware/drawer-box.png' },
  { src: 'p8_img11_532.png', dest: 'public/images/hardware/drawer-plywood.png' },
  { src: 'p8_img12_533.png', dest: 'public/images/hardware/profile-handle.png' },
  { src: 'p8_img17_541.png', dest: 'public/images/hardware/side-cabinet.png' },

  // Lifestyle & Editorial
  { src: 'p1_img7_349.png', dest: 'public/images/lifestyle/hero-editorial.png' },
  { src: 'p3_img1_381.png', dest: 'public/images/lifestyle/workspace-space.png' },
  { src: 'p10_img11_594.png', dest: 'public/images/lifestyle/craftsmanship.png' },
  { src: 'p10_img1_577.png', dest: 'public/images/lifestyle/about-lifestyle.png' }
];

let copied = 0;
for (const m of mappings) {
  const srcPath = path.join(__dirname, '..', 'extracted_assets', m.src);
  const destPath = path.join(__dirname, '..', m.dest);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    copied++;
  } else {
    console.warn('Missing asset:', srcPath);
  }
}

console.log(`Successfully organized ${copied} catalogue images into public/images/`);
