// Importer mongoose
import mongoose from "mongoose";

export let possibleCategories = [
  "software",
  "hardware",
  "langage",
  "frontend",
  "backend",
  "autres",
];

export let possibleLevels = ["debutant", "intermediaire", "expert"];

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
    trim: true,
    required: [true, "La categorie est requise"],
    enum: possibleCategories,
    default: "autres",
  },
  level: {
    // Niveau de skill
    type: String,
    trim: true,
    required: [true, "Le niveau est requis"],
    enum: possibleLevels,
  },
  image_URL: {
    // URL de l'image (Cloudinary)
    public_id: String,
    url: String,
  },
  userId: {
    // Utilisateur qui a ajouté le skill
    type: mongoose.Schema.Types.ObjectId, // ID de l'utilisateur
    ref: "User",
    required: [true, "L'utilisateur est requis"],
  },
});

// Ajouter une fonction statique pour obtenir les categories possibles
skillSchema.statics.getPossibleCategories = function () {
  return possibleCategories;
};

// Créer un modele de skill
const Skill = mongoose.model("Skill", skillSchema);

// Exporter le modele
export default Skill;
