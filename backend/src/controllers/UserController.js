// Import the User model
import User from "../models/User.js";

// Import the function to hash and compare passwords
import { comparePassword, hashPassword } from "../services/hashPassword.js";

// Import the function to generate a JWT token
import generateToken from "../utils/tokenUtil.js";

// Function to create a new user this function is accessible only by admin (for now)
export const registerUser = async (req, res, next) => {
  try {
    // Check if there is already an admin
    const admin = await User.findOne({ role: "admin" });

    if (admin) {
      return next({
        statusCode: 400,
        message: "Only one admin is allowed during initial setup",
      });
    }

    // Destructure the data from the request body
    const { name, email, password, role } = req.body;

    // Check if the required fields are present
    if (!name || !email || !password) {
      return next({
        statusCode: 400,
        message: "All fields are required",
      });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return next({
        statusCode: 400,
        message: "User already exists",
      });
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create a new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    // Return a confirmation message
    res.status(201).json({ message: "Utilisateur enregistré", user });
  } catch (error) {
    next(error);
  }
};

// Function to authenticate a user
export const loginUser = async (req, res, next) => {
  try {
    // Destructure the data from the request body
    const { email, password } = req.body;

    // Vérifier si les champs sont présents
    if (!email || !password) {
      return next({
        statusCode: 400,
        message: "All fields are required",
      });
    }

    // Search for the user by email
    const user = await User.findOne({ email })
      .select("+password")
      .populate("skills");

    // Check if the user exists
    if (!user) {
      return next({
        statusCode: 401,
        message: "Invalid email or password",
      });
    }

    // Compare the password
    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      return next({
        statusCode: 401,
        message: "Invalid email or password",
      });
    }

    // Generate a JWT token
    const token = generateToken(user._id);

    // Send the JWT token in a cookie
    res.cookie("token", token, {
      httpOnly: true, // Secure the cookie
      secure: process.env.NODE_ENV === "production", // Use https only in production
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // Cors policy only in production
      maxAge: 24 * 60 * 60 * 1000, // Cookie lifetime (1 day)
    });

    // Send a confirmation message
    res.status(200).json({ message: "User authenticated", user, token });
  } catch (error) {
    next(error);
  }
};

// Function to log out the user
export const logoutUser = async (req, res, next) => {
  try {
    // Check if the user is logged in
    if (!req.cookies.token) {
      return res.status(400).json({ message: "User is not logged in" });
    }

    // Clear the login cookie
    res.clearCookie("token", {
      httpOnly: true, // Secure the cookie
      secure: process.env.NODE_ENV === "production", // Use https only in production
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // Cors policy only in production
      path: "/", // Cookie path
    });

    // Send a confirmation message
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    next(error);
  }
};
