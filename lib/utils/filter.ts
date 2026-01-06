import { Keyword, Intent } from '@/lib/types';

/**
 * Filter keywords by search query and intent
 */
export function filterKeywords(
  keywords: Keyword[],
  searchQuery: string,
  intentFilter: Intent | 'all'
): Keyword[] {
  let filtered = keywords;

  // Filter by search query (case-insensitive substring match on keyword_raw)
  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter((kw) =>
      kw.keyword_raw.toLowerCase().includes(query)
    );
  }

  // Filter by intent
  if (intentFilter !== 'all') {
    filtered = filtered.filter((kw) => kw.intent === intentFilter);
  }

  return filtered;
}

/**
 * Sort keywords by updated_at (newest first), then by keyword_raw (alphabetical)
 */
export function sortKeywords(keywords: Keyword[]): Keyword[] {
  return [...keywords].sort((a, b) => {
    // Primary sort: updated_at DESC (newest first)
    const dateCompare = new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
    if (dateCompare !== 0) {
      return dateCompare;
    }

    // Secondary sort: keyword_raw ASC (alphabetical)
    return a.keyword_raw.localeCompare(b.keyword_raw);
  });
}

/**
 * Combined filter and sort operation
 */
export function processKeywords(
  keywords: Keyword[],
  searchQuery: string,
  intentFilter: Intent | 'all'
): Keyword[] {
  return sortKeywords(filterKeywords(keywords, searchQuery, intentFilter));
}
