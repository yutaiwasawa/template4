import { WorkDetail } from "./WorkDetail";
import { notion, getBlocks } from "@/lib/notion";
import { redirect } from 'next/navigation';

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
    // 開発環境でAPIキーが設定されていない場合はダミーデータを返す
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

    console.log('Fetching URL:', `${process.env.NEXT_PUBLIC_APP_URL}/api/notion/works/${id}`);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/notion/works/${id}`,
      {
        next: { revalidate: 60 }
      }
    );

    if (!res.ok) {
      console.error('API Response not OK:', await res.text());
      throw new Error('Failed to fetch work');
    }

    const data = await res.json();
    console.log('Fetched data:', data);
    return data;

  } catch (error) {
    console.error('Failed to fetch work:', error);
    throw error;
  }
}

export default async function Page({ params }: { params: { id: string } }) {
  try {
    const workData = await getWork(params.id);
    
    if (!workData || !workData.currentCase) {
      console.error('No work data found');
      redirect('/works');
    }

    return (
      <WorkDetail
        currentCase={workData.currentCase}
        prevCase={workData.prevCase}
        nextCase={workData.nextCase}
      />
    );
  } catch (error) {
    console.error('Error in Page component:', error);
    redirect('/works');
  }
}