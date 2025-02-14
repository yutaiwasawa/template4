import { useState, useEffect } from 'react';

// URLキャッシュ用のMapを作成
const urlCache = new Map<string, string>();

export function useProcessImage(originalUrl: string) {
  const [processedUrl, setProcessedUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!originalUrl) {
      setIsLoading(false);
      return;
    }

    // キャッシュをチェック
    if (urlCache.has(originalUrl)) {
      setProcessedUrl(urlCache.get(originalUrl)!);
      setIsLoading(false);
      return;
    }

    async function processImage() {
      try {
        const response = await fetch('/api/process-image', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ url: originalUrl }),
        });

        if (!response.ok) throw new Error('Failed to process image');
        
        const data = await response.json();
        // キャッシュに保存
        urlCache.set(originalUrl, data.url);
        setProcessedUrl(data.url);
      } catch (error) {
        console.error('Error processing image:', error);
        setProcessedUrl(originalUrl); // エラー時は元のURLを使用
      } finally {
        setIsLoading(false);
      }
    }

    processImage();
  }, [originalUrl]);

  return { processedUrl, isLoading };
}