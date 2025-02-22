import React, { useEffect, useState } from "react";
import "./Skills.css";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../authContext";
import {
  RiAddLine,
  RiFunctionLine,
  RiFundsBoxLine,
  RiPencilLine,
  RiToolsLine,
} from "react-icons/ri";

const apiUrl = process.env.REACT_APP_API_URL;

const Skills = ({ onEditSkill }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const { isAdmin } = useAuth();

  const [skillsData, setSkillsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [skillCategories, setSkillCategories] = useState([]);
  const [skillLevels, setSkillLevels] = useState([]);

  const fetchSkills = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const res = await axios.get(`${apiUrl}/api/skills`);

      setSkillsData(res.data.skills);
      setSkillCategories(res.data.categories);
      setSkillLevels(res.data.levels);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const isOnDashboard = location.pathname === "/dashboard";

  const handleAddSkill = () => {
    if (!isOnDashboard) {
      navigate("/dashboard");
    } else {
      onEditSkill("", skillCategories, skillLevels);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  return (
    <section className="skills container skill " id="skills">
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
          <h3 className="skills__title">Chargement...</h3>
        ) : error ? (
          <h3 className="skills__title error">{error}</h3>
        ) : skillsData.length === 0 ? (
          <h3 className="skills__title">Aucune compétence trouvée</h3>
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

              {isAdmin && isOnDashboard ? (
                <button
                  type="button"
                  className="skills__edit-button"
                  onClick={() =>
                    onEditSkill(skill, skillCategories, skillLevels)
                  }
                >
                  <RiPencilLine /> Modifier
                </button>
              ) : null}
            </div>
          ))
        )}
        {isAdmin && isOnDashboard && (
          <div className="skills__card">
            <h3 className="skills__title add-skill">
              Ajouter une nouvelle competence
              <br />
              <RiAddLine onClick={handleAddSkill} />
            </h3>
          </div>
        )}
      </div>
    </section>
  );
};

export default Skills;
