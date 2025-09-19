/**
 * Decodes HTML entities in a string
 * @param html - The HTML string to decode
 * @returns The decoded string
 */
export function decodeHtmlEntities(html: string): string {
  if (!html) return html;
  
  // Create a temporary DOM element to decode HTML entities
  const textarea = document.createElement('textarea');
  textarea.innerHTML = html;
  return textarea.value;
}

/**
 * Alternative implementation using a map of common HTML entities
 * This is safer for server-side rendering as it doesn't rely on DOM
 */
export function decodeHtmlEntitiesSafe(html: string): string {
  if (!html) return html;
  
  const htmlEntities: Record<string, string> = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
    '&apos;': "'",
    '&nbsp;': ' ',
    '&copy;': '©',
    '&reg;': '®',
    '&trade;': '™',
    '&hellip;': '…',
    '&mdash;': '—',
    '&ndash;': '–',
    '&lsquo;': '\u2018', // left single quotation mark
    '&rsquo;': '\u2019', // right single quotation mark
    '&ldquo;': '\u201C', // left double quotation mark
    '&rdquo;': '\u201D', // right double quotation mark
  };
  
  return html.replace(/&[a-zA-Z0-9#]+;/g, (entity) => {
    return htmlEntities[entity] ?? entity;
  });
}
