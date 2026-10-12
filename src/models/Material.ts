import mongoose, { Schema, Document, Model } from "mongoose";

export interface IMaterial extends Document {
  name: string;
  type: "wood" | "metal" | "finish" | "core";
  description: string;
  image: string;
  isAvailable: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const MaterialSchema = new Schema<IMaterial>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ["wood", "metal", "finish", "core"],
      default: "wood",
    },
    description: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: "",
    },
    isAvailable: {
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

if (mongoose.models.Material) {
  delete (mongoose.models as any).Material;
}

export const Material: Model<IMaterial> =
  mongoose.models.Material || mongoose.model<IMaterial>("Material", MaterialSchema);
