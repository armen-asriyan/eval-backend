import React from "react";
import "./About.css";

import { RiShirtLine } from "react-icons/ri";

import avatar2 from "../../assets/avatar2.png";

const About = () => {
  return (
    <section className="about container section" id="about">
      <a href="#about">
        <h2 className="section__title">
          <span>
            <RiShirtLine />A propos
          </span>
        </h2>
      </a>

      <div className="about__container grid">
        <img src={avatar2} alt="avatar2" className="about__img" />

        <div className="about__data grid">
          <div className="about__info">
            <p className="about__description">
              {" "}
              Bonjour! Je suis John Doe, un développeur web passionné et axé sur
              les résultats, avec plus de 5 ans d'expérience dans la création de
              sites web et d'applications web dynamiques et conviviaux. Je me
              spécialise à la fois dans le développement front-end et back-end,
              et je suis toujours désireux d'apprendre de nouvelles technologies
              pour élargir mes compétences. <br /> <br /> Quand je ne code pas,
              vous pouvez me trouver en train d'expérimenter de nouveaux modèles
              de conception, d'optimiser les performances des sites, ou de
              collaborer avec d'autres développeurs pour créer des solutions
              ayant un impact. J'adore résoudre des problèmes complexes et
              trouver des solutions innovantes qui offrent à la fois
              fonctionnalité et expérience utilisateur fluide.{" "}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
