"use client";

import React, { useState } from "react";
import {
  Plus,
  Sparkles,
  Edit2,
  Trash2,
  X,
  Check,
  Loader2,
  Layers,
  Search,
} from "lucide-react";

type SkillCategory = "PRIMARY_STACK" | "FAMILIAR" | "TOOLS_DEVOPS";

interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  iconName: string | null;
  order: number;
  highlight: boolean;
}

interface SkillsManagerProps {
  initialSkills: Skill[];
}

export function SkillsManager({ initialSkills }: SkillsManagerProps) {
  const [skills, setSkills] = useState<Skill[]>(initialSkills);
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Form State
  const [formName, setFormName] = useState("");
  const [formCategory, setFormCategory] = useState<SkillCategory>("PRIMARY_STACK");
  const [formOrder, setFormOrder] = useState(1);
  const [formHighlight, setFormHighlight] = useState(false);

  const openCreateModal = () => {
    setEditingSkill(null);
    setFormName("");
    setFormCategory("PRIMARY_STACK");
    setFormOrder(skills.length + 1);
    setFormHighlight(false);
    setErrorMsg("");
    setIsModalOpen(true);
  };

  const openEditModal = (skill: Skill) => {
    setEditingSkill(skill);
    setFormName(skill.name);
    setFormCategory(skill.category);
    setFormOrder(skill.order);
    setFormHighlight(skill.highlight);
    setErrorMsg("");
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");

    const payload = {
      name: formName.trim(),
      category: formCategory,
      order: Number(formOrder),
      highlight: formHighlight,
    };

    try {
      if (editingSkill) {
        const res = await fetch("/api/admin/skills", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingSkill.id, ...payload }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to update skill");

        setSkills((prev) =>
          prev.map((item) => (item.id === editingSkill.id ? data.skill : item))
        );
      } else {
        const res = await fetch("/api/admin/skills", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to add skill");

        setSkills((prev) => [...prev, data.skill]);
      }

      setIsModalOpen(false);
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Error saving skill");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;

    try {
      const res = await fetch(`/api/admin/skills?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");
      setSkills((prev) => prev.filter((item) => item.id !== id));
    } catch {
      alert("Could not delete skill. Please try again.");
    }
  };

  const handleToggleHighlight = async (skill: Skill) => {
    const nextHighlight = !skill.highlight;
    try {
      const res = await fetch("/api/admin/skills", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: skill.id, highlight: nextHighlight }),
      });
      if (!res.ok) throw new Error("Failed to toggle highlight");
      setSkills((prev) =>
        prev.map((item) =>
          item.id === skill.id ? { ...item, highlight: nextHighlight } : item
        )
      );
    } catch {
      alert("Could not update highlight state.");
    }
  };

  const filteredSkills = skills
    .filter((s) => (selectedCategory === "ALL" ? true : s.category === selectedCategory))
    .filter((s) => s.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const categories = [
    { label: "All Skills", value: "ALL", count: skills.length },
    {
      label: "Primary Stack",
      value: "PRIMARY_STACK",
      count: skills.filter((s) => s.category === "PRIMARY_STACK").length,
    },
    {
      label: "Familiar",
      value: "FAMILIAR",
      count: skills.filter((s) => s.category === "FAMILIAR").length,
    },
    {
      label: "Tools & DevOps",
      value: "TOOLS_DEVOPS",
      count: skills.filter((s) => s.category === "TOOLS_DEVOPS").length,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl border border-border bg-surface/50">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                selectedCategory === cat.value
                  ? "bg-foreground text-background font-semibold shadow-2xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span>{cat.label}</span>
              <span className="ml-1.5 font-mono text-[10px] opacity-70">
                ({cat.count})
              </span>
            </button>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-48 pl-9 pr-3.5 py-2 rounded-xl border border-border bg-surface text-xs text-foreground placeholder:text-muted-foreground focus:outline-hidden focus:ring-2 focus:ring-accent/40"
            />
          </div>

          <button
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-foreground text-background text-xs font-semibold hover:bg-accent hover:text-accent-foreground transition-all cursor-pointer shadow-xs active:scale-95"
          >
            <Plus className="h-4 w-4" />
            <span>Add Skill</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {filteredSkills.map((skill) => (
          <div
            key={skill.id}
            className="p-4 rounded-xl border border-border/70 bg-surface/40 hover:border-accent/40 hover:bg-surface/70 transition-all flex flex-col justify-between space-y-3 group shadow-2xs"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <span className="h-7 w-7 rounded-lg bg-background border border-border/60 flex items-center justify-center text-xs font-mono font-bold text-muted-foreground group-hover:text-accent group-hover:border-accent/30 transition-colors">
                  #{skill.order}
                </span>
                <div>
                  <div className="font-sans font-bold text-xs text-foreground">
                    {skill.name}
                  </div>
                  <div className="text-[10px] font-mono text-muted-foreground">
                    {skill.category.toLowerCase().replace("_", " ")}
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleToggleHighlight(skill)}
                className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[9px] font-mono font-bold uppercase transition-colors cursor-pointer ${
                  skill.highlight
                    ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                    : "bg-surface text-muted-foreground border border-border/60 hover:text-foreground"
                }`}
                title="Click to toggle highlight badge"
              >
                <Sparkles className="h-2.5 w-2.5" />
                <span>{skill.highlight ? "Key" : "Normal"}</span>
              </button>
            </div>

            <div className="flex items-center justify-end gap-1.5 pt-2 border-t border-border/40">
              <button
                onClick={() => openEditModal(skill)}
                className="p-1 rounded-lg border border-border hover:bg-surface text-foreground transition-colors cursor-pointer"
                title="Edit Skill"
              >
                <Edit2 className="h-3 w-3" />
              </button>
              <button
                onClick={() => handleDelete(skill.id, skill.name)}
                className="p-1 rounded-lg border border-border hover:bg-red-500/10 text-red-600 dark:text-red-400 transition-colors cursor-pointer"
                title="Delete Skill"
              >
                <Trash2 className="h-3 w-3" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-3xl border border-border/80 bg-surface shadow-2xl p-6 sm:p-8 space-y-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-border/60 pb-4">
              <h2 className="font-sans font-bold text-base text-foreground flex items-center gap-2">
                <Layers className="h-5 w-5 text-accent" />
                <span>{editingSkill ? "Edit Technology Skill" : "Add New Skill"}</span>
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg border border-border text-muted-foreground hover:text-foreground cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-xl border border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400 text-xs font-medium">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase text-muted-foreground">Skill / Tech Name *</label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Next.js 16, Flutter, Go, Docker"
                  className="w-full px-3.5 py-2 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-hidden focus:ring-2 focus:ring-accent/40"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase text-muted-foreground">Category *</label>
                <select
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value as SkillCategory)}
                  className="w-full px-3.5 py-2 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-hidden focus:ring-2 focus:ring-accent/40"
                >
                  <option value="PRIMARY_STACK">Primary Stack (Daily Production)</option>
                  <option value="FAMILIAR">Familiar (Working Knowledge)</option>
                  <option value="TOOLS_DEVOPS">Tools, DevOps &amp; Cloud</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase text-muted-foreground">Display Order</label>
                <input
                  type="number"
                  value={formOrder}
                  onChange={(e) => setFormOrder(Number(e.target.value))}
                  className="w-full px-3.5 py-2 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-hidden focus:ring-2 focus:ring-accent/40"
                />
              </div>

              <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-foreground pt-1">
                <input
                  type="checkbox"
                  checked={formHighlight}
                  onChange={(e) => setFormHighlight(e.target.checked)}
                  className="h-4 w-4 rounded border-border text-accent focus:ring-accent/40"
                />
                <span>Highlight with 'Key' badge</span>
              </label>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-border/60">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-border text-xs font-medium text-muted-foreground hover:bg-surface hover:text-foreground cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-foreground text-background text-xs font-semibold hover:bg-accent hover:text-accent-foreground disabled:opacity-50 transition-all cursor-pointer shadow-xs active:scale-95"
                >
                  {isSubmitting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Check className="h-4 w-4" />
                  )}
                  <span>{editingSkill ? "Save Changes" : "Add Skill"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
