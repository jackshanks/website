import React from 'react';
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code2,
  Wrench,
} from 'lucide-react';

const Portfolio = () => {
  const skillCategories = [
    {
      title: "Languages & Core",
      icon: <Code2 className="w-6 h-6" />,
      skills: ["TypeScript", "Python", "C#", "C++", "Go", "JavaScript", "SQL"],
      bgColor: "bg-purple-900/40",
      borderColor: "border-purple-700"
    },
    {
      title: "DevOps & Tools",
      icon: <Wrench className="w-6 h-6" />,
      skills: ["Git", "Docker", "Azure", "CI/CD", "Linux", "Bash"],
      bgColor: "bg-orange-900/40",
      borderColor: "border-orange-700"
    }
  ];

  const projects = [
    {
      title: "Mue API",
      description: "Backend go API with real-time data visualization, authentication, and dark mode support",
      tech: ["REST", "TurbobaseDB", "Node.js", "SQLite"],
      highlights: [
        "Rebuilt from the ground up using go",
        "Heavily reduced load times",
        "Reduced server load"
      ],
      links: { github: "https://github.com/mue/api/tree/v3", live: "https://muetab.com" }
    },
    // ... rest of the projects remain the same
  ];

  return (
      <div className="min-h-screen bg-gray-900 text-gray-100">
        {/* Navigation */}
        <nav className="fixed top-0 w-full bg-gray-900/80 backdrop-blur-sm z-50 border-b border-gray-800">
          <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <span
              className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Portfolio
          </span>
            <div className="flex items-center gap-4">
              <a href="https://github.com/jackshanks"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="p-2 hover:text-purple-400 transition-colors">
                <Github size={20}/>
              </a>
              <a href="https://linkedin.com/in/jack-shanks-83a877204"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="p-2 hover:text-purple-400 transition-colors">
                <Linkedin size={20}/>
              </a>
            </div>
          </div>
        </nav>

        {/* Hero Section with Terminal Effect */}
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
                <Mail size={20}/>
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

        {/* Skills Section */}
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

        {/* Rest of the sections remain similar but with dark theme colors */}
        {/* Projects Section */}
        <section id="projects" className="py-16 px-6">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold mb-12 text-center bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <div className="space-y-8">
              {projects.map((project) => (
                  <div
                      key={project.title}
                      className="p-6 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-gray-600 transition-all"
                  >
                    <h3 className="text-2xl font-semibold mb-4">{project.title}</h3>
                    <p className="text-gray-300 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map(tech => (
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
                      <a href={project.links.github}
                         className="flex items-center gap-2 text-gray-300 hover:text-purple-400 transition-colors">
                        <Github size={20}/>
                        View Code
                      </a>
                      {project.links.live && (
                          <a href={project.links.live}
                             className="flex items-center gap-2 text-gray-300 hover:text-purple-400 transition-colors">
                            <ExternalLink size={20}/>
                            Live Demo
                          </a>
                      )}
                    </div>
                  </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 px-6">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Let's Connect
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              I am currently looking for new opportunities. Whether you have a question or just want to say hi,
              I will get back to you!
            </p>
            <div className="flex justify-center gap-6">
              <a href="mailto:jacklshanks@gmail.com"
                 className="flex items-center gap-2 px-6 py-3 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors">
                <Mail size={20}/>
                Email Me
              </a>
              <a href="https://linkedin.com/in/yourusername"
                 className="flex items-center gap-2 px-6 py-3 border border-purple-600 rounded-lg hover:bg-purple-900/20 transition-colors">
                <Linkedin size={20}/>
                LinkedIn
              </a>
            </div>
          </div>
        </section>
      </div>
  );
};

export default Portfolio;