// Import bcrypt
import bcrypt from "bcrypt";

// Number of salt rounds (cycles of hashing)
const SALT_ROUNDS = 10;

// Function to hash a password
export const hashPassword = async (password) => {
  try {
    // Check if password is provided
    if (!password) {
      throw new Error("Password is required");
    }

    // Generate salt
    const salt = await bcrypt.genSalt(SALT_ROUNDS);

    // Return hashed password
    return await bcrypt.hash(password, salt);
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error(`Error during password hashing: ${error.stack}`);
      throw new Error(`Error during password hashing: ${error.stack}`);
    } else {
      console.error(`Error during password hashing: ${error.message}`);
      throw new Error(`Error during password hashing: ${error.message}`);
    }
  }
};

// Function to compare a password with a hashed password
export const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};
