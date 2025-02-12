import { WorkDetail } from "./WorkDetail";
import { notion, getBlocks } from "@/lib/notion";
import { redirect } from 'next/navigation';
import type { PartialBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

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

  try {
    // すべての公開記事を取得
    const allWorksResponse = await notion.databases.query({
      database_id: process.env.NOTION_WORKS_DATABASE_ID!,
      filter: {
        property: "status",
        select: {
          equals: "published"
        }
      },
      sorts: [
        {
          timestamp: "created_time",
          direction: "descending"
        }
      ]
    });

    // 現在の記事のインデックスを見つける
    const currentIndex = allWorksResponse.results.findIndex(page => page.id === id);
    
    // 前後の記事を取得
    const prevWork = currentIndex < allWorksResponse.results.length - 1 
      ? allWorksResponse.results[currentIndex + 1] 
      : null;
    const nextWork = currentIndex > 0 
      ? allWorksResponse.results[currentIndex - 1] 
      : null;

    // 現在の記事の詳細を取得
    const response = await notion.pages.retrieve({
      page_id: id,
    });

    // 非公開の記事の場合はnullを返す
    if ((response as any).properties.status?.select?.name !== "published") {
      return null;
    }

    // カテゴリー情報を取得
    const categoryRelation = (response as any).properties.category?.relation?.[0];
    const category = categoryRelation
      ? await getCategoryName(categoryRelation.id)
      : { name: "その他", slug: "" };

    // featuredImageプロパティから画像URLを取得
    let coverImage = DEFAULT_COVER_IMAGE;
    const featuredImage = (response as any).properties.featuredImage?.files?.[0];
    if (featuredImage) {
      if (featuredImage.type === 'external') {
        coverImage = featuredImage.external.url;
      } else if (featuredImage.type === 'file') {
        coverImage = featuredImage.file.url;
      }
    }

    // ブロックの取得
    const blocks = await getBlocks(id);

    // 前後の記事の基本情報を取得
    const getPrevNextWork = async (page: any) => {
      if (!page) return null;
      
      const categoryId = page.properties.category?.relation?.[0]?.id;
      const category = categoryId ? await getCategoryName(categoryId) : { name: "その他", slug: "" };
      
      let workCoverImage = DEFAULT_COVER_IMAGE;
      const workFeaturedImage = page.properties.featuredImage?.files?.[0];
      if (workFeaturedImage) {
        if (workFeaturedImage.type === 'external') {
          workCoverImage = workFeaturedImage.external.url;
        } else if (workFeaturedImage.type === 'file') {
          workCoverImage = workFeaturedImage.file.url;
        }
      }

      return {
        id: page.id,
        title: page.properties.title.title[0]?.plain_text || "",
        category,
        publishedAt: new Date(page.created_time).toLocaleDateString('ja-JP', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }).replace(/\//g, '.'),
        coverImage: workCoverImage
      };
    };

    const [prevCaseData, nextCaseData] = await Promise.all([
      getPrevNextWork(prevWork),
      getPrevNextWork(nextWork)
    ]);

    return {
      currentCase: {
        id: response.id,
        title: (response as any).properties.title.title[0]?.plain_text || "",
        category,
        publishedAt: new Date((response as any).created_time).toLocaleDateString('ja-JP', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }).replace(/\//g, '.'),
        client: (response as any).properties.client?.rich_text[0]?.plain_text || "仮のクライアント名",
        period: (response as any).properties.period?.rich_text[0]?.plain_text || "2024年1月〜2024年4月",
        coverImage,
        description: (response as any).properties.description?.rich_text[0]?.plain_text || "",
        challenge: (response as any).properties.challenge?.rich_text[0]?.plain_text || "",
        solution: (response as any).properties.solution?.rich_text.map((text: any) => text.plain_text) || [],
        result: (response as any).properties.result?.rich_text[0]?.plain_text || "",
        blocks: blocks as PartialBlockObjectResponse[],
      },
      prevCase: prevCaseData,
      nextCase: nextCaseData
    };
  } catch (error) {
    console.error('Failed to fetch work:', error);
    return null;
  }
}

export default async function Page({ params }: { params: { id: string } }) {
  const workData = await getWork(params.id);
  
  // 非公開の記事や存在しない記事の場合はトップページにリダイレクト
  if (!workData) {
    redirect('/works');
  }

  return (
    <WorkDetail
      currentCase={workData.currentCase}
      prevCase={workData.prevCase}
      nextCase={workData.nextCase}
    />
  );
}