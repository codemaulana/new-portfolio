import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const timelineSchema = z.object({
  type: z.enum(["EXPERIENCE", "EDUCATION"]).default("EXPERIENCE"),
  title: z.string().min(1, "Title is required"),
  organization: z.string().min(1, "Organization is required"),
  location: z.string().nullable().optional(),
  periodStart: z.string().min(1, "Start period is required"),
  periodEnd: z.string().nullable().optional(),
  current: z.boolean().default(false),
  description: z.string().min(1, "Description is required"),
  techStack: z.array(z.string()).default([]),
  order: z.number().int().default(0),
});

export const POST = auth(async function POST(req) {
  if (!req.auth?.user) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const parsed = timelineSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.format() },
        { status: 400 }
      );
    }

    const item = await prisma.timelineItem.create({
      data: parsed.data,
    });

    revalidatePath("/about");
    revalidatePath("/");

    return NextResponse.json({ success: true, item }, { status: 201 });
  } catch (error) {
    console.error("Failed to create timeline item:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
});

export const PUT = auth(async function PUT(req) {
  if (!req.auth?.user) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json({ error: "Timeline item ID is required" }, { status: 400 });
    }

    const parsed = timelineSchema.partial().safeParse(updateData);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.format() },
        { status: 400 }
      );
    }

    const updated = await prisma.timelineItem.update({
      where: { id },
      data: parsed.data,
    });

    revalidatePath("/about");
    revalidatePath("/");

    return NextResponse.json({ success: true, item: updated });
  } catch (error) {
    console.error("Failed to update timeline item:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
});

export const DELETE = auth(async function DELETE(req) {
  if (!req.auth?.user) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Timeline item ID is required" }, { status: 400 });
    }

    await prisma.timelineItem.delete({ where: { id } });

    revalidatePath("/about");
    revalidatePath("/");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete timeline item:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
});
