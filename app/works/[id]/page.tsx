import { WorkDetail } from "./WorkDetail";
import { notion } from "../../../lib/notion";
import { redirect } from 'next/navigation';
import type { Case, SimplifiedCase } from "../../../types/work";
import type { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

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
    if (process.env.NODE_ENV === 'development') {
      return {
        currentCase: MOCK_CASE,
        prevCase: null,
        nextCase: null
      };
    }

    const page = await notion.pages.retrieve({ page_id: id });
    const blocks = await notion.blocks.children.list({ 
      block_id: id,
      page_size: 100
    });

    const category = (page as any).properties.category?.relation?.[0]?.id 
      ? await getCategoryName((page as any).properties.category.relation[0].id)
      : { name: "その他", slug: "" };

    // coverImageの処理を単純化
    const coverImage = (page as any).cover?.external?.url || 
                      (page as any).cover?.file?.url || 
                      DEFAULT_COVER_IMAGE;

    const currentCase: Case = {
      id: page.id,
      title: (page as any).properties.title.title[0]?.plain_text || "",
      category,
      publishedAt: (page as any).properties.publishedAt?.date?.start || "",
      client: (page as any).properties.client?.rich_text?.[0]?.plain_text || "",
      period: (page as any).properties.period?.rich_text?.[0]?.plain_text || "",
      coverImage,  // 生のURLをそのまま使用
      description: (page as any).properties.description?.rich_text?.[0]?.plain_text || "",
      challenge: (page as any).properties.challenge?.rich_text?.[0]?.plain_text || "",
      solution: (page as any).properties.solution?.rich_text?.map((text: any) => text.plain_text) || [],
      result: (page as any).properties.result?.rich_text?.[0]?.plain_text || "",
      blocks: blocks.results as BlockObjectResponse[]
    };

    return {
      currentCase,
      prevCase: null,
      nextCase: null
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

export const revalidate = 60;

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