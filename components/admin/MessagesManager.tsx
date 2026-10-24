"use client";

import React, { useState } from "react";
import {
  Mail,
  Clock,
  CheckCircle2,
  Trash2,
  MailCheck,
  MailQuestion,
  Search,
} from "lucide-react";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  read: boolean;
  createdAt: string | Date;
}

interface MessagesManagerProps {
  initialMessages: ContactMessage[];
}

export function MessagesManager({ initialMessages }: MessagesManagerProps) {
  const [messages, setMessages] = useState<ContactMessage[]>(initialMessages);
  const [filter, setFilter] = useState<"ALL" | "UNREAD" | "READ">("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const handleToggleRead = async (msg: ContactMessage) => {
    const nextRead = !msg.read;
    try {
      const res = await fetch("/api/admin/messages", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: msg.id, read: nextRead }),
      });
      if (!res.ok) throw new Error("Failed to update status");

      setMessages((prev) =>
        prev.map((m) => (m.id === msg.id ? { ...m, read: nextRead } : m))
      );
    } catch {
      alert("Could not update message read status.");
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete message from ${name}?`)) return;

    try {
      const res = await fetch(`/api/admin/messages?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");

      setMessages((prev) => prev.filter((m) => m.id !== id));
    } catch {
      alert("Could not delete message.");
    }
  };

  const filtered = messages
    .filter((m) => {
      if (filter === "UNREAD") return !m.read;
      if (filter === "READ") return m.read;
      return true;
    })
    .filter(
      (m) =>
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (m.subject && m.subject.toLowerCase().includes(searchQuery.toLowerCase())) ||
        m.message.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 p-1 rounded-xl border border-border bg-surface/50">
          <button
            onClick={() => setFilter("ALL")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              filter === "ALL"
                ? "bg-foreground text-background font-semibold shadow-2xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <span>All</span>
            <span className="ml-1.5 font-mono text-[10px] opacity-70">
              ({messages.length})
            </span>
          </button>

          <button
            onClick={() => setFilter("UNREAD")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              filter === "UNREAD"
                ? "bg-foreground text-background font-semibold shadow-2xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <span>Unread</span>
            <span className="ml-1.5 font-mono text-[10px] opacity-70">
              ({unreadCount})
            </span>
          </button>

          <button
            onClick={() => setFilter("READ")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              filter === "READ"
                ? "bg-foreground text-background font-semibold shadow-2xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <span>Read</span>
            <span className="ml-1.5 font-mono text-[10px] opacity-70">
              ({messages.length - unreadCount})
            </span>
          </button>
        </div>

        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search inquiries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-border bg-surface text-xs text-foreground placeholder:text-muted-foreground focus:outline-hidden focus:ring-2 focus:ring-accent/40"
          />
        </div>
      </div>

      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="p-12 text-center rounded-2xl border border-dashed border-border/80 bg-surface/30 space-y-2">
            <Mail className="h-8 w-8 text-muted-foreground mx-auto" />
            <div className="font-semibold text-sm text-foreground">
              {searchQuery ? "No matching messages" : "No inquiries in this folder"}
            </div>
            <p className="text-xs text-muted-foreground max-w-xs mx-auto">
              Messages submitted by visitors through your contact form will appear here.
            </p>
          </div>
        ) : (
          filtered.map((msg) => (
            <div
              key={msg.id}
              className={`p-5 rounded-2xl border transition-all duration-200 space-y-3 shadow-2xs ${
                !msg.read
                  ? "border-accent/50 bg-accent/5 dark:bg-accent/10"
                  : "border-border/80 bg-surface/40 hover:bg-surface/70"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="h-9 w-9 rounded-xl border border-border bg-background flex items-center justify-center text-foreground font-mono text-xs font-bold shrink-0">
                    {msg.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="font-sans font-bold text-sm text-foreground flex items-center gap-2">
                      <span>{msg.name}</span>
                      {!msg.read && (
                        <span className="px-2 py-0.5 rounded-md bg-accent text-accent-foreground text-[10px] font-mono font-bold uppercase">
                          New
                        </span>
                      )}
                    </div>
                    <a
                      href={`mailto:${msg.email}`}
                      className="text-xs text-accent hover:underline font-mono"
                    >
                      {msg.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono self-start sm:self-auto">
                  <span className="flex items-center gap-1 text-[11px]">
                    <Clock className="h-3 w-3" />
                    <span>
                      {new Date(msg.createdAt).toLocaleString("en-US", {
                        month: "short",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </span>

                  <button
                    onClick={() => handleToggleRead(msg)}
                    className="p-1 rounded-lg border border-border hover:bg-surface text-foreground transition-colors cursor-pointer"
                    title={msg.read ? "Mark as unread" : "Mark as read"}
                  >
                    {msg.read ? (
                      <MailQuestion className="h-3.5 w-3.5 text-muted-foreground" />
                    ) : (
                      <MailCheck className="h-3.5 w-3.5 text-emerald-500" />
                    )}
                  </button>

                  <button
                    onClick={() => handleDelete(msg.id, msg.name)}
                    className="p-1 rounded-lg border border-border hover:bg-red-500/10 text-red-600 dark:text-red-400 transition-colors cursor-pointer"
                    title="Delete message"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {msg.subject && (
                <div className="text-xs font-semibold text-foreground pt-1 border-t border-border/40">
                  Subject: {msg.subject}
                </div>
              )}

              <p className="text-xs sm:text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed">
                {msg.message}
              </p>

              <div className="pt-2 flex items-center justify-between border-t border-border/40">
                <a
                  href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(
                    msg.subject || "Your Inquiry to Muhammad Nur Maulana"
                  )}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-foreground text-background text-xs font-semibold hover:bg-accent hover:text-accent-foreground transition-colors shadow-2xs"
                >
                  <Mail className="h-3.5 w-3.5" />
                  <span>Reply via Email</span>
                </a>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
