"use client";

import type { TProject } from "@/src/lib/types/types";
import axios from "axios";
import { ExternalLink, Github, Code2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const Projects = () => {
  const [projects, setProjects] = useState<TProject[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  console.log("Projects:", projects);

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

  return (
    <div className="w-full">
      {projects.length === 0 && (
        <div className="flex flex-col items-center justify-center border border-border rounded-lg p-12 text-center space-y-3 bg-card/50 backdrop-blur">
          <Code2 className="w-12 h-12 text-accent/50 mx-auto" />
          <h3 className="text-lg font-semibold text-foreground">
            No projects yet
          </h3>
          <p className="text-sm text-muted-foreground max-w-md">
            Projects will appear here once they&apos;re added. Check back soon
            or explore the source code.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects &&
          projects.length > 0 &&
          projects.map((project) => (
            <div
              key={project.id}
              className="group relative rounded-lg border border-border bg-card/50 backdrop-blur hover:border-accent/50 transition-all duration-300 overflow-hidden hover:shadow-lg hover:shadow-accent/10"
            >
              {project.image && (
                <div className="relative overflow-hidden bg-muted h-48 sm:h-56">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    width={500}
                    height={300}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60" />
                </div>
              )}

              {/* Project content */}
              <div className="p-6 space-y-3">
                <h3 className="text-xl font-bold text-foreground group-hover:text-accent transition-colors duration-300 line-clamp-2">
                  {project.title}
                </h3>

                <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                  {project.description}
                </p>

                {/* Links */}
                <div className="flex gap-3 pt-4">
                  {project.hostedUrl && (
                    <a
                      href={project.hostedUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-2 text-sm bg-accent/10 hover:bg-accent/20 text-accent rounded-md transition-colors duration-200 font-medium"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live Demo
                    </a>
                  )}

                  {project.sourceCodeUrl && (
                    <a
                      href={project.sourceCodeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-2 text-sm border border-border hover:border-foreground text-foreground rounded-md transition-all duration-200 font-medium"
                    >
                      <Github className="w-4 h-4" />
                      Source
                    </a>
                  )}
                </div>
              </div>

              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-accent/20 to-transparent rounded-bl-2xl pointer-events-none" />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Projects;
