import { useState, useEffect } from 'react';

export function useProcessImage(originalUrl: string) {
  const [processedUrl, setProcessedUrl] = useState(originalUrl);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function processImage() {
      if (!originalUrl) return;
      
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
        setProcessedUrl(data.url);
      } catch (error) {
        console.error('Error processing image:', error);
      } finally {
        setIsLoading(false);
      }
    }

    processImage();
  }, [originalUrl]);

  return { processedUrl, isLoading };
}