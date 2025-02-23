import { Navigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../authContext";
import Shapes from "../home/Shapes";
import avatar1 from "../../assets/avatar1.png";
import "./Dashboard.css";
import Skills from "../skills/Skills";

import EditModal from "../modal/EditModal";

import useDocumentTitle from "../../useDocumentTitle";

const Dashboard = () => {
  useDocumentTitle("Dashboard");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [skillToEdit, setSkillToEdit] = useState(null);

  const { isAuth, user } = useAuth();

  const [skillCategories, setSkillCategories] = useState([]);
  const [skillLevels, setSkillLevels] = useState([]);

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  // Fonction pour ouvrir le modal pour editer une competence
  const handleEditSkill = (skill, categories, levels) => {
    setIsModalOpen(true);
    setSkillToEdit(skill);
    setSkillCategories(categories);
    setSkillLevels(levels);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section className="dashboard container" id="dashboard">
      <div className="content">
        <div className="text-right">
          <h1 className="dashboard__title" style={{ marginBottom: "1rem" }}>
            Dashboard
          </h1>
        </div>
        <div className="intro">
          <img
            src={avatar1}
            alt="avatar"
            className="dashboard__avatar"
            width="100"
          />
          <div className="welcome-text">
            Bienvenue,
            <span> {user.name}</span>
          </div>
        </div>
        {/* Competences */}
        <div className="competences">
          <Skills onEditSkill={handleEditSkill} />
        </div>

        {/* Modal pour editer une competence */}
        {isModalOpen && (
          <EditModal
            closeModal={closeModal}
            skill={skillToEdit}
            skillCategories={skillCategories}
            skillLevels={skillLevels}
          >
            {/* Contenu du modal */}
          </EditModal>
        )}
      </div>
      <Shapes />
    </section>
  );
};

export default Dashboard;
