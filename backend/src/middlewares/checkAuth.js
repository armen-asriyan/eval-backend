import { verifyTokenAndGetUser } from "../utils/authUtils.js";

// Non strict middleware to check auth
const checkAuth = async (req, res, next) => {
  try {
    // Get access token stored in cookies
    const { accessToken } = req.cookies;

    // Set req.user
    req.user = await verifyTokenAndGetUser(accessToken);

    // Pass to next middleware
    next();
  } catch (error) {
    // Pass error to error handler
    next(error);
  }
};
export default checkAuth;
