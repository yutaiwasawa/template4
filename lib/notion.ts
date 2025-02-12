import { Client } from "@notionhq/client";
import type { PartialBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

if (process.env.NODE_ENV === 'production' && !process.env.NOTION_API_KEY) {
  throw new Error("Missing NOTION_API_KEY environment variable in production");
}

export const notion = new Client({
  auth: process.env.NOTION_API_KEY || 'dummy-key-for-development',
});

// ブロックの取得
export async function getBlocks(blockId: string): Promise<PartialBlockObjectResponse[]> {
  try {
    const blocks = [];
    let cursor;
    
    while (true) {
      const { results, next_cursor } = await notion.blocks.children.list({
        block_id: blockId,
        start_cursor: cursor,
      });

      blocks.push(...results);
      
      if (!next_cursor) {
        break;
      }
      cursor = next_cursor;
    }

    return blocks;
  } catch (error) {
    console.error('Failed to fetch blocks:', error);
    return [];
  }
}