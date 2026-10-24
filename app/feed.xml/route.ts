import { prisma } from "@/lib/prisma";

export async function GET() {
  const baseUrl = "https://codemaulana.web.id";

  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
    take: 20,
  });

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>Muhammad Nur Maulana — Technical Journal &amp; Articles</title>
  <link>${baseUrl}/blog</link>
  <description>Software engineering writeups, web architecture insights, and practical dev notes by Muhammad Nur Maulana.</description>
  <language>en-US</language>
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
  <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />
  ${posts
    .map(
      (post) => `
  <item>
    <title><![CDATA[${post.title}]]></title>
    <link>${baseUrl}/blog/${post.slug}</link>
    <guid isPermaLink="true">${baseUrl}/blog/${post.slug}</guid>
    <pubDate>${post.publishedAt ? new Date(post.publishedAt).toUTCString() : new Date().toUTCString()}</pubDate>
    <description><![CDATA[${post.excerpt}]]></description>
  </item>`
    )
    .join("")}
</channel>
</rss>`;

  return new Response(rssFeed, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
