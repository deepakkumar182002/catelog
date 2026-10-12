export interface SeedProduct {
  modelNumber: string;
  name: string;
  slug: string;
  shortDescription: string;
  longDescription: string;
  heroImage: string;
  images: string[];
  category: string;
  dimensions: {
    length: string;
    width: string;
    height: string;
  };
  materials: string[];
  finishes: string[];
  features: string[];
  detailHotspots: {
    title: string;
    description: string;
    image: string;
  }[];
  hardware: string[];
  customizationOptions: string[];
  applications: string[];
  isFeatured: boolean;
  isPublished: boolean;
  sortOrder: number;
}

export const initialProducts: SeedProduct[] = [
  {
    modelNumber: "MODEL EL-D01",
    name: "Executive Work Desk",
    slug: "executive-work-desk",
    shortDescription:
      "A refined combination of natural wood, strong metal construction and practical storage, designed for productive modern workspaces.",
    longDescription:
      "Engineered specifically for executives, architects, and design-conscious professionals, the EL-D01 combines authentic wood surfaces with an industrial-grade MS metal frame. Its signature architectural X-brace provides supreme structural rigidity, while four precision telescopic drawers keep daily tools concealed yet effortlessly accessible.",
    heroImage: "/images/products/executive-work-desk.png",
    images: [
      "/images/products/executive-work-desk.png",
      "/images/products/el-d01-executive-desk.png",
      "/images/details/tabletop-detail.png",
      "/images/details/drawer-detail.png",
      "/images/details/metalframe-detail.png",
      "/images/details/xsupport-detail.png",
      "/images/technical/desk-dimensions.png",
    ],
    category: "Executive Desks",
    dimensions: {
      length: "5 ft / 60 inch",
      width: "2 ft / 24 inch",
      height: "2.5 ft / 30 inch",
    },
    materials: [
      "Natural Wood Finish",
      "MS Square Pipe Frame",
      "Marine-grade Plywood",
      "Draco-coated Hardware",
    ],
    finishes: [
      "Matte Black (Standard)",
      "Graphite Grey",
      "Clean White",
      "Custom Powder Coat",
    ],
    features: [
      "Natural wood finish with 18mm or 25mm thickness options",
      "Strong MS square-pipe frame with matte black powder coating",
      "Four smooth drawers with full-extension telescopic channels",
      "Architectural X-shaped cross-support for maximum stability",
      "Integrated side storage cabinet module",
      "Full customization of dimensions and wood species available",
    ],
    detailHotspots: [
      {
        title: "TABLE TOP",
        description: "Natural wood finish, 18–25 mm thickness with durable bevelled edge profiling.",
        image: "/images/details/tabletop-detail.png",
      },
      {
        title: "DRAWER SYSTEM",
        description: "Four smooth drawers mounted on 16–20 inch full-extension telescopic channels.",
        image: "/images/details/drawer-detail.png",
      },
      {
        title: "METAL FRAME",
        description: "Heavy-duty MS square-pipe frame with matte black electrostatic powder coating.",
        image: "/images/details/metalframe-detail.png",
      },
      {
        title: "X SUPPORT",
        description: "Industrial metal cross-support engineered for zero lateral flex and lifetime stability.",
        image: "/images/details/xsupport-detail.png",
      },
    ],
    hardware: [
      "16–20 inch full-extension telescopic channels",
      "12 mm plywood sides & 6 mm plywood bottom drawer boxes",
      "Seamless matte black metal profile handles",
      "18 mm plywood side cabinet panel with matte finish",
    ],
    customizationOptions: [
      "Custom desk length and depth to fit specific floorplans",
      "Choice of solid wood or natural veneer (Oak, Teak, Walnut, Sheesham)",
      "Reversible drawer pedestal position (left or right side)",
      "Custom frame powder-coat colors on request",
    ],
    applications: [
      "Executive Suites",
      "Architect & Studio Workspaces",
      "Home Offices",
      "Corporate Headquarters",
      "Commercial Projects",
    ],
    isFeatured: true,
    isPublished: true,
    sortOrder: 1,
  },
  {
    modelNumber: "MODEL EL-D02",
    name: "Minimal Work Desk",
    slug: "minimal-work-desk",
    shortDescription:
      "A streamlined desk focused on clear surfaces, clean geometric lines and essential daily utility.",
    longDescription:
      "Stripped down to essential forms, the EL-D02 Minimal Work Desk offers an uncluttered workspace engineered with a rigid steel perimeter frame and an elegant solid wood top. Perfect for hot-desking, collaborative studio rooms, and compact modern residences.",
    heroImage: "/images/products/el-d02-minimal-desk.png",
    images: [
      "/images/products/el-d02-minimal-desk.png",
      "/images/details/tabletop-detail.png",
      "/images/details/metalframe-detail.png",
    ],
    category: "Workstations",
    dimensions: {
      length: "4.5 ft / 54 inch",
      width: "2 ft / 24 inch",
      height: "2.5 ft / 30 inch",
    },
    materials: [
      "Premium Wood Top",
      "MS Square Tube Structure",
      "Low-VOC Matte Lacquer",
    ],
    finishes: [
      "Matte Black",
      "Graphite Grey",
      "Architectural White",
    ],
    features: [
      "Clean open-leg silhouette for effortless legroom and mobility",
      "Flush-mounted perimeter frame preventing tabletop sag",
      "Discreet cable routing channel options",
      "Custom sizing available for modular workstation runs",
    ],
    detailHotspots: [
      {
        title: "SLIMLINE TOP",
        description: "Precision-milled 18mm natural wood top with hand-rubbed protective sealer.",
        image: "/images/details/tabletop-detail.png",
      },
      {
        title: "RIGID STEEL LEGS",
        description: "Industrial square-section tube with concealed floor-leveling adjusters.",
        image: "/images/details/metalframe-detail.png",
      },
    ],
    hardware: [
      "Concealed joinery fasteners",
      "Adjustable nylon leveling glides",
    ],
    customizationOptions: [
      "Length scalable from 4 ft to 7 ft",
      "Add optional under-desk pencil drawer",
      "Integrated cable grommets",
    ],
    applications: [
      "Open Plan Offices",
      "Study Rooms",
      "Co-working Spaces",
      "Design Studios",
    ],
    isFeatured: false,
    isPublished: true,
    sortOrder: 2,
  },
  {
    modelNumber: "MODEL EL-D03",
    name: "Z-Frame Desk",
    slug: "z-frame-desk",
    shortDescription:
      "Dynamic cantilevered profile with reinforced angled steel geometry and warm natural wood.",
    longDescription:
      "The EL-D03 Z-Frame Desk introduces sculptural architectural drama to executive environments. The angled Z-truss redistributes weight down to a weighted base, giving the appearance of a suspended floating surface while sustaining substantial heavy equipment with zero deflection.",
    heroImage: "/images/products/el-d03-z-frame-desk.png",
    images: [
      "/images/products/el-d03-z-frame-desk.png",
      "/images/details/xsupport-detail.png",
      "/images/details/tabletop-detail.png",
    ],
    category: "Architectural Desks",
    dimensions: {
      length: "5 ft / 60 inch",
      width: "2.2 ft / 26 inch",
      height: "2.5 ft / 30 inch",
    },
    materials: [
      "Solid Timber Top",
      "Laser-cut Angled Steel Framing",
      "Heavy-gauge Base Plate",
    ],
    finishes: [
      "Matte Black (Standard)",
      "Graphite Grey",
      "Custom Textured Finish",
    ],
    features: [
      "Cantilevered Z-angle profile creating an architectural statement",
      "Heavyweight base ensuring total center-of-gravity stability",
      "Premium bevelled timber top in select hardwoods",
      "Customizable cable passage routes",
    ],
    detailHotspots: [
      {
        title: "Z-TRUSS GEOMETRY",
        description: "MIG-welded structural steel joints tested for superior dynamic load resistance.",
        image: "/images/details/xsupport-detail.png",
      },
    ],
    hardware: [
      "Heavy-duty internal gusset plates",
      "High-tensile countersunk machine screws",
    ],
    customizationOptions: [
      "Wood top species selection (Teak, Walnut, Sheesham)",
      "Custom frame color matching RAL codes",
    ],
    applications: [
      "Executive Offices",
      "Creative Agency Suites",
      "Boutique Hospitality Suites",
    ],
    isFeatured: false,
    isPublished: true,
    sortOrder: 3,
  },
  {
    modelNumber: "MODEL EL-D04",
    name: "Modern Coffee Table",
    slug: "modern-coffee-table",
    shortDescription:
      "Low-profile living and lounge centerpiece combining organic wood surface textures with a clean metal perimeter.",
    longDescription:
      "Conceived for corporate lounges, boutique hotel lobbies and contemporary living rooms, the EL-D04 Modern Coffee Table balances substantial timber presence with a light, grounded metal subframe. The proportions encourage social gatherings and effortless utility.",
    heroImage: "/images/products/el-d04-modern-coffee-table.png",
    images: [
      "/images/products/el-d04-modern-coffee-table.png",
      "/images/details/tabletop-detail.png",
      "/images/materials/thickness-25mm.png",
    ],
    category: "Tables & Lounges",
    dimensions: {
      length: "4 ft / 48 inch",
      width: "2 ft / 24 inch",
      height: "1.3 ft / 16 inch",
    },
    materials: [
      "Natural Hardwood Plank Top",
      "Electrostatic Coated Steel Base",
    ],
    finishes: [
      "Matte Black",
      "Graphite Grey",
      "Warm Bronze Tone",
    ],
    features: [
      "Substantial 25mm thickness top with natural grain expression",
      "Sleek low-slung stance suited for lounge seating heights",
      "Moisture-resistant commercial-grade clear protective finish",
      "Seamless flush weld points",
    ],
    detailHotspots: [
      {
        title: "25MM SOLID PLANK",
        description: "Generous 25mm thick top highlighting natural grain figure and tactile warmth.",
        image: "/images/materials/thickness-25mm.png",
      },
    ],
    hardware: [
      "Concealed vibration-damping fasteners",
      "Floor protection felt glides",
    ],
    customizationOptions: [
      "Custom square or rectangular dimensioning",
      "Lower magazine shelf addition on request",
    ],
    applications: [
      "Executive Lounges",
      "Reception Waiting Areas",
      "Hotel Suites",
      "Modern Living Spaces",
    ],
    isFeatured: false,
    isPublished: true,
    sortOrder: 4,
  },
];

export const initialMaterials = [
  {
    name: "OAK",
    type: "wood",
    description: "Light natural wood grain with gentle honey undertones, offering an airy, contemporary Scandinavian feel.",
    image: "/images/materials/oak.png",
    isAvailable: true,
    sortOrder: 1,
  },
  {
    name: "TEAK",
    type: "wood",
    description: "Warm golden wood tone celebrated for rich natural oils, supreme moisture resistance, and enduring character.",
    image: "/images/materials/teak.png",
    isAvailable: true,
    sortOrder: 2,
  },
  {
    name: "WALNUT",
    type: "wood",
    description: "Rich premium dark wood grain with refined flowing figures, providing deep sophistication for executive spaces.",
    image: "/images/materials/walnut.png",
    isAvailable: true,
    sortOrder: 3,
  },
  {
    name: "SHEESHAM",
    type: "wood",
    description: "Natural Indian hardwood with expressive grain contrasts, distinctive figuring and heirloom-level density.",
    image: "/images/materials/sheesham.png",
    isAvailable: true,
    sortOrder: 4,
  },
  {
    name: "NATURAL VENEER",
    type: "wood",
    description: "Sustainably sliced real wood veneers bonded to structural cores for balanced dimensional stability.",
    image: "/images/materials/thickness-18mm.png",
    isAvailable: true,
    sortOrder: 5,
  },
  {
    name: "SOLID WOOD",
    type: "wood",
    description: "Kiln-dried solid timber boards carefully grain-matched for authenticity and permanent structural strength.",
    image: "/images/materials/thickness-25mm.png",
    isAvailable: true,
    sortOrder: 6,
  },
];

export const initialFinishes = [
  {
    name: "MATTE BLACK — STANDARD",
    type: "powder_coat",
    colorHex: "#121212",
    description: "Our signature electrostatic powder coat. Deep matte texture resistant to scratches and everyday handling.",
    image: "/images/finishes/matte-black.png",
    isAvailable: true,
    sortOrder: 1,
  },
  {
    name: "GRAPHITE GREY — MODERN",
    type: "powder_coat",
    colorHex: "#37383B",
    description: "Subtle industrial charcoal finish offering soft contrast against light woods and neutral architectural palettes.",
    image: "/images/finishes/graphite-grey.png",
    isAvailable: true,
    sortOrder: 2,
  },
  {
    name: "WHITE — CLEAN & MINIMAL",
    type: "powder_coat",
    colorHex: "#FAFAFA",
    description: "Pristine architectural white finish creating bright, open spaces with Scandinavian-inspired clarity.",
    image: "/images/finishes/white.png",
    isAvailable: true,
    sortOrder: 3,
  },
  {
    name: "CUSTOM COLOUR — ON REQUEST",
    type: "custom",
    colorHex: "#7C6353",
    description: "Tailored RAL powder coat formulations matched precisely to your interior designer or project brand guidelines.",
    image: "/images/finishes/custom-colour.png",
    isAvailable: true,
    sortOrder: 4,
  },
];

export const initialGallery = [
  {
    title: "Executive Work Desk in Modern Office",
    category: "WORKSPACES" as const,
    image: "/images/products/executive-work-desk.png",
    description: "Natural wood top paired with architectural matte black steel frame in an executive office setting.",
    isFeatured: true,
    sortOrder: 1,
  },
  {
    title: "Full-Extension Telescopic Drawer System",
    category: "DETAILS" as const,
    image: "/images/hardware/telescopic-channel.png",
    description: "16-20 inch heavy-duty drawer glide mechanism ensuring silent, effortless extension.",
    isFeatured: true,
    sortOrder: 2,
  },
  {
    title: "Oak Wood Grain Surface Detail",
    category: "MATERIALS" as const,
    image: "/images/materials/oak.png",
    description: "Micro-bevelled edge profile with silky matte natural polyurethane sealer.",
    isFeatured: true,
    sortOrder: 3,
  },
  {
    title: "Architectural X-Frame Stability Truss",
    category: "DETAILS" as const,
    image: "/images/details/xsupport-detail.png",
    description: "Precision-welded steel diagonal brace designed to eliminate any wobble or sway.",
    isFeatured: true,
    sortOrder: 4,
  },
  {
    title: "Minimal Work Desk Configuration",
    category: "PRODUCTS" as const,
    image: "/images/products/el-d02-minimal-desk.png",
    description: "Clean open-leg layout designed for modular team workspaces and studios.",
    isFeatured: true,
    sortOrder: 5,
  },
  {
    title: "Z-Frame Executive Desk",
    category: "PRODUCTS" as const,
    image: "/images/products/el-d03-z-frame-desk.png",
    description: "Cantilevered angled steel structure providing a striking visual silhouette.",
    isFeatured: true,
    sortOrder: 6,
  },
  {
    title: "Modern Coffee Table & Lounge",
    category: "LIFESTYLE" as const,
    image: "/images/products/el-d04-modern-coffee-table.png",
    description: "Substantial 25mm hardwood surface designed for modern hospitality and home lounges.",
    isFeatured: true,
    sortOrder: 7,
  },
  {
    title: "Bespoke Commercial Project Installation",
    category: "CUSTOM DESIGNS" as const,
    image: "/images/lifestyle/workspace-space.png",
    description: "Custom-dimensioned desks built for a collaborative architectural studio environment.",
    isFeatured: true,
    sortOrder: 8,
  },
];
