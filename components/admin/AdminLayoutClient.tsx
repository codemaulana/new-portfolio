"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { NavigationProgressBar } from "@/components/animations/NavigationProgressBar";
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
  Menu,
  X,
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

export function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const renderNavLinks = (onItemClick?: () => void) => (
    <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
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
            onClick={onItemClick}
            className={cn(
              "flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors",
              isActive
                ? "bg-accent text-accent-foreground shadow-xs"
                : "text-muted-foreground hover:bg-background hover:text-foreground"
            )}
          >
            <Icon className="h-4 w-4 shrink-0" />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className="min-h-screen flex bg-background text-foreground">
      <NavigationProgressBar />
      <aside className="hidden lg:flex w-64 border-r border-border bg-surface/60 flex-col min-h-screen shrink-0">
        <div className="h-16 px-6 border-b border-border flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-2 font-sans text-base font-bold">
            <span className="h-7 w-7 rounded-md bg-foreground text-background flex items-center justify-center text-xs font-mono font-bold">
              DA
            </span>
            <span>Atelier Admin</span>
          </Link>
        </div>

        {renderNavLinks()}

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
            className="w-full flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative w-72 max-w-[85vw] bg-surface border-r border-border flex flex-col h-full shadow-2xl z-10 animate-in slide-in-from-left duration-200">
            <div className="h-16 px-6 border-b border-border flex items-center justify-between">
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 font-sans text-base font-bold"
              >
                <span className="h-7 w-7 rounded-md bg-foreground text-background flex items-center justify-center text-xs font-mono font-bold">
                  DA
                </span>
                <span>Atelier Admin</span>
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-lg border border-border text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {renderNavLinks(() => setMobileMenuOpen(false))}

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
                className="w-full flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col min-h-screen min-w-0 overflow-y-auto">
        <header className="h-16 border-b border-border bg-surface/30 px-4 sm:px-6 lg:px-8 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-lg border border-border bg-surface text-muted-foreground hover:text-foreground cursor-pointer"
              aria-label="Toggle Navigation"
            >
              <Menu className="h-4 w-4" />
            </button>
            <div className="text-xs font-mono text-muted-foreground truncate">
              Digital Atelier Admin
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            <span className="font-medium text-foreground truncate max-w-[130px] sm:max-w-none">
              Muhammad Nur Maulana
            </span>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0">{children}</main>
      </div>
    </div>
  );
}
