"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { loginWithGoogleAction, logoutAction } from "@/app/actions/chat-auth";
import {
  SendHorizontal,
  LogOut,
  Loader2,
  ShieldCheck,
  Reply,
  Sparkles,
} from "lucide-react";

export interface ChatMessageData {
  id: string;
  name: string;
  email?: string | null;
  avatarUrl?: string | null;
  message: string;
  isOwner: boolean;
  createdAt: string;
}

interface ChatUser {
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

interface ChatRoomProps {
  initialUser?: ChatUser | null;
  initialMessages?: ChatMessageData[];
}

// Generate consistent avatar background based on author name
function getAvatarBg(name: string): string {
  const colors = [
    "bg-teal-600 text-white",
    "bg-amber-600 text-white",
    "bg-sky-600 text-white",
    "bg-emerald-600 text-white",
    "bg-indigo-600 text-white",
    "bg-rose-600 text-white",
    "bg-cyan-700 text-white",
    "bg-violet-600 text-white",
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length] ?? "bg-teal-600 text-white";
}

// Format relative time (e.g. "6 months ago", "2 days ago", "Just now")
function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
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
  if (diffMonth < 12)
    return `${diffMonth} ${diffMonth === 1 ? "month" : "months"} ago`;
  const diffYear = Math.floor(diffDay / 365);
  return `${diffYear} ${diffYear === 1 ? "year" : "years"} ago`;
}

// Highlight @mentions in amber/gold color as shown in user reference
function renderMessageContent(content: string) {
  const parts = content.split(/(@[a-zA-Z0-9_\s]+?(?=\s|$|[.,!?]))/g);
  return parts.map((part, idx) => {
    if (part.startsWith("@")) {
      return (
        <span
          key={idx}
          className="text-amber-500 dark:text-amber-400 font-semibold">
          {part}
        </span>
      );
    }
    return part;
  });
}

// Google "G" Multi-Color SVG Icon
function GoogleIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      />
    </svg>
  );
}

export function ChatRoom({ initialUser, initialMessages = [] }: ChatRoomProps) {
  const currentUser = initialUser;
  const [messages, setMessages] = useState<ChatMessageData[]>(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!newMessage.trim() || isSending) return;

    if (!currentUser) {
      await loginWithGoogleAction();
      return;
    }

    setIsSending(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: newMessage.trim() }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to post message");
      }

      // Prepend newest message cleanly to the top of the feed
      setMessages((prev) => [data.message, ...prev]);
      setNewMessage("");
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Error sending message");
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleReplyClick = (authorName: string) => {
    const mentionTag = `@${authorName} `;
    setNewMessage((prev) =>
      prev.includes(mentionTag) ? prev : `${mentionTag}${prev}`,
    );
    textareaRef.current?.focus();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 sm:space-y-10 pb-20 px-4 sm:px-6">
      <section className="space-y-2 pt-2 sm:pt-4">
        <div className="space-y-1 pb-4 border-b border-dashed border-border/80">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-muted-foreground">
              {messages.length} messages
            </span>
          </div>

          <h1 className="font-sans text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Chat Room
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed">
            Leave your impression or suggestion about this website here
          </p>
        </div>
      </section>

      <section className="space-y-4">
        {!currentUser ? (
          /* When NOT logged in (Reference Image 3) */
          <div className="py-8 px-6 text-center space-y-3 rounded-2xl border border-dashed border-border/80 bg-surface/30">
            <p className="text-xs sm:text-sm text-muted-foreground font-sans">
              Please sign in to chat
            </p>
            <form action={loginWithGoogleAction}>
              <button
                type="submit"
                className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-xl border border-border bg-background hover:bg-surface text-foreground text-xs sm:text-sm font-semibold shadow-xs hover:border-accent/40 transition-all cursor-pointer active:scale-95">
                <GoogleIcon className="h-4 w-4" />
                <span>Sign in with Google</span>
              </button>
            </form>
          </div>
        ) : (
          /* When LOGGED IN (Reference Image 4) */
          <div className="p-4 sm:p-5 rounded-2xl border border-border/80 bg-surface/40 shadow-xs space-y-3">
            <form onSubmit={handleSendMessage} className="space-y-2">
              <div className="relative rounded-xl border border-border/80 bg-background focus-within:ring-2 focus-within:ring-accent/40 focus-within:border-accent transition-all p-3 shadow-2xs">
                <textarea
                  ref={textareaRef}
                  rows={3}
                  maxLength={300}
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your message.. (Press Enter to send)"
                  className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-hidden resize-none pr-12 leading-relaxed"
                />

                <button
                  type="submit"
                  disabled={!newMessage.trim() || isSending}
                  className="absolute right-3 bottom-3 p-2 rounded-xl bg-foreground text-background hover:bg-accent hover:text-accent-foreground disabled:opacity-30 transition-all cursor-pointer shadow-xs active:scale-95"
                  title="Send message (Enter)">
                  {isSending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <SendHorizontal className="h-4 w-4" />
                  )}
                </button>
              </div>

              {errorMsg && (
                <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs">
                  {errorMsg}
                </div>
              )}
            </form>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 text-xs text-muted-foreground font-mono">
              <div className="flex items-center gap-2.5">
                {currentUser.image ? (
                  <div className="relative h-7 w-7 rounded-full overflow-hidden border border-border shadow-2xs shrink-0">
                    <Image
                      src={currentUser.image}
                      alt={currentUser.name || "User"}
                      fill
                      sizes="28px"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div
                    className={`h-7 w-7 rounded-full flex items-center justify-center font-bold text-xs shadow-2xs ${getAvatarBg(
                      currentUser.name || "User",
                    )}`}>
                    {(currentUser.name || "U").charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="space-y-0.5">
                  <span className="font-semibold text-foreground font-sans text-xs block">
                    {currentUser.name}
                  </span>
                  {currentUser.email && (
                    <span className="text-[11px] text-muted-foreground font-mono block">
                      {currentUser.email}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-4 self-end sm:self-auto">
                <span className="text-[11px]">
                  {300 - newMessage.length} chars left
                </span>
                <form action={logoutAction}>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 text-xs text-red-500 hover:text-red-600 dark:hover:text-red-400 hover:underline cursor-pointer transition-colors">
                    <span>Sign out</span>
                    <LogOut className="h-3.5 w-3.5" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </section>

      <section className="space-y-4 pt-2">
        <div className="flex items-center justify-between pb-2 border-b border-border/50 text-xs font-mono text-muted-foreground">
          <span>Recent Conversations</span>
          <span>Newest on top</span>
        </div>

        {messages.length === 0 ? (
          <div className="py-16 text-center text-muted-foreground space-y-2 border border-dashed border-border/70 rounded-2xl p-6 bg-surface/20">
            <Sparkles className="h-8 w-8 mx-auto text-muted-foreground/40" />
            <p className="text-sm font-medium text-foreground">
              No messages yet
            </p>
            <p className="text-xs text-muted-foreground">
              Be the first to leave a greeting or feedback above!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((item) => {
              const firstLetter = item.name.charAt(0).toUpperCase() || "U";
              const isShort = item.message.length <= 40;
              const isMe = Boolean(
                currentUser &&
                (currentUser.email === item.email ||
                  currentUser.name === item.name),
              );

              return (
                <div
                  key={item.id}
                  className="flex items-start gap-3 sm:gap-3.5 group">
                  <div className="shrink-0 mt-0.5">
                    {item.avatarUrl ? (
                      <div className="relative h-8 w-8 sm:h-9 sm:w-9 rounded-full overflow-hidden border border-border shadow-2xs">
                        <Image
                          src={item.avatarUrl}
                          alt={item.name}
                          fill
                          sizes="36px"
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div
                        className={`h-8 w-8 sm:h-9 sm:w-9 rounded-full flex items-center justify-center font-sans font-bold text-xs sm:text-sm shadow-2xs ${getAvatarBg(
                          item.name,
                        )}`}>
                        {firstLetter}
                      </div>
                    )}
                  </div>

                  <div className="space-y-1.5 max-w-[85%] sm:max-w-[80%]">
                    <div
                      className={`inline-block px-4 py-2 sm:px-4.5 sm:py-2.5 text-xs sm:text-sm leading-relaxed shadow-2xs ${
                        item.isOwner
                          ? "bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/30 text-foreground ring-1 ring-amber-500/20 rounded-2xl rounded-tl-sm"
                          : isMe
                            ? "bg-accent/15 border border-accent/30 text-foreground rounded-2xl rounded-tl-sm"
                            : `bg-surface/80 dark:bg-[#151c1a] border border-border/80 dark:border-[#223531] text-foreground ${
                                isShort
                                  ? "rounded-2xl"
                                  : "rounded-2xl rounded-tl-sm"
                              }`
                      }`}>
                      {renderMessageContent(item.message)}
                    </div>

                    <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground font-sans pl-1 flex-wrap">
                      <span className="font-medium text-foreground/90">
                        {item.name}
                      </span>

                      {isMe && (
                        <span className="px-1.5 py-0.2 rounded-full bg-accent/20 text-accent text-[9px] font-mono font-semibold">
                          You
                        </span>
                      )}

                      {item.isOwner && (
                        <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-[9px] font-mono font-semibold">
                          <ShieldCheck className="h-2.5 w-2.5" />
                          <span>Owner</span>
                        </span>
                      )}

                      <span>•</span>
                      <span className="font-mono text-[10px]">
                        {formatRelativeTime(item.createdAt)}
                      </span>

                      <button
                        type="button"
                        onClick={() => handleReplyClick(item.name)}
                        className="opacity-0 group-hover:opacity-100 ml-1 inline-flex items-center gap-0.5 text-[10px] font-mono text-muted-foreground hover:text-accent transition-opacity cursor-pointer"
                        title={`Reply to ${item.name}`}>
                        <Reply className="h-2.5 w-2.5" />
                        <span>reply</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
