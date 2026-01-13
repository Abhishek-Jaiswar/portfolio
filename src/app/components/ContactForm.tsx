"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, User, Mail, MessageSquare, Tag } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { Label } from "@/src/components/ui/label";

export default function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate submission
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setIsSubmitting(false);
        alert("Message sent successfully!");
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full max-w-2xl mx-auto p-8 md:p-12 rounded-[3rem] border border-border bg-card/5 backdrop-blur-sm relative overflow-hidden group"
        >
            <div className="absolute top-0 right-0 w-64 h-64 bg-zinc-500/5 blur-[100px] -z-10 group-hover:bg-zinc-500/10 transition-colors" />

            <div className="space-y-8">
                <div className="text-center md:text-left">
                    <h3 className="text-3xl font-bold mb-2">Send a Message</h3>
                    <p className="text-muted-foreground">I typically respond within 24 hours.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">
                                Full Name
                            </Label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    id="name"
                                    placeholder="John Doe"
                                    required
                                    className="pl-12 h-14 rounded-2xl bg-background/50 border-border focus:ring-zinc-500/30"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">
                                Email Address
                            </Label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="john@example.com"
                                    required
                                    className="pl-12 h-14 rounded-2xl bg-background/50 border-border focus:ring-zinc-500/30"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="subject" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">
                            Subject
                        </Label>
                        <div className="relative">
                            <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                id="subject"
                                placeholder="Potential Project / Opportunity"
                                required
                                className="pl-12 h-14 rounded-2xl bg-background/50 border-border focus:ring-zinc-500/30"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="message" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">
                            Your Message
                        </Label>
                        <div className="relative">
                            <MessageSquare className="absolute left-4 top-5 w-4 h-4 text-muted-foreground" />
                            <Textarea
                                id="message"
                                placeholder="Tell me about your project..."
                                required
                                className="pl-12 pt-4 min-h-[150px] rounded-[2rem] bg-background/50 border-border focus:ring-zinc-500/30 resize-none"
                            />
                        </div>
                    </div>

                    <Button
                        disabled={isSubmitting}
                        className="w-full h-14 rounded-2xl font-bold text-lg bg-foreground text-background hover:opacity-90 transition-all flex items-center justify-center gap-2 group"
                    >
                        {isSubmitting ? (
                            <div className="w-5 h-5 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                        ) : (
                            <>
                                Send Message <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </>
                        )}
                    </Button>
                </form>
            </div>
        </motion.div>
    );
}
