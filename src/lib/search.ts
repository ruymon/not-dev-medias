/**
 * Folds one character to its accent-free, lowercase form.
 *
 * Deliberately one character in, one character out: the highlighter matches in
 * folded space and then slices the *original* text, so the two have to line up
 * index for index.
 */
function foldChar(char: string) {
  const stripped = char.normalize("NFD").replace(/\p{Diacritic}/gu, "");
  return (stripped || char).toLowerCase();
}

/** Splits text into characters alongside their folded counterparts. */
function foldChars(value: string) {
  const chars = Array.from(value);
  return { chars, folded: chars.map(foldChar) };
}

/**
 * Accent- and case-insensitive `includes`. Students type "calculo", the
 * catalogue says "Cálculo".
 */
export function matchesSearch(text: string, term: string) {
  return findMatchRanges(text, term).length > 0;
}

/**
 * Ranges of `text` matching `term`, as `[start, end)` offsets into
 * `Array.from(text)`. Empty when the term is blank or absent.
 */
export function findMatchRanges(text: string, term: string) {
  const haystack = foldChars(text).folded;
  const needle = foldChars(term).folded;

  if (needle.length === 0 || needle.length > haystack.length) return [];

  const ranges: [number, number][] = [];

  for (let start = 0; start <= haystack.length - needle.length; start++) {
    let matched = true;

    for (let offset = 0; offset < needle.length; offset++) {
      if (haystack[start + offset] !== needle[offset]) {
        matched = false;
        break;
      }
    }

    if (matched) {
      ranges.push([start, start + needle.length]);
      // Matches don't overlap, so resume past this one.
      start += needle.length - 1;
    }
  }

  return ranges;
}

/** Splits text into alternating plain and matching segments, in order. */
export function splitOnMatches(text: string, term: string) {
  const chars = Array.from(text);
  const ranges = findMatchRanges(text, term);

  if (ranges.length === 0) return [{ value: text, isMatch: false }];

  const segments: { value: string; isMatch: boolean }[] = [];
  let cursor = 0;

  for (const [start, end] of ranges) {
    if (start > cursor) {
      segments.push({ value: chars.slice(cursor, start).join(""), isMatch: false });
    }
    segments.push({ value: chars.slice(start, end).join(""), isMatch: true });
    cursor = end;
  }

  if (cursor < chars.length) {
    segments.push({ value: chars.slice(cursor).join(""), isMatch: false });
  }

  return segments;
}
