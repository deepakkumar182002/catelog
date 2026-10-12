import mongoose, { Schema, Document, Model } from "mongoose";

export interface IGalleryItem extends Document {
  title: string;
  category: "PRODUCTS" | "DETAILS" | "MATERIALS" | "LIFESTYLE" | "WORKSPACES" | "CUSTOM DESIGNS";
  image: string;
  description: string;
  isFeatured: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const GallerySchema = new Schema<IGalleryItem>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      enum: ["PRODUCTS", "DETAILS", "MATERIALS", "LIFESTYLE", "WORKSPACES", "CUSTOM DESIGNS"],
      default: "PRODUCTS",
      index: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    sortOrder: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const Gallery: Model<IGalleryItem> =
  mongoose.models.Gallery || mongoose.model<IGalleryItem>("Gallery", GallerySchema);
