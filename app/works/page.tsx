import ClientContent from "./components/ClientContent";
import { getWorksByPage } from '../../lib/notion-utils';

// キャッシュ設定を追加
export const revalidate = 60;  // 60秒間キャッシュ

export default async function WorksPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const currentPage = searchParams.page ? parseInt(searchParams.page) : 1;
  const initialData = await getWorksByPage(currentPage);

  return (
    <ClientContent 
      initialData={initialData} 
      currentPage={currentPage} 
    />
  );
}