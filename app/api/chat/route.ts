import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const messageSchema = z.object({
  message: z.string().trim().min(1, "Message cannot be empty").max(300, "Maximum 300 characters"),
});

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const messages = await prisma.chatMessage.findMany({
      orderBy: { createdAt: "asc" },
      take: 200,
    });

    return NextResponse.json({ messages });
  } catch (error) {
    console.error("Failed to fetch chat messages:", error);
    return NextResponse.json({ error: "Failed to load messages" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    // 1. Identify user from NextAuth session OR guest chat cookie
    const session = await auth();
    const cookieStore = await cookies();
    const chatCookie = cookieStore.get("chat_user")?.value;

    let authorName: string | null = null;
    let authorEmail: string | null = null;
    let authorAvatar: string | null = null;
    let isOwner = false;

    if (session?.user?.name) {
      authorName = session.user.name;
      authorEmail = session.user.email || null;
      authorAvatar = session.user.image || null;
      // Check if this is the portfolio owner
      if (authorEmail && authorEmail.toLowerCase().includes("maulana")) {
        isOwner = true;
      }
    } else if (chatCookie) {
      try {
        const parsed = JSON.parse(chatCookie);
        authorName = parsed.name || "Guest";
        authorEmail = parsed.email || null;
        authorAvatar = parsed.avatarUrl || null;
      } catch {
        // invalid cookie
      }
    }

    if (!authorName) {
      return NextResponse.json(
        { error: "Please sign in with Google to participate in the chat room" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const parsed = messageSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Invalid message" },
        { status: 400 }
      );
    }

    const newMessage = await prisma.chatMessage.create({
      data: {
        name: authorName,
        email: authorEmail,
        avatarUrl: authorAvatar,
        message: parsed.data.message,
        isOwner,
      },
    });

    return NextResponse.json({ success: true, message: newMessage }, { status: 201 });
  } catch (error) {
    console.error("Failed to send chat message:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
