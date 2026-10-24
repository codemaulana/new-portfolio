import { Metadata } from "next";
import { getCachedPublishedPosts } from "@/lib/cache-queries";
import { BlogFeed, BlogPostItem } from "@/components/blog/BlogFeed";

export const metadata: Metadata = {
  title: "Blog & Engineering Notes — Muhammad Nur Maulana",
  description:
    "Technical articles, system architecture, and hands-on notes on Next.js, Flutter, and Go by Muhammad Nur Maulana.",
  alternates: {
    canonical: "https://codemaulana.web.id/blog",
  },
  openGraph: {
    title: "Blog & Engineering Notes — Muhammad Nur Maulana",
    description:
      "Technical articles, system architecture, and hands-on notes on Next.js, Flutter, and Go by Muhammad Nur Maulana.",
    url: "https://codemaulana.web.id/blog",
    siteName: "Muhammad Nur Maulana Portfolio",
    type: "website",
  },
};

export const revalidate = 120;

export default async function BlogIndexPage() {
  let posts: BlogPostItem[] = [];

  try {
    const dbPosts = await getCachedPublishedPosts(100);

    if (dbPosts) {
      posts = dbPosts.map((p) => ({
        id: p.id,
        title: p.title,
        slug: p.slug,
        excerpt: p.excerpt,
        coverImage: p.coverImage,
        tags: p.tags,
        readingTime: p.readingTime,
        views: p.views,
        publishedAt: p.publishedAt ? p.publishedAt.toISOString() : null,
      }));
    }
  } catch (err) {
    console.error("Could not fetch posts from database:", err);
  }

  return (
    <div className="max-w-4xl mx-auto space-y-12 sm:space-y-16 pb-20 px-4 sm:px-6">
      <BlogFeed initialPosts={posts} />
    </div>
  );
}
