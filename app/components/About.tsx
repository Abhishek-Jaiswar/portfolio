"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const About = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("about");
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return (
    <section id="about" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h2 className="text-3xl font-bold text-[#ccd6f6] mb-12">
            <span className="text-[#64ffda] font-mono">01.</span> About Me
          </h2>
          <div className="grid md:grid-cols-3 gap-8 items-start">
            <div className="md:col-span-2 space-y-4">
              <p className="text-[#8892b0]">
                Hello! My name is [Your Name] and I enjoy creating things that
                live on the internet. My interest in web development started
                back in [Year] when I decided to try editing custom Tumblr
                themes — turns out hacking together a custom reblog button
                taught me a lot about HTML & CSS!
              </p>
              <p className="text-[#8892b0]">
                Fast-forward to today, and I've had the privilege of working at
                an advertising agency, a start-up, and a huge corporation. My
                main focus these days is building accessible, inclusive products
                and digital experiences for a variety of clients.
              </p>
              <p className="text-[#8892b0]">
                I also recently launched a course that teaches everything you
                need to build a web app with Next.js and Firebase.
              </p>
              <p className="text-[#8892b0]">
                Here are a few technologies I've been working with recently:
              </p>
              <ul className="grid grid-cols-2 gap-2 font-mono text-sm text-[#8892b0]">
                <li className="relative pl-5 before:content-['▹'] before:absolute before:left-0 before:text-[#64ffda]">
                  JavaScript (ES6+)
                </li>
                <li className="relative pl-5 before:content-['▹'] before:absolute before:left-0 before:text-[#64ffda]">
                  TypeScript
                </li>
                <li className="relative pl-5 before:content-['▹'] before:absolute before:left-0 before:text-[#64ffda]">
                  React
                </li>
                <li className="relative pl-5 before:content-['▹'] before:absolute before:left-0 before:text-[#64ffda]">
                  Next.js
                </li>
                <li className="relative pl-5 before:content-['▹'] before:absolute before:left-0 before:text-[#64ffda]">
                  Node.js
                </li>
                <li className="relative pl-5 before:content-['▹'] before:absolute before:left-0 before:text-[#64ffda]">
                  Tailwind CSS
                </li>
                <li className="relative pl-5 before:content-['▹'] before:absolute before:left-0 before:text-[#64ffda]">
                  PostgreSQL
                </li>
                <li className="relative pl-5 before:content-['▹'] before:absolute before:left-0 before:text-[#64ffda]">
                  MongoDB
                </li>
              </ul>
            </div>
            <div className="md:col-span-1 flex justify-center items-center">
              <div className="relative w-60 h-60 rounded-lg overflow-hidden group border-2 border-[#64ffda] hover:bg-[#64ffda]/20 transition-all duration-300">
                <Image
                  src="/profile.jpg" // REMINDER: Add your profile image here
                  alt="Your Profile Picture"
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
