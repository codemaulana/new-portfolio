"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Coffee } from "lucide-react";

interface TypewriterHeadingProps {
  ownerName: string;
}

export function TypewriterHeading({ ownerName }: TypewriterHeadingProps) {
  const phrases = useMemo(
    () => [
      ownerName || "Muhammad Nur Maulana",
      "Full Stack Developer",
      "Software Engineer",
      "Web & Mobile Craftsman",
    ],
    [ownerName],
  );

  const [text, setText] = useState(phrases[0] || "Muhammad Nur Maulana");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(true);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isPaused) {
      // Pause at full word before deleting
      timer = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, 2200);
      return () => clearTimeout(timer);
    }

    const currentPhrase = phrases[phraseIndex] || phrases[0]!;

    if (isDeleting) {
      if (text.length > 0) {
        timer = setTimeout(() => {
          setText(currentPhrase.substring(0, text.length - 1));
        }, 40);
      } else {
        // Finished deleting, proceed to next phrase
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
      }
    } else {
      // Typing forward
      if (text.length < currentPhrase.length) {
        timer = setTimeout(() => {
          setText(currentPhrase.substring(0, text.length + 1));
        }, 75);
      } else {
        // Finished typing full word, pause
        setIsPaused(true);
      }
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, isPaused, phraseIndex, phrases]);

  return (
    <div className="flex items-start justify-between gap-4">
      <div className="space-y-2">
        <h1 className="font-sans text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground flex items-center flex-wrap min-h-11 sm:min-h-14">
          <span>Hi, I&apos;m&nbsp;</span>
          <span className="text-foreground">{text}</span>
          <span className="inline-block w-0.75 h-7 sm:h-9 md:h-11 bg-accent ml-1 animate-pulse" />
        </h1>

        <div className="flex items-center gap-2 text-xs sm:text-sm font-mono text-muted-foreground pt-1">
          <span>•</span>
          <span>
            Based in Jakarta{" "}
            <span className="font-semibold text-foreground">ID</span>
          </span>
        </div>
      </div>

      <a
        href="https://trakteer.id/codemaulana"
        target="_blank"
        rel="noopener noreferrer"
        title="Buy me a coffee"
        className="p-2 sm:p-2.5 rounded-xl border border-border/70 bg-surface/60 hover:bg-surface text-muted-foreground hover:text-accent hover:border-accent/40 transition-all duration-200 shrink-0 shadow-2xs group">
        <Coffee className="h-5 w-5 sm:h-6 sm:w-6 group-hover:scale-110 transition-transform text-foreground" />
      </a>
    </div>
  );
}
