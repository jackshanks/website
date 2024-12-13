import React from "react";
import { Hero, Skills, Projects, Contact } from "./sections";

const Portfolio = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Hero />
      <Skills />
      <Projects />
      <Contact />
    </div>
  );
};

export default Portfolio;
