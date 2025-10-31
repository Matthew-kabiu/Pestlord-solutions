// Utility functions for handling markdown text

/**
 * Strips markdown formatting from text and converts it to plain text
 * Removes: headers (#), bold (**), italic (*), links, code blocks, lists markers, etc.
 */
export function stripMarkdown(text: string): string {
  if (!text) return text;

  let cleanText = text;

  // Remove code blocks (```code``` or `code`)
  cleanText = cleanText.replace(/```[\s\S]*?```/g, '');
  cleanText = cleanText.replace(/`[^`]*`/g, '');

  // Remove headers (# ## ### etc.)
  cleanText = cleanText.replace(/^#{1,6}\s+(.+)$/gm, '$1');

  // Remove bold (**text** or __text__)
  cleanText = cleanText.replace(/\*\*([^*]+)\*\*/g, '$1');
  cleanText = cleanText.replace(/__([^_]+)__/g, '$1');

  // Remove italic (*text* or _text_)
  cleanText = cleanText.replace(/\*([^*]+)\*/g, '$1');
  cleanText = cleanText.replace(/_([^_]+)_/g, '$1');

  // Remove strikethrough (~~text~~)
  cleanText = cleanText.replace(/~~([^~]+)~~/g, '$1');

  // Remove links [text](url) or [text][ref]
  cleanText = cleanText.replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1');
  cleanText = cleanText.replace(/\[([^\]]+)\]\[[^\]]+\]/g, '$1');

  // Remove images ![alt](url)
  cleanText = cleanText.replace(/!\[([^\]]*)\]\([^\)]+\)/g, '');

  // Remove horizontal rules (--- or ***)
  cleanText = cleanText.replace(/^[-*]{3,}$/gm, '');

  // Remove list markers (-, *, +, 1., etc.) but keep the content
  cleanText = cleanText.replace(/^[\s]*[-*+]\s+/gm, '');
  cleanText = cleanText.replace(/^[\s]*\d+\.\s+/gm, '');

  // Remove blockquote markers (>)
  cleanText = cleanText.replace(/^>\s+/gm, '');

  // Clean up extra whitespace and newlines
  cleanText = cleanText.replace(/\n{3,}/g, '\n\n');
  cleanText = cleanText.trim();

  return cleanText;
}

