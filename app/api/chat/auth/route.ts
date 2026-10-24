import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { auth } from "@/lib/auth";
import { z } from "zod";

const googleUserSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.string().trim().email("Valid Gmail address is required"),
  avatarUrl: z.string().nullable().optional(),
});

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await auth();
    if (session?.user?.name) {
      return NextResponse.json({
        user: {
          name: session.user.name,
          email: session.user.email || null,
          avatarUrl: session.user.image || null,
        },
      });
    }

    const cookieStore = await cookies();
    const chatCookie = cookieStore.get("chat_user")?.value;
    if (chatCookie) {
      try {
        const parsed = JSON.parse(chatCookie);
        return NextResponse.json({ user: parsed });
      } catch {
        // invalid cookie
      }
    }

    return NextResponse.json({ user: null });
  } catch (error) {
    console.error("Failed to check chat session:", error);
    return NextResponse.json({ user: null });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = googleUserSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Invalid Google user details" },
        { status: 400 }
      );
    }

    const user = {
      name: parsed.data.name,
      email: parsed.data.email,
      avatarUrl: parsed.data.avatarUrl || null,
    };

    const cookieStore = await cookies();
    cookieStore.set("chat_user", JSON.stringify(user), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",
    });

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error("Failed to sign in chat user:", error);
    return NextResponse.json({ error: "Sign in failed" }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("chat_user");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to sign out chat user:", error);
    return NextResponse.json({ error: "Sign out failed" }, { status: 500 });
  }
}
