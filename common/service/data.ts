import path from "path";
import { ArticleData, ArticleMeta } from "./custom-interface";
import fs from "fs/promises";

export async function getPost(id: string): Promise<ArticleData | null> {
  const filePath = path.join(process.cwd(), "common", "_data", `${id}.json`);
  try {
    const fileContent = await fs.readFile(filePath, "utf8");
    return JSON.parse(fileContent);
  } catch (error) {
    return null;
  }
}

export async function getAllPosts(): Promise<ArticleMeta[]> {
  const dir = path.join(process.cwd(), "common", "_data");
  const filenames = await fs.readdir(dir);

  const posts = await Promise.all(
    filenames.map(async (filename) => {
      const filePath = path.join(dir, filename);
      const fileContent = await fs.readFile(filePath, "utf8");
      const data = JSON.parse(fileContent);

      return {
        slug: data.slug,
        title: data.title,
        date: data.date,
        image: data.image,
        content: data.content,
      };
    })
  );

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function generateStaticParams() {
  const dir = path.join(process.cwd(), "common", "_data");
  const filenames = await fs.readdir(dir);
  return filenames.map((filename) => ({
    id: filename.replace(".json", ""),
  }));
}

export async function getLatestArticle() {
  const dir = path.join(process.cwd(), "common", "_data");
  const filenames = await fs.readdir(dir);

  const posts = await Promise.all(
    filenames.map(async (filename) => {
      const filePath = path.join(dir, filename);
      const fileContent = await fs.readFile(filePath, "utf8");
      const data = JSON.parse(fileContent);

      return {
        slug: data.slug,
        title: data.title,
        date: data.date,
        image: data.image,
      };
    })
  );

  posts.sort(
    (a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return posts.slice(0, 3);
}
