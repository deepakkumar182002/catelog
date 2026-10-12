import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProductDimensions {
  length: string; // e.g., "5 ft / 60 inch"
  width: string;  // e.g., "2 ft / 24 inch"
  height: string; // e.g., "2.5 ft / 30 inch"
}

export interface IProductDetailFeature {
  title: string;
  description: string;
  image?: string;
}

export interface IProduct extends Document {
  modelNumber: string;
  name: string;
  slug: string;
  shortDescription: string;
  longDescription: string;
  images: string[];
  heroImage: string;
  model3dUrl?: string;
  category: string;
  dimensions: IProductDimensions;
  materials: string[];
  finishes: string[];
  features: string[];
  detailHotspots?: IProductDetailFeature[];
  hardware: string[];
  customizationOptions: string[];
  applications: string[];
  isFeatured: boolean;
  isPublished: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    modelNumber: {
      type: String,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    shortDescription: {
      type: String,
      required: true,
    },
    longDescription: {
      type: String,
      default: "",
    },
    images: {
      type: [String],
      default: [],
    },
    heroImage: {
      type: String,
      required: true,
    },
    model3dUrl: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      default: "Work Desks",
      index: true,
    },
    dimensions: {
      length: { type: String, default: "5 ft / 60 inch" },
      width: { type: String, default: "2 ft / 24 inch" },
      height: { type: String, default: "2.5 ft / 30 inch" },
    },
    materials: {
      type: [String],
      default: [],
    },
    finishes: {
      type: [String],
      default: [],
    },
    features: {
      type: [String],
      default: [],
    },
    detailHotspots: [
      {
        title: { type: String, required: true },
        description: { type: String, required: true },
        image: { type: String, default: "" },
      },
    ],
    hardware: {
      type: [String],
      default: [],
    },
    customizationOptions: {
      type: [String],
      default: [],
    },
    applications: {
      type: [String],
      default: [],
    },
    isFeatured: {
      type: Boolean,
      default: false,
      index: true,
    },
    isPublished: {
      type: Boolean,
      default: true,
      index: true,
    },
    sortOrder: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);
