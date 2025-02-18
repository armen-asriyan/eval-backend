// Importer les modules nécessaires pour la connexion à la base de données
import mongoose from "mongoose";

const DB_NAME = process.env.DB_NAME || "test-db";

const MONGO_URI =
  process.env.MONGO_URI || `mongodb://localhost:27017/${DB_NAME}`;

// Fonction pour connecter à la base de données
const connectDB = async () => {
  // Tente de se connecter à la base de données
  try {
    // Connexion à la base de données
    const conn = await mongoose.connect(MONGO_URI);

    // Afficher un message de succès avec le nom de l'hôte
    console.log(
      `Connexion à la base de données établie : ${conn.connection.host}`
    );

    // Retourner la connexion (pour utilisation ultérieure)
    return conn;
  } catch (error) {
    console.error(
      `Erreur de connexion à la base de données : ${error.message}`
    );
    process.exit(1); // Arrêter le processus (Node) si la connexion échoue
  }
};

// Exporter la fonction connectDB
export default connectDB;
