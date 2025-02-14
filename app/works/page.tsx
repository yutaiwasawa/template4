import ClientContent from "./components/ClientContent";
import { getWorks } from '../../lib/notion-utils';

export default async function WorksPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  // 初期データをサーバーサイドで取得
  const initialData = await getWorks();
  const currentPage = searchParams.page ? parseInt(searchParams.page) : 1;

  return (
    <ClientContent 
      initialData={initialData} 
      currentPage={currentPage} 
    />
  );
}