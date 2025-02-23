// Import Winston
import winston from "winston";

const NODE_ENV = process.env.NODE_ENV;

// Winston configuration
const logger = winston.createLogger({
  level: NODE_ENV === "development" ? "debug" : "info", // Level of the logs
  format: winston.format.combine(
    // Colorize output
    winston.format.colorize(),
    // Combine differents formats
    winston.format.timestamp(), // Add timestamp
    winston.format.prettyPrint(), // Enable pretty print
    // Custom format
    winston.format.printf(({ timestamp, level, message }) => {
      const localTime = new Date(timestamp).toLocaleString(); // Get local time
      return `${localTime} [${level}]: ${message}`; // Return formatted log
    })
  ),
  // Where to send the logs
  transports: [
    new winston.transports.Console(), // Send logs to the console
    new winston.transports.File({ filename: "logs/all.log" }), // Save logs to a file
  ],
});

// Export the logger
export default logger;
