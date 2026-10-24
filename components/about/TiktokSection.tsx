"use client";

import React, { useEffect, useState, useRef } from "react";
import Script from "next/script";
import { ExternalLink, RefreshCw, Sparkles, Play, Video, ArrowUpRight } from "lucide-react";

// Official TikTok Icon
function TikTokIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z" />
    </svg>
  );
}

export function TiktokSection() {
  const username = "elitescr";
  const tiktokUrl = `https://www.tiktok.com/@${username}`;
  const displayName = "Maulana || Software Engineer";

  const [reloadKey, setReloadKey] = useState(0);
  const [embedState, setEmbedState] = useState<"loading" | "ready" | "fallback">("loading");
  const containerRef = useRef<HTMLDivElement>(null);

  // track whether TikTok CDN renders or stalls
  useEffect(() => {
    setEmbedState("loading");

    // rescan DOM if TikTok script is already cached on window
    // @ts-expect-error - tiktokEmbed attached by embed.js
    if (typeof window !== "undefined" && window.tiktokEmbed?.scan) {
      // @ts-expect-error
      window.tiktokEmbed.scan();
    }

    // poll for iframe height so we know when content actually painted
    const interval = setInterval(() => {
      if (containerRef.current) {
        const iframe = containerRef.current.querySelector("iframe");
        if (iframe && iframe.clientHeight > 100) {
          setEmbedState("ready");
          clearInterval(interval);
        }
      }
    }, 500);

    // bail out to native card if TikTok CDN hangs or gets blocked by adblockers
    const timeout = setTimeout(() => {
      setEmbedState((prev) => {
        if (prev === "loading") {
          return "fallback";
        }
        return prev;
      });
      clearInterval(interval);
    }, 3800);

    // TikTok postMessage ping confirms iframe rendered
    const handleMessage = (e: MessageEvent) => {
      if (typeof e.data === "string" && e.data.includes("__tt_embed__")) {
        setEmbedState("ready");
        clearInterval(interval);
      }
    };
    window.addEventListener("message", handleMessage);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
      window.removeEventListener("message", handleMessage);
    };
  }, [reloadKey]);

  return (
    <section className="space-y-4" id="tiktok">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2 text-foreground font-semibold text-lg sm:text-xl">
            <TikTokIcon className="h-5 w-5 text-foreground" />
            <h2 className="capitalize">Tiktok</h2>
          </div>
          <p className="text-xs text-muted-foreground font-light">
            Find me on tiktok • Official Creator Profile
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              setEmbedState("loading");
              setReloadKey((k) => k + 1);
            }}
            title="Muat Ulang Widget TikTok"
            className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1.5 transition-colors px-2.5 py-1.5 rounded-lg border border-border/60 hover:bg-surface/50"
          >
            <RefreshCw className={`h-3 w-3 ${embedState === "loading" ? "animate-spin text-accent" : ""}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>

          <a
            href={tiktokUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors px-2 py-1 rounded-md group"
          >
            <span>@{username}</span>
            <ExternalLink className="h-3 w-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>

      <div
        ref={containerRef}
        className="w-full relative rounded-2xl border border-border/80 bg-surface/30 backdrop-blur-xs p-3 sm:p-5 overflow-hidden transition-all duration-300"
      >
        {embedState === "loading" && (
          <div className="py-10 px-4 flex flex-col items-center justify-center text-center space-y-3">
            <div className="h-10 w-10 rounded-full bg-surface border border-border flex items-center justify-center shadow-xs">
              <TikTokIcon className="h-5 w-5 text-[#fe2c55] animate-pulse" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-foreground">
                Connecting to TikTok @{username}...
              </p>
              <p className="text-xs text-muted-foreground">
                Loading creator data from TikTok CDN
              </p>
            </div>
          </div>
        )}

        <div
          className={`flex justify-center transition-opacity duration-300 ${
            embedState === "ready" ? "opacity-100" : "hidden"
          }`}
        >
          <blockquote
            key={reloadKey}
            data-testid="tiktok-embed"
            className="tiktok-embed w-full max-w-[780px]"
            cite={tiktokUrl}
            data-unique-id={username}
            data-embed-type="creator"
            style={{ maxWidth: "780px", minWidth: "288px", margin: "0 auto" }}
          >
            <section className="text-center py-4 text-xs text-muted-foreground">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`${tiktokUrl}?refer=creator_embed`}
              >
                @{username}
              </a>
            </section>
          </blockquote>
        </div>

        {embedState === "fallback" && (
          <div className="space-y-5 p-2 sm:p-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="relative h-16 w-16 sm:h-18 sm:w-18 rounded-2xl bg-gradient-to-br from-[#008f7a] to-[#005f52] text-white flex items-center justify-center font-sans font-bold text-2xl shadow-md shrink-0 border-2 border-border/80 select-none">
                  M
                  <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-zinc-950 border-2 border-background flex items-center justify-center text-white shadow-xs">
                    <TikTokIcon className="h-3 w-3 text-[#fe2c55]" />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-sans font-bold text-base sm:text-lg text-foreground leading-tight">
                      {displayName}
                    </h3>
                    <span className="text-xs font-mono text-muted-foreground">(@{username})</span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-[10px] font-mono">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Live Account
                    </span>
                  </div>

                  <p className="text-xs text-muted-foreground font-light max-w-xl">
                    Software Engineer &amp; Tech Creator • Web architecture, Next.js &amp; Flutter builds, clean code tips, and dev life.
                  </p>
                </div>
              </div>

              <a
                href={tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-[#fe2c55] hover:bg-[#e02449] text-white text-xs font-semibold tracking-wide transition-all shadow-xs self-start sm:self-auto flex items-center gap-2 group shrink-0"
              >
                <TikTokIcon className="h-4 w-4" />
                <span>Open TikTok</span>
                <ArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 border-t border-border/60">
              <a
                href={tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-surface/50 border border-border/50 hover:border-[#fe2c55]/50 transition-all group flex items-start gap-3"
              >
                <div className="h-8 w-8 rounded-lg bg-surface border border-border flex items-center justify-center shrink-0 text-[#fe2c55] group-hover:scale-105 transition-transform">
                  <Play className="h-3.5 w-3.5 fill-current" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-xs font-semibold text-foreground group-hover:text-accent transition-colors">
                    Web &amp; Backend Engineering
                  </h4>
                  <p className="text-[11px] text-muted-foreground">
                    Next.js, Go, Laravel, Docker
                  </p>
                </div>
              </a>

              <a
                href={tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-surface/50 border border-border/50 hover:border-[#fe2c55]/50 transition-all group flex items-start gap-3"
              >
                <div className="h-8 w-8 rounded-lg bg-surface border border-border flex items-center justify-center shrink-0 text-[#fe2c55] group-hover:scale-105 transition-transform">
                  <Video className="h-3.5 w-3.5" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-xs font-semibold text-foreground group-hover:text-accent transition-colors">
                    Clean Code &amp; Career
                  </h4>
                  <p className="text-[11px] text-muted-foreground">
                    Patterns, interviews &amp; workflows
                  </p>
                </div>
              </a>

              <a
                href={tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-surface/50 border border-border/50 hover:border-[#fe2c55]/50 transition-all group flex items-start gap-3"
              >
                <div className="h-8 w-8 rounded-lg bg-surface border border-border flex items-center justify-center shrink-0 text-[#fe2c55] group-hover:scale-105 transition-transform">
                  <Sparkles className="h-3.5 w-3.5" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-xs font-semibold text-foreground group-hover:text-accent transition-colors">
                    Dev Life &amp; Humor
                  </h4>
                  <p className="text-[11px] text-muted-foreground">
                    Realities of shipping software
                  </p>
                </div>
              </a>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-muted-foreground">
              <span className="text-[11px]">
                Official TikTok account: <strong>@{username}</strong>
              </span>
              <button
                onClick={() => {
                  setEmbedState("loading");
                  setReloadKey((k) => k + 1);
                }}
                className="text-[11px] text-accent hover:underline flex items-center gap-1 self-start sm:self-auto"
              >
                <RefreshCw className="h-3 w-3" />
                <span>Retry loading official widget</span>
              </button>
            </div>
          </div>
        )}
      </div>

      <Script
        id="tiktok-embed-script"
        src="https://www.tiktok.com/embed.js"
        strategy="lazyOnload"
        onLoad={() => {
          // @ts-expect-error - tiktokEmbed scan after script loads
          if (typeof window !== "undefined" && window.tiktokEmbed?.scan) {
            // @ts-expect-error
            window.tiktokEmbed.scan();
          }
        }}
      />
    </section>
  );
}
