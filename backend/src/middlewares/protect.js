// Import jsonwebtoken
import jwt from "jsonwebtoken";

// Import User model
import User from "../models/User.js";

// Middleware to check if the user is logged in
const protect = async (req, res, next) => {
  // Get token from cookie
  const token = req.cookies.token;

  // If token is not present, return an error
  if (!token) {
    return res.status(401).json({ message: "User is not logged in" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // If the token is not valid, return an error
    if (!decoded) {
      return res.status(401).json({ message: "Invalid token" });
    }

    // Find the user in the database
    const user = await User.findById(decoded.id).select("-password");

    // If the user is not found, return an error
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Set the user in the request
    req.user = user;

    // If the user is found, continue
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error during token verification" });
  }
};

// Export the middleware
export default protect;
