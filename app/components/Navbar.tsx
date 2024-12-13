import { SiGithub, SiLinkedin } from "@icons-pack/react-simple-icons";

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full bg-gray-900/80 backdrop-blur-sm z-50 border-b border-gray-800">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          Portfolio
        </span>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/jackshanks"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 hover:text-purple-400 transition-colors"
          >
            <SiGithub size={20} />
          </a>
          <a
            href="https://linkedin.com/in/jack-shanks-83a877204"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 hover:text-purple-400 transition-colors"
          >
            <SiLinkedin size={20} />
          </a>
        </div>
      </div>
    </nav>
  );
};

export { Navbar, Navbar as default };
