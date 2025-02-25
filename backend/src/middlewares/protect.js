import { verifyTokenAndGetUser } from "../utils/authUtils.js";

const protect = async (req, res, next) => {
  try {
    // Get token stored in cookies
    const token = req.cookies.token;

    // Find user
    const user = await verifyTokenAndGetUser(token);

    // If user not found, return error 401 (making this a protected route and a strict middleware)
    if (!user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    // Set req.user
    req.user = user;

    // Pass to next middleware
    next();
  } catch (error) {
    next(error);
  }
};

export default protect;
