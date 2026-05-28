/** Case-insensitive substring match; empty query matches everything. */
export function textIncludes(text: string, query: string): boolean {
  const needle = query.trim().toLowerCase();
  if (!needle) return true;
  return text.toLowerCase().includes(needle);
}

/** Match FAQ question or answer against a search query. */
export function matchesQuery(q: string, a: string, query: string): boolean {
  const needle = query.trim().toLowerCase();
  if (!needle) return true;
  return q.toLowerCase().includes(needle) || a.toLowerCase().includes(needle);
}

/** Match FAQ entry text and optional category label against a search query. */
export function faqEntryMatchesQuery(
  entry: { q: string; a: string },
  query: string,
  categoryLabel?: string
): boolean {
  if (!query.trim()) return true;
  return (
    matchesQuery(entry.q, entry.a, query) ||
    (categoryLabel != null && textIncludes(categoryLabel, query))
  );
}
