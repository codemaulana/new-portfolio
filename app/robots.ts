import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://codemaulana.web.id";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/admin/", "/api/auth/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
