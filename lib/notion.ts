import { Client } from "@notionhq/client";
import type { PartialBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

if (!process.env.NOTION_API_KEY) {
  throw new Error("NOTION_API_KEY is not defined");
}

export const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

// 画像URLをCloudinaryに変換する関数
async function convertToCloudinaryUrl(imageUrl: string) {
  try {
    const response = await fetch('/api/uploadToCloudinary', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ imageUrl }),
    });

    if (!response.ok) {
      throw new Error('Failed to upload to Cloudinary');
    }

    const data = await response.json();
    return data.cloudinaryUrl;
  } catch (error) {
    console.error('Error converting to Cloudinary URL:', error);
    return imageUrl; // エラー時は元のURLを返す
  }
}

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

      // 画像ブロックの処理
      const processedResults = await Promise.all(
        results.map(async (block: any) => {
          if (block.type === 'image') {
            const imageUrl = block.image.type === 'external' 
              ? block.image.external.url 
              : block.image.file.url;
            
            const cloudinaryUrl = await convertToCloudinaryUrl(imageUrl);
            
            if (block.image.type === 'external') {
              block.image.external.url = cloudinaryUrl;
            } else {
              block.image.file.url = cloudinaryUrl;
            }
          }
          return block;
        })
      );

      blocks.push(...processedResults);
      
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