export interface ArticleData {
  id: string;
  title: string;
  author: string;
  date: string;
  summary: string;
  tags: string[];
  content: any[];
}

export interface ArticleMeta {
  slug: string;
  title: string;
  date: string;
  image: string;
}
