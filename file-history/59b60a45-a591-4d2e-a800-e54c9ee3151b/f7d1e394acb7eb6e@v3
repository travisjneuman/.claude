/**
 * Notes PDF Export Service
 *
 * Exports notes to PDF format with basic formatting
 * Uses jsPDF for client-side PDF generation (lazy loaded)
 */

import type { Note } from '../types/notes';

/**
 * Export a single note to PDF
 * @param note - Note to export
 * @param onSuccess - Optional callback when export succeeds
 */
export async function exportNoteToPDF(
  note: Note,
  onSuccess?: (filename: string) => void
): Promise<void> {
  try {
    // Lazy load jsPDF (only when user exports to PDF)
    const { default: jsPDF } = await import('jspdf');

    // Create new PDF document (A4 size)
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    // Page dimensions
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    const maxWidth = pageWidth - 2 * margin;
    let yPosition = margin;

    // Helper: Add new page if needed
    const checkPageBreak = (requiredSpace: number) => {
      if (yPosition + requiredSpace > pageHeight - margin) {
        doc.addPage();
        yPosition = margin;
      }
    };

    // Title
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    const titleLines = doc.splitTextToSize(note.title, maxWidth);
    checkPageBreak(titleLines.length * 10);
    doc.text(titleLines, margin, yPosition);
    yPosition += titleLines.length * 10 + 10;

    // Metadata (date, tags)
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 100, 100);

    const dateStr = `Created: ${formatDate(note.createdAt)} | Updated: ${formatDate(note.updatedAt)}`;
    checkPageBreak(5);
    doc.text(dateStr, margin, yPosition);
    yPosition += 5;

    if (note.tags.length > 0) {
      const tagsStr = `Tags: ${note.tags.join(', ')}`;
      checkPageBreak(5);
      doc.text(tagsStr, margin, yPosition);
      yPosition += 5;
    }

    // Separator line
    yPosition += 5;
    checkPageBreak(2);
    doc.setDrawColor(200, 200, 200);
    doc.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 10;

    // Content (use contentText - plain text version)
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0, 0, 0);

    if (note.contentText) {
      // Split content by paragraphs (double newlines)
      const paragraphs = note.contentText.split('\n\n').filter(p => p.trim());

      for (const paragraph of paragraphs) {
        // Split long paragraphs to fit page width
        const lines = doc.splitTextToSize(paragraph.trim(), maxWidth);

        // Check if paragraph fits on current page
        const paragraphHeight = lines.length * 7; // 7mm per line
        checkPageBreak(paragraphHeight);

        // Add paragraph
        doc.text(lines, margin, yPosition);
        yPosition += paragraphHeight + 5; // 5mm spacing between paragraphs
      }
    } else {
      // No content
      doc.setTextColor(150, 150, 150);
      doc.text('(No content)', margin, yPosition);
    }

    // Footer (page numbers)
    const pageCount = (doc as any).internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(9);
      doc.setTextColor(100, 100, 100);
      doc.text(
        `Page ${i} of ${pageCount}`,
        pageWidth / 2,
        pageHeight - 10,
        { align: 'center' }
      );
    }

    // Generate filename: note-title-YYYY-MM-DD.pdf
    const filename = generateFilename(note.title);

    // Save PDF
    doc.save(filename);

    console.log(`✅ Exported note to PDF: ${filename}`);

    // Call success callback if provided
    if (onSuccess) {
      onSuccess(filename);
    }
  } catch (error) {
    console.error('Failed to export note to PDF:', error);
    throw new Error('Failed to export note to PDF');
  }
}

/**
 * Format date as YYYY-MM-DD
 */
function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Generate safe filename for PDF
 * Sanitizes title and adds timestamp
 */
function generateFilename(title: string): string {
  // Sanitize title (remove only filesystem-unsafe characters, keep apostrophes/periods/etc)
  const safeTitle = title
    .replace(/[<>:"/\\|?*]/g, '') // Only remove chars that break filesystems
    .replace(/\s+/g, '-')
    .toLowerCase()
    .substring(0, 50); // Limit length

  const timestamp = formatDate(new Date());
  return `${safeTitle || 'note'}-${timestamp}.pdf`;
}
