import React from "react";
import MobileNavbar from "../mobile_navbar";
import DesktopNavbar from "../desktop_navbar";

export default function LayoutNavbar({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MobileNavbar />
      <DesktopNavbar />
      {children}
    </>
  );
}
