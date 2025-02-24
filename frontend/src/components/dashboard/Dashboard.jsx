import React, { useState } from "react";
import "./Dashboard.css";
import avatar1 from "../../assets/avatar1.png";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../authContext";
import Shapes from "../home/Shapes";
import Skills from "../skills/Skills";
import EditModal from "../modal/EditModal";
import useDocumentTitle from "../../useDocumentTitle";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import useSkills from "../../hooks/useSkills";

const Dashboard = () => {
  useDocumentTitle("Dashboard");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [skillToEdit, setSkillToEdit] = useState(null);

  const { isAuth, user, authLoading } = useAuth();

  const { skillsData, skillCategories, skillLevels, isLoading, refetchSkills } =
    useSkills();

  // Function to open the edit modal
  const handleEditSkill = (skill) => {
    setIsModalOpen(true);
    setSkillToEdit(skill);
  };

  // Function to close the modal and refresh skills data
  const closeModal = () => {
    setIsModalOpen(false);
    refetchSkills(); // Re-fetch skills data after closing the modal
  };

  if (authLoading) {
    return <LoadingSpinner loading={authLoading} fullscreen={true} />;
  }

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return (
    <section className="dashboard container" id="dashboard">
      <div className="content">
        <div className="dashboard__header">
          <h1 className="dashboard__title">Dashboard</h1>
          <div className="intro">
            <img
              src={avatar1}
              alt="Avatar de John Doe"
              className="dashboard__avatar"
              width="100"
            />
            <div className="welcome-text">
              Bienvenue, <span>{user.name}</span>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="competences">
          <Skills
            skillsData={skillsData}
            skillCategories={skillCategories}
            skillLevels={skillLevels}
            isLoading={isLoading}
            isAdmin={user?.role === "admin"}
            onEditSkill={handleEditSkill}
          />
        </div>

        {/* Edit Modal */}
        {isModalOpen && (
          <EditModal
            closeModal={closeModal}
            skill={skillToEdit}
            skillCategories={skillCategories}
            skillLevels={skillLevels}
          />
        )}
      </div>

      {/* Shapes (decorative element) */}
      <Shapes />
    </section>
  );
};

export default Dashboard;
