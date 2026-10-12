import mongoose, { Schema, Document, Model } from "mongoose";

export interface IFinish extends Document {
  name: string;
  type: "powder_coat" | "wood_stain" | "custom";
  colorHex: string;
  description: string;
  image: string;
  isAvailable: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const FinishSchema = new Schema<IFinish>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ["powder_coat", "wood_stain", "custom"],
      default: "powder_coat",
    },
    colorHex: {
      type: String,
      default: "#121212",
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

if (mongoose.models.Finish) {
  delete (mongoose.models as any).Finish;
}

export const Finish: Model<IFinish> =
  mongoose.models.Finish || mongoose.model<IFinish>("Finish", FinishSchema);
