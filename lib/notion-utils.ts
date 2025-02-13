import { notion } from "./notion";

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