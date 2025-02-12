export type Category = {
  id: string;
  name: string;
  slug: string;
};

export type Work = {
  id: string;
  title: string;
  publishedAt: string;
  category: {
    name: string;
    slug: string;
  } | null;
  coverImage: string;
  description?: string;
  client?: string;
  period?: string;
  challenge?: string;
  solution?: string[];
  result?: string;
  blocks?: any[]; // Notionのブロック用
}; 