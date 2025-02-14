import { Case } from "./Case";
import { unstable_noStore as noStore } from 'next/cache';

export async function CaseServer() {
  noStore(); // キャッシュを無効化
  const works = await getLatestWorks();
  console.log('CaseServer works:', works);
  return <Case works={works} />;
}

async function getLatestWorks() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, '') || 'http://localhost:3000';
    console.log('Fetching from:', `${baseUrl}/api/notion/works`); // デバッグ用

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
    console.log('Fetched data:', data); // デバッグ用
    return data.works.slice(0, 3);
  } catch (error) {
    console.error('Error details:', error);
    return [];
  }
} 