import { WorkDetail } from "./WorkDetail";
import { notion } from "../../../lib/notion";
import { redirect } from 'next/navigation';
import type { Case, SimplifiedCase } from "../../../types/work";
import type { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { getWorkNavigation } from "../../../lib/notion-utils";

const DEFAULT_COVER_IMAGE = "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80";

// モックデータ
const MOCK_CASE: Case = {
  id: "mock-id",
  title: "SNSマーケティングで月間エンゲージメント200%増！化粧品ブランドの事例",
  category: { name: "マーケティング", slug: "marketing" },
  publishedAt: "2024.03.15",
  client: "株式会社サンプル",
  period: "2024年1月〜2024年3月",
  coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80",
  description: "化粧品ブランドのSNSマーケティング施策の事例です。",
  challenge: "SNSでのエンゲージメント率が低く、ブランドの認知度向上が課題でした。",
  solution: [
    "ターゲット層の分析と投稿内容の最適化",
    "インフルエンサーマーケティングの活用",
    "広告運用の改善"
  ],
  result: "施策実施後、月間エンゲージメント率が200%増加し、商品の売上も150%向上しました。",
  blocks: []
};

// カテゴリー名を取得する関数
async function getCategoryName(categoryId: string) {
  try {
    const categoryPage = await notion.pages.retrieve({
      page_id: categoryId,
    });
    return {
      name: (categoryPage as any).properties.name.title[0]?.plain_text || "その他",
      slug: (categoryPage as any).properties.slug.rich_text[0]?.plain_text || ""
    };
  } catch (error) {
    console.error('Error fetching category:', error);
    return { name: "その他", slug: "" };
  }
}

async function getWork(id: string): Promise<{ 
  currentCase: Case; 
  prevCase: SimplifiedCase | null; 
  nextCase: SimplifiedCase | null; 
}> {
  try {
    if (process.env.NODE_ENV === 'development' && !process.env.NOTION_API_KEY) {
      return {
        currentCase: MOCK_CASE,
        prevCase: null,
        nextCase: null
      };
    }

    const page = await notion.pages.retrieve({ page_id: id });
    
    // より詳細なデバッグログ
    console.log('Notion Page Raw Data:', {
      id: page.id,
      properties: (page as any).properties,
      // プロパティ名を確認
      propertyNames: Object.keys((page as any).properties),
      // 画像関連
      image: (page as any).properties.Image,
      featuredImage: (page as any).properties.featuredImage,
      // タイトル関連
      name: (page as any).properties.Name,
      title: (page as any).properties.title,
    });

    const blocks = await notion.blocks.children.list({ 
      block_id: id,
      page_size: 100
    });

    // デバッグログを追加
    console.log('Page data:', JSON.stringify({
      id: page.id,
      properties: (page as any).properties,
      blocks: blocks.results.length,
      blockTypes: blocks.results.map((b: any) => b.type)
    }, null, 2));

    const category = (page as any).properties.category?.relation?.[0]?.id 
      ? await getCategoryName((page as any).properties.category.relation[0].id)
      : { name: "その他", slug: "" };

    // 画像URLの取得ロジックを修正
    let coverImage = DEFAULT_COVER_IMAGE;
    const featuredImage = (page as any).properties.Image?.files?.[0] ||
                         (page as any).properties.featuredImage?.files?.[0];
    if (featuredImage) {
      if (featuredImage.type === 'external') {
        coverImage = featuredImage.external.url;
      } else if (featuredImage.type === 'file') {
        coverImage = featuredImage.file.url;
      }
    }

    const currentCase: Case = {
      id: page.id,
      title: (page as any).properties.Name?.title[0]?.plain_text || 
             (page as any).properties.title?.title[0]?.plain_text || "",
      category,
      publishedAt: (page as any).properties.PublishedAt?.date?.start || 
                   (page as any).properties.publishedAt?.date?.start || "",
      client: (page as any).properties.Client?.rich_text[0]?.plain_text || 
              (page as any).properties.client?.rich_text[0]?.plain_text || "",
      period: (page as any).properties.Period?.rich_text[0]?.plain_text || 
              (page as any).properties.period?.rich_text[0]?.plain_text || "",
      coverImage,
      description: (page as any).properties.Description?.rich_text[0]?.plain_text || 
                   (page as any).properties.description?.rich_text[0]?.plain_text || "",
      challenge: (page as any).properties.Challenge?.rich_text[0]?.plain_text || 
                 (page as any).properties.challenge?.rich_text[0]?.plain_text || "",
      solution: (page as any).properties.Solution?.rich_text?.map((text: any) => text.plain_text) || 
                (page as any).properties.solution?.rich_text?.map((text: any) => text.plain_text) || [],
      result: (page as any).properties.Result?.rich_text[0]?.plain_text || 
              (page as any).properties.result?.rich_text[0]?.plain_text || "",
      blocks: blocks.results as BlockObjectResponse[]
    };

    // ナビゲーション情報を取得
    const { prevCase, nextCase } = await getWorkNavigation(id);
    
    // デバッグ用ログを追加
    console.log('Navigation Data:', { prevCase, nextCase });

    return {
      currentCase,
      prevCase,
      nextCase
    };

  } catch (error) {
    console.error('Failed to fetch work:', error);
    if (process.env.NODE_ENV === 'development') {
      return {
        currentCase: MOCK_CASE,
        prevCase: null,
        nextCase: null
      };
    }
    throw error;
  }
}

export const revalidate = 0;

export default async function Page({ params }: { params: { id: string } }) {
  try {
    const workData = await getWork(params.id);
    
    if (!workData || !workData.currentCase) {
      console.error('No work data found');
      redirect('/works');
    }

    return (
      <div className="min-h-screen">
        <WorkDetail
          currentCase={workData.currentCase}
          prevCase={workData.prevCase}
          nextCase={workData.nextCase}
        />
      </div>
    );
  } catch (error) {
    console.error('Error in Page component:', error);
    redirect('/works');
  }
}

export async function generateStaticParams() {
  try {
    // 本番環境のURLを直接指定
    const url = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}/api/notion/works`
      : `${process.env.NEXT_PUBLIC_APP_URL}/api/notion/works`;

    const response = await fetch(url, {
      next: { revalidate: 60 }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch works');
    }

    const data = await response.json();
    return data.works.map((work: { id: string }) => ({
      id: work.id
    }));

  } catch (error) {
    // エラーログを詳細に
    console.error('Failed to generate params:', error, {
      VERCEL_URL: process.env.VERCEL_URL,
      APP_URL: process.env.NEXT_PUBLIC_APP_URL
    });
    return [{ id: 'mock-id' }];
  }
}