import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft, Settings } from "lucide-react";
import { SettingsForm } from "@/components/admin/SettingsForm";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const existingSettings = await prisma.siteSettings.findUnique({
    where: { id: "singleton" },
  });

  const settings = {
    ownerName: existingSettings?.ownerName || "Muhammad Nur Maulana",
    roleTitle: existingSettings?.roleTitle || "Full Stack Developer",
    emailPublic: existingSettings?.emailPublic || "muhammadnrmaulana@gmail.com",
    location: existingSettings?.location || "Jakarta, Indonesia",
    heroHeadline:
      existingSettings?.heroHeadline ||
      "Building High-Impact Web Applications with Precision.",
    heroSubheadline:
      existingSettings?.heroSubheadline ||
      "Senior full stack engineer focused on React, Next.js, TypeScript, Node.js, and cloud architectures.",
    heroAvatarUrl: existingSettings?.heroAvatarUrl || "/profile-avatar.png",
    resumePdfUrl: existingSettings?.resumePdfUrl || "/resume.pdf",
    aboutShort:
      existingSettings?.aboutShort ||
      "Passionate developer with hands-on experience building performant web apps and scalable backends.",
    aboutFull:
      existingSettings?.aboutFull ||
      "Dedicated software engineer with a track record of architecting reliable frontend systems, modern APIs, and high-performance databases. Committed to clean code and exceptional user experience.",
    socialLinks: (existingSettings?.socialLinks as Record<string, string>) || {
      github: "https://github.com/codemaulana",
      linkedin: "https://www.linkedin.com/in/muhammad-nur-maulana-a13a92290",
      instagram: "https://instagram.com/ctizz4",
      tiktok: "https://www.tiktok.com/@elitescr",
    },
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Link
              href="/admin"
              className="text-xs font-mono text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
            >
              <ArrowLeft className="h-3 w-3" />
              <span>Dashboard</span>
            </Link>
            <span className="text-border">•</span>
            <span className="text-xs font-mono text-accent">Site Settings</span>
          </div>
          <h1 className="font-sans font-bold text-2xl sm:text-3xl tracking-tight text-foreground flex items-center gap-2.5">
            <Settings className="h-6 w-6 text-accent" />
            <span>Site Settings</span>
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Update your public profile avatar, resume PDF, contact email, headlines, and biographical copy in real time.
          </p>
        </div>
      </div>

      <SettingsForm initialSettings={settings} />
    </div>
  );
}
