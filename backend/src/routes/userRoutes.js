// Import express
import express from "express";

// Importer le controleur UserController
import {
  registerUser,
  loginUser,
  logoutUser,
} from "../controllers/UserController.js";

// Importer les validations
import {
  registerUserRules,
  loginUserRules,
} from "../validations/authValidations.js";

// Importer les middlewares
import validateRequest from "../middlewares/validateRequest.js";
import protect from "../middlewares/protect.js";

// Créer un routeur
const router = express.Router();

// Route pour créer un nouvel utilisateur (l'owner de portfolio), cette route est accessible seulement par l'admin
router.post("/register", registerUserRules, validateRequest, registerUser);

// Route pour authentifier un utilisateur
router.post("/login", loginUserRules, validateRequest, loginUser);

// Route pour la déconnexion de l'utilisateur
router.post("/logout", logoutUser);

// Route pour récupérer un utilisateur connecté (pour le traiter en frontend)
router.get("/check", protect, (req, res) =>
  res.status(200).json({ isAuth: true, user: req.user })
);

// Exporter le routeur
export default router;
