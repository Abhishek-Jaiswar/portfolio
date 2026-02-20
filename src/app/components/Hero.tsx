"use client";

import { motion } from "motion/react";
import { Mail, Github, Linkedin, ArrowRight, MapPin, Sparkles, Terminal } from "lucide-react";

const STATS = [
  { value: "3+", label: "Years Experience" },
  { value: "12+", label: "Projects Shipped" },
  { value: "5+", label: "Open Source" },
  { value: "∞", label: "Cups of Coffee" },
];

const TECH_BADGES = ["Next.js", "Node.js", "React", "Go", "PostgreSQL", "Docker", "TypeScript", "Prisma", "Mongodb"];

const techPills = [
  // Left side
  { x: 14,  y: 68,  w: 100, label: "▶ Next.js",    color: "#e2e8f0", delay: 0,   dy: [-6, 0] },
  { x: 8,   y: 178, w: 96,  label: "▶ React",      color: "#61dafb", delay: 0.6, dy: [6, 0] },
  { x: 14,  y: 290, w: 82,  label: "▶ Go",         color: "#34d399", delay: 0.3, dy: [-5, 0] },
  { x: 8,   y: 400, w: 100, label: "▶ GraphQL",    color: "#e10098", delay: 1.1, dy: [7, 0] },

  // Right side
  { x: 408, y: 68,  w: 100, label: "▶ Docker",     color: "#38bdf8", delay: 0.4,  dy: [-8, 0] },
  { x: 406, y: 178, w: 106, label: "▶ Postgres",   color: "#a78bfa", delay: 0.9,  dy: [5, 0] },
  { x: 408, y: 290, w: 96,  label: "▶ Terraform",  color: "#fbbf24", delay: 0.2,  dy: [-6, 0] },
  { x: 404, y: 400, w: 110, label: "▶ Kubernetes", color: "#f472b6", delay: 1.3,  dy: [8, 0] },

  // Top
  { x: 180, y: 18,  w: 96,  label: "▶ TypeScript", color: "#3b82f6", delay: 0.5,  dy: [-4, 0] },
  // Bottom
  { x: 180, y: 476, w: 96,  label: "▶ Redis",      color: "#ef4444", delay: 0.8,  dy: [5, 0] },

  // Extra
  { x: 390, y: 460, w: 110, label: "▶ Vercel CI",  color: "#fff",    delay: 1.5,  dy: [-5, 0] },
  { x: 20,  y: 460, w: 104, label: "▶ Prisma",     color: "#818cf8", delay: 1.0,  dy: [4, 0] },
];

const HeroSVG = () => (
  <div className="relative w-full h-full flex items-center justify-center select-none pointer-events-none">
    <svg
      viewBox="0 0 520 520"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-[520px]"
    >
      <defs>
        {/* Radial glows */}
        <radialGradient id="bgGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#7c3aed" stopOpacity="0.18" />
          <stop offset="60%"  stopColor="#2563eb" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#0f172a"  stopOpacity="0" />
        </radialGradient>
        <radialGradient id="innerGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#c4b5fd" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#c4b5fd"  stopOpacity="0" />
        </radialGradient>

        {/* Ring gradients */}
        <linearGradient id="ring1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#a78bfa" stopOpacity="0.9" />
          <stop offset="40%"  stopColor="#6366f1" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id="ring2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#34d399" stopOpacity="0.7" />
          <stop offset="50%"  stopColor="#6366f1" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#f472b6" stopOpacity="0.7" />
        </linearGradient>
        <linearGradient id="ring3" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#fbbf24" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#818cf8"  stopOpacity="0.3" />
        </linearGradient>

        {/* Card gradient */}
        <linearGradient id="cardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#1a1035" stopOpacity="0.98" />
          <stop offset="100%" stopColor="#050d1a"  stopOpacity="0.98" />
        </linearGradient>
        <linearGradient id="cardBorder" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#6366f1" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#38bdf8"  stopOpacity="0.3" />
        </linearGradient>
        <linearGradient id="statusBar" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#0c0a1a" />
          <stop offset="100%" stopColor="#070d1a" />
        </linearGradient>

        {/* Glow filter */}
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="softGlow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="pillShadow">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000" floodOpacity="0.5" />
        </filter>
      </defs>

      {/* ── Background atmosphere ─── */}
      <ellipse cx="260" cy="260" rx="240" ry="240" fill="url(#bgGlow)" />
      <ellipse cx="260" cy="260" rx="140" ry="140" fill="url(#innerGlow)" />

      {/* ── Ambient grid dots ─── */}
      {Array.from({ length: 7 }).map((_, row) =>
        Array.from({ length: 7 }).map((_, col) => (
          <motion.circle
            key={`dot-${row}-${col}`}
            cx={52 + col * 70}
            cy={52 + row * 70}
            r="1.2"
            fill="#334155"
            animate={{ opacity: [0.2, 0.65, 0.2] }}
            transition={{
              duration: 2.5 + (row + col) * 0.25,
              repeat: Infinity,
              delay: (row + col) * 0.12,
              ease: "easeInOut",
            }}
          />
        ))
      )}

      {/* ── Outer orbit ring ─── */}
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "260px 260px" }}
      >
        <circle cx="260" cy="260" r="218" stroke="url(#ring1)" strokeWidth="1.2" strokeDasharray="6 18" fill="none" />
        <circle cx="260" cy="42"  r="6"   fill="#a78bfa" filter="url(#softGlow)" />
        <circle cx="478" cy="260" r="4.5" fill="#38bdf8" filter="url(#softGlow)" />
        <circle cx="260" cy="478" r="4"   fill="#6366f1" filter="url(#glow)" />
        <circle cx="42"  cy="260" r="3.5" fill="#c4b5fd" filter="url(#glow)" />
      </motion.g>

      {/* ── Mid orbit ring ─── */}
      <motion.g
        animate={{ rotate: -360 }}
        transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "260px 260px" }}
      >
        <circle cx="260" cy="260" r="163" stroke="url(#ring2)" strokeWidth="1" strokeDasharray="3 22" fill="none" />
        <circle cx="260" cy="97"  r="5"   fill="#34d399" filter="url(#softGlow)" />
        <circle cx="423" cy="260" r="4"   fill="#f472b6" filter="url(#softGlow)" />
        <circle cx="260" cy="423" r="3.5" fill="#fbbf24" filter="url(#glow)" />
        <circle cx="97"  cy="260" r="3"   fill="#818cf8" filter="url(#glow)" />
      </motion.g>

      {/* ── Inner orbit ring ─── */}
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "260px 260px" }}
      >
        <circle cx="260" cy="260" r="108" stroke="url(#ring3)" strokeWidth="0.9" strokeDasharray="3 10" fill="none" />
        <circle cx="260" cy="152" r="3.5" fill="#f472b6" filter="url(#glow)" />
        <circle cx="368" cy="260" r="3"   fill="#fbbf24" filter="url(#glow)" />
        <circle cx="260" cy="368" r="3"   fill="#38bdf8" filter="url(#glow)" />
        <circle cx="152" cy="260" r="2.5" fill="#34d399" filter="url(#glow)" />
      </motion.g>

      {/* ── Tech pills ─── */}
      {techPills.map((p, i) => (
        <motion.g
          key={i}
          animate={{ y: [0, p.dy[0], 0], x: [0, (i % 3) - 1, 0] }}
          transition={{
            duration: 4.2 + i * 0.35,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
        >
          <rect
            x={p.x} y={p.y}
            width={p.w} height={26}
            rx="13"
            fill="#0f0e1a"
            stroke="#1e1b3a"
            strokeWidth="1"
            filter="url(#pillShadow)"
          />
          {/* subtle colored left accent */}
          <rect x={p.x + 1} y={p.y + 1} width="3" height="24" rx="1.5" fill={p.color} fillOpacity="0.5" />
          <text
            x={p.x + p.w / 2 + 3}
            y={p.y + 17}
            textAnchor="middle"
            fill={p.color}
            fontSize="9.5"
            fontFamily="'JetBrains Mono', 'Fira Code', monospace"
            fontWeight="600"
            letterSpacing="0.5"
          >
            {p.label}
          </text>
        </motion.g>
      ))}

      {/* ── Central card ─── */}
      <motion.g
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
      >
        {/* Card glow halo */}
        <rect x="122" y="167" width="276" height="186" rx="24" fill="#6366f1" fillOpacity="0.06" />

        {/* Card border (gradient simulation via two rects) */}
        <rect x="128" y="172" width="264" height="176" rx="22" fill="url(#cardBorder)" />
        <rect x="129.5" y="173.5" width="261" height="173" rx="21" fill="url(#cardGrad)" />

        {/* Window chrome dots */}
        <circle cx="155" cy="199" r="5.5" fill="#ef4444" fillOpacity="0.9" />
        <circle cx="173" cy="199" r="5.5" fill="#f59e0b" fillOpacity="0.9" />
        <circle cx="191" cy="199" r="5.5" fill="#22c55e" fillOpacity="0.9" />

        {/* Title bar label */}
        <text x="260" y="202.5" textAnchor="middle" fill="#334155" fontSize="8" fontFamily="'JetBrains Mono', monospace" letterSpacing="1">
          app.tsx — fullstack
        </text>

        {/* Divider */}
        <line x1="130" y1="211" x2="390" y2="211" stroke="#1e293b" strokeWidth="0.8" />

        {/* Code line 1 */}
        <rect x="148" y="222" width="52" height="7" rx="3.5" fill="#a78bfa" fillOpacity="0.9" />
        <rect x="206" y="222" width="38" height="7" rx="3.5" fill="#475569" fillOpacity="0.5" />
        <rect x="250" y="222" width="28" height="7" rx="3.5" fill="#38bdf8" fillOpacity="0.7" />

        {/* Code line 2 — indent */}
        <rect x="162" y="236" width="40" height="7" rx="3.5" fill="#34d399" fillOpacity="0.85" />
        <rect x="208" y="236" width="60" height="7" rx="3.5" fill="#475569" fillOpacity="0.4" />

        {/* Code line 3 */}
        <rect x="162" y="250" width="28" height="7" rx="3.5" fill="#f472b6" fillOpacity="0.8" />
        <rect x="196" y="250" width="76" height="7" rx="3.5" fill="#475569" fillOpacity="0.35" />

        {/* Code line 4 */}
        <rect x="162" y="264" width="50" height="7" rx="3.5" fill="#38bdf8" fillOpacity="0.8" />
        <rect x="218" y="264" width="32" height="7" rx="3.5" fill="#475569" fillOpacity="0.3" />

        {/* Code line 5 */}
        <rect x="162" y="278" width="36" height="7" rx="3.5" fill="#fbbf24" fillOpacity="0.75" />
        <rect x="204" y="278" width="54" height="7" rx="3.5" fill="#475569" fillOpacity="0.3" />

        {/* Code line 6 */}
        <rect x="148" y="292" width="34" height="7" rx="3.5" fill="#a78bfa" fillOpacity="0.9" />

        {/* Blinking cursor */}
        <motion.rect
          x="187" y="291" width="2.5" height="9" rx="1.2" fill="#a78bfa"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
        />

        {/* Status bar */}
        <rect x="129.5" y="314" width="261" height="32" rx="0" fill="url(#statusBar)" />
        <rect x="129.5" y="335" width="261" height="11" rx="0" fill="url(#statusBar)" />

        {/* Status bar bottom border radius fix */}
        <rect x="129.5" y="336" width="261" height="10" rx="0" fill="#07090f" />
        <rect x="129.5" y="328" width="261" height="18" rx="0" fill="#07090f" />

        {/* bottom radius */}
        <rect x="129.5" y="328" width="261" height="18" rx="0" fill="#07090f" />
        <rect x="129.5" y="334" width="261" height="13" rx="0" fill="#07090f" />

        {/* Fake status bar - clean bottom */}
        <rect x="130" y="313" width="260" height="35" rx="0" fill="#070b14" />
        <rect x="130" y="334" width="260" height="14" rx="0" fill="#070b14" />
        {/* Bottom card corners — rounded via the outer card */}

        <text x="148" y="329" fill="#22c55e" fontSize="8.5" fontFamily="'JetBrains Mono', monospace">✓ ready in 214ms</text>
        <text x="270" y="329" fill="#475569" fontSize="8.5" fontFamily="'JetBrains Mono', monospace">localhost:3000</text>

        {/* pulsing ready dot */}
        <motion.circle
          cx="372" cy="326" r="3.5" fill="#22c55e"
          animate={{ opacity: [1, 0.3, 1], r: [3.5, 5, 3.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <circle cx="372" cy="326" r="3.5" fill="#22c55e" />
      </motion.g>

      {/* ── Floating metric badge — Perf Score ─── */}
      <motion.g
        animate={{ y: [0, -7, 0], x: [0, 3, 0] }}
        transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut", delay: 1.4 }}
      >
        <rect x="345" y="186" width="100" height="52" rx="14" fill="#080d1a" stroke="#1e2a45" strokeWidth="1" filter="url(#pillShadow)" />
        <text x="364" y="203" fill="#475569" fontSize="7.5" fontFamily="'JetBrains Mono', monospace" letterSpacing="1">PERF</text>
        <text x="362" y="224" fill="#22c55e" fontSize="18" fontFamily="'JetBrains Mono', monospace" fontWeight="800">98</text>
        <motion.circle
          cx="423" cy="213" r="12"
          stroke="#22c55e" strokeWidth="1.5" fill="none" strokeOpacity="0.3"
          animate={{ r: [12, 15, 12], strokeOpacity: [0.3, 0.05, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <circle cx="423" cy="213" r="5" fill="#22c55e" fillOpacity="0.7" />
      </motion.g>

      {/* ── Floating metric badge — Uptime ─── */}
      <motion.g
        animate={{ y: [0, 8, 0], x: [0, -3, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
      >
        <rect x="74" y="280" width="100" height="52" rx="14" fill="#080d1a" stroke="#1e2a45" strokeWidth="1" filter="url(#pillShadow)" />
        <text x="93" y="297" fill="#475569" fontSize="7.5" fontFamily="'JetBrains Mono', monospace" letterSpacing="1">UPTIME</text>
        <text x="91" y="320" fill="#a78bfa" fontSize="17" fontFamily="'JetBrains Mono', monospace" fontWeight="800">99.9%</text>
      </motion.g>

      {/* ── Floating metric badge — Deploy ─── */}
      <motion.g
        animate={{ y: [0, -5, 0], x: [0, -2, 0] }}
        transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      >
        <rect x="76" y="188" width="100" height="52" rx="14" fill="#080d1a" stroke="#1e2a45" strokeWidth="1" filter="url(#pillShadow)" />
        <text x="93" y="205" fill="#475569" fontSize="7.5" fontFamily="'JetBrains Mono', monospace" letterSpacing="1">DEPLOY</text>
        <text x="91" y="228" fill="#38bdf8" fontSize="13" fontFamily="'JetBrains Mono', monospace" fontWeight="800">✓ LIVE</text>
      </motion.g>

      {/* ── Floating metric badge — Latency ─── */}
      <motion.g
        animate={{ y: [0, 6, 0], x: [0, 2, 0] }}
        transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut", delay: 1.7 }}
      >
        <rect x="345" y="274" width="100" height="52" rx="14" fill="#080d1a" stroke="#1e2a45" strokeWidth="1" filter="url(#pillShadow)" />
        <text x="362" y="291" fill="#475569" fontSize="7.5" fontFamily="'JetBrains Mono', monospace" letterSpacing="1">LATENCY</text>
        <text x="360" y="314" fill="#fbbf24" fontSize="16" fontFamily="'JetBrains Mono', monospace" fontWeight="800">12ms</text>
      </motion.g>
    </svg>
  </div>
);

// ─── Component ─────────────────────────────────────────────────────────────
const Hero = () => {
  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center py-2 md:py-2 overflow-hidden px-5">
      {/* Background glow blobs */}
      <div className="absolute top-[-15%] left-[-5%] w-[40%] h-[40%] bg-violet-500/5 dark:bg-violet-500/8 rounded-full blur-[140px] -z-10 animate-float" />
      <div className="absolute bottom-[5%] right-[-5%] w-[30%] h-[30%] bg-sky-500/5 dark:bg-sky-500/6 rounded-full blur-[120px] -z-10" />

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-12 items-center">

        {/* ── Left: Text content ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-7"
        >
          {/* Status badges */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex flex-wrap items-center gap-3"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-card/50 backdrop-blur-sm text-xs font-medium text-muted-foreground">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              Available for opportunities
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border/50 bg-card/30 text-xs font-medium text-muted-foreground">
              <MapPin className="w-3 h-3" /> Mumbai, India
            </div>
          </motion.div>

          {/* Heading */}
          <div className="space-y-1">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground"
            >
              <span className="inline-block h-px w-8 bg-border" />
              Full-Stack Developer
              <span className="inline-block h-px w-8 bg-border" />
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mt-4"
            >
              Building{" "}
              <span className="text-gradient">digital</span>
              <br />
              <span className="text-gradient">experiences</span>
              <br />
              that matter.
            </motion.h1>
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-base md:text-lg text-muted-foreground max-w-lg leading-relaxed"
          >
            I&apos;m{" "}
            <span className="text-foreground font-semibold">Abhishek Jaiswar</span>, a Full-Stack
            Developer based in Mumbai — building scalable systems with a focus on performance and
            beautiful interfaces.
          </motion.p>

          {/* Tech badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-2"
          >
            {TECH_BADGES.map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.05 }}
                className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg bg-zinc-500/8 border border-border/60 text-muted-foreground hover:text-foreground hover:bg-zinc-500/15 transition-all cursor-default"
              >
                <Terminal className="w-3 h-3" />
                {tech}
              </motion.span>
            ))}
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-wrap gap-4 pt-1"
          >
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href="#projects"
              className="group px-7 py-3.5 bg-foreground text-background rounded-full font-bold flex items-center gap-2 text-sm shadow-lg hover:opacity-90 transition-all"
            >
              <Sparkles className="w-4 h-4" />
              View My Work
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href="#contact"
              className="px-7 py-3.5 border border-border bg-card/30 backdrop-blur-sm hover:bg-card/60 rounded-full font-bold text-sm transition-all"
            >
              Get in touch
            </motion.a>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.85 }}
            className="flex gap-6 pt-4 items-center border-t border-border/40"
          >
            <p className="text-xs uppercase tracking-widest text-muted-foreground font-bold hidden sm:block">
              Find me
            </p>
            <div className="flex gap-3">
              {[
                { icon: Github, href: "#", name: "GitHub" },
                { icon: Linkedin, href: "#", name: "LinkedIn" },
                { icon: Mail, href: "mailto:hi@abhishekjaiswar.dev", name: "Email" },
              ].map((social, i) => (
                <motion.a
                  key={social.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 + i * 0.1 }}
                  href={social.href}
                  className="p-2.5 rounded-xl border border-border/50 text-muted-foreground hover:text-foreground hover:border-zinc-500/40 hover:bg-zinc-500/10 transition-all"
                  aria-label={social.name}
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* ── Right: Animated SVG ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="hidden lg:flex items-center justify-center h-[520px]"
        >
          <HeroSVG />
        </motion.div>
      </div>

      {/* Stats row */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.7 }}
        className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4"
      >
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 + i * 0.08 }}
            className="p-5 rounded-3xl border border-border/60 bg-card/10 backdrop-blur-sm text-center hover:border-zinc-500/30 transition-all group cursor-default"
          >
            <p className="text-2xl font-black mb-1">{stat.value}</p>
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Hero;
