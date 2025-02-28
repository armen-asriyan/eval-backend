// Import id validator
import { isValidObjectId } from "mongoose";

// Import User model
import User from "../models/User.js";

// Import Skill model, possible categories and levels
import Skill, {
  POSSIBLE_CATEGORIES,
  POSSIBLE_LEVELS,
} from "../models/Skill.js";

// Import upload and delete image service (cloundinary)
import { uploadImage, deleteImage } from "../services/uploadImageService.js";

// Function to validate user id and return user from database
const findUserById = async (userId) => {
  if (!isValidObjectId(userId)) return null;
  return await User.findById(userId);
};

// Function to validate skill id and return skill from database
const findSkillById = async (skillId) => {
  if (!isValidObjectId(skillId)) return null;
  return await Skill.findById(skillId);
};

const logError = (error) => {
  if (process.env.NODE_ENV === "development") {
    console.error(error.stack); // Log the error stack trace in development
  } else {
    console.error(error.message); // Log the error message in production
  }
};

// Get all skills
export const getSkills = async (req, res, next) => {
  try {
    // Get all skills from database
    const skills = await Skill.find({});

    // Send response
    res.status(200).json({
      skills,
      categories: POSSIBLE_CATEGORIES,
      levels: POSSIBLE_LEVELS,
    });
  } catch (error) {
    logError(error);
    next(error);
  }
};

// Create a skill
export const createSkill = async (req, res, next) => {
  try {
    // Get file
    const file = req.file;

    // Destructure the data from the request body
    const { title, category, level } = req.body;

    // Get user id from request
    const userId = req.user;

    // Get user from database (with validation)
    const user = await findUserById(userId);

    // If user not found, return error
    if (!user) {
      return next({
        statusCode: 404,
        message: `User with id ${userId} not found`,
      });
    }

    // Upload image
    const { public_id, secure_url } = await uploadImage(file, category);

    // Create the skill
    const newSkill = await Skill.create({
      title,
      category,
      level,
      image_URL: { public_id, secure_url },
      userId,
    });

    // Add skill to user
    user.skills.push(newSkill._id);
    await user.save();

    // Send response
    res.status(201).json({
      message: `Skill ${newSkill.title} was successfully created for ${user.name}`,
      skill: newSkill,
    });
  } catch (error) {
    logError(error);
    next(error);
  }
};

// Update a skill
export const updateSkill = async (req, res, next) => {
  try {
    // Get skill id
    const { id: skillId } = req.params;

    // Get file
    const file = req.file;

    // Destructure the data from the request body
    const { title, category, level } = req.body;

    // Get user id from request
    const userId = req.user;

    // Get user from database (with validation)
    const user = await findUserById(userId);

    // If user not found, return error
    if (!user) {
      return next({
        statusCode: 404,
        message: `User with id ${userId} not found`,
      });
    }

    // Find skill
    const skill = await findSkillById(skillId);

    // If skill not found, return error
    if (!skill) {
      return next({ statusCode: 404, message: "Skill not found" });
    }

    if (file) {
      // Delete old image unless it's the placeholder
      await deleteImage(skill.image_URL.public_id);

      // Upload new image
      const uploadResult = await uploadImage(file, category);
      skill.image_URL = {
        public_id: uploadResult.public_id,
        secure_url: uploadResult.secure_url,
      };
    }

    // Update the skill information
    skill.title = title;
    skill.category = category;
    skill.level = level;

    await skill.save();

    // Send response
    res.status(200).json({
      message: `Skill ${skill.title} was successfully updated for ${user.name}`,
      skill,
    });
  } catch (error) {
    logError(error);
    next(error);
  }
};

// Delete a skill
export const deleteSkill = async (req, res, next) => {
  try {
    // Get skill id
    const { id: skillId } = req.params;

    // Get user id from request
    const userId = req.user;

    // Get user from database (with validation)
    const user = await findUserById(userId);

    // If user not found, return error
    if (!user) {
      return next({
        statusCode: 404,
        message: `User with id ${userId} not found`,
      });
    }

    // Find skill
    const skill = await findSkillById(skillId);

    // If skill not found, return error
    if (!skill) {
      return next({ statusCode: 404, message: "Skill not found" });
    }

    // Delete image from Cloudinary unless it's the placeholder
    await deleteImage(skill.image_URL.public_id);

    // Delete the skill reference from the user
    user.skills.pull(skillId);
    await user.save();

    // Delete skill from database
    await Skill.findByIdAndDelete(skillId);

    // Send response
    res.status(200).json({
      message: `Skill was successfully deleted for ${user.name}`,
      skill,
    });
  } catch (error) {
    logError(error);
    next(error);
  }
};
