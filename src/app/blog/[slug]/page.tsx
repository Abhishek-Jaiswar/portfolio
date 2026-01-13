"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, Share2, Clipboard } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

const blogContent = {
    "websockets-in-nextjs": {
        title: "How to use WebSockets in Next.js",
        date: "Jan 13, 2026",
        readTime: "8 min read",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?q=80&w=2000&auto=format&fit=crop",
        content: `
      <h2>The Real-Time Revolution</h2>
      <p>In the modern web, "real-time" isn't a feature; it's an expectation. Whether it's a chat app, a live dashboard, or a collaborative document editor, users expect immediate feedback without manual refreshes. WebSockets are the backbone of this interactive experience.</p>
      
      <h3>Why WebSockets?</h3>
      <p>Unlike standard HTTP requests, which are one-way (client asks, server responds), WebSockets provide a **full-duplex** communication channel. This means once the "handshake" is complete, the client and server can send data to each other at any time.</p>
      
      <pre><code>// Basic WebSocket initialization
const socket = new WebSocket('ws://localhost:8080');

socket.onopen = () => {
  console.log('Connection established');
};

socket.onmessage = (event) => {
  console.log('Message from server:', event.data);
};</code></pre>

      <h3>Implementing in Next.js</h3>
      <p>Next.js is primarily a React framework with powerful server-side capabilities. However, because WebSockets require a long-lived connection, they are often implemented using a custom server or external services like Pusher or Socket.io.</p>
      
      <h4>Option 1: Using Socket.io with a Custom Server</h4>
      <p>If you have control over your server environment, Socket.io is the gold standard. It provides fallback mechanisms (long-polling) and a simplified API.</p>
      
      <h4>Option 2: Serverless WebSockets (Pusher/Ably)</h4>
      <p>If you're deploying to platform like Vercel, traditional WebSockets can be tricky because serverless functions are ephemeral. In these cases, using a managed provider is often the best path forward.</p>
    `
    }
};

const BlogPost = () => {
    const params = useParams();
    const slug = params.slug as string;
    const blog = blogContent[slug as keyof typeof blogContent];

    if (!blog) {
        return <div className="min-h-screen flex items-center justify-center">Post not found</div>;
    }

    return (
        <div className="min-h-screen pt-32 pb-20">
            <main className="max-w-4xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mb-8"
                >
                    <Link href="/blog" className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors font-bold uppercase tracking-widest text-xs">
                        <ArrowLeft className="w-4 h-4" /> Back to Blog
                    </Link>
                </motion.div>

                <header className="mb-12">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl sm:text-6xl font-bold mb-6 leading-tight"
                    >
                        {blog.title}
                    </motion.h1>

                    <div className="flex items-center gap-6 text-sm text-muted-foreground mb-8">
                        <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {blog.date}</span>
                        <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {blog.readTime}</span>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative aspect-video rounded-[2.5rem] overflow-hidden border border-border"
                    >
                        <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
                    </motion.div>
                </header>

                <div className="prose prose-invert prose-lg max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: blog.content }} className="space-y-6" />
                </div>

                <footer className="mt-20 pt-12 border-t border-border flex justify-between items-center">
                    <div className="flex gap-4">
                        <button className="p-3 rounded-full border border-border hover:bg-accent hover:text-white transition-all">
                            <Share2 className="w-5 h-5" />
                        </button>
                        <button className="p-3 rounded-full border border-border hover:bg-accent hover:text-white transition-all">
                            <Clipboard className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
                        Share this article
                    </div>
                </footer>
            </main>
        </div>
    );
};

export default BlogPost;
