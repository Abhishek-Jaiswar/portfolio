"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const Experience = () => {
  const [activeTab, setActiveTab] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const experiences = [
    {
      company: "Education",
      position: "Computer Science Graduate",
      period: "2020 - 2024",
      description: [
        "Completed Bachelor's degree in Computer Science with focus on web development and software engineering",
        "Maintained strong academic performance while actively participating in coding competitions and hackathons",
        "Developed a solid foundation in data structures, algorithms, and modern web technologies",
        "Contributed to open-source projects and collaborated with peers on various coding initiatives",
      ],
    },
    {
      company: "Projects",
      position: "Full Stack Developer",
      period: "2023 - Present",
      description: [
        "Built and deployed multiple full-stack applications using React, Next.js, and Node.js",
        "Developed responsive and accessible web interfaces with modern CSS frameworks",
        "Implemented RESTful APIs and integrated various third-party services",
        "Created portfolio projects showcasing proficiency in frontend and backend development",
      ],
    },
    {
      company: "Skills",
      position: "Technical Skills",
      period: "Ongoing",
      description: [
        "Frontend: React, Next.js, TypeScript, Tailwind CSS, and modern JavaScript",
        "Backend: Node.js, Express, RESTful APIs, and database management",
        "Tools: Git, VS Code, Postman, and various development tools",
        "Soft Skills: Problem-solving, teamwork, and continuous learning",
      ],
    },
  ];

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });

    if (tabsRef.current) {
      tl.from(tabsRef.current, {
        x: -50,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
      });
    }

    if (contentRef.current) {
      tl.from(
        contentRef.current,
        {
          x: 50,
          opacity: 0,
          duration: 1,
          ease: "power4.out",
        },
        "-=0.5"
      );
    }

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} id="experience" className="py-20 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1A202C]/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <h2 className="flex items-center text-3xl font-bold text-[#E2E8F0] mb-12 relative">
          <span className="text-[#66FCF1] font-mono text-xl mr-4">02.</span>
          My Journey
          <span className="flex-grow block h-[1px] bg-[#4A5568] ml-4"></span>
        </h2>

        <div className="grid md:grid-cols-12 gap-8">
          {/* Category Tabs */}
          <div ref={tabsRef} className="md:col-span-3">
            <div className="flex md:flex-col overflow-x-auto md:overflow-x-visible border-b-2 md:border-b-0 md:border-l-2 border-[#4A5568]">
              {experiences.map((exp, index) => (
                <button
                  key={exp.company}
                  onClick={() => setActiveTab(index)}
                  className={`py-3 px-4 md:px-6 text-left font-mono text-sm whitespace-nowrap transition-colors duration-300 ${
                    activeTab === index
                      ? "text-[#66FCF1] bg-[#2D3748] border-b-2 md:border-b-0 md:border-l-2 border-[#66FCF1]"
                      : "text-[#A0AEC0] hover:bg-[#2D3748]"
                  }`}
                >
                  {exp.company}
                </button>
              ))}
            </div>
          </div>

          {/* Content Details */}
          <div ref={contentRef} className="md:col-span-9">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-[#E2E8F0]">
                {experiences[activeTab].position}
                {experiences[activeTab].company !== "Skills" && (
                  <span className="text-[#66FCF1]">
                    {" "}
                    @ {experiences[activeTab].company}
                  </span>
                )}
              </h3>
              <p className="font-mono text-sm text-[#A0AEC0]">
                {experiences[activeTab].period}
              </p>
              <ul className="space-y-3">
                {experiences[activeTab].description.map((item, i) => (
                  <li
                    key={i}
                    className="relative pl-6 text-[#A0AEC0] before:content-['▹'] before:absolute before:left-0 before:text-[#66FCF1]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
