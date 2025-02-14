import ClientContent from "./components/ClientContent";

// データ取得関数
async function getWorks() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || ''}/api/notion/works`, {
      next: { revalidate: 60 }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch works');
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching works:', error);
    return { works: [], categories: [] };
  }
}

// ページレベルでのrevalidate設定
export const revalidate = 60;

export default async function WorksPage() {
  const initialData = await getWorks();
  
  return <ClientContent initialData={initialData} />;
}