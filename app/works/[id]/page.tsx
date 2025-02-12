import { WorkDetail } from "./WorkDetail";
import { notion, getBlocks } from "@/lib/notion";
import { redirect } from 'next/navigation';

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

// 個別記事のデータを取得
async function getWork(id: string) {
  // 開発環境でAPIキーが設定されていない場合はダミーデータを返す
  if (process.env.NODE_ENV === 'development' && !process.env.NOTION_API_KEY) {
    return {
      id: id,
      title: "SNSマーケティングで月間エンゲージメント200%増！化粧品ブランドの事例",
      category: "new-business",
      publishedAt: "2024.03.15",
      client: "株式会社サンプル",
      period: "2024年1月〜2024年3月",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80",
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
  }

  try {
    const response = await notion.pages.retrieve({
      page_id: id,
    });

    // 非公開の記事の場合はnullを返す
    if ((response as any).properties.status?.select?.name !== "published") {
      return null;
    }

    // ブロックの取得
    const blocks = await getBlocks(id);

    return {
      id: response.id,
      title: (response as any).properties.title.title[0]?.plain_text || "",
      category: (response as any).properties.category?.select?.name || "new-business",
      publishedAt: new Date((response as any).last_edited_time).toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }).replace(/\//g, '.'),
      client: (response as any).properties.client?.rich_text[0]?.plain_text || "仮のクライアント名",
      period: (response as any).properties.period?.rich_text[0]?.plain_text || "2024年1月〜2024年4月",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80",
      description: (response as any).properties.description?.rich_text[0]?.plain_text || "",
      challenge: (response as any).properties.challenge?.rich_text[0]?.plain_text || "",
      solution: (response as any).properties.solution?.rich_text.map((text: any) => text.plain_text) || [],
      result: (response as any).properties.result?.rich_text[0]?.plain_text || "",
      blocks: blocks,
    };
  } catch (error) {
    console.error('Failed to fetch work:', error);
    return null;
  }
}

export default async function Page({ params }: { params: { id: string } }) {
  const currentWork = await getWork(params.id);
  
  // 非公開の記事や存在しない記事の場合はトップページにリダイレクト
  if (!currentWork) {
    redirect('/works');
  }

  return (
    <WorkDetail
      currentCase={currentWork}
      prevCase={undefined}
      nextCase={undefined}
    />
  );
}