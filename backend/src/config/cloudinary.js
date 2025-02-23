// Import cloudinary
import { v2 as cloudinary } from "cloudinary";

// Check if Cloudinary environment variables are set
if (
  !process.env.CLOUDINARY_NAME ||
  !process.env.CLOUDINARY_API_KEY ||
  !process.env.CLOUDINARY_API_SECRET
) {
  throw new Error("Missing Cloudinary environment variables");
}

// Create Cloudinary instance
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true, // Return secure URLs
});

// Export Cloudinary instance
export default cloudinary;
