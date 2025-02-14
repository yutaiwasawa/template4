import ClientContent from "./components/ClientContent";

// データ取得関数
async function getWorks() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, '') || 'http://localhost:3000';
    console.log('Fetching works from:', `${baseUrl}/api/notion/works`);

    const response = await fetch(`${baseUrl}/api/notion/works`, {
      next: { revalidate: 60 },
      headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      }
    });
    
    if (!response.ok) {
      console.error('Response not OK:', response.status, response.statusText);
      throw new Error('Failed to fetch works');
    }

    const data = await response.json();
    console.log('Fetched works data:', data);
    return data;
  } catch (error) {
    console.error('Error details:', error);
    return { works: [], categories: [] };
  }
}

export default async function WorksPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const currentPage = Number(searchParams.page) || 1;
  const initialData = await getWorks();
  
  return <ClientContent 
    initialData={initialData} 
    currentPage={currentPage}
  />;
}