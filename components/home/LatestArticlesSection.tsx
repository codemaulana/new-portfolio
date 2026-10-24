"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  BookOpen,
  Megaphone,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { BlogBanner } from "@/components/blog/BlogBanner";

interface ArticleItem {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  publishedAt: Date | string | null;
  readingTime?: number;
  coverImage?: string | null;
  tags?: string[];
  tag?: string;
  isNew?: boolean;
}

interface LatestArticlesSectionProps {
  posts: ArticleItem[];
}

export function LatestArticlesSection({ posts }: LatestArticlesSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  // Mark the newest article with the yellow "New" ribbon badge
  const displayPosts: ArticleItem[] =
    posts.length > 0
      ? posts.map((p, idx) => ({
          ...p,
          isNew: idx === 0,
        }))
      : [];

  const updateScrollState = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

    const cardWidth = 340;
    const index = Math.round(scrollLeft / cardWidth);
    setActiveIndex(Math.min(index, Math.max(0, displayPosts.length - 1)));
  };

  useEffect(() => {
    updateScrollState();
    window.addEventListener("resize", updateScrollState);
    return () => window.removeEventListener("resize", updateScrollState);
  }, [displayPosts.length]);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const cardWidth = 340;
    const scrollAmount = direction === "left" ? -cardWidth : cardWidth;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  return (
    <section className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2 text-foreground font-semibold text-lg">
            <BookOpen className="h-5 w-5 text-accent" />
            <span>Latest Articles</span>
          </div>
          <p className="text-xs text-muted-foreground font-light">
            Technical journal, engineering case studies, and architecture insights
          </p>
        </div>

       
      </div>

      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
          <span>
            Showing story {displayPosts.length > 0 ? activeIndex + 1 : 0} of {displayPosts.length}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className="p-2 rounded-xl border border-border bg-surface/80 hover:bg-surface text-foreground disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer shadow-xs active:scale-95"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className="p-2 rounded-xl border border-border bg-surface/80 hover:bg-surface text-foreground disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer shadow-xs active:scale-95"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        onScroll={updateScrollState}
        className="flex gap-4 sm:gap-5 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scrollbar-none scroll-smooth -mx-4 px-4 sm:-mx-6 sm:px-6"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {displayPosts.map((post) => {
          const hasValidCover =
            post.coverImage &&
            !post.coverImage.startsWith("/images/blog") &&
            post.coverImage.trim() !== "";

          return (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="snap-start shrink-0 w-67.5 sm:w-[320px] md:w-87.5 group cursor-pointer block select-none"
            >
              <div className="relative aspect-16/10 w-full rounded-2xl overflow-hidden bg-zinc-950 border border-border/80 shadow-md group-hover:border-accent/40 group-hover:shadow-xl transition-all duration-300">
                {hasValidCover ? (
                  <Image
                    src={post.coverImage!}
                    alt={post.title}
                    fill
                    unoptimized={post.coverImage!.startsWith("/api/blob")}
                    sizes="(max-width: 640px) 270px, (max-width: 1024px) 320px, 350px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                ) : (
                  <BlogBanner slug={post.slug} className="w-full h-full" />
                )}

                {post.isNew && (
                  <div className="absolute top-0 right-0 overflow-hidden w-20 h-20 pointer-events-none rounded-tr-2xl z-10">
                    <div className="absolute top-2.5 -right-6 transform rotate-45 bg-[#ffc83b] text-zinc-950 text-[10px] font-sans font-bold py-0.5 px-7 shadow-sm uppercase tracking-wider text-center select-none">
                      New
                    </div>
                  </div>
                )}
              </div>

              <p className="mt-2.5 text-sm font-sans font-medium text-foreground truncate group-hover:text-accent transition-colors">
                {post.title}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
