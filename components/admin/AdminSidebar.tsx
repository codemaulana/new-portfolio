"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  FolderGit2,
  FileText,
  Sparkles,
  History,
  Inbox,
  Image as ImageIcon,
  Settings,
  MessageSquare,
  ExternalLink,
  LogOut,
} from "lucide-react";

const ADMIN_NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/projects", label: "Projects", icon: FolderGit2 },
  { href: "/admin/blog", label: "Articles & Blog", icon: FileText },
  { href: "/admin/comments", label: "Chat Comments", icon: MessageSquare },
  { href: "/admin/skills", label: "Skills & Stack", icon: Sparkles },
  { href: "/admin/timeline", label: "Timeline & Career", icon: History },
  { href: "/admin/messages", label: "Messages", icon: Inbox },
  { href: "/admin/media", label: "Media Library", icon: ImageIcon },
  { href: "/admin/settings", label: "Site Settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-border bg-surface/60 flex flex-col min-h-screen">
      <div className="h-16 px-6 border-b border-border flex items-center justify-between">
        <Link href="/admin" className="flex items-center gap-2 font-sans text-lg font-bold">
          <span className="h-7 w-7 rounded-md bg-foreground text-background flex items-center justify-center text-xs font-mono font-bold">
            DA
          </span>
          <span>Atelier Admin</span>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {ADMIN_NAV.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-accent text-accent-foreground shadow-xs"
                  : "text-muted-foreground hover:bg-background hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3.5 py-2 rounded-lg text-xs font-medium text-muted-foreground hover:bg-background hover:text-foreground transition-colors"
        >
          <span>View Public Site</span>
          <ExternalLink className="h-3.5 w-3.5" />
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="w-full flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
        >
          <LogOut className="h-3.5 w-3.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
