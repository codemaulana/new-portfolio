import { get } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const urlParam = req.nextUrl.searchParams.get("url");
  const pathParam = req.nextUrl.searchParams.get("pathname");
  const target = urlParam || pathParam;

  if (!target) {
    return new NextResponse("Missing url or pathname parameter", { status: 400 });
  }

  try {
    const isPrivate =
      target.includes(".private.blob.vercel-storage.com") ||
      !target.startsWith("http");

    const blob = await get(target, {
      access: isPrivate ? "private" : "public",
    });

    if (!blob || !blob.stream) {
      return new NextResponse("Blob asset not found", { status: 404 });
    }

    const contentType =
      blob.headers.get("content-type") ||
      blob.blob?.contentType ||
      "image/png";

    return new NextResponse(blob.stream, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Failed to stream blob asset:", error);
    return new NextResponse("Failed to stream blob asset", { status: 500 });
  }
}
