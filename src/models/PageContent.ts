import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPageContent extends Document {
  // Hero
  heroHeadline: string;
  heroSubheadline: string;
  heroTagline: string;

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

  // Technical Construction (Storage & Hardware Section)
  hardwareTagline: string;
  hardwareHeading: string;
  hardwareSubheading: string;

  // Orthographic Projections (Dimensions Section)
  dimensionsTagline: string;
  dimensionsModel: string;
  dimensionsHeading: string;
  dimensionsSubheading: string;

  // Collection 2026 • Architectural Furniture (Collection Section)
  collectionTagline: string;
  collectionHeading: string;
  collectionDescription: string;

  // About the Brand (About Section)
  aboutTagline: string;
  aboutHeading: string;
  aboutParagraph1: string;
  aboutParagraph2: string;
  aboutParagraph3: string;
  aboutImage: string;

  // B2B & Why Choose
  b2bHeading: string;
  b2bText: string;
  whyChooseHeading: string;

  createdAt: Date;
  updatedAt: Date;
}

const PageContentSchema = new Schema<IPageContent>(
  {
    heroHeadline: {
      type: String,
      default: "EXPERIENCE LIFE",
    },
    heroSubheadline: {
      type: String,
      default: "Furniture for Every Space",
    },
    heroTagline: {
      type: String,
      default: "Thoughtful designs. Functional spaces. Lasting quality.",
    },

    // Design Philosophy
    philosophyTagline: {
      type: String,
      default: "Our Design Philosophy",
    },
    philosophyHeading: {
      type: String,
      default: "MODERN FURNITURE FOR A BETTER TOMORROW",
    },
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
    philosophyPillar1: {
      type: String,
      default: "Thoughtful",
    },
    philosophyPillar2: {
      type: String,
      default: "Functional",
    },
    philosophyPillar3: {
      type: String,
      default: "Enduring",
    },
    philosophyImage: {
      type: String,
      default: "/images/lifestyle/workspace-space.png",
    },

    // Catalogue Focus
    featuredTagline: {
      type: String,
      default: "Catalogue Focus",
    },
    featuredModel: {
      type: String,
      default: "MODEL EL-D01",
    },
    featuredHeading: {
      type: String,
      default: "EXECUTIVE WORK DESK",
    },
    featuredDescription: {
      type: String,
      default:
        "Architectural balance and presence engineered with precision-welded MS square tube framework sustaining daily executive usage.",
    },

    // Technical Construction
    hardwareTagline: {
      type: String,
      default: "Technical Construction",
    },
    hardwareHeading: {
      type: String,
      default: "STORAGE & HARDWARE",
    },
    hardwareSubheading: {
      type: String,
      default:
        "Precision engineered storage units, telescopic drawer runners and reinforced hardware designed for lifetime durability.",
    },

    // Orthographic Projections
    dimensionsTagline: {
      type: String,
      default: "Orthographic Projections",
    },
    dimensionsModel: {
      type: String,
      default: "EXECUTIVE WORK DESK",
    },
    dimensionsHeading: {
      type: String,
      default: "DIMENSIONS",
    },
    dimensionsSubheading: {
      type: String,
      default:
        "Standard size with custom dimensional scaling available to match specific architectural room layouts.",
    },

    // Collection 2026
    collectionTagline: {
      type: String,
      default: "Collection 2026 • Architectural Furniture",
    },
    collectionHeading: {
      type: String,
      default: "THE COLLECTION",
    },
    collectionDescription: {
      type: String,
      default:
        "Explore meticulously engineered designs from the Experience Life catalogue.",
    },

    // About the Brand
    aboutTagline: {
      type: String,
      default: "About the Brand",
    },
    aboutHeading: {
      type: String,
      default: "DESIGNED FOR THE WAY YOU LIVE",
    },
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
    aboutImage: {
      type: String,
      default: "/images/lifestyle/craftsmanship.png",
    },

    // B2B & Why Choose
    b2bHeading: {
      type: String,
      default: "BUILDING SOMETHING BIGGER?",
    },
    b2bText: {
      type: String,
      default:
        "Whether you are furnishing an office, developing an interior project, setting up a commercial space or sourcing furniture in quantity, we can discuss the right design, materials, dimensions and finish for your requirement.",
    },
    whyChooseHeading: {
      type: String,
      default: "WHY EXPERIENCE LIFE?",
    },
  },
  { timestamps: true }
);

export const PageContent: Model<IPageContent> =
  mongoose.models.PageContent ||
  mongoose.model<IPageContent>("PageContent", PageContentSchema);
