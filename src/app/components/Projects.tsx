"use client";

import type { TProject } from "@/src/lib/types/types";
import axios from "axios";
import { ExternalLink, Github, Code2, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/src/lib/utils";

const Projects = () => {
  const [projects, setProjects] = useState<TProject[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("/api/projects");
        setProjects(response.data.projects);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="w-full">
      {projects.length === 0 && !isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center border border-border rounded-3xl p-12 text-center space-y-3 bg-card/10 backdrop-blur-xl"
        >
          <Code2 className="w-12 h-12 text-accent/50 mx-auto" />
          <h3 className="text-lg font-semibold">No projects yet</h3>
          <p className="text-sm text-muted-foreground max-w-md">
            Projects will appear here once they&apos;re added. Check back soon.
          </p>
        </motion.div>
      )}

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {projects &&
          projects.length > 0 &&
          projects.map((project) => (
            <motion.div
              key={project.id}
              variants={item}
              className="group relative rounded-[2rem] border border-border bg-card/20 backdrop-blur-sm overflow-hidden hover:border-accent/30 transition-all duration-500"
            >
              {project.image && (
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              )}

              <div className="p-8 space-y-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-2xl font-bold group-hover:text-accent transition-colors duration-300">
                    {project.title}
                  </h3>
                  <div className="flex gap-2">
                    {project.hostedUrl && (
                      <a
                        href={project.hostedUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-zinc-500/10 hover:bg-zinc-500/20 text-foreground rounded-full transition-all"
                      >
                        <ArrowUpRight className="w-5 h-5" />
                      </a>
                    )}
                    {project.sourceCodeUrl && (
                      <a
                        href={project.sourceCodeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 border border-border hover:border-zinc-500/50 rounded-full transition-all"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed line-clamp-2">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {/* Mock tags if they don't exist in model */}
                  {["React", "Next.js", "Tailwind"].map((tag) => (
                    <span key={tag} className="text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded-md bg-zinc-500/5 text-muted-foreground border border-border">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
      </motion.div>
    </div>
  );
};

export default Projects;
