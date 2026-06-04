export type BlogCategory = "best-practice" | "success-stories" | "how-to" | "news";

export interface BlogHeading {
  id: string;
  text: string;
  level: 2 | 3;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  /** One or more category badges shown on cards and the post header. */
  categories: BlogCategory[];
  date: string;
  author: string;
  coverImage: string;
  content: string[];
  headings: BlogHeading[];
}
