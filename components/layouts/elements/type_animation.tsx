"use client";
import { TypeAnimation as TypeAnimationComponents } from "react-type-animation";

interface TypeAnimationProps {
  sequence: string[];
  delay?: number;
}

export default function TypeAnimation({
  sequence,
  delay = 1000,
}: TypeAnimationProps) {
  const modifiedSequence: (string | number)[] = [];

  sequence.forEach((item, index) => {
    modifiedSequence.push(item);

    if (index < sequence.length) {
      modifiedSequence.push(delay);
    }
  });
  return (
    <TypeAnimationComponents
      sequence={modifiedSequence}
      speed={10}
      deletionSpeed={60}
      repeat={Infinity}
    />
  );
}
