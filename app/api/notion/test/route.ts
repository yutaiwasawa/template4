import { NextResponse } from "next/server";
import { testNotionConnection } from "@/lib/notion";

export async function GET() {
  try {
    const isConnected = await testNotionConnection();
    return NextResponse.json({
      success: true,
      connected: isConnected,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to test Notion connection",
      },
      { status: 500 }
    );
  }
}