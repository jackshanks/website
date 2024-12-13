import React from "react";
import { ExternalLink } from "lucide-react";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { Project } from "../data/Projects";

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-gray-600 transition-all">
      <h3 className="text-2xl font-semibold mb-4">{project.title}</h3>
      <p className="text-gray-300 mb-4">{project.description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {project.tech.map((tech) => (
          <span
            key={tech}
            className="px-3 py-1 bg-purple-900/30 text-purple-400 rounded-full text-sm border border-purple-700"
          >
            {tech}
          </span>
        ))}
      </div>
      <ul className="list-disc list-inside mb-4 text-gray-300">
        {project.highlights.map((highlight, i) => (
          <li key={i}>{highlight}</li>
        ))}
      </ul>
      <div className="flex gap-4">
        <a
          href={project.links.github}
          className="flex items-center gap-2 text-gray-300 hover:text-purple-400 transition-colors"
        >
          <SiGithub size={20} />
          View Code
        </a>
        {project.links.live && (
          <a
            href={project.links.live}
            className="flex items-center gap-2 text-gray-300 hover:text-purple-400 transition-colors"
          >
            <ExternalLink size={20} />
            Live Demo
          </a>
        )}
      </div>
    </div>
  );
};
