import { v2 as cloudinary } from "cloudinary";

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

export function getCloudinaryClient() {
  const cName = process.env.CLOUDINARY_CLOUD_NAME;
  const aKey = process.env.CLOUDINARY_API_KEY;
  const aSecret = process.env.CLOUDINARY_API_SECRET;

  if (cName && aKey && aSecret) {
    cloudinary.config({
      cloud_name: cName,
      api_key: aKey,
      api_secret: aSecret,
      secure: true,
    });
    return cloudinary;
  }
  return null;
}

export const isCloudinaryConfigured = Boolean(
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET
);

export async function uploadToCloudinary(
  fileBuffer: Buffer,
  folder: string = "experience-life",
  filename?: string
): Promise<{ url: string; publicId: string }> {
  const client = getCloudinaryClient();
  if (!client) {
    throw new Error("Cloudinary credentials are not configured in environment variables.");
  }

  // Create clean, unique public_id
  const baseName = filename
    ? filename.replace(/\.[^/.]+$/, "").replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 50)
    : "asset";
  const uniqueId = `${Date.now()}-${baseName}`;

  return new Promise((resolve, reject) => {
    const uploadStream = client.uploader.upload_stream(
      {
        folder,
        public_id: uniqueId,
        resource_type: "image",
        transformation: [{ quality: "auto", fetch_format: "auto" }],
      },
      (error, result) => {
        if (error || !result) {
          reject(error || new Error("Failed to upload image to Cloudinary."));
        } else {
          resolve({
            url: result.secure_url,
            publicId: result.public_id,
          });
        }
      }
    );

    uploadStream.end(fileBuffer);
  });
}

export function getOptimizedImageUrl(
  publicIdOrUrl: string,
  width?: number,
  height?: number
): string {
  if (!publicIdOrUrl) return "";
  if (!isCloudinaryConfigured || publicIdOrUrl.startsWith("/images/")) {
    return publicIdOrUrl;
  }
  // If it's a Cloudinary URL or public ID
  if (publicIdOrUrl.includes("res.cloudinary.com")) {
    const transform = [
      "f_auto",
      "q_auto",
      width ? `w_${width}` : "",
      height ? `h_${height}` : "",
    ]
      .filter(Boolean)
      .join(",");
    return publicIdOrUrl.replace("/upload/", `/upload/${transform}/`);
  }
  return publicIdOrUrl;
}
