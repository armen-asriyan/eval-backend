// Import jsonwebtoken
import jwt from "jsonwebtoken";

// Function to generate a JWT token
const generateToken = (id) => {
  // Return the token
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d", // Token expires in 1 day
  });
};

// Export module
export default generateToken;
