import { METADATA } from "@/common/constant/metadata";
import LayoutNavbar from "@/components/layouts/elements/layout-navbar";
import About from "@/module/about/about";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `About ${METADATA.exTitle}`,
  description: `About ${METADATA.description}`,
};

export default function AboutPage() {
  return (
    <LayoutNavbar>
      <About />
    </LayoutNavbar>
  );
}
