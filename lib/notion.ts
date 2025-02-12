import { Client } from "@notionhq/client";

// 環境変数のチェックを開発環境でのみ行う
if (process.env.NODE_ENV === 'development') {
  if (!process.env.NOTION_API_KEY) {
    console.warn("Warning: Missing NOTION_API_KEY environment variable");
  }

  if (!process.env.NOTION_CATEGORIES_DATABASE_ID) {
    console.warn("Warning: Missing NOTION_CATEGORIES_DATABASE_ID environment variable");
  }

  if (!process.env.NOTION_WORKS_DATABASE_ID) {
    console.warn("Warning: Missing NOTION_WORKS_DATABASE_ID environment variable");
  }
}

export const notion = new Client({
  auth: process.env.NOTION_API_KEY || 'dummy-key-for-development',
});