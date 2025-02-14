import ClientContent from "./components/ClientContent";
import { getWorks } from '../../lib/notion-utils';

// キャッシュ設定を追加
export const revalidate = 60;  // 60秒間キャッシュ

export default async function WorksPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  // 初期データをサーバーサイドで取得（キャッシュ付き）
  const initialData = await getWorks();
  const currentPage = searchParams.page ? parseInt(searchParams.page) : 1;

  return (
    <ClientContent 
      initialData={initialData} 
      currentPage={currentPage} 
    />
  );
}