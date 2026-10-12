import bcrypt from "bcryptjs";
import { connectDB } from "./db";
import { Product } from "@/models/Product";
import { Material } from "@/models/Material";
import { Finish } from "@/models/Finish";
import { Gallery } from "@/models/Gallery";
import { SiteSettings } from "@/models/SiteSettings";
import { PageContent } from "@/models/PageContent";
import { Admin } from "@/models/Admin";
import {
  initialProducts,
  initialMaterials,
  initialFinishes,
  initialGallery,
} from "./seedData";

export async function autoSeedDatabase() {
  const db = await connectDB();
  if (!db) {
    return { success: false, message: "No database connection" };
  }

  try {
    // 1. Seed Products if empty
    const productCount = await Product.countDocuments();
    if (productCount === 0) {
      await Product.insertMany(initialProducts);
      console.log(`Seeded ${initialProducts.length} initial products.`);
    }

    // 2. Seed Materials if empty
    const materialCount = await Material.countDocuments();
    if (materialCount === 0) {
      await Material.insertMany(initialMaterials);
      console.log(`Seeded ${initialMaterials.length} materials.`);
    }

    // 3. Seed Finishes if empty
    const finishCount = await Finish.countDocuments();
    if (finishCount === 0) {
      await Finish.insertMany(initialFinishes);
      console.log(`Seeded ${initialFinishes.length} finishes.`);
    }

    // 4. Seed Gallery if empty
    const galleryCount = await Gallery.countDocuments();
    if (galleryCount === 0) {
      await Gallery.insertMany(initialGallery);
      console.log(`Seeded ${initialGallery.length} gallery items.`);
    }

    // 5. Seed Site Settings if empty
    const settingsCount = await SiteSettings.countDocuments();
    if (settingsCount === 0) {
      await SiteSettings.create({
        brandName: "EXPERIENCE LIFE",
        tagline: "Furniture for Every Space",
        receiverEmail: process.env.CONTACT_RECEIVER_EMAIL || "contact@experiencelife.design",
        contactEmail: "info@experiencelife.design",
        metaTitle: "EXPERIENCE LIFE | Furniture for Every Space",
        metaDescription:
          "Thoughtful designs. Functional spaces. Lasting quality. Architectural furniture crafted for modern workspaces, homes and commercial environments.",
      });
      console.log("Seeded default site settings.");
    }

    // 6. Seed Page Content if empty
    const pageContentCount = await PageContent.countDocuments();
    if (pageContentCount === 0) {
      await PageContent.create({});
      console.log("Seeded default page content.");
    }

    // 7. Seed Admin if ADMIN_EMAIL and ADMIN_PASSWORD are provided and none exists
    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      const adminEmail = process.env.ADMIN_EMAIL || "admin@experiencelife.design";
      const adminPassword = process.env.ADMIN_PASSWORD || "ExperienceLife#2026";
      const passwordHash = await bcrypt.hash(adminPassword, 12);
      await Admin.create({
        email: adminEmail,
        passwordHash,
        name: "Studio Administrator",
        role: "superadmin",
      });
      console.log(`Seeded initial admin (${adminEmail}).`);
    }

    return { success: true, message: "Database seeded successfully" };
  } catch (error) {
    console.error("Error during auto-seed:", error);
    return { success: false, error };
  }
}
