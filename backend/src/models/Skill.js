// Importer mongoose
import mongoose from "mongoose";

export const POSSIBLE_CATEGORIES = {
  frontend: "Competences Frontend",
  backend: "Competences Backend",
  fullstack: "Competences Fullstack",
  devops: "DevOps",
  autres: "Autres Competences",
};

export const POSSIBLE_LEVELS = {
  debutant: "Debutant",
  intermediaire: "Intermédiaire",
  expert: "Expert",
};

// Créer un schéma de skills (de l'owner de portfolio)
const skillSchema = new mongoose.Schema({
  title: {
    // Titre de skill
    type: String,
    trim: true,
    minLength: [3, "Le titre doit avoir au moins 3 caractères"],
    maxLength: [50, "Le titre doit avoir au plus 50 caractères"],
    required: [true, "Le titre est requis"],
  },
  category: {
    // Categorie de skill
    type: String,
    required: [true, "La categorie est requise"],
    enum: Object.keys(POSSIBLE_CATEGORIES),
    default: "autres",
    lowercase: true,
  },
  level: {
    // Niveau de skill
    type: String,
    required: [true, "Le niveau est requis"],
    enum: Object.keys(POSSIBLE_LEVELS),
    default: "debutant",
  },
  image_URL: {
    // URL de l'image (Cloudinary)
    public_id: {
      type: String,
      default: "",
    },
    url: {
      type: String,
      default: "",
    },
  },
  userId: {
    // Utilisateur qui a ajouté le skill
    type: mongoose.Schema.Types.ObjectId, // ID de l'utilisateur
    ref: "User",
    required: [true, "L'utilisateur est requis"],
  },
});

// Créer un modele de skill
const Skill = mongoose.model("Skill", skillSchema);

// Exporter le modele
export default Skill;
