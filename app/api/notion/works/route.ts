import { notion } from "@/lib/notion";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // 開発環境でAPIキーが設定されていない場合はダミーデータを返す
    if (process.env.NODE_ENV === 'development' && !process.env.NOTION_API_KEY) {
      return NextResponse.json({
        works: [
          {
            id: "1",
            title: "SNSマーケティングで月間エンゲージメント200%増！化粧品ブランドの事例",
            publishedAt: "2024.03.15",
          },
          {
            id: "2",
            title: "BtoBマーケティング戦略で受注率35%アップ！製造業の成功事例",
            publishedAt: "2024.03.10",
          },
          {
            id: "3",
            title: "広告運用改善でCPA50%削減！アパレルECの実績報告",
            publishedAt: "2024.03.05",
          },
        ]
      });
    }

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
      publishedAt: new Date(page.last_edited_time).toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }).replace(/\//g, '.'),
    }));

    return NextResponse.json({ works });
  } catch (error) {
    console.error('Failed to fetch works:', error);
    // エラー時もダミーデータを返す
    return NextResponse.json({
      works: [
        {
          id: "1",
          title: "SNSマーケティングで月間エンゲージメント200%増！化粧品ブランドの事例",
          publishedAt: "2024.03.15",
        },
        {
          id: "2",
          title: "BtoBマーケティング戦略で受注率35%アップ！製造業の成功事例",
          publishedAt: "2024.03.10",
        },
        {
          id: "3",
          title: "広告運用改善でCPA50%削減！アパレルECの実績報告",
          publishedAt: "2024.03.05",
        },
      ]
    });
  }
}