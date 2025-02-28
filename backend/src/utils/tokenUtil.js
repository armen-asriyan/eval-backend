// Import jsonwebtoken
import jwt from "jsonwebtoken";

// Function to generate a JWT token
const generateToken = (userId, expiresIn) => {
  // Return the token
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn });
};

// Export module
export default generateToken;
