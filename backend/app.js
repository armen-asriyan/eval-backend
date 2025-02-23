// Import express
import express from "express";

// Dotenv is loaded within "dev" script

import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";

import morganMiddleware from "./src/middlewares/morganMiddleware.js";

// Create an Express application
const app = express();

// Middleware to parse JSON
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// CORS Configuration
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5000",
    credentials: true,
  })
);

// Use helmet to secure headers
app.use(helmet());

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
