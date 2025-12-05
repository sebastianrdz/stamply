import { nanoid } from 'nanoid';

/**
 * Generate a unique public ID for loyalty programs
 * Format: 8 characters, URL-safe
 */
export function generatePublicId(): string {
  return nanoid(8);
}

/**
 * Generate a unique pass serial number
 * Format: 16 characters, alphanumeric
 */
export function generatePassSerial(): string {
  return nanoid(16);
}

/**
 * Pluralize a word based on count
 */
export function pluralize(word: string, count: number): string {
  if (count === 1) return word;
  
  // Simple pluralization rules
  if (word.endsWith('s') || word.endsWith('x') || word.endsWith('z') || 
      word.endsWith('ch') || word.endsWith('sh')) {
    return word + 'es';
  }
  if (word.endsWith('y') && !/[aeiou]y$/i.test(word)) {
    return word.slice(0, -1) + 'ies';
  }
  return word + 's';
}

/**
 * Format a date to a readable string
 */
export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Calculate progress percentage
 */
export function calculateProgress(current: number, total: number): number {
  if (total === 0) return 0;
  return Math.min(Math.round((current / total) * 100), 100);
}

