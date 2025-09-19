import { getAllPosts } from "@/common/service/data";
import Link from "next/link";

// Komponen ini adalah Server Component karena ia async dan mengambil data
export const SimpleArticleList = async () => {
  const allPosts = await getAllPosts();

  return (
    <ul>
      {allPosts.map((post) => (
        <li key={post.slug} className="mb-4">
          <Link
            href={`/articles/${post.slug}`}
            className="text-xl text-blue-400 hover:underline"
          >
            {post.title}
          </Link>
          <p className="text-sm text-gray-500">
            {new Date(post.date).toLocaleDateString("id-ID")}
          </p>
        </li>
      ))}
    </ul>
  );
};
