// Import express
import express from "express";

// Import the controller
import {
  registerUser,
  loginUser,
  logoutUser,
} from "../controllers/UserController.js";

// Import validation rules
import {
  registerUserRules,
  loginUserRules,
} from "../validations/authValidations.js";

// Import the middlewares

// Middleware to validate request (express-validator)
import validateRequest from "../middlewares/validateRequest.js";

// Middleware to check if the user is logged in (jwt)
import protect from "../middlewares/protect.js";

// Middleware to limit the number of login attempts (express-rate-limit)
import loginlimiter from "../middlewares/rateLimiter.js";

// Middleware to verify reCAPTCHA (reCAPTCHA)
import validateCaptcha from "../middlewares/validateCaptcha.js";

// Create a router instance
const router = express.Router();

// Route to register a new user (only for admin, for now)
router.post("/register", registerUserRules, validateRequest, registerUser);

// Route to login a user
router.post(
  "/login",
  loginUserRules,
  validateRequest,
  loginlimiter,
  validateCaptcha,
  loginUser
);

// Route to logout a user
router.post("/logout", logoutUser);

// Route to check if the user is logged in
router.get("/check", protect, (req, res) =>
  res.status(200).json({ isAuth: true, user: req.user })
);

// Export router instance
export default router;
