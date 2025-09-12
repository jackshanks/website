// app/components/ProjectCard.tsx

import React from "react";
import { Github, ExternalLink, Rocket, Star } from "lucide-react";

interface ProjectCardProps {
    project: {
        title: string;
        description: string;
        tech: string[];
        highlights: string[];
        github?: string;
        live?: string;
        gradient: string;
    };
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
    return (
        <div className="group relative rounded-2xl overflow-hidden">
            <div
                className={`absolute inset-0 bg-gradient-to-r ${project.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}
            />

            <div className="relative p-8 bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl hover:border-gray-600 transition-all duration-300">
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="flex-1">
                        <div className="flex items-start justify-between mb-4">
                            <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                {project.title}
                            </h3>
                            <Rocket
                                className={`w-6 h-6 text-gray-600 group-hover:text-purple-400 transition-colors`}
                            />
                        </div>

                        <p className="text-gray-400 mb-6">{project.description}</p>

                        <div className="flex flex-wrap gap-2 mb-6">
                            {project.tech.map((tech) => (
                                <span
                                    key={tech}
                                    className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${project.gradient} text-white`}
                                >
                  {tech}
                </span>
                            ))}
                        </div>

                        <ul className="space-y-2 mb-6">
                            {project.highlights.map((highlight, i) => (
                                <li
                                    key={i}
                                    className="flex items-start gap-2 text-gray-300"
                                >
                                    <Star className="w-4 h-4 text-purple-400 mt-1 flex-shrink-0" />
                                    <span>{highlight}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="flex gap-4">
                            <a
                                href={project.github}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
                            >
                                <Github className="w-5 h-5" />
                                View Code
                            </a>
                            {project.live && (
                                <a
                                    href={project.live}
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-700 hover:bg-gray-800 transition-colors"
                                >
                                    <ExternalLink className="w-5 h-5" />
                                    Live Demo
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};