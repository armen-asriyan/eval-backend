import React from "react";
import "./Home.css";
import ScrollDown from "./ScrollDown";
import Shapes from "./Shapes";

import avatar1 from "../../assets/avatar1.png";

const Home = () => {
  return (
    <section className="home container" id="home">
      <div className="intro z-10">
        <img src={avatar1} alt="avatar" className="home__img" width="300" />
        <h1 className="home__name" style={{ marginBottom: "1rem" }}>
          John Doe
        </h1>
        <span className="home__education" style={{ marginBottom: "1rem" }}>
          Je suis un Développeur Web
        </span>
      </div>
      <ScrollDown />

      <Shapes />
    </section>
  );
};

export default Home;
