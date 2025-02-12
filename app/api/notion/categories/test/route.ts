import { notion } from "@/lib/notion";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const database = await notion.databases.retrieve({
      database_id: process.env.NOTION_CATEGORIES_DATABASE_ID!,
    });

    return NextResponse.json({
      success: true,
      exists: true,
      title: database.title[0]?.plain_text || "categories",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to connect to categories database",
      },
      { status: 500 }
    );
  }
}