import { WorkDetail } from "./WorkDetail";
import { notion, getBlocks } from "@/lib/notion";
import { redirect } from 'next/navigation';

// 型定義
type Work = {
  id: string;
  title: string;
  category: {
    name: string;
    slug: string;
  };
  publishedAt: string;
  client: string;
  period: string;
  coverImage: string;
  description: string;
  challenge: string;
  solution: string[];
  result: string;
  blocks: Block[];
};

type WorkDetailProps = {
  currentCase: Work;
  prevCase: Work | null;
  nextCase: Work | null;
};

type Block = {
  type: string;
  id: string;
  [key: string]: any;
};

const DEFAULT_COVER_IMAGE = "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80";

// 静的パラメータを生成
export async function generateStaticParams() {
  if (process.env.NODE_ENV === 'development' && !process.env.NOTION_API_KEY) {
    return [{ id: '1' }, { id: '2' }, { id: '3' }];
  }

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

    return response.results.map((page) => ({
      id: page.id,
    }));
  } catch (error) {
    console.error('Failed to generate static params:', error);
    return [];
  }
}

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

// 個別記事のデータを取得
async function getWork(id: string) {
  try {
    if (process.env.NODE_ENV === 'development' && !process.env.NOTION_API_KEY) {
      return {
        currentCase: {
          id: id,
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
        },
        prevCase: null,
        nextCase: null
      };
    }

    const page = await notion.pages.retrieve({ page_id: id });
    const blocks = await getBlocks(id);

    const currentCase = {
      id: page.id,
      title: (page as any).properties.title.title[0]?.plain_text || "",
      category: {
        name: (page as any).properties.category?.relation?.[0]?.id 
          ? await getCategoryName((page as any).properties.category.relation[0].id)
          : { name: "その他", slug: "" }
      },
      publishedAt: (page as any).properties.publishedAt?.date?.start || "",
      client: (page as any).properties.client?.rich_text?.[0]?.plain_text || "",
      period: (page as any).properties.period?.rich_text?.[0]?.plain_text || "",
      coverImage: (page as any).cover?.external?.url || (page as any).cover?.file?.url || DEFAULT_COVER_IMAGE,
      description: (page as any).properties.description?.rich_text?.[0]?.plain_text || "",
      challenge: (page as any).properties.challenge?.rich_text?.[0]?.plain_text || "",
      solution: (page as any).properties.solution?.rich_text?.map((text: any) => text.plain_text) || [],
      result: (page as any).properties.result?.rich_text?.[0]?.plain_text || "",
      blocks: blocks
    };

    return {
      currentCase,
      prevCase: null,
      nextCase: null
    };

  } catch (error) {
    console.error('Failed to fetch work:', error);
    throw error;
  }
}

// ISRの設定
export const revalidate = 60;

export default async function Page({ params }: { params: { id: string } }) {
  try {
    const workData = await getWork(params.id);
    
    if (!workData || !workData.currentCase) {
      console.error('No work data found');
      redirect('/works');
    }

    return (
      <WorkDetail
        currentCase={workData.currentCase as Work}
        prevCase={workData.prevCase as Work | null}
        nextCase={workData.nextCase as Work | null}
      />
    );
  } catch (error) {
    console.error('Error in Page component:', error);
    redirect('/works');
  }
}