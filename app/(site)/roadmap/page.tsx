import { Metadata } from "next";
import { RoadmapClient } from "@/components/roadmap/RoadmapClient";

export const metadata: Metadata = {
  title: "Fullstack Developer Roadmap | Muhammad Nur Maulana",
  description:
    "A step-by-step learning guide and free video courses to take you from absolute beginner to production-ready fullstack engineer.",
  openGraph: {
    title: "Fullstack Developer Roadmap | Muhammad Nur Maulana",
    description:
      "A step-by-step learning guide and free video courses to take you from absolute beginner to production-ready fullstack engineer.",
    url: "https://codemaulana.web.id/roadmap",
    siteName: "Muhammad Nur Maulana",
    type: "website",
  },
  alternates: {
    canonical: "https://codemaulana.web.id/roadmap",
  },
};

export default function RoadmapPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-10 sm:space-y-14 pb-20 px-4 sm:px-6">
      <RoadmapClient />
    </div>
  );
}
