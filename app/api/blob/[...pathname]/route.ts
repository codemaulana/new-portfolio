import { get } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ pathname: string[] }> }
) {
  const { pathname } = await context.params;
  const rawPath = pathname.join("/");
  const fullPath = pathname.map((p) => decodeURIComponent(p)).join("/");

  try {
    let blob;
    try {
      blob = await get(fullPath, { access: "private" });
    } catch {
      blob = await get(rawPath, { access: "private" });
    }

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
