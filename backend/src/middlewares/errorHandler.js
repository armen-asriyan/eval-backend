// Global error handler middleware
const errorHandler = (err, req, res, next) => {
  // Log error stack
  if (process.env.NODE_ENV === "development") {
    console.error(` errorHandler: ${err.stack}`);
  } else {
    console.error(` errorHandler: ${err.message}`);
  }

  // Determine error status code
  const statusCode = err.statusCode || 500;

  // Determine error message
  const message = err.message || "Internal Server Error";

  // Determine error code (useful for MongoDB errors)
  const errorCode = err.code || "SERVER_ERROR";

  // Send error response
  res.status(statusCode).json({
    success: false,
    message,
    code: errorCode,
    stack: err.stack,
  });
};

// Export error handler middleware
export default errorHandler;
