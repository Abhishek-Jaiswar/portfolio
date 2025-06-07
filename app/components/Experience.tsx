"use client";

import { useState, useEffect } from "react";

const Experience = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("experience");
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const experiences = [
    {
      company: "Upstatement",
      position: "Lead Engineer @ Upstatement",
      period: "May 2018 - Present",
      description: [
        "Deliver high-quality, robust production code for a diverse array of projects for clients including Harvard Business School, Everytown for Gun Safety, Pratt Institute, Koala Health, Vanderbilt University, The 19th News, and more",
        "Work alongside creative directors to lead the research, development, and architecture of technical solutions to fulfill business requirements",
        "Collaborate with designers, project managers, and other engineers to transform creative concepts into production realities for clients and stakeholders",
        "Provide leadership within engineering department through close collaboration, knowledge shares, and mentorship",
      ],
    },
    {
      company: "Apple",
      position: "Software Engineer @ Apple",
      period: "June 2017 - May 2018",
      description: [
        "Developed and maintained applications for Apple Music using Swift and Objective-C",
        "Collaborated with product teams to define and implement new features",
        "Participated in code reviews and contributed to architectural decisions",
      ],
    },
    {
      company: "Scout Studio",
      position: "Web Developer @ Scout Studio",
      period: "September 2016 - May 2017",
      description: [
        "Built responsive websites for clients using HTML, CSS, and JavaScript",
        "Worked with designers to implement pixel-perfect designs",
        "Managed client communication and project timelines",
      ],
    },
    {
      company: "Starry",
      position: "Front-End Developer @ Starry",
      period: "May 2016 - September 2016",
      description: [
        "Developed user interfaces for a broadband internet service provider",
        "Implemented features using React and Redux",
        "Collaborated with a team of engineers and designers to improve user experience",
      ],
    },
    {
      company: "MullenLowe",
      position: "Developer @ MullenLowe",
      period: "September 2015 - May 2016",
      description: [
        "Built interactive web experiences for advertising campaigns",
        "Worked with a variety of JavaScript frameworks and libraries",
        "Assisted in the deployment and maintenance of web projects",
      ],
    },
  ];

  return (
    <section id="experience" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h2 className="text-3xl font-bold text-[#ccd6f6] mb-12">
            <span className="text-[#64ffda] font-mono">02.</span> Where I've
            Worked
          </h2>
          <div className="flex flex-col md:flex-row gap-6 md:gap-8">
            {/* Company Tabs */}
            <div className="flex md:flex-col overflow-x-auto whitespace-nowrap md:whitespace-normal pb-4 md:pb-0 border-b-2 md:border-b-0 md:border-l-2 border-[#233554]">
              {experiences.map((exp, index) => (
                <button
                  key={exp.company}
                  className={`py-3 px-4 md:px-6 text-left font-mono text-sm cursor-pointer transition-colors duration-300 ${
                    activeTab === index
                      ? "text-[#64ffda] bg-[#112240] border-b-2 md:border-b-0 md:border-l-2 border-[#64ffda]"
                      : "text-[#8892b0] hover:bg-[#112240]"
                  }`}
                  onClick={() => setActiveTab(index)}
                >
                  {exp.company}
                </button>
              ))}
            </div>

            {/* Job Details */}
            <div className="flex-1">
              <div className="text-[#8892b0]">
                <h3 className="text-xl font-bold text-[#ccd6f6] mb-2">
                  {experiences[activeTab].position}
                </h3>
                <p className="font-mono text-xs mb-4">
                  {experiences[activeTab].period}
                </p>
                <ul className="list-none space-y-2">
                  {experiences[activeTab].description.map((item, i) => (
                    <li
                      key={i}
                      className="relative pl-6 before:content-['▹'] before:absolute before:left-0 before:text-[#64ffda]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
