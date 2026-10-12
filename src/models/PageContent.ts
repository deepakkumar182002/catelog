import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPageContent extends Document {
  // Hero & B2B
  heroHeadline: string;
  heroSubheadline: string;
  heroTagline: string;
  heroImage: string;
  b2bHeading: string;
  b2bText: string;
  b2bImage: string;
  whyChooseHeading: string;

  // Our Design Philosophy (Intro Section)
  philosophyTagline: string;
  philosophyHeading: string;
  philosophyParagraph1: string;
  philosophyParagraph2: string;
  philosophyPillar1: string;
  philosophyPillar2: string;
  philosophyPillar3: string;
  philosophyImage: string;

  // Catalogue Focus (Featured Product Section)
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

  // Technical Construction (Storage & Hardware Section)
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

  // Orthographic Projections (Dimensions Section)
  dimensionsTagline: string;
  dimensionsModel: string;
  dimensionsHeading: string;
  dimensionsSubheading: string;
  dimensionsBlueprintImage: string;
  dimensionsFrontImage: string;
  dimensionsSideImage: string;
  dimensionsTopImage: string;

  // Collection 2026 • Architectural Furniture (Collection Section)
  collectionTagline: string;
  collectionHeading: string;
  collectionDescription: string;
  collectionBannerImage: string;

  // About the Brand (About Section)
  aboutTagline: string;
  aboutHeading: string;
  aboutParagraph1: string;
  aboutParagraph2: string;
  aboutParagraph3: string;
  aboutImage: string;
  aboutSecondaryImage: string;

  createdAt: Date;
  updatedAt: Date;
}

const PageContentSchema = new Schema<IPageContent>(
  {
    // Hero & B2B
    heroHeadline: { type: String, default: "EXPERIENCE LIFE" },
    heroSubheadline: { type: String, default: "Furniture for Every Space" },
    heroTagline: { type: String, default: "Thoughtful designs. Functional spaces. Lasting quality." },
    heroImage: { type: String, default: "" },
    b2bHeading: { type: String, default: "BUILDING SOMETHING BIGGER?" },
    b2bText: {
      type: String,
      default:
        "Whether you are furnishing an office, developing an interior project, setting up a commercial space or sourcing furniture in quantity, we can discuss the right design, materials, dimensions and finish for your requirement.",
    },
    b2bImage: { type: String, default: "" },
    whyChooseHeading: { type: String, default: "WHY EXPERIENCE LIFE?" },

    // Design Philosophy
    philosophyTagline: { type: String, default: "Our Design Philosophy" },
    philosophyHeading: { type: String, default: "MODERN FURNITURE FOR A BETTER TOMORROW" },
    philosophyParagraph1: {
      type: String,
      default:
        "We create furniture that combines thoughtful design, practical functionality and lasting quality — built for modern homes, workspaces and commercial environments.",
    },
    philosophyParagraph2: {
      type: String,
      default:
        "Every curve, weld and joint is engineered to balance visual tranquility with heavy structural durability. We avoid disposable trends, focusing instead on purposeful materials that age gracefully over decades.",
    },
    philosophyPillar1: { type: String, default: "Thoughtful" },
    philosophyPillar2: { type: String, default: "Functional" },
    philosophyPillar3: { type: String, default: "Enduring" },
    philosophyImage: { type: String, default: "" },

    // Catalogue Focus
    featuredTagline: { type: String, default: "Catalogue Focus" },
    featuredModel: { type: String, default: "MODEL EL-D01" },
    featuredHeading: { type: String, default: "EXECUTIVE WORK DESK" },
    featuredDescription: {
      type: String,
      default:
        "Architectural balance and presence engineered with precision-welded MS square tube framework sustaining daily executive usage.",
    },
    featuredMainImage: { type: String, default: "" },

    featuredHotspot1Title: { type: String, default: "TABLE TOP" },
    featuredHotspot1Spec: { type: String, default: "Natural Wood Finish • 18–25 mm Thickness" },
    featuredHotspot1Desc: {
      type: String,
      default:
        "Kiln-dried hardwood and natural veneer tops with bevelled edges. Treated with commercial-grade scratch-resistant matte clear coat that preserves natural wood grain warmth.",
    },
    featuredHotspot1Tag: { type: String, default: "Surfaces" },
    featuredHotspot1Image: { type: String, default: "" },

    featuredHotspot2Title: { type: String, default: "DRAWER SYSTEM" },
    featuredHotspot2Spec: { type: String, default: "Four Smooth Drawers • Full-Extension Channels" },
    featuredHotspot2Desc: {
      type: String,
      default:
        "Precision telescopic channels allow 100% full-extension access. Constructed with 12mm plywood drawer boxes and integrated flush profile metal handles.",
    },
    featuredHotspot2Tag: { type: String, default: "Storage" },
    featuredHotspot2Image: { type: String, default: "" },

    featuredHotspot3Title: { type: String, default: "METAL FRAME" },
    featuredHotspot3Spec: { type: String, default: "Strong MS Square-Pipe • Matte Black Coating" },
    featuredHotspot3Desc: {
      type: String,
      default:
        "High-tensile Mild Steel square-tube perimeter framework. Finished in electrostatic matte black powder coat for corrosion resistance and architectural minimalism.",
    },
    featuredHotspot3Tag: { type: String, default: "Structure" },
    featuredHotspot3Image: { type: String, default: "" },

    featuredHotspot4Title: { type: String, default: "X SUPPORT" },
    featuredHotspot4Spec: { type: String, default: "Metal Cross-Support • Zero Lateral Deflection" },
    featuredHotspot4Desc: {
      type: String,
      default:
        "Signature industrial X-brace provides structural triangulated reinforcement. Ensures total rock-solid stability even under heavy dual-monitor executive setups.",
    },
    featuredHotspot4Tag: { type: String, default: "Stability" },
    featuredHotspot4Image: { type: String, default: "" },

    // Technical Construction
    hardwareTagline: { type: String, default: "Technical Construction" },
    hardwareHeading: { type: String, default: "STORAGE & HARDWARE" },
    hardwareSubheading: {
      type: String,
      default:
        "Precision engineered storage units, telescopic drawer runners and reinforced hardware designed for lifetime durability.",
    },

    hardwareItem1Title: { type: String, default: "FULL-EXTENSION TELESCOPIC CHANNEL" },
    hardwareItem1Spec: { type: String, default: "16–20 INCH LENGTH" },
    hardwareItem1Desc: {
      type: String,
      default:
        "Heavy-gauge ball-bearing runners providing 100% full extension drawer access, smooth dampening, and high load capacity without sagging.",
    },
    hardwareItem1Detail: { type: String, default: "Silent steel ball-bearings" },
    hardwareItem1Image: { type: String, default: "" },

    hardwareItem2Title: { type: String, default: "DRAWER BOX CONSTRUCTION" },
    hardwareItem2Spec: { type: String, default: "12 MM SIDES • 6 MM BOTTOM" },
    hardwareItem2Desc: {
      type: String,
      default:
        "Engineered from calibrated structural marine-grade plywood with interlocking joints, ensuring lifetime squareness under heavy storage loads.",
    },
    hardwareItem2Detail: { type: String, default: "Calibrated Birch / Hardwood Ply" },
    hardwareItem2Image: { type: String, default: "" },

    hardwareItem3Title: { type: String, default: "HANDLE OPTIONS" },
    hardwareItem3Spec: { type: String, default: "BLACK METAL / PROFILE HANDLE" },
    hardwareItem3Desc: {
      type: String,
      default:
        "Minimalist aluminum and steel J-profile and edge-mount handles, powder-coated in matte black to integrate seamlessly into drawer faces.",
    },
    hardwareItem3Detail: { type: String, default: "Ergonomic flush grip profile" },
    hardwareItem3Image: { type: String, default: "" },

    hardwareItem4Title: { type: String, default: "SIDE CABINET PANEL" },
    hardwareItem4Spec: { type: String, default: "18 MM PLYWOOD • MATTE BLACK FINISH" },
    hardwareItem4Desc: {
      type: String,
      default:
        "Substantial 18mm plywood perimeter side casing with seamless polyurethane edge banding, safeguarding the pedestal against daily scuffs.",
    },
    hardwareItem4Detail: { type: String, default: "Impact-resistant matte casing" },
    hardwareItem4Image: { type: String, default: "" },

    // Orthographic Projections
    dimensionsTagline: { type: String, default: "Orthographic Projections" },
    dimensionsModel: { type: String, default: "EXECUTIVE WORK DESK" },
    dimensionsHeading: { type: String, default: "DIMENSIONS" },
    dimensionsSubheading: {
      type: String,
      default:
        "Standard size with custom dimensional scaling available to match specific architectural room layouts.",
    },
    dimensionsBlueprintImage: { type: String, default: "" },
    dimensionsFrontImage: { type: String, default: "" },
    dimensionsSideImage: { type: String, default: "" },
    dimensionsTopImage: { type: String, default: "" },

    // Collection 2026
    collectionTagline: { type: String, default: "Collection 2026 • Architectural Furniture" },
    collectionHeading: { type: String, default: "THE COLLECTION" },
    collectionDescription: {
      type: String,
      default: "Explore meticulously engineered designs from the Experience Life catalogue.",
    },
    collectionBannerImage: { type: String, default: "" },

    // About the Brand
    aboutTagline: { type: String, default: "About the Brand" },
    aboutHeading: { type: String, default: "DESIGNED FOR THE WAY YOU LIVE" },
    aboutParagraph1: {
      type: String,
      default:
        "Experience Life is built around a simple idea: furniture should be more than something that fills a room.",
    },
    aboutParagraph2: {
      type: String,
      default:
        "It should work with the space, support the way people use it and remain visually relevant over time.",
    },
    aboutParagraph3: {
      type: String,
      default:
        "We focus on modern forms, practical functionality, strong construction and material combinations that bring warmth and character to everyday spaces.",
    },
    aboutImage: { type: String, default: "" },
    aboutSecondaryImage: { type: String, default: "" },
  },
  { timestamps: true }
);

export const PageContent: Model<IPageContent> =
  mongoose.models.PageContent ||
  mongoose.model<IPageContent>("PageContent", PageContentSchema);
