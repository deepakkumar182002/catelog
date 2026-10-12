import mongoose, { Schema, Document, Model } from "mongoose";

export interface IGalleryItem extends Document {
  title: string;
  category: string;
  modelNumber?: string;
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
      default: "Office Desks",
      index: true,
      trim: true,
    },
    modelNumber: {
      type: String,
      default: "",
      trim: true,
    },
    image: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    isFeatured: {
      type: Boolean,
      default: true,
    },
    sortOrder: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

if (mongoose.models.Gallery) {
  delete (mongoose.models as any).Gallery;
}

export const Gallery: Model<IGalleryItem> =
  mongoose.models.Gallery || mongoose.model<IGalleryItem>("Gallery", GallerySchema);
