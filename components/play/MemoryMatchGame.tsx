"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { cn } from "@/lib/utils";
import {
  NextjsIcon,
  ReactIcon,
  TypeScriptIcon,
  TailwindIcon,
  LaravelIcon,
  GolangIcon,
  FlutterIcon,
  PostgresIcon,
} from "@/components/about/BrandIcons";
import {
  RotateCcw,
  Trophy,
  Timer,
  Sparkles,
  Zap,
  CheckCircle2,
  Volume2,
  VolumeX,
} from "lucide-react";

interface TechCardItem {
  id: string;
  name: string;
  color: string;
  IconComponent: React.ComponentType<{ className?: string }>;
}

const AVAILABLE_TECHS: TechCardItem[] = [
  { id: "nextjs", name: "Next.js", color: "#ffffff", IconComponent: NextjsIcon },
  { id: "react", name: "React", color: "#61dafb", IconComponent: ReactIcon },
  { id: "typescript", name: "TypeScript", color: "#3178c6", IconComponent: TypeScriptIcon },
  { id: "tailwind", name: "Tailwind", color: "#38bdf8", IconComponent: TailwindIcon },
  { id: "laravel", name: "Laravel", color: "#ff2d20", IconComponent: LaravelIcon },
  { id: "golang", name: "Go", color: "#00add8", IconComponent: GolangIcon },
  { id: "flutter", name: "Flutter", color: "#02569b", IconComponent: FlutterIcon },
  { id: "postgres", name: "PostgreSQL", color: "#336791", IconComponent: PostgresIcon },
];

interface CardState {
  uid: number;
  techId: string;
  name: string;
  color: string;
  IconComponent: React.ComponentType<{ className?: string }>;
  isFlipped: boolean;
  isMatched: boolean;
}

export function MemoryMatchGame() {
  const [difficulty, setDifficulty] = useState<"casual" | "master">("master");
  const [cards, setCards] = useState<CardState[]>([]);
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isGameActive, setIsGameActive] = useState(false);
  const [isGameWon, setIsGameWon] = useState(false);
  const [bestMoves, setBestMoves] = useState<number | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const totalPairs = difficulty === "casual" ? 6 : 8;

  // Load best moves from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(`codemaulana_memory_best_${difficulty}`);
      if (stored) {
        setBestMoves(parseInt(stored, 10));
      } else {
        setBestMoves(null);
      }
    } catch {
      // Local storage fallback
    }
  }, [difficulty]);

  // Shuffle and initialize cards
  const startNewGame = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;

    const pool = AVAILABLE_TECHS.slice(0, totalPairs);
    const doubled = [...pool, ...pool];

    // Fisher-Yates shuffle
    for (let i = doubled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = doubled[i]!;
      doubled[i] = doubled[j]!;
      doubled[j] = temp;
    }

    const initialCards: CardState[] = doubled.map((item, index) => ({
      uid: index,
      techId: item.id,
      name: item.name,
      color: item.color,
      IconComponent: item.IconComponent,
      isFlipped: false,
      isMatched: false,
    }));

    setCards(initialCards);
    setSelectedCards([]);
    setMoves(0);
    setMatchedPairs(0);
    setIsProcessing(false);
    setElapsedSeconds(0);
    setIsGameActive(false);
    setIsGameWon(false);
  }, [totalPairs]);

  // Initialize on mount or difficulty change
  useEffect(() => {
    startNewGame();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startNewGame]);

  // Timer runner
  useEffect(() => {
    if (isGameActive && !isGameWon) {
      timerRef.current = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isGameActive, isGameWon]);

  // Card click handler
  const handleCardClick = (index: number) => {
    if (isProcessing) return;

    const card = cards[index];
    if (!card || card.isFlipped || card.isMatched) return;

    // Start timer on first card flip
    if (!isGameActive) {
      setIsGameActive(true);
    }

    // Flip the clicked card
    const updatedCards = [...cards];
    updatedCards[index] = { ...card, isFlipped: true };
    setCards(updatedCards);

    const newSelected = [...selectedCards, index];
    setSelectedCards(newSelected);

    // If two cards are now selected, check match
    if (newSelected.length === 2) {
      setIsProcessing(true);
      setMoves((m) => m + 1);

      const firstIndex = newSelected[0]!;
      const secondIndex = newSelected[1]!;
      const firstCard = updatedCards[firstIndex];
      const secondCard = updatedCards[secondIndex];

      if (!firstCard || !secondCard) {
        setIsProcessing(false);
        return;
      }

      if (firstCard.techId === secondCard.techId) {
        // MATCH!
        setTimeout(() => {
          setCards((prev) => {
            const next = [...prev];
            const c1 = next[firstIndex];
            const c2 = next[secondIndex];
            if (c1 && c2) {
              next[firstIndex] = { ...c1, isMatched: true };
              next[secondIndex] = { ...c2, isMatched: true };
            }
            return next;
          });
          setSelectedCards([]);
          setIsProcessing(false);

          setMatchedPairs((mp) => {
            const newCount = mp + 1;
            if (newCount === totalPairs) {
              handleVictory(moves + 1);
            }
            return newCount;
          });
        }, 350);
      } else {
        // NO MATCH: flip back after brief pause
        setTimeout(() => {
          setCards((prev) => {
            const next = [...prev];
            const c1 = next[firstIndex];
            const c2 = next[secondIndex];
            if (c1 && c2) {
              next[firstIndex] = { ...c1, isFlipped: false };
              next[secondIndex] = { ...c2, isFlipped: false };
            }
            return next;
          });
          setSelectedCards([]);
          setIsProcessing(false);
        }, 850);
      }
    }
  };

  const handleVictory = (finalMoves: number) => {
    setIsGameWon(true);
    setIsGameActive(false);

    try {
      const currentBest = localStorage.getItem(`codemaulana_memory_best_${difficulty}`);
      if (!currentBest || finalMoves < parseInt(currentBest, 10)) {
        localStorage.setItem(`codemaulana_memory_best_${difficulty}`, finalMoves.toString());
        setBestMoves(finalMoves);
      }
    } catch {
      // Fallback
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="space-y-6">
      <div className="p-4 sm:p-5 rounded-2xl border border-border/80 bg-surface/50 backdrop-blur-md shadow-2xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex p-1 rounded-xl bg-surface border border-border text-xs font-medium">
            <button
              onClick={() => {
                if (difficulty !== "casual") {
                  setDifficulty("casual");
                }
              }}
              className={cn(
                "px-3 py-1.5 rounded-lg transition-all",
                difficulty === "casual"
                  ? "bg-foreground text-background font-semibold shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Casual (12)
            </button>
            <button
              onClick={() => {
                if (difficulty !== "master") {
                  setDifficulty("master");
                }
              }}
              className={cn(
                "px-3 py-1.5 rounded-lg transition-all",
                difficulty === "master"
                  ? "bg-foreground text-background font-semibold shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Master (16)
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={startNewGame}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border bg-surface hover:bg-surface/80 text-foreground text-xs font-medium transition-all shadow-2xs cursor-pointer active:scale-95"
              title="Shuffle and start over"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Restart</span>
            </button>

            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-1.5 rounded-xl border border-border bg-surface text-muted-foreground hover:text-foreground transition-all"
              title={soundEnabled ? "Mute sounds" : "Enable sounds"}
            >
              {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2 sm:gap-3 text-center">
          <div className="p-2 sm:p-2.5 rounded-xl border border-border/60 bg-background/60 space-y-0.5">
            <div className="text-[10px] font-mono uppercase text-muted-foreground flex items-center justify-center gap-1">
              <Zap className="h-3 w-3 text-amber-500" />
              <span className="hidden sm:inline">Moves</span>
            </div>
            <div className="font-mono text-sm sm:text-lg font-bold text-foreground">
              {moves}
            </div>
          </div>

          <div className="p-2 sm:p-2.5 rounded-xl border border-border/60 bg-background/60 space-y-0.5">
            <div className="text-[10px] font-mono uppercase text-muted-foreground flex items-center justify-center gap-1">
              <Timer className="h-3 w-3 text-sky-500" />
              <span className="hidden sm:inline">Time</span>
            </div>
            <div className="font-mono text-sm sm:text-lg font-bold text-foreground">
              {formatTime(elapsedSeconds)}
            </div>
          </div>

          <div className="p-2 sm:p-2.5 rounded-xl border border-border/60 bg-background/60 space-y-0.5">
            <div className="text-[10px] font-mono uppercase text-muted-foreground flex items-center justify-center gap-1">
              <CheckCircle2 className="h-3 w-3 text-emerald-500" />
              <span className="hidden sm:inline">Pairs</span>
            </div>
            <div className="font-mono text-sm sm:text-lg font-bold text-foreground">
              {matchedPairs}/{totalPairs}
            </div>
          </div>

          <div className="p-2 sm:p-2.5 rounded-xl border border-border/60 bg-background/60 space-y-0.5">
            <div className="text-[10px] font-mono uppercase text-muted-foreground flex items-center justify-center gap-1">
              <Trophy className="h-3 w-3 text-accent" />
              <span className="hidden sm:inline">Best</span>
            </div>
            <div className="font-mono text-sm sm:text-lg font-bold text-accent">
              {bestMoves !== null ? `${bestMoves}m` : "—"}
            </div>
          </div>
        </div>
      </div>

      {isGameWon && (
        <div className="p-5 sm:p-6 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 dark:bg-emerald-500/15 text-center space-y-3 animate-in zoom-in-95 duration-300">
          <div className="inline-flex p-3 rounded-2xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
            <Sparkles className="h-7 w-7 animate-bounce" />
          </div>
          <div className="space-y-1">
            <h3 className="font-sans font-bold text-xl sm:text-2xl text-foreground">
              Level Solved!
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-sm mx-auto">
              Matched all {totalPairs} tech pairs in <strong className="text-foreground">{moves} moves</strong> and <strong className="text-foreground">{formatTime(elapsedSeconds)}</strong>.
            </p>
          </div>
          <button
            onClick={startNewGame}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-foreground text-background text-xs font-semibold hover:bg-accent hover:text-accent-foreground transition-all shadow-xs cursor-pointer active:scale-95"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Play Another Round</span>
          </button>
        </div>
      )}

      <div
        className={cn(
          "grid gap-2.5 sm:gap-3.5 select-none",
          difficulty === "casual"
            ? "grid-cols-3 sm:grid-cols-4 max-w-md mx-auto"
            : "grid-cols-4 max-w-lg mx-auto"
        )}
      >
        {cards.map((card, idx) => {
          const Icon = card.IconComponent;
          const isRevealed = card.isFlipped || card.isMatched;

          return (
            <button
              key={card.uid}
              onClick={() => handleCardClick(idx)}
              disabled={isRevealed || isProcessing}
              aria-label={isRevealed ? card.name : "Hidden card"}
              className={cn(
                "group relative aspect-square rounded-2xl transition-all duration-300 cursor-pointer [perspective:1000px] active:scale-95 focus:outline-hidden",
                card.isMatched && "opacity-85 pointer-events-none"
              )}
            >
              <div
                className={cn(
                  "w-full h-full rounded-2xl transition-transform duration-500 [transform-style:preserve-3d] shadow-2xs border",
                  isRevealed
                    ? "[transform:rotateY(180deg)] border-accent/40 bg-surface/90"
                    : "border-border/80 bg-surface/40 hover:bg-surface/70 hover:border-accent/40"
                )}
              >
                <div className="absolute inset-0 w-full h-full rounded-2xl flex flex-col items-center justify-center [backface-visibility:hidden] text-muted-foreground/60 group-hover:text-foreground transition-colors">
                  <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-xl border border-border/80 bg-background/50 flex items-center justify-center text-[10px] sm:text-xs font-mono font-bold">
                    DA
                  </div>
                </div>

                <div
                  className={cn(
                    "absolute inset-0 w-full h-full rounded-2xl flex flex-col items-center justify-center gap-1 p-2 [backface-visibility:hidden] [transform:rotateY(180deg)]",
                    card.isMatched
                      ? "bg-emerald-500/10 border-emerald-500/30"
                      : "bg-surface"
                  )}
                >
                  <div className="h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center shrink-0">
                    <Icon className="h-6 w-6 sm:h-8 sm:w-8" />
                  </div>
                  <span className="text-[10px] sm:text-xs font-mono font-semibold text-foreground truncate max-w-full">
                    {card.name}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
