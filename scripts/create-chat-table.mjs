import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function main() {
  const sql = `
  CREATE TABLE IF NOT EXISTS "ChatMessage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "avatarUrl" TEXT,
    "message" TEXT NOT NULL,
    "isOwner" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
  CREATE INDEX IF NOT EXISTS "ChatMessage_createdAt_idx" ON "ChatMessage"("createdAt");
  `;

  await pool.query(sql);
  console.log("ChatMessage table verified/created in database.");

  // Check count
  const res = await pool.query(`SELECT count(*) FROM "ChatMessage"`);
  console.log("Current ChatMessage count:", res.rows[0].count);
  await pool.end();
}

main().catch(err => {
  console.error("Failed:", err);
  process.exit(1);
});
