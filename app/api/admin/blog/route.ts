import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const postSchema = z.object({
  title: z.string().min(1, "Headline is required"),
  slug: z.string().optional(),
  excerpt: z.string().min(1, "Lead excerpt is required"),
  content: z.string().min(1, "Story content is required"),
  coverImage: z.string().nullable().optional(),
  tags: z.array(z.string()).default([]),
  published: z.boolean().default(false),
  readingTime: z.number().int().min(1).default(1),
  seoTitle: z.string().nullable().optional(),
  seoDesc: z.string().nullable().optional(),
});

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const parsed = postSchema.safeParse(body);

    if (!parsed.success) {
      const issueDetails = parsed.error.issues
        .map((i) => `${i.path.join(".") || "field"}: ${i.message}`)
        .join("; ");
      return NextResponse.json(
        { error: `Validation failed: ${issueDetails}`, details: parsed.error.format() },
        { status: 400 }
      );
    }

    const { slug, published, ...rest } = parsed.data;
    const finalSlug = slug && slug.trim() ? slugify(slug) : slugify(rest.title);

    let uniqueSlug = finalSlug;
    let count = 1;
    while (await prisma.post.findUnique({ where: { slug: uniqueSlug } })) {
      uniqueSlug = `${finalSlug}-${count}`;
      count++;
    }

    const post = await prisma.post.create({
      data: {
        ...rest,
        slug: uniqueSlug,
        published,
        publishedAt: published ? new Date() : null,
      },
    });

    revalidatePath("/blog");
    revalidatePath("/");
    revalidateTag("published-posts", "max");

    return NextResponse.json({ success: true, post }, { status: 201 });
  } catch (error) {
    console.error("Failed to create post:", error);
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
      return NextResponse.json({ error: "Post ID is required" }, { status: 400 });
    }

    const parsed = postSchema.partial().safeParse(updateData);
    if (!parsed.success) {
      const issueDetails = parsed.error.issues
        .map((i) => `${i.path.join(".") || "field"}: ${i.message}`)
        .join("; ");
      return NextResponse.json(
        { error: `Validation failed: ${issueDetails}`, details: parsed.error.format() },
        { status: 400 }
      );
    }

    const existing = await prisma.post.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    let finalSlug = existing.slug;
    if (parsed.data.slug && parsed.data.slug !== existing.slug) {
      finalSlug = slugify(parsed.data.slug);
      const duplicate = await prisma.post.findFirst({
        where: { slug: finalSlug, NOT: { id } },
      });
      if (duplicate) {
        finalSlug = `${finalSlug}-${Date.now().toString().slice(-4)}`;
      }
    }

    // Handle published date
    let publishedAt = existing.publishedAt;
    if (parsed.data.published !== undefined) {
      if (parsed.data.published && !existing.publishedAt) {
        publishedAt = new Date();
      } else if (!parsed.data.published) {
        publishedAt = null;
      }
    }

    const updated = await prisma.post.update({
      where: { id },
      data: {
        ...parsed.data,
        slug: finalSlug,
        publishedAt,
      },
    });

    revalidatePath("/blog");
    revalidatePath(`/blog/${finalSlug}`);
    revalidatePath("/");
    revalidateTag("published-posts", "max");

    return NextResponse.json({ success: true, post: updated });
  } catch (error) {
    console.error("Failed to update post:", error);
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
      return NextResponse.json({ error: "Post ID is required" }, { status: 400 });
    }

    await prisma.post.delete({ where: { id } });

    revalidatePath("/blog");
    revalidatePath("/");
    revalidateTag("published-posts", "max");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete post:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
