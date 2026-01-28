'use client';

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

const HeroScene = dynamic(() => import('./HeroScene'), {
  ssr: false,
  loading: () => null,
});

export default function HeroCanvas() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference and basic WebGL support
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
      if (gl) setShow(true);
    } catch {
      // No WebGL support — skip 3D
    }
  }, []);

  if (!show) return null;

  return <HeroScene />;
}
