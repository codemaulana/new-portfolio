"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Home,
  Sparkles,
  PenLine,
  FolderGit2,
  Milestone,
  Gamepad2,
  Send,
  LayoutDashboard,
  MessageSquare,
  Moon,
  Sun,
  Menu,
  X,
  Heart,
} from "lucide-react";

interface SidebarNavProps {
  ownerName?: string;
  avatarUrl?: string | null;
  handle?: string;
}

// Scalloped 12-point verified badge SVG with checkmark inside
function VerifiedBadge({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      className={cn("inline-block text-sky-500 fill-current shrink-0", className)}
      viewBox="0 0 24 24"
      aria-label="Verified"
    >
      <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.79-4-4-4-.495 0-.965.084-1.4.238C14.55 2.475 13.18 1.6 11.6 1.6c-1.58 0-2.95.875-3.6 2.148-.435-.154-.905-.238-1.4-.238-2.21 0-4 1.79-4 4 0 .495.084.965.238 1.4C1.575 9.55.7 10.92.7 12.5c0 1.58.875 2.95 2.148 3.6-.154.435-.238.905-.238 1.4 0 2.21 1.79 4 4 4 .495 0 .965-.084 1.4-.238 1.05 1.273 2.42 2.148 4 2.148 1.58 0 2.95-.875 3.6-2.148.435.154.905.238 1.4.238 2.21 0 4-1.79 4-4 0-.495-.084-.965-.238-1.4 1.273-1.05 2.148-2.42 2.148-4z" />
      <path
        d="M10.2 16.2l-3.5-3.5 1.4-1.4 2.1 2.1 5.6-5.6 1.4 1.4-7 7z"
        fill="#ffffff"
      />
    </svg>
  );
}

const SIDEBAR_ITEMS = [
  { label: "Home", href: "/", icon: Home },
  { label: "About", href: "/about", icon: Sparkles },
  { label: "Projects", href: "/projects", icon: FolderGit2 },
  { label: "Blog", href: "/blog", icon: PenLine },
  { label: "Chat Room", href: "/chat", icon: MessageSquare },
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Roadmap", href: "/roadmap", icon: Milestone },
  { label: "Game Corner", href: "/play", icon: Gamepad2 },
  { label: "Contact", href: "/contact", icon: Send },
];

export function SidebarNav({
  ownerName = "Muhammad Nur Maulana",
  avatarUrl,
  handle = "@codemaulana",
}: SidebarNavProps) {
  const pathname = usePathname();
  const [isHovered, setIsHovered] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const leaveTimerRef = useRef<NodeJS.Timeout | null>(null);

  const fallbackAvatar = "/profile-avatar.png";
  const displayAvatar =
    avatarUrl && !avatarUrl.includes("unsplash") && !avatarUrl.includes("foto.jpeg")
      ? avatarUrl
      : fallbackAvatar;

  // Initialize theme from system preference or saved choice
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Sync React state directly with DOM class applied synchronously by <head> script
    const isDomDark = document.documentElement.classList.contains("dark");
    setIsDark(isDomDark);

    // Listen to live OS theme changes (Android/iOS dark mode toggle or Windows night mode)
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      const savedTheme = localStorage.getItem("theme");
      // If user hasn't locked a manual override, follow OS automatically
      if (!savedTheme) {
        if (e.matches) {
          document.documentElement.classList.add("dark");
          document.documentElement.classList.remove("light");
          document.documentElement.style.colorScheme = "dark";
          setIsDark(true);
        } else {
          document.documentElement.classList.remove("dark");
          document.documentElement.classList.add("light");
          document.documentElement.style.colorScheme = "light";
          setIsDark(false);
        }
      }
    };

    mql.addEventListener("change", handleSystemThemeChange);
    return () => mql.removeEventListener("change", handleSystemThemeChange);
  }, []);

  const toggleTheme = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      document.documentElement.style.colorScheme = "dark";
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
      document.documentElement.style.colorScheme = "light";
      localStorage.setItem("theme", "light");
    }
  };

  const handleMouseEnter = () => {
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = null;
    }
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    // Graceful 120ms debounce so rapid mouse movements remain buttery smooth without flickering
    leaveTimerRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 120);
  };

  const isItemActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/#")) return pathname === "/" && typeof window !== "undefined" && window.location.hash === href.replace("/", "");
    return pathname.startsWith(href);
  };

  return (
    <>
      <aside
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={cn(
          "hidden md:flex fixed top-0 left-0 bottom-0 z-50 flex-col justify-between py-5 bg-background/95 backdrop-blur-2xl border-r border-border/80 transition-[width,box-shadow,border-color] duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] select-none will-change-[width]",
          isHovered
            ? "w-65 shadow-2xl border-border"
            : "w-18 shadow-xs"
        )}
        aria-label="Sidebar Navigation"
      >
        <div className="w-full px-3">
          <div
            className={cn(
              "flex items-center justify-between transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden",
              isHovered
                ? "max-h-10 opacity-100 pb-2 translate-y-0"
                : "max-h-0 opacity-0 pb-0 -translate-y-2 pointer-events-none"
            )}
          >
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-border/80 bg-surface/80 text-[11px] font-mono text-foreground font-medium shadow-2xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>Hire me.</span>
            </div>

            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-1.5 rounded-full border border-border/70 bg-surface hover:bg-surface/80 text-muted-foreground hover:text-foreground transition-all duration-200"
            >
              {isDark ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
            </button>
          </div>

          <div className="flex flex-col items-center text-center">
            <div
              className={cn(
                "relative rounded-full border-2 border-border/80 overflow-hidden shadow-xs transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)]",
                isHovered
                  ? "h-16 w-16 shadow-md mt-1 mb-2 border-accent/40"
                  : "h-11 w-11 hover:border-accent"
              )}
            >
              <Image
                src={displayAvatar}
                alt={ownerName}
                fill
                sizes="(max-width: 768px) 44px, 68px"
                className="object-cover"
                priority
              />
            </div>

            <div
              className={cn(
                "transition-all duration-250 ease-out overflow-hidden",
                !isHovered ? "max-h-10 opacity-100 pt-2" : "max-h-0 opacity-0 pt-0 pointer-events-none"
              )}
            >
              <button
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="h-8 w-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-surface border border-transparent hover:border-border/60 transition-all duration-200"
              >
                {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
            </div>

            <div
              className={cn(
                "space-y-0.5 transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden w-full",
                isHovered
                  ? "max-h-16 opacity-100 translate-y-0 pb-3 border-b border-border/60"
                  : "max-h-0 opacity-0 -translate-y-2 pointer-events-none"
              )}
            >
              <div className="flex items-center justify-center gap-1 font-sans text-base font-bold text-foreground tracking-tight whitespace-nowrap">
                <span>{ownerName}</span>
                <VerifiedBadge className="h-4 w-4" />
              </div>
              <div className="text-xs text-muted-foreground font-mono font-light">
                {handle}
              </div>
            </div>
          </div>
        </div>

        <nav className="w-full flex-1 py-4 flex flex-col gap-1 overflow-x-hidden overflow-y-auto scrollbar-none px-2">
          {SIDEBAR_ITEMS.map((item, idx) => {
            const active = isItemActive(item.href);
            const Icon = item.icon;

            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "group flex items-center h-10 rounded-xl transition-all duration-200 relative overflow-hidden",
                  active
                    ? "bg-accent/15 text-accent font-semibold shadow-2xs"
                    : "text-muted-foreground hover:text-foreground hover:bg-surface/80"
                )}
                title={!isHovered ? item.label : undefined}
              >
                <div className="w-14 h-full flex items-center justify-center shrink-0">
                  <Icon
                    className={cn(
                      "h-4.75 w-4.75 transition-transform duration-250 ease-out group-hover:scale-110",
                      active && "text-accent"
                    )}
                  />
                </div>

                <span
                  className={cn(
                    "whitespace-nowrap transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] text-sm font-medium",
                    isHovered
                      ? "opacity-100 translate-x-0 max-w-45"
                      : "opacity-0 -translate-x-2 max-w-0 overflow-hidden pointer-events-none"
                  )}
                  style={{
                    transitionDelay: isHovered ? `${idx * 18}ms` : "0ms",
                  }}
                >
                  {item.label}
                </span>

                {active && (
                  <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-accent" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="w-full px-4 pt-2 border-t border-border/50">
          <div
            className={cn(
              "flex items-center transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)]",
              isHovered ? "justify-between" : "justify-center"
            )}
          >
            <div className="h-8 w-8 flex items-center justify-center text-rose-500 hover:scale-115 transition-transform duration-200 cursor-pointer">
              <Heart className="h-4 w-4 fill-rose-500/20" />
            </div>

            <span
              className={cn(
                "text-[10px] font-mono text-muted-foreground/80 overflow-hidden whitespace-nowrap transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)]",
                isHovered
                  ? "opacity-100 translate-x-0 max-w-35"
                  : "opacity-0 -translate-x-2 max-w-0 pointer-events-none"
              )}
            >
              Codemaulana 2026
            </span>
          </div>
        </div>
      </aside>

      <header className="md:hidden fixed top-0 left-0 right-0 h-16 z-40 bg-background/90 backdrop-blur-md border-b border-border/80 px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="relative h-8 w-8 rounded-full border border-border overflow-hidden">
            <Image
              src={displayAvatar}
              alt={ownerName}
              fill
              sizes="32px"
              className="object-cover"
            />
          </div>
          <div className="flex items-center gap-1 font-sans font-bold text-foreground text-sm">
            <span>{ownerName.split(" ")[0]}</span>
            <VerifiedBadge className="h-3.5 w-3.5" />
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-full border border-border bg-surface text-muted-foreground hover:text-foreground"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            className="p-2 rounded-full border border-border bg-surface text-foreground"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50">
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
          />

          <div className="fixed top-0 left-0 bottom-0 w-70 max-w-[85vw] bg-background border-r border-border p-5 z-50 flex flex-col justify-between shadow-2xl overflow-y-auto animate-in slide-in-from-left duration-300">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-border/80 bg-surface text-[11px] font-mono text-foreground font-medium">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <span>Hire me.</span>
                </div>

                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-full border border-border hover:bg-surface text-muted-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="flex flex-col items-center text-center pt-2 pb-4 border-b border-border/60 space-y-2">
                <div className="relative h-18 w-18 rounded-full border-2 border-border/80 overflow-hidden shadow-md">
                  <Image
                    src={displayAvatar}
                    alt={ownerName}
                    fill
                    sizes="72px"
                    className="object-cover"
                  />
                </div>

                <div className="space-y-0.5">
                  <div className="flex items-center justify-center gap-1 font-sans text-base font-bold text-foreground">
                    <span>{ownerName}</span>
                    <VerifiedBadge className="h-4 w-4" />
                  </div>
                  <div className="text-xs text-muted-foreground font-mono">
                    {handle}
                  </div>
                </div>
              </div>

              <nav className="space-y-1 pt-2">
                {SIDEBAR_ITEMS.map((item) => {
                  const active = isItemActive(item.href);
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-sm font-medium",
                        active
                          ? "bg-accent/15 text-accent font-semibold"
                          : "text-muted-foreground hover:text-foreground hover:bg-surface"
                      )}
                    >
                      <Icon className="h-4.5 w-4.5 shrink-0" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="pt-4 border-t border-border/60 flex items-center justify-between text-xs text-muted-foreground font-mono">
              <div className="flex items-center gap-1.5 text-rose-500">
                <Heart className="h-3.5 w-3.5 fill-rose-500/20" />
                <span className="text-[11px] text-muted-foreground">Digital Atelier</span>
              </div>
              <span className="text-[10px]">codemaulana.web.id</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
