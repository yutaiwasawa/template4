import { useState, useEffect } from 'react';

export function useProcessImage(url: string) {
  const [processedUrl, setProcessedUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setProcessedUrl(url);
    setIsLoading(false);
  }, [url]);

  return { processedUrl, isLoading };
}