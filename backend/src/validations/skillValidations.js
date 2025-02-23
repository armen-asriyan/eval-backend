// Importexpress-validator
import { body, param, check } from "express-validator";
import { POSSIBLE_CATEGORIES, POSSIBLE_LEVELS } from "../models/Skill.js";

// Validation rules for getSkills
export const getSkillsRules = [
  check("token").exists().withMessage("User is not logged in"),
];

// Les regles de validation pour createSkill
export const createSkillRules = [
  check("token").exists().withMessage("User is not logged in"),

  body("title")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("The title is required")
    .isLength({ min: 3, max: 50 })
    .withMessage(
      "The title must have at least 3 characters and at most 50 characters"
    ),

  body("category")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("The category is required")
    .isIn(Object.keys(POSSIBLE_CATEGORIES)),

  body("level")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("The level is required")
    .isIn(Object.keys(POSSIBLE_LEVELS)),
];

// Validation rules for updateSkill
export const updateSkillRules = [
  check("token").exists().withMessage("User is not logged in"),

  param("id").isMongoId().withMessage("Skill id is not valid"),

  body("title")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("The title is required")
    .isLength({ min: 3, max: 50 })
    .withMessage(
      "Title must have at least 3 characters and at most 50 characters"
    ),

  body("category")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("The category is required")
    .isIn(Object.keys(POSSIBLE_CATEGORIES)),

  body("level")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("The level is required")
    .isIn(Object.keys(POSSIBLE_LEVELS)),
];

// Validation rules for deleteSkill
export const deleteSkillRules = [
  check("token").exists().withMessage("User is not logged in"),

  param("id").isMongoId().withMessage("Skill id is not valid"),
];
