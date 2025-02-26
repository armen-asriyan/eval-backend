import { useState } from "react";
import "./Sidebar.css";
import Logo from "../../assets/logo.svg";
import LightLogo from "../../assets/light-logo.svg";

import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { useAuth } from "../../authContext";

import {
  RiHome2Line,
  RiShirtLine,
  RiToolsLine,
  RiMoonLine,
  RiSunLine,
  RiMenu2Line,
  RiDashboard2Line,
  RiLoginBoxLine,
} from "react-icons/ri";
import LogoutButton from "../LogoutButton/LogoutButton";

const Sidebar = (props) => {
  const [toggle, showMenu] = useState(false);

  const goToDashboard = () => {
    showMenu(!toggle);
    window.scrollTo(0, 0);
  };

  const { isAuth } = useAuth();

  return (
    <>
      <aside className={toggle ? "aside show-menu" : "aside"}>
        <Link
          to="/"
          className="nav__logo"
          aria-label="Lien vers la page d'accueil"
          onClick={() => showMenu(!toggle)}
        >
          <img src={props.theme === "light" ? LightLogo : Logo} alt="logo" />
        </Link>

        <nav className="nav">
          <div className="nav__menu">
            <ul className="nav__list">
              <li className="nav__item">
                <HashLink
                  to="/#home"
                  className="nav__link"
                  onClick={() => showMenu(!toggle)}
                  aria-label="Nav Acceuil"
                >
                  <RiHome2Line />
                </HashLink>
              </li>

              <li className="nav__item">
                <HashLink
                  to="/#about"
                  className="nav__link"
                  onClick={() => showMenu(!toggle)}
                  aria-label="Nav A propos"
                >
                  <RiShirtLine />
                </HashLink>
              </li>

              <li className="nav__item">
                <HashLink
                  to="/#skills"
                  className="nav__link"
                  onClick={() => showMenu(!toggle)}
                  aria-label="Nav Skills"
                >
                  <RiToolsLine />
                </HashLink>
              </li>

              {!isAuth ? (
                <li className="nav__item">
                  <HashLink
                    to="/login"
                    className="nav__link"
                    onClick={() => {
                      showMenu(!toggle);
                      window.scrollTo({ top: 0 });
                    }}
                    aria-label="Nav Se connecter"
                  >
                    <RiLoginBoxLine />
                  </HashLink>
                </li>
              ) : (
                <LogoutButton toggle={toggle} showMenu={showMenu} />
              )}
            </ul>
          </div>
        </nav>

        <div className="nav__footer">
          {isAuth && (
            <Link
              to="/dashboard"
              className="nav__link footer__button"
              aria-label="Nav Dashboard"
              onClick={goToDashboard}
            >
              <RiDashboard2Line />
            </Link>
          )}

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
