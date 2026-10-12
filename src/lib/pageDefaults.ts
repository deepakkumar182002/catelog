export interface PageContentData {
  heroHeadline: string;
  heroSubheadline: string;
  heroTagline: string;

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

  // Technical Construction (StorageHardwareSection)
  hardwareTagline: string;
  hardwareHeading: string;
  hardwareSubheading: string;

  // Orthographic Projections (DimensionsSection)
  dimensionsTagline: string;
  dimensionsModel: string;
  dimensionsHeading: string;
  dimensionsSubheading: string;

  // Collection 2026 • Architectural Furniture (CollectionSection)
  collectionTagline: string;
  collectionHeading: string;
  collectionDescription: string;

  // About the Brand (AboutSection)
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
}

export const defaultPageContent: PageContentData = {
  heroHeadline: "EXPERIENCE LIFE",
  heroSubheadline: "Furniture for Every Space",
  heroTagline: "Thoughtful designs. Functional spaces. Lasting quality.",

  // Our Design Philosophy (IntroSection)
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

  // Catalogue Focus (FeaturedProductSection)
  featuredTagline: "Catalogue Focus",
  featuredModel: "MODEL EL-D01",
  featuredHeading: "EXECUTIVE WORK DESK",
  featuredDescription:
    "Architectural balance and presence engineered with precision-welded MS square tube framework sustaining daily executive usage.",

  // Technical Construction (StorageHardwareSection)
  hardwareTagline: "Technical Construction",
  hardwareHeading: "STORAGE & HARDWARE",
  hardwareSubheading:
    "Precision engineered storage units, telescopic drawer runners and reinforced hardware designed for lifetime durability.",

  // Orthographic Projections (DimensionsSection)
  dimensionsTagline: "Orthographic Projections",
  dimensionsModel: "EXECUTIVE WORK DESK",
  dimensionsHeading: "DIMENSIONS",
  dimensionsSubheading:
    "Standard size with custom dimensional scaling available to match specific architectural room layouts.",

  // Collection 2026 • Architectural Furniture (CollectionSection)
  collectionTagline: "Collection 2026 • Architectural Furniture",
  collectionHeading: "THE COLLECTION",
  collectionDescription:
    "Explore meticulously engineered designs from the Experience Life catalogue.",

  // About the Brand (AboutSection)
  aboutTagline: "About the Brand",
  aboutHeading: "DESIGNED FOR THE WAY YOU LIVE",
  aboutParagraph1:
    "Experience Life is built around a simple idea: furniture should be more than something that fills a room.",
  aboutParagraph2:
    "It should work with the space, support the way people use it and remain visually relevant over time.",
  aboutParagraph3:
    "We focus on modern forms, practical functionality, strong construction and material combinations that bring warmth and character to everyday spaces.",
  aboutImage: "/images/lifestyle/craftsmanship.png",

  // B2B & Why Choose
  b2bHeading: "BUILDING SOMETHING BIGGER?",
  b2bText:
    "Whether you are furnishing an office, developing an interior project, setting up a commercial space or sourcing furniture in quantity, we can discuss the right design, materials, dimensions and finish for your requirement.",
  whyChooseHeading: "WHY EXPERIENCE LIFE?",
};
