import React from "react";

import Home from "./home/Home";
import About from "./about/About";
import Skills from "./skills/Skills";

import useDocumentTitle from "../useDocumentTitle";

import useSkills from "../hooks/useSkills";

const HomePageContent = () => {
  const { skillsData, skillCategories, skillLevels, isLoading } = useSkills();

  useDocumentTitle("Accueil");
  return (
    <>
      <Home />
      <About />
      <Skills
        skillsData={skillsData}
        skillCategories={skillCategories}
        skillLevels={skillLevels}
        isLoading={isLoading}
        isAdmin={false} // No edit functionality on the homepage
      />
    </>
  );
};

export default HomePageContent;
