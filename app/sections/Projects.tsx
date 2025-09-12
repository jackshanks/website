import React, { forwardRef } from "react";
import { projects } from "../lib/data";
import { ProjectCard } from "@/app/components";

export const Projects = forwardRef<HTMLElement>((props, ref) => {
    return (
        <section ref={ref} className="relative py-24 px-6">
            <div className="container mx-auto max-w-6xl">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Featured Projects
            </span>
                    </h2>
                </div>

                <div className="space-y-8">
                    {projects.map((project, index) => (
                        <ProjectCard key={index} project={project} />
                    ))}
                </div>
            </div>
        </section>
    );
});

Projects.displayName = "Projects";