"use client";

import React, { Suspense, useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Eye,
  EyeOff,
  ArrowLeft,
} from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (!res || res.error) {
        setErrorMsg("Invalid email or password. Check your credentials and try again.");
        setIsLoading(false);
        return;
      }

      router.push(callbackUrl);
      router.refresh();
    } catch {
      setErrorMsg("An unexpected error occurred during sign in. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-6 sm:p-8 rounded-3xl border border-border/80 bg-surface/70 shadow-xl backdrop-blur-xl space-y-6">
      <div className="text-center space-y-2">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-border/80 bg-background text-accent mb-1 shadow-2xs">
          <ShieldCheck className="h-6 w-6" />
        </div>
        <h1 className="font-sans font-bold text-2xl sm:text-3xl tracking-tight text-foreground">
          Admin Portal
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          Sign in to manage projects, articles, contact messages, and site configuration.
        </p>
      </div>

      {errorMsg && (
        <div className="flex items-start gap-2.5 p-3 rounded-xl border border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400 text-xs font-medium animate-in fade-in-50">
          <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
            Admin Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@domain.com"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-hidden focus:ring-2 focus:ring-accent/40 transition-all"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-hidden focus:ring-2 focus:ring-accent/40 transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1 transition-colors"
              title={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-2 inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-foreground text-background text-sm font-semibold hover:bg-accent hover:text-accent-foreground disabled:opacity-50 transition-all duration-200 shadow-xs cursor-pointer active:scale-95"
        >
          {isLoading ? (
            <span>Verifying session...</span>
          ) : (
            <>
              <span>Sign In to Dashboard</span>
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </form>

      <div className="flex items-center justify-between pt-2 border-t border-border/40 text-xs">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors font-mono text-[11px]"
        >
          <ArrowLeft className="h-3 w-3" />
          <span>Back to Portfolio</span>
        </Link>

        <span className="text-[11px] text-muted-foreground font-mono">
          Auth.js JWT Session
        </span>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background atelier-grid-pattern relative">
      <Suspense fallback={<div className="text-sm font-mono text-muted-foreground">Loading portal...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
