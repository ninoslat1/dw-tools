import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const COMPRESS_PRESET: Record<
  'basic' | 'normal' | 'ultra',
  { quality: number; scale: number }
> = {
  basic: {
    quality: 0.8,
    scale: 0.95, 
  },
  normal: {
    quality: 0.6,
    scale: 0.85,
  },
  ultra: {
    quality: 0.4,
    scale: 0.75,
  },
}
