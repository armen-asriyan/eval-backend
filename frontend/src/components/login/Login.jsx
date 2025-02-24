import "./Login.css";

import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../authContext";
import useDocumentTitle from "../../useDocumentTitle";

import Shapes from "../home/Shapes";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import ReCAPTCHA from "react-google-recaptcha";

import axios from "axios";
import { useMediaQuery } from "@uidotdev/usehooks";

const apiUrl = process.env.REACT_APP_API_URL;

const recaptchaSiteKey = process.env.REACT_APP_SITE_KEY;

const Login = () => {
  const isXSmallDevice = useMediaQuery("only screen and (max-width : 576px)");

  useDocumentTitle("Connexion");

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { isAuth, loginUser } = useAuth(); // Track auth state
  const navigate = useNavigate(); // React Router hook for navigation
  const recaptchaRef = useRef();

  if (isAuth) {
    navigate("/dashboard");
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const captchaValue = recaptchaRef.current?.getValue();

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
        // Use the loginUser function from context to update auth state
        loginUser(res.data.user);

        // Navigate after login is successful
        navigate("/dashboard");
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Erreur de connexion");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="home container" id="home">
      <div className="intro">
        <h1 className="home__name login-title">Se Connecter</h1>

        <form onSubmit={handleLogin} className="login-form" autoComplete="on">
          <fieldset disabled={loading}>
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
          </fieldset>

          <ReCAPTCHA
            sitekey={recaptchaSiteKey}
            ref={recaptchaRef}
            style={{
              paddingBottom: "1rem",
              margin: "0 auto",
              transform: isXSmallDevice ? "scale(1)" : "scale(1.1)",
              transformOrigin: "center center",
            }}
            // size={isXSmallDevice ? "compact" : "normal"}
          />

          <button type="submit" disabled={loading}>
            Se Connecter
          </button>
          {message && <p>{message}</p>}
        </form>
      </div>
      <Shapes />
      {loading && <LoadingSpinner loading={loading} modal={true} />}
    </section>
  );
};

export default Login;
