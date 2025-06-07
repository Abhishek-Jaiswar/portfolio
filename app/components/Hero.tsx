"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <p className="text-[#64ffda] font-mono mb-4">Hi, my name is</p>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-[#ccd6f6] mb-4">
            Your Name.
          </h1>
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold text-[#8892b0] mb-6">
            I build things for the web.
          </h2>
          <p className="text-[#8892b0] max-w-2xl mb-12">
            I'm a software engineer specializing in building exceptional digital
            experiences. Currently, I'm focused on building accessible,
            human-centered products.
          </p>
          <div>
            <Link
              href="#projects"
              className="text-[#64ffda] border border-[#64ffda] px-8 py-4 rounded font-mono text-sm hover:bg-[#64ffda]/10 transition-colors inline-block"
            >
              Check out my work!
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
