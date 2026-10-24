import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Muhammad Nur Maulana — Full Stack Software Engineer",
    short_name: "Code Maulana",
    description:
      "Personal portfolio and technical writing across Next.js, Go, Laravel, and Flutter.",
    start_url: "/",
    display: "standalone",
    background_color: "#141311",
    theme_color: "#141311",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
