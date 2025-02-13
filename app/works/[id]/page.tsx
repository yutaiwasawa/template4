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
    // // APIエンドポイントを使用してデータを取得
    // console.log('Fetching URL:', `${process.env.NEXT_PUBLIC_APP_URL}/api/notion/works/${id}`); // URLの確認用
    // 一時的にURLをハードコード
    // 相対パスを使用
    console.log('Fetching URL:', `/api/notion/works/${id}`);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/notion/works/${id}`,
      {
        next: {
          revalidate: 60
        }
      }
    );

    if (!res.ok) {
      console.error('API Response not OK:', await res.text()); // エラーの詳細を確認
      throw new Error('Failed to fetch work');
    }

    const data = await res.json();
    console.log('Fetched data:', data); // 取得したデータの確認
    return data;

  } catch (error) {
    console.error('Failed to fetch work:', error);
    throw error; // エラーをスローして、親コンポーネントで処理
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