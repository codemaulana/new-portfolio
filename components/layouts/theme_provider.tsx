"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import MobileNavbar from "./mobile_navbar";
import DesktopNavbar from "./desktop_navbar";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
