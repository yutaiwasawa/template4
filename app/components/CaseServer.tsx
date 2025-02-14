import { Case } from "./Case";
import { getLatestWorks } from "../../lib/notion-utils";
import { unstable_noStore as noStore } from 'next/cache';

export async function CaseServer() {
  noStore();
  try {
    console.log('=== CaseServer Debug ===');
    console.log('1. Function Start');
    
    const works = await getLatestWorks();
    
    console.log('2. Works fetched:', works.length);
    return <Case works={works} />;
  } catch (error) {
    console.error('CaseServer Error:', error);
    return <Case works={[]} />;
  }
} 