import React from "react";
import "./Home.css";
import ScrollDown from "./ScrollDown";
import Shapes from "./Shapes";

const Home = () => {
  return (
    <section className="home container" id="home">
      <div className="intro">
        <img src="" alt="" className="home__img" width="300" />
        <h1 className="home__name" style={{ marginBottom: "1rem" }}>
          John Doe
        </h1>
        <span className="home__education" style={{ marginBottom: "1rem" }}>
          Je suis un Développeur Web
        </span>

        <ScrollDown />
      </div>

      <Shapes />
    </section>
  );
};

export default Home;
