// Import mongoose
import mongoose from "mongoose";

// Database name ('test-db' for fallback)
const DB_NAME = process.env.DB_NAME || "test-db";

// MongoDB URI
const MONGO_URI = process.env.MONGO_URI
  ? `${process.env.MONGO_URI}${DB_NAME}`
  : `mongodb://localhost:27017/${DB_NAME}`; // "test-db"

// Function to connect to the database
const connectDB = async () => {
  try {
    // Connect to the database
    const conn = await mongoose.connect(MONGO_URI);

    // Success message with hostname (only in development)
    if (process.env.NODE_ENV === "development") {
      console.log(
        `Connexion à la base de données établie : ${conn.connection.host}`
      );
    }

    // Return the connection (if necessary)
    return conn;
  } catch (error) {
    // Detailed error message (only in development)
    if (process.env.NODE_ENV === "development") {
      console.error(
        `Error while connecting to the database : ${error.message}`
      );
    } else {
      console.error("La connexion à la base de données a échoué");
    }
    process.exit(1); // Exit the node process
  }
};

// Export the function
export default connectDB;
