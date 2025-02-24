// Import axios to make request to reCAPTCHA
import axios from "axios";

// Middleware to validate reCAPTCHA
const validateCaptcha = async (req, res, next) => {
  // 'captchaToken' Sent from the frontend when submitting the form
  const recaptchaResponse = req.body.captchaToken;

  // If 'captchaToken' is not present, return an error
  if (!recaptchaResponse) {
    return res.status(400).json({ message: "Captcha token is required" });
  }

  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaResponse}`;

  try {
    // Make request to reCAPTCHA API to verify
    const response = await axios.post(verifyUrl, {}, { timeout: 5000 }); // Set timeout to 5 seconds (in case the API takes too long to respond)

    // If the reCAPTCHA API returns false, return an error
    if (!response.data.success) {
      return res.status(400).json({ message: "Invalid captcha token" });
    }

    // If the reCAPTCHA API returns true, continue
    next();
  } catch (error) {
    // If the reCAPTCHA API returns an error, return an error
    return res.status(500).json({ message: "Captcha validation failed." });
  }
};

// Export the middleware
export default validateCaptcha;
