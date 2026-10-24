import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";
import { BlogManager } from "@/components/admin/BlogManager";

export const dynamic = "force-dynamic";

export default async function AdminBlogPage() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6 max-w-6xl">
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
            <span className="text-xs font-mono text-accent">Articles</span>
          </div>
          <h1 className="font-sans font-bold text-2xl sm:text-3xl tracking-tight text-foreground flex items-center gap-2.5">
            <FileText className="h-6 w-6 text-accent" />
            <span>Manage Articles &amp; Blog</span>
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Write, edit, publish, and delete technical articles, tutorials, and engineering notes.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono px-3 py-1.5 rounded-xl border border-border bg-surface text-muted-foreground">
            {posts.length} Total Posts
          </span>
        </div>
      </div>

      <BlogManager initialPosts={posts} />
    </div>
  );
}
