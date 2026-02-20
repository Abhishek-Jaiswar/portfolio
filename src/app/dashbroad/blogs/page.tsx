"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { Plus, Search, Loader2, BookOpen, Star, Eye, EyeOff } from "lucide-react";
import { TBlogPost } from "@/src/lib/types/types";

const BlogsPage = () => {
    const [blogs, setBlogs] = useState<TBlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetch = async () => {
            try {
                setLoading(true);
                const res = await axios.get("/api/blogs");
                if (res.data.success) setBlogs(res.data.blogs);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, []);

    if (loading) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    const filtered = blogs.filter((b) =>
        b.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="w-full space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground italic">Blogs</h1>
                    <p className="text-muted-foreground mt-1 text-sm">Write and manage your published articles.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative group hidden sm:block">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-foreground transition-colors" />
                        <input
                            type="text"
                            placeholder="Search blogs..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-10 pr-4 py-2 bg-secondary/50 border border-border rounded-xl text-sm focus:outline-hidden focus:ring-1 focus:ring-primary w-64 transition-all"
                        />
                    </div>
                    <Link
                        href="/dashboard/blogs/upload"
                        className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 rounded-xl text-sm font-medium hover:opacity-90 transition shadow-lg shadow-primary/20"
                    >
                        <Plus className="w-4 h-4" />
                        Write New
                    </Link>
                </div>
            </div>

            {/* List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((blog) => (
                    <div
                        key={blog.id}
                        className="group relative bg-card/40 backdrop-blur-md border border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 flex flex-col"
                    >
                        {blog.image ? (
                            <div className="relative h-40 w-full overflow-hidden bg-secondary">
                                <img
                                    src={blog.image}
                                    alt={blog.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                            </div>
                        ) : (
                            <div className="h-40 w-full bg-secondary/50 flex items-center justify-center border-b border-border">
                                <BookOpen className="w-8 h-8 text-muted-foreground/30" />
                            </div>
                        )}
                        <div className="p-5 flex flex-col flex-1 gap-3">
                            <div className="flex items-start justify-between gap-2">
                                <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 italic leading-snug">
                                    {blog.title}
                                </h3>
                                <div className="flex items-center gap-1 shrink-0">
                                    {blog.featured && <Star className="w-3.5 h-3.5 text-amber-400" />}
                                    {blog.published ? (
                                        <Eye className="w-3.5 h-3.5 text-emerald-400" />
                                    ) : (
                                        <EyeOff className="w-3.5 h-3.5 text-muted-foreground" />
                                    )}
                                </div>
                            </div>
                            <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed flex-1">
                                {blog.excerpt}
                            </p>
                            <div className="flex items-center justify-between pt-3 border-t border-border text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                                <span className="px-2 py-0.5 rounded-lg bg-secondary/60 border border-border">
                                    {blog.category}
                                </span>
                                <span>{blog.readTime}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty state */}
            {filtered.length === 0 && !loading && (
                <div className="flex flex-col items-center justify-center p-20 border-2 border-dashed border-border rounded-3xl bg-secondary/20">
                    <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mb-6">
                        <BookOpen className="w-10 h-10 text-muted-foreground" />
                    </div>
                    <h2 className="text-2xl font-bold italic text-foreground text-center">No blog posts yet</h2>
                    <p className="text-muted-foreground text-center max-w-sm mt-2">
                        Share your knowledge and insights with the world.
                    </p>
                    <Link
                        href="/dashboard/blogs/upload"
                        className="mt-8 bg-primary text-primary-foreground px-8 py-3 rounded-xl text-sm font-bold hover:opacity-90 transition shadow-xl shadow-primary/20 italic"
                    >
                        Write Your First Post
                    </Link>
                </div>
            )}
        </div>
    );
};

export default BlogsPage;
