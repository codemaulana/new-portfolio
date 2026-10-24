"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  MessageSquare,
  Reply,
  Trash2,
  Search,
  ShieldCheck,
  Send,
  Loader2,
  CheckCircle2,
  X,
} from "lucide-react";

export interface CommentItem {
  id: string;
  name: string;
  email?: string | null;
  avatarUrl?: string | null;
  message: string;
  isOwner: boolean;
  createdAt: string | Date;
}

interface CommentsManagerProps {
  initialComments: CommentItem[];
}

function formatRelativeTime(dateInput: string | Date): string {
  const date = new Date(dateInput);
  const now = new Date();
  const diffSec = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffSec < 60) return "Just now";
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHour = Math.floor(diffMin / 60);
  if (diffHour < 24) return `${diffHour}h ago`;
  const diffDay = Math.floor(diffHour / 24);
  if (diffDay < 30) return `${diffDay} ${diffDay === 1 ? "day" : "days"} ago`;
  const diffMonth = Math.floor(diffDay / 30);
  if (diffMonth < 12) return `${diffMonth} ${diffMonth === 1 ? "month" : "months"} ago`;
  const diffYear = Math.floor(diffDay / 365);
  return `${diffYear} ${diffYear === 1 ? "year" : "years"} ago`;
}

export function CommentsManager({ initialComments }: CommentsManagerProps) {
  const [comments, setComments] = useState<CommentItem[]>(initialComments);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"ALL" | "VISITORS" | "OWNER">("ALL");

  // Inline replying state
  const [replyingTo, setReplyingTo] = useState<CommentItem | null>(null);
  const [replyText, setReplyText] = useState("");
  const [isSubmittingReply, setIsSubmittingReply] = useState(false);

  // Top composer state
  const [quickPostText, setQuickPostText] = useState("");
  const [isSubmittingQuickPost, setIsSubmittingQuickPost] = useState(false);

  const filtered = comments.filter((c) => {
    if (filter === "VISITORS" && c.isOwner) return false;
    if (filter === "OWNER" && !c.isOwner) return false;
    if (!searchQuery.trim()) return true;

    const q = searchQuery.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      (c.email && c.email.toLowerCase().includes(q)) ||
      c.message.toLowerCase().includes(q)
    );
  });

  const handleOpenReply = (item: CommentItem) => {
    setReplyingTo(item);
    setReplyText(`@${item.name} `);
  };

  const handleSendReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || isSubmittingReply) return;

    setIsSubmittingReply(true);
    try {
      const res = await fetch("/api/admin/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: replyText.trim(),
          replyToName: replyingTo ? replyingTo.name : undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to post reply");

      setComments((prev) => [data.comment, ...prev]);
      setReplyingTo(null);
      setReplyText("");
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Error replying to comment");
    } finally {
      setIsSubmittingReply(false);
    }
  };

  const handleSendQuickPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickPostText.trim() || isSubmittingQuickPost) return;

    setIsSubmittingQuickPost(true);
    try {
      const res = await fetch("/api/admin/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: quickPostText.trim() }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to post message");

      setComments((prev) => [data.comment, ...prev]);
      setQuickPostText("");
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Error posting comment");
    } finally {
      setIsSubmittingQuickPost(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete comment by ${name}?`)) return;

    try {
      const res = await fetch(`/api/admin/chat?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");

      setComments((prev) => prev.filter((c) => c.id !== id));
      if (replyingTo?.id === id) setReplyingTo(null);
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Failed to delete comment");
    }
  };

  return (
    <div className="space-y-6">
      <div className="p-5 rounded-2xl border border-border/80 bg-surface/50 shadow-2xs space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-accent font-semibold">
          <ShieldCheck className="h-4 w-4" />
          <span>Post as Owner (Muhammad Nur Maulana)</span>
        </div>

        <form onSubmit={handleSendQuickPost} className="space-y-3">
          <textarea
            rows={2}
            maxLength={300}
            value={quickPostText}
            onChange={(e) => setQuickPostText(e.target.value)}
            placeholder="Write a comment or announcement to post directly into the public Chat Room..."
            className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-hidden focus:ring-2 focus:ring-accent/40 resize-none"
          />

          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono text-muted-foreground">
              {300 - quickPostText.length} characters left
            </span>
            <button
              type="submit"
              disabled={!quickPostText.trim() || isSubmittingQuickPost}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-foreground text-background text-xs font-semibold hover:bg-accent hover:text-accent-foreground disabled:opacity-50 transition-all cursor-pointer shadow-xs active:scale-95"
            >
              {isSubmittingQuickPost ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Send className="h-3.5 w-3.5" />
              )}
              <span>Post to Chat Room</span>
            </button>
          </div>
        </form>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1 p-1 rounded-xl border border-border bg-surface/50 max-w-xs">
          <button
            onClick={() => setFilter("ALL")}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
              filter === "ALL"
                ? "bg-foreground text-background font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            All ({comments.length})
          </button>
          <button
            onClick={() => setFilter("VISITORS")}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
              filter === "VISITORS"
                ? "bg-foreground text-background font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Visitors ({comments.filter((c) => !c.isOwner).length})
          </button>
          <button
            onClick={() => setFilter("OWNER")}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
              filter === "OWNER"
                ? "bg-foreground text-background font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            My Replies ({comments.filter((c) => c.isOwner).length})
          </button>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search comments or users..."
            className="w-full pl-9 pr-3.5 py-1.5 rounded-xl border border-border bg-surface/50 text-xs text-foreground placeholder:text-muted-foreground focus:outline-hidden focus:ring-2 focus:ring-accent/40"
          />
        </div>
      </div>

      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="text-center py-16 rounded-2xl border border-dashed border-border/70 bg-surface/30 space-y-2">
            <MessageSquare className="h-8 w-8 mx-auto text-muted-foreground/60" />
            <p className="font-medium text-foreground text-sm">No comments found</p>
            <p className="text-xs text-muted-foreground">
              {searchQuery ? "Try refining your search keyword." : "The Chat Room is currently quiet."}
            </p>
          </div>
        ) : (
          filtered.map((item) => (
            <div
              key={item.id}
              className={`p-4 sm:p-5 rounded-2xl border transition-all space-y-3 ${
                item.isOwner
                  ? "border-accent/40 bg-accent/5 dark:bg-accent/10"
                  : "border-border/80 bg-surface/40 hover:bg-surface/70"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  {item.avatarUrl ? (
                    <div className="relative h-8 w-8 rounded-full overflow-hidden border border-border shrink-0">
                      <Image
                        src={item.avatarUrl}
                        alt={item.name}
                        fill
                        sizes="32px"
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                      {item.name.charAt(0).toUpperCase()}
                    </div>
                  )}

                  <div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-sans font-semibold text-sm text-foreground">
                        {item.name}
                      </span>
                      {item.isOwner && (
                        <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-accent/20 text-accent text-[10px] font-mono font-semibold">
                          <ShieldCheck className="h-2.5 w-2.5" />
                          <span>Owner</span>
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-muted-foreground font-mono">
                      {item.email && <span>{item.email}</span>}
                      {item.email && <span>•</span>}
                      <span>{formatRelativeTime(item.createdAt)}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleOpenReply(item)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-border hover:bg-surface hover:text-accent text-xs font-mono text-muted-foreground transition-colors cursor-pointer"
                    title="Reply to this comment"
                  >
                    <Reply className="h-3 w-3" />
                    <span className="hidden sm:inline">Reply</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(item.id, item.name)}
                    className="p-1.5 rounded-lg border border-red-500/20 hover:bg-red-500/10 text-red-500 transition-colors cursor-pointer"
                    title="Delete Comment"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              <div className="pl-10 text-sm text-foreground/90 font-sans leading-relaxed">
                {item.message}
              </div>

              {replyingTo?.id === item.id && (
                <div className="mt-3 ml-10 p-4 rounded-xl border border-accent/40 bg-surface space-y-3 animate-in fade-in duration-150">
                  <div className="flex items-center justify-between text-xs font-mono text-accent">
                    <span>Replying to @{item.name}</span>
                    <button
                      type="button"
                      onClick={() => setReplyingTo(null)}
                      className="p-1 rounded hover:bg-surface text-muted-foreground hover:text-foreground cursor-pointer"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <form onSubmit={handleSendReply} className="space-y-2">
                    <textarea
                      rows={2}
                      maxLength={300}
                      autoFocus
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Type your reply here..."
                      className="w-full px-3 py-2 rounded-lg border border-border bg-background text-xs text-foreground focus:outline-hidden focus:ring-2 focus:ring-accent/40 resize-none"
                    />

                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-muted-foreground">
                        {300 - replyText.length} characters left
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setReplyingTo(null)}
                          className="px-3 py-1.5 rounded-lg border border-border text-xs text-muted-foreground hover:bg-surface cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={!replyText.trim() || isSubmittingReply}
                          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-foreground text-background text-xs font-semibold hover:bg-accent hover:text-accent-foreground disabled:opacity-50 transition-all cursor-pointer active:scale-95 shadow-xs"
                        >
                          {isSubmittingReply ? (
                            <Loader2 className="h-3 w-3 animate-spin" />
                          ) : (
                            <Send className="h-3 w-3" />
                          )}
                          <span>Send Reply</span>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
