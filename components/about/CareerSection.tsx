"use client";

import React from "react";
import { Briefcase, Download, GraduationCap, Users, Award } from "lucide-react";

export interface TimelineItemData {
  id: string;
  type: "EXPERIENCE" | "EDUCATION" | "COMMUNITY" | "CERTIFICATION" | string;
  title: string;
  organization: string;
  location?: string | null;
  periodStart: string;
  periodEnd?: string | null;
  current: boolean;
  description: string;
  techStack?: string[];
  order: number;
}

interface CareerSectionProps {
  items: TimelineItemData[];
  resumePdfUrl?: string | null;
}

function parseDescriptionPoints(description: string): string[] {
  if (!description) return [];

  // Split by newline if multiple lines
  const lines = description
    .split(/\r?\n/)
    .map((line) => line.trim().replace(/^[-•*]\s*/, ""))
    .filter((line) => line.length > 0);

  if (lines.length > 1) return lines;

  // If a single long line with periods, split by sentences if reasonable
  const sentences = description
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim().replace(/^[-•*]\s*/, ""))
    .filter((s) => s.length > 0);

  return sentences.length > 0 ? sentences : [description];
}

export function CareerSection({ items, resumePdfUrl }: CareerSectionProps) {
  // Separate timeline items by type
  const experiences = items.filter((i) => i.type === "EXPERIENCE");
  const educations = items.filter((i) => i.type === "EDUCATION");
  const communities = items.filter((i) => i.type === "COMMUNITY");
  const certifications = items.filter((i) => i.type === "CERTIFICATION");

  const resumeLink = resumePdfUrl || "/resume.pdf";

  return (
    <section className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2 text-foreground font-semibold text-lg sm:text-xl">
            <Briefcase className="h-5 w-5 text-accent" />
            <span>Career</span>
          </div>
          <p className="text-xs text-muted-foreground font-light">
            My professional career journey
          </p>
        </div>

        <a
          href={resumeLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border/80 bg-surface/60 hover:bg-surface text-foreground text-xs font-mono font-medium hover:border-accent/40 transition-all shadow-2xs group self-start sm:self-auto"
        >
          <Download className="h-3.5 w-3.5 text-accent group-hover:-translate-y-0.5 transition-transform" />
          <span>Download Resume</span>
        </a>
      </div>

      {experiences.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {experiences.map((item) => {
            const points = parseDescriptionPoints(item.description);
            const periodText = item.current
              ? `${item.periodStart} – Present`
              : `${item.periodStart}${item.periodEnd ? ` – ${item.periodEnd}` : ""}`;
            const initials = item.organization
              ? item.organization
                  .replace(/^(PT\s*|CV\s*)/i, "")
                  .trim()
                  .substring(0, 2)
                  .toUpperCase()
              : "EX";

            return (
              <div
                key={item.id}
                className="p-5 rounded-2xl border border-border/80 bg-surface/40 hover:bg-surface/80 hover:border-accent/40 transition-all duration-300 space-y-3 shadow-2xs flex flex-col justify-between"
              >
                <div className="flex items-start gap-3.5">
                  <div className="h-12 w-12 rounded-xl bg-accent/10 border border-accent/20 text-accent font-sans font-bold text-base flex items-center justify-center shrink-0">
                    {initials}
                  </div>

                  <div className="space-y-0.5 min-w-0">
                    <h3 className="font-sans font-bold text-base text-foreground leading-tight truncate">
                      {item.title}
                    </h3>
                    <div className="text-xs text-muted-foreground truncate">
                      {item.organization}
                      {item.location ? ` • ${item.location}` : ""}
                    </div>
                    <div className="text-[11px] font-mono text-muted-foreground/80 pt-0.5">
                      {periodText}
                    </div>
                  </div>
                </div>

                <ul className="space-y-1.5 text-xs text-muted-foreground leading-relaxed pt-2 border-t border-border/40 font-light flex-1">
                  {points.map((pt, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-1.5">
                      <span className="text-accent font-bold select-none">•</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>

                {item.techStack && item.techStack.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-2 border-t border-border/30">
                    {item.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface/60 text-muted-foreground border border-border/60"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-8 text-center rounded-2xl border border-dashed border-border bg-surface/20 text-xs text-muted-foreground">
          No experience records published yet. Add timeline items in the admin panel.
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        <div className="p-4 rounded-xl border border-border/80 bg-surface/30 space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
            <GraduationCap className="h-4 w-4 text-accent" />
            <span>Education</span>
          </div>
          {educations.length > 0 ? (
            educations.map((edu) => (
              <div key={edu.id} className="space-y-0.5">
                <div className="text-sm font-sans font-semibold text-foreground">
                  {edu.title} — {edu.organization}
                </div>
                <div className="text-xs text-muted-foreground font-mono">
                  {edu.periodStart} – {edu.periodEnd || (edu.current ? "Present" : "")}
                  {edu.location ? ` • ${edu.location}` : ""}
                </div>
              </div>
            ))
          ) : (
            <div className="space-y-0.5">
              <div className="text-sm font-sans font-semibold text-foreground">
                B.S. in Informatics Engineering — Universitas Indraprasta PGRI
              </div>
              <div className="text-xs text-muted-foreground font-mono">
                Sep 2022 – Sep 2026 (Graduated) • GPA 3.48 / 4.00
              </div>
            </div>
          )}
        </div>

        <div className="p-4 rounded-xl border border-border/80 bg-surface/30 space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
            <Users className="h-4 w-4 text-accent" />
            <span>Community &amp; Leadership</span>
          </div>
          {communities.length > 0 ? (
            communities.map((comm) => (
              <div key={comm.id} className="space-y-0.5">
                <div className="text-sm font-sans font-semibold text-foreground">
                  {comm.title} — {comm.organization}
                </div>
                <div className="text-xs text-muted-foreground font-mono">
                  {comm.periodStart} – {comm.periodEnd || (comm.current ? "Present" : "")}
                </div>
              </div>
            ))
          ) : (
            <div className="space-y-0.5">
              <div className="text-sm font-sans font-semibold text-foreground">
                Founder &amp; Chairperson — Belajar Bareng
              </div>
              <div className="text-xs text-muted-foreground font-mono">
                2024 – 2025 • 200+ member developer community
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
