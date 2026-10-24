import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const settingsUpdateSchema = z.object({
  ownerName: z.string().min(1, "Full Name is required"),
  roleTitle: z.string().min(1, "Professional Title is required"),
  emailPublic: z.string().email("Valid email is required"),
  location: z.string().min(1, "Location is required"),
  heroHeadline: z.string().min(1, "Hero Headline is required"),
  heroSubheadline: z.string().min(1, "Hero Subheadline is required"),
  heroAvatarUrl: z.string().nullable().optional(),
  resumePdfUrl: z.string().nullable().optional(),
  aboutShort: z.string().min(1, "Short bio is required"),
  aboutFull: z.string().min(1, "Full bio description is required"),
  socialLinks: z.record(z.string(), z.string()).optional(),
});

export async function PUT(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const parsed = settingsUpdateSchema.safeParse(body);

    if (!parsed.success) {
      const issueDetails = parsed.error.issues
        .map((i) => `${i.path.join(".") || "field"}: ${i.message}`)
        .join("; ");
      return NextResponse.json(
        { error: `Validation failed: ${issueDetails}`, details: parsed.error.format() },
        { status: 400 }
      );
    }

    const updated = await prisma.siteSettings.upsert({
      where: { id: "singleton" },
      update: parsed.data,
      create: {
        id: "singleton",
        ...parsed.data,
        socialLinks: parsed.data.socialLinks || {},
        seoDefaultTitle: "Muhammad Nur Maulana",
        seoDefaultDesc: "Full Stack Software Engineer",
      },
    });

    revalidateTag("site-settings", "max");
    revalidatePath("/", "layout");
    revalidatePath("/about");
    revalidatePath("/");

    return NextResponse.json({ success: true, settings: updated });
  } catch (error) {
    console.error("Failed to update site settings:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
