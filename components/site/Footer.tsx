"use client";

import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import { useEffect, useState } from "react";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export function Footer() {
  const [wibTime, setWibTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeStr = new Intl.DateTimeFormat("id-ID", {
        timeZone: "Asia/Jakarta",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(now);
      setWibTime(`${timeStr} WIB`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="border-t border-border bg-surface/50 mt-auto">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                Available for New Projects &amp; Roles
              </span>
            </div>
            <h3 className="font-sans text-2xl md:text-3xl font-bold tracking-tight text-foreground">
              Muhammad Nur Maulana
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
              Full stack software engineer focused on building fast web apps in Next.js and Go, reliable backends in Laravel, and fluid mobile apps in Flutter.
            </p>
            {wibTime && (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-background/80 text-xs font-mono text-muted-foreground">
                <span>📍 Jakarta, ID</span>
                <span className="text-border">•</span>
                <span>{wibTime}</span>
              </div>
            )}
          </div>

          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm font-medium">
              <li>
                <Link href="/" className="hover:text-accent transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-accent transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-accent transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/roadmap" className="hover:text-accent transition-colors">
                  Roadmap
                </Link>
              </li>
              <li>
                <Link href="/play" className="hover:text-accent transition-colors">
                  Interactive Corner
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-accent transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
              Connect
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://github.com/codemaulana"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 text-foreground hover:text-accent transition-colors"
                >
                  <GithubIcon className="h-4 w-4 text-muted-foreground group-hover:text-accent" />
                  <span>GitHub</span>
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/muhammad-nur-maulana-a13a92290"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 text-foreground hover:text-accent transition-colors"
                >
                  <LinkedinIcon className="h-4 w-4 text-muted-foreground group-hover:text-accent" />
                  <span>LinkedIn</span>
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/ctizz4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 text-foreground hover:text-accent transition-colors"
                >
                  <InstagramIcon className="h-4 w-4 text-muted-foreground group-hover:text-accent" />
                  <span>Instagram</span>
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </li>
              <li>
                <a
                  href="mailto:muhammadnrmaulana@gmail.com"
                  className="group inline-flex items-center gap-2 text-foreground hover:text-accent transition-colors"
                >
                  <Mail className="h-4 w-4 text-muted-foreground group-hover:text-accent" />
                  <span>muhammadnrmaulana@gmail.com</span>
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/80 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Muhammad Nur Maulana.</p>
          <div className="flex items-center gap-4">
            <span>Next.js 16 • PostgreSQL • TypeScript • Prisma ORM</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
