// Importer le modèle d'utilisateur
import User from "../models/User.js";

// Importer la fonction pour hacher et comparer le mot de passe
import { comparePassword, hashPassword } from "../services/hashPassword.js";

// Importer la fonction pour générer un token JWT
import generateToken from "../utils/tokenUtil.js";

// Fonction pour créer un nouvel utilisateur (l'owner de portfolio), cette fonction est accessible seulement par l'admin
export const registerUser = async (req, res, next) => {
  try {
    // Code pour verifier si il y a deja un admin
    const admin = await User.findOne({ role: "admin" });

    if (admin) {
      return next({
        statusCode: 400,
        message: "Admin existant, création impossible",
      });
    }

    // Destructurer les données du corps de la requête
    const { name, email, password, role } = req.body;

    // Vérifier si les champs obligatoires sont présents
    if (!name || !email || !password) {
      return next({
        statusCode: 400,
        message: "Tous les champs sont obligatoires",
      });
    }

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next({
        statusCode: 400,
        message: "Utilisateur existant",
      });
    }

    // Hasher le mot de passe
    const hashedPassword = await hashPassword(password);

    // Créer un nouvel utilisateur
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    // Renvoyer un message de confirmation
    res.status(201).json({ message: "Utilisateur enregistré", user });
  } catch (error) {
    next(error);
  }
};

// Fonction pour authentifier un utilisateur
export const loginUser = async (req, res, next) => {
  try {
    // Destructurer les données du corps de la requête
    const { email, password } = req.body;

    // Vérifier si les champs sont présents
    if (!email || !password) {
      return next({
        statusCode: 400,
        message: "Tous les champs sont obligatoires",
      });
    }

    // Rechercher l'utilisateur par son adresse email
    const user = await User.findOne({ email })
      .select("+password")
      .populate("skills");

    // Vérifier si l'utilisateur existe
    if (!user) {
      return next({
        statusCode: 401,
        message: "Identifiants incorrects",
      });
    }

    // Comparer le mot de passe
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return next({
        statusCode: 401,
        message: "Identifiants incorrects",
      });
    }

    // Générer un token JWT
    const token = generateToken(user._id);

    // Renvoyer le token JWT en cookie
    res.cookie("token", token, {
      httpOnly: true, // Sécuriser le cookie
      secure: process.env.NODE_ENV === "production", // Seulement en mode production
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000, // Duree de vie du cookie (1 jour)
    });

    // Envoyer un message de confirmation
    res.status(200).json({ message: "Utilisateur authentifié", user, token });
  } catch (error) {
    next(error);
  }
};

// Fonction pour la déconnexion de l'utilisateur
export const logoutUser = async (req, res, next) => {
  try {
    // Effacer le cookie de connexion
    res.clearCookie("token", { httpOnly: true, path: "/" });

    // Renvoyer un message de confirmation
    res.status(200).json({ message: "Utilisateur déconnecté" });
  } catch (error) {
    next(error);
  }
};
