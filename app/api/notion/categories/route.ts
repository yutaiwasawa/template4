import { notion } from "@/lib/notion";
import { NextResponse } from "next/server";

export async function GET() {
  try {
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
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}