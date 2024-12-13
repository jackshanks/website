import React from "react";
import { Mail } from "lucide-react";

const Hero = () => {
  return (
    <header className="bg-gradient-to-b from-slate-900 to-slate-800 pt-24 pb-16 px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Jack Shanks
          </h1>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
              <p className="text-xl text-slate-200">
                BSc Computer Science Student & Developer
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
              <p className="text-slate-300">
                Hull, East Yorkshire, United Kingdom
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="mailto:jacklshanks@gmail.com"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors duration-200"
          >
            <Mail size={20} />
            <span>Contact Me</span>
          </a>
          <a
            href="#projects"
            className="inline-flex items-center justify-center px-6 py-3 border border-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors duration-200"
          >
            View Projects
          </a>
        </div>
      </div>
    </header>
  );
};

export { Hero, Hero as default };
