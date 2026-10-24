import { cache } from "react";
import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";

// Cached site settings query (deduped across components in the same request, and cached for 5 minutes)
export const getCachedSiteSettings = cache(async () => {
  return unstable_cache(
    async () => {
      try {
        return await prisma.siteSettings.findUnique({
          where: { id: "singleton" },
        });
      } catch (err) {
        console.error("Error fetching siteSettings:", err);
        return null;
      }
    },
    ["site-settings"],
    { revalidate: 300, tags: ["site-settings"] }
  )();
});

// Cached published articles query (cached for 2 minutes)
export const getCachedPublishedPosts = cache(async (take = 10) => {
  return unstable_cache(
    async () => {
      try {
        return await prisma.post.findMany({
          where: { published: true },
          orderBy: { publishedAt: "desc" },
          take,
        });
      } catch (err) {
        console.error("Error fetching published posts:", err);
        return [];
      }
    },
    [`published-posts-${take}`],
    { revalidate: 120, tags: ["published-posts"] }
  )();
});

// Cached published projects query (cached for 5 minutes)
export const getCachedPublishedProjects = cache(async () => {
  return unstable_cache(
    async () => {
      try {
        return await prisma.project.findMany({
          where: { published: true },
          orderBy: { order: "asc" },
        });
      } catch (err) {
        console.error("Error fetching published projects:", err);
        return [];
      }
    },
    ["published-projects"],
    { revalidate: 300, tags: ["published-projects"] }
  )();
});
