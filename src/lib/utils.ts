import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { ClassValue } from 'clsx'

export function cn(...inputs: Array<ClassValue>) {
  return twMerge(clsx(inputs))
}

export const COMPRESS_PRESET: Record<
  'basic' | 'normal' | 'ultra',
  { quality: number; scale: number }
> = {
  basic: {
    quality: 0.8, // hampir original
    scale: 0.95, // sedikit dikecilkan
  },
  normal: {
    quality: 0.6, // balance
    scale: 0.85,
  },
  ultra: {
    quality: 0.4, // lebih agresif
    scale: 0.75,
  },
}
