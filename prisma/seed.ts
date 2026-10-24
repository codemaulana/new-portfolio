import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../lib/generated/prisma/client";
import bcrypt from "bcryptjs";
import "dotenv/config";

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Memulai seeding database Digital Atelier...");

  // 1. Admin User
  const adminEmail = (process.env.ADMIN_EMAIL || "admin@example.com").toLowerCase().trim();
  const rawPassword = process.env.ADMIN_PASSWORD || "AdminAtelier2026!";
  const adminName = process.env.ADMIN_NAME || "Muhammad Nur Maulana";
  const passwordHash = await bcrypt.hash(rawPassword, 10);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      name: adminName,
      passwordHash,
    },
    create: {
      email: adminEmail,
      name: adminName,
      passwordHash,
    },
  });

  // Also seed personal gmail as admin
  await prisma.user.upsert({
    where: { email: "muhammadnrmaulana@gmail.com" },
    update: {
      name: adminName,
      passwordHash,
    },
    create: {
      email: "muhammadnrmaulana@gmail.com",
      name: adminName,
      passwordHash,
    },
  });
  console.log(`✅ Admin user terkonfigurasi: ${admin.email}`);

  // 2. Site Settings
  await prisma.siteSettings.upsert({
    where: { id: "singleton" },
    update: {
      ownerName: "Muhammad Nur Maulana",
      roleTitle: "Full Stack Developer",
      heroHeadline: "Building fast web apps, clean backends, and reliable mobile systems.",
      heroSubheadline:
        "Full stack software engineer working across Next.js, Go, Laravel, and Flutter. Focused on clean code, responsive layouts, and low-latency database queries.",
      heroAvatarUrl: "/profile-avatar.png",
      aboutShort:
        "Informatics Engineering graduate from Universitas Indraprasta PGRI (GPA 3.48) with 3+ years of freelance builds and software engineering internships.",
      aboutFull:
        "I'm Muhammad Nur Maulana, a full stack software engineer based in Jakarta, Indonesia. I build modern web applications with Next.js and TypeScript, write backends in Laravel and Go, and develop cross-platform mobile apps in Flutter. I focus on clean typed code, responsive layouts, and low-latency database queries.",
      location: "Jakarta, Indonesia",
      emailPublic: "muhammadnrmaulana@gmail.com",
      resumePdfUrl: "/resume.pdf",
      socialLinks: {
        github: "https://github.com/codemaulana",
        linkedin: "https://www.linkedin.com/in/muhammad-nur-maulana-a13a92290",
        instagram: "https://instagram.com/ctizz4",
        tiktok: "https://www.tiktok.com/@elitescr",
      },
      seoDefaultTitle: "Muhammad Nur Maulana — Full Stack Software Engineer",
      seoDefaultDesc:
        "Personal software engineering portfolio and writing by Muhammad Nur Maulana (Next.js, Laravel, Go, Flutter).",
    },
    create: {
      id: "singleton",
      ownerName: "Muhammad Nur Maulana",
      roleTitle: "Full Stack Developer",
      heroHeadline: "Building fast web apps, clean backends, and reliable mobile systems.",
      heroSubheadline:
        "Full stack software engineer working across Next.js, Go, Laravel, and Flutter. Focused on clean code, responsive layouts, and low-latency database queries.",
      heroAvatarUrl: "/profile-avatar.png",
      aboutShort:
        "Informatics Engineering graduate from Universitas Indraprasta PGRI (GPA 3.48) with 3+ years of freelance builds and software engineering internships.",
      aboutFull:
        "I'm Muhammad Nur Maulana, a full stack software engineer based in Jakarta, Indonesia. I build modern web applications with Next.js and TypeScript, write backends in Laravel and Go, and develop cross-platform mobile apps in Flutter. I focus on clean typed code, responsive layouts, and low-latency database queries.",
      location: "Jakarta, Indonesia",
      emailPublic: "muhammadnrmaulana@gmail.com",
      resumePdfUrl: "/resume.pdf",
      socialLinks: {
        github: "https://github.com/codemaulana",
        linkedin: "https://www.linkedin.com/in/muhammad-nur-maulana-a13a92290",
        instagram: "https://instagram.com/ctizz4",
        tiktok: "https://www.tiktok.com/@elitescr",
      },
      seoDefaultTitle: "Muhammad Nur Maulana — Full Stack Software Engineer",
      seoDefaultDesc:
        "Personal software engineering portfolio and writing by Muhammad Nur Maulana (Next.js, Laravel, Go, Flutter).",
      animationIntensity: "FULL",
      enable3DHero: true,
      enableGameCorner: true,
    },
  });
  console.log("✅ Site Settings initialized.");

  // 3. Projects
  await prisma.project.deleteMany();
  await prisma.project.createMany({
    data: [
      {
        title: "Atelier Commerce & Inventory",
        slug: "atelier-commerce-inventory",
        tagline: "Custom retail storefront with real-time inventory synchronization and multi-outlet POS.",
        problem:
          "The client needed to connect a high-traffic online store with brick-and-mortar registers without inventory drift or race conditions during flash sales.",
        solution:
          "Built a Next.js App Router storefront with ISR and Server Actions backed by a Laravel REST API and PostgreSQL with atomic row-level locks.",
        stack: ["Next.js", "Laravel", "PostgreSQL", "Tailwind CSS", "Redis"],
        category: "Web & E-Commerce",
        featured: true,
        order: 1,
        published: true,
        demoUrl: "https://example.com/atelier-commerce",
        repoUrl: "https://github.com/codemaulana/example-commerce",
        coverImage:
          "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
        ],
        results:
          "Scored a 98 on Lighthouse, cut checkout latency by 40%, and handled 10,000+ monthly transactions with zero downtime.",
      },
      {
        title: "FleetTrack Logistics Mobile",
        slug: "fleettrack-logistics-mobile",
        tagline: "Courier dispatch and route tracking app built with offline-first synchronization.",
        problem:
          "Field couriers frequently lost cellular connectivity in suburban delivery zones, causing dropped route manifests and delayed status updates.",
        solution:
          "Engineered a cross-platform Flutter app using Riverpod and local SQLite storage that queues delivery scans and syncs in the background once reconnected.",
        stack: ["Flutter", "Dart", "Laravel", "SQLite", "Google Maps API"],
        category: "Mobile App",
        featured: true,
        order: 2,
        published: true,
        demoUrl: "https://example.com/fleettrack-demo",
        repoUrl: "https://github.com/codemaulana/example-fleettrack",
        coverImage:
          "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80",
        ],
        results:
          "Maintains a consistent 60 FPS across Android and iOS with zero lost delivery records over six months of field testing.",
      },
      {
        title: "KlinikConnect Health System",
        slug: "klinikconnect-health-system",
        tagline: "Patient scheduling portal and encrypted electronic medical records platform.",
        problem:
          "Physical waiting queues backed up patient processing and paper medical charts created bottlenecks during intake.",
        solution:
          "Engineered a responsive Next.js web application with live queue updates and column-level database encryption for patient medical records.",
        stack: ["Next.js", "TypeScript", "Laravel", "PostgreSQL", "Tailwind CSS"],
        category: "SaaS & Web App",
        featured: true,
        order: 3,
        published: true,
        demoUrl: "https://example.com/klinikconnect",
        repoUrl: null,
        coverImage:
          "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
        gallery: [],
        results:
          "Reduced patient wait times by 65% and digitized over 2,500 patient records across three regional clinics.",
      },
      {
        title: "FastSync Event Bus Engine",
        slug: "fastsync-event-bus-engine",
        tagline: "Low-latency asynchronous message bus and webhook worker dispatcher.",
        problem:
          "Inter-service webhook traffic caused downstream bottlenecks and database timeouts during seasonal order surges.",
        solution:
          "Implemented a lightweight concurrency worker pool using Go and Redis pub/sub to buffer and dispatch high-throughput event queues.",
        stack: ["Golang", "Redis", "Docker"],
        category: "Backend & Tooling",
        featured: false,
        order: 4,
        published: true,
        demoUrl: null,
        repoUrl: "https://github.com/codemaulana/example-fastsync",
        coverImage:
          "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
        gallery: [],
        results:
          "Dispatched 5,000+ messages per second with total memory consumption under 30 MB in benchmark tests.",
      },
    ],
  });
  console.log("✅ Projects created.");

  // 4. Skills
  await prisma.skill.deleteMany();
  await prisma.skill.createMany({
    data: [
      // Primary Stack
      { name: "Next.js 16 (App Router)", category: "PRIMARY_STACK", order: 1, highlight: true },
      { name: "React 19 & TypeScript", category: "PRIMARY_STACK", order: 2, highlight: true },
      { name: "Laravel 11 & PHP", category: "PRIMARY_STACK", order: 3, highlight: true },
      { name: "Flutter & Dart", category: "PRIMARY_STACK", order: 4, highlight: true },
      { name: "PostgreSQL & Prisma", category: "PRIMARY_STACK", order: 5, highlight: true },
      { name: "Tailwind CSS v4", category: "PRIMARY_STACK", order: 6, highlight: true },

      // Familiar
      { name: "Golang (Familiar)", category: "FAMILIAR", order: 1, highlight: false },
      { name: "REST & GraphQL APIs", category: "FAMILIAR", order: 2, highlight: false },
      { name: "Redis & Caching", category: "FAMILIAR", order: 3, highlight: false },

      // Tools & DevOps
      { name: "Docker & Containerization", category: "TOOLS_DEVOPS", order: 1, highlight: false },
      { name: "Git, GitHub & CI/CD", category: "TOOLS_DEVOPS", order: 2, highlight: false },
      { name: "Linux / Nginx Server", category: "TOOLS_DEVOPS", order: 3, highlight: false },
      { name: "Figma to Code", category: "TOOLS_DEVOPS", order: 4, highlight: false },
    ],
  });
  console.log("✅ Data keahlian (skills) berhasil dibuat.");

  // 5. Timeline (Experience & Education)
  await prisma.timelineItem.deleteMany();
  await prisma.timelineItem.createMany({
    data: [
      {
        type: "EXPERIENCE",
        title: "Fullstack Developer Intern",
        organization: "PT Suri Nusantara",
        location: "Jakarta, Indonesia",
        periodStart: "Dec 2025",
        periodEnd: "Jul 2026",
        current: false,
        description:
          "Built full-stack features using Next.js, TypeScript, Express, and PostgreSQL with Prisma. Shipped secure REST endpoints with Zod validation and auth guards.",
        techStack: ["Next.js", "TypeScript", "Express.js", "PostgreSQL", "Prisma"],
        order: 1,
      },
      {
        type: "EXPERIENCE",
        title: "Freelance Web Developer",
        organization: "Self-Employed",
        location: "Remote",
        periodStart: "Aug 2023",
        periodEnd: "Dec 2025",
        current: false,
        description:
          "Shipped web applications for 10+ clients from initial design to production deployments. Built responsive interfaces using React, Next.js, Laravel, and PostgreSQL.",
        techStack: ["React", "Next.js", "Laravel", "PostgreSQL", "Tailwind CSS"],
        order: 2,
      },
      {
        type: "EXPERIENCE",
        title: "Frontend Developer Intern",
        organization: "PT Eka",
        location: "Jakarta, Indonesia",
        periodStart: "Dec 2024",
        periodEnd: "Apr 2025",
        current: false,
        description:
          "Turned Figma mockups into reusable, typed React components. Fixed frontend rendering bugs and cleaned up state management across core views.",
        techStack: ["React", "TypeScript", "Tailwind CSS"],
        order: 3,
      },
      {
        type: "EXPERIENCE",
        title: "Frontend Developer Intern",
        organization: "PT Kaia",
        location: "Jakarta, Indonesia",
        periodStart: "May 2024",
        periodEnd: "Aug 2024",
        current: false,
        description:
          "Built client-facing features in React within Agile sprints. Trimmed bundle sizes and optimized component lifecycles to reduce initial page loads.",
        techStack: ["React", "JavaScript", "CSS3"],
        order: 4,
      },
      {
        type: "EDUCATION",
        title: "B.S. in Informatics Engineering",
        organization: "Universitas Indraprasta PGRI",
        location: "Jakarta, Indonesia",
        periodStart: "Sep 2022",
        periodEnd: "Sep 2026",
        current: false,
        description:
          "Graduated with GPA 3.48 / 4.00. Focus on software engineering, distributed systems, and web architecture. Founder of 200+ member 'Belajar Bareng' developer community.",
        techStack: ["Algorithms", "Data Structures", "Database Systems", "Software Architecture"],
        order: 1,
      },
    ],
  });
  console.log("✅ Timeline created.");

  // 6. Blog Posts
  await prisma.post.deleteMany();
  await prisma.post.createMany({
    data: [
      {
        title: "Building Scalable Web Architecture with Next.js 16 and Server Actions",
        slug: "membangun-arsitektur-web-nextjs-16-contoh",
        excerpt:
          "Hands-on guide to Next.js 16 conventions, async request APIs, React 19 Server Actions, and rendering setups that hit 95+ Lighthouse scores.",
        content: `
# Introduction

Next.js 16 introduces key architectural upgrades for web engineers. From stable Turbopack bundling to full adoption of Async Request APIs, the framework cements its position as the baseline for modern web applications.

## Why Async Request APIs Matter

In earlier versions, synchronous access to request params could cause subtle race conditions in streaming server environments. In Next.js 16, request APIs like \`cookies()\`, \`headers()\`, and dynamic route \`params\` return Promises by default.

\`\`\`tsx
export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  return <h1>Post: {slug}</h1>;
}
\`\`\`

## Clean Server Action Mutations

Server Actions let client components invoke backend mutations without manual API boilerplate. Pair them with Zod validation and consistent error handling to keep mutations clean:

\`\`\`tsx
'use server';

export async function submitComment(prevState: any, formData: FormData) {
  const parsed = commentSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: parsed.error.flatten() };
  await db.comment.create({ data: parsed.data });
  revalidatePath('/blog');
  return { success: true };
}
\`\`\`

## Key Takeaway

Splitting components cleanly between Server and Client boundaries keeps our Largest Contentful Paint under 1.5 seconds even on sluggish 4G mobile connections.
        `,
        coverImage: "/images/blog/banner-nextjs-architecture.png",
        tags: ["Next.js", "React 19", "Server Actions", "Architecture"],
        published: true,
        publishedAt: new Date("2026-10-20"),
        readingTime: 5,
        views: 1420,
      },
      {
        title: "Solving Zustand State Hydration in React 19 & Next.js App Router",
        slug: "solving-zustand-state-hydration-react-19",
        excerpt:
          "Fixing text content mismatch errors when reading persisted localStorage state in React Server Components.",
        content: `
# The Hydration Mismatch Problem

Using Zustand's persist middleware with Next.js App Router often triggers hydration mismatch errors. The server renders default state while the browser reads updated values from localStorage.

## The Solution: A Custom Hydration Hook

We can isolate the client hydration step with a simple hook that waits until the component mounts in the browser before returning persisted state:

\`\`\`tsx
import { useEffect, useState } from 'react';

export const useHydrationZustand = <T, F>(
  store: (callback: (state: T) => unknown) => unknown,
  callback: (state: T) => F
) => {
  const result = store(callback) as F;
  const [data, setData] = useState<F>();

  useEffect(() => {
    setData(result);
  }, [result]);

  return data;
};
\`\`\`

## Practical Application

This hook lets us render a lightweight skeleton on frame one, stopping layout shifts and React 19 hydration mismatches in their tracks.
        `,
        coverImage: "/images/blog/banner-zustand-hydration.png",
        tags: ["React 19", "Zustand", "State Management", "TypeScript"],
        published: true,
        publishedAt: new Date("2026-10-15"),
        readingTime: 4,
        views: 890,
      },
      {
        title: "React Custom Hooks: Mastering useDebounce and useThrottle for Cleaner UX",
        slug: "react-custom-hooks-usedebounce-optimasi-ux",
        excerpt:
          "Practical guide to building generic debounce and throttle hooks from scratch to avoid hammering search APIs.",
        content: `
# Why Debounce Matters

Firing an API request on every keystroke in a search input hammers the server and creates UI flicker. Debouncing fixes this by waiting until typing pauses.

## Building useDebounce

\`\`\`tsx
import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
\`\`\`

## Hooking It Up

Now search queries only hit the network after the user stops typing for 300ms, keeping both backend loads and client renders low.
        `,
        coverImage: "/images/blog/banner-react-hooks.png",
        tags: ["React", "TypeScript", "Performance", "Custom Hooks"],
        published: true,
        publishedAt: new Date("2026-10-08"),
        readingTime: 4,
        views: 670,
      },
      {
        title: "SPA vs MPA vs Hybrid SSR: Choosing the Right Architecture in 2026",
        slug: "spa-vs-mpa-vs-hybrid-ssr-arsitektur-web-2026",
        excerpt:
          "A realistic breakdown of trade-offs, Core Web Vitals, and decision frameworks for single-page vs multi-page web apps.",
        content: `
# The Modern Web Architecture Spectrum

The old debate between Single Page Applications and Multi Page Applications has turned into a continuum thanks to hybrid frameworks like Next.js and Astro.

## Trade-Off Matrix

1. **SPA (Vite / React SPA)**: Instant in-app transitions, but large initial bundles and tricky SEO.
2. **Traditional MPA (Laravel Blade / Rails)**: Fast First Contentful Paint and automatic SEO, but full page reloads on every navigation.
3. **Hybrid SSR (Next.js App Router)**: Fast initial server render with instant client transitions through Server Components.

## Decision Rule

Pick Hybrid SSR for content sites, e-commerce, and public portfolios. Stick with pure SPAs for internal authenticated dashboards that don't need SEO.
        `,
        coverImage: "/images/blog/banner-spa-vs-mpa.png",
        tags: ["Architecture", "Performance", "Web Dev", "SSR"],
        published: true,
        publishedAt: new Date("2026-09-28"),
        readingTime: 6,
        views: 1150,
      },
      {
        title: "Clean Mobile Architecture in Flutter with Riverpod 2.0",
        slug: "strategi-state-management-flutter-riverpod-contoh",
        excerpt:
          "How to structure Flutter apps with decoupled domain layers, testable AsyncNotifier providers, and zero memory leaks.",
        content: `
# Structuring Flutter Applications

Scaling mobile codebases requires keeping state lifecycle management separate from presentation widgets.

## The Three-Layer Pattern

1. **Domain Layer**: Pure business logic and entities with no framework dependencies.
2. **Data Layer**: API clients and local SQLite database cache repositories.
3. **Presentation Layer**: Stateless widgets reacting to Riverpod providers.

This layout keeps code testable, avoids widget rebuild cascades, and hits a consistent 60 FPS across iOS and Android.
        `,
        coverImage: "/images/blog/banner-flutter-riverpod.png",
        tags: ["Flutter", "Dart", "Riverpod", "Mobile Architecture"],
        published: true,
        publishedAt: new Date("2026-09-15"),
        readingTime: 5,
        views: 890,
      },
      {
        title: "High-Performance Concurrency in Go: Worker Pools and Buffered Channels",
        slug: "high-performance-concurrency-golang-worker-pool",
        excerpt:
          "Building microsecond-latency task queues in Go using goroutines, channels, and sync.WaitGroup.",
        content: `
# Concurrency in Go

Go's CSP concurrency model lets us run thousands of lightweight threads with minimal memory overhead.

## The Worker Pool Pattern

Spawning an unbounded number of goroutines can exhaust file descriptors and memory under load. A worker pool keeps resource usage capped:

\`\`\`go
func worker(id int, jobs <-chan Job, results chan<- Result) {
    for j := range jobs {
        results <- processJob(j)
    }
}
\`\`\`

This pattern is great for webhook dispatchers, image processing pipelines, and high-throughput background jobs.
        `,
        coverImage: "/images/blog/banner-golang-concurrency.png",
        tags: ["Golang", "Concurrency", "Backend", "Microservices"],
        published: true,
        publishedAt: new Date("2026-09-02"),
        readingTime: 6,
        views: 980,
      },
    ],
  });
  console.log("✅ Seeded blog posts (6 items in English).");

  console.log("🎉 Seeding database selesai dengan sempurna!");
}

main()
  .catch((e) => {
    console.error("❌ Terjadi kesalahan saat seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
