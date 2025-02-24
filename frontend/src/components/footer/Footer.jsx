import React from "react";

import "./Footer.css";

import { RiGithubFill } from "react-icons/ri";

const Footer = () => {
  return (
    <footer className="footer">
      <p className="footer__text">
        Ce projet utilise le template créé par
        <a
          href="https://github.com/GregSithole/gregsithole-react-portfolio"
          className="footer__link"
          target="_blank"
          rel="noreferrer"
          title="Lien vers le repo Github de template"
          aria-label="Lien vers le repo Github de template"
        >
          <span className="footer__text-template-author">@GregSithole</span>
        </a>
      </p>
      <p className="footer__text-author">Fait par Armen Asriyan</p>
      <a
        href="https://github.com/armen-asriyan/eval-backend"
        className="footer__link"
        target="_blank"
        rel="noreferrer"
        title="Lien vers le repo Github de l'application"
        aria-label="Lien vers le repo Github de l'application"
      >
        <RiGithubFill className="footer__link github" />
        Repo Github
      </a>
    </footer>
  );
};

export default Footer;
