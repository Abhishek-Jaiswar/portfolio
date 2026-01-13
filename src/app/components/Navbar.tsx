"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { cn } from "@/src/lib/utils";

import { Moon, Sun, ChevronDown, BookOpen, Layout } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { Button } from "@/src/components/ui/button";

const navItems = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/#projects" },
];

const Navbar = () => {
    const pathname = usePathname();
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const { scrollY } = useScroll();
    const [scrolled, setScrolled] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        if (latest > 50) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    });

    useEffect(() => setMounted(true), []);

    return (
        <motion.nav
            initial={false}
            animate={{
                top: scrolled ? "1.5rem" : "0",
                width: scrolled ? "auto" : "100%",
                maxWidth: scrolled ? "fit-content" : "1152px", // 6xl = 1152px
                borderRadius: scrolled ? "9999px" : "0px",
                backgroundColor: scrolled ? "rgba(var(--background-rgb), 0.82)" : "rgba(var(--background-rgb), 0)",
                borderWidth: scrolled ? "1px" : "0px",
                borderColor: "var(--border)",
                paddingLeft: scrolled ? "1rem" : "3rem",
                paddingRight: scrolled ? "1rem" : "3rem",
                paddingTop: scrolled ? "0.5rem" : "2rem",
                paddingBottom: scrolled ? "0.5rem" : "2rem",
                boxShadow: scrolled
                    ? "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                    : "0 0px 0px 0px rgba(0, 0, 0, 0)",
                backdropFilter: scrolled ? "blur(24px)" : "blur(0px)",
            }}
            transition={{
                type: "spring",
                stiffness: 260,
                damping: 30,
            }}
            className="fixed left-1/2 -translate-x-1/2 z-50 flex items-center overflow-hidden"
        >
            <div className="flex items-center gap-8 w-full justify-between">
                <div className="flex items-center gap-6">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                className="font-bold text-xl tracking-tighter hover:bg-transparent p-0 flex items-center gap-1 group"
                            >
                                <motion.span
                                    layout
                                    className="text-foreground"
                                >
                                    NDX
                                </motion.span>
                                <ChevronDown className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-all group-data-[state=open]:rotate-180" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            align="start"
                            className="w-56 p-2 rounded-[1.5rem] border-border bg-background/95 backdrop-blur-sm"
                        >
                            <DropdownMenuItem asChild>
                                <Link href="/blog" className="flex items-center gap-2 p-3 rounded-xl cursor-pointer">
                                    <BookOpen className="w-4 h-4" />
                                    <div className="flex flex-col">
                                        <span className="font-medium">Blogs</span>
                                        <span className="text-[10px] text-muted-foreground">Tech insights & articles</span>
                                    </div>
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href="/case-studies" className="flex items-center gap-2 p-3 rounded-xl cursor-pointer">
                                    <Layout className="w-4 h-4" />
                                    <div className="flex flex-col">
                                        <span className="font-medium">Case Studies</span>
                                        <span className="text-[10px] text-muted-foreground">In-depth project analysis</span>
                                    </div>
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <ul className="hidden md:flex items-center gap-1">
                        {navItems.map((item) => (
                            <li key={item.name}>
                                <Link
                                    href={item.href}
                                    className={cn(
                                        "px-4 py-2 rounded-full text-sm font-medium transition-all relative block",
                                        pathname === item.href
                                            ? "text-primary-foreground"
                                            : "text-muted-foreground hover:text-foreground"
                                    )}
                                >
                                    {pathname === item.href && (
                                        <motion.div
                                            layoutId="nav-pill"
                                            className="absolute inset-0 bg-primary rounded-full -z-10"
                                            transition={{ type: "spring", duration: 0.6 }}
                                        />
                                    )}
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        className="p-2 rounded-full hover:bg-zinc-500/10 text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="Toggle theme"
                    >
                        {mounted && (theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />)}
                    </button>
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;
