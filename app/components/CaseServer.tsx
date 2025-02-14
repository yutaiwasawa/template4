import { Case } from "./Case";

export async function CaseServer() {
  const works = await getLatestWorks();
  console.log('CaseServer works:', works);
  return <Case works={works} />;
}

async function getLatestWorks() {
  try {
    // 完全なURLを構築
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/notion/works`, {
      next: { revalidate: 60 },
      // 以下を追加
      headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch works');
    }

    const data = await response.json();
    // 最新3件のみを返す
    return data.works.slice(0, 3);
  } catch (error) {
    console.error('Error fetching latest works:', error);
    return [];
  }
} 