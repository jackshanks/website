export interface Project {
  title: string;
  description: string;
  tech: string[];
  highlights: string[];
  links: {
    github: string;
    live?: string;
  };
}

export const projects: Project[] = [
  {
    title: "Mue API",
    description:
      "Backend go API with real-time data visualization, authentication, and dark mode support",
    tech: ["REST", "TurbobaseDB", "Node.js", "SQLite"],
    highlights: [
      "Rebuilt from the ground up using go",
      "Heavily reduced load times",
      "Reduced server load",
    ],
    links: {
      github: "https://github.com/mue/api/tree/v3",
      live: "https://muetab.com",
    },
  },
  // Add more projects here
];
