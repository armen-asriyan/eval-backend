// Import the User model
import User from "../models/User.js";

// Import the function to hash and compare passwords
import { comparePassword, hashPassword } from "../services/hashPassword.js";

import { v4 as uuidv4 } from "uuid"; // Random UUID generator for refresh token

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
      return next({ statusCode: 400, message: "All fields are required" });
    }

    // Search for the user by email
    const user = await User.findOne({ email })
      .select("+password")
      .populate("skills");

    //#region <Check if the user exists -- old syntax>

    // if (!user) {
    //   return next({
    //     statusCode: 401,
    //     message: "Invalid email or password",
    //   });
    // }

    // // Compare the password
    // const isMatch = await comparePassword(password, user.password);

    // if (!isMatch) {
    //   return next({
    //     statusCode: 401,
    //     message: "Invalid email or password",
    //   });
    // }
    //#endregion

    // Check if the user exists -- new shorter syntax
    if (!user || !(await comparePassword(password, user.password))) {
      return next({ statusCode: 401, message: "Invalid email or password" });
    }

    // Generate an access jwt
    const accessToken = generateToken(user._id);

    // Generate a UUID for refresh
    const refreshToken = uuidv4();

    user.refreshToken = refreshToken;

    // Save the user
    await user.save();

    // Acess token (short-lived, will contain user data)
    res.cookie("accessToken", accessToken, {
      httpOnly: true, // Secure the cookie
      secure: process.env.NODE_ENV === "production", // Use https only in production
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // Cors policy only in production
      maxAge: 15 * 60 * 1000, // Cookie lifetime (15 minutes)
    });

    // Refresh token (long-lived, will not contain user data)
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true, // Secure the cookie
      secure: process.env.NODE_ENV === "production", // Use https only in production
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // Cors policy only in production
      maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie lifetime (7 days)
    });

    // Send a confirmation message
    res.status(200).json({ message: "User authenticated", user, accessToken });
  } catch (error) {
    next(error);
  }
};

// Function to refresh the access token
export const refreshToken = async (req, res, next) => {
  try {
    // Get the refresh token from the cookies
    const { refreshToken } = req.cookies;

    // Check if the refresh token is present
    if (!refreshToken) {
      return next({ statusCode: 400, message: "Refresh token not found" });
    }

    // Find user having the refresh token in the database
    const user = await User.findOne({ refreshToken });

    // Check if the user exists
    if (!user) {
      return next({ statusCode: 400, message: "User not found" });
    }

    // Generate a new access token
    const newAccessToken = generateToken(user._id); // Generate a new access token
    const newRefreshToken = uuidv4(); // Generate a new refresh token

    // Update the user's refresh token
    user.refreshToken = newRefreshToken;
    await user.save();

    // Send the new cookies

    // Acess token (short-lived, will contain user data)
    res.cookie("accessToken", newAccessToken, {
      httpOnly: true, // Secure the cookie
      secure: process.env.NODE_ENV === "production", // Use https only in production
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // Cors policy only in production
      maxAge: 15 * 60 * 1000, // Cookie lifetime (15 minutes)
    });

    // Refresh token (long-lived, will not contain user data)
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true, // Secure the cookie
      secure: process.env.NODE_ENV === "production", // Use https only in production
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // Cors policy only in production
      maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie lifetime (7 days)
    });

    // Send the new access token
    res
      .status(200)
      .json({ message: "Token refreshed", accessToken: newAccessToken });
  } catch (error) {}
};

// Function to log out the user
export const logoutUser = async (req, res, next) => {
  try {
    const { accessToken } = req.cookies;

    // Only logout if the access token is present
    if (accessToken) {
      // Clear the access token cookie
      res.clearCookie("accessToken", {
        httpOnly: true, // Secure the cookie
        secure: process.env.NODE_ENV === "production", // Use https only in production
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // Cors policy only in production
        path: "/", // Cookie path
      });

      // Clear the refresh token cookie
      res.clearCookie("refreshToken", {
        httpOnly: true, // Secure the cookie
        secure: process.env.NODE_ENV === "production", // Use https only in production
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // Cors policy only in production
        path: "/", // Cookie path
      });

      // Send a confirmation message
      res.status(200).json({ message: "Logout successful" });
    }
  } catch (error) {
    next(error);
  }
};
