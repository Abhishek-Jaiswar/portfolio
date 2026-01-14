"use client";

import Hero from "./components/Hero";
import Projects from "./components/Projects";
import ContactForm from "./components/ContactForm";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Code2, Cpu, Globe, Zap, Server } from "lucide-react";

const skills = [
  { name: "Frontend", icon: Globe, items: ["React", "Next.js", "Tailwind", "Framer Motion"] },
  { name: "Backend", icon: Server, items: ["Node.js", "Go", "PostgreSQL", "Prisma"] },
  { name: "Systems", icon: Cpu, items: ["Docker", "System Design", "Microservices"] },
  { name: "Others", icon: Zap, items: ["Clodinary", "Git", "REST APIs", "WebSocket"] },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-6xl mx-auto px-6 lg:px-12">
        <Hero />

        {/* Skills Section */}
        <section className="py-24">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="text-4xl font-bold mb-4">Core Expertise</h2>
              <p className="text-muted-foreground max-w-md">
                Mastering the full stack to deliver robust and performant digital solutions.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-4xl border border-border bg-card/10 backdrop-blur-sm hover:border-zinc-500/30 transition-all group"
              >
                <skill.icon className="w-10 h-10 text-zinc-500 mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold mb-4">{skill.name}</h3>
                <ul className="space-y-2">
                  {skill.items.map((item) => (
                    <li key={item} className="text-sm text-muted-foreground flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-zinc-500/40" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-24">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="text-4xl font-bold mb-4">Featured Work</h2>
              <p className="text-muted-foreground max-w-md">
                A collection of projects where technical excellence meets practical utility.
              </p>
            </div>
            <motion.div
              whileHover={{ x: 5 }}
              className="text-foreground font-bold cursor-pointer flex items-center gap-2"
            >
              All projects <Code2 className="w-4 h-4" />
            </motion.div>
          </div>

          <Projects />
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Let&apos;s Build Something <span className="text-gradient">Great</span></h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-lg">
              Have a project in mind or just want to say hi? My inbox is always open.
            </p>
          </div>
          <ContactForm />
        </section>

        {/* Footer */}
        <footer className="py-20 border-t border-border mt-20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold mb-4 text-zinc-500">Stay Connected</h2>
              <p className="text-muted-foreground max-w-xs">
                Active on GitHub and LinkedIn. Let&apos;s explore new horizons together.
              </p>
            </div>

            <div className="flex gap-4">
              <a href="#" className="w-12 h-12 flex items-center justify-center rounded-full border border-border hover:bg-zinc-800 hover:text-zinc-100 transition-all">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="w-12 h-12 flex items-center justify-center rounded-full border border-border hover:bg-zinc-800 hover:text-zinc-100 transition-all">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="mailto:your-email@example.com" className="w-12 h-12 flex items-center justify-center rounded-full border border-border hover:bg-zinc-800 hover:text-zinc-100 transition-all">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="mt-20 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">
            <p>© 2026 Abhishek Jaiswar</p>
            <p>Built with NDX Ecosystem</p>
          </div>
        </footer>
      </main>
    </div>
  );
}
