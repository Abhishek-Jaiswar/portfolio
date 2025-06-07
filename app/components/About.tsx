"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });

    if (contentRef.current) {
      tl.from(contentRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
      });
    }

    if (imageRef.current) {
      tl.from(
        imageRef.current,
        {
          x: 50,
          opacity: 0,
          duration: 1,
          ease: "power4.out",
        },
        "-=0.5"
      );
    }

    if (skillsRef.current) {
      tl.from(
        skillsRef.current.children,
        {
          y: 20,
          opacity: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
        },
        "-=0.5"
      );
    }

    return () => {
      tl.kill();
    };
  }, []);

  const skills = [
    "JavaScript (ES6+)",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Tailwind CSS",
    "GraphQL",
    "PostgreSQL",
  ];

  return (
    <section ref={sectionRef} id="about" className="py-20 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1A202C]/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div ref={contentRef} className="space-y-6">
            <h2 className="flex items-center text-3xl font-bold text-[#E2E8F0] relative">
              <span className="text-[#66FCF1] font-mono text-xl mr-4">01.</span>
              About Me
              <span className="flex-grow block h-[1px] bg-[#4A5568] ml-4"></span>
            </h2>

            <div className="space-y-4">
              <p className="text-[#A0AEC0] leading-relaxed">
                Hello! My name is Abhishek Jaiswar and I enjoy creating things
                that live on the internet. My interest in web development
                started back in 2020 when I decided to try editing custom Tumblr
                themes — turns out hacking together a custom reblog button
                taught me a lot about HTML & CSS!
              </p>
              <p className="text-[#A0AEC0] leading-relaxed">
                Fast-forward to today, and I&#39;ve had the privilege of working
                at various companies and startups. My main focus these days is
                building accessible, inclusive products and digital experiences
                for a variety of clients.
              </p>
              <p className="text-[#A0AEC0] leading-relaxed">
                I also recently launched a course that teaches everything you
                need to build a web app with Next.js and Firebase.
              </p>
            </div>

            {/* Skills */}
            <div ref={skillsRef} className="grid grid-cols-2 gap-4 mt-8">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 text-[#A0AEC0] group"
                >
                  <span className="text-[#66FCF1]">▹</span>
                  <span className="group-hover:text-[#66FCF1] transition-colors">
                    {skill}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div ref={imageRef} className="relative">
            <div className="relative w-72 h-72 mx-auto">
              <div className="absolute inset-0 border-2 border-[#66FCF1] rounded-lg transform rotate-6 transition-transform duration-300 group-hover:rotate-12" />
              <div className="relative w-full h-full rounded-lg overflow-hidden">
                <Image
                  src="/profile.jpg"
                  alt="Abhishek Jaiswar"
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-300"
                />
                <div className="absolute inset-0 bg-[#66FCF1]/10 opacity-0 hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
