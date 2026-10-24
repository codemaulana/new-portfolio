import { Metadata } from "next";
import { PlayClient } from "@/components/play/PlayClient";

export const metadata: Metadata = {
  title: "Game Corner & Interactive Arcade | Muhammad Nur Maulana",
  description:
    "Interactive developer games: Tech Stack Memory Match and Tic-Tac-Toe vs Minimax AI.",
  alternates: {
    canonical: "https://codemaulana.web.id/play",
  },
};

export default function PlayIndexPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 sm:space-y-12 pb-20 px-4 sm:px-6 pt-2 sm:pt-6">
      <PlayClient />
    </div>
  );
}
