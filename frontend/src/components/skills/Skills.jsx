import "./Skills.css";
import {
  RiAddLine,
  RiFunctionLine,
  RiFundsBoxLine,
  RiPencilLine,
  RiToolsLine,
} from "react-icons/ri";

import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const Skills = ({
  skillsData,
  skillCategories,
  skillLevels,
  isLoading,
  isAdmin,
  onEditSkill,
}) => {
  return (
    <section className="skills container skill" id="skills">
      <a href="#skills">
        <h2 className="section__title">
          <span>
            <RiToolsLine />
          </span>
          Skills
        </h2>
      </a>

      <div className="skills__container grid">
        {isLoading ? (
          <LoadingSpinner loading={isLoading} isOverlay={false} />
        ) : skillsData.length === 0 ? (
          <h3 className="skills__no-skill">Aucune compétence trouvée</h3>
        ) : (
          skillsData.map((skill) => (
            <div className="skills__card" key={skill._id}>
              <img
                src={skill.image_URL.secure_url}
                alt={skill.title}
                className="skills__img"
              />
              <h3 className="skills__title">{skill.title}</h3>
              <div className="skills__info">
                <p className="skills__level" title="Le niveau">
                  <RiFundsBoxLine />
                  {skillLevels[skill.level]}
                </p>
                <p className="skills__category" title="La catégorie">
                  <RiFunctionLine />
                  {skillCategories[skill.category]}
                </p>
              </div>

              {isAdmin && (
                <button
                  type="button"
                  className="skills__edit-button"
                  onClick={() => onEditSkill(skill)}
                >
                  <RiPencilLine /> Modifier
                </button>
              )}
            </div>
          ))
        )}
        {isAdmin && (
          <div className="skills__card">
            <h3 className="skills__title add-skill">
              Ajouter une nouvelle competence
              <br />
              <RiAddLine onClick={() => onEditSkill("")} />
            </h3>
          </div>
        )}
      </div>
    </section>
  );
};

export default Skills;
