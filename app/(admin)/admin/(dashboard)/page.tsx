import { prisma } from "@/lib/prisma";
import Link from "next/link";
import {
  FolderGit2,
  FileText,
  Sparkles,
  Inbox,
  ArrowUpRight,
  Plus,
  Clock,
  Eye,
  Mail,
  CheckCircle2,
  Database,
  Shield,
  ExternalLink,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [projectCount, postCount, skillCount, unreadMessages, recentMessages, recentPosts] =
    await Promise.all([
      prisma.project.count(),
      prisma.post.count(),
      prisma.skill.count(),
      prisma.contactMessage.count({ where: { read: false } }),
      prisma.contactMessage.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
      prisma.post.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
        select: {
          id: true,
          title: true,
          slug: true,
          published: true,
          publishedAt: true,
          views: true,
          readingTime: true,
        },
      }),
    ]);

  const cards = [
    {
      label: "Total Projects",
      count: projectCount,
      href: "/admin/projects",
      icon: FolderGit2,
      desc: "Client projects and technical case studies",
    },
    {
      label: "Published Articles",
      count: postCount,
      href: "/admin/blog",
      icon: FileText,
      desc: "Technical blog posts and tutorials",
    },
    {
      label: "Skills & Tech Stack",
      count: skillCount,
      href: "/admin/skills",
      icon: Sparkles,
      desc: "Languages, frameworks, and databases",
    },
    {
      label: "Contact Inquiries",
      count: unreadMessages,
      href: "/admin/messages",
      icon: Inbox,
      desc: unreadMessages > 0 ? `${unreadMessages} unread messages` : "All messages read",
      highlight: unreadMessages > 0,
    },
  ];

  return (
    <div className="space-y-8 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="font-sans font-bold text-2xl sm:text-3xl tracking-tight text-foreground">
            Portfolio Overview
          </h1>
          <p className="text-sm text-muted-foreground">
            Content control center for Muhammad Nur Maulana&apos;s digital portfolio.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-border bg-surface hover:bg-surface/80 text-foreground text-xs font-medium transition-all shadow-2xs"
          >
            <span>Live Site</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </Link>
          <Link
            href="/admin/settings"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-foreground text-background text-xs font-semibold hover:bg-accent hover:text-accent-foreground transition-all shadow-2xs"
          >
            <span>Site Settings</span>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.label}
              href={card.href}
              className={`group p-5 sm:p-6 rounded-2xl border transition-all duration-200 shadow-2xs flex flex-col justify-between space-y-4 ${
                card.highlight
                  ? "border-accent/40 bg-accent/5 hover:bg-accent/10"
                  : "border-border/80 bg-surface/50 hover:bg-surface hover:border-accent/40"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="p-2.5 rounded-xl border border-border/80 bg-background text-foreground group-hover:text-accent transition-colors shadow-2xs">
                  <Icon className="h-5 w-5" />
                </span>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>

              <div>
                <div className="text-3xl font-sans font-bold tracking-tight text-foreground">
                  {card.count}
                </div>
                <div className="text-sm font-semibold text-foreground mt-1">
                  {card.label}
                </div>
                <div className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                  {card.desc}
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 p-5 sm:p-6 rounded-2xl border border-border/80 bg-surface/40 backdrop-blur-md space-y-4 shadow-2xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-accent" />
              <h2 className="font-sans font-bold text-base text-foreground">
                Recent Inquiries
              </h2>
            </div>
            <Link
              href="/admin/messages"
              className="text-xs font-mono text-accent hover:underline flex items-center gap-1"
            >
              <span>View all</span>
              <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="space-y-2.5">
            {recentMessages.length === 0 ? (
              <div className="p-8 text-center rounded-xl border border-dashed border-border text-xs text-muted-foreground">
                No inquiries submitted yet.
              </div>
            ) : (
              recentMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`p-3.5 rounded-xl border transition-all space-y-1 ${
                    !msg.read
                      ? "border-accent/40 bg-accent/5 dark:bg-accent/10"
                      : "border-border/60 bg-background/60"
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <div className="font-semibold text-foreground flex items-center gap-1.5">
                      {!msg.read && (
                        <span className="h-2 w-2 rounded-full bg-accent shrink-0" />
                      )}
                      <span>{msg.name}</span>
                      <span className="font-mono text-[11px] text-muted-foreground font-normal">
                        ({msg.email})
                      </span>
                    </div>
                    <span className="font-mono text-[10px] text-muted-foreground">
                      {new Date(msg.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "2-digit",
                      })}
                    </span>
                  </div>

                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                    {msg.message}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="lg:col-span-5 p-5 sm:p-6 rounded-2xl border border-border/80 bg-surface/40 backdrop-blur-md space-y-4 shadow-2xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-sky-500" />
              <h2 className="font-sans font-bold text-base text-foreground">
                Recent Articles
              </h2>
            </div>
            <Link
              href="/admin/blog"
              className="text-xs font-mono text-accent hover:underline flex items-center gap-1"
            >
              <span>Manage</span>
              <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="space-y-2.5">
            {recentPosts.length === 0 ? (
              <div className="p-8 text-center rounded-xl border border-dashed border-border text-xs text-muted-foreground">
                No blog articles created.
              </div>
            ) : (
              recentPosts.map((post) => (
                <div
                  key={post.id}
                  className="p-3 rounded-xl border border-border/60 bg-background/60 space-y-1.5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <Link
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      className="font-sans font-semibold text-xs text-foreground hover:text-accent transition-colors truncate"
                    >
                      {post.title}
                    </Link>
                    <span
                      className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full uppercase shrink-0 ${
                        post.published
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                          : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                      }`}
                    >
                      {post.published ? "Published" : "Draft"}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-[10px] font-mono text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      <span>{post.views.toLocaleString()}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{post.readingTime} min</span>
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="p-5 sm:p-6 rounded-2xl border border-border/80 bg-surface/30 backdrop-blur-md space-y-3">
        <div className="flex items-center gap-2">
          <Database className="h-4 w-4 text-emerald-500" />
          <h2 className="font-sans font-bold text-sm text-foreground">
            System &amp; Database Health
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 rounded-xl border border-border/60 bg-background/60 space-y-1">
            <div className="text-[10px] font-mono text-muted-foreground uppercase">
              Database Engine
            </div>
            <div className="font-semibold text-foreground flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span>Neon Serverless PostgreSQL</span>
            </div>
          </div>

          <div className="p-3 rounded-xl border border-border/60 bg-background/60 space-y-1">
            <div className="text-[10px] font-mono text-muted-foreground uppercase">
              Authentication Guard
            </div>
            <div className="font-semibold text-foreground flex items-center gap-1.5">
              <Shield className="h-3.5 w-3.5 text-accent" />
              <span>Auth.js v5 (JWT Strategy)</span>
            </div>
          </div>

          <div className="p-3 rounded-xl border border-border/60 bg-background/60 space-y-1">
            <div className="text-[10px] font-mono text-muted-foreground uppercase">
              Static Asset Storage
            </div>
            <div className="font-semibold text-foreground flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-sky-500" />
              <span>Vercel Blob Storage Ready</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
