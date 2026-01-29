"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface StaggerRevealProps {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  selector?: string;
}

export default function StaggerReveal({
  children,
  className = "",
  stagger = 0.08,
  selector = ":scope > *",
}: StaggerRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const items = el.querySelectorAll(selector);
    if (items.length === 0) {
      setReady(true);
      return;
    }

    // Set initial hidden state via GSAP (not CSS) so fallback is visible
    gsap.set(items, { opacity: 0, y: 30 });
    setReady(true);

    const tween = gsap.to(items, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill();
      });
    };
  }, [stagger, selector]);

  return (
    <div
      ref={ref}
      className={className}
      style={ready ? undefined : { opacity: 1 }}
    >
      {children}
    </div>
  );
}
