// Importer express-validator
import { body, param, check } from "express-validator";
import { possibleCategories, possibleLevels } from "../models/Skill.js";

// Les regles de validation pour getSkills
export const getSkillsRules = [
  check("token").exists().withMessage("Utilisateur non connecté"),
];

// Les regles de validation pour createSkill
export const createSkillRules = [
  check("token").exists().withMessage("Utilisateur non connecté"),

  body("title")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Le titre est obligatoire")
    .isLength({ min: 3, max: 50 })
    .withMessage(
      "Le titre doit avoir au moins 3 caractères et au plus 50 caractères"
    ),

  body("category")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("La categorie est obligatoire")
    .isIn(possibleCategories)
    .withMessage(
      "La categorie doit avoir au moins 3 caractères et au plus 50 caractères"
    ),

  body("level")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Le niveau est obligatoire")
    .isIn(possibleLevels),
];

// Les regles de validation pour updateSkill
export const updateSkillRules = [
  check("token").exists().withMessage("Utilisateur non connecté"),

  param("id").isMongoId().withMessage("L'id du skill est incorrect"),

  body("title")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Le titre est obligatoire")
    .isLength({ min: 3, max: 50 })
    .withMessage(
      "Le titre doit avoir au moins 3 caractères et au plus 50 caractères"
    ),

  body("category")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("La categorie est obligatoire")
    .isIn(possibleCategories)
    .withMessage(
      "La categorie doit avoir au moins 3 caractères et au plus 50 caractères"
    ),

  body("level")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Le niveau est obligatoire")
    .isIn(possibleLevels),
];

// Les regles de validation pour deleteSkill
export const deleteSkillRules = [
  check("token").exists().withMessage("Utilisateur non connecté"),
];
