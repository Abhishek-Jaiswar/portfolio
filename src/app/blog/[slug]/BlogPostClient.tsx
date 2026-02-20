"use client";

import { motion } from "motion/react";
import { ArrowLeft, Calendar, Clock, Share2, Copy, Check, BookOpen, Tag } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// ─────────────────────────────────────────────
// Blog Content Database
// ─────────────────────────────────────────────
const blogContent: Record<
  string,
  {
    title: string;
    date: string;
    readTime: string;
    category: string;
    image: string;
    tags: string[];
    author: { name: string; role: string; avatar: string };
    content: string;
  }
> = {
  "websockets-in-nextjs": {
    title: "How to use WebSockets in Next.js",
    date: "Jan 13, 2026",
    readTime: "8 min read",
    category: "WebSockets",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?q=80&w=2000&auto=format&fit=crop",
    tags: ["WebSockets", "Next.js", "Real-Time", "Node.js"],
    author: { name: "Abhishek Jaiswar", role: "Full-Stack Developer", avatar: "AJ" },
    content: `
<h2>The Real-Time Revolution</h2>
<p>In the modern web, "real-time" isn't a feature — it's an expectation. Whether it's a chat app, a live dashboard, or a collaborative document editor, users expect immediate feedback without manual page refreshes. WebSockets are the backbone of this interactive experience.</p>

<h3>Why WebSockets over HTTP Polling?</h3>
<p>Traditional REST APIs are request-response: the client asks, the server replies, and the connection closes. If you want to simulate "real-time" with HTTP, you need to either <strong>poll</strong> (repeatedly ask the server every few seconds) or use <strong>long-polling</strong> (hold the connection open until new data arrives). Both approaches waste bandwidth and add latency.</p>
<p>WebSockets, on the other hand, open a <strong>persistent, full-duplex channel</strong>. Once the handshake is complete, either side can push data at any time — no overhead, no wasted requests.</p>

<pre><code class="language-js">// Basic WebSocket client
const socket = new WebSocket('ws://localhost:8080');

socket.onopen = () => {
  console.log('✅ Connection established');
  socket.send(JSON.stringify({ type: 'join', room: 'general' }));
};

socket.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log('📨 Message:', data);
};

socket.onclose = () => console.log('🔌 Disconnected');
socket.onerror = (err) => console.error('❌ Error:', err);</code></pre>

<h3>Implementing in Next.js with a Custom Server</h3>
<p>Next.js is designed for serverless deployments, but WebSockets need a long-lived process. The cleanest solution is a <strong>custom Node.js server</strong> that integrates with Next.js while also running a WebSocket server.</p>

<pre><code class="language-js">// server.js
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const { WebSocketServer } = require('ws');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  // Attach WebSocket server
  const wss = new WebSocketServer({ server });
  
  wss.on('connection', (ws) => {
    console.log('Client connected');
    ws.send(JSON.stringify({ type: 'welcome', message: 'Hello!' }));

    ws.on('message', (data) => {
      // Broadcast to all clients
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(data.toString());
        }
      });
    });
  });

  server.listen(3000, () => {
    console.log('> Ready on http://localhost:3000');
  });
});</code></pre>

<h3>React Hook for WebSocket State</h3>
<p>On the client side, wrap the WebSocket logic in a custom React hook for clean component integration:</p>

<pre><code class="language-tsx">// hooks/useWebSocket.ts
import { useEffect, useRef, useState, useCallback } from 'react';

export function useWebSocket(url: string) {
  const ws = useRef&lt;WebSocket | null&gt;(null);
  const [messages, setMessages] = useState&lt;string[]&gt;([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    ws.current = new WebSocket(url);

    ws.current.onopen = () => setIsConnected(true);
    ws.current.onclose = () => setIsConnected(false);
    ws.current.onmessage = (e) => {
      setMessages((prev) => [...prev, e.data]);
    };

    return () => ws.current?.close();
  }, [url]);

  const sendMessage = useCallback((msg: string) => {
    ws.current?.send(msg);
  }, []);

  return { messages, isConnected, sendMessage };
}</code></pre>

<h3>Serverless Alternative: Pusher or Ably</h3>
<p>Deploying to Vercel? Traditional WebSockets won't work out of the box because serverless functions are ephemeral. Use a managed provider instead:</p>
<ul>
  <li><strong>Pusher Channels</strong> — battle-tested, generous free tier, great DX</li>
  <li><strong>Ably</strong> — more advanced features, global edge network</li>
  <li><strong>PartyKit</strong> — built specifically for real-time collaborative apps</li>
</ul>

<h3>Key Takeaways</h3>
<p>WebSockets unlock genuinely interactive experiences. For Next.js projects:</p>
<ul>
  <li>Use a custom server for full control in Node.js environments</li>
  <li>Use a managed provider (Pusher, Ably) for serverless deployments</li>
  <li>Always handle reconnection logic and error states gracefully</li>
  <li>Secure your WebSocket endpoints — authenticate before accepting connections</li>
</ul>
    `,
  },

  "framer-motion-animations": {
    title: "Mastering Framer Motion Animations",
    date: "Jan 10, 2026",
    readTime: "6 min read",
    category: "Frontend",
    image:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000&auto=format&fit=crop",
    tags: ["Framer Motion", "React", "Animation", "Frontend"],
    author: { name: "Abhishek Jaiswar", role: "Full-Stack Developer", avatar: "AJ" },
    content: `
<h2>Why Framer Motion?</h2>
<p>Animation libraries come and go, but Framer Motion has quietly become the de facto standard for React animations. Its declarative API, powerful gesture support, and seamless integration with React's component model make it uniquely accessible without sacrificing capability.</p>

<h3>The Core Primitives</h3>
<p>Framer Motion revolves around a single key concept: the <code>motion</code> component. Any HTML or SVG element prefixed with <code>motion.</code> gains animation superpowers.</p>

<pre><code class="language-tsx">import { motion } from 'framer-motion';

// Animate on mount
&lt;motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, ease: 'easeOut' }}
&gt;
  Hello World
&lt;/motion.div&gt;

// Hover and tap gestures
&lt;motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
&gt;
  Click me
&lt;/motion.button&gt;</code></pre>

<h3>Variants: The Secret Weapon</h3>
<p>For coordinated animations across multiple elements, <strong>variants</strong> are the most powerful tool in Framer Motion's arsenal. They let you define named animation states and propagate them through the component tree.</p>

<pre><code class="language-tsx">const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Each child animates 100ms after the previous
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// Usage
&lt;motion.ul variants={container} initial="hidden" animate="show"&gt;
  {items.map((i) => (
    &lt;motion.li key={i} variants={item}&gt;{i}&lt;/motion.li&gt;
  ))}
&lt;/motion.ul&gt;</code></pre>

<h3>Layout Animations with layoutId</h3>
<p>One of Framer Motion's most magical features — shared layout animations. Elements with the same <code>layoutId</code> will smoothly transition between their positions, even across different parts of the DOM.</p>

<pre><code class="language-tsx">// Animated tab indicator
{tabs.map((tab) => (
  &lt;button key={tab} onClick={() => setActive(tab)}&gt;
    {tab}
    {active === tab && (
      &lt;motion.div
        layoutId="active-tab"
        className="underline-indicator"
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      /&gt;
    )}
  &lt;/button&gt;
))}</code></pre>

<h3>Scroll-Triggered Animations</h3>
<p>Use <code>whileInView</code> to trigger animations as elements enter the viewport — perfect for landing pages:</p>

<pre><code class="language-tsx">&lt;motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: '-100px' }}
  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
&gt;
  Animates when scrolled into view
&lt;/motion.div&gt;</code></pre>

<h3>Performance Tips</h3>
<ul>
  <li>Animate only <strong>transform</strong> and <strong>opacity</strong> — they're GPU-accelerated and won't trigger layout reflow</li>
  <li>Use <code>will-change: transform</code> for frequently animated elements</li>
  <li>Set <code>viewport={{ once: true }}</code> to prevent re-triggering on scroll</li>
  <li>Prefer <code>spring</code> transitions for organic, natural-feeling motion</li>
</ul>
    `,
  },

  "scalable-microservices": {
    title: "Building Scalable Microservices with Go",
    date: "Jan 05, 2026",
    readTime: "12 min read",
    category: "Backend",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop",
    tags: ["Go", "Microservices", "Docker", "System Design"],
    author: { name: "Abhishek Jaiswar", role: "Full-Stack Developer", avatar: "AJ" },
    content: `
<h2>Why Go for Microservices?</h2>
<p>Go has quietly become the language of choice for backend infrastructure at companies like Google, Cloudflare, and Uber. Its combination of <strong>simple concurrency primitives</strong>, <strong>fast compile times</strong>, and <strong>near-C performance without garbage collection pauses</strong> makes it ideal for high-throughput services.</p>

<h3>Anatomy of a Go Microservice</h3>
<p>A well-structured Go microservice follows a clean layered architecture:</p>

<pre><code class="language">service/
├── cmd/
│   └── main.go          # Entry point
├── internal/
│   ├── handler/         # HTTP handlers
│   ├── service/         # Business logic
│   ├── repository/      # Database layer
│   └── model/           # Domain models
├── pkg/
│   ├── middleware/       # Auth, logging, etc.
│   └── config/          # Configuration
└── Dockerfile</code></pre>

<h3>A Minimal HTTP Service in Go</h3>

<pre><code class="language-go">package main

import (
  "encoding/json"
  "log"
  "net/http"
)

type User struct {
  ID    int    \`json:"id"\`
  Name  string \`json:"name"\`
  Email string \`json:"email"\`
}

func getUserHandler(w http.ResponseWriter, r *http.Request) {
  user := User{ID: 1, Name: "Abhishek", Email: "hi@example.com"}
  w.Header().Set("Content-Type", "application/json")
  json.NewEncoder(w).Encode(user)
}

func main() {
  mux := http.NewServeMux()
  mux.HandleFunc("GET /users/{id}", getUserHandler)

  log.Println("Starting server on :8080")
  if err := http.ListenAndServe(":8080", mux); err != nil {
    log.Fatal(err)
  }
}</code></pre>

<h3>Concurrency with Goroutines</h3>
<p>Go's goroutines are lightweight threads managed by the Go runtime. You can spawn thousands of them without significant overhead — far more efficient than OS threads.</p>

<pre><code class="language-go">// Process items concurrently with a worker pool
func processWithWorkerPool(items []string, workerCount int) {
  jobs := make(chan string, len(items))
  results := make(chan string, len(items))

  // Spawn workers
  for w := 0; w &lt; workerCount; w++ {
    go func() {
      for job := range jobs {
        results &lt;- process(job)
      }
    }()
  }

  // Send jobs
  for _, item := range items {
    jobs &lt;- item
  }
  close(jobs)

  // Collect results
  for range items {
    fmt.Println(&lt;-results)
  }
}</code></pre>

<h3>Inter-Service Communication</h3>
<p>Microservices need to talk to each other. Two dominant patterns:</p>
<ul>
  <li><strong>Synchronous (gRPC/REST)</strong> — Direct calls, simpler to reason about, but introduces tight coupling</li>
  <li><strong>Asynchronous (Message Queues)</strong> — Services communicate via events (Kafka, RabbitMQ, NATS), decoupled and more resilient</li>
</ul>

<pre><code class="language-go">// Publishing an event to NATS
nc, _ := nats.Connect(nats.DefaultURL)
defer nc.Close()

orderEvent := OrderCreatedEvent{OrderID: "order-123", UserID: "user-456"}
data, _ := json.Marshal(orderEvent)
nc.Publish("orders.created", data)</code></pre>

<h3>Dockerizing the Service</h3>

<pre><code class="language-dockerfile"># Multi-stage build for minimal image size
FROM golang:1.23-alpine AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN go build -o /server ./cmd/main.go

# Final minimal image
FROM alpine:latest
RUN apk --no-cache add ca-certificates
COPY --from=builder /server /server
EXPOSE 8080
CMD ["/server"]</code></pre>

<h3>Key Principles for Production-Ready Services</h3>
<ul>
  <li><strong>Health checks</strong> — Expose <code>/health</code> and <code>/ready</code> endpoints for Kubernetes probes</li>
  <li><strong>Graceful shutdown</strong> — Handle SIGTERM signals, drain in-flight requests before stopping</li>
  <li><strong>Structured logging</strong> — Use <code>slog</code> or <code>zap</code> with JSON output for log aggregation</li>
  <li><strong>Circuit breakers</strong> — Prevent cascade failures when downstream services degrade</li>
  <li><strong>Distributed tracing</strong> — Use OpenTelemetry to trace requests across service boundaries</li>
</ul>
    `,
  },

  "nextjs-app-router-guide": {
    title: "Next.js App Router: A Complete Guide",
    date: "Dec 28, 2025",
    readTime: "10 min read",
    category: "Next.js",
    image:
      "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?q=80&w=2000&auto=format&fit=crop",
    tags: ["Next.js", "App Router", "React", "Server Components"],
    author: { name: "Abhishek Jaiswar", role: "Full-Stack Developer", avatar: "AJ" },
    content: `
<h2>The Architecture Shift</h2>
<p>The Next.js App Router, introduced in v13 and stabilized in v14, represents the most significant architectural shift in React development of the past decade. It moves the default rendering paradigm from client to server, radically changing how we think about data fetching, performance, and component design.</p>

<h3>File-Based Routing in the App Directory</h3>
<p>Every folder in the <code>app/</code> directory is a route segment. Special files like <code>page.tsx</code>, <code>layout.tsx</code>, <code>loading.tsx</code>, and <code>error.tsx</code> define the UI for each segment.</p>

<pre><code class="language">app/
├── layout.tsx          # Root layout (wraps all pages)
├── page.tsx            # Home page (/)
├── blog/
│   ├── layout.tsx      # Blog layout
│   ├── page.tsx        # /blog
│   └── [slug]/
│       └── page.tsx    # /blog/my-post
└── dashboard/
    ├── @analytics/     # Parallel route slot
    └── page.tsx</code></pre>

<h3>Server vs. Client Components</h3>
<p>By default, all components in the App Router are <strong>Server Components</strong> — they render on the server and send zero JavaScript to the client. Only add the <code>"use client"</code> directive when you need browser APIs, state, or event listeners.</p>

<pre><code class="language-tsx">// Server Component (default) — can async/await directly
async function BlogList() {
  const posts = await db.post.findMany(); // Direct DB call, no API needed!
  return &lt;ul&gt;{posts.map(p => &lt;li key={p.id}&gt;{p.title}&lt;/li&gt;)}&lt;/ul&gt;;
}

// Client Component — needed for interactivity
"use client";
import { useState } from 'react';

function SearchBar() {
  const [query, setQuery] = useState('');
  return &lt;input value={query} onChange={e => setQuery(e.target.value)} /&gt;;
}</code></pre>

<h3>Streaming with Suspense</h3>
<p>The App Router enables streaming HTML from the server. Wrap any async component in <code>Suspense</code> to show a loading skeleton while data fetches:</p>

<pre><code class="language-tsx">import { Suspense } from 'react';

export default function Page() {
  return (
    &lt;main&gt;
      &lt;h1&gt;Dashboard&lt;/h1&gt;
      &lt;Suspense fallback={&lt;SkeletonCard /&gt;}&gt;
        &lt;RecentOrders /&gt; {/* This streams in when ready */}
      &lt;/Suspense&gt;
    &lt;/main&gt;
  );
}</code></pre>

<h3>The Power of Route Groups and Parallel Routes</h3>
<p>Route groups (wrapped in parentheses) let you organize code without affecting URLs. Parallel routes (prefixed with <code>@</code>) allow rendering multiple pages in the same layout simultaneously.</p>
    `,
  },

  "system-design-url-shortener": {
    title: "System Design: Building a URL Shortener at Scale",
    date: "Dec 20, 2025",
    readTime: "15 min read",
    category: "System Design",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2000&auto=format&fit=crop",
    tags: ["System Design", "Scalability", "Database", "Caching"],
    author: { name: "Abhishek Jaiswar", role: "Full-Stack Developer", avatar: "AJ" },
    content: `
<h2>The Problem Statement</h2>
<p>Design a URL shortener like Bit.ly or TinyURL that can handle <strong>100 million URLs created per day</strong> and <strong>10 billion redirects per day</strong> with sub-100ms latency globally.</p>

<h3>Estimating Scale</h3>
<ul>
  <li>Writes: 100M URLs/day → ~1,160 writes/second</li>
  <li>Reads: 10B redirects/day → ~115,740 reads/second</li>
  <li>Read/Write ratio: ~100:1 (read-heavy system)</li>
  <li>Storage: avg 500 bytes/URL × 100M × 365 days × 5 years ≈ 90TB</li>
</ul>

<h3>The Core Algorithm: Base62 Encoding</h3>
<p>We need to generate a unique 6-7 character code for each URL. Using Base62 (a-z, A-Z, 0-9), a 7-character code gives us 62^7 ≈ 3.5 trillion unique combinations — more than enough.</p>

<pre><code class="language-go">const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

func toBase62(num int64) string {
  var result []byte
  for num > 0 {
    result = append([]byte{charset[num%62]}, result...)
    num /= 62
  }
  return string(result)
}

// Generate short code from auto-incremented DB ID
func generateShortCode(db *sql.DB) (string, error) {
  var id int64
  err := db.QueryRow("INSERT INTO urls (placeholder) VALUES (1) RETURNING id").Scan(&id)
  if err != nil {
    return "", err
  }
  return toBase62(id), nil
}</code></pre>

<h3>System Architecture</h3>
<p>The high-level architecture for handling 10B redirects/day:</p>
<ul>
  <li><strong>API Gateway</strong> — Rate limiting, auth, request routing</li>
  <li><strong>Write Service</strong> — Generates short codes, writes to primary DB</li>
  <li><strong>Read Service</strong> — Resolves short codes, optimized for speed</li>
  <li><strong>Cache Layer (Redis)</strong> — Cache hot URLs; LRU eviction; 80/20 principle: 20% of URLs receive 80% of traffic</li>
  <li><strong>Database</strong> — PostgreSQL with read replicas for scaling reads</li>
  <li><strong>CDN</strong> — Edge caching for globally distributed redirect latency</li>
</ul>

<h3>Caching Strategy</h3>
<pre><code class="language-go">func resolveURL(shortCode string) (string, error) {
  // 1. Check Redis cache
  if longURL, err := redis.Get(ctx, shortCode).Result(); err == nil {
    return longURL, nil // Cache hit — ~1ms
  }

  // 2. Query database (cache miss)
  var longURL string
  err := db.QueryRow("SELECT long_url FROM urls WHERE short_code = $1", shortCode).Scan(&longURL)
  if err != nil {
    return "", err
  }

  // 3. Populate cache with TTL
  redis.Set(ctx, shortCode, longURL, 24*time.Hour)
  return longURL, nil
}</code></pre>

<h3>Handling Hot Spots: Consistent Hashing</h3>
<p>With multiple cache nodes, we need to ensure the same short code always hits the same cache node. Consistent hashing places nodes on a virtual "ring" — when a node is added or removed, only a small fraction of keys need to be remapped.</p>

<h3>Key Design Decisions</h3>
<ul>
  <li><strong>Pre-generate IDs</strong> — Use a separate ID generation service (Snowflake IDs) to avoid DB write bottlenecks</li>
  <li><strong>Async analytics</strong> — Don't block redirect response for analytics tracking; publish click events to a queue</li>
  <li><strong>Custom domains</strong> — Store custom domain configs in a separate table, use wildcard SSL with cert management</li>
  <li><strong>URL expiration</strong> — Use a background job to clean up expired URLs; don't block writes with TTL checks</li>
</ul>
    `,
  },
};

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────
const BlogPost = ({ slug }: { slug: string }) => {
  const blog = blogContent[slug];
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <BookOpen className="w-12 h-12 text-muted-foreground opacity-30" />
        <h1 className="text-2xl font-bold">Article Not Found</h1>
        <Link
          href="/blog"
          className="text-sm font-bold text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-24">
      <main className="max-w-3xl mx-auto px-6">
        {/* Back */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-10">
          <Link
            href="/blog"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-bold uppercase tracking-widest text-xs"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
        </motion.div>

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-10"
        >
          {/* Category + meta */}
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border border-border text-muted-foreground">
              {blog.category}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Calendar className="w-3.5 h-3.5" /> {blog.date}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock className="w-3.5 h-3.5" /> {blog.readTime}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">{blog.title}</h1>

          {/* Author */}
          <div className="flex items-center gap-4 py-5 border-y border-border">
            <div className="w-10 h-10 rounded-full bg-zinc-500/20 border border-border flex items-center justify-center text-sm font-bold">
              {blog.author.avatar}
            </div>
            <div>
              <p className="text-sm font-bold">{blog.author.name}</p>
              <p className="text-xs text-muted-foreground">{blog.author.role}</p>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="p-2 rounded-xl border border-border hover:bg-zinc-500/10 text-muted-foreground hover:text-foreground transition-all"
                title="Copy link"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
              <button
                className="p-2 rounded-xl border border-border hover:bg-zinc-500/10 text-muted-foreground hover:text-foreground transition-all"
                title="Share"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.header>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="relative aspect-video rounded-3xl overflow-hidden border border-border mb-12"
        >
          <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
        </motion.div>

        {/* Article Content */}
        <motion.article
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="prose prose-zinc dark:prose-invert prose-lg max-w-none
            prose-headings:font-bold prose-headings:tracking-tight
            prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4
            prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
            prose-h4:text-base prose-h4:mt-6
            prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-5
            prose-pre:rounded-2xl prose-pre:border prose-pre:border-border prose-pre:bg-zinc-900
            prose-code:text-zinc-300 prose-code:bg-zinc-500/15 prose-code:rounded prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm
            prose-ul:text-muted-foreground prose-li:mb-1
            prose-strong:text-foreground"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        {/* Tags */}
        <div className="mt-14 pt-8 border-t border-border">
          <div className="flex flex-wrap items-center gap-2">
            <Tag className="w-4 h-4 text-muted-foreground" />
            {blog.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg bg-zinc-500/8 border border-border text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Footer nav */}
        <div className="mt-12 pt-8 border-t border-border flex items-center justify-between gap-4">
          <Link
            href="/blog"
            className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> All Articles
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-border text-sm font-bold text-muted-foreground hover:text-foreground hover:border-zinc-500/40 transition-all"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" /> Copied!
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4" /> Share
                </>
              )}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BlogPost;
