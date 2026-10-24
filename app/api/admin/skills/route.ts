import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const skillSchema = z.object({
  name: z.string().min(1, "Skill name is required"),
  category: z.enum(["PRIMARY_STACK", "FAMILIAR", "TOOLS_DEVOPS"]).default("PRIMARY_STACK"),
  iconName: z.string().nullable().optional(),
  order: z.number().int().default(0),
  highlight: z.boolean().default(false),
});

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const parsed = skillSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.format() },
        { status: 400 }
      );
    }

    const skill = await prisma.skill.create({
      data: parsed.data,
    });

    revalidatePath("/about");
    revalidatePath("/");

    return NextResponse.json({ success: true, skill }, { status: 201 });
  } catch (error) {
    console.error("Failed to create skill:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json({ error: "Skill ID is required" }, { status: 400 });
    }

    const parsed = skillSchema.partial().safeParse(updateData);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.format() },
        { status: 400 }
      );
    }

    const updated = await prisma.skill.update({
      where: { id },
      data: parsed.data,
    });

    revalidatePath("/about");
    revalidatePath("/");

    return NextResponse.json({ success: true, skill: updated });
  } catch (error) {
    console.error("Failed to update skill:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Skill ID is required" }, { status: 400 });
    }

    await prisma.skill.delete({ where: { id } });

    revalidatePath("/about");
    revalidatePath("/");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete skill:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
