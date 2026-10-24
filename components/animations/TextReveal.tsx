"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface TextRevealProps {
  children: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  className?: string;
  delay?: number;
}

export function TextReveal({
  children,
  as: Component = "h2",
  className,
  delay = 0.1,
}: TextRevealProps) {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = containerRef.current;
      if (!el) return;

      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) return;

      const words = el.querySelectorAll(".reveal-word");

      gsap.fromTo(
        words,
        {
          y: 30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.04,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: containerRef }
  );

  const words = children.split(" ");

  return (
    // @ts-expect-error dynamic component tag
    <Component ref={containerRef} className={cn("overflow-hidden leading-tight", className)}>
      {words.map((word, idx) => (
        <span key={idx} className="inline-block overflow-hidden mr-[0.25em]">
          <span className="reveal-word inline-block will-change-transform">{word}</span>
        </span>
      ))}
    </Component>
  );
}
