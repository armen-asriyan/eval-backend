import "../home/Home.css";
import Shapes from "../home/Shapes";

import NotFoundImage from "../../assets/NotFoundImage.png";

const NotFound = () => {
  return (
    <section className="home container" id="home">
      <div className="intro">
        <h1 className="home__name" style={{ marginBottom: "1rem" }}>
          404 - Page Non Trouvée
        </h1>
        <p>La page que vous recherchez n'a pas été trouvée. {"☹️"}</p>
        <img src={NotFoundImage} alt="404" className="home__img" width="300" />
      </div>

      <Shapes />
    </section>
  );
};

export default NotFound;
