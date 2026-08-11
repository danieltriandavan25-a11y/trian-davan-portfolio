import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge conditional class names and resolve Tailwind conflicts.
 * Used by any UI component (OriginKit/Origin UI-style) dropped into
 * src/components/ui.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
