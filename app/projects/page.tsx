import { METADATA } from "@/common/constant/metadata";
import LayoutNavbar from "@/components/layouts/elements/layout-navbar";
import Projects from "@/module/project/project";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Project ${METADATA.exTitle}`,
  description: `Project ${METADATA.description}`,
};
export default function ProjectsPage() {
  return (
    <LayoutNavbar>
      <Projects />
    </LayoutNavbar>
  );
}
