import "./Home.css";
import ScrollDown from "./ScrollDown";
import Shapes from "./Shapes";

import avatar1 from "../../assets/avatar1.webp";

const Home = () => {
  return (
    <section className="home container" id="home">
      <div className="intro">
        <img
          src={avatar1}
          alt="Avatar de John Doe"
          className="home__img"
          width="300"
        />
        <h1 className="home__name">John Doe</h1>
        <span className="home__education">Je suis un Développeur Web</span>
      </div>
      <ScrollDown />

      <Shapes />
    </section>
  );
};

export default Home;
