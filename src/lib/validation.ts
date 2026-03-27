const htmlTagPattern = /<\/?[^>]+(>|$)/g;

export const netIdPattern = /^[a-z0-9]+$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function sanitizeText(input: string): string {
  return input.replace(htmlTagPattern, "").replace(/\s+/g, " ").trim();
}

export function normalizeNetId(input: string): string {
  return sanitizeText(input).toLowerCase();
}

export function isValidNetId(input: string): boolean {
  return netIdPattern.test(input);
}

export function isValidEmail(input: string): boolean {
  return emailPattern.test(input);
}

export function parsePositiveInteger(input: string): number | null {
  const value = Number.parseInt(input, 10);
  if (!Number.isInteger(value) || value <= 0) return null;
  return value;
}

export function isRealDate(input: string): boolean {
  const trimmed = sanitizeText(input);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) return false;
  const parsed = new Date(`${trimmed}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime())) return false;
  return parsed.toISOString().slice(0, 10) === trimmed;
}

