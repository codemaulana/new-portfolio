import React from "react";

interface BlogBannerProps {
  slug: string;
  className?: string;
}

export function BlogBanner({ slug, className = "w-full h-full" }: BlogBannerProps) {
  switch (slug) {
    case "membangun-arsitektur-web-nextjs-16-contoh":
    case "membangun-arsitektur-web-nextjs-16-skalabel":
      return (
        <div className={`relative overflow-hidden rounded-2xl bg-[#08080c] border border-border/80 flex flex-col items-center justify-center select-none text-white p-4 sm:p-6 shadow-sm ${className}`}>
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-violet-600/30 to-fuchsia-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-cyan-500/25 to-blue-600/20 rounded-full blur-3xl pointer-events-none" />

          <div className="absolute -bottom-4 -left-4 w-24 h-24 rounded-2xl bg-gradient-to-tr from-fuchsia-500/30 via-purple-500/20 to-transparent border border-white/20 blur-xs rotate-12 pointer-events-none" />

          <div className="relative z-10 flex items-center justify-center gap-4 sm:gap-6 mb-3 sm:mb-4">
            <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-white text-black flex items-center justify-center shadow-md border-2 border-white/80 shrink-0">
              <span className="font-sans font-black text-lg sm:text-xl tracking-tighter">N</span>
            </div>

            <span className="text-zinc-500 font-sans font-bold text-lg sm:text-xl">✕</span>

            <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-zinc-900 border border-white/20 flex items-center justify-center text-cyan-400 shadow-md shrink-0">
              <svg className="h-6 w-6 sm:h-7 sm:w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
                <path d="M12 12v9" />
                <path d="m8 17 4 4 4-4" />
              </svg>
            </div>
          </div>

          <div className="relative z-10 text-center space-y-1 max-w-sm sm:max-w-md px-2">
            <h3 className="font-mono font-bold text-sm sm:text-base lg:text-lg text-white tracking-tight leading-snug">
              @codemaulana/nextjs-16-architecture
            </h3>
            <p className="font-sans text-[11px] sm:text-xs text-zinc-400 line-clamp-1">
              High Performance &amp; Async Server Actions
            </p>
            <p className="font-mono text-[10px] text-zinc-500">
              by codemaulana
            </p>
          </div>
        </div>
      );

    case "solving-zustand-state-hydration-react-19":
      return (
        <div className={`relative overflow-hidden rounded-2xl bg-[#070b14] border border-border/80 flex flex-col items-center justify-center select-none text-white p-4 sm:p-6 shadow-sm ${className}`}>
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-blue-600/25 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-fuchsia-600/25 rounded-full blur-3xl pointer-events-none" />

          <div className="absolute bottom-4 right-6 h-8 w-8 rounded-full bg-gradient-to-tr from-fuchsia-500 to-indigo-500 shadow-md shadow-fuchsia-500/40 pointer-events-none" />

          <div className="relative z-10 mb-3 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <span className="font-mono text-[10px] text-zinc-400 tracking-wider">
              Effortless State Hydration for React 19
            </span>
          </div>

          <div className="relative z-10 text-center space-y-1.5 max-w-xs sm:max-w-sm px-2">
            <h3 className="font-mono font-bold text-sm sm:text-base text-white leading-snug">
              @codemaulana/<br />
              <span className="text-cyan-400">use-hydration-zustand</span>
            </h3>
            <p className="font-mono text-[10px] text-zinc-500">
              by codemaulana
            </p>
          </div>
        </div>
      );

    case "react-custom-hooks-usedebounce-optimasi-ux":
      return (
        <div className={`relative overflow-hidden rounded-2xl bg-[#050b18] border border-border/80 flex flex-col items-center justify-center select-none text-white p-4 sm:p-6 shadow-sm ${className}`}>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-900/40 via-zinc-950 to-black pointer-events-none" />

          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5">
            <div className="h-12 w-12 sm:h-16 sm:w-16 rounded-2xl bg-sky-950/60 border border-sky-500/30 flex items-center justify-center text-sky-400 shadow-md shadow-sky-500/20 shrink-0">
              <svg className="h-8 w-8 sm:h-10 sm:w-10 animate-[spin_12s_linear_infinite]" viewBox="-11.5 -10.23174 23 20.46348" fill="none">
                <circle cx="0" cy="0" r="2.05" fill="#38bdf8" />
                <g stroke="#38bdf8" strokeWidth="1" fill="none">
                  <ellipse rx="11" ry="4.2" />
                  <ellipse rx="11" ry="4.2" transform="rotate(60)" />
                  <ellipse rx="11" ry="4.2" transform="rotate(120)" />
                </g>
              </svg>
            </div>

            <div className="text-center sm:text-left space-y-0.5">
              <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-400 text-[10px] font-mono border border-sky-500/30">
                React 19 &amp; TypeScript
              </span>
              <h3 className="font-sans font-bold text-sm sm:text-base text-white">
                React Custom Hooks
              </h3>
              <p className="font-mono text-[11px] text-sky-300">
                useDebounce &amp; useThrottle
              </p>
            </div>
          </div>
        </div>
      );

    case "spa-vs-mpa-vs-hybrid-ssr-arsitektur-web-2026":
      return (
        <div className={`relative overflow-hidden rounded-2xl bg-[#090a0f] border border-border/80 flex flex-col items-center justify-center select-none text-white p-4 sm:p-6 shadow-sm ${className}`}>
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/30 via-zinc-950/80 to-blue-950/30 pointer-events-none" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

          <div className="relative z-10 text-center space-y-1.5">
            <h3 className="font-sans font-black text-xl sm:text-2xl text-white tracking-widest">
              SPA <span className="text-zinc-500 font-light">VS</span> MPA
            </h3>
            <p className="font-sans text-[11px] sm:text-xs text-emerald-400 max-w-xs mx-auto">
              Single Page vs Multi Page Architecture in Modern Web
            </p>
            <div className="flex items-center justify-center gap-1.5 pt-1">
              <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400">
                Next.js SSR
              </span>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400">
                Vite CSR
              </span>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400">
                Laravel MPA
              </span>
            </div>
          </div>
        </div>
      );

    case "strategi-state-management-flutter-riverpod-contoh":
      return (
        <div className={`relative overflow-hidden rounded-2xl bg-[#060b13] border border-border/80 flex flex-col items-center justify-center select-none text-white p-4 sm:p-6 shadow-sm ${className}`}>
          <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center text-center space-y-2">
            <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-blue-600/20 border border-blue-400/30 flex items-center justify-center text-blue-400 shadow-md shrink-0">
              <svg className="h-6 w-6 sm:h-7 sm:w-7" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14.314 0L2.3 12 6 15.7 21.684 0zm.014 11.072L7.697 17.7 11.386 21.4l6.63-6.629zM21.7 14.329l-3.685-3.686-3.686 3.686 3.686 3.685z" />
              </svg>
            </div>

            <div className="space-y-0.5">
              <h3 className="font-mono font-bold text-sm sm:text-base text-white">
                Flutter 3.x &amp; Riverpod 2.0
              </h3>
              <p className="font-sans text-[11px] sm:text-xs text-zinc-400">
                Layered Architecture for Cross-Platform Apps
              </p>
            </div>
          </div>
        </div>
      );

    case "high-performance-concurrency-golang-worker-pool":
      return (
        <div className={`relative overflow-hidden rounded-2xl bg-[#060e14] border border-border/80 flex flex-col items-center justify-center select-none text-white p-4 sm:p-6 shadow-sm ${className}`}>
          <div className="absolute top-0 left-0 w-48 h-48 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center text-center space-y-1.5">
            <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-mono border border-cyan-500/30">
              Golang Microservices &amp; Concurrency
            </span>
            <h3 className="font-mono font-bold text-sm sm:text-base lg:text-lg text-white">
              Worker Pool &amp; Buffered Channels
            </h3>
            <p className="font-mono text-[11px] text-zinc-400">
              Low Latency Queue Engine
            </p>
          </div>
        </div>
      );

    case "sub-millisecond-cache-invalidation-redis-nextjs-16":
      return (
        <div className={`relative overflow-hidden rounded-2xl bg-[#110508] border border-border/80 flex flex-col items-center justify-center select-none text-white p-4 sm:p-6 shadow-sm ${className}`}>
          <div className="absolute top-0 right-0 w-48 h-48 bg-red-600/25 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-orange-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col items-center text-center space-y-1.5">
            <span className="px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 text-[10px] font-mono border border-red-500/30">
              Redis &amp; Next.js 16 Caching
            </span>
            <h3 className="font-mono font-bold text-sm sm:text-base text-white">
              Sub-Millisecond Cache Invalidation
            </h3>
            <p className="font-mono text-[10px] text-zinc-400">
              High Throughput In-Memory Layer
            </p>
          </div>
        </div>
      );

    case "architecting-resilient-grpc-microservices-golang":
      return (
        <div className={`relative overflow-hidden rounded-2xl bg-[#050b18] border border-border/80 flex flex-col items-center justify-center select-none text-white p-4 sm:p-6 shadow-sm ${className}`}>
          <div className="absolute top-0 left-0 w-48 h-48 bg-cyan-600/25 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-indigo-600/25 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col items-center text-center space-y-1.5">
            <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-mono border border-cyan-500/30">
              Go &amp; Protocol Buffers
            </span>
            <h3 className="font-mono font-bold text-sm sm:text-base text-white">
              Production gRPC Microservices
            </h3>
            <p className="font-mono text-[10px] text-zinc-400">
              Interceptor Chains &amp; Resilient RPC
            </p>
          </div>
        </div>
      );

    case "offline-first-sqlite-synchronization-flutter":
      return (
        <div className={`relative overflow-hidden rounded-2xl bg-[#060e18] border border-border/80 flex flex-col items-center justify-center select-none text-white p-4 sm:p-6 shadow-sm ${className}`}>
          <div className="absolute top-0 right-0 w-48 h-48 bg-sky-600/25 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col items-center text-center space-y-1.5">
            <span className="px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 text-[10px] font-mono border border-sky-500/30">
              Flutter &amp; SQLite Local Storage
            </span>
            <h3 className="font-mono font-bold text-sm sm:text-base text-white">
              Offline-First Sync Engine
            </h3>
            <p className="font-mono text-[10px] text-zinc-400">
              Idempotent Exponential Backoff
            </p>
          </div>
        </div>
      );

    default:
      return (
        <div className={`relative overflow-hidden rounded-2xl bg-zinc-950 border border-border/80 flex flex-col items-center justify-center select-none text-white p-4 sm:p-6 shadow-sm ${className}`}>
          <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 via-transparent to-primary/20 pointer-events-none" />
          <div className="relative z-10 text-center space-y-1">
            <h3 className="font-mono font-bold text-sm text-white">
              @codemaulana/journal
            </h3>
            <p className="font-sans text-xs text-zinc-400">
              Software Engineering &amp; Modern Web Insights
            </p>
          </div>
        </div>
      );
  }
}
