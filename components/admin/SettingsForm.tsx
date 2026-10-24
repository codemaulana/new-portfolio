"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  CheckCircle2,
  AlertCircle,
  Save,
  Sparkles,
  User,
  FileText,
  Share2,
  UploadCloud,
  Loader2,
  FileDown,
} from "lucide-react";
import { BlobImageUpload } from "@/components/admin/BlobImageUpload";

interface SettingsFormProps {
  initialSettings: {
    ownerName: string;
    roleTitle: string;
    emailPublic: string;
    location: string;
    heroHeadline: string;
    heroSubheadline: string;
    heroAvatarUrl?: string | null;
    resumePdfUrl?: string | null;
    aboutShort: string;
    aboutFull: string;
    socialLinks?: Record<string, string>;
  };
}

export function SettingsForm({ initialSettings }: SettingsFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    ...initialSettings,
    heroAvatarUrl: initialSettings.heroAvatarUrl || "/profile-avatar.png",
    resumePdfUrl: initialSettings.resumePdfUrl || "/resume.pdf",
    socialLinks: initialSettings.socialLinks || {
      github: "https://github.com/codemaulana",
      linkedin: "https://www.linkedin.com/in/muhammad-nur-maulana-a13a92290",
      instagram: "https://instagram.com/ctizz4",
      tiktok: "https://www.tiktok.com/@elitescr",
    },
  });

  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingResume, setIsUploadingResume] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSocialChange = (platform: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: value,
      },
    }));
  };

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingResume(true);
    const body = new FormData();
    body.append("file", file);

    try {
      const res = await fetch("/api/admin/media", {
        method: "POST",
        body,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");

      setFormData((prev) => ({ ...prev, resumePdfUrl: data.media.url }));
    } catch {
      alert("Could not upload Resume PDF to Vercel Blob.");
    } finally {
      setIsUploadingResume(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to update site settings.");
      }

      setSuccessMessage("Site settings saved successfully!");
      router.refresh();
      setTimeout(() => setSuccessMessage(""), 4000);
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : "Could not save settings.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {successMessage && (
        <div className="flex items-center gap-2.5 p-3.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold animate-in fade-in-50">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div className="flex items-center gap-2.5 p-3.5 rounded-xl border border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400 text-xs font-semibold">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="p-6 rounded-2xl border border-border/80 bg-surface/40 backdrop-blur-md space-y-6 shadow-2xs">
        <h2 className="font-sans font-bold text-base text-foreground flex items-center gap-2">
          <User className="h-4 w-4 text-accent" />
          <span>Profile Avatar &amp; Resume Assets</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
          <div>
            <BlobImageUpload
              value={formData.heroAvatarUrl || ""}
              onChange={(url) => setFormData((prev) => ({ ...prev, heroAvatarUrl: url }))}
              label="Hero Profile Avatar"
              helperText="Upload your portrait or avatar to Vercel Blob."
              aspectRatio="square"
            />
          </div>

          <div className="space-y-3">
            <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground block">
              Resume PDF Document
            </label>
            <div className="p-4 rounded-2xl border border-border bg-background space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-muted-foreground truncate max-w-[200px]" title={formData.resumePdfUrl || ""}>
                  {formData.resumePdfUrl || "No resume uploaded"}
                </span>
                {formData.resumePdfUrl && (
                  <a
                    href={formData.resumePdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline flex items-center gap-1"
                  >
                    <FileDown className="h-3 w-3" />
                    <span>View PDF</span>
                  </a>
                )}
              </div>

              <div>
                <label className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-border bg-surface hover:bg-surface/80 text-foreground text-xs font-medium transition-colors cursor-pointer">
                  {isUploadingResume ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <UploadCloud className="h-3.5 w-3.5" />
                  )}
                  <span>{isUploadingResume ? "Uploading to Blob..." : "Upload New Resume PDF"}</span>
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={handleResumeUpload}
                    disabled={isUploadingResume}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 rounded-2xl border border-border/80 bg-surface/40 backdrop-blur-md space-y-5 shadow-2xs">
        <h2 className="font-sans font-bold text-base text-foreground flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-accent" />
          <span>Profile &amp; Identity</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
              Full Name
            </label>
            <input
              type="text"
              name="ownerName"
              value={formData.ownerName}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-hidden focus:ring-2 focus:ring-accent/40"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
              Professional Title
            </label>
            <input
              type="text"
              name="roleTitle"
              value={formData.roleTitle}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-hidden focus:ring-2 focus:ring-accent/40"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
              Public Contact Email
            </label>
            <input
              type="email"
              name="emailPublic"
              value={formData.emailPublic}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-hidden focus:ring-2 focus:ring-accent/40"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-hidden focus:ring-2 focus:ring-accent/40"
              required
            />
          </div>
        </div>
      </div>

      <div className="p-6 rounded-2xl border border-border/80 bg-surface/40 backdrop-blur-md space-y-5 shadow-2xs">
        <h2 className="font-sans font-bold text-base text-foreground flex items-center gap-2">
          <FileText className="h-4 w-4 text-accent" />
          <span>Headlines &amp; Bio Copy</span>
        </h2>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
              Hero Headline
            </label>
            <input
              type="text"
              name="heroHeadline"
              value={formData.heroHeadline}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-hidden focus:ring-2 focus:ring-accent/40"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
              Hero Subheadline
            </label>
            <textarea
              name="heroSubheadline"
              rows={2}
              value={formData.heroSubheadline}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-hidden focus:ring-2 focus:ring-accent/40 leading-relaxed"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
              About Short Bio
            </label>
            <textarea
              name="aboutShort"
              rows={3}
              value={formData.aboutShort}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-hidden focus:ring-2 focus:ring-accent/40 leading-relaxed"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
              Full About Description
            </label>
            <textarea
              name="aboutFull"
              rows={4}
              value={formData.aboutFull}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-hidden focus:ring-2 focus:ring-accent/40 leading-relaxed"
              required
            />
          </div>
        </div>
      </div>

      <div className="p-6 rounded-2xl border border-border/80 bg-surface/40 backdrop-blur-md space-y-5 shadow-2xs">
        <h2 className="font-sans font-bold text-base text-foreground flex items-center gap-2">
          <Share2 className="h-4 w-4 text-accent" />
          <span>Social Media &amp; Profiles</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
              GitHub Profile URL
            </label>
            <input
              type="url"
              value={formData.socialLinks.github || ""}
              onChange={(e) => handleSocialChange("github", e.target.value)}
              placeholder="https://github.com/..."
              className="w-full px-3.5 py-2 rounded-xl border border-border bg-background text-xs text-foreground focus:outline-hidden focus:ring-2 focus:ring-accent/40"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
              LinkedIn Profile URL
            </label>
            <input
              type="url"
              value={formData.socialLinks.linkedin || ""}
              onChange={(e) => handleSocialChange("linkedin", e.target.value)}
              placeholder="https://linkedin.com/in/..."
              className="w-full px-3.5 py-2 rounded-xl border border-border bg-background text-xs text-foreground focus:outline-hidden focus:ring-2 focus:ring-accent/40"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
              Instagram Profile URL
            </label>
            <input
              type="url"
              value={formData.socialLinks.instagram || ""}
              onChange={(e) => handleSocialChange("instagram", e.target.value)}
              placeholder="https://instagram.com/..."
              className="w-full px-3.5 py-2 rounded-xl border border-border bg-background text-xs text-foreground focus:outline-hidden focus:ring-2 focus:ring-accent/40"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
              TikTok Profile URL
            </label>
            <input
              type="url"
              value={formData.socialLinks.tiktok || ""}
              onChange={(e) => handleSocialChange("tiktok", e.target.value)}
              placeholder="https://tiktok.com/@..."
              className="w-full px-3.5 py-2 rounded-xl border border-border bg-background text-xs text-foreground focus:outline-hidden focus:ring-2 focus:ring-accent/40"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end">
        <button
          type="submit"
          disabled={isSaving}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-foreground text-background text-xs font-semibold hover:bg-accent hover:text-accent-foreground disabled:opacity-50 transition-all shadow-xs cursor-pointer active:scale-95"
        >
          <Save className="h-4 w-4" />
          <span>{isSaving ? "Saving Settings..." : "Save All Settings"}</span>
        </button>
      </div>
    </form>
  );
}
