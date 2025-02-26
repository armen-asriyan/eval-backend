// Import express
import express from "express";

// Dotenv is loaded within "dev" script

import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";

import morganMiddleware from "./src/middlewares/morganMiddleware.js";

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

// Import routes
import userRoutes from "./src/routes/userRoutes.js";
import skillRoutes from "./src/routes/skillRoutes.js";

// Import global error handler
import errorHandler from "./src/middlewares/errorHandler.js";

// Use morgan middleware to log HTTP requests (which uses Winston logger)
app.use(morganMiddleware);

// Routing
app.use("/api/auth", userRoutes);
app.use("/api/skills", skillRoutes);

// Global error handler
app.use(errorHandler);

// Export the Express application
export default app;
