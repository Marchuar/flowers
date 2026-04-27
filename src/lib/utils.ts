import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Parses a price string like "from 3.50 zł" → 3.50 */
export function parsePrice(priceStr: string): number {
  const match = priceStr.match(/[\d]+[.,]?[\d]*/)
  if (!match) return 0
  return parseFloat(match[0].replace(',', '.'))
}

/** Formats a number as Polish currency: 22.5 → "22,50 zł" */
export function formatPrice(value: number): string {
  return new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' }).format(value)
}
