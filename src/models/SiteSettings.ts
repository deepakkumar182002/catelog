import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISiteSettings extends Document {
  brandName: string;
  tagline: string;
  receiverEmail: string;
  contactEmail?: string;
  contactPhone?: string;
  contactAddress?: string;
  instagramUrl?: string;
  linkedinUrl?: string;
  metaTitle: string;
  metaDescription: string;
  createdAt: Date;
  updatedAt: Date;
}

const SiteSettingsSchema = new Schema<ISiteSettings>(
  {
    brandName: {
      type: String,
      default: "EXPERIENCE LIFE",
    },
    tagline: {
      type: String,
      default: "Furniture for Every Space",
    },
    receiverEmail: {
      type: String,
      default: "contact@experiencelife.design",
    },
    contactEmail: {
      type: String,
      default: "",
    },
    contactPhone: {
      type: String,
      default: "",
    },
    contactAddress: {
      type: String,
      default: "",
    },
    instagramUrl: {
      type: String,
      default: "",
    },
    linkedinUrl: {
      type: String,
      default: "",
    },
    metaTitle: {
      type: String,
      default: "EXPERIENCE LIFE | Furniture for Every Space",
    },
    metaDescription: {
      type: String,
      default: "Thoughtful designs. Functional spaces. Lasting quality. Architectural furniture crafted for modern workspaces, homes and commercial environments.",
    },
  },
  { timestamps: true }
);

export const SiteSettings: Model<ISiteSettings> =
  mongoose.models.SiteSettings ||
  mongoose.model<ISiteSettings>("SiteSettings", SiteSettingsSchema);
