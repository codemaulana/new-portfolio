"use client";

import React, { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { RotateCcw, Bot, User, Sparkles, Trophy } from "lucide-react";

type Player = "X" | "O" | null;
type BoardState = Player[];
type GameMode = "ai-smart" | "ai-casual" | "pvp";

const WINNING_COMBOS: readonly [number, number, number][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
] as const;

function checkWinner(board: BoardState): { winner: Player; line: readonly [number, number, number] | null } {
  for (const combo of WINNING_COMBOS) {
    const [a, b, c] = combo;
    const cellA = board[a];
    const cellB = board[b];
    const cellC = board[c];
    if (cellA && cellA === cellB && cellA === cellC) {
      return { winner: cellA, line: combo };
    }
  }
  if (board.every((cell) => cell !== null)) {
    return { winner: null, line: null }; // Draw
  }
  return { winner: null, line: null };
}

// Minimax algorithm for unbeatable AI
function minimax(
  board: BoardState,
  depth: number,
  isMaximizing: boolean
): { score: number; move?: number } {
  const result = checkWinner(board);

  if (result.winner === "O") return { score: 10 - depth };
  if (result.winner === "X") return { score: depth - 10 };
  if (board.every((cell) => cell !== null)) return { score: 0 };

  const availableMoves: number[] = [];
  board.forEach((cell, idx) => {
    if (cell === null) availableMoves.push(idx);
  });

  if (isMaximizing) {
    let maxScore = -Infinity;
    let bestMove = availableMoves[0];

    for (const move of availableMoves) {
      board[move] = "O";
      const { score } = minimax(board, depth + 1, false);
      board[move] = null;

      if (score > maxScore) {
        maxScore = score;
        bestMove = move;
      }
    }
    return { score: maxScore, move: bestMove };
  } else {
    let minScore = Infinity;
    let bestMove = availableMoves[0];

    for (const move of availableMoves) {
      board[move] = "X";
      const { score } = minimax(board, depth + 1, true);
      board[move] = null;

      if (score < minScore) {
        minScore = score;
        bestMove = move;
      }
    }
    return { score: minScore, move: bestMove };
  }
}

export function TicTacToeGame() {
  const [board, setBoard] = useState<BoardState>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [mode, setMode] = useState<GameMode>("ai-smart");
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [scores, setScores] = useState({ x: 0, o: 0, draws: 0 });

  const { winner, line: winningLine } = checkWinner(board);
  const isDraw = !winner && board.every((cell) => cell !== null);
  const isGameOver = Boolean(winner) || isDraw;

  // Load scores
  useEffect(() => {
    try {
      const saved = localStorage.getItem("codemaulana_tictactoe_scores");
      if (saved) {
        setScores(JSON.parse(saved));
      }
    } catch {
      // Fallback
    }
  }, []);

  const resetBoard = useCallback(() => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setIsAiThinking(false);
  }, []);

  const resetAllScores = () => {
    setScores({ x: 0, o: 0, draws: 0 });
    try {
      localStorage.removeItem("codemaulana_tictactoe_scores");
    } catch {
      // Fallback
    }
    resetBoard();
  };

  const updateScores = useCallback((outcome: "x" | "o" | "draw") => {
    setScores((prev) => {
      const next = {
        ...prev,
        [outcome === "draw" ? "draws" : outcome]: prev[outcome === "draw" ? "draws" : outcome] + 1,
      };
      try {
        localStorage.setItem("codemaulana_tictactoe_scores", JSON.stringify(next));
      } catch {
        // Fallback
      }
      return next;
    });
  }, []);

  // Handle winner update
  useEffect(() => {
    if (winner === "X") updateScores("x");
    else if (winner === "O") updateScores("o");
    else if (isDraw) updateScores("draw");
  }, [winner, isDraw, updateScores]);

  // AI Move
  useEffect(() => {
    if (!isXNext && (mode === "ai-smart" || mode === "ai-casual") && !isGameOver) {
      setIsAiThinking(true);

      const timer = setTimeout(() => {
        let chosenMove: number;

        if (mode === "ai-smart") {
          const result = minimax([...board], 0, true);
          chosenMove = result.move ?? 0;
        } else {
          // Casual: 50% random / 50% smart
          const emptyIndices: number[] = [];
          board.forEach((val, i) => {
            if (val === null) emptyIndices.push(i);
          });

          if (Math.random() > 0.5) {
            const randomIdx = Math.floor(Math.random() * emptyIndices.length);
            chosenMove = emptyIndices[randomIdx] ?? 0;
          } else {
            const result = minimax([...board], 0, true);
            chosenMove = result.move ?? emptyIndices[0] ?? 0;
          }
        }

        setBoard((prev) => {
          const next = [...prev];
          next[chosenMove] = "O";
          return next;
        });
        setIsXNext(true);
        setIsAiThinking(false);
      }, 400);

      return () => clearTimeout(timer);
    }
  }, [isXNext, mode, isGameOver, board]);

  const handleCellClick = (idx: number) => {
    if (board[idx] || isGameOver || isAiThinking) return;

    const next = [...board];
    next[idx] = "X";
    setBoard(next);
    setIsXNext(false);
  };

  return (
    <div className="space-y-6">
      <div className="p-4 sm:p-5 rounded-2xl border border-border/80 bg-surface/50 backdrop-blur-md shadow-2xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex p-1 rounded-xl bg-surface border border-border text-xs font-medium">
            <button
              onClick={() => {
                setMode("ai-smart");
                resetBoard();
              }}
              className={cn(
                "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all",
                mode === "ai-smart"
                  ? "bg-foreground text-background font-semibold shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Bot className="h-3.5 w-3.5" />
              <span>Smart AI</span>
            </button>

            <button
              onClick={() => {
                setMode("ai-casual");
                resetBoard();
              }}
              className={cn(
                "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all",
                mode === "ai-casual"
                  ? "bg-foreground text-background font-semibold shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Casual AI</span>
            </button>

            <button
              onClick={() => {
                setMode("pvp");
                resetBoard();
              }}
              className={cn(
                "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all",
                mode === "pvp"
                  ? "bg-foreground text-background font-semibold shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <User className="h-3.5 w-3.5" />
              <span>2-Player</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={resetBoard}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border bg-surface hover:bg-surface/80 text-foreground text-xs font-medium transition-all shadow-2xs cursor-pointer active:scale-95"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>New Round</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:gap-3 text-center">
          <div className="p-2 sm:p-2.5 rounded-xl border border-border/60 bg-background/60 space-y-0.5">
            <div className="text-[10px] font-mono uppercase text-muted-foreground flex items-center justify-center gap-1">
              <span className="font-bold text-accent">X</span>
              <span>Player</span>
            </div>
            <div className="font-mono text-sm sm:text-lg font-bold text-foreground">
              {scores.x}
            </div>
          </div>

          <div className="p-2 sm:p-2.5 rounded-xl border border-border/60 bg-background/60 space-y-0.5">
            <div className="text-[10px] font-mono uppercase text-muted-foreground flex items-center justify-center gap-1">
              <span>Draws</span>
            </div>
            <div className="font-mono text-sm sm:text-lg font-bold text-muted-foreground">
              {scores.draws}
            </div>
          </div>

          <div className="p-2 sm:p-2.5 rounded-xl border border-border/60 bg-background/60 space-y-0.5">
            <div className="text-[10px] font-mono uppercase text-muted-foreground flex items-center justify-center gap-1">
              <span className="font-bold text-sky-500">O</span>
              <span>{mode === "pvp" ? "Player 2" : "Maulana AI"}</span>
            </div>
            <div className="font-mono text-sm sm:text-lg font-bold text-foreground">
              {scores.o}
            </div>
          </div>
        </div>
      </div>

      <div className="text-center py-1">
        {winner ? (
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono text-xs font-semibold">
            <Trophy className="h-3.5 w-3.5" />
            <span>Winner: Player {winner}!</span>
          </div>
        ) : isDraw ? (
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-surface text-muted-foreground font-mono text-xs font-medium">
            <span>It&apos;s a Stalemate Draw!</span>
          </div>
        ) : isAiThinking ? (
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/30 bg-accent/10 text-accent font-mono text-xs font-medium animate-pulse">
            <Bot className="h-3.5 w-3.5" />
            <span>Maulana AI is calculating move...</span>
          </div>
        ) : (
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-surface text-muted-foreground font-mono text-xs font-medium">
            <span>Current Turn: </span>
            <span className={cn("font-bold", isXNext ? "text-accent" : "text-sky-500")}>
              Player {isXNext ? "X" : "O"}
            </span>
          </div>
        )}
      </div>

      <div className="w-full max-w-[320px] sm:max-w-[360px] aspect-square mx-auto grid grid-cols-3 gap-2.5 sm:gap-3 p-3 rounded-3xl border border-border/80 bg-surface/30 backdrop-blur-md shadow-sm">
        {board.map((cell, idx) => {
          const isWinningCell = winningLine?.includes(idx);

          return (
            <button
              key={idx}
              onClick={() => handleCellClick(idx)}
              disabled={Boolean(cell) || isGameOver || isAiThinking}
              aria-label={`Cell ${idx + 1}`}
              className={cn(
                "rounded-2xl border transition-all duration-200 flex items-center justify-center font-sans font-bold text-3xl sm:text-4xl shadow-2xs cursor-pointer select-none active:scale-95",
                isWinningCell
                  ? "border-emerald-500 bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 shadow-md animate-pulse"
                  : cell
                  ? "border-border/80 bg-surface/80"
                  : "border-border/60 bg-surface/40 hover:bg-surface/80 hover:border-accent/40"
              )}
            >
              {cell === "X" && (
                <span className="text-accent drop-shadow-xs animate-in zoom-in-75 duration-150">
                  ✕
                </span>
              )}
              {cell === "O" && (
                <span className="text-sky-500 drop-shadow-xs animate-in zoom-in-75 duration-150">
                  ○
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
