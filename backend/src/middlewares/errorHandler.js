import multer from "multer";

// Global error handler middleware
const errorHandler = (err, req, res, next) => {
  const isProduction = process.env.NODE_ENV === "production";

  // Log error stack
  if (isProduction) {
    console.error(` errorHandler: ${err.message}`);
  } else {
    console.error(` errorHandler: ${err.stack}`);
  }

  // Determine error status code
  const statusCode = err.statusCode || 500;

  // Determine error message
  const message = err.message || "Internal Server Error";

  // Determine error code (useful for MongoDB errors)
  const errorCode = err.code || "SERVER_ERROR";

  // Handle Multer errors
  if (err instanceof multer.MulterError) {
    statusCode = 400;
    errorCode = "INVALID_FILE_TYPE";
    message = "Invalid file type";
  }

  // Send error response
  res.status(statusCode).json({
    success: false,
    message,
    code: errorCode,
    stack: isProduction ? null : err.stack,
  });
};

// Export error handler middleware
export default errorHandler;
