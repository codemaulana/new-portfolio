"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  ExternalLink,
  Edit2,
  Trash2,
  X,
  Check,
  Loader2,
  FileText,
  Clock,
  Eye,
  Sparkles,
  ArrowLeft,
  Calendar,
} from "lucide-react";
import { BlobImageUpload } from "@/components/admin/BlobImageUpload";
import { TipTapEditor } from "@/components/admin/TipTapEditor";

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string | null;
  tags: string[];
  published: boolean;
  publishedAt: string | Date | null;
  readingTime: number;
  views: number;
  seoTitle: string | null;
  seoDesc: string | null;
}

interface BlogManagerProps {
  initialPosts: Post[];
}

export function BlogManager({ initialPosts }: BlogManagerProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Newsroom Story State
  const [formTitle, setFormTitle] = useState("");
  const [formSlug, setFormSlug] = useState("");
  const [formExcerpt, setFormExcerpt] = useState("");
  const [formContent, setFormContent] = useState("");
  const [formCoverImage, setFormCoverImage] = useState("");
  const [formTags, setFormTags] = useState("");
  const [formReadingTime, setFormReadingTime] = useState(4);
  const [formPublished, setFormPublished] = useState(false);

  const calculateReadingTime = (text: string) => {
    // Strip HTML tags for word count
    const cleanText = text.replace(/<[^>]*>?/gm, " ");
    const words = cleanText.trim().split(/\s+/).filter(Boolean).length;
    const time = Math.max(1, Math.ceil(words / 200));
    setFormReadingTime(time);
  };

  const handleContentChange = (html: string) => {
    setFormContent(html);
    calculateReadingTime(html);
  };

  const openCreateStudio = () => {
    setEditingPost(null);
    setFormTitle("");
    setFormSlug("");
    setFormExcerpt("");
    setFormContent(
      "<h2>Overview &amp; Context</h2><p>Explain the architectural motivation, technical obstacle, or core breakthrough here...</p><h2>Technical Deep Dive</h2><p>Detail the implementation steps, trade-offs, and benchmarks...</p><blockquote>Architecture is the decisions that you wish you could get right early in a project.</blockquote><h2>Key Takeaways</h2><ul><li>Performance gains and latency reduction</li><li>Developer experience improvements</li></ul>"
    );
    setFormCoverImage("");
    setFormTags("Engineering, Next.js, Architecture");
    setFormReadingTime(3);
    setFormPublished(false);
    setErrorMsg("");
    setIsEditorOpen(true);
  };

  const openEditStudio = (p: Post) => {
    setEditingPost(p);
    setFormTitle(p.title);
    setFormSlug(p.slug);
    setFormExcerpt(p.excerpt);
    setFormContent(p.content);
    setFormCoverImage(p.coverImage || "");
    setFormTags(p.tags.join(", "));
    setFormReadingTime(p.readingTime);
    setFormPublished(p.published);
    setErrorMsg("");
    setIsEditorOpen(true);
  };

  const handleSave = async (publishImmediate = false) => {
    if (!formTitle.trim()) {
      setErrorMsg("Please enter a headline for the article.");
      return;
    }

    if (!formExcerpt.trim()) {
      setErrorMsg("Please enter a brief excerpt or lead paragraph.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg("");

    const tagsArray = formTags
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const payload = {
      title: formTitle.trim(),
      slug: formSlug.trim() || undefined,
      excerpt: formExcerpt.trim(),
      content: formContent,
      coverImage: formCoverImage.trim() || null,
      tags: tagsArray,
      readingTime: Number(formReadingTime),
      published: publishImmediate,
    };

    try {
      if (editingPost) {
        const res = await fetch("/api/admin/blog", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingPost.id, ...payload }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to update article");

        setPosts((prev) =>
          prev.map((item) => (item.id === editingPost.id ? data.post : item))
        );
      } else {
        const res = await fetch("/api/admin/blog", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to create article");

        setPosts((prev) => [data.post, ...prev]);
      }

      setIsEditorOpen(false);
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Error saving article");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      const res = await fetch(`/api/admin/blog?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");
      setPosts((prev) => prev.filter((item) => item.id !== id));
    } catch {
      alert("Could not delete article.");
    }
  };

  const handleTogglePublish = async (p: Post) => {
    const nextPublished = !p.published;
    try {
      const res = await fetch("/api/admin/blog", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: p.id, published: nextPublished }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error("Failed to toggle publish status");

      setPosts((prev) =>
        prev.map((item) => (item.id === p.id ? data.post : item))
      );
    } catch {
      alert("Could not update publish state.");
    }
  };

  const filtered = posts.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search articles by title or tag..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-border bg-surface text-xs text-foreground placeholder:text-muted-foreground focus:outline-hidden focus:ring-2 focus:ring-accent/40"
          />
        </div>

        <button
          onClick={openCreateStudio}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-foreground text-background text-xs font-semibold hover:bg-accent hover:text-accent-foreground transition-all cursor-pointer shadow-xs active:scale-95"
        >
          <Plus className="h-4 w-4" />
          <span>Write Story in Newsroom Editor</span>
        </button>
      </div>

      <div className="rounded-2xl border border-border/80 bg-surface/40 backdrop-blur-md overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface/80 border-b border-border/80 text-[11px] font-mono uppercase text-muted-foreground">
              <tr>
                <th className="py-3 px-4">Article Title</th>
                <th className="py-3 px-4">Tags</th>
                <th className="py-3 px-4">Views</th>
                <th className="py-3 px-4">Published Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-muted-foreground">
                    No articles found. Click "Write Story in Newsroom Editor" to compose one.
                  </td>
                </tr>
              ) : (
                filtered.map((post) => (
                  <tr key={post.id} className="hover:bg-surface/50 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="space-y-0.5 max-w-sm">
                        <Link
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          className="font-sans font-bold text-sm text-foreground hover:text-accent transition-colors block truncate"
                        >
                          {post.title}
                        </Link>
                        <div className="text-[11px] text-muted-foreground line-clamp-1">
                          {post.excerpt}
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex flex-wrap gap-1 max-w-[180px]">
                        {post.tags.slice(0, 2).map((t) => (
                          <span
                            key={t}
                            className="px-1.5 py-0.2 rounded bg-surface border border-border/60 text-[10px] font-mono text-muted-foreground"
                          >
                            {t}
                          </span>
                        ))}
                        {post.tags.length > 2 && (
                          <span className="text-[10px] font-mono text-muted-foreground">
                            +{post.tags.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-muted-foreground">
                      <div className="flex items-center gap-1 text-[11px]">
                        <Eye className="h-3 w-3" />
                        <span>{post.views}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-muted-foreground text-[11px]">
                      {post.publishedAt
                        ? new Date(post.publishedAt).toLocaleDateString(undefined, {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })
                        : "Draft"}
                    </td>
                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => handleTogglePublish(post)}
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase transition-colors cursor-pointer ${
                          post.published
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                            : "bg-zinc-500/10 text-zinc-500 border border-zinc-500/20"
                        }`}
                        title="Click to toggle publish status"
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            post.published ? "bg-emerald-500" : "bg-zinc-400"
                          }`}
                        />
                        <span>{post.published ? "Live" : "Draft"}</span>
                      </button>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <Link
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          className="p-1 rounded-lg border border-border hover:bg-surface text-muted-foreground hover:text-foreground transition-colors"
                          title="Preview Story"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                        </Link>
                        <button
                          onClick={() => openEditStudio(post)}
                          className="p-1 rounded-lg border border-border hover:bg-surface text-foreground transition-colors cursor-pointer"
                          title="Edit in Newsroom Studio"
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(post.id, post.title)}
                          className="p-1 rounded-lg border border-border hover:bg-red-500/10 text-red-600 dark:text-red-400 transition-colors cursor-pointer"
                          title="Delete Story"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isEditorOpen && (
        <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl flex flex-col overflow-y-auto animate-in fade-in duration-200">
          <header className="sticky top-0 z-20 h-16 border-b border-border bg-surface/90 px-4 sm:px-8 flex items-center justify-between backdrop-blur-md">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsEditorOpen(false)}
                className="p-2 rounded-xl border border-border hover:bg-surface text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5 text-xs font-mono cursor-pointer"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Back to Overview</span>
              </button>
              <div className="h-4 w-[1px] bg-border hidden sm:block" />
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-muted-foreground">Status:</span>
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold uppercase ${
                    formPublished
                      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                      : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                  }`}
                >
                  {formPublished ? "Published Story" : "Draft Mode"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-1.5 text-xs font-mono text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                <span>{formReadingTime} min read</span>
              </div>

              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => handleSave(false)}
                className="px-3.5 py-2 rounded-xl border border-border bg-surface hover:bg-surface/80 text-foreground text-xs font-semibold transition-all cursor-pointer shadow-2xs active:scale-95 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <span>Save Draft</span>
                )}
              </button>

              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => handleSave(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-foreground text-background text-xs font-semibold hover:bg-accent hover:text-accent-foreground transition-all cursor-pointer shadow-xs active:scale-95 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <Check className="h-4 w-4" />
                    <span>Publish Story</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setIsEditorOpen(false)}
                className="p-2 rounded-xl text-muted-foreground hover:text-foreground cursor-pointer"
                title="Close Newsroom"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </header>

          <main className="flex-1 max-w-4xl mx-auto w-full p-4 sm:p-8 space-y-8 pb-32">
            {errorMsg && (
              <div className="p-4 rounded-2xl border border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400 text-xs font-semibold animate-in fade-in-50">
                {errorMsg}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                Headline *
              </label>
              <textarea
                rows={2}
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                placeholder="Enter story headline..."
                className="w-full font-sans font-black text-2xl sm:text-4xl text-foreground placeholder:text-muted-foreground/30 border-none outline-hidden bg-transparent resize-none leading-tight tracking-tight focus:ring-0"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                Lead Standfirst / Summary Excerpt *
              </label>
              <textarea
                rows={2}
                value={formExcerpt}
                onChange={(e) => setFormExcerpt(e.target.value)}
                placeholder="Write an editorial hook summarizing the findings or architectural impact..."
                className="w-full text-base sm:text-lg font-serif italic text-muted-foreground/90 border-none outline-hidden bg-transparent resize-none leading-relaxed placeholder:text-muted-foreground/30 focus:ring-0"
              />
            </div>

            <div className="p-5 rounded-3xl border border-border/80 bg-surface/30 backdrop-blur-md">
              <BlobImageUpload
                value={formCoverImage}
                onChange={setFormCoverImage}
                label="Story Cover Banner"
                helperText="Upload wide cover photo or graphic to Vercel Blob (served via Edge CDN)."
                aspectRatio="wide"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                  Tags &amp; Topics (comma separated)
                </label>
                <input
                  type="text"
                  value={formTags}
                  onChange={(e) => setFormTags(e.target.value)}
                  placeholder="Next.js, Architecture, Performance"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-surface text-xs text-foreground focus:outline-hidden focus:ring-2 focus:ring-accent/40"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                  Custom URL Slug (Leave blank to auto-generate)
                </label>
                <input
                  type="text"
                  value={formSlug}
                  onChange={(e) => setFormSlug(e.target.value)}
                  placeholder="e.g. building-resilient-microservices"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-surface text-xs font-mono text-foreground focus:outline-hidden focus:ring-2 focus:ring-accent/40"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                  Story Body (WYSIWYG Rich Editor)
                </label>
                <span className="text-[11px] font-mono text-muted-foreground">
                  TipTap Editorial Engine
                </span>
              </div>

              <TipTapEditor
                content={formContent}
                onChange={handleContentChange}
                placeholder="Write your technical article, insert sections, quotes, code, and images..."
              />
            </div>

            <div className="p-6 rounded-2xl border border-border/70 bg-surface/40 flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-foreground text-background flex items-center justify-center font-bold font-sans text-lg shrink-0">
                M
              </div>
              <div className="space-y-0.5">
                <div className="font-sans font-bold text-sm text-foreground">
                  By Muhammad Nur Maulana
                </div>
                <div className="text-xs text-muted-foreground">
                  Full Stack Engineer &amp; Author • Articles will be attributed to your profile
                </div>
              </div>
            </div>
          </main>
        </div>
      )}
    </div>
  );
}
