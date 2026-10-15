import { splitOnMatches } from "@/lib/search";

interface HighlightTextProps {
  text: string;
  searchTerm?: string;
}

export function HighlightText({ text, searchTerm }: HighlightTextProps) {
  if (!searchTerm) return text;

  return splitOnMatches(text, searchTerm).map((segment, index) =>
    segment.isMatch ? (
      <mark
        key={index}
        className="rounded-[3px] bg-primary/15 text-foreground"
      >
        {segment.value}
      </mark>
    ) : (
      segment.value
    )
  );
}
