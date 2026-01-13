"use client";

import { motion } from "framer-motion";
import { ExternalLink, Mail, Github, Linkedin, ArrowRight } from "lucide-react";
import { cn } from "@/src/lib/utils";

const Hero = () => {
    return (
        <section className="relative min-h-[90vh] flex flex-col justify-center py-20 overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-zinc-500/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-zinc-500/5 rounded-full blur-[100px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="space-y-8"
            >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-card/50 backdrop-blur-sm text-sm font-medium text-muted-foreground mb-4">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-zinc-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-zinc-400"></span>
                    </span>
                    Available for new opportunities
                </div>

                <h1 className="text-6xl sm:text-8xl font-bold tracking-tight leading-[1.1]">
                    Building <span className="text-gradient">digital experiences</span> that matter.
                </h1>

                <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
                    I&apos;m <span className="text-foreground font-semibold">Abhishek Jaiswar</span>, a Full-Stack Developer based in Mumbai.
                    I specialize in building scalable, production-ready systems with a focus on performance and user experience.
                </p>

                <div className="flex flex-wrap gap-4 pt-4">
                    <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href="#projects"
                        className="group px-8 py-4 bg-primary text-primary-foreground rounded-full font-bold flex items-center gap-2 transition-all hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                    >
                        View Projects
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </motion.a>

                    <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href="mailto:your-email@example.com"
                        className="px-8 py-4 border border-border bg-card/30 backdrop-blur-sm hover:bg-card/50 rounded-full font-bold transition-all"
                    >
                        Get in touch
                    </motion.a>
                </div>

                <div className="flex gap-6 pt-12 items-center">
                    <p className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Follow me</p>
                    <div className="h-px w-12 bg-border" />
                    <div className="flex gap-4">
                        {[
                            { icon: Github, href: "#", name: "GitHub" },
                            { icon: Linkedin, href: "#", name: "LinkedIn" },
                            { icon: Mail, href: "#", name: "Email" },
                        ].map((social, i) => (
                            <motion.a
                                key={social.name}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 + i * 0.1 }}
                                href={social.href}
                                className="p-2 text-muted-foreground hover:text-accent transition-colors"
                                aria-label={social.name}
                            >
                                <social.icon className="w-5 h-5" />
                            </motion.a>
                        ))}
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;
