import rateLimit from "express-rate-limit";

const isDev = process.env.NODE_ENV === "development";

const rememberTime = 3 * 60 * 1000; // 3 minutes

const loginlimiter = rateLimit({
  windowMs: rememberTime, // How long to remember the request coming from the same IP address
  max: 5, // Limit each IP to 5 requests per windowMs (3 minutes)
  legacyHeaders: false, // Disable the older `X-RateLimit-*` headers
  standardHeaders: true, // Return Retry-After header
  handler: (req, res, next) => {
    const error = new Error("Too many requests. Please try again later."); // Create a custom error
    error.statusCode = 429; // HTTP status code for rate limit exceeded
    next(error); // Pass the error to the error handler
  },
});

export default loginlimiter;
