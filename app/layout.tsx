import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

const sansFont = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const serifFont = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Muhammad Nur Maulana",
    default: "Muhammad Nur Maulana — Full Stack Software Engineer",
  },
  description:
    "Personal portfolio and technical notes of Muhammad Nur Maulana: Full stack software engineer building high-performance web systems in Next.js and Go, and mobile applications in Flutter.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://codemaulana.web.id"),
  alternates: {
    canonical: "https://codemaulana.web.id",
  },
  keywords: [
    "Muhammad Nur Maulana",
    "Code Maulana",
    "Full Stack Software Engineer",
    "Next.js Developer Indonesia",
    "Go Backend Developer",
    "Flutter Mobile Engineer",
    "Laravel Specialist",
    "Web Development Jakarta",
    "Software Architecture",
  ],
  authors: [{ name: "Muhammad Nur Maulana", url: "https://codemaulana.web.id" }],
  creator: "Muhammad Nur Maulana",
  publisher: "Muhammad Nur Maulana",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Muhammad Nur Maulana — Full Stack Software Engineer",
    description:
      "Personal portfolio and technical writing across Next.js, Go, Laravel, and Flutter by Muhammad Nur Maulana.",
    url: "https://codemaulana.web.id",
    siteName: "Muhammad Nur Maulana",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/profile-avatar.png",
        width: 800,
        height: 800,
        alt: "Muhammad Nur Maulana",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Nur Maulana — Full Stack Software Engineer",
    description:
      "Personal portfolio and technical writing across Next.js, Go, Laravel, and Flutter.",
    creator: "@codemaulana",
    images: ["/profile-avatar.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F7F5F0" },
    { media: "(prefers-color-scheme: dark)", color: "#141311" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${sansFont.variable} ${serifFont.variable} h-full antialiased selection:bg-accent/20 selection:text-accent`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem("theme");
                  var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
                  var shouldBeDark = saved === "dark" || (saved !== "light" && prefersDark);
                  if (shouldBeDark) {
                    document.documentElement.classList.add("dark");
                    document.documentElement.style.colorScheme = "dark";
                  } else {
                    document.documentElement.classList.remove("dark");
                    document.documentElement.style.colorScheme = "light";
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
