"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface CounterAnimationProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}

export function CounterAnimation({
  value,
  suffix = "",
  prefix = "",
  duration = 2,
}: CounterAnimationProps) {
  const numberRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = numberRef.current;
      if (!el) return;

      const obj = { val: 0 };

      gsap.to(obj, {
        val: value,
        duration,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          toggleActions: "play none none none",
        },
        onUpdate: () => {
          if (el) {
            el.innerText = `${prefix}${Math.round(obj.val)}${suffix}`;
          }
        },
      });
    },
    { scope: numberRef }
  );

  return (
    <span ref={numberRef} className="tabular-nums font-sans font-bold">
      {prefix}0{suffix}
    </span>
  );
}
