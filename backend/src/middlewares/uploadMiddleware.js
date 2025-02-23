// Import multer to handle file uploads
import multer from "multer";

// Configure multer to store files in RAM
const storage = multer.memoryStorage();

// Function to filter files
const fileFilter = (req, file, cb) => {
  // Allowed file types
  const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

  // If the file type is not allowed
  if (!file.mimetype || !allowedTypes.includes(file.mimetype)) {
    return cb(
      new Error(
        `File format not allowed, allowed formats: ${allowedTypes.join(", ")}`
      )
    );
  }

  /**
   * cb(error, acceptFile)
   * - error : Pass the error object
   * - acceptFile : Pass true if the file is accepted
   */
  cb(null, true);
};

/**
 * @property {Object} storage : Configure the storage (RAM, in this case)
 * @property {Object} limits : Limit file size
 * @property {Object} fileFilter : Use the fileFilter function
 * @returns File stored in RAM (buffer)
 */
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter,
});

// Export multer
export default upload;
