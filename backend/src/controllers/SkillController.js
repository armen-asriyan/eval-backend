// Importer mongoose
import { isValidObjectId } from "mongoose";

// Importer le modele User
import User from "../models/User.js";

// Importer le modele Skills
import Skill, {
  POSSIBLE_CATEGORIES,
  POSSIBLE_LEVELS,
} from "../models/Skill.js";

// Importer le config de cloudinary
import cloudinary from "../config/cloudinary.js";

// Importer multer configuré
// import upload from "../middlewares/uploadMiddleware.js";

// Importer la fonction pour récupere le type du fichier
import { fileTypeFromBuffer } from "file-type";

// Récuperer les skills d'un utilisateur (L'owner de portfolio)
export const getSkills = async (req, res, next) => {
  try {
    // Récuperer l'id de l'utilisateur de la requête
    // const userId = req.user;

    // Valider l'id
    // if (!isValidObjectId(userId)) {
    //   return res.status(404).json({ error: "Utilisateur introuvable" });
    // }

    // Trouver l'utilisateur dans la base de donnée
    // const user = await User.findById(userId);

    // Si l'utilisateur n'existe pas, renvoyer une erreur
    // if (!user) {
    //   return res.status(404).json({ error: "Utilisateur introuvable" });
    // }

    // Récuperer les skills de l'utilisateur
    const skills = await Skill.find({});

    // Renvoyer les skills
    res.status(200).json({
      message: `Les skills :`,
      skills,
      categories: POSSIBLE_CATEGORIES,
      levels: POSSIBLE_LEVELS,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// Créer un skill (de l'owner de portfolio)
export const createSkill = async (req, res, next) => {
  try {
    // Récupérer le fichier
    const file = req.file;

    // Destructurer le corps de la requête
    const { title, category, level } = req.body;

    // Récuperer l'id de l'utilisateur de la requête
    const userId = req.user;

    // Valider l'id
    if (!isValidObjectId(userId)) {
      return res.status(404).json({ error: "Utilisateur introuvable" });
    }

    // Trouver l'utilisateur dans la base de donnée
    const user = await User.findById(userId);

    // Si l'utilisateur n'existe pas, renvoyer une erreur
    if (!user) {
      return res.status(404).json({ error: "Utilisateur introuvable" });
    }

    let public_id, secure_url;

    if (file) {
      // Déterminer le mimetype
      const { mime } = await fileTypeFromBuffer(file.buffer);

      // Si le mimetype n'est pas autorisé, renvoyer une erreur
      if (!mime) {
        return res
          .status(400)
          .json({ message: "Le format du fichier non autorisé" });
      }

      // Uploader le fichier sur cloudinary
      const uploadResult = await new Promise((resolve, reject) => {
        // Promise pour utiliser async/await
        cloudinary.uploader
          .upload_stream(
            { folder: `skills/${category}` }, // Nom du dossier dynamique basé sur la catégorie du skill créé
            (error, uploadResult) => {
              if (error) reject(error);
              resolve(uploadResult); // Retourner l'info de l'upload (public_id et secure_url)
            }
          )
          .end(file.buffer); // Uploader sur cloudinary
      });

      // Stocker public_id et url dans une variable
      ({ public_id, secure_url } = uploadResult);
    } else {
      // Utiliser l'image de placeholder
      public_id = "skills/autres/skill-placeholder";
      secure_url =
        "https://res.cloudinary.com/dglygoy4z/image/upload/v1739877977/skills/autres/skill-placeholder.webp";
    }

    // Créer un nouveau skill
    const newSkill = await Skill.create({
      title,
      category,
      level,
      image_URL: {
        public_id,
        secure_url,
      },
      userId,
    });

    // Ajouter le skill au tableau des skills de l'utilisateur
    user.skills.push(newSkill._id);
    await user.save();

    // Renvoyer le nouveau skill
    res.status(201).json({
      message: `Le skill ${newSkill.title} a bien été crée pour ${user.name}`,
      skill: newSkill,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// Modifier un skill (de l'owner de portfolio) TODO:
export const updateSkill = async (req, res, next) => {
  try {
    const { id: skillId } = req.params;

    // Récupérer le fichier
    const file = req.file;

    // Destructurer le corps de la requête
    const { title, category, level } = req.body;

    // Récuperer l'id de l'utilisateur de la requête
    const userId = req.user;

    // Valider l'id
    if (!isValidObjectId(userId)) {
      return res.status(404).json({ error: "Utilisateur introuvable" });
    }

    // Trouver l'utilisateur dans la base de donnée
    const user = await User.findById(userId);

    // Si l'utilisateur n'existe pas, renvoyer une erreur
    if (!user) {
      return res.status(404).json({ error: "Utilisateur introuvable" });
    }

    // Trouver le skill dans la base de donnée
    const skill = await Skill.findById(skillId);

    // Si le skill n'existe pas, renvoyer une erreur
    if (!skill) {
      return res.status(404).json({ error: "Skill introuvable" });
    }

    if (file) {
      // Determine si l'image actuelle est l'image de placeholder
      const isPlaceholder =
        skill.image_URL.public_id === "skills/autres/skill-placeholder";

      // Supprimer l'ancienne image de cloudinary sauf si elle est l'image de placeholder
      if (!isPlaceholder) {
        await cloudinary.uploader.destroy(skill.image_URL.public_id);
      }
      // Déterminer le mimetype
      const { mime } = await fileTypeFromBuffer(file.buffer);

      // Si le mimetype n'est pas autorisé, renvoyer une erreur
      if (!mime) {
        return res
          .status(200)
          .json({ message: "Le format du ficher non autorisé" });
      }

      // Uploader le fichier sur cloudinary
      const uploadResult = await new Promise((resolve) => {
        // Promise pour utiliser async/await
        cloudinary.uploader
          .upload_stream(
            // upload_stream pour traiter le buffer
            { folder: `skills/${category}` }, // Nom du dossier dynamique basé sur la catégorie du skill créé
            (error, uploadResult) => {
              return resolve(uploadResult); // Retourner l'info de l'upload (public_id et ssecure_url)
            }
          )
          .end(file.buffer); // Uploader sur cloudinary
      });

      // Stocker public_id et url dans une variable
      skill.image_URL = {
        public_id: uploadResult.public_id,
        secure_url: uploadResult.secure_url,
      };
    }

    // Mettre à jour les autres champs du skill
    skill.title = title;
    skill.category = category;
    skill.level = level;

    await skill.save();

    // Renvoyer le skill mis à jour
    res.status(200).json({
      message: `Le skill a bien été mis à jour pour ${user.name}`,
      skill,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// Supprimer un skill (de l'owner de portfolio)
export const deleteSkill = async (req, res, next) => {
  try {
    // Récupérer l'id du skill de la requête
    const { id: skillId } = req.params;

    // Récuperer l'id de l'utilisateur de la requête
    const userId = req.user;

    // Valider l'id
    if (!isValidObjectId(userId)) {
      return res.status(404).json({ error: "Utilisateur introuvable" });
    }

    // Trouver l'utilisateur dans la base de données
    const user = await User.findById(userId);

    // Si l'utilisateur n'existe pas, renvoyer une erreur
    if (!user) {
      return res.status(404).json({ error: "Utilisateur introuvable" });
    }

    // Trouver le skill dans la base de donnée
    const skill = await Skill.findById(skillId);

    // Si le skill n'existe pas, renvoyer une erreur
    if (!skill) {
      return res.status(404).json({ error: "Skill introuvable" });
    }

    const isPlaceholder =
      skill.image_URL.public_id === "skills/autres/skill-placeholder";

    // Supprimer l'image de cloudinary, si elle n'est pas une image de placeholder
    if (!isPlaceholder) {
      await cloudinary.uploader.destroy(skill.image_URL.public_id);
    }

    // Supprimer le skill
    await Skill.deleteOne({ _id: skillId });

    // Supprimer la relation entre l'utilisateur et le skill
    user.skills.pull(skillId);
    await user.save();

    // Renvoyer le skill supprimé
    res.status(200).json({
      message: `Le skill a bien été supprimé pour ${user.name}`,
      skill,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
