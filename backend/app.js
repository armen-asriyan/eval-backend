// Import les modules necessaires
import express from "express";

// Dotenv est chargé depuis "npm run dev"

import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";

import morganMiddleware from "./src/middlewares/morganMiddleware.js";

// Créer une instance d'express
const app = express();

// Middleware pour parser les corps de la requête en JSON
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// Utiliser cors
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5000",
    credentials: true,
  })
);

// Utiliser helmet
app.use(helmet());

// Utiliser cookieParser
app.use(cookieParser());

// Importer les routes
import userRoutes from "./src/routes/userRoutes.js";
import skillRoutes from "./src/routes/skillRoutes.js";

// Importer les middlewares
import errorHandler from "./src/middlewares/errorHandler.js";

// Utiliser morgan (qui utilise winston pour enregistrer les logs)
app.use(morganMiddleware);

// Utiliser les routes
app.use("/api/auth", userRoutes);
app.use("/api/skills", skillRoutes);

// Middleware pour traiter les erreurs
app.use(errorHandler);

// Exporter l'application
export default app;
