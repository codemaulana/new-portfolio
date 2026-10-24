import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ArrowLeft, ArrowUpRight, ExternalLink, CheckCircle2 } from "lucide-react";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await prisma.project.findUnique({
    where: { slug },
  });

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: `${project.title} — Case Study`,
    description: project.tagline,
    alternates: {
      canonical: `https://codemaulana.web.id/projects/${slug}`,
    },
    openGraph: {
      title: `${project.title} — Muhammad Nur Maulana`,
      description: project.tagline,
      images: [project.coverImage],
      url: `https://codemaulana.web.id/projects/${slug}`,
    },
  };
}

export async function generateStaticParams() {
  const projects = await prisma.project.findMany({
    select: { slug: true },
  });
  return projects.map((p) => ({ slug: p.slug }));
}

export const dynamic = "force-dynamic";

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = await prisma.project.findUnique({
    where: { slug },
  });

  if (!project) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto space-y-12 sm:space-y-16 pb-20 px-4 sm:px-6 pt-2 sm:pt-6">
      <div>
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Projects</span>
        </Link>
      </div>

      <div className="space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-surface text-xs font-mono uppercase tracking-wider text-accent">
          <span>{project.category}</span>
        </div>
        <h1 className="font-sans text-3xl sm:text-5xl font-bold tracking-tight text-foreground leading-[1.15]">
          {project.title}
        </h1>
        <p className="text-muted-foreground text-base sm:text-lg font-light leading-relaxed">
          {project.tagline}
        </p>

        <div className="flex flex-wrap items-center gap-4 pt-2">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-foreground text-background text-xs font-medium hover:bg-accent hover:text-accent-foreground transition-all duration-200"
            >
              <span>Live Demo</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border bg-surface text-foreground text-xs font-medium hover:border-accent hover:text-accent transition-all duration-200"
            >
              <GithubIcon className="h-3.5 w-3.5" />
              <span>Source Code</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      </div>

      <div className="aspect-video relative rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 bg-[#09090C] shadow-2xl flex items-center justify-center p-3 sm:p-6">
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30 select-none">
          <Image
            src={project.coverImage}
            alt=""
            fill
            aria-hidden
            unoptimized={project.coverImage.startsWith("/api/blob")}
            className="object-cover blur-2xl scale-125"
          />
        </div>
        <div className="relative w-full h-full">
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            priority
            unoptimized={project.coverImage.startsWith("/api/blob")}
            sizes="(max-width: 1024px) 100vw, 896px"
            className="object-contain"
          />
        </div>
      </div>

      <div className="p-6 rounded-2xl border border-border bg-surface/50 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground block mb-2">
            Tech Stack
          </span>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-md bg-background border border-border text-xs font-mono font-medium text-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
        <div>
          <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground block mb-2">
            Role &amp; Category
          </span>
          <div className="text-sm font-sans font-medium text-foreground">
            Full Stack Engineering • {project.category}
          </div>
        </div>
      </div>

      <div className="space-y-12 divide-y divide-border/60">
        <section className="pt-8 space-y-4">
          <h2 className="font-sans text-xl sm:text-2xl font-bold text-foreground">
            The Problem &amp; Context
          </h2>
          <div className="text-muted-foreground text-sm sm:text-base leading-relaxed whitespace-pre-line font-light">
            {project.problem}
          </div>
        </section>

        <section className="pt-8 space-y-4">
          <h2 className="font-sans text-xl sm:text-2xl font-bold text-foreground">
            Architecture &amp; Implementation
          </h2>
          <div className="text-muted-foreground text-sm sm:text-base leading-relaxed whitespace-pre-line font-light">
            {project.solution}
          </div>
        </section>

        {project.results && (
          <section className="pt-8 space-y-4">
            <div className="flex items-center gap-2 text-accent">
              <CheckCircle2 className="h-5 w-5" />
              <h2 className="font-sans text-xl sm:text-2xl font-bold text-foreground">
                Key Results &amp; Impact
              </h2>
            </div>
            <div className="p-6 rounded-2xl border border-border bg-surface/40 text-foreground text-sm sm:text-base leading-relaxed font-medium">
              {project.results}
            </div>
          </section>
        )}

        {project.gallery.length > 0 && (
          <section className="pt-8 space-y-6">
            <h2 className="font-sans text-xl sm:text-2xl font-bold text-foreground">
              Interface &amp; System Previews
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {project.gallery.map((imgUrl, i) => (
                <div
                  key={i}
                  className="aspect-[16/10] min-h-[200px] relative rounded-xl overflow-hidden border border-border bg-surface"
                >
                  <Image
                    src={imgUrl}
                    alt={`Screenshot ${project.title} ${i + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      <div className="pt-12 border-t border-border flex items-center justify-between">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Projects</span>
        </Link>
        <Link
          href="/contact"
          className="text-xs font-mono text-accent hover:underline"
        >
          Need something similar built? Let&apos;s talk →
        </Link>
      </div>
    </article>
  );
}
