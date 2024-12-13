import React from "react";
import { ProjectCard } from "../components/ProjectCard";
import { projects } from "../data/Projects";

const Projects = () => {
  return (
    <section id="projects" className="py-16 px-6">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl font-bold mb-12 text-center bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          Featured Projects
        </h2>
        <div className="space-y-8">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export { Projects, Projects as default };
