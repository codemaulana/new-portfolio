"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, X, Calendar, Clock, Eye, ArrowRight, Rss, Sparkles, BookOpen } from "lucide-react";
import { BlogBanner } from "./BlogBanner";

export interface BlogPostItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage?: string | null;
  tags: string[];
  readingTime: number;
  views: number;
  publishedAt: string | Date | null;
}

interface BlogFeedProps {
  initialPosts: BlogPostItem[];
}

// format dates deterministically so server and client output match
function formatArticleDate(dateInput: string | Date | null | undefined): string {
  if (!dateInput) return "Recent";
  const d = new Date(dateInput);
  if (isNaN(d.getTime())) return "Recent";
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;
}

// format views with dot or comma consistently across SSR and client
function formatViewsCount(views: number): string {
  if (!views) return "0";
  return views.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function BlogFeed({ initialPosts }: BlogFeedProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // topic chips with their target filter tags
  const categories = [
    { name: "All", label: "All" },
    { name: "Next.js", label: "Next.js", filterTag: "Next.js" },
    { name: "React & TS", label: "TypeScript", filterTag: "TypeScript" },
    { name: "Architecture", label: "Architecture", filterTag: "Architecture" },
    { name: "Flutter", label: "Flutter", filterTag: "Flutter" },
    { name: "Backend & Go", label: "Golang", filterTag: "Golang" },
  ];

  // filter posts by topic chip and live search query
  const filteredPosts = useMemo(() => {
    return initialPosts.filter((post) => {
      // topic filter
      if (selectedCategory !== "All") {
        const cat = categories.find((c) => c.name === selectedCategory);
        if (cat?.filterTag) {
          const matchTag = post.tags.some(
            (t) =>
              t.toLowerCase().includes(cat.filterTag!.toLowerCase()) ||
              post.title.toLowerCase().includes(cat.filterTag!.toLowerCase())
          );
          if (!matchTag) return false;
        }
      }

      // keyword search across title, excerpt, and tags
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchTitle = post.title.toLowerCase().includes(query);
        const matchExcerpt = post.excerpt.toLowerCase().includes(query);
        const matchTag = post.tags.some((t) => t.toLowerCase().includes(query));
        return matchTitle || matchExcerpt || matchTag;
      }

      return true;
    });
  }, [initialPosts, selectedCategory, searchQuery]);

  // top match gets hero slot, rest go to 2-column grid
  const featuredPost = filteredPosts[0];
  const gridPosts = filteredPosts.slice(1);

  return (
    <div className="space-y-10 sm:space-y-14">
      <section className="space-y-6 pt-2 sm:pt-6">
        <div className="space-y-1 pb-4 border-b border-dashed border-border/80">
          <div className="flex items-center justify-between">
            <h1 className="font-sans text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              Blog
            </h1>
            <span className="text-xs font-mono text-muted-foreground px-2.5 py-1 rounded-full bg-surface/50 border border-border/60">
              {initialPosts.length} Articles
            </span>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed">
            Thoughts, architectural notes, and practical guides on modern web and mobile systems.
          </p>
        </div>

        <div className="space-y-3.5">
          <div className="relative flex items-center">
            <Search className="absolute left-3.5 h-4 w-4 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles, topics, or keywords..."
              className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-surface/40 border border-border/70 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent/80 focus:ring-1 focus:ring-accent transition-all shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 p-1 rounded-md text-muted-foreground hover:text-foreground"
                aria-label="Clear search input"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.name;
              const count =
                cat.name === "All"
                  ? initialPosts.length
                  : initialPosts.filter(
                      (p) =>
                        p.tags.some((t) =>
                          t.toLowerCase().includes(cat.filterTag?.toLowerCase() || "")
                        ) ||
                        p.title
                          .toLowerCase()
                          .includes(cat.filterTag?.toLowerCase() || "")
                    ).length;

              return (
                <button
                  key={cat.name}
                  onClick={() => {
                    setSelectedCategory(cat.name);
                    setSearchQuery("");
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-sans font-medium transition-all duration-200 shrink-0 select-none flex items-center gap-1.5 ${
                    isActive
                      ? "bg-accent text-accent-foreground font-semibold shadow-xs"
                      : "bg-surface/50 text-muted-foreground hover:text-foreground hover:bg-surface border border-border/60"
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] font-mono ${
                      isActive ? "text-accent-foreground/80 font-bold" : "text-muted-foreground"
                    }`}
                  >
                    ({count})
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="pt-2 border-t border-border/70" />
      </section>

      {filteredPosts.length === 0 && (
        <div className="text-center py-14 space-y-4 rounded-2xl border border-dashed border-border bg-surface/20 p-6 sm:p-8 max-w-lg mx-auto">
          <div className="h-12 w-12 rounded-full bg-surface border border-border mx-auto flex items-center justify-center text-muted-foreground">
            <BookOpen className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <h3 className="font-sans font-semibold text-foreground text-sm">
              No matching articles
            </h3>
            <p className="text-xs text-muted-foreground">
              Try a different keyword or reset to &quot;All&quot; categories.
            </p>
          </div>
          <button
            onClick={() => {
              setSelectedCategory("All");
              setSearchQuery("");
            }}
            className="px-4 py-2 rounded-xl bg-accent text-accent-foreground text-xs font-semibold hover:opacity-90 transition-opacity"
          >
            Reset Filters
          </button>
        </div>
      )}

      {featuredPost && (
        <div className="space-y-4">
          <Link
            href={`/blog/${featuredPost.slug}`}
            className="group block rounded-3xl border border-border/80 bg-surface/30 backdrop-blur-md p-3.5 sm:p-6 overflow-hidden hover:border-accent/50 hover:shadow-lg transition-all duration-300"
          >
            <div className="relative overflow-hidden rounded-2xl aspect-[16/9] w-full mb-4 sm:mb-5 bg-zinc-950">
              {featuredPost.coverImage && !featuredPost.coverImage.startsWith("/images/blog") ? (
                <Image
                  src={featuredPost.coverImage}
                  alt={featuredPost.title}
                  fill
                  priority
                  unoptimized={featuredPost.coverImage.startsWith("/api/blob")}
                  sizes="(max-width: 1024px) 100vw, 896px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <BlogBanner slug={featuredPost.slug} />
              )}

              <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20 flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-zinc-950/85 backdrop-blur-md border border-white/20 text-white text-[10px] sm:text-[11px] font-mono shadow-md">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Featured Post</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-1.5">
                {featuredPost.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] sm:text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-surface text-muted-foreground border border-border/60"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <h2 className="font-sans font-bold text-lg sm:text-2xl lg:text-3xl text-foreground group-hover:text-accent transition-colors leading-tight">
                {featuredPost.title}
              </h2>

              <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 leading-relaxed font-light">
                {featuredPost.excerpt}
              </p>

              <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground font-mono border-t border-border/40">
                <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                  <span className="flex items-center gap-1.5" suppressHydrationWarning>
                    <Calendar className="h-3.5 w-3.5 text-accent" />
                    <span>{formatArticleDate(featuredPost.publishedAt)}</span>
                  </span>

                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{featuredPost.readingTime} min read</span>
                  </span>

                  <span className="flex items-center gap-1.5" suppressHydrationWarning>
                    <Eye className="h-3.5 w-3.5" />
                    <span>{formatViewsCount(featuredPost.views)} views</span>
                  </span>
                </div>

                <div className="flex items-center gap-1 text-xs font-semibold text-accent group-hover:translate-x-1 transition-transform">
                  <span>Read Post</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </div>
            </div>
          </Link>
        </div>
      )}

      {gridPosts.length > 0 && (
        <div className="space-y-6 pt-2">
          <div className="flex items-center justify-between border-b border-border/60 pb-3">
            <h3 className="font-sans font-bold text-lg sm:text-xl text-foreground tracking-tight flex items-center gap-2">
              <span>Related Articles</span>
              <span className="text-xs font-mono font-normal text-muted-foreground">
                ({gridPosts.length} posts)
              </span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {gridPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group flex flex-col justify-between rounded-2xl border border-border/70 bg-surface/30 backdrop-blur-md p-3.5 sm:p-4 overflow-hidden hover:border-accent/50 hover:shadow-md transition-all duration-300"
              >
                <div>
                  <div className="relative overflow-hidden rounded-xl aspect-[16/9] w-full mb-3.5 bg-zinc-950">
                    {post.coverImage && !post.coverImage.startsWith("/images/blog") ? (
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        unoptimized={post.coverImage.startsWith("/api/blob")}
                        sizes="(max-width: 768px) 100vw, 450px"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <BlogBanner slug={post.slug} />
                    )}
                  </div>

                  <h4 className="font-sans font-bold text-sm sm:text-base text-foreground group-hover:text-accent transition-colors leading-snug line-clamp-2 mb-2">
                    {post.title}
                  </h4>

                  <div className="flex items-center gap-2.5 text-[11px] font-mono text-muted-foreground mb-2">
                    <span suppressHydrationWarning>{formatArticleDate(post.publishedAt)}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{post.readingTime} min</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1" suppressHydrationWarning>
                      <Eye className="h-3 w-3" />
                      <span>{formatViewsCount(post.views)}</span>
                    </span>
                  </div>

                  <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed font-light mb-3.5">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-2.5 border-t border-border/40 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {post.tags.slice(0, 2).map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface text-muted-foreground border border-border/50"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>

                  <span className="text-xs font-semibold text-accent flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    <span>Read</span>
                    <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="rounded-3xl border border-border/80 bg-surface/40 backdrop-blur-md p-5 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-xs">
        <div className="space-y-1 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-accent/15 text-accent text-[11px] font-mono">
            <Sparkles className="h-3 w-3" />
            <span>Digital Atelier Journal</span>
          </div>
          <h4 className="font-sans font-bold text-base sm:text-lg text-foreground">
            Follow the Engineering Journal
          </h4>
          <p className="text-xs text-muted-foreground max-w-md font-light">
            Read new writeups straight in your favorite RSS reader. No trackers, no marketing spam.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 w-full sm:w-auto justify-center">
          <a
            href="/feed.xml"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 rounded-xl bg-accent text-accent-foreground text-xs font-semibold flex items-center gap-1.5 hover:opacity-90 transition-opacity shadow-xs"
          >
            <Rss className="h-3.5 w-3.5" />
            <span>RSS Feed</span>
          </a>

          <a
            href="https://github.com/codemaulana"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 rounded-xl bg-surface border border-border text-foreground hover:bg-surface/80 text-xs font-medium transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
}
