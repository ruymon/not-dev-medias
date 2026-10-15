import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// The theme's Dynamic Type sizes (`text-body`, `text-footnote`…) would
// otherwise be read as text colours and merged away against `text-primary`.
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: [
        "large-title",
        "title2",
        "title3",
        "body",
        "callout",
        "subheadline",
        "footnote",
        "caption",
        "caption2",
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
