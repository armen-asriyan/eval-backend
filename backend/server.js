// Import app
import app from "./app.js";

// Import the database connection function
import connectDB from "./src/config/db.js";

// Define the port
const PORT = process.env.PORT || 3030;

// Function to start the server
const startServer = async () => {
  try {
    // Try to connect to the database
    await connectDB();

    // Start the server
    app.listen(PORT, () => {
      // Log a message in the console only in development
      if (process.env.NODE_ENV === "development") {
        console.log(`Server running on port ${PORT}`);
      }
    });
  } catch (error) {
    // Log the error object only in development
    if (process.env.NODE_ENV === "development") {
      console.error(`Error during server launch : ${error}`);
    } else {
      console.error("Server launch failed");
    }
    // Exit node process
    process.exit(1);
  }
};

// Start the server
startServer();
