// Import express
import express from "express";

// Import the controller
import {
  createSkill,
  getSkills,
  // getSingleSkill,
  updateSkill,
  deleteSkill,
} from "../controllers/SkillController.js";

// Import validation rules
import {
  // getSkillsRules,
  createSkillRules,
  updateSkillRules,
  deleteSkillRules,
} from "../validations/skillValidations.js";

// Import the middlewares
import protect from "../middlewares/protect.js";
import isAdmin from "../middlewares/isAdmin.js";
import upload from "../middlewares/uploadMiddleware.js";
import validateRequest from "../middlewares/validateRequest.js";

// Configure the router
const router = express.Router();

// Get all skills
router.get("/", getSkills);

// Get all skills of logged in user
// router.get("/", protect, isAdmin, getSkillsRules, validateRequest, getSkills);

// Create a new skill
router.post(
  "/",
  protect,
  isAdmin,
  upload.single("image"),
  createSkillRules,
  validateRequest,
  createSkill
);

// Get a single skill by id
// router.get("/:id", protect, getSingleSkill);

// Update a skill
router.put(
  "/:id",
  protect,
  isAdmin,
  upload.single("image"),
  updateSkillRules,
  validateRequest,
  updateSkill
);

// Delete a skill
router.delete(
  "/:id",
  protect,
  isAdmin,
  deleteSkillRules,
  validateRequest,
  deleteSkill
);

// Export the router instance
export default router;
