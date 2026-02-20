"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { Plus, Github, ExternalLink, MoreVertical, Search, Loader2 } from "lucide-react";
import { TProject } from "@/src/lib/types/types";

const ProjectsPage = () => {
  const [projects, setProjects] = useState<TProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/projects");
        if (response.data.success) {
          setProjects(response.data.projects);
        }
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="w-full space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground italic">Projects</h1>
          <p className="text-muted-foreground mt-1 text-sm">Manage and showcase your best work.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative group hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-foreground transition-colors" />
            <input
              type="text"
              placeholder="Search projects..."
              className="pl-10 pr-4 py-2 bg-secondary/50 border border-border rounded-xl text-sm focus:outline-hidden focus:ring-1 focus:ring-primary w-64 transition-all"
            />
          </div>
          <Link
            href="/dashboard/projects/upload-projects"
            className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 rounded-xl text-sm font-medium hover:opacity-90 transition shadow-lg shadow-primary/20"
          >
            <Plus className="w-4 h-4" />
            Upload New
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="group relative bg-card/40 backdrop-blur-md border border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 flex flex-col"
          >
            {project.image ? (
              <div className="relative h-44 w-full overflow-hidden bg-secondary">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
              </div>
            ) : (
              <div className="h-44 w-full bg-secondary/50 flex items-center justify-center border-b border-border">
                <span className="text-muted-foreground font-mono text-xs">No Preview Image</span>
              </div>
            )}

            <div className="p-5 flex flex-col flex-1">
              <div className="flex items-start justify-between">
                <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1 italic">
                  {project.title}
                </h3>
                <button className="p-1 hover:bg-secondary rounded cursor-pointer transition-colors text-muted-foreground hover:text-foreground">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>

              <p className="text-sm text-muted-foreground mt-2 line-clamp-3 leading-relaxed flex-1">
                {project.description}
              </p>

              <div className="mt-6 flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center gap-3">
                  {project.sourceCodeUrl && (
                    <a
                      href={project.sourceCodeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                      title="Source Code"
                    >
                      <Github className="w-4.5 h-4.5" />
                    </a>
                  )}
                  {project.hostedUrl && (
                    <a
                      href={project.hostedUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                      title="Live Demo"
                    >
                      <ExternalLink className="w-4.5 h-4.5" />
                    </a>
                  )}
                </div>
                <Link
                  href={`/dashboard/projects/edit/${project.id}`}
                  className="text-[12px] font-medium text-foreground hover:text-primary transition-colors italic"
                >
                  Edit Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {projects.length === 0 && (
        <div className="flex flex-col items-center justify-center p-20 border-2 border-dashed border-border rounded-3xl bg-secondary/20">
          <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mb-6">
            <Plus className="w-10 h-10 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-bold italic text-foreground text-center">No projects found</h2>
          <p className="text-muted-foreground text-center max-w-sm mt-2">
            It looks like you haven&apos;t added any projects yet. Start by uploading your first masterpiece!
          </p>
          <Link
            href="/dashboard/projects/upload-projects"
            className="mt-8 bg-primary text-primary-foreground px-8 py-3 rounded-xl text-sm font-bold hover:opacity-90 transition shadow-xl shadow-primary/20 italic"
          >
            Get Started
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProjectsPage;
