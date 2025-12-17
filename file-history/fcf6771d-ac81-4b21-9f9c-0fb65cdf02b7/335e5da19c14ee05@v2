/**
 * Form Export Utilities
 * Export form responses to CSV format
 */

import type { FormTemplate, FormResponse, CSVExportOptions } from '../types/forms';
import { toast } from '../stores/useToastStore';

/**
 * Export form responses to CSV
 */
export function exportFormResponsesToCSV(
  form: FormTemplate,
  responses: FormResponse[],
  options: CSVExportOptions = {}
): void {
  const { includeTimestamp = true, includeFormInfo = true } = options;

  if (responses.length === 0) {
    toast.warning('No responses to export');
    return;
  }

  // Build CSV header
  const headers: string[] = [];

  if (includeTimestamp) {
    headers.push('Submitted At');
  }

  // Add field labels as headers
  form.fields
    .sort((a, b) => a.order - b.order)
    .forEach((field) => {
      headers.push(escapeCSV(field.label));
    });

  // Build CSV rows
  const rows: string[][] = [];

  responses.forEach((response) => {
    const row: string[] = [];

    if (includeTimestamp) {
      row.push(new Date(response.submittedAt).toLocaleString());
    }

    form.fields
      .sort((a, b) => a.order - b.order)
      .forEach((field) => {
        const value = response.answers[field.id];
        row.push(formatCellValue(value, field.type));
      });

    rows.push(row);
  });

  // Combine into CSV string
  const csvLines: string[] = [];

  if (includeFormInfo) {
    csvLines.push(`# ${form.title}`);
    if (form.description) {
      csvLines.push(`# ${form.description}`);
    }
    csvLines.push(`# Exported: ${new Date().toLocaleString()}`);
    csvLines.push(`# Total Responses: ${responses.length}`);
    csvLines.push('');
  }

  csvLines.push(headers.join(','));
  rows.forEach((row) => {
    csvLines.push(row.join(','));
  });

  const csvContent = csvLines.join('\n');

  // Download CSV file
  downloadCSV(csvContent, `${form.title.replace(/[^a-z0-9]/gi, '-')}-responses.csv`);
}

/**
 * Escape CSV values (handle commas, quotes, newlines)
 */
function escapeCSV(value: string): string {
  if (!value) return '""';

  // If contains comma, quote, or newline, wrap in quotes and escape quotes
  if (value.includes(',') || value.includes('"') || value.includes('\n')) {
    return `"${value.replace(/"/g, '""')}"`;
  }

  return value;
}

/**
 * Format cell value based on field type
 */
function formatCellValue(value: any, fieldType: string): string {
  if (value === null || value === undefined) {
    return '""';
  }

  // Handle different field types
  switch (fieldType) {
    case 'checkbox':
      return value ? 'Yes' : 'No';

    case 'multiselect':
      if (Array.isArray(value)) {
        return escapeCSV(value.join('; '));
      }
      return escapeCSV(String(value));

    case 'date':
      if (value instanceof Date) {
        return value.toLocaleDateString();
      }
      return escapeCSV(String(value));

    case 'time':
      return escapeCSV(String(value));

    case 'number':
    case 'rating':
    case 'scale':
      return String(value);

    case 'text':
    case 'textarea':
    case 'select':
    case 'radio':
    default:
      return escapeCSV(String(value));
  }
}

/**
 * Download CSV file to user's computer
 */
function downloadCSV(content: string, filename: string): void {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}
