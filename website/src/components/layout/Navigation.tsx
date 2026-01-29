'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';


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
          {/* Logo hidden for now - image at /images/logo.webp */}
          <span className="text-xl font-bold gradient-text font-mono">
            tjn.claude/
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
            href="https://github.com/travisjneuman"
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
