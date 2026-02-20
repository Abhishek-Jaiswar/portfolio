"use client";

import { motion } from "motion/react";
import Link from "next/link";
import {
    ArrowUpRight, CheckCircle2, Target, Lightbulb, TrendingUp,
    ArrowRight, Clock, Layers
} from "lucide-react";
import { cn } from "@/src/lib/utils";

const caseStudies = [
    {
        id: "1",
        slug: "eco-fleet-logistics",
        title: "Eco-Fleet Logistics Platform",
        client: "Green Logistics Co.",
        category: "System Design",
        duration: "4 months",
        description:
            "A comprehensive restructuring of a massive logistics platform to reduce carbon footprint and improve delivery efficiency across 1,200+ active routes.",
        image:
            "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2000&auto=format&fit=crop",
        challenge:
            "Managing thousands of real-time route changes while maintaining strict energy efficiency targets across a distributed fleet.",
        solution:
            "Implemented a distributed queue system with Go workers and a real-time Next.js dashboard to handle high-concurrency route computations at scale.",
        tech: ["Go", "Next.js", "PostgreSQL", "Redis", "Docker"],
        metrics: ["40% reduction in route delays", "15% lower fuel consumption", "99.9% system uptime"],
        gradient: "from-emerald-500/10 to-teal-500/5",
        accent: "text-emerald-400",
    },
    {
        id: "2",
        slug: "realtime-collab-tool",
        title: "Real-Time Collaboration Suite",
        client: "CollabFlow (YC S24)",
        category: "Full-Stack",
        duration: "3 months",
        description:
            "Built a multiplayer document editor with live cursors, presence awareness, and conflict-free merge — handling 10,000 concurrent users without a hiccup.",
        image:
            "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2000&auto=format&fit=crop",
        challenge:
            "Achieving sub-50ms latency for collaborative editing while ensuring data consistency across geographically distributed users.",
        solution:
            "Designed a CRDT-based sync engine over WebSockets, backed by Rust for the conflict resolution layer and Next.js for the frontend.",
        tech: ["Next.js", "WebSockets", "Node.js", "PostgreSQL", "Prisma"],
        metrics: ["<50ms sync latency", "10K+ concurrent users", "Zero data conflicts"],
        gradient: "from-sky-500/10 to-blue-500/5",
        accent: "text-sky-400",
    },
    {
        id: "3",
        slug: "saas-analytics-dashboard",
        title: "SaaS Analytics Dashboard",
        client: "MetaMetrics Inc.",
        category: "Frontend & API",
        duration: "2 months",
        description:
            "Designed and developed a data-rich analytics platform for a B2B SaaS product — featuring custom chart components, role-based access, and CSV export.",
        image:
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop",
        challenge:
            "Rendering millions of data points interactively without blocking the main thread, while supporting customizable dashboard layouts per user.",
        solution:
            "Used React virtualization, web workers for heavy computation, and a drag-and-drop grid system — reducing initial load from 8s to under 1.2s.",
        tech: ["React", "Next.js", "Recharts", "Node.js", "Prisma"],
        metrics: ["85% faster load time", "30+ chart components", "4 role permission levels"],
        gradient: "from-violet-500/10 to-purple-500/5",
        accent: "text-violet-400",
    },
];

const CaseStudiesPage = () => {
    return (
        <div className="min-h-screen pt-28 pb-24">
            <main className="max-w-6xl mx-auto px-6 lg:px-12">
                {/* Header */}
                <header className="mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-card/40 backdrop-blur-sm text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6"
                    >
                        <Layers className="w-3 h-3" /> Case Studies
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl sm:text-7xl font-bold mb-6 tracking-tight"
                    >
                        Deep Dives into{" "}
                        <span className="text-gradient">Real Problems</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-muted-foreground max-w-2xl leading-relaxed"
                    >
                        Strategic technical breakdowns — how complex challenges were dissected and solved
                        with thoughtful engineering.
                    </motion.p>
                </header>

                {/* Case Studies */}
                <div className="space-y-36">
                    {caseStudies.map((study, i) => (
                        <motion.section
                            key={study.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                            className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center"
                        >
                            {/* Content */}
                            <div className={cn("space-y-8", i % 2 !== 0 && "lg:order-2")}>
                                <div className="space-y-3">
                                    <div className="flex flex-wrap items-center gap-3">
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground border border-border rounded-full px-3 py-1">
                                            {study.category}
                                        </span>
                                        <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                                            <Clock className="w-3 h-3" /> {study.duration}
                                        </span>
                                    </div>
                                    <p className={`text-xs font-bold uppercase tracking-widest ${study.accent}`}>
                                        {study.client}
                                    </p>
                                    <h2 className="text-3xl md:text-4xl font-bold leading-tight">{study.title}</h2>
                                </div>

                                <p className="text-muted-foreground leading-relaxed text-lg">{study.description}</p>

                                {/* Challenge / Solution */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div className={`p-6 rounded-3xl border border-border bg-gradient-to-br ${study.gradient} space-y-3`}>
                                        <Target className={`w-5 h-5 ${study.accent}`} />
                                        <h4 className="font-bold text-sm">The Challenge</h4>
                                        <p className="text-sm text-muted-foreground leading-relaxed">{study.challenge}</p>
                                    </div>
                                    <div className="p-6 rounded-3xl border border-border bg-card/5 space-y-3">
                                        <Lightbulb className={`w-5 h-5 ${study.accent}`} />
                                        <h4 className="font-bold text-sm">The Solution</h4>
                                        <p className="text-sm text-muted-foreground leading-relaxed">{study.solution}</p>
                                    </div>
                                </div>

                                {/* Tech stack */}
                                <div className="flex flex-wrap gap-2">
                                    {study.tech.map((t) => (
                                        <span
                                            key={t}
                                            className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-lg bg-zinc-500/8 border border-border text-muted-foreground"
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>

                                {/* Metrics */}
                                <div className="space-y-4">
                                    <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                        <TrendingUp className="w-4 h-4" /> Key Results
                                    </h4>
                                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {study.metrics.map((metric) => (
                                            <li key={metric} className="flex items-center gap-2.5 text-sm font-semibold">
                                                <CheckCircle2 className={`w-4 h-4 ${study.accent} shrink-0`} />
                                                {metric}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Image */}
                            <div
                                className={cn(
                                    "relative aspect-[4/5] rounded-[3rem] overflow-hidden border border-border group",
                                    i % 2 !== 0 && "lg:order-1"
                                )}
                            >
                                <img
                                    src={study.image}
                                    alt={study.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
                                <div className={`absolute top-6 left-6 px-3 py-1.5 rounded-full bg-background/80 backdrop-blur-md border border-border/50 text-[10px] font-bold uppercase tracking-widest ${study.accent}`}>
                                    {study.category}
                                </div>
                                <button className="absolute bottom-8 right-8 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all group-hover:scale-105">
                                    <ArrowUpRight className="w-5 h-5 text-white" />
                                </button>
                            </div>
                        </motion.section>
                    ))}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-36 p-14 md:p-20 rounded-[3rem] bg-zinc-900 dark:bg-zinc-900 border border-zinc-800 text-center relative overflow-hidden"
                >
                    <div className="absolute inset-0 dot-grid opacity-20" />
                    <div className="relative z-10 max-w-2xl mx-auto">
                        <h3 className="text-3xl md:text-4xl font-bold mb-4 text-zinc-100">
                            Have a project in mind?
                        </h3>
                        <p className="text-zinc-400 mb-8 text-lg leading-relaxed">
                            Let&apos;s collaborate and build something extraordinary together.
                        </p>
                        <Link
                            href="/#contact"
                            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-zinc-100 text-zinc-900 font-bold hover:bg-zinc-300 transition-all group"
                        >
                            Start a Conversation{" "}
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </motion.div>
            </main>
        </div>
    );
};

export default CaseStudiesPage;
