import dotenv from "dotenv";
dotenv.config();
import fs from "fs";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { put } from "@vercel/blob";
import { Pool } from "pg";

async function createResumePdf() {
  const doc = await PDFDocument.create();
  const page = doc.addPage([595.28, 841.89]); // A4 dimensions in points
  const { width, height } = page.getSize();

  const fontBold = await doc.embedFont(StandardFonts.HelveticaBold);
  const fontRegular = await doc.embedFont(StandardFonts.Helvetica);
  const fontOblique = await doc.embedFont(StandardFonts.HelveticaOblique);

  // Palette
  const darkNavy = rgb(0.06, 0.09, 0.16);
  const slateDark = rgb(0.2, 0.25, 0.33);
  const slateMuted = rgb(0.4, 0.45, 0.55);
  const accentBlue = rgb(0.15, 0.45, 0.82);
  const borderLight = rgb(0.85, 0.88, 0.92);

  let y = height - 50;
  const margin = 50;
  const contentWidth = width - margin * 2;

  // Header: Name
  page.drawText("Muhammad Nur Maulana", {
    x: margin,
    y: y,
    size: 24,
    font: fontBold,
    color: darkNavy,
  });
  y -= 22;

  // Title
  page.drawText("Full-Stack Software Engineer & Mobile Systems Architect", {
    x: margin,
    y: y,
    size: 13,
    font: fontBold,
    color: accentBlue,
  });
  y -= 18;

  // Contact Row
  const contactText = "Indonesia  |  contact@codemaulana.web.id  |  codemaulana.web.id  |  github.com/codemaulana";
  page.drawText(contactText, {
    x: margin,
    y: y,
    size: 9.5,
    font: fontRegular,
    color: slateMuted,
  });
  y -= 14;

  // Divider Line
  page.drawLine({
    start: { x: margin, y: y },
    end: { x: width - margin, y: y },
    thickness: 1,
    color: borderLight,
  });
  y -= 20;

  // Helper for Section Titles
  function drawSectionTitle(title) {
    page.drawText(title.toUpperCase(), {
      x: margin,
      y: y,
      size: 11,
      font: fontBold,
      color: darkNavy,
    });
    y -= 4;
    page.drawLine({
      start: { x: margin, y: y },
      end: { x: width - margin, y: y },
      thickness: 1,
      color: accentBlue,
    });
    y -= 14;
  }

  // Summary Section
  drawSectionTitle("Professional Profile");
  const summaryLines = [
    "Software engineer with proven experience designing and delivering resilient full-stack web platforms and",
    "offline-first mobile applications. Proficient in Next.js 16, React 19, TypeScript, Golang microservices,",
    "and Flutter architectures. Passionate about sub-millisecond cache latency, clean architecture, and snappy UX.",
  ];
  for (const line of summaryLines) {
    page.drawText(line, {
      x: margin,
      y: y,
      size: 9.5,
      font: fontRegular,
      color: slateDark,
      lineHeight: 14,
    });
    y -= 14;
  }
  y -= 10;

  // Core Technical Skills Section
  drawSectionTitle("Core Technical Competencies");
  const skills = [
    { label: "Frontend & Web:", items: "TypeScript, JavaScript (ESNext), Next.js 16 (App Router), React 19, Tailwind CSS, GSAP" },
    { label: "Mobile Development:", items: "Flutter 3.x, Dart, Riverpod 2.0, Offline-First SQLite Engines, Native Platform Channels" },
    { label: "Backend & Systems:", items: "Go (Golang), gRPC, Protocol Buffers, Node.js, Express, REST APIs, Redis Caching" },
    { label: "Database & Cloud:", items: "PostgreSQL, Neon Serverless, Prisma ORM, Docker, Vercel Blob, Git, CI/CD Actions" },
  ];
  for (const s of skills) {
    page.drawText(s.label, {
      x: margin,
      y: y,
      size: 9.5,
      font: fontBold,
      color: darkNavy,
    });
    page.drawText(s.items, {
      x: margin + 125,
      y: y,
      size: 9.5,
      font: fontRegular,
      color: slateDark,
    });
    y -= 15;
  }
  y -= 10;

  // Work Experience Section
  drawSectionTitle("Selected Work Experience");

  const jobs = [
    {
      role: "Lead Full-Stack & Systems Engineer",
      company: "Digital Atelier Systems",
      period: "2024 - Present",
      bullets: [
        "Architected scalable web applications using Next.js 16 App Router, React 19 Server Actions, and Neon PostgreSQL.",
        "Engineered sub-millisecond cache invalidation strategies using Redis, improving response times by over 40%.",
        "Constructed an interactive admin management studio with TipTap newsroom editing and direct Vercel Blob streaming.",
      ],
    },
    {
      role: "Mobile Systems Engineer",
      company: "Freelance & Open Source Contributor",
      period: "2022 - 2024",
      bullets: [
        "Designed offline-first synchronization engines in Flutter with SQLite persistence and idempotent HTTP sync.",
        "Implemented clean domain-driven architecture utilizing Riverpod 2.0 with asynchronous notifier state machines.",
        "Authored open-source developer toolkits and articles on state hydration and performant custom hooks.",
      ],
    },
    {
      role: "Backend & Microservices Developer",
      company: "Enterprise Cloud Solutions",
      period: "2021 - 2022",
      bullets: [
        "Built resilient gRPC microservices in Go with circuit breaker patterns and buffered worker pools.",
        "Optimized high-concurrency background job processors handling thousands of concurrent tasks without memory leaks.",
      ],
    },
  ];

  for (const job of jobs) {
    page.drawText(job.role, {
      x: margin,
      y: y,
      size: 10.5,
      font: fontBold,
      color: darkNavy,
    });
    page.drawText(job.period, {
      x: width - margin - fontBold.widthOfTextAtSize(job.period, 9.5),
      y: y,
      size: 9.5,
      font: fontBold,
      color: slateMuted,
    });
    y -= 13;

    page.drawText(job.company, {
      x: margin,
      y: y,
      size: 9.5,
      font: fontOblique,
      color: accentBlue,
    });
    y -= 14;

    for (const b of job.bullets) {
      page.drawText("-", { x: margin + 5, y: y, size: 9.5, font: fontBold, color: accentBlue });
      page.drawText(b, {
        x: margin + 18,
        y: y,
        size: 9,
        font: fontRegular,
        color: slateDark,
        maxWidth: contentWidth - 20,
      });
      y -= 13;
    }
    y -= 8;
  }

  // Education Section
  drawSectionTitle("Education & Certifications");
  page.drawText("Bachelor of Computer Science / Software Engineering", {
    x: margin,
    y: y,
    size: 10,
    font: fontBold,
    color: darkNavy,
  });
  y -= 13;
  page.drawText("Focus on Distributed Systems, Cloud Architecture, and Software Engineering Principles", {
    x: margin,
    y: y,
    size: 9,
    font: fontRegular,
    color: slateDark,
  });

  const pdfBytes = await doc.save();
  return Buffer.from(pdfBytes);
}

async function main() {
  console.log("Generating professional resume PDF...");
  const pdfBuffer = await createResumePdf();

  // 1. Write to public/resume.pdf so static requests always succeed
  fs.writeFileSync("public/resume.pdf", pdfBuffer);
  console.log("Saved to public/resume.pdf (Size:", (pdfBuffer.length / 1024).toFixed(1), "KB)");

  // 2. Upload to Vercel Blob
  console.log("Uploading resume to Vercel Blob...");
  const blob = await put("articles/resume-muhammad-nur-maulana.pdf", pdfBuffer, {
    access: "private",
    contentType: "application/pdf",
    allowOverwrite: true,
  });
  console.log("Uploaded to Vercel Blob:", blob.url);

  // 3. Update database SiteSettings
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  const proxyUrl = `/api/blob/${blob.pathname}`;
  await pool.query(
    `UPDATE "SiteSettings" SET "resumePdfUrl" = $1 WHERE id = 'singleton'`,
    ["/resume.pdf"]
  );
  console.log("Updated SiteSettings.resumePdfUrl to '/resume.pdf'");
  await pool.end();
}

main().catch(err => {
  console.error("Resume generation error:", err);
  process.exit(1);
});
