"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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

const navItems = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/#projects" },
];

const Navbar = () => {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (pathname?.startsWith("/dashboard")) {
    return null;
  }

  return (
    <nav className="sticky top-0 left-0 w-full z-50 flex items-center overflow-hidden md:max-w-7xl px-4 mx-auto py-2 backdrop-blur-2xl">
      <div className="flex items-center gap-8 w-full justify-between">
        <div className="flex items-center gap-6">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div
                className={
                  "font-bold text-xl tracking-tighter hover:bg-transparent p-0 flex items-center gap-1 group"
                }
              >
                <span className="text-foreground font-bold">NDX</span>
                <ChevronDown className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-all group-data-[state=open]:rotate-180" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="w-56 p-2 rounded-3xl border-border bg-background/95 backdrop-blur-sm"
            >
              <DropdownMenuItem asChild>
                <Link
                  href="/blog"
                  className="flex items-center gap-2 p-3 rounded-xl cursor-pointer"
                >
                  <BookOpen className="w-4 h-4" />
                  <div className="flex flex-col">
                    <span className="font-medium">Blogs</span>
                    <span className="text-[10px] text-muted-foreground">
                      Tech insights & articles
                    </span>
                  </div>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href="/case-studies"
                  className="flex items-center gap-2 p-3 rounded-xl cursor-pointer"
                >
                  <Layout className="w-4 h-4" />
                  <div className="flex flex-col">
                    <span className="font-medium">Case Studies</span>
                    <span className="text-[10px] text-muted-foreground">
                      In-depth project analysis
                    </span>
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
                    <div className="absolute inset-0 bg-primary rounded-full -z-10" />
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
            {mounted &&
              (theme === "dark" ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              ))}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
