import { NextResponse } from "next/server";

export const revalidate = 1800; // Cache 30 minutes

export interface TikTokVideo {
  id: string;
  title: string;
  views: string;
  url: string;
  category: string;
}

export interface TikTokProfileData {
  username: string;
  displayName: string;
  avatarUrl: string;
  following: string;
  followers: string;
  likes: string;
  bio: string;
  profileUrl: string;
  videos: TikTokVideo[];
  isLiveOembed: boolean;
}

export async function GET() {
  const username = process.env.TIKTOK_USERNAME || "elitescr";
  const tiktokUrl = `https://www.tiktok.com/@${username}`;

  let authorName = "Maulana || Software Engineer";
  let isLiveOembed = false;

  try {
    const oembedRes = await fetch(
      `https://www.tiktok.com/oembed?url=${encodeURIComponent(tiktokUrl)}`,
      {
        next: { revalidate: 1800 },
        headers: { "User-Agent": "Next.js / Digital Atelier" },
      }
    );

    if (oembedRes.ok) {
      const oembedData = await oembedRes.json();
      if (oembedData?.author_name) {
        authorName = oembedData.author_name;
        isLiveOembed = true;
      }
    }
  } catch (err) {
    console.error("Could not fetch TikTok oEmbed:", err);
  }

  const profileData: TikTokProfileData = {
    username,
    displayName: authorName,
    avatarUrl: "/images/avatar-maulana.png",
    following: "64",
    followers: "9,850",
    likes: "218.4K",
    bio: "Software Engineer • Full Stack Web & Mobile Development 🚀",
    profileUrl: tiktokUrl,
    isLiveOembed,
    videos: [
      {
        id: "v1",
        title: "Ketika bug production muncul di hari Jumat malam",
        views: "475.6K",
        url: tiktokUrl,
        category: "Tech Humor",
      },
      {
        id: "v2",
        title: "Perbedaan Arsitektur Next.js 16 Server Actions vs API Routes",
        views: "265.2K",
        url: tiktokUrl,
        category: "Tutorial",
      },
      {
        id: "v3",
        title: "Kalo capek ngoding biasanya ngapain sih?",
        views: "61.3K",
        url: tiktokUrl,
        category: "Dev Life",
      },
      {
        id: "v4",
        title: "Setup & Tips Produktivitas Software Engineer 2026",
        views: "18.9K",
        url: tiktokUrl,
        category: "Workflow",
      },
      {
        id: "v5",
        title: "Tips menguasai Clean Code & PostgreSQL untuk fresh graduate",
        views: "12.4K",
        url: tiktokUrl,
        category: "Architecture",
      },
    ],
  };

  return NextResponse.json(profileData);
}
