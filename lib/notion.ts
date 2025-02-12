import { Client } from "@notionhq/client";

if (!process.env.NOTION_API_KEY) {
  throw new Error("Missing NOTION_API_KEY environment variable");
}

export const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

export async function testNotionConnection() {
  try {
    await notion.users.list({});
    return true;
  } catch (error) {
    return false;
  }
}