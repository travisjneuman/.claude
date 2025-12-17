/**
 * Document Export Utilities
 *
 * Export TipTap document content to various formats.
 * Uses browser-native features where possible to minimize dependencies.
 *
 * Supported formats:
 * - PDF: Via browser print dialog
 * - HTML: Download as .html file
 * - Markdown: Basic conversion from HTML
 */

import type { Editor } from '@tiptap/react';
import DOMPurify from 'dompurify';
import { toast } from '../../stores/useToastStore';

/**
 * Export document as PDF using browser print
 * Opens print dialog where user can save as PDF
 */
export function exportToPDF(editor: Editor, title: string): void {
  const html = editor.getHTML();
  const sanitizedHtml = DOMPurify.sanitize(html);

  // Create a new window for printing
  const printWindow = window.open('', '_blank', 'width=800,height=600');
  if (!printWindow) {
    toast.error('Please allow popups to export PDF');
    return;
  }

  // Build the document using DOM manipulation
  const doc = printWindow.document;

  // Create head
  const head = doc.createElement('head');

  const titleEl = doc.createElement('title');
  titleEl.textContent = title;
  head.appendChild(titleEl);

  const style = doc.createElement('style');
  style.textContent = `
    @media print {
      body {
        margin: 0.5in;
        font-family: 'Times New Roman', serif;
        font-size: 12pt;
        line-height: 1.5;
        color: #000;
      }
    }
    body {
      max-width: 8.5in;
      margin: 0.5in auto;
      font-family: 'Times New Roman', serif;
      font-size: 12pt;
      line-height: 1.5;
      color: #000;
    }
    h1 { font-size: 24pt; margin-top: 0; margin-bottom: 12pt; }
    h2 { font-size: 18pt; margin-top: 18pt; margin-bottom: 8pt; }
    h3 { font-size: 14pt; margin-top: 14pt; margin-bottom: 6pt; }
    p { margin: 8pt 0; }
    ul, ol { margin: 8pt 0; padding-left: 24pt; }
    li { margin: 4pt 0; }
    blockquote {
      margin: 12pt 0;
      padding: 8pt 16pt;
      border-left: 3pt solid #666;
      font-style: italic;
    }
    pre {
      font-family: 'Courier New', monospace;
      font-size: 10pt;
      background: #f5f5f5;
      padding: 8pt;
      margin: 8pt 0;
      overflow-x: auto;
    }
    code {
      font-family: 'Courier New', monospace;
      background: #f0f0f0;
      padding: 1pt 3pt;
    }
    table {
      border-collapse: collapse;
      width: 100%;
      margin: 12pt 0;
    }
    th, td {
      border: 1pt solid #000;
      padding: 6pt;
      text-align: left;
    }
    th { background: #f0f0f0; font-weight: bold; }
    img { max-width: 100%; height: auto; }
    hr { border: none; border-top: 1pt solid #666; margin: 16pt 0; }
  `;
  head.appendChild(style);

  // Create body
  const body = doc.createElement('body');

  const titleHeader = doc.createElement('h1');
  titleHeader.textContent = title;
  body.appendChild(titleHeader);

  // Use DOMPurify to safely set content
  const contentDiv = doc.createElement('div');
  contentDiv.appendChild(DOMPurify.sanitize(sanitizedHtml, { RETURN_DOM_FRAGMENT: true, RETURN_DOM: true }));
  body.appendChild(contentDiv);

  // Append to document
  doc.documentElement.appendChild(head);
  doc.documentElement.appendChild(body);

  // Wait for content to load, then print
  setTimeout(() => {
    printWindow.print();
  }, 250);
}

/**
 * Export document as HTML file
 */
export function exportToHTML(editor: Editor, title: string): void {
  const html = editor.getHTML();
  const sanitizedHtml = DOMPurify.sanitize(html);
  const escapedTitle = escapeHtml(title);

  const fullHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapedTitle}</title>
  <style>
    body {
      max-width: 800px;
      margin: 40px auto;
      padding: 0 20px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
      font-size: 16px;
      line-height: 1.6;
      color: #333;
    }
    h1 { font-size: 2em; margin-top: 0; }
    h2 { font-size: 1.5em; margin-top: 1.5em; }
    h3 { font-size: 1.25em; margin-top: 1.25em; }
    p { margin: 1em 0; }
    ul, ol { padding-left: 2em; }
    blockquote {
      margin: 1em 0;
      padding: 0.5em 1em;
      border-left: 4px solid #ddd;
      color: #666;
      font-style: italic;
    }
    pre {
      background: #f4f4f4;
      padding: 1em;
      border-radius: 4px;
      overflow-x: auto;
    }
    code {
      font-family: 'Fira Code', 'Consolas', monospace;
      background: #f4f4f4;
      padding: 0.2em 0.4em;
      border-radius: 3px;
    }
    pre code { background: none; padding: 0; }
    table {
      border-collapse: collapse;
      width: 100%;
      margin: 1em 0;
    }
    th, td {
      border: 1px solid #ddd;
      padding: 8px 12px;
      text-align: left;
    }
    th { background: #f4f4f4; }
    img { max-width: 100%; height: auto; }
    hr { border: none; border-top: 1px solid #ddd; margin: 2em 0; }
  </style>
</head>
<body>
  <h1>${escapedTitle}</h1>
  ${sanitizedHtml}
</body>
</html>`;

  downloadFile(fullHTML, `${sanitizeFilename(title)}.html`, 'text/html');
}

/**
 * Export document as Markdown
 * Basic HTML to Markdown conversion
 */
export function exportToMarkdown(editor: Editor, title: string): void {
  const html = editor.getHTML();
  const markdown = htmlToMarkdown(html);

  const fullMarkdown = `# ${title}\n\n${markdown}`;

  downloadFile(fullMarkdown, `${sanitizeFilename(title)}.md`, 'text/markdown');
}

/**
 * Export document as plain text
 */
export function exportToText(editor: Editor, title: string): void {
  const text = editor.getText();
  const fullText = `${title}\n${'='.repeat(title.length)}\n\n${text}`;

  downloadFile(fullText, `${sanitizeFilename(title)}.txt`, 'text/plain');
}

/**
 * Basic HTML to Markdown conversion
 * Uses DOMPurify for safe parsing
 */
function htmlToMarkdown(html: string): string {
  // Create a temporary element to parse sanitized HTML
  const temp = document.createElement('div');
  const sanitized = DOMPurify.sanitize(html, { RETURN_DOM_FRAGMENT: true });
  temp.appendChild(sanitized);

  function processNode(node: Node): string {
    if (node.nodeType === Node.TEXT_NODE) {
      return node.textContent || '';
    }

    if (node.nodeType !== Node.ELEMENT_NODE) {
      return '';
    }

    const el = node as HTMLElement;
    const tag = el.tagName.toLowerCase();
    const children = Array.from(el.childNodes)
      .map(processNode)
      .join('');

    switch (tag) {
      case 'h1':
        return `# ${children}\n\n`;
      case 'h2':
        return `## ${children}\n\n`;
      case 'h3':
        return `### ${children}\n\n`;
      case 'h4':
        return `#### ${children}\n\n`;
      case 'h5':
        return `##### ${children}\n\n`;
      case 'h6':
        return `###### ${children}\n\n`;
      case 'p':
        return `${children}\n\n`;
      case 'br':
        return '\n';
      case 'strong':
      case 'b':
        return `**${children}**`;
      case 'em':
      case 'i':
        return `*${children}*`;
      case 'u':
        return `<u>${children}</u>`;
      case 's':
      case 'strike':
      case 'del':
        return `~~${children}~~`;
      case 'code':
        return `\`${children}\``;
      case 'pre':
        return `\`\`\`\n${el.textContent}\n\`\`\`\n\n`;
      case 'blockquote':
        return children
          .split('\n')
          .map((line) => `> ${line}`)
          .join('\n') + '\n\n';
      case 'ul':
        return children + '\n';
      case 'ol':
        return children + '\n';
      case 'li': {
        const parent = el.parentElement;
        if (parent?.tagName.toLowerCase() === 'ol') {
          const index = Array.from(parent.children).indexOf(el) + 1;
          return `${index}. ${children.trim()}\n`;
        }
        return `- ${children.trim()}\n`;
      }
      case 'a': {
        const href = el.getAttribute('href') || '';
        return `[${children}](${href})`;
      }
      case 'img': {
        const src = el.getAttribute('src') || '';
        const alt = el.getAttribute('alt') || 'image';
        return `![${alt}](${src})`;
      }
      case 'hr':
        return '\n---\n\n';
      case 'table':
        return processTable(el);
      default:
        return children;
    }
  }

  function processTable(table: HTMLElement): string {
    const rows = Array.from(table.querySelectorAll('tr'));
    if (rows.length === 0) return '';

    let md = '';

    rows.forEach((row, rowIndex) => {
      const cells = Array.from(row.querySelectorAll('th, td'));
      const cellContents = cells.map((cell) => cell.textContent?.trim() || '');

      md += '| ' + cellContents.join(' | ') + ' |\n';

      // Add header separator after first row
      if (rowIndex === 0) {
        md += '| ' + cells.map(() => '---').join(' | ') + ' |\n';
      }
    });

    return md + '\n';
  }

  let markdown = processNode(temp);

  // Clean up extra whitespace
  markdown = markdown
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  return markdown;
}

/**
 * Download a file to the user's computer
 */
function downloadFile(content: string, filename: string, mimeType: string): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.style.display = 'none';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}

/**
 * Sanitize a filename for download
 */
function sanitizeFilename(name: string): string {
  return name
    .replace(/[<>:"/\\|?*]/g, '')
    .replace(/\s+/g, '-')
    .substring(0, 100);
}

/**
 * Escape HTML special characters
 */
function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.textContent || '';
}

/**
 * Available export formats
 */
export type ExportFormat = 'pdf' | 'html' | 'markdown' | 'text';

export const EXPORT_FORMATS: { id: ExportFormat; label: string; extension: string }[] = [
  { id: 'pdf', label: 'PDF Document', extension: '.pdf' },
  { id: 'html', label: 'HTML Page', extension: '.html' },
  { id: 'markdown', label: 'Markdown', extension: '.md' },
  { id: 'text', label: 'Plain Text', extension: '.txt' },
];

/**
 * Export document in the specified format
 */
export function exportDocument(
  editor: Editor,
  title: string,
  format: ExportFormat
): void {
  switch (format) {
    case 'pdf':
      exportToPDF(editor, title);
      break;
    case 'html':
      exportToHTML(editor, title);
      break;
    case 'markdown':
      exportToMarkdown(editor, title);
      break;
    case 'text':
      exportToText(editor, title);
      break;
  }
}
