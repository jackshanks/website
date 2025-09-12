import React, { forwardRef } from "react";
import { skillCategories } from "../lib/data";

export const Skills = forwardRef<HTMLElement>((props, ref) => {
    return (
        <section ref={ref} className="relative py-24 px-6">
            <div className="container mx-auto max-w-6xl">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Technical Expertise
            </span>
                    </h2>
                    <p className="text-gray-400 text-lg">
                        Mastering the tools that bring ideas to life
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {skillCategories.map((category) => (
                        <div
                            key={category.title}
                            className="group relative p-6 rounded-2xl bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-gray-800 hover:border-gray-600 transition-all duration-300 hover:transform hover:scale-[1.02]"
                        >
                            <div
                                className="absolute inset-0 rounded-2xl bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                                style={{ backgroundImage: `linear-gradient(to right, var(--tw-gradient-from), var(--tw-gradient-to))` }}
                            />

                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-4">
                                    <div
                                        className={`p-2 rounded-lg bg-gradient-to-r ${category.color} text-white`}
                                    >
                                        {category.icon}
                                    </div>
                                    <h3 className="text-xl font-semibold">{category.title}</h3>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {category.skills.map((skill) => (
                                        <span
                                            key={skill}
                                            className="px-3 py-1 rounded-full text-sm bg-gray-800/50 border border-gray-700 hover:border-gray-500 hover:bg-gray-700/50 transition-all duration-200"
                                        >
                      {skill}
                    </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
});

Skills.displayName = "Skills";