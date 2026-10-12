export interface PageContentData {
  // Hero & B2B
  heroHeadline: string;
  heroSubheadline: string;
  heroTagline: string;
  heroImage: string;
  b2bHeading: string;
  b2bText: string;
  b2bImage: string;
  whyChooseHeading: string;

  // Our Design Philosophy (IntroSection)
  philosophyTagline: string;
  philosophyHeading: string;
  philosophyParagraph1: string;
  philosophyParagraph2: string;
  philosophyPillar1: string;
  philosophyPillar2: string;
  philosophyPillar3: string;
  philosophyImage: string;

  // Catalogue Focus (FeaturedProductSection)
  featuredTagline: string;
  featuredModel: string;
  featuredHeading: string;
  featuredDescription: string;
  featuredMainImage: string;

  featuredHotspot1Title: string;
  featuredHotspot1Spec: string;
  featuredHotspot1Desc: string;
  featuredHotspot1Tag: string;
  featuredHotspot1Image: string;

  featuredHotspot2Title: string;
  featuredHotspot2Spec: string;
  featuredHotspot2Desc: string;
  featuredHotspot2Tag: string;
  featuredHotspot2Image: string;

  featuredHotspot3Title: string;
  featuredHotspot3Spec: string;
  featuredHotspot3Desc: string;
  featuredHotspot3Tag: string;
  featuredHotspot3Image: string;

  featuredHotspot4Title: string;
  featuredHotspot4Spec: string;
  featuredHotspot4Desc: string;
  featuredHotspot4Tag: string;
  featuredHotspot4Image: string;

  // Technical Construction (StorageHardwareSection)
  hardwareTagline: string;
  hardwareHeading: string;
  hardwareSubheading: string;

  hardwareItem1Title: string;
  hardwareItem1Spec: string;
  hardwareItem1Desc: string;
  hardwareItem1Detail: string;
  hardwareItem1Image: string;

  hardwareItem2Title: string;
  hardwareItem2Spec: string;
  hardwareItem2Desc: string;
  hardwareItem2Detail: string;
  hardwareItem2Image: string;

  hardwareItem3Title: string;
  hardwareItem3Spec: string;
  hardwareItem3Desc: string;
  hardwareItem3Detail: string;
  hardwareItem3Image: string;

  hardwareItem4Title: string;
  hardwareItem4Spec: string;
  hardwareItem4Desc: string;
  hardwareItem4Detail: string;
  hardwareItem4Image: string;

  // Orthographic Projections (DimensionsSection)
  dimensionsTagline: string;
  dimensionsModel: string;
  dimensionsHeading: string;
  dimensionsSubheading: string;
  dimensionsBlueprintImage: string;
  dimensionsFrontImage: string;
  dimensionsSideImage: string;
  dimensionsTopImage: string;

  // Collection 2026 • Architectural Furniture (CollectionSection)
  collectionTagline: string;
  collectionHeading: string;
  collectionDescription: string;
  collectionBannerImage: string;

  // About the Brand (AboutSection)
  aboutTagline: string;
  aboutHeading: string;
  aboutParagraph1: string;
  aboutParagraph2: string;
  aboutParagraph3: string;
  aboutImage: string;
  aboutSecondaryImage: string;
}

export const defaultPageContent: PageContentData = {
  // Hero & B2B
  heroHeadline: "EXPERIENCE LIFE",
  heroSubheadline: "Furniture for Every Space",
  heroTagline: "Thoughtful designs. Functional spaces. Lasting quality.",
  heroImage: "/images/lifestyle/hero-editorial.png",
  b2bHeading: "BUILDING SOMETHING BIGGER?",
  b2bText:
    "Whether you are furnishing an office, developing an interior project, setting up a commercial space or sourcing furniture in quantity, we can discuss the right design, materials, dimensions and finish for your requirement.",
  b2bImage: "/images/lifestyle/about-lifestyle.png",
  whyChooseHeading: "WHY EXPERIENCE LIFE?",

  // Design Philosophy
  philosophyTagline: "Our Design Philosophy",
  philosophyHeading: "MODERN FURNITURE FOR A BETTER TOMORROW",
  philosophyParagraph1:
    "We create furniture that combines thoughtful design, practical functionality and lasting quality — built for modern homes, workspaces and commercial environments.",
  philosophyParagraph2:
    "Every curve, weld and joint is engineered to balance visual tranquility with heavy structural durability. We avoid disposable trends, focusing instead on purposeful materials that age gracefully over decades.",
  philosophyPillar1: "Thoughtful",
  philosophyPillar2: "Functional",
  philosophyPillar3: "Enduring",
  philosophyImage: "/images/lifestyle/workspace-space.png",

  // Catalogue Focus
  featuredTagline: "Catalogue Focus",
  featuredModel: "MODEL EL-D01",
  featuredHeading: "EXECUTIVE WORK DESK",
  featuredDescription:
    "Architectural balance and presence engineered with precision-welded MS square tube framework sustaining daily executive usage.",
  featuredMainImage: "/images/products/executive-work-desk.png",

  featuredHotspot1Title: "TABLE TOP",
  featuredHotspot1Spec: "Natural Wood Finish • 18–25 mm Thickness",
  featuredHotspot1Desc:
    "Kiln-dried hardwood and natural veneer tops with bevelled edges. Treated with commercial-grade scratch-resistant matte clear coat that preserves natural wood grain warmth.",
  featuredHotspot1Tag: "Surfaces",
  featuredHotspot1Image: "/images/details/tabletop-detail.png",

  featuredHotspot2Title: "DRAWER SYSTEM",
  featuredHotspot2Spec: "Four Smooth Drawers • Full-Extension Channels",
  featuredHotspot2Desc:
    "Precision telescopic channels allow 100% full-extension access. Constructed with 12mm plywood drawer boxes and integrated flush profile metal handles.",
  featuredHotspot2Tag: "Storage",
  featuredHotspot2Image: "/images/details/drawer-detail.png",

  featuredHotspot3Title: "METAL FRAME",
  featuredHotspot3Spec: "Strong MS Square-Pipe • Matte Black Coating",
  featuredHotspot3Desc:
    "High-tensile Mild Steel square-tube perimeter framework. Finished in electrostatic matte black powder coat for corrosion resistance and architectural minimalism.",
  featuredHotspot3Tag: "Structure",
  featuredHotspot3Image: "/images/details/metalframe-detail.png",

  featuredHotspot4Title: "X SUPPORT",
  featuredHotspot4Spec: "Metal Cross-Support • Zero Lateral Deflection",
  featuredHotspot4Desc:
    "Signature industrial X-brace provides structural triangulated reinforcement. Ensures total rock-solid stability even under heavy dual-monitor executive setups.",
  featuredHotspot4Tag: "Stability",
  featuredHotspot4Image: "/images/details/xsupport-detail.png",

  // Technical Construction
  hardwareTagline: "Technical Construction",
  hardwareHeading: "STORAGE & HARDWARE",
  hardwareSubheading:
    "Precision engineered storage units, telescopic drawer runners and reinforced hardware designed for lifetime durability.",

  hardwareItem1Title: "FULL-EXTENSION TELESCOPIC CHANNEL",
  hardwareItem1Spec: "16–20 INCH LENGTH",
  hardwareItem1Desc:
    "Heavy-gauge ball-bearing runners providing 100% full extension drawer access, smooth dampening, and high load capacity without sagging.",
  hardwareItem1Detail: "Silent steel ball-bearings",
  hardwareItem1Image: "/images/hardware/telescopic-channel.png",

  hardwareItem2Title: "DRAWER BOX CONSTRUCTION",
  hardwareItem2Spec: "12 MM SIDES • 6 MM BOTTOM",
  hardwareItem2Desc:
    "Engineered from calibrated structural marine-grade plywood with interlocking joints, ensuring lifetime squareness under heavy storage loads.",
  hardwareItem2Detail: "Calibrated Birch / Hardwood Ply",
  hardwareItem2Image: "/images/hardware/drawer-box.png",

  hardwareItem3Title: "HANDLE OPTIONS",
  hardwareItem3Spec: "BLACK METAL / PROFILE HANDLE",
  hardwareItem3Desc:
    "Minimalist aluminum and steel J-profile and edge-mount handles, powder-coated in matte black to integrate seamlessly into drawer faces.",
  hardwareItem3Detail: "Ergonomic flush grip profile",
  hardwareItem3Image: "/images/hardware/profile-handle.png",

  hardwareItem4Title: "SIDE CABINET PANEL",
  hardwareItem4Spec: "18 MM PLYWOOD • MATTE BLACK FINISH",
  hardwareItem4Desc:
    "Substantial 18mm plywood perimeter side casing with seamless polyurethane edge banding, safeguarding the pedestal against daily scuffs.",
  hardwareItem4Detail: "Impact-resistant matte casing",
  hardwareItem4Image: "/images/hardware/side-cabinet.png",

  // Orthographic Projections
  dimensionsTagline: "Orthographic Projections",
  dimensionsModel: "EXECUTIVE WORK DESK",
  dimensionsHeading: "DIMENSIONS",
  dimensionsSubheading:
    "Standard size with custom dimensional scaling available to match specific architectural room layouts.",
  dimensionsBlueprintImage: "/images/technical/desk-dimensions.png",
  dimensionsFrontImage: "/images/technical/desk-front-view.png",
  dimensionsSideImage: "/images/technical/desk-side-view.png",
  dimensionsTopImage: "/images/technical/desk-top-view.png",

  // Collection 2026
  collectionTagline: "Collection 2026 • Architectural Furniture",
  collectionHeading: "THE COLLECTION",
  collectionDescription:
    "Explore meticulously engineered designs from the Experience Life catalogue.",
  collectionBannerImage: "",

  // About the Brand
  aboutTagline: "About the Brand",
  aboutHeading: "DESIGNED FOR THE WAY YOU LIVE",
  aboutParagraph1:
    "Experience Life is built around a simple idea: furniture should be more than something that fills a room.",
  aboutParagraph2:
    "It should work with the space, support the way people use it and remain visually relevant over time.",
  aboutParagraph3:
    "We focus on modern forms, practical functionality, strong construction and material combinations that bring warmth and character to everyday spaces.",
  aboutImage: "/images/lifestyle/craftsmanship.png",
  aboutSecondaryImage: "/images/lifestyle/about-lifestyle.png",
};

export function mergePageContent(saved?: Record<string, any> | null): PageContentData {
  if (!saved) return { ...defaultPageContent };
  const merged: any = { ...defaultPageContent };
  for (const key of Object.keys(defaultPageContent) as (keyof PageContentData)[]) {
    const val = saved[key];
    if (typeof val === "string" && val.trim().length > 0) {
      merged[key] = val.trim();
    }
  }
  return merged;
}
