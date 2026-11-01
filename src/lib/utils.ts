import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const SKELETON_WIDTHS = ["72%", "45%", "88%", "60%", "35%", "80%", "52%", "66%"];

/**
 * Varied but deterministic widths, so skeletons can be prerendered into the
 * static shell (random values would differ between renders).
 */
export function getSkeletonWidth(index: number) {
  return SKELETON_WIDTHS[index % SKELETON_WIDTHS.length];
}
