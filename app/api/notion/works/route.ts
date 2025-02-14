import { notion } from "../../../../lib/notion";
import { NextResponse } from "next/server";
import { Work } from '../../../../types/work';
import { getCategoryName } from '../../../../lib/notion-utils';

const DEFAULT_COVER_IMAGE = "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80";

const dummyWorks: Work[] = [
  {
    id: "1",
    title: "SNSマーケティングで月間エンゲージメント200%増！化粧品ブランドの事例",
    publishedAt: "2024.03.15",
    category: {
      name: "マーケティング",
      slug: "marketing"
    },
    coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80"
  },
  {
    id: "2",
    title: "BtoBマーケティング戦略で受注率35%アップ！製造業の成功事例",
    publishedAt: "2024.03.10",
    category: { name: "ブランディング", slug: "branding" },
    coverImage: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80"
  },
  {
    id: "3",
    title: "広告運用改善でCPA50%削減！アパレルECの実績報告",
    publishedAt: "2024.03.05",
    category: { name: "リクルーティング", slug: "recruitment" },
    coverImage: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&q=80"
  },
];

export const revalidate = 60; // 60秒ごとに再検証

export async function GET() {
  try {
    console.log('=== API Debug ===');
    console.log('Environment:', process.env.NODE_ENV);
    console.log('API Key:', process.env.NOTION_API_KEY?.substring(0, 5) + '...');
    console.log('Works DB ID:', process.env.NOTION_WORKS_DATABASE_ID);
    console.log('Categories DB ID:', process.env.NOTION_CATEGORIES_DATABASE_ID);

    // APIキーがない場合はダミーデータを返す
    if (!process.env.NOTION_API_KEY || !process.env.NOTION_WORKS_DATABASE_ID) {
      console.log('Using dummy data due to missing credentials');
      return NextResponse.json({ works: dummyWorks, categories: [] });
    }

    const response = await notion.databases.query({
      database_id: process.env.NOTION_WORKS_DATABASE_ID,
      filter: {
        property: "status",
        select: { equals: "published" }
      }
    });

    // カテゴリーデータの取得
    const categoriesResponse = await notion.databases.query({
      database_id: process.env.NOTION_CATEGORIES_DATABASE_ID!
    });

    const works = await Promise.all(response.results.map(async (page: any) => {
      const categoryId = page.properties.category?.relation[0]?.id;
      const category = categoryId 
        ? await getCategoryName(categoryId)
        : { name: "その他", slug: "" };

      return {
        id: page.id,
        title: page.properties.title.title[0]?.plain_text || "",
        coverImage: page.cover?.external?.url || page.cover?.file?.url || DEFAULT_COVER_IMAGE,
        category,
        publishedAt: page.properties.publishedAt?.date?.start || ""
      };
    }));

    const categories = categoriesResponse.results.map((page: any) => ({
      id: page.id,
      name: page.properties.name.title[0]?.plain_text || "",
      slug: page.properties.slug.rich_text[0]?.plain_text || ""
    }));

    return NextResponse.json({ works, categories });
  } catch (error) {
    console.error('=== API Error ===');
    console.error('Error details:', error);
    // エラー時はダミーデータを返す（500エラーを避ける）
    return NextResponse.json({ works: dummyWorks, categories: [] });
  }
}