"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, Search, Tag, Sparkles, BookOpen } from "lucide-react";
import { Input } from "@/src/components/ui/input";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/src/components/ui/card";
import { useState } from "react";

const categories = ["All", "WebSockets", "Next.js", "System Design", "Frontend", "Backend", "Go"];

const blogs = [
    {
        id: "1",
        title: "How to use WebSockets in Next.js",
        slug: "websockets-in-nextjs",
        excerpt:
            "Learn how to implement real-time features using WebSockets in a Next.js application, from server-side setup to client-side integration with best practices.",
        date: "Jan 13, 2026",
        readTime: "8 min read",
        category: "WebSockets",
        image:
            "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?q=80&w=2000&auto=format&fit=crop",
        featured: true,
    },
    {
        id: "2",
        title: "Mastering Framer Motion Animations",
        slug: "framer-motion-animations",
        excerpt:
            "Bring your React applications to life with production-ready animations and transitions. Covers variants, gestures, layout animations, and performance tips.",
        date: "Jan 10, 2026",
        readTime: "6 min read",
        category: "Frontend",
        image:
            "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000&auto=format&fit=crop",
        featured: false,
    },
    {
        id: "3",
        title: "Building Scalable Microservices with Go",
        slug: "scalable-microservices",
        excerpt:
            "An in-depth look at designing and deploying microservices that can handle millions of requests using Go, Docker, and modern messaging patterns.",
        date: "Jan 05, 2026",
        readTime: "12 min read",
        category: "Backend",
        image:
            "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop",
        featured: false,
    },
    {
        id: "4",
        title: "Next.js App Router: A Complete Guide",
        slug: "nextjs-app-router-guide",
        excerpt:
            "Everything you need to know about the Next.js 14 App Router — layouts, server components, streaming, parallel routes, and advanced data fetching patterns.",
        date: "Dec 28, 2025",
        readTime: "10 min read",
        category: "Next.js",
        image:
            "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?q=80&w=2000&auto=format&fit=crop",
        featured: false,
    },
    {
        id: "5",
        title: "System Design: Building a URL Shortener at Scale",
        slug: "system-design-url-shortener",
        excerpt:
            "A step-by-step system design walkthrough — databases, caching layers, consistent hashing, and rate limiting for a URL shortener handling 10M requests/day.",
        date: "Dec 20, 2025",
        readTime: "15 min read",
        category: "System Design",
        image:
            "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2000&auto=format&fit=crop",
        featured: false,
    },
];

const BlogPage = () => {
    const [activeCategory, setActiveCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    const featuredPost = blogs.find((b) => b.featured);
    const filtered = blogs
        .filter((b) => !b.featured)
        .filter(
            (b) =>
                (activeCategory === "All" || b.category === activeCategory) &&
                b.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

    return (
        <div className="min-h-screen pt-28 pb-24">
            <main className="max-w-6xl mx-auto px-6 lg:px-12">
                {/* Header */}
                <header className="mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-card/40 backdrop-blur-sm text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6"
                    >
                        <BookOpen className="w-3 h-3" /> The Journal
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl sm:text-7xl font-bold mb-6 tracking-tight"
                    >
                        Insights for{" "}
                        <span className="text-gradient">the Modern Web</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-muted-foreground max-w-2xl leading-relaxed"
                    >
                        Deep dives into software engineering, system architecture, and product design — written
                        for engineers who care about craft.
                    </motion.p>
                </header>

                {/* Search and Categories */}
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-16 pb-8 border-b border-border">
                    <div className="relative w-full md:w-80">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            placeholder="Search articles..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 rounded-full bg-card/10 border-border focus-visible:ring-zinc-500/30"
                        />
                    </div>
                    <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar flex-wrap">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition-all border ${activeCategory === cat
                                    ? "bg-foreground text-background border-transparent"
                                    : "border-border text-muted-foreground hover:text-foreground hover:border-zinc-500/40"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Featured Post */}
                {featuredPost && activeCategory === "All" && !searchQuery && (
                    <section className="mb-24">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            <Link href={`/blog/${featuredPost.slug}`}>
                                <Card className="group overflow-hidden rounded-[2.5rem] border-border bg-card/5 backdrop-blur-sm hover:border-zinc-500/30 hover:-translate-y-1 transition-all duration-300">
                                    <div className="grid md:grid-cols-2 gap-0">
                                        <div className="relative aspect-[16/10] md:aspect-auto overflow-hidden">
                                            <img
                                                src={featuredPost.image}
                                                alt={featuredPost.title}
                                                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
                                            <div className="absolute top-6 left-6">
                                                <Badge className="bg-background/80 backdrop-blur-md text-foreground border-none px-4 py-1 rounded-full flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider">
                                                    <Sparkles className="w-3 h-3 text-amber-400" /> Featured Article
                                                </Badge>
                                            </div>
                                        </div>
                                        <CardHeader className="p-8 md:p-12 flex flex-col justify-center">
                                            <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-zinc-500 mb-5">
                                                <span className="flex items-center gap-1.5">
                                                    <Calendar className="w-3 h-3" /> {featuredPost.date}
                                                </span>
                                                <span className="flex items-center gap-1.5">
                                                    <Clock className="w-3 h-3" /> {featuredPost.readTime}
                                                </span>
                                            </div>
                                            <Badge
                                                variant="secondary"
                                                className="w-fit rounded-full px-3 py-1 text-[10px] uppercase font-bold tracking-wider mb-4"
                                            >
                                                {featuredPost.category}
                                            </Badge>
                                            <h2 className="text-3xl md:text-4xl font-bold mb-5 group-hover:text-gradient transition-all leading-tight">
                                                {featuredPost.title}
                                            </h2>
                                            <p className="text-muted-foreground text-base mb-8 leading-relaxed">
                                                {featuredPost.excerpt}
                                            </p>
                                            <div className="flex items-center gap-3 text-foreground font-bold group-hover:gap-5 transition-all">
                                                Read Article <ArrowRight className="w-4 h-4 text-zinc-500" />
                                            </div>
                                        </CardHeader>
                                    </div>
                                </Card>
                            </Link>
                        </motion.div>
                    </section>
                )}

                {/* Latest Posts Grid */}
                <section>
                    <div className="flex items-center justify-between mb-10">
                        <h3 className="text-2xl font-bold">
                            {activeCategory === "All" ? "Latest Stories" : activeCategory}
                            <span className="ml-2 text-muted-foreground text-base font-normal">
                                ({filtered.length})
                            </span>
                        </h3>
                    </div>

                    {filtered.length === 0 ? (
                        <div className="text-center py-20 text-muted-foreground">
                            <BookOpen className="w-10 h-10 mx-auto mb-4 opacity-30" />
                            <p>No articles found matching your search.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                            {filtered.map((blog, i) => (
                                <motion.div
                                    key={blog.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.08 + 0.3 }}
                                >
                                    <Link href={`/blog/${blog.slug}`}>
                                        <Card className="group h-full flex flex-col rounded-[2rem] border-border bg-card/5 backdrop-blur-sm hover:bg-card/10 hover:border-zinc-500/30 hover:-translate-y-1 transition-all duration-300">
                                            <div className="relative aspect-[16/9] overflow-hidden rounded-t-[2rem]">
                                                <img
                                                    src={blog.image}
                                                    alt={blog.title}
                                                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent" />
                                            </div>
                                            <CardContent className="p-7 flex-grow">
                                                <Badge
                                                    variant="secondary"
                                                    className="mb-4 rounded-full px-3 py-1 text-[10px] uppercase font-bold tracking-wider"
                                                >
                                                    {blog.category}
                                                </Badge>
                                                <h4 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-gradient transition-all">
                                                    {blog.title}
                                                </h4>
                                                <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed">
                                                    {blog.excerpt}
                                                </p>
                                            </CardContent>
                                            <CardFooter className="p-7 pt-0 flex items-center justify-between text-xs font-bold text-zinc-500">
                                                <span className="flex items-center gap-1.5">
                                                    <Calendar className="w-3 h-3" /> {blog.date}
                                                </span>
                                                <div className="flex items-center gap-1.5 group-hover:text-foreground transition-colors">
                                                    <Clock className="w-3 h-3" /> {blog.readTime}
                                                </div>
                                            </CardFooter>
                                        </Card>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </section>

                {/* Newsletter Section */}
                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-32 p-12 md:p-20 rounded-[3rem] bg-zinc-900 border border-zinc-800 text-center relative overflow-hidden"
                >
                    <div className="absolute inset-0 dot-grid opacity-20" />
                    <div className="relative z-10 max-w-2xl mx-auto">
                        <h3 className="text-3xl md:text-4xl font-bold mb-4 text-zinc-100">
                            Stay in the loop
                        </h3>
                        <p className="text-zinc-400 mb-8 text-lg leading-relaxed">
                            Get the latest articles on system design and software engineering delivered straight
                            to your inbox. No spam, ever.
                        </p>
                        <form className="flex flex-col sm:flex-row gap-3">
                            <Input
                                placeholder="your@email.com"
                                className="rounded-full bg-zinc-800/50 border-zinc-700 focus-visible:ring-zinc-500/30 text-zinc-100 h-13 px-6 flex-1"
                            />
                            <Button className="rounded-full h-13 px-8 font-bold bg-zinc-100 text-zinc-900 hover:bg-zinc-300 shrink-0">
                                Subscribe
                            </Button>
                        </form>
                    </div>
                </motion.section>
            </main>
        </div>
    );
};

export default BlogPage;
