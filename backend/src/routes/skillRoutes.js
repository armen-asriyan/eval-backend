// Importer express
import express from "express";

// Importer les controllers
import {
  createSkill,
  getSkills,
  // getSingleSkill,
  updateSkill,
  deleteSkill,
} from "../controllers/SkillController.js";

// Importer les validations
import {
  getSkillsRules,
  createSkillRules,
  updateSkillRules,
  deleteSkillRules,
} from "../validations/skillValidations.js";

// Importer les middlewares
import protect from "../middlewares/protect.js";
import isAdmin from "../middlewares/isAdmin.js";
import upload from "../middlewares/uploadMiddleware.js";
import validateRequest from "../middlewares/validateRequest.js";

// Créer un routeur
const router = express.Router();

// Récupérer tous les skills
// router.get("/", protect, isAdmin, getSkillsRules, validateRequest, getSkills);
router.get("/", getSkills);

// Créer une route pour créer un skill
router.post(
  "/",
  protect,
  isAdmin,
  upload.single("image"),
  createSkillRules,
  validateRequest,
  createSkill
);

// Récupérer
// router.get("/:id", protect, getSingleSkill);

// Modifier un skill
router.put(
  "/:id",
  protect,
  isAdmin,
  upload.single("image"),
  updateSkillRules,
  validateRequest,
  updateSkill
);

// Supprimer un skill
router.delete(
  "/:id",
  protect,
  isAdmin,
  deleteSkillRules,
  validateRequest,
  deleteSkill
);

// Exporter le routeur
export default router;
