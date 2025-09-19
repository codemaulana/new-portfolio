import { ArticleRenderer } from "@/components/layouts/article_render";
import { Calendar, User } from "lucide-react";
import { getPost } from "@/common/service/data";
import ButtonBack from "@/components/layouts/elements/button_back";

export default async function PostPage({ params }: any) {
  const { id } = await params;
  const post = await getPost(id);

  if (!post) {
    return (
      <div className="flex items-center justify-center min-h-screen text-center ">
        <div>
          <h1 className="text-4xl font-bold text-white">404</h1>
          <p className="text-lg  mt-2">Artikel Tidak Ditemukan</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="max-w-3xl mx-auto px-4 lg:px-10 py-20 lg:py-16">
        <ButtonBack href="/articles" />
        <header className="mt-4 mb-12">
          <h1 className="text-xl lg:text-3xl font-extrabold  leading-tight mb-4">
            {post.title}
          </h1>
          <p className="text-sm max-w-2xl">{post.summary}</p>
          <div className="flex justify-center items-center gap-6 text-sm  mt-6">
            <div className="flex items-center gap-2">
              <User size={16} />
              <span>By {post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span>
                {new Date(post.date).toLocaleDateString("id-ID", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>
        </header>

        <article className=" rounded-lg  shadow-lg">
          <div className="flex flex-wrap gap-4 mb-8">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="bg-blue-600 px-5 text-xs text-white font-semibold  py-2 rounded-xl"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="prose prose-invert lg:prose-xl max-w-none prose-h2:text-red-500">
            <ArticleRenderer content={post.content} />
          </div>
        </article>
      </div>
    </div>
  );
}
