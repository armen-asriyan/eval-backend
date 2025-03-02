// Import mongoose
import mongoose from "mongoose";

// MAP object with possible categories
export const POSSIBLE_CATEGORIES = {
  frontend: "Competences Frontend",
  backend: "Competences Backend",
  fullstack: "Competences Fullstack",
  devops: "DevOps",
  autres: "Autres Competences",
};

const lastIndex = Object.keys(POSSIBLE_CATEGORIES).length - 1;

// MAP object with possible levels
export const POSSIBLE_LEVELS = {
  debutant: "Debutant",
  intermediaire: "Intermédiaire",
  expert: "Expert",
};

// Create a skill schema
const skillSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      minLength: [3, "The title must have at least 3 characters"],
      maxLength: [50, "The title must have at most 50 characters"],
      required: [true, "The title is required"],
    },
    category: {
      type: String,
      required: [true, "The category is required"],
      enum: Object.keys(POSSIBLE_CATEGORIES),
      default: Object.keys(POSSIBLE_CATEGORIES)[lastIndex],
      lowercase: true,
    },
    level: {
      type: String,
      required: [true, "The level is required"],
      enum: Object.keys(POSSIBLE_LEVELS),
      default: Object.keys(POSSIBLE_LEVELS)[0],
    },
    image_URL: {
      // Cloudinary image URL
      public_id: {
        type: String,
        default: "",
      },
      secure_url: {
        type: String,
        default: "",
      },
    },
    userId: {
      // User who created the skill
      type: mongoose.Schema.Types.ObjectId, // User ID
      ref: "User",
      required: [true, "User is required"],
    },
  },
  { timestamps: true }
);

// Create the model
const Skill = mongoose.model("Skill", skillSchema);

// Export the model
export default Skill;
