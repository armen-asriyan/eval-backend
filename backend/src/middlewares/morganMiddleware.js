// Importer morgan to log HTTP requests
import morgan from "morgan";

// Import configured winston logger
import logger from "../config/logger.js";

// Middleware to log HTTP requests with winston
const morganMiddleware = morgan("combined", {
  stream: {
    write: (message) => {
      logger.info(message.trim()); // Log the message (using winston logger)
    },
  },
  skip: (req, res) => process.env.NODE_ENV === "test", // Skip logging in test environment
});

// Export the middleware
export default morganMiddleware;
