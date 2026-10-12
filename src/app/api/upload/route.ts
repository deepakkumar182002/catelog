import { NextRequest, NextResponse } from "next/server";
import { getSessionAdmin, getAdminFromRequest } from "@/lib/auth";
import { isCloudinaryConfigured, uploadToCloudinary } from "@/lib/cloudinary";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    // Check authentication via request cookies first, then session cookies
    let admin = getAdminFromRequest(req);
    if (!admin) {
      admin = await getSessionAdmin();
    }

    if (!admin) {
      return NextResponse.json({ error: "Unauthorized access. Please login to admin portal." }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) || "experience-life";

    if (!file) {
      return NextResponse.json({ error: "No file provided for upload." }, { status: 400 });
    }

    // Comprehensive mime types and extensions check
    const validMimes = [
      "image/jpeg",
      "image/jpg",
      "image/pjpeg",
      "image/png",
      "image/x-png",
      "image/webp",
      "image/avif",
      "image/svg+xml",
      "image/gif",
    ];

    const fileNameLower = (file.name || "").toLowerCase();
    const validExtensions = [".jpg", ".jpeg", ".png", ".webp", ".avif", ".svg", ".gif"];
    const hasValidExtension = validExtensions.some((ext) => fileNameLower.endsWith(ext));
    const hasValidMime = validMimes.includes(file.type.toLowerCase()) || file.type.startsWith("image/");

    if (!hasValidExtension && !hasValidMime) {
      return NextResponse.json(
        { error: "Invalid file type. Please upload a valid image (JPG, PNG, WebP, SVG, AVIF, GIF)." },
        { status: 400 }
      );
    }

    // Limit size to 15MB
    if (file.size > 15 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File exceeds 15MB size limit." },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // 1. Try Cloudinary if configured
    if (isCloudinaryConfigured) {
      try {
        const result = await uploadToCloudinary(buffer, folder, file.name);
        return NextResponse.json({
          success: true,
          url: result.url,
          publicId: result.publicId,
          storage: "cloudinary",
        });
      } catch (cloudErr: any) {
        console.warn("Cloudinary upload failed, attempting local fallback:", cloudErr?.message);
        // If not running on Vercel, fall back to local disk storage
        if (process.env.VERCEL) {
          return NextResponse.json(
            { error: `Cloudinary upload error: ${cloudErr?.message || "Failed to upload"}` },
            { status: 500 }
          );
        }
      }
    }

    // 2. Local disk fallback (public/uploads/)
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const filename = `${uniqueSuffix}-${sanitizedName}`;
    const filePath = path.join(uploadsDir, filename);

    fs.writeFileSync(filePath, buffer);

    const publicUrl = `/uploads/${filename}`;
    return NextResponse.json({
      success: true,
      url: publicUrl,
      publicId: filename,
      storage: "local",
      message: "Uploaded locally.",
    });
  } catch (error: any) {
    console.error("Upload handler error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to upload image." },
      { status: 500 }
    );
  }
}
