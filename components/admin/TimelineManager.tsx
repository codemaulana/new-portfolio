"use client";

import React, { useState } from "react";
import {
  Plus,
  Briefcase,
  GraduationCap,
  Calendar,
  MapPin,
  Edit2,
  Trash2,
  X,
  Check,
  Loader2,
  History,
  Search,
} from "lucide-react";

type TimelineType = "EXPERIENCE" | "EDUCATION";

interface TimelineItem {
  id: string;
  type: TimelineType;
  title: string;
  organization: string;
  location: string | null;
  periodStart: string;
  periodEnd: string | null;
  current: boolean;
  description: string;
  techStack: string[];
  order: number;
}

interface TimelineManagerProps {
  initialItems: TimelineItem[];
}

export function TimelineManager({ initialItems }: TimelineManagerProps) {
  const [items, setItems] = useState<TimelineItem[]>(initialItems);
  const [selectedType, setSelectedType] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<TimelineItem | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Form State
  const [formType, setFormType] = useState<TimelineType>("EXPERIENCE");
  const [formTitle, setFormTitle] = useState("");
  const [formOrganization, setFormOrganization] = useState("");
  const [formLocation, setFormLocation] = useState("Jakarta, Indonesia");
  const [formPeriodStart, setFormPeriodStart] = useState("");
  const [formPeriodEnd, setFormPeriodEnd] = useState("");
  const [formCurrent, setFormCurrent] = useState(false);
  const [formDescription, setFormDescription] = useState("");
  const [formTechStack, setFormTechStack] = useState("");
  const [formOrder, setFormOrder] = useState(1);

  const openCreateModal = () => {
    setEditingItem(null);
    setFormType("EXPERIENCE");
    setFormTitle("");
    setFormOrganization("");
    setFormLocation("Jakarta, Indonesia");
    setFormPeriodStart("Jan 2026");
    setFormPeriodEnd("");
    setFormCurrent(false);
    setFormDescription("");
    setFormTechStack("Next.js, TypeScript, PostgreSQL");
    setFormOrder(items.length + 1);
    setErrorMsg("");
    setIsModalOpen(true);
  };

  const openEditModal = (item: TimelineItem) => {
    setEditingItem(item);
    setFormType(item.type);
    setFormTitle(item.title);
    setFormOrganization(item.organization);
    setFormLocation(item.location || "");
    setFormPeriodStart(item.periodStart);
    setFormPeriodEnd(item.periodEnd || "");
    setFormCurrent(item.current);
    setFormDescription(item.description);
    setFormTechStack(item.techStack.join(", "));
    setFormOrder(item.order);
    setErrorMsg("");
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");

    const techArray = formTechStack
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const payload = {
      type: formType,
      title: formTitle.trim(),
      organization: formOrganization.trim(),
      location: formLocation.trim() || null,
      periodStart: formPeriodStart.trim(),
      periodEnd: formCurrent ? null : formPeriodEnd.trim() || null,
      current: formCurrent,
      description: formDescription.trim(),
      techStack: techArray,
      order: Number(formOrder),
    };

    try {
      if (editingItem) {
        const res = await fetch("/api/admin/timeline", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingItem.id, ...payload }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to update milestone");

        setItems((prev) =>
          prev.map((it) => (it.id === editingItem.id ? data.item : it))
        );
      } else {
        const res = await fetch("/api/admin/timeline", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to add milestone");

        setItems((prev) => [...prev, data.item]);
      }

      setIsModalOpen(false);
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Error saving milestone");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      const res = await fetch(`/api/admin/timeline?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");
      setItems((prev) => prev.filter((it) => it.id !== id));
    } catch {
      alert("Could not delete milestone. Please try again.");
    }
  };

  const filteredItems = items
    .filter((it) => (selectedType === "ALL" ? true : it.type === selectedType))
    .filter(
      (it) =>
        it.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        it.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
        it.techStack.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))
    );

  const tabs = [
    { label: "All Milestones", value: "ALL", count: items.length },
    {
      label: "Work Experience",
      value: "EXPERIENCE",
      count: items.filter((it) => it.type === "EXPERIENCE").length,
    },
    {
      label: "Education",
      value: "EDUCATION",
      count: items.filter((it) => it.type === "EDUCATION").length,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 p-1 rounded-xl border border-border bg-surface/50">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setSelectedType(tab.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                selectedType === tab.value
                  ? "bg-foreground text-background font-semibold shadow-2xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span>{tab.label}</span>
              <span className="ml-1.5 font-mono text-[10px] opacity-70">
                ({tab.count})
              </span>
            </button>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by role, company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-56 pl-9 pr-3.5 py-2 rounded-xl border border-border bg-surface text-xs text-foreground placeholder:text-muted-foreground focus:outline-hidden focus:ring-2 focus:ring-accent/40"
            />
          </div>

          <button
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-foreground text-background text-xs font-semibold hover:bg-accent hover:text-accent-foreground transition-all cursor-pointer shadow-xs active:scale-95"
          >
            <Plus className="h-4 w-4" />
            <span>Add Career Milestone</span>
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredItems.length === 0 ? (
          <div className="p-8 text-center rounded-2xl border border-border/80 bg-surface/20 text-muted-foreground text-xs">
            No milestones found. Click "Add Career Milestone" to record one.
          </div>
        ) : (
          filteredItems.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-2xl border border-border/70 bg-surface/40 hover:border-accent/40 space-y-3 transition-colors shadow-2xs"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shrink-0">
                    {item.type === "EXPERIENCE" ? (
                      <Briefcase className="h-4 w-4" />
                    ) : (
                      <GraduationCap className="h-4 w-4" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-sans font-bold text-sm text-foreground flex items-center gap-2">
                      <span>{item.title}</span>
                      <span className="text-muted-foreground font-normal">at</span>
                      <span className="text-accent">{item.organization}</span>
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 mt-0.5 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1 font-mono text-[11px]">
                        <Calendar className="h-3 w-3" />
                        <span>
                          {item.periodStart} — {item.current ? "Present" : item.periodEnd || "Present"}
                        </span>
                      </span>
                      {item.location && (
                        <span className="inline-flex items-center gap-1 text-[11px]">
                          <MapPin className="h-3 w-3" />
                          <span>{item.location}</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-md border border-border bg-surface text-muted-foreground">
                    #{item.order}
                  </span>
                  {item.current && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-bold uppercase">
                      Current
                    </span>
                  )}
                  <button
                    onClick={() => openEditModal(item)}
                    className="p-1 rounded-lg border border-border hover:bg-surface text-foreground transition-colors cursor-pointer"
                    title="Edit Milestone"
                  >
                    <Edit2 className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id, item.title)}
                    className="p-1 rounded-lg border border-border hover:bg-red-500/10 text-red-600 dark:text-red-400 transition-colors cursor-pointer"
                    title="Delete Milestone"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed pl-12">
                {item.description}
              </p>

              {item.techStack.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pl-12 pt-1">
                  {item.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded bg-surface border border-border/60 text-[10px] font-mono text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-xl my-8 rounded-3xl border border-border/80 bg-surface shadow-2xl p-6 sm:p-8 space-y-6 animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-border/60 pb-4">
              <h2 className="font-sans font-bold text-lg text-foreground flex items-center gap-2">
                <History className="h-5 w-5 text-accent" />
                <span>{editingItem ? "Edit Career Milestone" : "Add Career Milestone"}</span>
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase text-muted-foreground">Milestone Type *</label>
                  <select
                    value={formType}
                    onChange={(e) => setFormType(e.target.value as TimelineType)}
                    className="w-full px-3.5 py-2 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-hidden focus:ring-2 focus:ring-accent/40"
                  >
                    <option value="EXPERIENCE">Work Experience / Internship</option>
                    <option value="EDUCATION">Formal Education / Degree</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase text-muted-foreground">Order</label>
                  <input
                    type="number"
                    value={formOrder}
                    onChange={(e) => setFormOrder(Number(e.target.value))}
                    className="w-full px-3.5 py-2 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-hidden focus:ring-2 focus:ring-accent/40"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase text-muted-foreground">Role / Degree Title *</label>
                  <input
                    type="text"
                    required
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="e.g. Senior Frontend Engineer"
                    className="w-full px-3.5 py-2 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-hidden focus:ring-2 focus:ring-accent/40"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase text-muted-foreground">Organization / Company *</label>
                  <input
                    type="text"
                    required
                    value={formOrganization}
                    onChange={(e) => setFormOrganization(e.target.value)}
                    placeholder="e.g. PT Acme Tech"
                    className="w-full px-3.5 py-2 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-hidden focus:ring-2 focus:ring-accent/40"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase text-muted-foreground">Location</label>
                  <input
                    type="text"
                    value={formLocation}
                    onChange={(e) => setFormLocation(e.target.value)}
                    placeholder="Jakarta, Indonesia"
                    className="w-full px-3.5 py-2 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-hidden focus:ring-2 focus:ring-accent/40"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase text-muted-foreground">Start Period *</label>
                  <input
                    type="text"
                    required
                    value={formPeriodStart}
                    onChange={(e) => setFormPeriodStart(e.target.value)}
                    placeholder="Sep 2024"
                    className="w-full px-3.5 py-2 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-hidden focus:ring-2 focus:ring-accent/40"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase text-muted-foreground">End Period</label>
                  <input
                    type="text"
                    disabled={formCurrent}
                    value={formCurrent ? "Present" : formPeriodEnd}
                    onChange={(e) => setFormPeriodEnd(e.target.value)}
                    placeholder="Present or Jun 2025"
                    className="w-full px-3.5 py-2 rounded-xl border border-border bg-background text-sm text-foreground disabled:opacity-50 focus:outline-hidden focus:ring-2 focus:ring-accent/40"
                  />
                </div>
              </div>

              <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-foreground pt-1">
                <input
                  type="checkbox"
                  checked={formCurrent}
                  onChange={(e) => setFormCurrent(e.target.checked)}
                  className="h-4 w-4 rounded border-border text-accent focus:ring-accent/40"
                />
                <span>Currently active role / ongoing education</span>
              </label>

              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase text-muted-foreground">Key Responsibilities / Highlights *</label>
                <textarea
                  rows={3}
                  required
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Describe your architectural contributions, impact, or academic honors..."
                  className="w-full px-3.5 py-2 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-hidden focus:ring-2 focus:ring-accent/40 leading-relaxed"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase text-muted-foreground">Tech Stack Tags (comma separated)</label>
                <input
                  type="text"
                  value={formTechStack}
                  onChange={(e) => setFormTechStack(e.target.value)}
                  placeholder="React, TypeScript, Go, PostgreSQL"
                  className="w-full px-3.5 py-2 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-hidden focus:ring-2 focus:ring-accent/40"
                />
              </div>

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
                  <span>{editingItem ? "Save Changes" : "Add Milestone"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
