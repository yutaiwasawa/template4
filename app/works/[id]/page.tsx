import { WorkDetail } from "./WorkDetail";
import { notion } from "@/lib/notion";

// 静的パラメータを生成
export async function generateStaticParams() {
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
  try {
    const response = await notion.pages.retrieve({
      page_id: id,
    });

    return {
      id: response.id,
      title: (response as any).properties.title.title[0]?.plain_text || "",
      category: "new-business", // 仮の値
      publishedAt: new Date((response as any).last_edited_time).toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }).replace(/\//g, '.'),
      client: "仮のクライアント名",
      period: "2024年1月〜2024年4月",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80",
      description: "説明文",
      challenge: "課題",
      solution: ["解決策1", "解決策2"],
      result: "成果",
    };
  } catch (error) {
    console.error('Failed to fetch work:', error);
    return null;
  }
}

export default async function Page({ params }: { params: { id: string } }) {
  const currentWork = await getWork(params.id);
  if (!currentWork) return null;

  return (
    <WorkDetail
      currentCase={currentWork}
      prevCase={undefined}
      nextCase={undefined}
    />
  );
}