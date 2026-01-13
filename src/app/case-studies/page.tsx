"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2, Target, Lightbulb, TrendingUp } from "lucide-react";
import { cn } from "@/src/lib/utils";

const caseStudies = [
    {
        id: "1",
        title: "Eco-Fleet Logistics Optimization",
        client: "Green Logistics Co.",
        description: "A comprehensive restructuring of a massive logistics platform to reduce carbon footprint and improve delivery efficiency.",
        image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2000&auto=format&fit=crop",
        challenge: "Managing thousands of real-time route changes while maintaining energy efficiency targets.",
        solution: "Implemented a distributed queue system with Go and Next.js to handle high-concurrency route computations.",
        metrics: ["40% reduction in route delays", "15% lower fuel consumption", "99.9% system uptime"]
    }
];

const CaseStudiesPage = () => {
    return (
        <div className="min-h-screen pt-32 pb-20">
            <main className="max-w-6xl mx-auto px-6 lg:px-12">
                <header className="mb-20">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl sm:text-7xl font-bold mb-6"
                    >
                        Case <span className="text-gradient">Studies</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-muted-foreground max-w-2xl"
                    >
                        Deep dives into complex problems and the strategic technical solutions that solved them.
                    </motion.p>
                </header>

                <div className="space-y-32">
                    {caseStudies.map((study, i) => (
                        <motion.section
                            key={study.id}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
                        >
                            <div className={cn("space-y-8", i % 2 !== 0 && "lg:order-2")}>
                                <div className="space-y-2">
                                    <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">Client: {study.client}</span>
                                    <h2 className="text-4xl font-bold">{study.title}</h2>
                                </div>

                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    {study.description}
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                                    <div className="p-6 rounded-3xl border border-border bg-card/5 space-y-3">
                                        <Target className="w-6 h-6 text-zinc-500" />
                                        <h4 className="font-bold">The Challenge</h4>
                                        <p className="text-sm text-muted-foreground">{study.challenge}</p>
                                    </div>
                                    <div className="p-6 rounded-3xl border border-border bg-card/5 space-y-3">
                                        <Lightbulb className="w-6 h-6 text-zinc-500" />
                                        <h4 className="font-bold">The Solution</h4>
                                        <p className="text-sm text-muted-foreground">{study.solution}</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                        <TrendingUp className="w-4 h-4" /> Key Metrics
                                    </h4>
                                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {study.metrics.map((metric) => (
                                            <li key={metric} className="flex items-center gap-2 text-sm font-semibold">
                                                <CheckCircle2 className="w-4 h-4 text-zinc-500" /> {metric}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className={cn("relative aspect-[4/5] rounded-[3rem] overflow-hidden border border-border group", i % 2 !== 0 && "lg:order-1")}>
                                <img src={study.image} alt={study.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
                                <div className="absolute bottom-10 left-10 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
                                    <ArrowUpRight className="w-6 h-6 text-white" />
                                </div>
                            </div>
                        </motion.section>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default CaseStudiesPage;
