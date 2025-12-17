/**
 * Motivational Quote + Image Widget
 * Inspirational quotes with beautiful background images
 */

import React, { useState, useEffect, useCallback } from 'react';
import { BaseWidget } from './BaseWidget';

interface Quote {
  content: string;
  author: string;
}

const MOTIVATIONAL_QUOTES: Quote[] = [
  { content: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { content: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { content: "Success is not final, failure is not fatal.", author: "Winston Churchill" },
  { content: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
  { content: "It always seems impossible until it's done.", author: "Nelson Mandela" },
];

export const MotivationalWidget: React.FC = () => {
  const [quote, setQuote] = useState<Quote>(MOTIVATIONAL_QUOTES[0]);
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchContent = useCallback(async () => {
    setLoading(true);

    // Random quote
    const randomQuote = MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)];
    setQuote(randomQuote);

    // Random image from Unsplash (nature/motivation themes)
    const topics = ['nature', 'mountains', 'ocean', 'sky', 'forest'];
    const topic = topics[Math.floor(Math.random() * topics.length)];
    setImageUrl(`https://source.unsplash.com/400x300/?${topic}`);

    setLoading(false);
  }, []);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  return (
    <BaseWidget title="Daily Motivation" icon="✨" loading={loading} onRefresh={fetchContent}>
      <div className="space-y-3">
        <div
          className="relative rounded-button overflow-hidden h-40 flex items-center justify-center transition-all duration-standard ease-smooth"
          style={{
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 text-center px-4">
            <p className="text-white font-semibold text-base mb-2 drop-shadow-lg">
              "{quote.content}"
            </p>
            <p className="text-white/90 text-sm drop-shadow-lg">— {quote.author}</p>
          </div>
        </div>
      </div>
    </BaseWidget>
  );
};
