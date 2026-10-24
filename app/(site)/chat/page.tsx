import { Metadata } from "next";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ChatRoom } from "@/components/chat/ChatRoom";

export const metadata: Metadata = {
  title: "Chat Room | Muhammad Nur Maulana",
  description: "Leave your impression, feedback, or ask questions in the public Chat Room.",
  alternates: {
    canonical: "https://codemaulana.web.id/chat",
  },
};

export const dynamic = "force-dynamic";

export default async function ChatPage() {
  const [session, initialMessages] = await Promise.all([
    auth(),
    prisma.chatMessage.findMany({
      orderBy: { createdAt: "desc" },
      take: 100,
    }),
  ]);

  const serializedMessages = initialMessages.map((m) => ({
    id: m.id,
    name: m.name,
    email: m.email,
    avatarUrl: m.avatarUrl,
    message: m.message,
    isOwner: m.isOwner,
    createdAt: m.createdAt.toISOString(),
  }));

  return (
    <ChatRoom
      initialUser={session?.user || null}
      initialMessages={serializedMessages}
    />
  );
}
