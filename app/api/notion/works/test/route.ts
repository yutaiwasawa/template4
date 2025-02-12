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

    return NextResponse.json({
      success: true,
      results: response.results.map((page: any) => ({
        id: page.id,
        featuredImage: page.properties.featuredImage?.files?.[0],
        title: page.properties.title?.title[0]?.plain_text || "",
      }))
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}