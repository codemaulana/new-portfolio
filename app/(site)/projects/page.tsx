import { Metadata } from "next";
import { getCachedPublishedProjects } from "@/lib/cache-queries";
import { ProjectFeed } from "@/components/projects/ProjectFeed";
import type { ProjectData } from "@/components/projects/ProjectCard";
import { FolderGit2 } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Projects & Case Studies | Muhammad Nur Maulana",
  description:
    "Software engineering projects and case studies built with Next.js, Laravel, Flutter, and Go by Muhammad Nur Maulana.",
  alternates: {
    canonical: "https://codemaulana.web.id/projects",
  },
};

export const revalidate = 120;

export default async function ProjectsPage() {
  let dbProjects: ProjectData[] = [];

  try {
    const raw = await getCachedPublishedProjects();

    dbProjects = raw.map((p) => ({
      id: p.id,
      title: p.title,
      slug: p.slug,
      tagline: p.tagline,
      problem: p.problem,
      solution: p.solution,
      stack: p.stack,
      category: p.category,
      featured: p.featured,
      order: p.order,
      published: p.published,
      demoUrl: p.demoUrl,
      repoUrl: p.repoUrl,
      coverImage: p.coverImage,
      gallery: p.gallery,
      results: p.results,
    }));
  } catch (err) {
    console.error("Could not fetch projects from database:", err);
  }

  return (
    <div className="max-w-4xl mx-auto space-y-12 sm:space-y-16 pb-20 px-4 sm:px-6">
      {dbProjects.length > 0 ? (
        <ProjectFeed initialProjects={dbProjects} />
      ) : (
        <div className="text-center py-20 space-y-5 rounded-3xl border border-dashed border-border bg-surface/20 p-8 max-w-lg mx-auto">
          <div className="h-14 w-14 rounded-2xl bg-surface border border-border mx-auto flex items-center justify-center text-muted-foreground shadow-xs">
            <FolderGit2 className="h-7 w-7 text-accent" />
          </div>
          <div className="space-y-1.5">
            <h2 className="font-sans font-bold text-foreground text-lg sm:text-xl">
              No Projects Found
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed">
              No projects have been published yet. Please check back soon!
            </p>
          </div>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-foreground text-background text-xs font-semibold hover:bg-accent hover:text-accent-foreground transition-all shadow-xs"
            >
              <span>Get in Touch</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
