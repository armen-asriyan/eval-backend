import rateLimit from "express-rate-limit";

const isDev = process.env.NODE_ENV === "development";

const loginlimiter = rateLimit({
  windowMs: isDev ? 0 : 15 * 60 * 1000, // 15 minutes in production
  max: 5, // Limit each IP to 5 requests per windowMs
  message: "Too many login attempts, please try again later.", // Custom error message
});

export default loginlimiter;
