// Import express-validator
import { validationResult } from "express-validator";

const validateRequest = (req, res, next) => {
  // Validate the request, returns an array of errors
  const errors = validationResult(req);

  // If the request is not valid, return an error
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // If the array of errors is empty, continue
  next();
};

// Export the middleware
export default validateRequest;
