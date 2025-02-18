// Importer le modele d'utilisateur
import User from "../models/User.js";

// Middleware pour verifier si l'utilisateur est un admin
const isAdmin = async (req, res, next) => {
  try {
    // Récupérer l'id de l'utilisateur de la requête
    const userId = req.user;

    // Trouver l'utilisateur dans la base de donnée
    const user = await User.findById(userId);

    // Si l'utilisateur n'existe pas, renvoyer une erreur
    if (!user) {
      return res.status(404).json({ error: "Utilisateur introuvable" });
    }

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
