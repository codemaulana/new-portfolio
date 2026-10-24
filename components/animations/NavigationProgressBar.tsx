"use client";

import React, { useEffect, useState, useRef, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";

function NavigationProgressBarInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Complete progress on navigation finish
  useEffect(() => {
    if (!isVisible) return;

    // Jump to 100%
    setProgress(100);

    const hideTimer = setTimeout(() => {
      setIsVisible(false);
      setProgress(0);
    }, 280);

    return () => clearTimeout(hideTimer);
  }, [pathname, searchParams]);

  // Intercept internal link clicks to start progress immediately
  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      // Find closest anchor tag
      const target = (e.target as HTMLElement)?.closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      if (!href) return;

      // Ignore external links, anchor links, target="_blank", or modifier clicks
      if (
        href.startsWith("http") ||
        href.startsWith("//") ||
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        target.target === "_blank" ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      ) {
        return;
      }

      // Check if it's the exact same page
      const currentUrl = window.location.pathname + window.location.search;
      if (href === currentUrl) return;

      // Start progress animation
      setIsVisible(true);
      setProgress(30);

      if (timerRef.current) clearInterval(timerRef.current);

      timerRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 85) {
            if (timerRef.current) clearInterval(timerRef.current);
            return 85;
          }
          // Incremental trickle
          const increment = Math.random() * 10 + 5;
          return Math.min(prev + increment, 85);
        });
      }, 150);
    };

    document.addEventListener("click", handleLinkClick, { capture: true });

    return () => {
      document.removeEventListener("click", handleLinkClick, { capture: true });
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  if (!isVisible && progress === 0) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-[100] h-[3px] pointer-events-none overflow-hidden transition-opacity duration-200"
      style={{ opacity: isVisible ? 1 : 0 }}
    >
      <div
        className="h-full bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 shadow-[0_0_14px_rgba(249,115,22,0.9)] transition-all duration-200 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

export function NavigationProgressBar() {
  return (
    <Suspense fallback={null}>
      <NavigationProgressBarInner />
    </Suspense>
  );
}
