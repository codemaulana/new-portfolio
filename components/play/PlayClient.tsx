"use client";

import React, { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { MemoryMatchGame } from "./MemoryMatchGame";
import { TicTacToeGame } from "./TicTacToeGame";
import {
  Gamepad2,
  Sparkles,
  Grid3X3,
  Dices,
  Code2,
  ArrowRight,
  Cpu,
  Layers,
} from "lucide-react";

type ActiveGame = "memory" | "tictactoe";

export function PlayClient() {
  const [activeGame, setActiveGame] = useState<ActiveGame>("memory");

  return (
    <div className="space-y-8 sm:space-y-10">
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
          <div className="space-y-1.5">
            <h1 className="font-sans text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              Game Corner
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed">
              Lightweight interactive browser games built with pure React, CSS 3D transforms, and algorithmic logic.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-accent/30 bg-accent/10 text-accent shadow-2xs self-start sm:self-auto shrink-0">
            <Gamepad2 className="h-4 w-4" />
            <span className="text-xs font-mono font-medium">Interactive Playground</span>
          </div>
        </div>

        <div className="border-b border-dashed border-border/80 pt-1" />
      </div>

      <div className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
        <button
          onClick={() => setActiveGame("memory")}
          className={cn(
            "inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap shadow-2xs cursor-pointer active:scale-95 shrink-0",
            activeGame === "memory"
              ? "bg-foreground text-background shadow-xs font-semibold"
              : "bg-surface/80 hover:bg-surface border border-border/80 text-muted-foreground hover:text-foreground"
          )}
        >
          <Sparkles className="h-4 w-4" />
          <span>Tech Stack Memory Match</span>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-accent/20 text-accent">
            Easiest
          </span>
        </button>

        <button
          onClick={() => setActiveGame("tictactoe")}
          className={cn(
            "inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap shadow-2xs cursor-pointer active:scale-95 shrink-0",
            activeGame === "tictactoe"
              ? "bg-foreground text-background shadow-xs font-semibold"
              : "bg-surface/80 hover:bg-surface border border-border/80 text-muted-foreground hover:text-foreground"
          )}
        >
          <Grid3X3 className="h-4 w-4" />
          <span>Tic-Tac-Toe Minimax AI</span>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-surface border border-border/60 text-muted-foreground">
            Algorithm
          </span>
        </button>
      </div>

      <div className="min-h-105">
        {activeGame === "memory" && <MemoryMatchGame />}
        {activeGame === "tictactoe" && <TicTacToeGame />}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        <div className="p-4 sm:p-5 rounded-2xl border border-border/80 bg-surface/30 space-y-1.5 shadow-2xs">
          <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
            <Cpu className="h-4 w-4 text-accent" />
            <span>Under The Hood</span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Memory Match runs Fisher-Yates array shuffling with 3D CSS perspective card flips. Tic-Tac-Toe uses minimax recursion with alpha-pruning logic.
          </p>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl border border-border/80 bg-surface/30 space-y-1.5 shadow-2xs">
          <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
            <Layers className="h-4 w-4 text-accent" />
            <span>Local State &amp; Privacy</span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Your best scores and match streaks are stored locally on your device using the browser Storage API. No cookies, tracking, or network calls.
          </p>
        </div>
      </div>

      <section className="p-6 sm:p-8 rounded-3xl border border-border/80 bg-surface/50 backdrop-blur-md text-center space-y-3.5 shadow-sm">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/15 text-accent text-xs font-mono uppercase tracking-wider font-semibold">
          <Code2 className="h-3.5 w-3.5" />
          <span>Real-World Work</span>
        </div>

        <h2 className="font-sans text-xl sm:text-2xl font-bold tracking-tight text-foreground max-w-lg mx-auto">
          Looking for custom software platforms or web apps?
        </h2>

        <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
          I build fullstack applications across Next.js, Go, Laravel, and Flutter with clean architecture.
        </p>

        <div className="pt-1.5 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-foreground text-background text-xs sm:text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-all duration-200 shadow-xs"
          >
            <span>View Client Projects</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border bg-surface text-foreground text-xs sm:text-sm font-medium hover:border-accent hover:text-accent transition-all duration-200 shadow-xs"
          >
            <span>Contact Me</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
