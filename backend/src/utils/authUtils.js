import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Util to verify and get user from token

/**
 * @param {string} token - The JWT token from the request.
 * @returns {Promise<Object|null>} The user object if valid, null if invalid or not found.
 */
export const verifyTokenAndGetUser = async (token) => {
  // Chek if token is passed as a function argument
  if (!token) return null;

  // Try to verify the token
  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if the token is valid
    if (!decoded || !decoded.id) return null;

    // Find the user in the database, not including the password
    const user = await User.findById(decoded.id).select("-password");

    // Return the user or null if not found
    return user || null;
  } catch (error) {
    console.error("Token verification error:", error);
    return null;
  }
};
