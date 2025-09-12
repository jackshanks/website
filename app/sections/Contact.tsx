import React, { forwardRef } from "react";
import { Mail, Linkedin } from "lucide-react";

export const Contact = forwardRef<HTMLElement>((props, ref) => {
    return (
        <section ref={ref} className="relative py-24 px-6">
            <div className="container mx-auto max-w-4xl">
                <div className="relative rounded-3xl overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20" />
                    <div className="absolute inset-0 backdrop-blur-xl" />

                    <div className="relative p-12 text-center">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Let&#39;s Build Something Amazing
              </span>
                        </h2>

                        <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
                            I&#39;m currently open to new opportunities and projects.
                            Whether you have a question or just want to connect, I&#39;d love to
                            hear from you!
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="mailto:jacklshanks@gmail.com"
                                className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full font-semibold hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105"
                            >
                <span className="flex items-center justify-center gap-2">
                  <Mail className="w-5 h-5" />
                  jacklshanks@gmail.com
                </span>
                            </a>

                            <a
                                href="https://www.linkedin.com/in/jack-shanks-83a877204/"
                                className="px-8 py-4 border border-gray-700 rounded-full font-semibold hover:bg-white/5 hover:border-gray-500 transition-all duration-300"
                            >
                <span className="flex items-center justify-center gap-2">
                  <Linkedin className="w-5 h-5" />
                  Connect on LinkedIn
                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
});

Contact.displayName = "Contact";