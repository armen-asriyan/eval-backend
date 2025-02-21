// Importer le modele d'utilisateur
import User from "../models/User.js";

// Middleware pour verifier si l'utilisateur est un admin
const isAdmin = async (req, res, next) => {
  try {
    // Récupérer l'id de l'utilisateur de la requête
    const user = req.user;

    // Si l'utilisateur n'est pas un admin, renvoyer une erreur
    if (user.role !== "admin") {
      return res.status(401).json({ error: "Vous n'avez pas les droits" });
    }

    // Si l'utilisateur est un admin, passer au middleware suivant
    next();
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur lors de la verification de role", error });
  }
};

export default isAdmin;
