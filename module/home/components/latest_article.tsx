import { getLatestArticle } from "@/common/service/data";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function LatestArticle() {
  const latestArticles = await getLatestArticle();
  return (
    <section className="border-t-4 border-neutral-400 dark:border-neutral-600 py-4">
      <h1 className="text-xl md:text-3xl font-bold mb-8">Latest Articles</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-x-8 gap-y-12">
        {latestArticles.map((article) => (
          <Link
            href={`/articles/${article.slug}`}
            key={article.title}
            className="cursor-pointer"
          >
            <Image
              src={article.image}
              alt={article.title}
              width={500}
              height={500}
              className="h-52 md:h-28 lg:h-36 object-cover hover:scale-95 rounded-md lg:hover:scale-90 transition-all duration-500 ease-in-out"
            />
            <div className="my-2">
              <h1 className="truncate text-lg font-semibold">
                {article.title}
              </h1>
              <p className="text-xs font-semibold text-neutral-600 dark:text-neutral-400">
                {new Date(article.date).toLocaleDateString("id-ID", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
