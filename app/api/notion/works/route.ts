import { notion } from "@/lib/notion";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_WORKS_DATABASE_ID!,
      filter: {
        property: "status",
        select: {
          equals: "published"
        }
      },
    });

    const works = response.results.map((page: any) => ({
      id: page.id,
      title: page.properties.title.title[0]?.plain_text || "",
    }));

    return NextResponse.json({ works });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch works" },
      { status: 500 }
    );
  }
}