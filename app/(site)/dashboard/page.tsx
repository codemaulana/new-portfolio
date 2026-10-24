import { Metadata } from "next";
import { GithubDashboardSection } from "@/components/home/GithubDashboardSection";

export const metadata: Metadata = {
  title: "Dashboard | Muhammad Nur Maulana",
  description:
    "Personal engineering dashboard featuring live GitHub contributions, commit activity, and serverless statistics by Muhammad Nur Maulana.",
  alternates: {
    canonical: "https://codemaulana.web.id/dashboard",
  },
};

export const dynamic = "force-dynamic";

export default function DashboardPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-12 sm:space-y-16 pb-20 px-4 sm:px-6">
      <GithubDashboardSection />
    </div>
  );
}
