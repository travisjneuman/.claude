'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface StaggerRevealProps {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  selector?: string;
}

export default function StaggerReveal({
  children,
  className = '',
  stagger = 0.08,
  selector = ':scope > *',
}: StaggerRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const items = el.querySelectorAll(selector);
    if (items.length === 0) return;

    gsap.from(items, {
      opacity: 0,
      y: 30,
      duration: 0.6,
      stagger,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill();
      });
    };
  }, [stagger, selector]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
