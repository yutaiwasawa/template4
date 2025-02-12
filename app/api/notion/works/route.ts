import { notion } from "@/lib/notion";
import { NextResponse } from "next/server";

const dummyWorks = [
  {
    id: "1",
    title: "SNSマーケティングで月間エンゲージメント200%増！化粧品ブランドの事例",
    publishedAt: "2024.03.15",
    category: "marketing"
  },
  {
    id: "2",
    title: "BtoBマーケティング戦略で受注率35%アップ！製造業の成功事例",
    publishedAt: "2024.03.10",
    category: "branding"
  },
  {
    id: "3",
    title: "広告運用改善でCPA50%削減！アパレルECの実績報告",
    publishedAt: "2024.03.05",
    category: "recruitment"
  },
];

export async function GET() {
  try {
    // 開発環境でAPIキーが設定されていない場合はダミーデータを返す
    if (process.env.NODE_ENV === 'development' && !process.env.NOTION_API_KEY) {
      return NextResponse.json({ works: dummyWorks });
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

    const works = await Promise.all(response.results.map(async (page: any) => {
      // カテゴリーのリレーション情報を取得
      const categoryRelation = page.properties.category?.relation?.[0];
      let categorySlug;

      if (categoryRelation) {
        try {
          // リレーション先のカテゴリーページを取得
          const categoryPage = await notion.pages.retrieve({
            page_id: categoryRelation.id,
          });
          // カテゴリーのslugを取得
          categorySlug = (categoryPage as any).properties.slug?.rich_text[0]?.plain_text;
        } catch (error) {
          console.error('Error fetching category:', error);
        }
      }

      return {
        id: page.id,
        title: page.properties.title.title[0]?.plain_text || "",
        publishedAt: new Date(page.last_edited_time).toLocaleDateString('ja-JP', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }).replace(/\//g, '.'),
        category: categorySlug // リレーションから取得したカテゴリーのslug
      };
    }));

    return NextResponse.json({ works });
  } catch (error) {
    console.error('Error fetching works:', error);
    // エラー時もダミーデータを返す
    return NextResponse.json({ works: dummyWorks });
  }
}