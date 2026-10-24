import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ArrowLeft, ArrowRight, Calendar, Clock, Tag, Share2, Sparkles } from "lucide-react";
import { BlogBanner } from "@/components/blog/BlogBanner";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.post.findUnique({
    where: { slug },
  });

  if (!post) {
    return { title: "Article Not Found" };
  }

  return {
    title: `${post.title} | Muhammad Nur Maulana`,
    description: post.excerpt,
    alternates: {
      canonical: `https://codemaulana.web.id/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : [],
      url: `https://codemaulana.web.id/blog/${slug}`,
      type: "article",
      publishedTime: post.publishedAt?.toISOString(),
    },
  };
}

export async function generateStaticParams() {
  const posts = await prisma.post.findMany({
    select: { slug: true },
  });
  return posts.map((p) => ({ slug: p.slug }));
}

export const dynamic = "force-dynamic";

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await prisma.post.findUnique({
    where: { slug },
  });

  if (!post || !post.published) {
    notFound();
  }

  // Related posts
  const relatedPosts = await prisma.post.findMany({
    where: {
      published: true,
      NOT: { id: post.id },
    },
    take: 2,
  });

  // Extract headings for Table of Contents (supports both Markdown and TipTap HTML)
  const isHtml = post.content.trim().startsWith("<");
  const headings: { level: number; text: string; id: string }[] = [];

  if (isHtml) {
    const regex = /<h([23])[^>]*>(.*?)<\/h\1>/gi;
    let match;
    while ((match = regex.exec(post.content)) !== null) {
      const level = parseInt(match[1] || "2", 10);
      const text = (match[2] || "").replace(/<[^>]*>?/gm, "").trim();
      const id = text.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
      if (text) headings.push({ level, text, id });
    }
  } else {
    post.content
      .split("\n")
      .filter((line) => line.startsWith("# ") || line.startsWith("## "))
      .forEach((line) => {
        const level = line.startsWith("## ") ? 2 : 1;
        const text = line.replace(/^#{1,2}\s+/, "").trim();
        const id = text.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
        headings.push({ level, text, id });
      });
  }

  return (
    <article className="max-w-4xl mx-auto space-y-12 sm:space-y-16 pb-20 px-4 sm:px-6 pt-4 sm:pt-6">
      <div>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Journal</span>
        </Link>
      </div>

      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-muted-foreground">
          {post.publishedAt && (
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              <span>
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  dateStyle: "long",
                })}
              </span>
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            <span>{post.readingTime} min read</span>
          </span>
        </div>

        <h1 className="font-sans text-3xl sm:text-5xl font-bold tracking-tight text-foreground leading-[1.15]">
          {post.title}
        </h1>

        <p className="text-base sm:text-lg text-muted-foreground font-light leading-relaxed">
          {post.excerpt}
        </p>

        <div className="flex flex-wrap gap-2 pt-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full border border-border bg-surface text-xs font-mono text-muted-foreground"
            >
              <Tag className="h-3 w-3" />
              <span>{tag}</span>
            </span>
          ))}
        </div>
      </header>

      <div className="w-full relative rounded-3xl overflow-hidden border border-border/80 bg-surface shadow-xl">
        {post.coverImage && !post.coverImage.startsWith("/images/blog") ? (
          <div className="aspect-video min-h-[320px] relative">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              priority
              unoptimized={post.coverImage.startsWith("/api/blob")}
              sizes="(max-width: 1024px) 100vw, 896px"
              className="object-cover"
            />
          </div>
        ) : (
          <BlogBanner slug={post.slug} className="aspect-video min-h-[260px] sm:min-h-[380px] w-full" />
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-6">
        {headings.length > 0 && (
          <aside className="hidden lg:block lg:col-span-4 space-y-4">
            <div className="sticky top-28 p-5 rounded-2xl border border-border bg-surface/50 space-y-3">
              <div className="text-xs font-mono uppercase tracking-wider text-accent font-semibold">
                Table of Contents
              </div>
              <nav className="space-y-1.5 text-xs">
                {headings.map((h, i) => (
                  <a
                    key={i}
                    href={`#${h.id}`}
                    className={`block text-muted-foreground hover:text-foreground transition-colors line-clamp-1 ${
                      h.level === 2 ? "pl-3 text-[11px]" : "font-medium"
                    }`}
                  >
                    {h.text}
                  </a>
                ))}
              </nav>
            </div>
          </aside>
        )}

        <div className={headings.length > 0 ? "lg:col-span-8" : "lg:col-span-12"}>
          {isHtml ? (
            <div
              className="prose dark:prose-invert max-w-none text-foreground font-normal leading-relaxed text-sm sm:text-base prose-headings:font-sans prose-headings:font-bold prose-headings:tracking-tight prose-img:rounded-2xl prose-img:border prose-img:border-border/80 prose-blockquote:border-l-4 prose-blockquote:border-accent prose-blockquote:italic"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          ) : (
            <div className="prose dark:prose-invert max-w-none space-y-6 text-foreground font-light leading-relaxed text-sm sm:text-base">
              {post.content.split("\n\n").map((block, idx) => {
                if (block.startsWith("# ")) {
                  const text = block.replace("# ", "");
                  const id = text.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
                  return (
                    <h2 key={idx} id={id} className="font-sans text-2xl sm:text-3xl font-bold pt-4 scroll-mt-28">
                      {text}
                    </h2>
                  );
                }
                if (block.startsWith("## ")) {
                  const text = block.replace("## ", "");
                  const id = text.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
                  return (
                    <h3 key={idx} id={id} className="font-sans text-xl sm:text-2xl font-bold pt-3 scroll-mt-28">
                      {text}
                    </h3>
                  );
                }
                if (block.startsWith("```")) {
                  const cleanCode = block.replace(/```[a-z]*\n?/g, "");
                  return (
                    <pre
                      key={idx}
                      className="p-4 rounded-xl border border-border bg-zinc-950 text-zinc-100 font-mono text-xs overflow-x-auto leading-relaxed"
                    >
                      <code>{cleanCode}</code>
                    </pre>
                  );
                }
                return (
                  <p key={idx} className="leading-relaxed text-muted-foreground">
                    {block}
                  </p>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl border border-border/80 bg-surface/40 backdrop-blur-md flex flex-col sm:flex-row items-center gap-5 sm:gap-6 mt-12 shadow-xs">
        <div className="h-16 w-16 sm:h-18 sm:w-18 rounded-2xl bg-gradient-to-br from-[#008f7a] to-[#005f52] text-white flex items-center justify-center font-sans font-bold text-2xl shadow-md shrink-0 border-2 border-border/80 select-none">
          M
        </div>
        <div className="space-y-1 text-center sm:text-left">
          <div className="font-sans font-bold text-base text-foreground">Written by Muhammad Nur Maulana</div>
          <p className="text-xs text-muted-foreground leading-relaxed font-light">
            Full Stack Developer (Next.js, Laravel, Flutter). Focused on web performance, clean architecture, and modern mobile systems.
          </p>
        </div>
      </div>

      {relatedPosts.length > 0 && (
        <section className="pt-12 border-t border-border space-y-6">
          <h2 className="font-sans font-bold text-xl sm:text-2xl text-foreground tracking-tight">Related Articles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {relatedPosts.map((rp) => (
              <Link
                key={rp.id}
                href={`/blog/${rp.slug}`}
                className="group p-4 rounded-2xl border border-border/70 bg-surface/30 backdrop-blur-md hover:bg-surface/60 hover:border-accent/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[16/9] w-full rounded-xl overflow-hidden mb-3 border border-border/50">
                    <BlogBanner slug={rp.slug} />
                  </div>
                  <div className="text-[11px] font-mono text-muted-foreground mb-1.5 flex items-center gap-2">
                    <Clock className="h-3 w-3" />
                    <span>{rp.readingTime} min read</span>
                  </div>
                  <h3 className="font-sans font-bold text-sm sm:text-base text-foreground group-hover:text-accent transition-colors line-clamp-2 leading-snug">
                    {rp.title}
                  </h3>
                </div>
                <div className="flex items-center gap-1 text-xs font-semibold text-accent pt-3 border-t border-border/40 mt-3">
                  <span>Read article</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
