import React, { Suspense } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { HeroScroll3D } from "@/components/3d/HeroScroll3D";
import { IntroSection } from "@/components/sections/IntroSection";
import { FeaturedProductSection } from "@/components/sections/FeaturedProductSection";
import { MaterialsSection } from "@/components/sections/MaterialsSection";
import { MetalFinishesSection } from "@/components/sections/MetalFinishesSection";
import { StorageHardwareSection } from "@/components/sections/StorageHardwareSection";
import { DimensionsSection } from "@/components/sections/DimensionsSection";
import { CustomizationSection } from "@/components/sections/CustomizationSection";
import { CollectionSection } from "@/components/sections/CollectionSection";
import { ApplicationsSection } from "@/components/sections/ApplicationsSection";
import { B2BSection } from "@/components/sections/B2BSection";
import { WhyChooseUsSection } from "@/components/sections/WhyChooseUsSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { EnquirySection } from "@/components/sections/EnquirySection";
import { Footer } from "@/components/Footer";
import { connectDB } from "@/lib/db";
import { PageContent } from "@/models/PageContent";
import { defaultPageContent } from "@/lib/pageDefaults";

async function getPageContent() {
  try {
    const db = await connectDB();
    if (!db) return defaultPageContent;
    const doc = await PageContent.findOne();
    if (!doc) return defaultPageContent;
    const data: any = { ...defaultPageContent, ...doc.toObject() };
    for (const key of Object.keys(data)) {
      if (typeof data[key] === "string" && data[key].startsWith("/images/")) {
        data[key] = "";
      }
    }
    return data;
  } catch (error) {
    console.warn("Using default page content due to DB disconnect");
    return defaultPageContent;
  }
}

export default async function HomePage() {
  const content = await getPageContent();

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900 selection:bg-stone-900 selection:text-white">
      {/* Top Fixed Header */}
      <Navbar />

      <main>
        {/* 1. Hero Section */}
        <HeroSection content={content} />

        {/* 2. Interactive 3D Scroll Experience */}
        <HeroScroll3D />

        {/* 3. Brand Story & Philosophy (Dynamic Admin Editable) */}
        <IntroSection content={content} />

        {/* 4. Featured Product - Catalogue Focus (Dynamic Admin Editable) */}
        <FeaturedProductSection content={content} />

        {/* 5. Materials Section (Wood species & 18/25mm thickness) */}
        <MaterialsSection />

        {/* 6. Metal Frame Finishes */}
        <MetalFinishesSection />

        {/* 7. Storage & Hardware Technical Construction (Dynamic Admin Editable) */}
        <StorageHardwareSection content={content} />

        {/* 8. Technical Dimensions & Orthographic Projections (Dynamic Admin Editable) */}
        <DimensionsSection content={content} />

        {/* 9. Customization Possibilities */}
        <CustomizationSection />

        {/* 10. Catalogue Collection Grid (Dynamic Admin Editable) */}
        <CollectionSection content={content} />

        {/* 11. Spatial Applications (Home, Office, Commercial, Hospitality, etc.) */}
        <ApplicationsSection />

        {/* 12. B2B & Bulk Order Focus (Dynamic Admin Editable) */}
        <B2BSection content={content} />

        {/* 13. Why Experience Life */}
        <WhyChooseUsSection />

        {/* 14. About Brand Story (Dynamic Admin Editable) */}
        <AboutSection content={content} />

        {/* 15. Curated Gallery Archive */}
        <GallerySection />

        {/* 16. Project & Product Consultation Form */}
        <Suspense fallback={<div className="py-20 text-center font-mono text-xs">Loading Enquiry Studio...</div>}>
          <EnquirySection />
        </Suspense>
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
