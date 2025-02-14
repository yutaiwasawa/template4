// app/api/notion/works/[id]/route.ts
import { notion } from "../../../../../lib/notion";
import { NextResponse } from "next/server";
import { getCategoryName, getBlocks } from "../../../../../lib/notion-utils";

// DEFAULT_COVER_IMAGEを直接定義（route.tsから移植）
const DEFAULT_COVER_IMAGE = "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    console.log('Fetching work with ID:', params.id); // IDの確認

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

    console.log('All works response:', allWorksResponse); // レスポンスの確認

    // 現在の記事のインデックスを見つける
    const currentIndex = allWorksResponse.results.findIndex(page => page.id === params.id);
    
    // 前後の記事を取得
    const prevWork = currentIndex < allWorksResponse.results.length - 1 
      ? allWorksResponse.results[currentIndex + 1] 
      : null;
    const nextWork = currentIndex > 0 
      ? allWorksResponse.results[currentIndex - 1] 
      : null;

    // 現在の記事の詳細を取得
    const response = await notion.pages.retrieve({
      page_id: params.id,
    });

    // デバッグログ追加
    console.log('API Route Notion Data:', {
      id: response.id,
      properties: (response as any).properties,
      propertyNames: Object.keys((response as any).properties),
    });

    // デバッグ用ログ追加
    console.log('Notion response:', JSON.stringify({
      properties: (response as any).properties,
      featuredImage: (response as any).properties.featuredImage,
      title: (response as any).properties.title,
    }, null, 2));

    // 非公開の記事の場合は404を返す
    if ((response as any).properties.status?.select?.name !== "published") {
      return NextResponse.json({ error: 'Work not found' }, { status: 404 });
    }

    // カテゴリー情報を取得
    const categoryRelation = (response as any).properties.category?.relation?.[0];
    const category = categoryRelation
      ? await getCategoryName(categoryRelation.id)
      : { name: "その他", slug: "" };

    // featuredImageプロパティから画像URLを取得（修正）
    let coverImage = DEFAULT_COVER_IMAGE;
    const featuredImage = (response as any).properties.Image?.files?.[0] ||
                         (response as any).properties.featuredImage?.files?.[0];
    if (featuredImage) {
      if (featuredImage.type === 'external') {
        coverImage = featuredImage.external.url;
      } else if (featuredImage.type === 'file') {
        coverImage = featuredImage.file.url;
      }
    }

    // ブロックの取得
    const blocks = await getBlocks(params.id);

    // 前後の記事の基本情報を取得
    const getPrevNextWork = async (page: any) => {
      if (!page) return null;
      
      const categoryId = page.properties.category?.relation?.[0]?.id;
      const category = categoryId ? await getCategoryName(categoryId) : { name: "その他", slug: "" };
      
      // 前後の記事の画像も同じロジックで取得（修正）
      let workCoverImage = DEFAULT_COVER_IMAGE;
      const workFeaturedImage = page.properties.Image?.files?.[0] ||
                               page.properties.featuredImage?.files?.[0];
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

    return NextResponse.json({
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
        blocks: blocks,
      },
      prevCase: prevCaseData,
      nextCase: nextCaseData
    });

  } catch (error) {
    console.error('Detailed error:', error); // エラーの詳細を表示
    return NextResponse.json({ 
      error: 'Internal Server Error',
      details: (error as any).message // エラーメッセージを追加
    }, { status: 500 });
  }
}