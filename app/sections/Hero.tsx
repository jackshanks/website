import React, { forwardRef } from "react";
import { Zap, ArrowRight } from "lucide-react";

interface HeroProps {
    scrollY: number;
    scrollToSection: (ref: React.RefObject<HTMLElement>) => void;
    refs: {
        projects: React.RefObject<HTMLElement>;
        contact: React.RefObject<HTMLElement>;
    };
}

export const Hero = forwardRef<HTMLElement, HeroProps>(
    ({ scrollY, scrollToSection, refs }, ref) => {
        return (
            <section
                ref={ref}
                className="relative min-h-screen flex items-center justify-center px-6 pt-20"
            >
                <div
                    className="container mx-auto max-w-6xl"
                    style={{
                        transform: `translateY(${scrollY * 0.5}px)`,
                        opacity: 1 - scrollY / 500,
                    }}
                >
                    <div className="text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 mb-8">
                            <Zap className="w-4 h-4 text-purple-400" />
                            <span className="text-sm text-purple-400">Available for offers</span>
                        </div>

                        <h1 className="text-6xl md:text-8xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-gradient">
                Jack Shanks
              </span>
                        </h1>

                        <p className="text-2xl md:text-3xl text-gray-400 mb-4">
                            Backend Developer & AI Specialist
                        </p>

                        <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto">
                            Building solutions for the future with reliable microservices. Well-versed
                            with AI, able to tackle any problem with an AI based solution!
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                            <button
                                onClick={() => scrollToSection(refs.projects)}
                                className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full font-semibold hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105"
                            >
                <span className="flex items-center gap-2">
                  Explore My Work
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                            </button>
                            <button
                                onClick={() => scrollToSection(refs.contact)}
                                className="px-8 py-4 border border-gray-700 rounded-full font-semibold hover:bg-white/5 hover:border-gray-500 transition-all duration-300"
                            >
                                Get In Touch
                            </button>
                        </div>

                        <div className="flex justify-center items-center gap-8 text-gray-500">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-white mb-1">2</div>
                                <div className="text-sm">Years Experience</div>
                            </div>
                            <div className="w-px h-12 bg-gray-700" />
                            <div className="text-center">
                                <div className="text-3xl font-bold text-white mb-1">9+</div>
                                <div className="text-sm">Languages Known</div>
                            </div>
                            <div className="w-px h-12 bg-gray-700" />
                            <div className="text-center">
                                <div className="text-3xl font-bold text-white mb-1">3</div>
                                <div className="text-sm">Projects worked on</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
);

Hero.displayName = "Hero";