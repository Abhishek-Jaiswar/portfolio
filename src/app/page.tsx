"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [projects, setProjects] = useState();

  console.log(projects);

  useEffect(() => {
    const fetchProject = async () => {
      const response = fetch("/api/projects");
      const data = await response.then((d) => d.json());
      setProjects(data.projects);
    };

    fetchProject();
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black font-mono">
      <main className="flex min-h-screen w-full max-w-4xl flex-col items-center py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1 className="text-5xl text-neutral-500 font-bold">
          Hello, I&apos;m Abhishek Jaiswar
        </h1>
        <div className="flex items-start text-justify flex-col gap-3 mt-4">
          <p className=" text-neutral-500 hover:text-neutral-200 transition-colors duration-300 ease-in">
            I&apos;m a full-stack developer based in Mumbai, focused on building
            systems, not just websites. I enjoy creating scalable,
            production-ready solutions that solve real problems—from backend
            architecture and APIs to clean, functional user interfaces.
          </p>

          <p className=" text-neutral-500 hover:text-neutral-200 transition-colors duration-300 ease-in">
            I&apos;m especially interested in system design, real-time features,
            and how products evolve from an idea to a reliable platform.
          </p>

          <p className=" text-neutral-500 hover:text-neutral-200 transition-colors duration-300 ease-in">
            I like working in fast-moving environments, making practical tech
            decisions, and building things that can grow with users and business
            needs. I&apos;m always learning, experimenting, and building with a
            product-first mindset.
          </p>

          <p className=" text-neutral-500 hover:text-neutral-200 transition-colors duration-300 ease-in">
            I&apos;m always learning, experimenting, and building with a
            product-first mindset.{" "}
          </p>
        </div>

        <div className="mt-10">
          <h1 className="text-neutral-500 hover:text-neutral-200 text-5xl font-bold">
            Project&apos;s in production
          </h1>
        </div>
      </main>
    </div>
  );
}
