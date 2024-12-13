import React from "react";
import { skillCategories } from "../data/Skills";

const Skills = () => {
  return (
    <section className="py-16 px-6">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl font-bold mb-12 text-center bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          Technical Arsenal
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {skillCategories.map((category) => (
            <div
              key={category.title}
              className={`p-6 rounded-xl border ${category.borderColor} ${category.bgColor} backdrop-blur-sm transition-transform hover:scale-[1.02]`}
            >
              <div className="flex items-center gap-3 mb-4">
                {category.icon}
                <h3 className="text-xl font-semibold">{category.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-gray-800/50 rounded-full text-sm border border-gray-700 hover:border-gray-500 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Skills, Skills as default };
