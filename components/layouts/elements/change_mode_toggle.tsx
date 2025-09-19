"use client";

import * as React from "react";
import { useTheme } from "next-themes";

import { CiCloudMoon, CiCloudSun } from "react-icons/ci";

export function ChangeMode() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }
  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <button
      className="py-2 px-3 cursor-pointer bg-neutral-100 dark:bg-neutral-800 rounded-full"
      onClick={toggleTheme}
    >
      {resolvedTheme === "dark" ? (
        <CiCloudMoon className={"w-6 h-6"} />
      ) : (
        <CiCloudSun className={"w-6 h-6"} />
      )}
    </button>
  );
}
