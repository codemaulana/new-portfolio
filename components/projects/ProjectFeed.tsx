"use client";

import React, { useState, useMemo } from "react";
import { ProjectCard, type ProjectData } from "./ProjectCard";
import { Search, X, FolderGit2, Sparkles, Filter } from "lucide-react";

interface ProjectFeedProps {
  initialProjects: ProjectData[];
}

export function ProjectFeed({ initialProjects }: ProjectFeedProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Derive unique categories with item counts
  const categories = useMemo(() => {
    const counts: Record<string, number> = {};
    initialProjects.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });

    const entries = Object.entries(counts).map(([name, count]) => ({
      name,
      count,
    }));

    return [{ name: "All", count: initialProjects.length }, ...entries];
  }, [initialProjects]);

  // Filter projects by category and search keyword
  const filteredProjects = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return initialProjects.filter((project) => {
      // Category match
      const matchesCategory =
        selectedCategory === "All" || project.category === selectedCategory;

      if (!matchesCategory) return false;
      if (!q) return true;

      // Search match across title, tagline, category, and stack
      const titleMatch = project.title.toLowerCase().includes(q);
      const taglineMatch = project.tagline.toLowerCase().includes(q);
      const categoryMatch = project.category.toLowerCase().includes(q);
      const stackMatch = project.stack.some((tech) =>
        tech.toLowerCase().includes(q)
      );

      return titleMatch || taglineMatch || categoryMatch || stackMatch;
    });
  }, [initialProjects, selectedCategory, searchQuery]);

  // Determine if there is a featured hero project to show on top
  const isDefaultView = selectedCategory === "All" && !searchQuery.trim();
  const featuredProject = isDefaultView
    ? filteredProjects.find((p) => p.featured)
    : null;

  // Remaining projects to display in grid
  const gridProjects = featuredProject
    ? filteredProjects.filter((p) => p.id !== featuredProject.id)
    : filteredProjects;

  return (
    <div className="space-y-10 sm:space-y-12">
      <section className="space-y-6 pt-2 sm:pt-6">
        <div className="space-y-2 pb-4 border-b border-dashed border-border/80">
          <div className="flex items-center gap-3">
            <h1 className="font-sans text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              Projects
            </h1>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-accent/15 text-accent text-xs font-mono font-medium">
              {filteredProjects.length} {filteredProjects.length === 1 ? "Project" : "Projects"}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed">
            Showcase of my web applications, backend services, and mobile projects.
          </p>
        </div>

        <div className="space-y-4">
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects by name, stack (e.g. Next.js, Flutter), or keyword..."
              className="w-full pl-11 pr-10 py-3 rounded-2xl border border-border/80 bg-surface/40 hover:bg-surface/70 focus:bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all duration-200 shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                aria-label="Clear search query"
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-surface text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none select-none">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.name;
              return (
                <button
                  key={cat.name}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono transition-all duration-200 shrink-0 cursor-pointer ${
                    isActive
                      ? "bg-foreground text-background font-semibold shadow-xs"
                      : "bg-surface/50 hover:bg-surface border border-border/70 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span>{cat.name}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isActive
                        ? "bg-background/25 text-background"
                        : "bg-background border border-border/60 text-muted-foreground"
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {featuredProject && (
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-accent font-semibold">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Featured Case Study</span>
          </div>
          <ProjectCard project={featuredProject} featuredHero />
        </section>
      )}

      {gridProjects.length > 0 ? (
        <section className="space-y-4">
          {featuredProject && (
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-muted-foreground font-semibold pt-4">
              <FolderGit2 className="h-3.5 w-3.5 text-accent" />
              <span>All Projects</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {gridProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>
      ) : (
        /* 5. EMPTY SEARCH STATE */
        <div className="p-12 text-center rounded-3xl border border-dashed border-border/80 bg-surface/30 space-y-4">
          <div className="h-12 w-12 rounded-2xl bg-surface border border-border flex items-center justify-center text-muted-foreground mx-auto">
            <Filter className="h-5 w-5" />
          </div>
          <div className="space-y-1">
            <h3 className="font-sans text-lg font-bold text-foreground">
              No matching projects found
            </h3>
            <p className="text-xs text-muted-foreground font-light max-w-sm mx-auto">
              We couldn&apos;t find any project matching &quot;{searchQuery}&quot; under the &quot;{selectedCategory}&quot; category.
            </p>
          </div>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All");
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-foreground text-background text-xs font-mono font-medium hover:bg-accent hover:text-accent-foreground transition-all cursor-pointer shadow-xs"
          >
            <span>Reset Filters</span>
          </button>
        </div>
      )}
    </div>
  );
}
