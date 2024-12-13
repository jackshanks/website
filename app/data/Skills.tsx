import { Code2, Wrench } from "lucide-react";

export const skillCategories = [
  {
    title: "Languages & Core",
    icon: <Code2 className="w-6 h-6" />,
    skills: ["TypeScript", "Python", "C#", "C++", "Go", "JavaScript", "SQL"],
    bgColor: "bg-purple-900/40",
    borderColor: "border-purple-700",
  },
  {
    title: "DevOps & Tools",
    icon: <Wrench className="w-6 h-6" />,
    skills: ["Git", "Docker", "Azure", "CI/CD", "Linux", "Bash"],
    bgColor: "bg-orange-900/40",
    borderColor: "border-orange-700",
  },
];
