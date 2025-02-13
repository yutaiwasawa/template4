import type { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export type Category = {
  id?: string;
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

export type Case = {
  id: string;
  title: string;
  category: Category;
  publishedAt: string;
  client: string;
  period: string;
  coverImage: string | null;
  description: string;
  challenge: string;
  solution: string[];
  result: string;
  blocks?: BlockObjectResponse[];
};

export type SimplifiedCase = {
  id: string;
  title: string;
  category: Category;
  publishedAt: string;
  coverImage: string;
};

export type WorkDetailProps = {
  currentCase: Case;
  prevCase: SimplifiedCase | null;
  nextCase: SimplifiedCase | null;
}; 