import { useState, useEffect } from 'react';

export const useProcessImage = (originalUrl: string | null) => {
  const [processedUrl, setProcessedUrl] = useState<string | null>(originalUrl);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const processImage = async () => {
      if (!originalUrl) return;
      
      setIsLoading(true);
      try {
        const response = await fetch('/api/uploadToCloudinary', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ imageUrl: originalUrl }),
        });

        const data = await response.json();
        
        if (data.success && data.cloudinaryUrl) {
          setProcessedUrl(data.cloudinaryUrl);
        }
      } catch (error) {
        console.error('Error processing image:', error);
        setProcessedUrl(originalUrl);
      } finally {
        setIsLoading(false);
      }
    };

    processImage();
  }, [originalUrl]);

  return { processedUrl, isLoading };
};