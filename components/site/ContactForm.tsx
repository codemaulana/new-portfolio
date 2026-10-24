"use client";

import React, { useActionState } from "react";
import { sendContactMessageAction, type ContactActionState } from "@/lib/actions/contact";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

const initialState: ContactActionState = {};

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    sendContactMessageAction,
    initialState
  );

  return (
    <form action={formAction} className="space-y-6">
      <div className="hidden" aria-hidden="true">
        <label htmlFor="honeypot">Leave this blank</label>
        <input
          type="text"
          id="honeypot"
          name="honeypot"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {state.success && (
        <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs sm:text-sm font-medium flex items-center gap-3">
          <CheckCircle2 className="h-5 w-5 shrink-0" />
          <span>{state.message}</span>
        </div>
      )}

      {state.success === false && (
        <div className="p-4 rounded-xl border border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400 text-xs sm:text-sm font-medium flex items-center gap-3">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <span>{state.message}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="name" className="text-xs font-mono uppercase tracking-wider text-muted-foreground block">
            Your Name <span className="text-accent">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Alex Turner"
            className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
          />
          {state.errors?.name && (
            <p className="text-[11px] text-red-500 font-mono">{state.errors.name[0]}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-xs font-mono uppercase tracking-wider text-muted-foreground block">
            Email Address <span className="text-accent">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="alex@example.com"
            className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
          />
          {state.errors?.email && (
            <p className="text-[11px] text-red-500 font-mono">{state.errors.email[0]}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="subject" className="text-xs font-mono uppercase tracking-wider text-muted-foreground block">
          Subject
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          placeholder="Web App / Contract Inquiry / Collaboration"
          className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-xs font-mono uppercase tracking-wider text-muted-foreground block">
          Your Message <span className="text-accent">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          placeholder="Tell me about your project, timeline, or what you'd like to chat about..."
          className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all resize-y"
        />
        {state.errors?.message && (
          <p className="text-[11px] text-red-500 font-mono">{state.errors.message[0]}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-foreground text-background text-sm font-medium hover:bg-accent hover:text-accent-foreground disabled:opacity-50 transition-all duration-200 shadow-md"
      >
        {isPending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Sending Message...</span>
          </>
        ) : (
          <>
            <span>Send Message</span>
            <Send className="h-4 w-4" />
          </>
        )}
      </button>
    </form>
  );
}
