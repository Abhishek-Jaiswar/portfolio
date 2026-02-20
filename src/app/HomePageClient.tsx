"use client";

import Hero from "./components/Hero";
import Projects from "./components/Projects";
import ContactForm from "./components/ContactForm";
import { motion, useInView } from "motion/react";
import Link from "next/link";
import {
  Github, Linkedin, Mail, Globe, Zap, Server, Cpu,
  ArrowRight, BookOpen, Briefcase,
  Layers, Rocket, Palette, ShieldCheck, Star,
  GitBranch, CheckCircle2, Clock, BarChart3, Code2,
  ExternalLink,
} from "lucide-react";
import { Badge } from "@/src/components/ui/badge";
import { Card, CardContent } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { useRef, useState, useEffect } from "react";

// ─── GitHub Repo Type ─────────────────────────────────────────────────
interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
}

const LANG_COLORS: Record<string, string> = {
  TypeScript: "bg-blue-400",
  JavaScript: "bg-yellow-400",
  Go: "bg-sky-400",
  Python: "bg-green-400",
  Rust: "bg-orange-500",
  CSS: "bg-pink-400",
  HTML: "bg-red-400",
  Shell: "bg-emerald-400",
  MDX: "bg-purple-400",
};

// ─── Data ─────────────────────────────────────────────────────────────
const skills = [
  {
    name: "Frontend",
    icon: Globe,
    color: "from-sky-500/20 to-blue-500/10",
    iconColor: "text-sky-400",
    items: ["React", "Next.js", "Tailwind CSS", "Framer Motion"],
  },
  {
    name: "Backend",
    icon: Server,
    color: "from-emerald-500/20 to-green-500/10",
    iconColor: "text-emerald-400",
    items: ["Node.js", "Go", "PostgreSQL", "Prisma ORM"],
  },
  {
    name: "Systems",
    icon: Cpu,
    color: "from-violet-500/20 to-purple-500/10",
    iconColor: "text-violet-400",
    items: ["Docker", "System Design", "Microservices", "Redis"],
  },
  {
    name: "Tooling",
    icon: Zap,
    color: "from-amber-500/20 to-orange-500/10",
    iconColor: "text-amber-400",
    items: ["Cloudinary", "Git", "REST APIs", "WebSockets"],
  },
];

const experiences = [
  {
    role: "Full-Stack Developer",
    company: "Freelance / Independent",
    period: "2024 — Present",
    type: "Current",
    color: "bg-emerald-400",
    description:
      "Building end-to-end web applications for startups and small businesses. Delivered 7+ production projects spanning SaaS tools, real-time apps, and e-commerce platforms.",
    tags: ["Next.js", "Node.js", "PostgreSQL", "Docker"],
  },
  {
    role: "Backend Developer Intern",
    company: "TechStartup Mumbai",
    period: "2023 — 2024",
    type: "Internship",
    color: "bg-sky-400",
    description:
      "Built REST APIs and microservices for a logistics platform handling 50k+ daily requests. Reduced average API response time by 40% through caching and query optimization.",
    tags: ["Go", "Redis", "PostgreSQL", "Docker"],
  },
  {
    role: "Open Source Contributor",
    company: "Various Projects",
    period: "2022 — Present",
    type: "Volunteer",
    color: "bg-violet-400",
    description:
      "Active contributor to developer tooling and UI libraries. 5+ merged PRs across projects with 2k+ GitHub stars combined.",
    tags: ["TypeScript", "React", "Node.js"],
  },
];

const services = [
  {
    icon: Layers,
    title: "Full-Stack Web Apps",
    description:
      "From database schema to pixel-perfect UI — I architect and build complete web applications ready for production scale.",
    gradient: "from-sky-500/15 to-blue-500/5",
    iconBg: "bg-sky-500/15",
    iconColor: "text-sky-400",
    features: ["Next.js + Node.js", "REST / GraphQL APIs", "Auth & Payments", "CI/CD pipeline"],
  },
  {
    icon: Rocket,
    title: "Performance Optimization",
    description:
      "Slow apps lose users. I audit and optimize databases, caching layers, and frontend bundles to achieve measurable speed gains.",
    gradient: "from-amber-500/15 to-orange-500/5",
    iconBg: "bg-amber-500/15",
    iconColor: "text-amber-400",
    features: ["Core Web Vitals", "Bundle analysis", "Query tuning", "CDN strategy"],
  },
  {
    icon: Palette,
    title: "UI/UX Engineering",
    description:
      "Design-aware development — turning Figma mocks into interactive, animated interfaces that delight users on every device.",
    gradient: "from-pink-500/15 to-rose-500/5",
    iconBg: "bg-pink-500/15",
    iconColor: "text-pink-400",
    features: ["Framer Motion", "Responsive layout", "Design systems", "Accessibility"],
  },
  {
    icon: ShieldCheck,
    title: "DevOps & Deployment",
    description:
      "Containerized, scalable, and monitored. I set up Docker environments, GitHub Actions pipelines, and cloud deployments.",
    gradient: "from-emerald-500/15 to-teal-500/5",
    iconBg: "bg-emerald-500/15",
    iconColor: "text-emerald-400",
    features: ["Docker / Compose", "GitHub Actions", "Vercel / Railway", "Monitoring"],
  },
];

const processSteps = [
  {
    number: "01",
    title: "Discovery & Scoping",
    description:
      "We start with a focused conversation about goals, constraints, and timelines. I ask the right questions to de-risk the build before touching code.",
    icon: BookOpen,
    color: "text-sky-400",
    border: "border-sky-500/20",
    bg: "bg-sky-500/8",
  },
  {
    number: "02",
    title: "Architecture & Planning",
    description:
      "I design the system architecture, tech stack, and data models. You get a clear technical roadmap with realistic milestones.",
    icon: BarChart3,
    color: "text-violet-400",
    border: "border-violet-500/20",
    bg: "bg-violet-500/8",
  },
  {
    number: "03",
    title: "Build & Iterate",
    description:
      "Rapid development in two-week sprints with regular demos. You see real progress, not just status updates.",
    icon: Code2,
    color: "text-emerald-400",
    border: "border-emerald-500/20",
    bg: "bg-emerald-500/8",
  },
  {
    number: "04",
    title: "Launch & Support",
    description:
      "Deployment, performance monitoring, and a smooth handoff with full documentation. I'm available post-launch for fixes and improvements.",
    icon: Rocket,
    color: "text-amber-400",
    border: "border-amber-500/20",
    bg: "bg-amber-500/8",
  },
];



const testimonials = [
  {
    quote:
      "Abhishek delivered a complex real-time system weeks ahead of schedule. His attention to detail and system design sensibility is exceptional.",
    author: "Ravi Sharma",
    role: "CTO, TechStartup",
    avatar: "RS",
    rating: 5,
  },
  {
    quote:
      "Working with Abhishek was a game changer. He brought both technical depth and design sensibility — a rare combo.",
    author: "Priya Mehta",
    role: "Product Lead, SaaS Co.",
    avatar: "PM",
    rating: 5,
  },
];

const recentPosts = [
  { title: "How to use WebSockets in Next.js", slug: "websockets-in-nextjs", category: "WebSockets", readTime: "8 min read" },
  { title: "Mastering Framer Motion Animations", slug: "framer-motion-animations", category: "Frontend", readTime: "6 min read" },
  { title: "Building Scalable Microservices with Go", slug: "scalable-microservices", category: "Backend", readTime: "12 min read" },
];

// ─── Animated Counter ─────────────────────────────────────────────────
function AnimatedNumber({ target }: { target: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);

  useRef(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.ceil(target / 40);
    const id = setInterval(() => {
      start += step;
      if (start >= target) { setDisplay(target); clearInterval(id); }
      else setDisplay(start);
    }, 30);
  });

  return <span ref={ref}>{inView ? target : 0}</span>;
}

// ─── Page ─────────────────────────────────────────────────────────────
export default function Home() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [reposLoading, setReposLoading] = useState(true);

  useEffect(() => {
    fetch("/api/github-repos")
      .then((r) => r.json())
      .then((data) => {
        if (data.success) setRepos(data.repos.slice(0, 6));
      })
      .catch(console.error)
      .finally(() => setReposLoading(false));
  }, []);
  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-7xl mx-auto px-4 lg:px-10 pt-16">

        {/* ── Hero ─────────────────────────────────────────── */}
        <Hero />

        {/* ── Skills ───────────────────────────────────────── */}
        <section className="py-24">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
            <div>
              <p className="text-xs uppercase tracking-widest font-bold text-muted-foreground mb-3">What I work with</p>
              <h2 className="text-4xl md:text-5xl font-bold">Core Expertise</h2>
              <p className="text-muted-foreground max-w-md mt-3 leading-relaxed">
                Mastering the full stack to deliver robust and performant digital solutions.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {skills.map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`p-7 rounded-3xl border border-border bg-gradient-to-br ${skill.color} backdrop-blur-sm hover:border-zinc-500/40 hover:-translate-y-1 transition-all duration-300 group cursor-default`}
              >
                <div className="w-10 h-10 rounded-2xl bg-background/50 flex items-center justify-center mb-5">
                  <skill.icon className={`w-5 h-5 ${skill.iconColor}`} />
                </div>
                <h3 className="text-lg font-bold mb-3">{skill.name}</h3>
                <ul className="space-y-1.5">
                  {skill.items.map((item) => (
                    <li key={item} className="text-sm text-muted-foreground flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-zinc-500/60" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Services ─────────────────────────────────────── */}
        <section className="py-24 border-t border-border">
          <div className="mb-16">
            <p className="text-xs uppercase tracking-widest font-bold text-muted-foreground mb-3">What I offer</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Services</h2>
            <p className="text-muted-foreground max-w-xl leading-relaxed">
              End-to-end development offerings — from idea to deployed product.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <Card className={`h-full rounded-3xl border-border bg-gradient-to-br ${service.gradient} hover:border-zinc-500/30 hover:-translate-y-1 transition-all duration-300 group`}>
                  <CardContent className="p-8 space-y-5">
                    <div className={`w-12 h-12 rounded-2xl ${service.iconBg} flex items-center justify-center`}>
                      <service.icon className={`w-6 h-6 ${service.iconColor}`} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
                    </div>
                    <ul className="grid grid-cols-2 gap-2">
                      {service.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                          <CheckCircle2 className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Projects ─────────────────────────────────────── */}
        <section id="projects" className="py-24 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
            <div>
              <p className="text-xs uppercase tracking-widest font-bold text-muted-foreground mb-3">Selected work</p>
              <h2 className="text-4xl md:text-5xl font-bold">Featured Projects</h2>
              <p className="text-muted-foreground max-w-md mt-3 leading-relaxed">
                A collection of projects where technical excellence meets practical utility.
              </p>
            </div>
            <Link href="/case-studies" className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-foreground transition-colors group">
              View Case Studies <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <Projects />
        </section>

        {/* ── Experience Timeline ───────────────────────────── */}
        <section className="py-24 border-t border-border">
          <div className="mb-16">
            <p className="text-xs uppercase tracking-widest font-bold text-muted-foreground mb-3">Background</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Experience</h2>
            <p className="text-muted-foreground max-w-xl leading-relaxed">
              A track record of building things that work.
            </p>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-5 top-0 bottom-0 w-px bg-border hidden md:block" />

            <div className="space-y-8">
              {experiences.map((exp, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.5 }}
                  className="md:pl-16 relative"
                >
                  {/* Timeline dot */}
                  <div className={`absolute left-[14px] top-6 w-3 h-3 rounded-full ${exp.color} hidden md:block ring-4 ring-background`} />

                  <div className="p-7 rounded-3xl border border-border bg-card/5 hover:border-zinc-500/30 hover:bg-card/10 transition-all duration-300 group">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                      <div>
                        <h3 className="text-lg font-bold">{exp.role}</h3>
                        <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                          <Briefcase className="w-3.5 h-3.5" /> {exp.company}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <Badge variant="outline" className="rounded-full text-[10px] font-bold uppercase tracking-wider border-border">
                          {exp.type}
                        </Badge>
                        <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                          <Clock className="w-3 h-3" /> {exp.period}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">{exp.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {exp.tags.map((tag) => (
                        <span key={tag} className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-lg bg-zinc-500/8 border border-border/60 text-muted-foreground">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Open Source ───────────────────────────────────── */}
        <section className="py-24 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
            <div>
              <p className="text-xs uppercase tracking-widest font-bold text-muted-foreground mb-3">Community</p>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Open Source</h2>
              <p className="text-muted-foreground max-w-xl leading-relaxed">
                I believe in building in public. Here are some projects I&apos;ve shipped and maintain.
              </p>
            </div>
            <a
              href="https://github.com/abhishekjaiswar"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-foreground transition-colors group"
            >
              <Github className="w-4 h-4" /> GitHub Profile <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Contribution graph placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 p-6 rounded-3xl border border-border bg-card/5 overflow-hidden"
          >
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Contribution Activity — 2025</p>
            <div className="flex gap-1 flex-wrap">
              {Array.from({ length: 52 * 7 }).map((_, i) => {
                const intensity = Math.random();
                const color =
                  intensity > 0.85 ? "bg-emerald-400" :
                    intensity > 0.65 ? "bg-emerald-500/70" :
                      intensity > 0.4 ? "bg-emerald-600/40" :
                        intensity > 0.2 ? "bg-zinc-700/60" :
                          "bg-zinc-800/40";
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.0005, duration: 0.2 }}
                    className={`w-3 h-3 rounded-sm ${color}`}
                  />
                );
              })}
            </div>
          </motion.div>

          {/* Repos */}
          {reposLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-48 rounded-3xl border border-border bg-card/5 animate-pulse" />
              ))}
            </div>
          ) : repos.length === 0 ? (
            <p className="text-sm text-muted-foreground">No public repositories found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {repos.map((repo, i) => (
                <motion.div
                  key={repo.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="block h-full">
                    <Card className="h-full rounded-3xl border-border bg-card/5 hover:border-zinc-500/30 hover:-translate-y-1 transition-all duration-300 group cursor-pointer">
                      <CardContent className="p-7 flex flex-col gap-4 h-full">
                        <div className="flex items-start justify-between">
                          <div className="p-2.5 rounded-xl bg-zinc-500/10 border border-border">
                            <GitBranch className="w-4 h-4 text-muted-foreground" />
                          </div>
                          <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold font-mono text-sm mb-2 group-hover:text-gradient transition-all">{repo.name}</h3>
                          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                            {repo.description ?? "No description provided."}
                          </p>
                        </div>
                        <div className="flex items-center justify-between text-xs text-muted-foreground font-medium">
                          <div className="flex items-center gap-3">
                            <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5" /> {repo.stargazers_count}</span>
                            <span className="flex items-center gap-1"><GitBranch className="w-3.5 h-3.5" /> {repo.forks_count}</span>
                          </div>
                          {repo.language && (
                            <span className="flex items-center gap-1.5">
                              <div className={`w-2.5 h-2.5 rounded-full ${LANG_COLORS[repo.language] ?? "bg-zinc-400"}`} />
                              {repo.language}
                            </span>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </a>
                </motion.div>
              ))}
            </div>
          )}
        </section>

        {/* ── My Process ───────────────────────────────────── */}
        <section className="py-24 border-t border-border">
          <div className="mb-16">
            <p className="text-xs uppercase tracking-widest font-bold text-muted-foreground mb-3">How I work</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">My Process</h2>
            <p className="text-muted-foreground max-w-xl leading-relaxed">
              A structured approach that keeps projects on track and delivers predictable results.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 relative">
            {/* Connecting line */}
            <div className="absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-border to-transparent hidden lg:block" />

            {processSteps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className={`relative p-7 rounded-3xl border ${step.border} ${step.bg} hover:-translate-y-1 transition-all duration-300 group`}
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="text-4xl font-black text-border group-hover:text-zinc-600 transition-colors">{step.number}</span>
                  <div className="w-10 h-10 rounded-2xl bg-background/60 flex items-center justify-center">
                    <step.icon className={`w-5 h-5 ${step.color}`} />
                  </div>
                </div>
                <h3 className="font-bold text-lg mb-3">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Blog Preview ─────────────────────────────────── */}
        <section className="py-24 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
            <div>
              <p className="text-xs uppercase tracking-widest font-bold text-muted-foreground mb-3">The Journal</p>
              <h2 className="text-4xl md:text-5xl font-bold">Latest Writings</h2>
              <p className="text-muted-foreground max-w-md mt-3 leading-relaxed">
                Deep dives into software engineering, system design, and modern web development.
              </p>
            </div>
            <Link href="/blog" className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-foreground transition-colors group">
              All Articles <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="space-y-4">
            {recentPosts.map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link href={`/blog/${post.slug}`}>
                  <div className="group flex items-center justify-between p-6 rounded-2xl border border-border hover:border-zinc-500/30 hover:bg-card/20 transition-all duration-300">
                    <div className="flex items-center gap-5">
                      <div className="w-10 h-10 rounded-xl bg-zinc-500/10 border border-border flex items-center justify-center shrink-0">
                        <BookOpen className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-1 block">
                          {post.category} · {post.readTime}
                        </span>
                        <h3 className="font-semibold group-hover:text-gradient transition-all">{post.title}</h3>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 group-hover:text-foreground transition-all shrink-0" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Testimonials ─────────────────────────────────── */}
        <section className="py-24 border-t border-border">
          <div className="mb-16">
            <p className="text-xs uppercase tracking-widest font-bold text-muted-foreground mb-3">Social proof</p>
            <h2 className="text-4xl md:text-5xl font-bold">What People Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="p-8 rounded-3xl border border-border bg-card/10 backdrop-blur-sm space-y-6"
              >
                <div className="flex gap-1">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-foreground leading-relaxed text-lg italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-zinc-500/20 border border-border flex items-center justify-center text-sm font-bold">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-bold">{t.author}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Contact ───────────────────────────────────────── */}
        <section id="contact" className="py-24 border-t border-border">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-widest font-bold text-muted-foreground mb-4">Get in touch</p>
            <h2 className="text-4xl md:text-6xl font-bold mb-4">
              Let&apos;s Build Something <span className="text-gradient">Great</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-lg leading-relaxed">
              Have a project in mind or just want to say hi? My inbox is always open.
            </p>
          </div>
          <ContactForm />
        </section>

        {/* ── Footer ───────────────────────────────────────── */}
        <footer className="py-16 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="text-center md:text-left">
              <div className="flex items-center gap-3 mb-3 justify-center md:justify-start">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-zinc-700 to-zinc-900 dark:from-zinc-200 dark:to-zinc-400 flex items-center justify-center">
                  <span className="text-xs font-black text-white dark:text-zinc-900">AJ</span>
                </div>
                <span className="font-bold">Abhishek Jaiswar</span>
              </div>
              <p className="text-muted-foreground max-w-xs text-sm leading-relaxed">
                Full-Stack Developer crafting performant digital products.
              </p>
            </div>
            <div className="flex gap-3">
              {[
                { icon: Github, href: "#", label: "GitHub" },
                { icon: Linkedin, href: "#", label: "LinkedIn" },
                { icon: Mail, href: "mailto:hi@abhishekjaiswar.dev", label: "Email" },
              ].map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} aria-label={label}
                  className="w-11 h-11 flex items-center justify-center rounded-2xl border border-border hover:bg-zinc-500/10 hover:border-zinc-500/40 text-muted-foreground hover:text-foreground transition-all">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">
            <p>© 2026 Abhishek Jaiswar. All rights reserved.</p>
            <p>Built with Next.js & passion</p>
          </div>
        </footer>

      </main>
    </div>
  );
}
