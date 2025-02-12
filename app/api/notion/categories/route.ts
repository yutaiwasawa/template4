import { notion } from "@/lib/notion";
import { NextResponse } from "next/server";

const dummyCategories = [
  { id: "1", name: "マーケティング", slug: "marketing" },
  { id: "2", name: "ブランディング", slug: "branding" },
  { id: "3", name: "採用戦略", slug: "recruitment" },
];

export async function GET() {
  try {
    // 開発環境でAPIキーが設定されていない場合はダミーデータを返す
    if (process.env.NODE_ENV === 'development' && !process.env.NOTION_API_KEY) {
      return NextResponse.json({ categories: dummyCategories });
    }

    const response = await notion.databases.query({
      database_id: process.env.NOTION_CATEGORIES_DATABASE_ID!,
      sorts: [
        {
          property: "sortOrder",
          direction: "ascending"
        }
      ]
    });

    const categories = response.results.map((page: any) => ({
      id: page.id,
      name: page.properties.name.title[0]?.plain_text || "",
      slug: page.properties.slug.rich_text[0]?.plain_text || "",
    }));

    return NextResponse.json({ categories });
  } catch (error) {
    // エラー時もダミーデータを返す
    return NextResponse.json({ categories: dummyCategories });
  }
}