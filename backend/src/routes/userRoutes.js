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

// Middleware to check if the user is logged in (strict middleware)
// import protect from "../middlewares/protect.js";

// Middleware to check if the user is an admin (permissive middleware)
import checkAuth from "../middlewares/checkAuth.js";

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
  validateCaptcha,
  loginlimiter, // Limit login attempts to 5 per 5 minutes
  loginUser
);

// Route to logout a user
router.post("/logout", logoutUser);

// Route to check if the user is logged in
router.get("/check", checkAuth, (req, res) => {
  // const user = Boolean(req.user); // Convert req.user to boolean (same as !!req.user)

  /**
   * @description Responds with authentication status and user data.
   * @returns {Object} A JSON response containing authentication status and user info.
   * @property {boolean} isAuth - Whether the user is authenticated; true if req.user is truthy, false if falsy (e.g., null, undefined, 0, "", false, NaN).
   * @property {Object|null} user - The user object from req.user, or null if no user exists.
   */
  res.status(200).json({ isAuth: !!req.user, user: req.user || null });
});

// Export router instance
export default router;
