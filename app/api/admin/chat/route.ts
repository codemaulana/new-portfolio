import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const replySchema = z.object({
  message: z.string().trim().min(1, "Message cannot be empty").max(300, "Max 300 characters"),
  replyToName: z.string().optional(),
});

export const dynamic = "force-dynamic";

export const GET = auth(async function GET(req) {
  if (!req.auth?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const comments = await prisma.chatMessage.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ comments });
  } catch (error) {
    console.error("Failed to fetch admin comments:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
});

export const POST = auth(async function POST(req) {
  if (!req.auth?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const parsed = replySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Validation error" },
        { status: 400 }
      );
    }

    const { message, replyToName } = parsed.data;
    const finalContent =
      replyToName && !message.startsWith(`@${replyToName}`)
        ? `@${replyToName} ${message}`
        : message;

    const reply = await prisma.chatMessage.create({
      data: {
        name: "Muhammad Nur Maulana",
        email: req.auth.user.email || "codemaulana@gmail.com",
        avatarUrl: "/profile-avatar.png",
        message: finalContent,
        isOwner: true,
      },
    });

    revalidatePath("/chat");
    return NextResponse.json({ success: true, comment: reply }, { status: 201 });
  } catch (error) {
    console.error("Failed to post admin reply:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
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
      return NextResponse.json({ error: "Comment ID is required" }, { status: 400 });
    }

    await prisma.chatMessage.delete({ where: { id } });
    revalidatePath("/chat");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete comment:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
});
