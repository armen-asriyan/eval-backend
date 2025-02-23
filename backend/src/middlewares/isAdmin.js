// Middleware to check if the user is an admin
const isAdmin = async (req, res, next) => {
  try {
    // Get the user from the request
    const user = req.user;

    // If user is not an admin, return an error
    if (user.role !== "admin") {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // If user is an admin, continue
    next();
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error(error.stack); // Log the error stack trace in development
    } else {
      console.error(error.message); // Log the error message in production
    }
    res.status(500).json({ message: "Error while checking user role", error });
  }
};

// Export the middleware
export default isAdmin;
