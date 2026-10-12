import { v2 as cloudinary } from "cloudinary";

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

export const isCloudinaryConfigured = Boolean(cloudName && apiKey && apiSecret);

if (isCloudinaryConfigured) {
  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  });
}

export async function uploadToCloudinary(
  fileBuffer: Buffer,
  folder: string = "experience-life",
  filename?: string
): Promise<{ url: string; publicId: string }> {
  if (!isCloudinaryConfigured) {
    throw new Error("Cloudinary credentials are not configured in environment variables.");
  }

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        public_id: filename ? filename.replace(/\.[^/.]+$/, "") : undefined,
        resource_type: "auto",
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
