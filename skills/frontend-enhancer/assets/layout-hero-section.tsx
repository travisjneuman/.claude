// Modern Hero Section Layout
// Copy and customize this layout for your Next.js landing pages

import React from 'react';
import { cn } from '@/lib/utils';

interface HeroSectionProps {
  variant?: 'centered' | 'split' | 'minimal';
  title: string;
  subtitle: string;
  ctaPrimary?: {
    text: string;
    onClick: () => void;
  };
  ctaSecondary?: {
    text: string;
    onClick: () => void;
  };
  image?: string;
  backgroundGradient?: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  variant = 'centered',
  title,
  subtitle,
  ctaPrimary,
  ctaSecondary,
  image,
  backgroundGradient = true,
}) => {
  if (variant === 'centered') {
    return (
      <section
        className={cn(
          'relative py-20 px-4 sm:px-6 lg:px-8',
          backgroundGradient && 'bg-gradient-to-br from-blue-50 via-white to-purple-50'
        )}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 animate-fade-in-up">
              {title}
            </h1>
            <p className="text-xl sm:text-2xl text-slate-600 mb-8 max-w-3xl mx-auto animate-fade-in-up stagger-item-1">
              {subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up stagger-item-2">
              {ctaPrimary && (
                <button
                  onClick={ctaPrimary.onClick}
                  className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all hover:shadow-lg text-lg font-medium"
                >
                  {ctaPrimary.text}
                </button>
              )}
              {ctaSecondary && (
                <button
                  onClick={ctaSecondary.onClick}
                  className="px-8 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-all text-lg font-medium"
                >
                  {ctaSecondary.text}
                </button>
              )}
            </div>
            {image && (
              <div className="mt-12 animate-fade-in-up stagger-item-3">
                <img
                  src={image}
                  alt="Hero"
                  className="rounded-xl shadow-2xl mx-auto max-w-4xl"
                />
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  if (variant === 'split') {
    return (
      <section
        className={cn(
          'relative py-20 px-4 sm:px-6 lg:px-8',
          backgroundGradient && 'bg-gradient-to-br from-blue-50 via-white to-purple-50'
        )}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
                {title}
              </h1>
              <p className="text-xl text-slate-600 mb-8">
                {subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                {ctaPrimary && (
                  <button
                    onClick={ctaPrimary.onClick}
                    className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all hover:shadow-lg text-lg font-medium"
                  >
                    {ctaPrimary.text}
                  </button>
                )}
                {ctaSecondary && (
                  <button
                    onClick={ctaSecondary.onClick}
                    className="px-8 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-all text-lg font-medium"
                  >
                    {ctaSecondary.text}
                  </button>
                )}
              </div>
            </div>
            {image && (
              <div className="animate-fade-in-up stagger-item-2">
                <img
                  src={image}
                  alt="Hero"
                  className="rounded-xl shadow-2xl"
                />
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  // Minimal variant
  return (
    <section className="relative py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 mb-6 animate-fade-in-up">
          {title}
        </h1>
        <p className="text-2xl text-slate-600 mb-8 animate-fade-in-up stagger-item-1">
          {subtitle}
        </p>
        {(ctaPrimary || ctaSecondary) && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up stagger-item-2">
            {ctaPrimary && (
              <button
                onClick={ctaPrimary.onClick}
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all hover:shadow-lg text-lg font-medium"
              >
                {ctaPrimary.text}
              </button>
            )}
            {ctaSecondary && (
              <button
                onClick={ctaSecondary.onClick}
                className="px-8 py-3 text-blue-600 hover:text-blue-700 transition-all text-lg font-medium"
              >
                {ctaSecondary.text} →
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

// Example usage:
// <HeroSection
//   variant="centered"
//   title="Build Amazing Things"
//   subtitle="Create beautiful, responsive web applications with our modern toolkit"
//   ctaPrimary={{ text: "Get Started", onClick: () => {} }}
//   ctaSecondary={{ text: "Learn More", onClick: () => {} }}
//   image="/hero-image.png"
// />
