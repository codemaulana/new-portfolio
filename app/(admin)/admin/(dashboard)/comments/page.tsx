import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft, MessageSquare } from "lucide-react";
import { CommentsManager } from "@/components/admin/CommentsManager";

export const dynamic = "force-dynamic";

export default async function AdminCommentsPage() {
  const comments = await prisma.chatMessage.findMany({
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
            <span className="text-xs font-mono text-accent">Chat Room</span>
          </div>
          <h1 className="font-sans font-bold text-2xl sm:text-3xl tracking-tight text-foreground flex items-center gap-2.5">
            <MessageSquare className="h-6 w-6 text-accent" />
            <span>Chat Room &amp; Comments Manager</span>
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Review user feedback, reply directly with your verified Owner badge, and moderate comments.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono px-3 py-1.5 rounded-xl border border-border bg-surface text-muted-foreground">
            {comments.length} Total Comments
          </span>
        </div>
      </div>

      <CommentsManager initialComments={comments} />
    </div>
  );
}
