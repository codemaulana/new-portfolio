"use client";

import { useState, useEffect } from "react";
import LetterGlitch from "@/components/LetterGlitch/LetterGlitch";
import Lanyard from "../Lanyard/Lanyard";
import Particles from "./elements/particles";

export default function AnimateContentPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="h-screen w-full">
          <LetterGlitch
            glitchSpeed={50}
            centerVignette={true}
            outerVignette={false}
            glitchColors={["#2b4539", "#61dca3", "#61b3dc"]}
            smooth={true}
          />
        </div>
      ) : (
        <div className="relative overflow-hidden flex flex-col gap-8">
          <div className="w-full h-full absolute -z-40">
            <Particles
              particleCount={5000}
              speed={0.2}
              particleSpread={30}
              disableRotation={false}
              alphaParticles={false}
              particleBaseSize={100}
            />
          </div>
          {children}
        </div>
      )}
      <div className="fixed right-0 top-10 hidden lg:block">
        <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} />
      </div>
    </>
  );
}
