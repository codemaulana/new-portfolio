"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";

// Inline Github Icon
function GithubIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={cn("fill-current", className)} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

interface GitHubDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface GitHubWeek {
  days: GitHubDay[];
}

interface MonthMarker {
  name: string;
  weekIndex: number;
}

interface GitHubData {
  username: string;
  total: number;
  thisWeek: number;
  bestDay: number;
  average: number;
  weeks: GitHubWeek[];
  months: MonthMarker[];
  isLive: boolean;
}

let githubMemoryCache: GitHubData | null = null;
let githubFetchPromise: Promise<GitHubData | null> | null = null;

export function GithubDashboardSection() {
  const [data, setData] = useState<GitHubData | null>(githubMemoryCache);
  const [hoveredDay, setHoveredDay] = useState<{ date: string; count: number } | null>(null);

  useEffect(() => {
    if (githubMemoryCache) {
      setData(githubMemoryCache);
      return;
    }

    if (!githubFetchPromise) {
      githubFetchPromise = fetch("/api/github")
        .then((res) => res.json())
        .then((json: GitHubData) => {
          githubMemoryCache = json;
          return json;
        })
        .catch((err) => {
          console.error("Could not fetch github dashboard data:", err);
          return null;
        })
        .finally(() => {
          githubFetchPromise = null;
        });
    }

    githubFetchPromise.then((json) => {
      if (json) setData(json);
    });
  }, []);

  const total = data?.total ?? 143;
  const thisWeek = data?.thisWeek ?? 4;
  const bestDay = data?.bestDay ?? 7;
  const average = data?.average ?? 0.4;
  const weeks = data?.weeks ?? [];
  const months = data?.months ?? [];

  return (
    <section className="space-y-8" id="dashboard">
      <div className="space-y-1 pb-4 border-b border-dashed border-border/80">
        <h2 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          Dashboard
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed">
          This is my personal dashboard, built with Next.js API routes deployed as serverless functions.
        </p>
      </div>

      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2 text-foreground font-semibold text-base sm:text-lg">
              <GithubIcon className="h-5 w-5" />
              <span>Contributions</span>
            </div>
            <p className="text-xs text-muted-foreground">
              My public contributions from last year on GitHub.
            </p>
          </div>

          <a
            href="https://github.com/codemaulana"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors group"
          >
            <span>@codemaulana</span>
            <ExternalLink className="h-3 w-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <div className="p-4 rounded-2xl border border-border/80 bg-surface/50 space-y-1 shadow-2xs">
            <div className="text-xs text-muted-foreground font-mono">Total</div>
            <div className="text-2xl sm:text-3xl font-sans font-bold text-emerald-500">
              {total}
            </div>
          </div>

          <div className="p-4 rounded-2xl border border-border/80 bg-surface/50 space-y-1 shadow-2xs">
            <div className="text-xs text-muted-foreground font-mono">This Week</div>
            <div className="text-2xl sm:text-3xl font-sans font-bold text-emerald-500">
              {thisWeek}
            </div>
          </div>

          <div className="p-4 rounded-2xl border border-border/80 bg-surface/50 space-y-1 shadow-2xs">
            <div className="text-xs text-muted-foreground font-mono">Best Day</div>
            <div className="text-2xl sm:text-3xl font-sans font-bold text-emerald-500">
              {bestDay}
            </div>
          </div>

          <div className="p-4 rounded-2xl border border-border/80 bg-surface/50 space-y-1 shadow-2xs">
            <div className="text-xs text-muted-foreground font-mono">Average</div>
            <div className="text-2xl sm:text-3xl font-sans font-bold text-emerald-500 flex items-baseline gap-1">
              <span>{average}</span>
              <span className="text-xs font-normal text-muted-foreground">/ day</span>
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl border border-border/80 bg-surface/30 dark:bg-[#0d1117] backdrop-blur-md shadow-xs space-y-3">
          <div className="flex items-center justify-between text-xs sm:text-sm font-medium text-foreground">
            <span>{total} contributions in the last year</span>
            <span className="text-xs font-mono text-muted-foreground hidden sm:inline">
              {hoveredDay
                ? `${hoveredDay.count} contributions on ${hoveredDay.date}`
                : "Contribution activity"}
            </span>
          </div>

          <div className="overflow-x-auto pb-2 scrollbar-thin">
            <div className="min-w-180 space-y-1.5 select-none pt-1">
              <div className="relative h-4 text-[10px] font-mono text-muted-foreground pl-8">
                {months.map((m, idx) => {
                  const leftPosition = m.weekIndex * 13;
                  return (
                    <span
                      key={`${m.name}-${idx}`}
                      className="absolute"
                      style={{ left: `${leftPosition}px` }}
                    >
                      {m.name}
                    </span>
                  );
                })}
              </div>

              <div className="flex items-start gap-2">
                <div className="flex flex-col gap-[3.5px] text-[9px] font-mono text-muted-foreground/80 pt-px w-6 shrink-0 text-right select-none">
                  <span className="h-2.5 leading-2.5" /> 
                  <span className="h-2.5 leading-2.5">Mon</span>
                  <span className="h-2.5 leading-2.5" /> 
                  <span className="h-2.5 leading-2.5">Wed</span>
                  <span className="h-2.5 leading-2.5" /> 
                  <span className="h-2.5 leading-2.5">Fri</span>
                  <span className="h-2.5 leading-2.5" /> 
                </div>

                <div className="flex gap-0.75">
                  {weeks.map((week, wIdx) => (
                    <div key={wIdx} className="flex flex-col gap-0.75">
                      {week.days.map((day) => {
                        let colorClass = "bg-muted/60 dark:bg-[#161b22]";
                        if (day.level === 1) colorClass = "bg-[#0e4429] dark:bg-[#0e4429]";
                        else if (day.level === 2) colorClass = "bg-[#006d32] dark:bg-[#006d32]";
                        else if (day.level === 3) colorClass = "bg-[#26a641] dark:bg-[#26a641]";
                        else if (day.level === 4) colorClass = "bg-[#39d353] dark:bg-[#39d353] shadow-2xs";

                        return (
                          <div
                            key={day.date}
                            onMouseEnter={() => setHoveredDay({ date: day.date, count: day.count })}
                            onMouseLeave={() => setHoveredDay(null)}
                            className={cn(
                              "w-2.5 h-2.5 rounded-xs transition-all duration-100 cursor-pointer hover:ring-2 hover:ring-emerald-400 hover:scale-125 z-0 hover:z-10",
                              colorClass
                            )}
                            title={`${day.count} contributions on ${day.date}`}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 text-[10px] font-mono text-muted-foreground pl-8">
                <a
                  href="https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/managing-contribution-settings-on-your-profile/why-are-my-contributions-not-showing-up-on-my-profile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors hover:underline"
                >
                  Learn how we count contributions
                </a>

                <div className="flex items-center gap-1.5">
                  <span>Less</span>
                  <span className="w-2.5 h-2.5 rounded-xs bg-muted/60 dark:bg-[#161b22] inline-block" />
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#0e4429] inline-block" />
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#006d32] inline-block" />
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#26a641] inline-block" />
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#39d353] inline-block" />
                  <span>More</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
