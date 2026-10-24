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

function sanitizeUrl(val: string | null | undefined): string | null {
  if (!val || typeof val !== "string") return null;
  const trimmed = val.trim();
  if (!trimmed || trimmed === "") return null;
  if (!trimmed.startsWith("http://") && !trimmed.startsWith("https://")) {
    return `https://${trimmed}`;
  }
  return trimmed;
}

const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().optional(),
  tagline: z.string().optional().default(""),
  problem: z.string().optional().default(""),
  solution: z.string().optional().default(""),
  stack: z.array(z.string()).default([]),
  category: z.string().default("Web App"),
  featured: z.boolean().default(false),
  order: z.number().int().default(0),
  published: z.boolean().default(true),
  demoUrl: z.string().nullable().optional().transform(sanitizeUrl),
  repoUrl: z.string().nullable().optional().transform(sanitizeUrl),
  coverImage: z.string().min(1, "Cover image is required"),
  gallery: z.array(z.string()).default([]),
  results: z.string().nullable().optional(),
});

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const parsed = projectSchema.safeParse(body);

    if (!parsed.success) {
      const issueDetails = parsed.error.issues
        .map((i) => `${i.path.join(".") || "field"}: ${i.message}`)
        .join("; ");
      return NextResponse.json(
        { error: `Validation failed: ${issueDetails}`, details: parsed.error.format() },
        { status: 400 }
      );
    }

    const { slug, ...rest } = parsed.data;
    const finalSlug = slug && slug.trim() ? slugify(slug) : slugify(rest.title);

    let uniqueSlug = finalSlug;
    let count = 1;
    while (await prisma.project.findUnique({ where: { slug: uniqueSlug } })) {
      uniqueSlug = `${finalSlug}-${count}`;
      count++;
    }

    const project = await prisma.project.create({
      data: {
        ...rest,
        tagline: rest.tagline || rest.title,
        problem: rest.problem || "",
        solution: rest.solution || "",
        stack: rest.stack && rest.stack.length > 0 ? rest.stack : ["Web"],
        slug: uniqueSlug,
        demoUrl: rest.demoUrl || null,
        repoUrl: rest.repoUrl || null,
        results: rest.results || null,
      },
    });

    revalidatePath("/projects");
    revalidatePath("/");
    revalidateTag("published-projects", "max");

    return NextResponse.json({ success: true, project }, { status: 201 });
  } catch (error) {
    console.error("Failed to create project:", error);
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
      return NextResponse.json({ error: "Project ID is required" }, { status: 400 });
    }

    const parsed = projectSchema.partial().safeParse(updateData);
    if (!parsed.success) {
      const issueDetails = parsed.error.issues
        .map((i) => `${i.path.join(".") || "field"}: ${i.message}`)
        .join("; ");
      return NextResponse.json(
        { error: `Validation failed: ${issueDetails}`, details: parsed.error.format() },
        { status: 400 }
      );
    }

    const existing = await prisma.project.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    let finalSlug = existing.slug;
    if (parsed.data.slug && parsed.data.slug !== existing.slug) {
      finalSlug = slugify(parsed.data.slug);
      const duplicate = await prisma.project.findFirst({
        where: { slug: finalSlug, NOT: { id } },
      });
      if (duplicate) {
        finalSlug = `${finalSlug}-${Date.now().toString().slice(-4)}`;
      }
    }

    const updated = await prisma.project.update({
      where: { id },
      data: {
        ...parsed.data,
        slug: finalSlug,
        tagline: parsed.data.tagline !== undefined ? parsed.data.tagline : existing.tagline,
        problem: parsed.data.problem !== undefined ? parsed.data.problem : existing.problem,
        solution: parsed.data.solution !== undefined ? parsed.data.solution : existing.solution,
        demoUrl: parsed.data.demoUrl !== undefined ? parsed.data.demoUrl : existing.demoUrl,
        repoUrl: parsed.data.repoUrl !== undefined ? parsed.data.repoUrl : existing.repoUrl,
        results: parsed.data.results !== undefined ? (parsed.data.results || null) : existing.results,
      },
    });

    revalidatePath("/projects");
    revalidatePath(`/projects/${finalSlug}`);
    revalidatePath("/");
    revalidateTag("published-projects", "max");

    return NextResponse.json({ success: true, project: updated });
  } catch (error) {
    console.error("Failed to update project:", error);
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
      return NextResponse.json({ error: "Project ID is required" }, { status: 400 });
    }

    await prisma.project.delete({ where: { id } });

    revalidatePath("/projects");
    revalidatePath("/");
    revalidateTag("published-projects", "max");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete project:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
