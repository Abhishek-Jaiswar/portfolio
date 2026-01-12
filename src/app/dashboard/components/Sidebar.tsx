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
    <div className="w-full h-full">
      <div className="h-13 border-b border-neutral-700 flex items-center px-4 gap-2">
        <Link
          href="/"
          className="w-10 h-10 bg-neutral-800/50 rounded-md flex items-center justify-center text-neutral-100 font-bold hover:bg-neutral-800 transition"
        >
          AB
        </Link>
        <h1 className="text-lg text-neutral-100 font-semibold">Portfolio</h1>
      </div>

      <div className="mt-7 p-4 space-y-3">
        {sidebarLinks.map(({ id, name, path, icon: Icon }) => {
          const active = pathname === path;

          return (
            <Link
              key={id}
              href={path}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-150
                ${
                  active
                    ? "bg-neutral-800/50 text-white"
                    : "text-neutral-400 hover:bg-neutral-800/50 hover:text-white"
                }
              `}
            >
              <Icon size={18} />
              {name}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
