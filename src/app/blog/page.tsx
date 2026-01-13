"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, Search, Tag, Sparkles } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { Input } from "@/src/components/ui/input";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/src/components/ui/card";

const categories = ["WebSockets", "Next.js", "System Design", "Frontend", "Backend"];

const blogs = [
    {
        id: "1",
        title: "How to use WebSockets in Next.js",
        slug: "websockets-in-nextjs",
        excerpt: "Learn how to implement real-time features using WebSockets in a Next.js application, from server-side setup to client-side integration.",
        date: "Jan 13, 2026",
        readTime: "8 min read",
        category: "WebSockets",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?q=80&w=2000&auto=format&fit=crop",
        featured: true
    },
    {
        id: "2",
        title: "Mastering Framer Motion Animations",
        slug: "framer-motion-animations",
        excerpt: "Bring your React applications to life with production-ready animations and transitions using Framer Motion.",
        date: "Jan 10, 2026",
        readTime: "6 min read",
        category: "Frontend",
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000&auto=format&fit=crop",
        featured: false
    },
    {
        id: "3",
        title: "Building Scalable Microservices",
        slug: "scalable-microservices",
        excerpt: "An in-depth look at designing and deploying microservices that can handle millions of requests with Go and Docker.",
        date: "Jan 05, 2026",
        readTime: "12 min read",
        category: "Backend",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop",
        featured: false
    }
];

const BlogPage = () => {
    const featuredPost = blogs.find(b => b.featured);
    const latestPosts = blogs.filter(b => !b.featured);

    return (
        <div className="min-h-screen pt-32 pb-20">
            <main className="max-w-6xl mx-auto px-6 lg:px-12">
                <header className="mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 mb-4"
                    >
                        <Badge variant="outline" className="px-4 py-1 rounded-full border-zinc-500/20 text-zinc-500 font-medium">
                            The Journal
                        </Badge>
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl sm:text-7xl font-bold mb-6 tracking-tight"
                    >
                        Insights for <span className="text-gradient">the Modern Web</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-muted-foreground max-w-2xl leading-relaxed"
                    >
                        Deep dives into software engineering, system architecture, and product design.
                    </motion.p>
                </header>

                {/* Search and Categories */}
                <div className="flex flex-col md:flex-row items-center gap-6 mb-16 pb-8 border-b border-border">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            placeholder="Search articles..."
                            className="pl-10 rounded-full bg-card/10 border-border focus-visible:ring-zinc-500/30"
                        />
                    </div>
                    <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
                        <Tag className="w-4 h-4 text-muted-foreground shrink-0" />
                        {categories.map((cat) => (
                            <Badge
                                key={cat}
                                variant="secondary"
                                className="whitespace-nowrap rounded-full px-4 py-1 hover:bg-zinc-500/10 cursor-pointer transition-colors"
                            >
                                {cat}
                            </Badge>
                        ))}
                    </div>
                </div>

                {/* Featured Post */}
                {featuredPost && (
                    <section className="mb-24">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            <Link href={`/blog/${featuredPost.slug}`}>
                                <Card className="group overflow-hidden rounded-[2.5rem] border-border bg-card/10 backdrop-blur-sm hover:border-zinc-500/30 transition-all">
                                    <div className="grid md:grid-cols-2 gap-0">
                                        <div className="relative aspect-[16/10] md:aspect-auto overflow-hidden">
                                            <img
                                                src={featuredPost.image}
                                                alt={featuredPost.title}
                                                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
                                            />
                                            <div className="absolute top-6 left-6">
                                                <Badge className="bg-background/80 backdrop-blur-md text-foreground border-none px-4 py-1 rounded-full flex items-center gap-2">
                                                    <Sparkles className="w-3 h-3 text-zinc-500" /> Featured
                                                </Badge>
                                            </div>
                                        </div>
                                        <CardHeader className="p-8 md:p-12 flex flex-col justify-center">
                                            <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-zinc-500 mb-6">
                                                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {featuredPost.date}</span>
                                                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {featuredPost.readTime}</span>
                                            </div>
                                            <h2 className="text-4xl md:text-5xl font-bold mb-6 group-hover:text-foreground transition-colors leading-tight">
                                                {featuredPost.title}
                                            </h2>
                                            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                                                {featuredPost.excerpt}
                                            </p>
                                            <div className="flex items-center gap-3 text-foreground font-bold group-hover:gap-5 transition-all text-lg">
                                                Read Article <ArrowRight className="w-5 h-5 text-zinc-500" />
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
                    <div className="flex items-center justify-between mb-12">
                        <h3 className="text-3xl font-bold">Latest Stories</h3>
                        <Link href="/blog/archive" className="text-sm font-bold text-zinc-500 hover:text-foreground transition-colors">
                            View Archive →
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {latestPosts.map((blog, i) => (
                            <motion.div
                                key={blog.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 + 0.4 }}
                            >
                                <Link href={`/blog/${blog.slug}`}>
                                    <Card className="group h-full flex flex-col rounded-[2rem] border-border bg-card/5 backdrop-blur-sm hover:bg-card/10 hover:border-zinc-500/20 transition-all border-dashed">
                                        <div className="relative aspect-[16/9] overflow-hidden rounded-t-[2rem]">
                                            <img
                                                src={blog.image}
                                                alt={blog.title}
                                                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
                                            />
                                        </div>
                                        <CardContent className="p-8 flex-grow">
                                            <Badge variant="secondary" className="mb-4 rounded-full px-3 py-0.5 text-[10px] uppercase font-bold tracking-wider">
                                                {blog.category}
                                            </Badge>
                                            <h4 className="text-2xl font-bold mb-4 line-clamp-2">{blog.title}</h4>
                                            <p className="text-muted-foreground line-clamp-3 mb-4 leading-relaxed">
                                                {blog.excerpt}
                                            </p>
                                        </CardContent>
                                        <CardFooter className="p-8 pt-0 flex items-center justify-between text-xs font-bold text-zinc-500">
                                            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {blog.date}</span>
                                            <div className="flex items-center gap-1 group-hover:text-foreground transition-colors">
                                                Details <ArrowRight className="w-4 h-4" />
                                            </div>
                                        </CardFooter>
                                    </Card>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Newsletter Section */}
                <section className="mt-32 p-12 md:p-20 rounded-[3rem] bg-zinc-900 border border-zinc-800 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--zinc-500)_0%,_transparent_70%)]" />
                    </div>
                    <div className="relative z-10 max-w-2xl mx-auto">
                        <h3 className="text-3xl md:text-4xl font-bold mb-6 text-zinc-100">Subscribe for insights</h3>
                        <p className="text-zinc-400 mb-8 text-lg">
                            Get the latest articles on system design and software engineering delivered straight to your inbox.
                        </p>
                        <form className="flex flex-col sm:flex-row gap-4">
                            <Input
                                placeholder="Enter your email"
                                className="rounded-full bg-zinc-800/50 border-zinc-700 focus-visible:ring-zinc-500/30 text-zinc-100 h-14 px-6"
                            />
                            <Button className="rounded-full h-14 px-8 font-bold bg-zinc-100 text-zinc-900 hover:bg-zinc-300">
                                Subscribe
                            </Button>
                        </form>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default BlogPage;
