/**
 * Unsplash Photo Widget
 *
 * Displays beautiful random photos from Picsum (Lorem Picsum)
 * Free alternative since Unsplash source.unsplash.com is deprecated
 */

import React, { useState, useEffect } from 'react';
import { BaseWidget } from './BaseWidget';

export const UnsplashWidget: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [loading, setLoading] = useState(true);

  const fetchRandomImage = () => {
    setLoading(true);
    // Using Picsum Photos - free random image API
    // Add random seed to force new image
    const seed = Math.random().toString(36).substring(7);
    setImageUrl(`https://picsum.photos/seed/${seed}/800/600`);
    setLoading(false);
  };

  useEffect(() => {
    fetchRandomImage();
  }, []);

  return (
    <BaseWidget
      title="Photo of the Day"
      icon="📸"
      loading={loading}
      onRefresh={fetchRandomImage}
    >
      <div className="h-full flex flex-col gap-2">
        <img
          src={imageUrl}
          alt="Random photo"
          className="w-full h-48 object-cover rounded-button transition-all duration-standard ease-smooth"
          onLoad={() => setLoading(false)}
          onError={() => {
            setLoading(false);
            console.error('Failed to load image');
          }}
        />
        <p className="text-xs text-text-light-secondary dark:text-text-dark-secondary text-center">
          Photo by Lorem Picsum
        </p>
      </div>
    </BaseWidget>
  );
};
