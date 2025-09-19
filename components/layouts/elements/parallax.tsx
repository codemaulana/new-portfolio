"use client";
import { Skills } from "@/common/constant/skills";
import {
  motion,
  useTransform,
  useMotionValue,
  useAnimationFrame,
  wrap,
} from "motion/react";
import { useRef } from "react";

interface ParallaxProps {
  baseVelocity: number;
}

export default function Parallax({ baseVelocity = 200 }: ParallaxProps) {
  const baseX = useMotionValue(20);

  const x = useTransform(baseX, (v) => `${wrap(-100, 40, v)}%`);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="overflow-hidden w-full">
      <motion.div
        style={{ x }}
        className="flex flex-wrap gap-x-2 gap-y-8 md:gap-8 w-[2500px]"
      >
        {Skills.map((skill, index) => (
          <div
            key={index}
            className="flex items-center px-4 gap-2 border border-slate-800 py-2 rounded-full bg-neutral-100 dark:bg-stone-950 text-slate-950"
          >
            <skill.Icon className={`w-7 h-7 ${skill.Class}`} />
            <h2 className="text-xs md:text-sm font-mono font-semibold dark:text-white text-slate-900">
              {skill.Name}
            </h2>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
