"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  ROADMAP_ITEMS,
  RoadmapItem,
} from "./roadmap-data";
import {
  HTMLIcon,
  CSSIcon,
  TailwindIcon,
  JavaScriptIcon,
  TypeScriptIcon,
  ReactIcon,
  NextjsIcon,
  PostgresIcon,
  NodeIcon,
  LaravelIcon,
  GolangIcon,
  DockerIcon,
  RedisIcon,
  LinuxIcon,
  GithubBrandIcon,
  BootstrapIcon,
} from "@/components/about/BrandIcons";
import {
  CheckCircle2,
  Circle,
  ExternalLink,
  BookOpen,
  Search,
  X,
  Sparkles,
  Clock,
  Compass,
  Layers,
  Lightbulb,
  RotateCcw,
  GraduationCap,
  ArrowRight,
} from "lucide-react";

function TechIcon({ icon, className = "h-5 w-5" }: { icon: RoadmapItem["icon"]; className?: string }) {
  switch (icon) {
    case "html":
      return <HTMLIcon className={className} />;
    case "css":
      return <CSSIcon className={className} />;
    case "bootstrap":
      return <BootstrapIcon className={className} />;
    case "tailwind":
      return <TailwindIcon className={className} />;
    case "git":
      return <GithubBrandIcon className={className} />;
    case "javascript":
      return <JavaScriptIcon className={className} />;
    case "typescript":
      return <TypeScriptIcon className={className} />;
    case "react":
      return <ReactIcon className={className} />;
    case "nextjs":
      return <NextjsIcon className={className} />;
    case "sql":
      return <PostgresIcon className={className} />;
    case "nodejs":
      return <NodeIcon className={className} />;
    case "laravel":
      return <LaravelIcon className={className} />;
    case "golang":
      return <GolangIcon className={className} />;
    case "docker":
      return <DockerIcon className={className} />;
    case "redis":
      return <RedisIcon className={className} />;
    case "linux":
      return <LinuxIcon className={className} />;
    case "security":
    case "cicd":
    default:
      return <Layers className={cn(className, "text-sky-500")} />;
  }
}

type StageFilter = "all" | "beginner" | "frontend" | "backend" | "devops";

const STAGES: { key: StageFilter; label: string }[] = [
  { key: "all", label: "All Tracks" },
  { key: "beginner", label: "1. Foundations" },
  { key: "frontend", label: "2. Modern Frontend" },
  { key: "backend", label: "3. Backend & API" },
  { key: "devops", label: "4. DevOps & Cloud" },
];

export function RoadmapClient() {
  const [activeStage, setActiveStage] = useState<StageFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem("codemaulana_roadmap_progress");
      if (saved) {
        setCompletedIds(JSON.parse(saved));
      }
    } catch {
      // Local storage fallback
    }
  }, []);

  const toggleComplete = (id: string) => {
    setCompletedIds((prev) => {
      const updated = prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id];
      try {
        localStorage.setItem("codemaulana_roadmap_progress", JSON.stringify(updated));
      } catch {
        // Local storage fallback
      }
      return updated;
    });
  };

  const resetProgress = () => {
    if (confirm("Reset all your learning progress on this browser?")) {
      setCompletedIds([]);
      try {
        localStorage.removeItem("codemaulana_roadmap_progress");
      } catch {
        // Fallback
      }
    }
  };

  const filteredItems = useMemo(() => {
    return ROADMAP_ITEMS.filter((item) => {
      if (activeStage !== "all" && item.stage !== activeStage) {
        return false;
      }
      if (!searchQuery.trim()) return true;
      const query = searchQuery.toLowerCase();
      return (
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.instructor.toLowerCase().includes(query) ||
        item.topics.some((t) => t.toLowerCase().includes(query))
      );
    });
  }, [activeStage, searchQuery]);

  const stageCounts = useMemo(() => {
    return {
      all: ROADMAP_ITEMS.length,
      beginner: ROADMAP_ITEMS.filter((i) => i.stage === "beginner").length,
      frontend: ROADMAP_ITEMS.filter((i) => i.stage === "frontend").length,
      backend: ROADMAP_ITEMS.filter((i) => i.stage === "backend").length,
      devops: ROADMAP_ITEMS.filter((i) => i.stage === "devops").length,
    };
  }, []);

  const totalItems = ROADMAP_ITEMS.length;
  const completedCount = completedIds.length;
  const progressPercent = Math.round((completedCount / totalItems) * 100);

  return (
    <div className="space-y-8 sm:space-y-10">
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
          <div className="space-y-1.5">
            <h1 className="font-sans text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              Developer Roadmap
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed">
              Recommended learning paths and free course playlists to take you from beginner to fullstack engineer.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 shadow-2xs self-start sm:self-auto shrink-0">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
            <Sparkles className="h-3.5 w-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
            <span className="text-[11px] sm:text-xs font-mono font-medium">100% Free Resources</span>
          </div>
        </div>

        <div className="border-b border-dashed border-border/80 pt-1" />
      </div>

      {mounted && (
        <section className="p-4 sm:p-5 md:p-6 rounded-2xl border border-border/80 bg-surface/50 backdrop-blur-md shadow-2xs space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-accent/15 text-accent flex items-center justify-center font-mono text-xs font-bold shrink-0">
                {progressPercent}%
              </div>
              <div className="min-w-0">
                <div className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
                  Your Learning Progress
                </div>
                <div className="text-xs sm:text-sm font-semibold text-foreground truncate">
                  {completedCount} of {totalItems} modules completed
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-2 pt-1 sm:pt-0 border-t border-border/40 sm:border-t-0">
              <span className="text-[11px] sm:text-xs font-medium px-2.5 py-1 rounded-full bg-surface border border-border text-foreground font-mono">
                {progressPercent === 100
                  ? "Ready for Senior Fullstack"
                  : progressPercent >= 50
                  ? "Fullstack Level Reached"
                  : progressPercent > 0
                  ? "Making Steady Progress"
                  : "Start with Step 1"}
              </span>

              {completedCount > 0 && (
                <button
                  onClick={resetProgress}
                  className="inline-flex items-center gap-1 text-[11px] text-muted-foreground hover:text-red-500 transition-colors px-2 py-1"
                  title="Reset progress"
                >
                  <RotateCcw className="h-3 w-3" />
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>

          <div className="h-2 w-full bg-surface rounded-full overflow-hidden border border-border/60">
            <div
              className="h-full bg-gradient-to-r from-accent via-emerald-500 to-sky-500 transition-all duration-500 ease-out rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </section>
      )}

      <div className="space-y-3.5">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
          {STAGES.map((s) => {
            const count = stageCounts[s.key];
            const isActive = activeStage === s.key;
            return (
              <button
                key={s.key}
                onClick={() => setActiveStage(s.key)}
                className={cn(
                  "inline-flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-3.5 sm:py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap shadow-2xs shrink-0",
                  isActive
                    ? "bg-foreground text-background shadow-xs font-semibold"
                    : "bg-surface/80 hover:bg-surface border border-border/80 text-muted-foreground hover:text-foreground"
                )}
              >
                <span>{s.label}</span>
                <span
                  className={cn(
                    "text-[10px] font-mono px-1.5 py-0.5 rounded-md",
                    isActive
                      ? "bg-background/20 text-background"
                      : "bg-background text-muted-foreground border border-border/60"
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search topics, technologies, or instructors..."
            className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-border bg-surface/50 text-base sm:text-sm placeholder:text-muted-foreground/70 focus:outline-hidden focus:ring-2 focus:ring-accent/40 transition-all duration-200"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      <div className="space-y-3 sm:space-y-3.5">
        {filteredItems.length === 0 ? (
          <div className="p-8 sm:p-12 text-center rounded-2xl border border-dashed border-border bg-surface/20 space-y-3">
            <Compass className="h-8 w-8 text-muted-foreground mx-auto stroke-1" />
            <p className="text-xs sm:text-sm text-muted-foreground">
              No modules matched your search for &quot;{searchQuery}&quot;.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveStage("all");
              }}
              className="text-xs font-mono text-accent hover:underline"
            >
              Reset Search Filter
            </button>
          </div>
        ) : (
          filteredItems.map((item) => {
            const isCompleted = completedIds.includes(item.id);

            return (
              <div
                key={item.id}
                className={cn(
                  "group relative p-4 sm:p-5 rounded-2xl border transition-all duration-200 ease-out",
                  isCompleted
                    ? "border-emerald-500/40 bg-emerald-500/5 dark:bg-emerald-500/10 shadow-2xs"
                    : "border-border/80 bg-surface/40 hover:bg-surface/80 hover:border-accent/40 shadow-2xs hover:shadow-xs"
                )}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 sm:gap-4">
                  <div className="flex items-start gap-3 sm:gap-3.5 min-w-0">
                    <button
                      onClick={() => toggleComplete(item.id)}
                      className={cn(
                        "mt-0.5 p-1 -ml-1 rounded-lg transition-colors shrink-0",
                        isCompleted
                          ? "text-emerald-500 hover:text-emerald-600"
                          : "text-muted-foreground/50 hover:text-foreground"
                      )}
                      title={isCompleted ? "Mark as incomplete" : "Mark as completed"}
                      aria-label={isCompleted ? "Mark incomplete" : "Mark complete"}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="h-5 w-5" />
                      ) : (
                        <Circle className="h-5 w-5" />
                      )}
                    </button>

                    <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl border border-border/80 bg-background flex items-center justify-center shrink-0 shadow-2xs">
                      <TechIcon icon={item.icon} className="h-4 w-4 sm:h-5 sm:w-5" />
                    </div>

                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                        <span className="font-mono text-[11px] sm:text-xs text-muted-foreground font-semibold">
                          #{item.step}
                        </span>
                        <h3
                          className={cn(
                            "font-sans font-bold text-sm sm:text-base md:text-lg tracking-tight transition-colors",
                            isCompleted
                              ? "text-foreground line-through decoration-emerald-500/60"
                              : "text-foreground group-hover:text-accent"
                          )}
                        >
                          {item.title}
                        </h3>

                        <span
                          className={cn(
                            "text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-md uppercase tracking-wider shrink-0",
                            item.language === "ID"
                              ? "bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20"
                              : "bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20"
                          )}
                        >
                          {item.language}
                        </span>

                        <span
                          className={cn(
                            "text-[10px] font-mono px-1.5 py-0.5 rounded-md font-medium shrink-0",
                            item.level === "Beginner" &&
                              "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20",
                            item.level === "Intermediate" &&
                              "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20",
                            item.level === "Advanced" &&
                              "bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20"
                          )}
                        >
                          {item.level}
                        </span>
                      </div>

                      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                        {item.description}
                      </p>

                      <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                        <span className="text-[11px] text-muted-foreground font-mono flex items-center gap-1">
                          <GraduationCap className="h-3 w-3 shrink-0" />
                          <span className="truncate max-w-[160px] sm:max-w-none">{item.instructor}</span>
                        </span>
                        <span className="text-border">•</span>
                        <span className="text-[11px] text-muted-foreground font-mono flex items-center gap-1 shrink-0">
                          <Clock className="h-3 w-3 shrink-0" />
                          <span>{item.estimatedHours}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2 sm:pt-0 sm:self-center shrink-0 w-full sm:w-auto border-t border-border/40 sm:border-t-0">
                    <a
                      href={item.playlistUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2 sm:py-1.5 rounded-xl bg-foreground text-background text-xs font-semibold hover:bg-accent hover:text-accent-foreground transition-all duration-200 shadow-2xs"
                    >
                      <span>Watch Playlist</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>

                    <a
                      href={item.docsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-2 sm:py-1.5 rounded-xl border border-border/80 bg-surface hover:bg-surface/80 text-muted-foreground hover:text-foreground text-xs font-medium transition-all duration-200 shadow-2xs"
                      title="Official Documentation"
                    >
                      <BookOpen className="h-3.5 w-3.5" />
                      <span>Docs</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      <section className="p-6 sm:p-8 rounded-3xl border border-border/80 bg-surface/50 backdrop-blur-md text-center space-y-3.5 shadow-sm">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/15 text-accent text-xs font-mono uppercase tracking-wider font-semibold">
          <Lightbulb className="h-3.5 w-3.5" />
          <span>Need Guidance?</span>
        </div>

        <h2 className="font-sans text-xl sm:text-2xl font-bold tracking-tight text-foreground max-w-lg mx-auto">
          Have questions about this roadmap or want to connect?
        </h2>

        <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
          Feel free to drop me a note or reach out for engineering advice and code reviews.
        </p>

        <div className="pt-1.5">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-foreground text-background text-xs sm:text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-all duration-200 shadow-xs"
          >
            <span>Get in Touch</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
