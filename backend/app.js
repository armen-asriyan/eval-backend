// Import the necessary modules
import express from "express";
import swaggerUi from "swagger-ui-express";

import { fileURLToPath } from "url";
import { join, dirname } from "path";

// Dotenv is loaded within "dev" script

import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";

import morganMiddleware from "./src/middlewares/morganMiddleware.js";

// Import routes
import userRoutes from "./src/routes/userRoutes.js";
import skillRoutes from "./src/routes/skillRoutes.js";

// Import global error handler
import errorHandler from "./src/middlewares/errorHandler.js";

import fs from "fs";
import YAML from "yaml";

// Get current file directory
const __filename = fileURLToPath(import.meta.url);

// Get current file's directory
const __dirname = dirname(__filename);

// Public directory
const publicDir = join(__dirname, "public");

const swaggerDocsDir = join(__dirname, "docs/");

const yamlFile = fs.readFileSync(join(swaggerDocsDir, "swagger.yaml"), "utf-8");

const swaggerDocument = YAML.parse(yamlFile);

// Create an Express application
const app = express();

// Middleware to compress responses
app.use(compression());

// Use helmet to secure headers
app.use(helmet());

// CORS Configuration
app.use(
  cors({
    origin: [
      process.env.CLIENT_URL || "http://localhost:5173", // Default to Vite port
      ,
      "https://www.google.com", // For reCAPTCHA
      "https://www.gstatic.com", // For reCAPTCHA
      "https://res.cloudinary.com", // For Cloudinary
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    exposedHeaders: ["Retry-After", "RateLimit-Reset", "Set-Cookie", "ETag"],
    maxAge: 86400, // 24 hours
  })
);

// Middleware to parse JSON
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// Use cookie parser to read cookies
app.use(cookieParser());

// Use morgan middleware to log HTTP requests (which uses Winston logger)
app.use(morganMiddleware);

// Home route
app.get("/", (req, res) => {
  // Send the index.html file from the public directory
  res.sendFile(publicDir + "/index.html");
});

// Swagger documentation route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routing
app.use("/api/auth", userRoutes);
app.use("/api/skills", skillRoutes);

// 404 handler
app.use((req, res, next) => {
  const error = new Error(`Route '${req.originalUrl}' not found.`);
  error.statusCode = 404;
  error.code = "NOT_FOUND";
  next(error);
});

// Global error handler
app.use(errorHandler);

// Export the Express application
export default app;
