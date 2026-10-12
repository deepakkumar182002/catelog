import mongoose, { Schema, Document, Model } from "mongoose";

export interface IEnquiry extends Document {
  name: string;
  email: string;
  phone: string;
  company?: string;
  city?: string;
  requirementType: string;
  quantity?: string;
  productInterested?: string;
  preferredMaterial?: string;
  preferredFinish?: string;
  message: string;
  referenceFileUrl?: string;
  status: "new" | "in_review" | "contacted" | "quoted" | "closed";
  adminNotes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const EnquirySchema = new Schema<IEnquiry>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    company: {
      type: String,
      default: "",
    },
    city: {
      type: String,
      default: "",
    },
    requirementType: {
      type: String,
      default: "Commercial / Bulk Order",
    },
    quantity: {
      type: String,
      default: "",
    },
    productInterested: {
      type: String,
      default: "Executive Work Desk",
    },
    preferredMaterial: {
      type: String,
      default: "",
    },
    preferredFinish: {
      type: String,
      default: "",
    },
    message: {
      type: String,
      required: true,
    },
    referenceFileUrl: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["new", "in_review", "contacted", "quoted", "closed"],
      default: "new",
      index: true,
    },
    adminNotes: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export const Enquiry: Model<IEnquiry> =
  mongoose.models.Enquiry || mongoose.model<IEnquiry>("Enquiry", EnquirySchema);
