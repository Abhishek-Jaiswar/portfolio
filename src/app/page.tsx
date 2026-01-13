"use client";

import Projects from "./components/Projects";
import { Github, Linkedin, Mail, ExternalLink } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground dark:bg-slate-950">
      {/* Background gradient effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <main className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-24">
        {/* Hero Section */}
        <div className="mb-16 sm:mb-24">
          <div className="mb-6">
            <div className="inline-block">
              <div className="px-3 py-1 rounded-full bg-accent/10 border border-accent/30 mb-4">
                <p className="text-sm font-medium text-accent">
                  Full-Stack Developer
                </p>
              </div>
            </div>
          </div>

          <h1 className="text-5xl sm:text-7xl font-bold mb-6 leading-tight text-balance">
            Hey, I&apos;m{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent/60">
              Abhishek Jaiswar
            </span>
          </h1>

          <div className="space-y-4 text-base sm:text-lg text-muted-foreground mb-8 max-w-2xl">
            <p className="leading-relaxed">
              I build scalable, production-ready systems from the ground up.
              Full-stack development is my playground—architecting robust
              backends and crafting responsive frontends that actually solve
              problems.
            </p>

            <p className="leading-relaxed">
              Based in Mumbai, I&apos;m drawn to system design, real-time
              features, and the art of turning ideas into reliable platforms
              that scale. I thrive in fast-moving environments where technical
              excellence meets product thinking.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 items-start">
            <a
              href="#projects"
              className="px-8 py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:bg-accent/90 transition-all duration-200 flex items-center gap-2 group"
            >
              View My Work
              <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="mailto:your-email@example.com"
              className="px-8 py-3 border border-border hover:bg-muted/50 rounded-lg font-semibold transition-all duration-200"
            >
              Get in Touch
            </a>
          </div>
        </div>

        {/* Projects Section */}
        <div id="projects" className="mb-16">
          <div className="mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-2 text-balance">
              Projects in Production
            </h2>
            <p className="text-muted-foreground">
              Shipping real products that solve real problems
            </p>
          </div>

          <Projects />
        </div>

        {/* Footer */}
        <footer className="mt-24 pt-12 border-t border-border">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8">
            <div>
              <p className="text-sm text-muted-foreground mb-4">
                Let&apos;s build something great together
              </p>
              <p className="text-sm text-muted-foreground">
                © 2026 Abhishek Jaiswar. All rights reserved.
              </p>
            </div>

            <div className="flex gap-4">
              <a
                href="#"
                className="p-2 hover:bg-muted rounded-lg transition-colors duration-200"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2 hover:bg-muted rounded-lg transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:your-email@example.com"
                className="p-2 hover:bg-muted rounded-lg transition-colors duration-200"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
