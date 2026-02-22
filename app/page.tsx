'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useBoatController } from './hooks/useBoatController';
import {
  PixelBoat,
  OceanBackground,
  PixelModal,
  Island,
  TreasureMap,
} from './components/pirate';
import { islands, skillCategories, projects } from './lib/data';
import { Zap, Mail, Linkedin, Github, ExternalLink, Anchor } from 'lucide-react';

// Modal content components
function HomeContent() {
  return (
    <div className="text-center">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-sm bg-pirate-gold/20 border border-pirate-gold/30 mb-6">
        <Zap className="w-4 h-4 text-pirate-gold" />
        <span className="text-sm text-pirate-gold font-pixel text-[8px]">Available for contract</span>
      </div>

      <h1 className="text-2xl md:text-4xl font-pixel mb-4 text-pirate-gold">
        Jack Shanks
      </h1>

      <p className="text-lg md:text-xl text-pixel-lightgray mb-4">
        Full-Stack Developer
      </p>

      <p className="text-sm text-pixel-lightgray mb-8 max-w-xl mx-auto">
        Hi! I&apos;m Jack. I spend a lot of my time coding, usually with an interest in microservices and AI. When I&apos;m not doing that,
          I&apos;m typically playing games or touching grass!
      </p>

      <div className="flex justify-center items-center gap-6 text-pixel-lightgray">
        <div className="text-center">
          <div className="text-2xl font-pixel text-pirate-gold mb-1">2</div>
          <div className="text-[10px] font-pixel">Years Exp</div>
        </div>
        <div className="w-px h-10 bg-pixel-gray" />
        <div className="text-center">
          <div className="text-2xl font-pixel text-pirate-gold mb-1">10</div>
          <div className="text-[10px] font-pixel">Languages</div>
        </div>
        <div className="w-px h-10 bg-pixel-gray" />
        <div className="text-center">
          <div className="text-2xl font-pixel text-pirate-gold mb-1">3</div>
          <div className="text-[10px] font-pixel">Projects</div>
        </div>
      </div>
    </div>
  );
}

function SkillsContent() {
  return (
    <div>
      <h2 className="text-xl font-pixel text-pirate-gold text-center mb-6">
        Technical Expertise
      </h2>
      <p className="text-pixel-lightgray text-center mb-8 text-sm">
        Mastering the tools that bring ideas to life
      </p>

      <div className="grid md:grid-cols-2 gap-4">
        {skillCategories.map((category) => (
          <div
            key={category.title}
            className="p-4 bg-pixel-darkergray/50 border-2 border-pixel-gray"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`p-2 bg-gradient-to-r ${category.color} text-white`}>
                {category.icon}
              </div>
              <h3 className="font-pixel text-[10px] text-pixel-white">{category.title}</h3>
            </div>

            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-1 text-xs bg-pixel-black border border-pixel-gray text-pixel-lightgray"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectsContent() {
  return (
    <div>
      <h2 className="text-xl font-pixel text-pirate-gold text-center mb-6">
        Featured Projects
      </h2>

      <div className="space-y-6">
        {projects.map((project, index) => (
          <div
            key={index}
            className="p-4 bg-pixel-darkergray/50 border-2 border-pixel-gray"
          >
            <h3 className="font-pixel text-[10px] text-pixel-white mb-2">
              {project.title}
            </h3>
            <p className="text-sm text-pixel-lightgray mb-3">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-3">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className={`px-2 py-1 text-xs bg-gradient-to-r ${project.gradient} text-white`}
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="mb-3">
              <p className="text-[10px] font-pixel text-pixel-gray mb-1">Highlights:</p>
              <ul className="text-sm text-pixel-lightgray space-y-1">
                {project.highlights.map((highlight, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-pirate-gold">*</span>
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-3">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-sm text-pixel-lightblue hover:text-pirate-gold transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>Code</span>
                </a>
              )}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-sm text-pixel-lightblue hover:text-pirate-gold transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Live</span>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContactContent() {
  return (
    <div className="text-center">
      <h2 className="text-xl font-pixel text-pirate-gold mb-4">
        Let&apos;s Build Something Amazing
      </h2>

      <p className="text-sm text-pixel-lightgray mb-8 max-w-lg mx-auto">
        I&apos;m currently open to new opportunities and projects.
        Whether you have a question or just want to connect, I&apos;d love to
        hear from you!
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a
          href="mailto:jacklshanks@gmail.com"
          aria-label="Send email to jacklshanks@gmail.com"
          className="pixel-button flex items-center justify-center gap-2"
        >
          <Mail className="w-4 h-4" />
          <span>jacklshanks@gmail.com</span>
        </a>

        <a
          href="https://www.linkedin.com/in/jack-shanks-83a877204/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit LinkedIn profile"
          className="px-6 py-3 border-2 border-pixel-gray text-pixel-lightgray hover:border-pirate-gold hover:text-pirate-gold transition-colors flex items-center justify-center gap-2"
        >
          <Linkedin className="w-4 h-4" />
          <span>LinkedIn</span>
        </a>
      </div>
    </div>
  );
}

// Modal title mapping
const modalTitles: Record<string, string> = {
  home: 'Welcome Aboard!',
  skills: 'Skill Shores',
  projects: 'Project Bay',
  contact: 'Message Cove',
};

// Modal content mapping
const modalContent: Record<string, React.ReactNode> = {
  home: <HomeContent />,
  skills: <SkillsContent />,
  projects: <ProjectsContent />,
  contact: <ContactContent />,
};

export default function Page() {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [showSplash, setShowSplash] = useState(true);

  // Initialize boat controller
  const {
    boatX,
    velocity,
    isDragging,
    isSailing,
    nearestIsland,
    sailTo,
    handleMouseDown,
    handleTouchStart,
  } = useBoatController(islands);

  // Handle anchor action (open modal)
  const handleAnchor = useCallback((islandId: string) => {
    setActiveModal(islandId);
  }, []);

  // Intro splash timer
  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Handle space key for anchoring
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'Enter') {
        if (nearestIsland && !activeModal) {
          e.preventDefault();
          handleAnchor(nearestIsland);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nearestIsland, activeModal, handleAnchor]);

  // Navigate to island from treasure map
  const handleNavigate = useCallback((position: number) => {
    sailTo(position);
  }, [sailTo]);

  return (
    <div className="fixed inset-0 overflow-hidden bg-ocean-deep">
      {/* Intro splash */}
      {showSplash && (
        <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-ocean-deep splash-fade">
          <Anchor className="w-16 h-16 text-pirate-gold animate-anchor-bob mb-6" />
          <h1 className="font-pixel text-2xl md:text-4xl text-pirate-gold mb-4" style={{ textShadow: '3px 3px 0 #333c57' }}>
            Ahoy!
          </h1>
          <p className="font-pixel text-[10px] text-pixel-lightgray">Setting sail...</p>
        </div>
      )}

      {/* Ocean background with parallax */}
      <OceanBackground boatX={boatX} />

      {/* World container - translates based on boat position */}
      <div
        className="absolute inset-0"
        role="application"
        aria-label="Ocean navigation — click to sail, use arrow keys to steer"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        style={{ cursor: isDragging ? 'grabbing' : 'pointer' }}
      >
        {/* Islands */}
        {islands.map((island) => (
          <Island
            key={island.id}
            island={island}
            isNearby={nearestIsland === island.id}
            onAnchor={() => handleAnchor(island.id)}
          />
        ))}

        {/* Boat */}
        <PixelBoat
          x={boatX}
          velocity={velocity}
          isDragging={isDragging}
          isSailing={isSailing}
        />
      </div>

      {/* Treasure map navigation */}
      <TreasureMap
        islands={islands}
        boatX={boatX}
        nearestIsland={nearestIsland}
        onNavigate={handleNavigate}
      />

      {/* Title overlay */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 text-center z-50 pointer-events-none">
        <h1 className="font-pixel text-xl md:text-2xl text-pirate-gold mb-2" style={{ textShadow: '3px 3px 0 #1a1c2c, -1px -1px 0 #1a1c2c' }}>
          Jack Shanks
        </h1>
        <p className="font-pixel text-[10px] md:text-xs text-pixel-lightgray" style={{ textShadow: '2px 2px 0 #1a1c2c' }}>
          Full-Stack Developer
        </p>
      </div>

      {/* Instruction overlay - shown after splash fades */}
      {!showSplash && boatX < 10 && !activeModal && (
        <div className="fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-40 pointer-events-none animate-pulse">
          <p className="font-pixel text-sm md:text-base text-pirate-gold mb-3" style={{ textShadow: '3px 3px 0 #1a1c2c' }}>
            Click on the ocean to sail
          </p>
          <p className="font-pixel text-[10px] md:text-xs text-pixel-lightgray" style={{ textShadow: '2px 2px 0 #1a1c2c' }}>
            or use arrow keys to steer
          </p>
        </div>
      )}

      {/* Modal for island content */}
      <PixelModal
        isOpen={activeModal !== null}
        onClose={() => setActiveModal(null)}
        title={activeModal ? modalTitles[activeModal] : ''}
      >
        {activeModal && modalContent[activeModal]}
      </PixelModal>
    </div>
  );
}
