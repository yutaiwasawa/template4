import { notion } from "./notion";
import type { 
  PageObjectResponse, 
  TitlePropertyItemObjectResponse,
  RichTextItemResponse 
} from "@notionhq/client/build/src/api-endpoints";
import type { SimplifiedCase } from "../types/work";
import { DEFAULT_COVER_IMAGE } from "./constants";

export async function getCategoryName(categoryId: string) {
  try {
    const categoryPage = await notion.pages.retrieve({
      page_id: categoryId,
    });
    return {
      name: (categoryPage as any).properties.name.title[0]?.plain_text || "その他",
      slug: (categoryPage as any).properties.slug.rich_text[0]?.plain_text || ""
    };
  } catch (error) {
    return { name: "その他", slug: "" };
  }
}

export async function getBlocks(blockId: string) {
  const blocks = await notion.blocks.children.list({
    block_id: blockId,
  });
  return blocks.results;
}

// ナビゲーション用の関数
export async function getWorkNavigation(currentId: string) {
  try {
    // 単純に全ての公開記事を取得
    const response = await notion.databases.query({
      database_id: process.env.NOTION_WORKS_DATABASE_ID!,
      filter: {
        property: "status",
        select: { equals: "published" }
      }
      // ソートは一旦なしで
    });

    // デバッグ用
    console.log('All published works:', {
      total: response.results.length,
      currentId,
      allIds: response.results.map(p => p.id)
    });

    // 現在の記事の位置を見つける
    const currentIndex = response.results.findIndex(page => page.id === currentId);

    // 前後の記事を取得
    const prevCase = currentIndex > 0 ? {
      id: response.results[currentIndex - 1].id,
      title: (response.results[currentIndex - 1] as any).properties.title.title[0].plain_text,
      category: { name: "その他", slug: "" },
      publishedAt: "",
      coverImage: DEFAULT_COVER_IMAGE
    } : null;

    const nextCase = currentIndex < response.results.length - 1 ? {
      id: response.results[currentIndex + 1].id,
      title: (response.results[currentIndex + 1] as any).properties.title.title[0].plain_text,
      category: { name: "その他", slug: "" },
      publishedAt: "",
      coverImage: DEFAULT_COVER_IMAGE
    } : null;

    return { prevCase, nextCase };
  } catch (error) {
    console.error('Error in getWorkNavigation:', error);
    return { prevCase: null, nextCase: null };
  }
}

// 最新の実績3件を取得する関数
export async function getLatestWorks(limit: number = 3): Promise<SimplifiedCase[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/notion/works`);
    if (!response.ok) throw new Error('Failed to fetch works');
    const data = await response.json();
    return data.works.slice(0, limit);
  } catch (error) {
    console.error('Error fetching latest works:', error);
    return [];
  }
}

export async function getWorksByPage(page: number, perPage: number) {
  const allWorks = await getWorks();
  const start = (page - 1) * perPage;
  const end = start + perPage;
  
  return {
    works: allWorks.works.slice(start, end),
    totalPages: Math.ceil(allWorks.works.length / perPage)
  };
}

// getWorks関数も必要
export async function getWorks() {
  if (process.env.NODE_ENV === 'development') {
    try {
      // 開発環境：APIルート経由
      const response = await fetch('/api/notion/works');
      if (!response.ok) throw new Error('Failed to fetch works');
      return await response.json();
    } catch (error) {
      console.error('Error fetching works:', error);
      return { works: [], categories: [] };
    }
  } else {
    // 本番環境：直接Notionアクセス
    try {
      const response = await notion.databases.query({
        database_id: process.env.NOTION_WORKS_DATABASE_ID!,
        filter: {
          property: "status",
          select: { equals: "published" }
        }
      });

      // カテゴリー情報も取得
      const categoriesResponse = await notion.databases.query({
        database_id: process.env.NOTION_CATEGORIES_DATABASE_ID!
      });

      // データを整形
      const works = await Promise.all(response.results.map(async (page: any) => {
        const categoryId = page.properties.category?.relation[0]?.id;
        const category = categoryId 
          ? await getCategoryName(categoryId)
          : { name: "その他", slug: "" };

        return {
          id: page.id,
          title: page.properties.title.title[0]?.plain_text || "",
          coverImage: page.cover?.external?.url || page.cover?.file?.url || DEFAULT_COVER_IMAGE,
          category,
          publishedAt: page.properties.publishedAt?.date?.start || ""
        };
      }));

      const categories = categoriesResponse.results.map((page: any) => ({
        id: page.id,
        name: page.properties.name.title[0]?.plain_text || "",
        slug: page.properties.slug.rich_text[0]?.plain_text || ""
      }));

      return { works, categories };
    } catch (error) {
      console.error('Error details:', error);
      return { works: [], categories: [] };
    }
  }
} 