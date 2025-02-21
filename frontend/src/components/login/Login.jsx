import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom"; // For navigation after successful login
import "./Login.css";
import { useAuth } from "../../authContext";
import Shapes from "../home/Shapes";

import ReCAPTCHA from "react-google-recaptcha";

import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;

const recaptchaSiteKey = process.env.REACT_APP_SITE_KEY;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { isAuth } = useAuth(); // Track auth state
  const navigate = useNavigate(); // React Router hook for navigation
  const recaptchaRef = useRef();

  useEffect(() => {
    if (isAuth) {
      navigate("/dashboard");
    }
  }, [isAuth, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const captchaValue = recaptchaRef.current.getValue();

      if (!captchaValue) {
        setMessage("Veuillez valider le captcha.");
        return;
      }

      const res = await axios.post(
        `${apiUrl}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      );

      if (res.data.token) {
        window.location.href = "/dashboard";
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Erreur de connexion"); // Display error message
    }
  };

  return (
    <section className="home container" id="home">
      <div className="intro">
        <h1 className="home__name login-title" style={{ marginBottom: "1rem" }}>
          Se Connecter
        </h1>

        <form onSubmit={handleLogin} className="login-form" autoComplete="on">
          <label htmlFor="email-input">
            Email
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              id="email-input"
              name="email"
              required
            />
          </label>
          <label htmlFor="password-input">
            Mot de passe
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              id="password-input"
              name="password"
              required
            />
          </label>

          <ReCAPTCHA
            sitekey={recaptchaSiteKey}
            style={{ marginBottom: "2rem" }}
            ref={recaptchaRef}
          />

          <button type="submit">Se Connecter</button>
          {message && <p>{message}</p>}
        </form>
      </div>
      <Shapes />
    </section>
  );
};

export default Login;
