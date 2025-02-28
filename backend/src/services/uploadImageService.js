// Import dependencies
import cloudinary from "../config/cloudinary.js";

// Define placeholder image id
const placeholderImageID = "skills/autres/skill-placeholder";

export const uploadImage = async (file, category) => {
  // If file not found, return placeholder
  if (!file) {
    return {
      public_id: "skills/autres/skill-placeholder",
      secure_url:
        "https://res.cloudinary.com/dglygoy4z/image/upload/v1739877977/skills/autres/skill-placeholder.webp",
    };
  }

  // Upload image
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: `skills/${category}`,
          transformation: [
            { quality: "auto" },
            { fetch_format: "auto" },
            { width: 1200, height: 1200, crop: "limit" },
          ],
        },
        (error, result) => (error ? reject(error) : resolve(result))
      )
      .end(file.buffer);
  });
};

// Delete image function
export const deleteImage = async (publicId) => {
  // If public id not found or it's the placeholder image, return
  if (!publicId || publicId === placeholderImageID) return;
  // Delete image
  await cloudinary.uploader.destroy(publicId);
};
