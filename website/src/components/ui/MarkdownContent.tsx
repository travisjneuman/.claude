"use client";

/**
 * Renders pre-processed HTML from markdown files in the toolkit's docs/ directory.
 * Content is generated at build time from trusted local filesystem sources only —
 * no user-submitted content passes through this component. The static site build
 * process (next build) converts markdown to HTML via remark before deployment.
 */
interface MarkdownContentProps {
  content: string;
}

export default function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <div
      className="markdown-content text-sm text-[var(--text-secondary)] leading-relaxed"
      // Safe: content is pre-rendered from local markdown files at build time,
      // not from user input. This is a static site with no runtime content injection.
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
