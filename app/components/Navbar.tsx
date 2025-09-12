// app/components/Navbar.tsx
"use client";

import React, { useState } from "react";
import { Sparkles, Github, Linkedin, Menu, X } from "lucide-react";

interface NavbarProps {
    activeSection: string;
    scrollToSection: (ref: React.RefObject<HTMLElement>) => void;
    refs: {
        hero: React.RefObject<HTMLElement>;
        skills: React.RefObject<HTMLElement>;
        projects: React.RefObject<HTMLElement>;
        contact: React.RefObject<HTMLElement>;
    };
}

export const Navbar: React.FC<NavbarProps> = ({
                                                  activeSection,
                                                  scrollToSection,
                                                  refs,
                                              }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navLinks = [
        { id: "hero", ref: refs.hero },
        { id: "skills", ref: refs.skills },
        { id: "projects", ref: refs.projects },
        { id: "contact", ref: refs.contact },
    ];

    return (
        <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-black/30 border-b border-white/10">
            <div className="container mx-auto px-6 py-4">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                            <Sparkles className="w-6 h-6" />
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Portfolio
            </span>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map(({ id, ref }) => (
                            <button
                                key={id}
                                onClick={() => scrollToSection(ref)}
                                className={`capitalize transition-colors ${
                                    activeSection === id
                                        ? "text-purple-400"
                                        : "text-gray-400 hover:text-white"
                                }`}
                            >
                                {id}
                            </button>
                        ))}
                        <div className="flex gap-4">
                            <a
                                href="https://github.com/jackshanks"
                                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                                aria-label="GitHub"
                            >
                                <Github className="w-5 h-5" />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/jack-shanks-83a877204/"
                                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                                aria-label="LinkedIn"
                            >
                                <Linkedin className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2"
                        aria-label="Toggle mobile menu"
                    >
                        {mobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-white/10">
                        <div className="flex flex-col p-6 gap-4">
                            {navLinks.map(({ id, ref }) => (
                                <button
                                    key={id}
                                    onClick={() => {
                                        scrollToSection(ref);
                                        setMobileMenuOpen(false);
                                    }}
                                    className="text-left capitalize text-gray-400 hover:text-white transition-colors"
                                >
                                    {id}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};