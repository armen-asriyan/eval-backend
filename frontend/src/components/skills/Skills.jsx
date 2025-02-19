import React, { useEffect, useState } from "react";
import "./Skills.css";

import axios from "axios";

import { RiToolsLine } from "react-icons/ri";

const Skills = () => {
  const [skillsData, setSkillsData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/skills").then((res) => {
      setSkillsData(res.data.skills);
    });
  }, []);

  console.log(skillsData);

  return (
    <section className="skills container skill" id="skills">
      <h2 className="section__title">
        <span>
          <RiToolsLine />
        </span>
        Skills
      </h2>

      <div className="skills__container grid">
        {skillsData.length === 0 ? (
          <p>No skills available.</p>
        ) : (
          skillsData.map(({ _id, title, description, image_URL }) => (
            <div className="skills__card" key={_id}>
              <img src={image_URL.url} alt={title} className="skills__img" />
              <h3 className="skills__title">{title}</h3>
              <p className="skills__description">{description}</p>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default Skills;
