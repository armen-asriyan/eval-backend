import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protect = async (req, res, next) => {
  try {
    // Get token stored in cookies
    const { accessToken } = req.cookies;

    if (!accessToken) {
      return res.status(401).json({
        isAuthenticated: false,
        message: "No token provided",
      });
    }

    // Decode the token
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);

    // If the token is not valid, return error 401
    if (!decoded) {
      return res.status(401).json({ message: "Not authorized" });
    }

    // Find the user in the database, not including the password
    const user = await User.findById(decoded.id).select("-password");

    // If user not found, return error 401 (making this a protected route and a strict middleware)
    if (!user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    // Set req.user
    req.user = user;

    // Pass to next middleware
    next();
  } catch (error) {
    next(error);
  }
};

export default protect;
