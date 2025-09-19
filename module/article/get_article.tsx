import { getAllPosts } from "@/common/service/data";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function GetArticle() {
  const allArticles = await getAllPosts();
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
        {allArticles.map((article, idx) => (
          <Link
            href={`/articles/${article.slug}`}
            key={article.title}
            className={`cursor-pointer ${idx === 0 ? "md:col-span-2" : ""}`}
          >
            <Image
              src={article.image}
              alt={article.title}
              width={500}
              height={500}
              className={`h-56 w-full object-cover hover:scale-95 rounded-md lg:hover:scale-90 transition-all duration-500 ease-in-out ${
                idx === 0 ? "md:h-[470px]" : "md:h-56"
              }`}
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
    </div>
  );
}
