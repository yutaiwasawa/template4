import { notion } from "./notion";
import type { 
  PageObjectResponse, 
  TitlePropertyItemObjectResponse,
  RichTextItemResponse 
} from "@notionhq/client/build/src/api-endpoints";

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

// ナビゲーション用の型定義
type NavigationCase = {
  id: string;
  title: string;
};

// ナビゲーション用の関数
export async function getWorkNavigation(currentId: string) {
  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_WORKS_DATABASE_ID!,
      filter: {
        property: "status",
        select: { equals: "published" }
      },
      sorts: [{ property: "PublishedAt", direction: "descending" }]
    });

    const currentIndex = response.results.findIndex(page => page.id === currentId);

    const getTitle = (page: PageObjectResponse) => {
      const titleProperty = (page.properties.Name as { type: "title", title: Array<{ plain_text: string }> });
      return titleProperty.title[0]?.plain_text ?? "";
    };

    const prevCase = currentIndex < response.results.length - 1 ? {
      id: response.results[currentIndex + 1].id,
      title: getTitle(response.results[currentIndex + 1] as PageObjectResponse)
    } : null;

    const nextCase = currentIndex > 0 ? {
      id: response.results[currentIndex - 1].id,
      title: getTitle(response.results[currentIndex - 1] as PageObjectResponse)
    } : null;

    return { prevCase, nextCase };
  } catch (error) {
    console.error('Error fetching navigation:', error);
    return { prevCase: null, nextCase: null };
  }
} 