"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { Plus, Search, Loader2, Layers, Clock, ArrowUpRight } from "lucide-react";
import { TCaseStudy } from "@/src/lib/types/types";

const CaseStudiesAdminPage = () => {
    const [studies, setStudies] = useState<TCaseStudy[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetch = async () => {
            try {
                setLoading(true);
                const res = await axios.get("/api/case-studies");
                if (res.data.success) setStudies(res.data.caseStudies);
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

    const filtered = studies.filter((s) =>
        s.title.toLowerCase().includes(search.toLowerCase()) ||
        s.client.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="w-full space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground italic">Case Studies</h1>
                    <p className="text-muted-foreground mt-1 text-sm">Document and showcase your in-depth project breakdowns.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative group hidden sm:block">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-foreground transition-colors" />
                        <input
                            type="text"
                            placeholder="Search case studies..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-10 pr-4 py-2 bg-secondary/50 border border-border rounded-xl text-sm focus:outline-hidden focus:ring-1 focus:ring-primary w-64 transition-all"
                        />
                    </div>
                    <Link
                        href="/dashboard/case-studies/upload"
                        className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 rounded-xl text-sm font-medium hover:opacity-90 transition shadow-lg shadow-primary/20"
                    >
                        <Plus className="w-4 h-4" />
                        Add New
                    </Link>
                </div>
            </div>

            {/* List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((study) => (
                    <div
                        key={study.id}
                        className="group relative bg-card/40 backdrop-blur-md border border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 flex flex-col"
                    >
                        {study.image ? (
                            <div className="relative h-40 w-full overflow-hidden bg-secondary">
                                <img
                                    src={study.image}
                                    alt={study.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                                <div className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-background/80 backdrop-blur-md border border-border/50 text-muted-foreground">
                                    {study.category}
                                </div>
                            </div>
                        ) : (
                            <div className="h-40 w-full bg-secondary/50 flex items-center justify-center border-b border-border">
                                <Layers className="w-8 h-8 text-muted-foreground/30" />
                            </div>
                        )}
                        <div className="p-5 flex flex-col flex-1 gap-3">
                            <div className="flex items-start justify-between gap-2">
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">{study.client}</p>
                                    <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 italic leading-snug">
                                        {study.title}
                                    </h3>
                                </div>
                                <ArrowUpRight className="w-4 h-4 text-muted-foreground shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed flex-1">
                                {study.description}
                            </p>
                            <div className="flex flex-wrap gap-1.5 pt-3 border-t border-border">
                                {study.tech.slice(0, 4).map((t) => (
                                    <span key={t} className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-lg bg-secondary/60 border border-border text-muted-foreground">
                                        {t}
                                    </span>
                                ))}
                                {study.tech.length > 4 && (
                                    <span className="text-[10px] text-muted-foreground py-0.5">+{study.tech.length - 4}</span>
                                )}
                            </div>
                            <div className="flex items-center gap-1 text-[10px] text-muted-foreground font-medium">
                                <Clock className="w-3 h-3" /> {study.duration}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty state */}
            {filtered.length === 0 && !loading && (
                <div className="flex flex-col items-center justify-center p-20 border-2 border-dashed border-border rounded-3xl bg-secondary/20">
                    <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mb-6">
                        <Layers className="w-10 h-10 text-muted-foreground" />
                    </div>
                    <h2 className="text-2xl font-bold italic text-foreground text-center">No case studies yet</h2>
                    <p className="text-muted-foreground text-center max-w-sm mt-2">
                        Document the in-depth story behind your best projects.
                    </p>
                    <Link
                        href="/dashboard/case-studies/upload"
                        className="mt-8 bg-primary text-primary-foreground px-8 py-3 rounded-xl text-sm font-bold hover:opacity-90 transition shadow-xl shadow-primary/20 italic"
                    >
                        Add First Case Study
                    </Link>
                </div>
            )}
        </div>
    );
};

export default CaseStudiesAdminPage;
