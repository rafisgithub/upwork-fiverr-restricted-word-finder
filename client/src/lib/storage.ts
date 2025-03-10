const STORAGE_KEYS = {
  RESTRICTED_WORDS: 'restrictedWords',
  SEPARATOR: 'separator',
  CASE_SENSITIVE: 'caseSensitive',
  HIGHLIGHT_TRANSFORMED: 'highlightTransformed',
};

// Default restricted words
const DEFAULT_RESTRICTED_WORDS = ['payment', 'whatsapp', 'email', 'contact', 'money'];

export function getRestrictedWords(): string[] {
  try {
    const words = localStorage.getItem(STORAGE_KEYS.RESTRICTED_WORDS);
    return words ? JSON.parse(words) : DEFAULT_RESTRICTED_WORDS;
  } catch (error) {
    console.error('Error getting restricted words from localStorage:', error);
    return DEFAULT_RESTRICTED_WORDS;
  }
}

export function saveRestrictedWords(words: string[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.RESTRICTED_WORDS, JSON.stringify(words));
  } catch (error) {
    console.error('Error saving restricted words to localStorage:', error);
  }
}

export function getSeparator(): string {
  return localStorage.getItem(STORAGE_KEYS.SEPARATOR) || '-';
}

export function saveSeparator(separator: string): void {
  localStorage.setItem(STORAGE_KEYS.SEPARATOR, separator);
}

export function getCaseSensitive(): boolean {
  return localStorage.getItem(STORAGE_KEYS.CASE_SENSITIVE) === 'true';
}

export function saveCaseSensitive(caseSensitive: boolean): void {
  localStorage.setItem(STORAGE_KEYS.CASE_SENSITIVE, String(caseSensitive));
}

export function getHighlightTransformed(): boolean {
  const value = localStorage.getItem(STORAGE_KEYS.HIGHLIGHT_TRANSFORMED);
  // Default to true unless explicitly set to 'false'
  return value !== 'false';
}

export function saveHighlightTransformed(highlight: boolean): void {
  localStorage.setItem(STORAGE_KEYS.HIGHLIGHT_TRANSFORMED, String(highlight));
}
