import {
    Palette,
    Terminal,
    Cloud,
    Brain,
} from "lucide-react";

export const projects = [
    {
        title: "Backend Developer @ Visr",
        description:
            "Architectured and delivered microservices for the companies' virtual reality platform." +
            "This centered around AI solutions such as 3D asset generation.",
        tech: [".NET", "Python", "Azure", "Docker", "SpiceDB", "SQLite", "Redis"],
        highlights: [
            "3D Asset generation",
            "Managing tight performance and storage constraints",
            "Creating reliable images and queue solutions",
        ],
        live: "https://visr-vr.com/",
        gradient: "from-purple-600 to-blue-600",
    },
    {
        title: "Muetab API @ Kaiso One",
        description:
            "Recreated a backend API using Go from scratch, including database work",
        tech: ["Go", "REST", "Node.js", "SQLite"],
        highlights: [
            "Ground up API development using Go",
            "Heavily reduced load times",
            "Reduced server load",
        ],
        github: "https://github.com/mue/api/tree/v3",
        live: "https://muetab.com/",
        gradient: "from-pink-600 to-purple-600",
    },
    {
        title: "Card Game",
        description:
            "Managed the development of a for-fun card game for personal use.",
        tech: ["Go", ".NET", "Postgre", "Docker", "Github"],
        highlights: [
            "Managed a project with 5 contributors",
            "Diverse range of work to create a game from the ground up",
            "Direct work with Github project management",
        ],
        github: "https://github.com/jackshanks/Hulligans-Card-Game",
        gradient: "from-green-600 to-teal-600",
    },
];

export const skillCategories = [
    {
        title: "Frontend Experience",
        icon: <Palette className="w-6 h-6" />,
        skills: [
            "React",
            "TypeScript",
            "Next.js",
        ],
        color: "from-purple-500 to-pink-500",
    },
    {
        title: "Backend Experience",
        icon: <Terminal className="w-6 h-6" />,
        skills: ["Node.js", "Python", "Go", ".NET", "PostgreSQL", "SQLite"],
        color: "from-blue-500 to-cyan-500",
    },
    {
        title: "Cloud Architecture",
        icon: <Cloud className="w-6 h-6" />,
        skills: ["Docker", "Redis", "Azure" ,"CI/CD"],
        color: "from-green-500 to-teal-500",
    },
    {
        title: "AI & Data",
        icon: <Brain className="w-6 h-6" />,
        skills: [
            "TensorFlow",
            "PyTorch",
            "Scikit-learn",
            "Pandas",
            "Trellis",
        ],
        color: "from-orange-500 to-red-500",
    },
];