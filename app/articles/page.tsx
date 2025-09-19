import { METADATA } from "@/common/constant/metadata";
import LayoutNavbar from "@/components/layouts/elements/layout-navbar";
import Article from "@/module/article/article";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: `Article ${METADATA.exTitle}`,
  description: `Article ${METADATA.description}`,
};

export default function ArticlePage() {
  return (
    <LayoutNavbar>
      <Article />
    </LayoutNavbar>
  );
}
