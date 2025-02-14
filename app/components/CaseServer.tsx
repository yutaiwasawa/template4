import { getLatestWorks } from "../../lib/notion-utils";
import { Case } from "./Case";

export async function CaseServer() {
  const works = await getLatestWorks(3);
  console.log('CaseServer works:', works);
  return <Case works={works} />;
} 