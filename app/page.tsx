import { METADATA } from "@/common/constant/metadata";
import LayoutNavbar from "@/components/layouts/elements/layout-navbar";
import Home from "@/module/home/home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Home ${METADATA.exTitle}`,
  description: `Home ${METADATA.description}`,
};

export default function HomePage() {
  return (
    <LayoutNavbar>
      <Home />
    </LayoutNavbar>
  );
}
