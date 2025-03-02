// Import express-validator
import { body, param } from "express-validator";

// Validation rules for registerUser
export const registerUserRules = [
  body("name")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("The name is required")
    .isLength({ min: 3, max: 50 })
    .withMessage(
      "The name must have at least 3 characters and at most 50 characters"
    ),
  body("email")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Enter a valid email address"),

  body("password")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("The password is required")
    .isLength({ min: 6, max: 200 })
    .withMessage(
      "The password must have at least 6 characters and at most 200 characters"
    ),

  body("role")
    .optional() // User schema has a default role
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Role must be a non-empty string")
    .isIn(["user", "admin"])
    .withMessage("The role must be either user or admin"),
];

// Validation rules for loginUser
export const loginUserRules = [
  body("email")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Enter a valid email address"),

  body("password")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("The password is required"),
];
