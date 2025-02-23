import React from "react";
import Home from "./home/Home";
import About from "./about/About";
import Skills from "./skills/Skills";

import useDocumentTitle from "../useDocumentTitle";

const HomePageContent = () => {
  useDocumentTitle("Accueil");
  return (
    <>
      <Home />
      <About />
      <Skills />
    </>
  );
};

export default HomePageContent;
