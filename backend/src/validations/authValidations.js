// Importer express-validator
import { body, param } from "express-validator";

// Les regles de validation pour registerUser
export const registerUserRules = [
  body("name")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Le nom est obligatoire")
    .isLength({ min: 3, max: 50 })
    .withMessage(
      "Le nom doit avoir au moins 3 caractères et au plus 50 caractères"
    ),
  body("email")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("L'email est obligatoire")
    .isEmail()
    .withMessage("Veuillez entrer une adresse email valide"),

  body("password")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Le mot de passe est obligatoire")
    .isLength({ min: 6, max: 200 })
    .withMessage(
      "Le mot de passe doit avoir au moins 6 caractères et au plus 200 caractères"
    ),

  body("role")
    .isString()
    .trim()
    // Verifier le role même si par defaut il est user
    .notEmpty()
    .withMessage("Le role est obligatoire")
    .isIn(["user", "admin"])
    .withMessage("Le role doit etre user ou admin")
    .default("user"), // Par defaut l'utilisateur est un user
];

// Les regles de validation pour loginUser
export const loginUserRules = [
  body("email")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("L'email est obligatoire")
    .isEmail()
    .withMessage("Veuillez entrer une adresse email valide"),

  body("password")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Le mot de passe est obligatoire"),
];
