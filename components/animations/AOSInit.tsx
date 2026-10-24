"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { usePathname } from "next/navigation";

export function AOSInit() {
  const pathname = usePathname();

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!prefersReducedMotion) {
      AOS.init({
        duration: 380,
        easing: "ease-out-cubic",
        once: true,
        offset: 20,
        debounceDelay: 50,
        throttleDelay: 99,
      });
    }

    return () => {
      // clean up if necessary
    };
  }, []);

  useEffect(() => {
    AOS.refresh();
  }, [pathname]);

  return null;
}
