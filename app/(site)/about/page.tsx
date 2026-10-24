import type { Metadata } from "next";
import Link from "next/link";
import { CareerSection } from "@/components/about/CareerSection";
import { SkillsMarquee } from "@/components/about/SkillsMarquee";
import { TiktokSection } from "@/components/about/TiktokSection";
import { TrakteerCard } from "@/components/about/TrakteerCard";
import { Mail, ArrowRight } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { getCachedSiteSettings } from "@/lib/cache-queries";

export const metadata: Metadata = {
  title: "About | Muhammad Nur Maulana",
  description:
    "Learn more about Muhammad Nur Maulana's software engineering background, full stack experience, and web development journey.",
};

export const revalidate = 60;

export default async function AboutPage() {
  const [settings, timelineItems, skills] = await Promise.all([
    getCachedSiteSettings(),
    prisma.timelineItem.findMany({ orderBy: { order: "asc" } }),
    prisma.skill.findMany({ orderBy: { order: "asc" } }),
  ]);

  const ownerName = settings?.ownerName || "Muhammad Nur Maulana";
  const resumePdfUrl = settings?.resumePdfUrl || "/resume.pdf";
  const publicEmail = settings?.emailPublic || "contact@codemaulana.web.id";

  // Parse about story paragraphs if configured in admin settings
  const aboutStory = settings?.aboutFull || "";
  const paragraphs = aboutStory
    ? aboutStory.split(/\r?\n\r?\n/).filter(Boolean)
    : [];

  return (
    <div className="max-w-4xl mx-auto space-y-12 sm:space-y-16 pb-20 px-4 sm:px-6">
      <section className="space-y-6 pt-2 sm:pt-6">
        <div className="space-y-1 pb-4 border-b border-dashed border-border/80">
          <h1 className="font-sans text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            About
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed">
            A short story of me
          </p>
        </div>

        <div className="space-y-4 text-sm sm:text-base text-muted-foreground font-light leading-relaxed">
          {paragraphs.length > 0 ? (
            paragraphs.map((p, idx) => (
              <p key={idx} className="leading-relaxed">
                {p}
              </p>
            ))
          ) : (
            <>
              <p>
                I&apos;m <strong className="font-semibold text-foreground">{ownerName}</strong>, a full stack software engineer based in Jakarta, Indonesia. I build web apps with <strong className="font-medium text-foreground">Next.js</strong> and <strong className="font-medium text-foreground">TypeScript</strong>, write backends in <strong className="font-medium text-foreground">Laravel</strong> and <strong className="font-medium text-foreground">Go</strong>, and build mobile apps in <strong className="font-medium text-foreground">Flutter</strong>.
              </p>

              <p>
                I graduated with an Informatics Engineering degree from Universitas Indraprasta PGRI (GPA 3.48/4.00) and have spent the last three years building client apps and working across software engineering roles. I&apos;ve shipped web platforms for over 10 clients, focusing on clean typed code, responsive layouts, and low-latency database queries.
              </p>

              <p>
                Outside of daily coding, I run <strong className="font-medium text-foreground">&quot;Belajar Bareng&quot;</strong>, a 200+ member developer community where we host workshops, code reviews, and mentorship sessions for students breaking into software engineering.
              </p>

              <p>
                Feel free to check out my projects or read my engineering writeups. If you want to collaborate on a product or chat about an engineering role, reach out anytime.
              </p>
            </>
          )}
        </div>

        <div className="pt-2 border-t border-border/70" />
      </section>

      <CareerSection items={timelineItems} resumePdfUrl={resumePdfUrl} />

      <SkillsMarquee skills={skills} />

      <TiktokSection />

      <TrakteerCard />

      <section className="p-8 sm:p-10 rounded-3xl border border-border/80 bg-surface/40 backdrop-blur-md text-center space-y-4 shadow-sm">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/15 text-accent text-xs font-mono uppercase tracking-wider font-semibold">
          <Mail className="h-3.5 w-3.5" />
          <span>Work Together</span>
        </div>

        <h2 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-foreground max-w-lg mx-auto">
          Interested in working together or hiring me?
        </h2>

        <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
          Available for remote, hybrid, or onsite software engineering roles and contract work. Contact me directly at{" "}
          <a href={`mailto:${publicEmail}`} className="text-accent underline font-mono">
            {publicEmail}
          </a>.
        </p>

        <div className="pt-2">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground text-background text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-all duration-200 shadow-xs"
          >
            <span>Get in Touch</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
