import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import Logo from "../../assets/logo.svg";
import LightLogo from "../../assets/light-logo.svg";

import { Link } from "react-router";

import { useAuth } from "../../authContext";

import { useNavigate } from "react-router-dom";

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
import axios from "axios";

const Sidebar = (props) => {
  const { isAuth } = useAuth();

  const [toggle, showMenu] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    axios
      .post(
        "http://localhost:3000/api/auth/logout",
        {},
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        window.location.href = "/";
      });
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
                  <Link
                    to="/#"
                    className="nav__link"
                    onClick={() => {
                      showMenu(!toggle);
                      handleLogout();
                    }}
                    aria-label="Nav Se deconnecter"
                  >
                    <RiLogoutBoxLine />
                  </Link>
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
