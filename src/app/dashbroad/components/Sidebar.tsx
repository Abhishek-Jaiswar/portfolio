"use client";

import {
  FolderKanban,
  LayoutDashboard,
  LucideIcon,
  PanelsTopLeft,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  isOpen: boolean;
}

type TSidebarLinks = {
  id: string;
  path: string;
  icon: LucideIcon;
  name: string;
};

const sidebarLinks: TSidebarLinks[] = [
  {
    id: "dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
    name: "Dashboard",
  },
  {
    id: "landing-pages",
    path: "/dashboard/landing-actions",
    icon: PanelsTopLeft,
    name: "Landing Pages",
  },
  {
    id: "projects",
    path: "/dashboard/projects",
    icon: FolderKanban,
    name: "Projects",
  },
];

const Sidebar = ({ isOpen }: Props) => {
  const pathname = usePathname();

  if (!isOpen) return null;

  return (
    <div className="w-full h-full bg-card/30 backdrop-blur-sm">
      <div className="h-14 border-b border-border flex items-center px-4 gap-2">
        <Link
          href="/"
          className="px-3 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold hover:opacity-90 transition shadow-lg text-sm tracking-tighter"
        >
          NDX
        </Link>
        <h1 className="text-lg text-foreground font-bold tracking-tight">Portfolio</h1>
      </div>

      <div className="mt-6 p-4 space-y-2">
        {sidebarLinks.map(({ id, name, path, icon: Icon }) => {
          const active = pathname === path;

          return (
            <Link
              key={id}
              href={path}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 group
                ${active
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                  : "text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
                }
              `}
            >
              <Icon size={18} className={`${active ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground"} transition-colors`} />
              <span className="font-medium">{name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
