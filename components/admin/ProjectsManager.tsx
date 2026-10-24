"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  Sparkles,
  ExternalLink,
  Edit2,
  Trash2,
  X,
  Check,
  Loader2,
  FolderGit2,
} from "lucide-react";
import { GithubBrandIcon } from "@/components/about/BrandIcons";
import { BlobImageUpload } from "@/components/admin/BlobImageUpload";

interface Project {
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
  demoUrl: string | null;
  repoUrl: string | null;
  coverImage: string;
  gallery: string[];
  results: string | null;
}

interface ProjectsManagerProps {
  initialProjects: Project[];
}

export function ProjectsManager({ initialProjects }: ProjectsManagerProps) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Form State
  const [formTitle, setFormTitle] = useState("");
  const [formSlug, setFormSlug] = useState("");
  const [formTagline, setFormTagline] = useState("");
  const [formCategory, setFormCategory] = useState("Web App");
  const [formProblem, setFormProblem] = useState("");
  const [formSolution, setFormSolution] = useState("");
  const [formStack, setFormStack] = useState("");
  const [formDemoUrl, setFormDemoUrl] = useState("");
  const [formRepoUrl, setFormRepoUrl] = useState("");
  const [formCoverImage, setFormCoverImage] = useState("");
  const [formOrder, setFormOrder] = useState(0);
  const [formFeatured, setFormFeatured] = useState(false);
  const [formPublished, setFormPublished] = useState(true);

  const openCreateModal = () => {
    setEditingProject(null);
    setFormTitle("");
    setFormSlug("");
    setFormTagline("");
    setFormCategory("Web App");
    setFormProblem("");
    setFormSolution("");
    setFormStack("Next.js, TypeScript, Tailwind CSS");
    setFormDemoUrl("");
    setFormRepoUrl("");
    setFormCoverImage("");
    setFormOrder(projects.length + 1);
    setFormFeatured(false);
    setFormPublished(true);
    setErrorMsg("");
    setIsModalOpen(true);
  };

  const openEditModal = (p: Project) => {
    setEditingProject(p);
    setFormTitle(p.title);
    setFormSlug(p.slug);
    setFormTagline(p.tagline);
    setFormCategory(p.category);
    setFormProblem(p.problem);
    setFormSolution(p.solution);
    setFormStack(p.stack.join(", "));
    setFormDemoUrl(p.demoUrl || "");
    setFormRepoUrl(p.repoUrl || "");
    setFormCoverImage(p.coverImage);
    setFormOrder(p.order);
    setFormFeatured(p.featured);
    setFormPublished(p.published);
    setErrorMsg("");
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");

    const stackArray = formStack
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const payload = {
      title: formTitle.trim(),
      slug: formSlug.trim() || undefined,
      tagline: formTagline.trim() || formTitle.trim(),
      category: formCategory.trim() || "Web App",
      problem: formProblem.trim() || "",
      solution: formSolution.trim() || "",
      stack: stackArray.length > 0 ? stackArray : ["Web"],
      demoUrl: formDemoUrl.trim() || null,
      repoUrl: formRepoUrl.trim() || null,
      coverImage: formCoverImage.trim() || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
      order: Number(formOrder) || 1,
      featured: formFeatured,
      published: formPublished,
    };

    try {
      if (editingProject) {
        // Update
        const res = await fetch("/api/admin/projects", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingProject.id, ...payload }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to update project");

        setProjects((prev) =>
          prev.map((item) => (item.id === editingProject.id ? data.project : item))
        );
      } else {
        // Create
        const res = await fetch("/api/admin/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to create project");

        setProjects((prev) => [...prev, data.project]);
      }

      setIsModalOpen(false);
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Error saving project");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      const res = await fetch(`/api/admin/projects?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");
      setProjects((prev) => prev.filter((item) => item.id !== id));
    } catch {
      alert("Could not delete project. Please try again.");
    }
  };

  const handleTogglePublish = async (p: Project) => {
    const nextPublished = !p.published;
    try {
      const res = await fetch("/api/admin/projects", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: p.id, published: nextPublished }),
      });
      if (!res.ok) throw new Error("Failed to toggle publish status");
      setProjects((prev) =>
        prev.map((item) => (item.id === p.id ? { ...item, published: nextPublished } : item))
      );
    } catch {
      alert("Could not update publish state.");
    }
  };

  const filtered = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.stack.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-5">
        <div>
          <h1 className="font-sans text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <FolderGit2 className="h-6 w-6 text-accent" />
            <span>Projects &amp; Case Studies</span>
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Manage your public portfolio projects, live demos, and case studies.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-foreground text-background text-xs font-semibold hover:bg-accent hover:text-accent-foreground transition-all cursor-pointer shadow-xs active:scale-95 shrink-0"
        >
          <Plus className="h-4 w-4" />
          <span>Add Project</span>
        </button>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3.5 py-1.5 rounded-xl border border-border bg-surface/50 text-xs text-foreground placeholder:text-muted-foreground focus:outline-hidden focus:ring-2 focus:ring-accent/40"
          />
        </div>

        <div className="text-xs font-mono text-muted-foreground">
          Showing {filtered.length} of {projects.length} project(s)
        </div>
      </div>

      <div className="rounded-2xl border border-border/80 bg-surface/40 overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface/80 border-b border-border text-muted-foreground font-mono uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Project</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Stack</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-muted-foreground">
                    <FolderGit2 className="h-8 w-8 mx-auto mb-2 text-muted-foreground/60" />
                    <p className="font-medium text-foreground">No projects found</p>
                    <p className="text-[11px] mt-0.5">Click &quot;Add Project&quot; above to create your first portfolio case study.</p>
                  </td>
                </tr>
              ) : (
                filtered.map((p) => (
                  <tr key={p.id} className="hover:bg-surface/70 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-medium text-foreground text-sm flex items-center gap-2">
                        <span>{p.title}</span>
                        {p.featured && (
                          <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-500 text-[10px] font-mono border border-amber-500/30">
                            Hero
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-muted-foreground line-clamp-1 mt-0.5 max-w-md">
                        {p.tagline}
                      </p>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-full bg-surface border border-border/80 text-muted-foreground font-mono text-[11px]">
                        {p.category}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {p.stack.slice(0, 3).map((s) => (
                          <span
                            key={s}
                            className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-surface/80 border border-border text-muted-foreground"
                          >
                            {s}
                          </span>
                        ))}
                        {p.stack.length > 3 && (
                          <span className="text-[10px] font-mono text-muted-foreground/80">
                            +{p.stack.length - 3}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => handleTogglePublish(p)}
                        className={`px-2 py-0.5 rounded-full text-[10px] font-mono cursor-pointer border transition-colors ${
                          p.published
                            ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
                            : "bg-zinc-500/15 border-zinc-500/30 text-zinc-500"
                        }`}
                      >
                        {p.published ? "Published" : "Draft"}
                      </button>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {p.demoUrl && (
                          <a
                            href={p.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg border border-border hover:bg-surface text-muted-foreground hover:text-foreground"
                            title="Visit Live Site"
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        )}
                        {p.repoUrl && (
                          <a
                            href={p.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg border border-border hover:bg-surface text-muted-foreground hover:text-foreground"
                            title="View GitHub Repository"
                          >
                            <GithubBrandIcon className="h-3.5 w-3.5" />
                          </a>
                        )}
                        <button
                          onClick={() => openEditModal(p)}
                          className="p-1.5 rounded-lg border border-border hover:bg-surface text-muted-foreground hover:text-foreground cursor-pointer"
                          title="Edit Project"
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(p.id, p.title)}
                          className="p-1.5 rounded-lg border border-red-500/20 hover:bg-red-500/10 text-red-500 cursor-pointer"
                          title="Delete Project"
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

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-background/80 backdrop-blur-md">
          <div className="relative w-full max-w-2xl flex flex-col rounded-3xl border border-border/80 bg-surface shadow-2xl max-h-[92vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-border/60 px-6 py-4 shrink-0 bg-surface z-10">
              <h2 className="font-sans font-bold text-lg text-foreground flex items-center gap-2">
                <FolderGit2 className="h-5 w-5 text-accent" />
                <span>{editingProject ? "Edit Project" : "Add New Project"}</span>
              </h2>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg border border-border text-muted-foreground hover:text-foreground cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {errorMsg && (
              <div className="mx-6 mt-4 p-3 rounded-xl border border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400 text-xs font-medium">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSave} className="flex-1 flex flex-col min-h-0 overflow-hidden">
              <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase text-muted-foreground">Project Title *</label>
                    <input
                      type="text"
                      required
                      value={formTitle}
                      onChange={(e) => setFormTitle(e.target.value)}
                      placeholder="e.g. SDN Ciracas 14 Official School Portal"
                      className="w-full px-3.5 py-2 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-hidden focus:ring-2 focus:ring-accent/40"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase text-muted-foreground">Category</label>
                    <input
                      type="text"
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value)}
                      placeholder="Web App, School Portal, Mobile App"
                      className="w-full px-3.5 py-2 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-hidden focus:ring-2 focus:ring-accent/40"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase text-muted-foreground">Tagline (Optional)</label>
                  <input
                    type="text"
                    value={formTagline}
                    onChange={(e) => setFormTagline(e.target.value)}
                    placeholder="Short summary of what the project does"
                    className="w-full px-3.5 py-2 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-hidden focus:ring-2 focus:ring-accent/40"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase text-muted-foreground">Tech Stack (Comma Separated)</label>
                  <input
                    type="text"
                    value={formStack}
                    onChange={(e) => setFormStack(e.target.value)}
                    placeholder="e.g. Next.js, TypeScript, Tailwind CSS, PostgreSQL"
                    className="w-full px-3.5 py-2 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-hidden focus:ring-2 focus:ring-accent/40"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase text-muted-foreground">Problem Solved (Optional)</label>
                    <textarea
                      rows={2}
                      value={formProblem}
                      onChange={(e) => setFormProblem(e.target.value)}
                      placeholder="What challenge was addressed? (Optional)"
                      className="w-full px-3.5 py-2 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-hidden focus:ring-2 focus:ring-accent/40 resize-y"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase text-muted-foreground">Technical Solution (Optional)</label>
                    <textarea
                      rows={2}
                      value={formSolution}
                      onChange={(e) => setFormSolution(e.target.value)}
                      placeholder="Architecture or implementation notes (Optional)"
                      className="w-full px-3.5 py-2 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-hidden focus:ring-2 focus:ring-accent/40 resize-y"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase text-muted-foreground">
                      Live Demo URL <span className="text-zinc-400 font-normal">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      value={formDemoUrl}
                      onChange={(e) => setFormDemoUrl(e.target.value)}
                      placeholder="https://www.sdnciracas14.sch.id"
                      className="w-full px-3.5 py-2 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-hidden focus:ring-2 focus:ring-accent/40"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase text-muted-foreground">
                      GitHub Repo URL <span className="text-zinc-400 font-normal">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      value={formRepoUrl}
                      onChange={(e) => setFormRepoUrl(e.target.value)}
                      placeholder="Leave empty if closed source / client website"
                      className="w-full px-3.5 py-2 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-hidden focus:ring-2 focus:ring-accent/40"
                    />
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <BlobImageUpload
                    value={formCoverImage}
                    onChange={setFormCoverImage}
                    label="Project Cover Image"
                    helperText="Upload project screenshot to Vercel Blob or provide an image link."
                    aspectRatio="video"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 items-center">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase text-muted-foreground">Display Order</label>
                    <input
                      type="number"
                      value={formOrder}
                      onChange={(e) => setFormOrder(Number(e.target.value))}
                      className="w-full px-3.5 py-2 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-hidden focus:ring-2 focus:ring-accent/40"
                    />
                  </div>

                  <div className="sm:col-span-2 flex items-center gap-6 pt-3">
                    <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-foreground">
                      <input
                        type="checkbox"
                        checked={formFeatured}
                        onChange={(e) => setFormFeatured(e.target.checked)}
                        className="h-4 w-4 rounded border-border text-accent focus:ring-accent/40"
                      />
                      <span>Feature as Hero</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-foreground">
                      <input
                        type="checkbox"
                        checked={formPublished}
                        onChange={(e) => setFormPublished(e.target.checked)}
                        className="h-4 w-4 rounded border-border text-accent focus:ring-accent/40"
                      />
                      <span>Publish (Live)</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 border-t border-border/60 px-6 py-4 shrink-0 bg-surface/95 backdrop-blur-sm z-10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-border text-xs font-medium text-muted-foreground hover:bg-surface hover:text-foreground cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-foreground text-background text-xs font-semibold hover:bg-accent hover:text-accent-foreground disabled:opacity-50 transition-all cursor-pointer shadow-md active:scale-95"
                >
                  {isSubmitting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Check className="h-4 w-4" />
                  )}
                  <span>{editingProject ? "Save Changes" : "Create Project"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
