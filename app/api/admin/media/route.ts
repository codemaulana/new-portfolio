import { put, del } from "@vercel/blob";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const POST = auth(async function POST(req) {
  if (!req.auth?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Upload to Vercel Blob with adaptive store fallback (Public or Private)
    let blob;
    let isPrivateStore = false;

    try {
      blob = await put(`portfolio/${file.name}`, file, {
        access: "public",
        addRandomSuffix: true,
      });
    } catch (err: unknown) {
      const errStr = String(err);
      if (errStr.includes("private store") || errStr.includes("Private access")) {
        isPrivateStore = true;
        blob = await put(`portfolio/${file.name}`, file, {
          access: "private",
          addRandomSuffix: true,
        });
      } else {
        throw err;
      }
    }

    // If store is private, serve through clean path /api/blob/${blob.pathname}
    const finalUrl = isPrivateStore
      ? `/api/blob/${blob.pathname}`
      : blob.url;

    // Save record to Neon Postgres
    const media = await prisma.media.create({
      data: {
        filename: file.name,
        url: finalUrl,
        mimeType: file.type || "application/octet-stream",
        size: file.size,
        altText: file.name.replace(/\.[^/.]+$/, ""),
      },
    });

    return NextResponse.json({ success: true, media });
  } catch (error) {
    console.error("Media upload error:", error);
    const message = error instanceof Error ? error.message : "Failed to upload media asset";
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
});

export const DELETE = auth(async function DELETE(req) {
  if (!req.auth?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Media ID required" }, { status: 400 });
    }

    const item = await prisma.media.findUnique({ where: { id } });
    if (!item) {
      return NextResponse.json({ error: "Media not found" }, { status: 404 });
    }

    // Extract underlying Vercel Blob URL if routed via /api/blob
    let rawUrl = item.url;
    if (rawUrl.startsWith("/api/blob?url=")) {
      try {
        const parsed = new URL(`http://localhost${rawUrl}`);
        rawUrl = parsed.searchParams.get("url") || rawUrl;
      } catch {
        // Fallback
      }
    }

    // Attempt to remove from Vercel Blob
    try {
      if (rawUrl.includes("blob.vercel-storage.com")) {
        await del(rawUrl);
      }
    } catch (e) {
      console.warn("Failed to delete from blob storage:", e);
    }

    await prisma.media.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Media delete error:", error);
    return NextResponse.json(
      { error: "Failed to delete media asset" },
      { status: 500 }
    );
  }
});
