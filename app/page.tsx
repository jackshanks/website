"use client";

import React, { useState, useEffect, useRef, CSSProperties } from "react";
import { Navbar } from "@/app/components";
import { Footer } from "./components/Footer";
import { Hero } from "@/app/sections";
import { Skills } from "@/app/sections";
import { Projects } from "@/app/sections";
import { Contact } from "@/app/sections";

interface StarStyle extends CSSProperties {
    animationDelay: string;
    animationDuration: string;
}

export default function Page() {
    const [scrollY, setScrollY] = useState(0);
    const [activeSection, setActiveSection] = useState("hero");
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [starStyles, setStarStyles] = useState<StarStyle[]>([]);

    const heroRef = useRef<HTMLElement>(null);
    const skillsRef = useRef<HTMLElement>(null);
    const projectsRef = useRef<HTMLElement>(null);
    const contactRef = useRef<HTMLElement>(null);

    const sectionRefs = {
        hero: heroRef,
        skills: skillsRef,
        projects: projectsRef,
        contact: contactRef,
    };

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);

            const scrollPosition = window.scrollY + window.innerHeight / 2;

            for (const [id, ref] of Object.entries(sectionRefs)) {
                if (ref.current) {
                    const { offsetTop, offsetHeight } = ref.current;
                    if (
                        scrollPosition >= offsetTop &&
                        scrollPosition < offsetTop + offsetHeight
                    ) {
                        setActiveSection(id);
                        break;
                    }
                }
            }
        };

        const generateStars = () => {
            const newStars = Array.from({ length: 50 }).map(() => ({
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 3}px`,
                height: `${Math.random() * 3}px`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
            }));
            setStarStyles(newStars);
        };
        generateStars();

        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener("scroll", handleScroll);
        window.addEventListener("mousemove", handleMouseMove);
        handleScroll(); // Initial check

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, [sectionRefs]);

    const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
        ref.current?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="min-h-screen bg-black text-white overflow-x-hidden">
            {/* Animated Background */}
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20" />
                <div
                    className="absolute inset-0 opacity-30"
                    style={{
                        backgroundImage: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.15) 0%, transparent 50%)`,
                        transition: "background 0.3s ease",
                    }}
                />
                {starStyles.map((style, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full bg-white/10 animate-pulse"
                        style={style}
                    />
                ))}
            </div>

            <Navbar
                activeSection={activeSection}
                scrollToSection={scrollToSection}
                refs={sectionRefs}
            />

            <main>
                <Hero
                    ref={heroRef}
                    scrollY={scrollY}
                    scrollToSection={scrollToSection}
                    refs={{ projects: projectsRef, contact: contactRef }}
                />
                <Skills ref={skillsRef} />
                <Projects ref={projectsRef} />
                <Contact ref={contactRef} />
            </main>

            <Footer />
        </div>
    );
}