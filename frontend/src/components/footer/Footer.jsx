import React from "react";

import "./Footer.css";

import { RiGithubFill } from "react-icons/ri";

const Footer = () => {
  return (
    <footer className="footer">
      <p className="footer__text">
        Ce projet utilise le template créé par @
        <a
          href="https://github.com/GregSithole/gregsithole-react-portfolio"
          className="footer__link"
          target="_blank"
          rel="noreferrer"
        >
          <span className="author">GregSithole</span>
        </a>
      </p>
      <p style={{ marginTop: "1rem", marginBottom: "1rem" }}>
        Fait par Armen Asriyan
      </p>
      <a
        href="https://github.com/armen-asriyan/eval-backend"
        className="footer__link"
        target="_blank"
        rel="noreferrer"
      >
        <RiGithubFill className="footer__link github" />
        Repo Github
      </a>
    </footer>
  );
};

export default Footer;
