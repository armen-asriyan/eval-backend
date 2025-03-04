// Import mongoose
import mongoose from "mongoose";

// Possible roles
export let possibleRoles = ["admin", "user"];

// Define the user schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      minLength: [3, "The name must have minimum 3 characters"],
      maxLength: [50, "The name must have maximum 50 characters"],
      required: [true, "The name is required"],
    },
    email: {
      type: String,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"], // example: "V1L0T@example.com"
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      trim: true,
      minLength: [6, "The password must have minimum 6 characters"],
      maxLength: [200, "The password must have maximum 200 characters"],
      required: [true, "The password is required"],
      select: false,
    },
    role: {
      type: String,
      enum: possibleRoles,
      default: "user",
      required: [true, "The role is required"],
    },
    // Relation many-to-many with Skill
    skills: [{ type: mongoose.Schema.Types.ObjectId, ref: "Skill" }],
    // Refresh token
    refreshToken: { type: String, default: "", unique: true, select: false },
  },
  { timestamps: true } // Add timestamps
);

// Create an index on the skills field
userSchema.index({ skills: 1 });

// Create the model
const User = mongoose.model("User", userSchema);

// Export the model
export default User;
