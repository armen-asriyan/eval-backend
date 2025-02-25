import { verifyTokenAndGetUser } from "../utils/authUtils.js";

// Non strict middleware to check auth
const checkAuth = async (req, res, next) => {
  try {
    // Get token stored in cookies
    const token = req.cookies.token;

    // Set req.user
    req.user = await verifyTokenAndGetUser(token);

    // Pass to next middleware
    next();
  } catch (error) {
    // Pass error to error handler
    next(error);
  }
};
export default checkAuth;
