import Link from "next/link";
import { getCachedSiteSettings, getCachedPublishedPosts } from "@/lib/cache-queries";
import { TypewriterHeading } from "@/components/home/TypewriterHeading";
import { LatestArticlesSection } from "@/components/home/LatestArticlesSection";
import { GithubDashboardSection } from "@/components/home/GithubDashboardSection";
import {
  Layers,
  Cpu,
  Smartphone,
  ArrowRight,
  Sparkles,
  Mail,
  CheckCircle2,
} from "lucide-react";

export const revalidate = 60;

export default async function HomePage() {
  const [settings, posts] = await Promise.all([
    getCachedSiteSettings(),
    getCachedPublishedPosts(10),
  ]);

  const ownerName = settings?.ownerName || "Muhammad Nur Maulana";
  const bio =
    settings?.heroHeadline ||
    "Full stack software engineer focused on building fast web apps and reliable mobile experiences. I work across TypeScript, Next.js, Laravel, Go, and Flutter. I care about clean architecture, snappy page loads, and thoughtful interaction design.";

  return (
    <div className="max-w-4xl mx-auto space-y-12 sm:space-y-16 pb-20 px-4 sm:px-6">
      <section className="space-y-6 pt-2 sm:pt-6">
        <TypewriterHeading ownerName={ownerName} />

        <p className="text-sm sm:text-base text-muted-foreground font-light leading-relaxed">
          {bio}
        </p>

        <div className="pt-2 border-t border-border/70" />
      </section>

      <LatestArticlesSection posts={posts} />

      <section className="space-y-5 pt-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-foreground font-semibold text-lg">
            <Sparkles className="h-4 w-4 text-accent" />
            <span>Services</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Here is what I build and ship:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl border border-border/80 bg-surface/40 hover:bg-surface/80 hover:border-accent/40 transition-all duration-300 space-y-2 shadow-2xs">
            <div className="h-10 w-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Layers className="h-5 w-5" />
            </div>
            <h3 className="font-sans font-bold text-foreground text-base">
              Web Development
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Fast modern web apps built with Next.js 16, React 19, TypeScript, and Tailwind CSS.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-border/80 bg-surface/40 hover:bg-surface/80 hover:border-accent/40 transition-all duration-300 space-y-2 shadow-2xs">
            <div className="h-10 w-10 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center">
              <Cpu className="h-5 w-5" />
            </div>
            <h3 className="font-sans font-bold text-foreground text-base">
              Backend &amp; API Systems
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Clean domain logic and atomic database workflows built with Laravel 11, PostgreSQL, Redis, and clean architecture.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-border/80 bg-surface/40 hover:bg-surface/80 hover:border-accent/40 transition-all duration-300 space-y-2 shadow-2xs">
            <div className="h-10 w-10 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center">
              <Smartphone className="h-5 w-5" />
            </div>
            <h3 className="font-sans font-bold text-foreground text-base">
              Mobile Applications
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Fluid 60 FPS cross-platform mobile apps built with Flutter, Riverpod, and offline-first SQLite synchronization.
            </p>
          </div>
        </div>
      </section>

      <GithubDashboardSection />

      <section className="p-8 sm:p-10 rounded-3xl border border-border/80 bg-surface/40 backdrop-blur-md text-center space-y-4 shadow-sm">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/15 text-accent text-xs font-mono uppercase tracking-wider font-semibold">
          <Mail className="h-3.5 w-3.5" />
          <span>Let&apos;s Connect</span>
        </div>

        <h2 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-foreground max-w-lg mx-auto">
          Have a project in mind or looking to hire?
        </h2>

        <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
          I&apos;m available for freelance work, software engineering contracts, and full-time developer roles.
        </p>

        <div className="pt-2">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground text-background text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-all duration-200 shadow-xs"
          >
            <span>Send Me a Message</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
