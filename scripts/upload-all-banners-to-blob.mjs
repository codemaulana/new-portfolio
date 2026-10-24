import dotenv from "dotenv";
dotenv.config();
import fs from "fs";
import { put } from "@vercel/blob";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const allBanners = [
  {
    slug: "sub-millisecond-cache-invalidation-redis-nextjs-16",
    filePath: "C:/Users/muham/.gemini/antigravity/brain/489a23be-5010-4416-a6e5-343666dfd104/next_redis_cache_banner_1792841396259.jpg",
    blobPath: "articles/sub-millisecond-cache-invalidation-redis-nextjs-16.jpg",
  },
  {
    slug: "architecting-resilient-grpc-microservices-golang",
    filePath: "C:/Users/muham/.gemini/antigravity/brain/489a23be-5010-4416-a6e5-343666dfd104/golang_grpc_resilient_banner_1792841429673.jpg",
    blobPath: "articles/architecting-resilient-grpc-microservices-golang.jpg",
  },
  {
    slug: "offline-first-sqlite-synchronization-flutter",
    filePath: "C:/Users/muham/.gemini/antigravity/brain/489a23be-5010-4416-a6e5-343666dfd104/flutter_offline_sync_banner_1792841512961.jpg",
    blobPath: "articles/offline-first-sqlite-synchronization-flutter.jpg",
  },
  {
    slug: "membangun-arsitektur-web-nextjs-16-contoh",
    filePath: "C:/Users/muham/.gemini/antigravity/brain/489a23be-5010-4416-a6e5-343666dfd104/nextjs_16_architecture_banner_1792841413105.jpg",
    blobPath: "articles/membangun-arsitektur-web-nextjs-16.jpg",
  },
  {
    slug: "solving-zustand-state-hydration-react-19",
    filePath: "C:/Users/muham/.gemini/antigravity/brain/489a23be-5010-4416-a6e5-343666dfd104/use_hydration_zustand_banner_v2_1792841324538.jpg",
    blobPath: "articles/solving-zustand-state-hydration.jpg",
  },
  {
    slug: "react-custom-hooks-usedebounce-optimasi-ux",
    filePath: "C:/Users/muham/.gemini/antigravity/brain/489a23be-5010-4416-a6e5-343666dfd104/react_debounce_throttle_banner_1792841531834.jpg",
    blobPath: "articles/react-custom-hooks-usedebounce-optimasi-ux.jpg",
  },
  {
    slug: "spa-vs-mpa-vs-hybrid-ssr-arsitektur-web-2026",
    filePath: "C:/Users/muham/.gemini/antigravity/brain/489a23be-5010-4416-a6e5-343666dfd104/web_architecture_2026_banner_1792841551156.jpg",
    blobPath: "articles/spa-vs-mpa-vs-hybrid-ssr-arsitektur-web-2026.jpg",
  },
  {
    slug: "strategi-state-management-flutter-riverpod-contoh",
    filePath: "C:/Users/muham/.gemini/antigravity/brain/489a23be-5010-4416-a6e5-343666dfd104/flutter_riverpod_state_banner_1792841573767.jpg",
    blobPath: "articles/strategi-state-management-flutter-riverpod.jpg",
  },
  {
    slug: "high-performance-concurrency-golang-worker-pool",
    filePath: "C:/Users/muham/.gemini/antigravity/brain/489a23be-5010-4416-a6e5-343666dfd104/golang_worker_pool_banner_v2_1792841612050.jpg",
    blobPath: "articles/high-performance-concurrency-golang-worker-pool.jpg",
  },
];

async function main() {
  console.log(`Starting upload of ${allBanners.length} banners to Vercel Blob...`);
  for (const item of allBanners) {
    if (!fs.existsSync(item.filePath)) {
      console.warn(`File missing for ${item.slug}: ${item.filePath}`);
      continue;
    }
    const buf = fs.readFileSync(item.filePath);
    console.log(`Uploading ${item.blobPath} (${(buf.length / 1024).toFixed(1)} KB)...`);
    const blob = await put(item.blobPath, buf, {
      access: "private",
      contentType: "image/jpeg",
      allowOverwrite: true,
    });
    console.log(`Uploaded to blob: ${blob.url}`);

    const proxyUrl = `/api/blob/${blob.pathname}`;
    await pool.query(
      `UPDATE "Post" SET "coverImage" = $1 WHERE "slug" = $2`,
      [proxyUrl, item.slug]
    );
    console.log(`Updated post '${item.slug}' -> ${proxyUrl}\n`);
  }
  console.log("All 9 banners successfully uploaded to Vercel Blob and synced to database!");
  await pool.end();
}

main().catch(err => {
  console.error("Upload failed:", err);
  process.exit(1);
});
