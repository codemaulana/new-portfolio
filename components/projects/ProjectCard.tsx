"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  ExternalLink,
  ArrowRight,
  Sparkles,
  Layers,
  Code2,
} from "lucide-react";
import {
  NextjsIcon,
  ReactIcon,
  TypeScriptIcon,
  JavaScriptIcon,
  TailwindIcon,
  LaravelIcon,
  FlutterIcon,
  PostgresIcon,
  PrismaIcon,
  RedisIcon,
  GolangIcon,
  DockerIcon,
  MySQLIcon,
  GithubBrandIcon,
} from "@/components/about/BrandIcons";

export interface ProjectData {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  problem: string;
  solution: string;
  stack: string[];
  category: string;
  featured: boolean;
  order: number;
  published: boolean;
  demoUrl?: string | null;
  repoUrl?: string | null;
  coverImage: string;
  gallery: string[];
  results?: string | null;
}

// Map tech name to its official brand icon component
export function getStackIcon(tech: string) {
  const lower = tech.toLowerCase();
  if (lower.includes("next")) return NextjsIcon;
  if (lower.includes("react")) return ReactIcon;
  if (lower.includes("typescript") || lower === "ts") return TypeScriptIcon;
  if (lower.includes("javascript") || lower === "js") return JavaScriptIcon;
  if (lower.includes("tailwind")) return TailwindIcon;
  if (lower.includes("laravel")) return LaravelIcon;
  if (lower.includes("flutter") || lower.includes("dart")) return FlutterIcon;
  if (lower.includes("postgres")) return PostgresIcon;
  if (lower.includes("prisma")) return PrismaIcon;
  if (lower.includes("redis")) return RedisIcon;
  if (lower.includes("golang") || lower === "go") return GolangIcon;
  if (lower.includes("docker")) return DockerIcon;
  if (lower.includes("mysql") || lower.includes("sqlite")) return MySQLIcon;
  if (lower.includes("git")) return GithubBrandIcon;
  return Code2;
}

interface ProjectCardProps {
  project: ProjectData;
  featuredHero?: boolean;
}

export function ProjectCard({ project, featuredHero = false }: ProjectCardProps) {
  if (featuredHero) {
    return (
      <div className="group relative rounded-3xl border border-border/80 bg-surface/60 hover:bg-surface/90 hover:border-accent/40 transition-all duration-300 shadow-sm p-4 sm:p-6 lg:p-7 flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-8">
        <div className="w-full lg:w-7/12 shrink-0">
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-[#09090C] border border-black/10 dark:border-white/10 shadow-lg shadow-black/8 dark:shadow-black/50 flex items-center justify-center">
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40 select-none">
              <Image
                src={project.coverImage}
                alt=""
                fill
                aria-hidden
                unoptimized={project.coverImage.startsWith("/api/blob")}
                className="object-cover blur-2xl scale-125"
              />
            </div>

            <div className="relative w-full h-full">
              <Image
                src={project.coverImage}
                alt={project.title}
                fill
                unoptimized={project.coverImage.startsWith("/api/blob")}
                sizes="(max-width: 1024px) 100vw, 55vw"
                priority
                className="object-contain group-hover:scale-[1.02] transition-transform duration-500 ease-out"
              />
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-between space-y-5 min-w-0">
          <div className="space-y-4">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/15 text-accent border border-accent/20 text-[11px] font-mono font-semibold uppercase tracking-wider">
                <Sparkles className="h-3 w-3" />
                <span>Featured Project</span>
              </span>
              <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-surface border border-border/70 text-foreground text-[10px] font-mono uppercase tracking-wider">
                {project.category}
              </span>
            </div>

            <div className="space-y-2">
              <Link
                href={`/projects/${project.slug}`}
                className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-foreground hover:text-accent transition-colors block cursor-pointer"
              >
                {project.title}
              </Link>
              <p className="text-sm text-muted-foreground font-light leading-relaxed line-clamp-3">
                {project.tagline}
              </p>
            </div>

            {project.results && (
              <div className="p-3 rounded-xl bg-surface/80 border border-border/60 text-xs font-mono text-emerald-600 dark:text-emerald-400">
                <span className="font-semibold">Impact: </span>
                <span className="text-foreground/90 font-sans">{project.results}</span>
              </div>
            )}

            <div className="flex flex-wrap gap-2 pt-1">
              {project.stack.map((tech) => {
                const Icon = getStackIcon(tech);
                return (
                  <span
                    key={tech}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface/80 border border-border/70 text-[11px] font-mono text-foreground font-medium shadow-2xs"
                  >
                    <Icon className="h-3.5 w-3.5 text-accent shrink-0" />
                    <span>{tech}</span>
                  </span>
                );
              })}
            </div>
          </div>

          <div className="pt-4 border-t border-border/50 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-foreground text-background text-xs font-medium hover:bg-accent hover:text-accent-foreground transition-all duration-200 cursor-pointer shadow-xs active:scale-95"
                >
                  <span>Live Demo</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              )}
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-border/80 bg-surface hover:bg-surface/90 text-foreground text-xs font-medium hover:border-accent/40 transition-all duration-200 cursor-pointer shadow-xs active:scale-95"
                >
                  <GithubBrandIcon className="h-3.5 w-3.5" />
                  <span>Source</span>
                </a>
              )}
            </div>

            <Link
              href={`/projects/${project.slug}`}
              className="inline-flex items-center gap-1.5 text-xs font-mono text-accent hover:underline group/btn cursor-pointer py-1"
            >
              <span>Case Study</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Standard 2-Column Grid Card (Consistent Framed Display in Light & Dark Mode)
  return (
    <div className="group relative rounded-3xl border border-border/80 bg-surface/50 hover:bg-surface/80 hover:border-accent/40 transition-all duration-300 shadow-2xs flex flex-col justify-between h-full p-3 sm:p-4">
      <div>
        <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-[#09090C] border border-black/10 dark:border-white/10 shadow-sm flex items-center justify-center">
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30 select-none">
            <Image
              src={project.coverImage}
              alt=""
              fill
              aria-hidden
              unoptimized={project.coverImage.startsWith("/api/blob")}
              className="object-cover blur-xl scale-125"
            />
          </div>

          <div className="relative w-full h-full">
            <Image
              src={project.coverImage}
              alt={project.title}
              fill
              unoptimized={project.coverImage.startsWith("/api/blob")}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 z-10">
            <span className="px-2 py-0.5 rounded-full bg-zinc-950/80 backdrop-blur-md border border-white/20 text-[10px] font-mono uppercase tracking-wider text-white shadow-xs">
              {project.category}
            </span>
            {project.featured && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-accent/90 text-accent-foreground text-[10px] font-mono font-medium shadow-xs">
                <Sparkles className="h-2.5 w-2.5" />
                <span>Featured</span>
              </span>
            )}
          </div>
        </div>

        <div className="p-3 sm:p-4 space-y-3">
          <Link
            href={`/projects/${project.slug}`}
            className="font-sans text-lg sm:text-xl font-bold tracking-tight text-foreground hover:text-accent transition-colors block cursor-pointer"
          >
            {project.title}
          </Link>
          <p className="text-xs text-muted-foreground font-light leading-relaxed line-clamp-2">
            {project.tagline}
          </p>

          <div className="flex flex-wrap gap-1.5 pt-2">
            {project.stack.slice(0, 4).map((tech) => {
              const Icon = getStackIcon(tech);
              return (
                <span
                  key={tech}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-surface border border-border/60 text-[10px] font-mono text-muted-foreground"
                >
                  <Icon className="h-3 w-3 text-accent shrink-0" />
                  <span>{tech}</span>
                </span>
              );
            })}
            {project.stack.length > 4 && (
              <span className="px-1.5 py-0.5 rounded-md bg-surface border border-border/60 text-[10px] font-mono text-muted-foreground">
                +{project.stack.length - 4}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="px-3 sm:px-4 pb-2 pt-3 border-t border-border/40 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-2">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg border border-border/70 hover:border-accent hover:text-accent bg-surface text-muted-foreground transition-colors cursor-pointer"
              title="Live Demo"
            >
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg border border-border/70 hover:border-accent hover:text-accent bg-surface text-muted-foreground transition-colors cursor-pointer"
              title="Source Code"
            >
              <GithubBrandIcon className="h-3.5 w-3.5" />
            </a>
          )}
        </div>

        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex items-center gap-1 text-accent hover:underline group/link cursor-pointer py-1"
        >
          <span>Case Study</span>
          <ArrowRight className="h-3 w-3 group-hover/link:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
