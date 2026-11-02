import { normalizeText } from "@/lib/text";

interface HighlightTextProps {
	text: string;
	searchTerm?: string;
}

export function HighlightText({ text, searchTerm }: HighlightTextProps) {
	const term = searchTerm ? normalizeText(searchTerm) : "";
	const normalized = [...text].map(normalizeText).join("");
	if (!term || normalized.length !== text.length) return text;

	const parts: React.ReactNode[] = [];
	let cursor = 0;
	for (
		let start = normalized.indexOf(term);
		start !== -1;
		start = normalized.indexOf(term, cursor)
	) {
		parts.push(
			text.slice(cursor, start),
			<mark key={start} className="bg-primary/20 text-foreground">
				{text.slice(start, start + term.length)}
			</mark>,
		);
		cursor = start + term.length;
	}
	parts.push(text.slice(cursor));
	return parts;
}
