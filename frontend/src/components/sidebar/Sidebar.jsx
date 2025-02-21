import React, { useState } from "react";
import "./Sidebar.css";
import Logo from "../../assets/logo.svg";
import LightLogo from "../../assets/light-logo.svg";
import { Link } from "react-router";
import { useAuth } from "../../authContext";
import axios from "axios";

import {
  RiHome2Line,
  RiShirtLine,
  RiToolsLine,
  RiMoonLine,
  RiSunLine,
  RiMenu2Line,
  RiDashboard2Line,
  RiLoginBoxLine,
  RiLogoutBoxLine,
} from "react-icons/ri";

const apiUrl = process.env.REACT_APP_API_URL;

const Sidebar = (props) => {
  const { isAuth } = useAuth();

  const [toggle, showMenu] = useState(false);

  const handleLogout = async () => {
    showMenu(!toggle);
    try {
      const response = await axios.post(
        `${apiUrl}/api/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      console.log("Logout response:", response.data);

      window.location.href = "/";
    } catch (error) {
      console.error(
        "Error logging out:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <>
      <aside className={toggle ? "aside show-menu" : "aside"}>
        <Link
          to="/"
          className="nav__logo"
          style={{ width: "3rem" }}
          aria-label="Lien vers la page d'accueil"
        >
          <img src={props.theme === "light" ? LightLogo : Logo} alt="logo" />
        </Link>

        <nav className="nav">
          <div className="nav__menu">
            <ul className="nav__list">
              <li className="nav__item">
                <a
                  href="/#home"
                  className="nav__link"
                  onClick={() => showMenu(!toggle)}
                  aria-label="Nav Acceuil"
                >
                  <RiHome2Line />
                </a>
              </li>

              <li className="nav__item">
                <a
                  href="/#about"
                  className="nav__link"
                  onClick={() => showMenu(!toggle)}
                  aria-label="Nav A propos"
                >
                  <RiShirtLine />
                </a>
              </li>

              <li className="nav__item">
                <a
                  href="/#skills"
                  className="nav__link"
                  onClick={() => showMenu(!toggle)}
                  aria-label="Nav Skills"
                >
                  <RiToolsLine />
                </a>
              </li>

              {!isAuth ? (
                <li className="nav__item">
                  <Link
                    to="/login"
                    className="nav__link"
                    onClick={() => showMenu(!toggle)}
                    aria-label="Nav Se connecter"
                  >
                    <RiLoginBoxLine />
                  </Link>
                </li>
              ) : (
                <li className="nav__item">
                  <button
                    className="nav__link logout-button"
                    onClick={() => handleLogout()}
                    aria-label="Nav Se deconnecter"
                  >
                    <RiLogoutBoxLine />
                  </button>
                </li>
              )}
            </ul>
          </div>
        </nav>

        <div className="nav__footer">
          {isAuth ? (
            <Link to="/dashboard">
              <button
                className="nav__link footer__button"
                aria-label="Nav Dashboard"
                onClick={() => showMenu(!toggle)}
              >
                <RiDashboard2Line />
              </button>
            </Link>
          ) : null}

          <button
            onClick={() => {
              props.switchTheme();
              showMenu(!toggle);
            }}
            className="nav__link footer__button"
            aria-label="Mode sombre / clair"
          >
            {props.theme === "light" ? <RiMoonLine /> : <RiSunLine />}
          </button>
        </div>
      </aside>

      <button
        className={toggle ? "nav__toggle nav__toggle-open" : "nav__toggle"}
        onClick={() => showMenu(!toggle)}
        aria-expanded={toggle ? "true" : "false"}
        aria-label="Ouvrir le menu"
      >
        <RiMenu2Line />
      </button>
    </>
  );
};

export default Sidebar;
