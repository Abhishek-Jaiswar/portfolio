"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Projects = () => {
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

    const element = document.getElementById("projects");
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const featuredProjects = [
    {
      title: "SmartScrape – Intelligent Web Scraping & Content Extraction Tool",
      description:
        "SmartScrape is a powerful, intelligent web scraping tool designed to automate the extraction of structured data from dynamic websites. It features a no-code/low-code interface, dynamic content support with headless browser automation (Puppeteer, Playwright), a smart selector engine, bulk URL processing, and integration with Gemini AI for intelligent content classification. It significantly reduces manual data collection efforts and enables non-technical users to set up scraping tasks.",
      image: "/project1.png",
      tags: [
        "Next.js 15",
        "React.js",
        "Tailwind CSS",
        "shadcnUI",
        "Server Actions",
        "React Query",
        "Puppeteer",
        "Cheerio",
        "SQLite",
        "Prisma",
        "Clerk Auth",
        "Vercel",
        "Gemini AI",
      ],
      github: "https://github.com/Abhishek-Jaiswar/smart-scrape",
      live: "https://smart-scrape.vercel.app",
    },
    {
      title: "Project Two",
      description:
        "An e-commerce platform with features like product search, cart management, and payment integration. Built with React, Node.js, and MongoDB.",
      image: "/project1.png",
      tags: ["React", "Node.js", "MongoDB", "Stripe"],
      github: "https://github.com/yourusername/project2",
      live: "https://project2.com",
    },
    {
      title: "Project Three",
      description:
        "A real-time chat application with features like message encryption, file sharing, and group chats. Built with React, Socket.io, and Firebase.",
      image: "/project3.jpg",
      tags: ["React", "Socket.io", "Firebase", "Tailwind CSS"],
      github: "https://github.com/yourusername/project3",
      live: "https://project3.com",
    },
  ];

  const otherProjects = [
    {
      title: "Integrating Algolia Search with WordPress Multisite",
      description:
        "Building a custom multisite compatible WordPress plugin to build global search with Algolia",
      tags: ["Algolia", "WordPress", "PHP"],
      github: "https://github.com/yourusername/other-project1",
      live: "https://other-project1.com",
    },
    {
      title: "Time to Have More Fun",
      description:
        "A single page web app for helping me choose where to travel, built with Next.js, Firebase, and Tailwind CSS",
      tags: ["Next.js", "Tailwind CSS", "Firebase"],
      github: "https://github.com/yourusername/other-project2",
      live: "https://other-project2.com",
    },
    {
      title: "Building a Headless Mobile App CMS From Scratch",
      description:
        "Find out how we built a custom headless CMS with Node, Express, and Firebase for a project at Upstatement",
      tags: ["Node", "Express", "Firebase", "Vue"],
      github: "https://github.com/yourusername/other-project3",
      live: "https://other-project3.com",
    },
    {
      title: "OctoProfile",
      description:
        "A nicer look at your GitHub profile and repo stats. Includes data visualizations of your top languages, starred repositories, and sort through your top repos by stars, forks, and size.",
      tags: ["React", "GitHub API", "Chart.js"],
      github: "https://github.com/yourusername/other-project4",
      live: "https://other-project4.com",
    },
    {
      title: "Google Keep Clone",
      description: "A simple Google Keep clone built with Vue and Firebase.",
      tags: ["Vue", "Firebase", "JavaScript"],
      github: "https://github.com/yourusername/other-project5",
      live: "https://other-project5.com",
    },
    {
      title: "Apple Music Embeddable Web Player Widget",
      description:
        "Embeddable web player widget for Apple Music that lets users log in and listen to full songs via Apple Music.",
      tags: ["Apple Music API", "JavaScript", "HTML", "CSS"],
      github: "https://github.com/yourusername/other-project6",
      live: "https://other-project6.com",
    },
  ];

  return (
    <section id="projects" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h2 className="text-3xl font-bold text-[#ccd6f6] mb-12">
            <span className="text-[#64ffda] font-mono">03.</span> Some Things
            I've Built
          </h2>
          <div className="space-y-24 mb-24">
            {featuredProjects.map((project, index) => (
              <div
                key={index}
                className={`relative grid md:grid-cols-12 gap-4 items-center ${
                  index % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Project Image */}
                <div
                  className={`relative col-span-7 row-span-full ${
                    index % 2 === 1 ? "md:col-start-6" : "md:col-start-1"
                  }`}
                >
                  <div className="relative aspect-video rounded-lg overflow-hidden group">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-[#0a192f]/50 transition-colors duration-300 group-hover:bg-[#64ffda]/20" />
                  </div>
                </div>

                {/* Project Content */}
                <div
                  className={`relative col-span-6 row-span-full z-10 ${
                    index % 2 === 1 ? "md:col-start-1" : "md:col-start-7"
                  }`}
                >
                  <p className="text-[#64ffda] font-mono text-sm mb-2">
                    Featured Project
                  </p>
                  <h3 className="text-2xl font-bold text-[#ccd6f6] mb-4">
                    {project.title}
                  </h3>
                  <div className="bg-[#112240] p-6 rounded-lg shadow-lg mb-4">
                    <p className="text-[#8892b0]">{project.description}</p>
                  </div>
                  <ul className="flex flex-wrap gap-2 mb-4 font-mono text-sm">
                    {project.tags.map((tag, i) => (
                      <li key={i} className="text-[#8892b0]">
                        {tag}
                      </li>
                    ))}
                  </ul>
                  <div className="flex gap-4">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#ccd6f6] hover:text-[#64ffda] transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                      </svg>
                    </a>
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#ccd6f6] hover:text-[#64ffda] transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-20">
            <h2 className="text-3xl font-bold text-[#ccd6f6] mb-8">
              Other Noteworthy Projects
            </h2>
            <Link
              href="/archive"
              className="text-[#64ffda] font-mono text-sm hover:underline"
            >
              view the archive
            </Link>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {otherProjects.map((project, index) => (
                <div
                  key={index}
                  className="bg-[#112240] p-6 rounded-lg shadow-lg flex flex-col justify-between h-full transform transition-transform duration-300 hover:-translate-y-2"
                >
                  <div className="flex justify-between items-center mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="44"
                      height="44"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-[#64ffda]"
                    >
                      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                    </svg>
                    <div className="flex gap-2">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#ccd6f6] hover:text-[#64ffda] transition-colors"
                          aria-label="GitHub"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                          </svg>
                        </a>
                      )}
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#ccd6f6] hover:text-[#64ffda] transition-colors"
                          aria-label="External Link"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                            <polyline points="15 3 21 3 21 9"></polyline>
                            <line x1="10" y1="14" x2="21" y2="3"></line>
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-[#ccd6f6] mb-2">
                    {project.title}
                  </h3>
                  <p className="text-[#8892b0] text-sm mb-4 flex-grow">
                    {project.description}
                  </p>
                  <ul className="flex flex-wrap gap-2 font-mono text-xs">
                    {project.tags.map((tag, i) => (
                      <li key={i} className="text-[#8892b0]">
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
