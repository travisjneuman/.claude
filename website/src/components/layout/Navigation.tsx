'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const navLinks = [
  { href: '/skills', label: 'Skills' },
  { href: '/agents', label: 'Agents' },
  { href: '/commands', label: 'Commands' },
  { href: '/marketplaces', label: 'Marketplace' },
  { href: '/docs', label: 'Docs' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative w-8 h-8 rounded-lg overflow-hidden transition-transform duration-300 group-hover:scale-110">
            <Image
              src="/images/logo.webp"
              alt="tjn.claude"
              width={32}
              height={32}
              className="object-cover w-full h-full transition-all duration-300 group-hover:brightness-125"
              priority
            />
            <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_12px_var(--glow-purple)]" />
          </div>
          <span className="text-xl font-bold gradient-text">
            Claude Code
          </span>
          <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-[var(--surface-elevated)] text-[var(--text-muted)] border border-[var(--border)]">
            supercharged
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] rounded-lg hover:bg-[var(--surface-elevated)] transition-all"
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://github.com/travisjneuman/.claude"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 px-4 py-2 text-sm font-medium rounded-lg border border-[var(--border)] hover:border-[var(--accent-purple)] hover:text-[var(--accent-purple)] transition-all"
          >
            GitHub
          </a>
        </div>
      </div>
    </nav>
  );
}
