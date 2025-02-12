import { notion } from "@/lib/notion";
import { NextResponse } from "next/server";

const DEFAULT_COVER_IMAGE = "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80";

const dummyWorks = [
  {
    id: "1",
    title: "SNSマーケティングで月間エンゲージメント200%増！化粧品ブランドの事例",
    publishedAt: "2024.03.15",
    category: "marketing",
    coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80"
  },
  {
    id: "2",
    title: "BtoBマーケティング戦略で受注率35%アップ！製造業の成功事例",
    publishedAt: "2024.03.10",
    category: "branding",
    coverImage: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80"
  },
  {
    id: "3",
    title: "広告運用改善でCPA50%削減！アパレルECの実績報告",
    publishedAt: "2024.03.05",
    category: "recruitment",
    coverImage: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&q=80"
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

      // featuredImageプロパティから画像URLを取得
      let coverImage = DEFAULT_COVER_IMAGE;
      const featuredImage = page.properties.featuredImage?.files?.[0];
      if (featuredImage) {
        if (featuredImage.type === 'external') {
          coverImage = featuredImage.external.url;
        } else if (featuredImage.type === 'file') {
          coverImage = featuredImage.file.url;
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
        category: categorySlug,
        coverImage
      };
    }));

    return NextResponse.json({ works });
  } catch (error) {
    console.error('Error fetching works:', error);
    // エラー時もダミーデータを返す
    return NextResponse.json({ works: dummyWorks });
  }
}