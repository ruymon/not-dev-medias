interface HighlightTextProps {
  text: string;
  searchTerm?: string;
}

export function HighlightText({ text, searchTerm }: HighlightTextProps) {
  if (!searchTerm) return text;

  // Escape the term so characters like "(" or "+" match literally.
  const escapedTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const parts = text.split(new RegExp(`(${escapedTerm})`, "gi"));

  return parts.map((part, index) =>
    part.toLowerCase() === searchTerm ? (
      <mark key={index} className="bg-amber-300 text-foreground">
        {part}
      </mark>
    ) : (
      part
    )
  );
}
