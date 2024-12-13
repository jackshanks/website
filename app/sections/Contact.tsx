import React from "react";
import { Mail } from "lucide-react";
import { SiLinkedin } from "@icons-pack/react-simple-icons";

export const Contact: React.FC = () => {
  return (
    <section className="py-16 px-6">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          Contact Me
        </h2>
        <p className="text-xl text-gray-300 mb-8">
          I am currently looking for new opportunities. Whether you have a
          question or just want to say hi, I will get back to you!
        </p>
        <div className="flex justify-center gap-6">
          <a
            href="mailto:jacklshanks@gmail.com"
            className="flex items-center gap-2 px-6 py-3 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Mail size={20} />
            Email Me
          </a>
          <a
            href="https://linkedin.com/in/yourusername"
            className="flex items-center gap-2 px-6 py-3 border border-purple-600 rounded-lg hover:bg-purple-900/20 transition-colors"
          >
            <SiLinkedin size={20} />
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
};
