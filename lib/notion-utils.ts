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