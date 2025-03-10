export function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export interface SanitizerOptions {
  restrictedWords: string[];
  separator: string;
  caseSensitive: boolean;
  highlightTransformed: boolean;
}

export interface TextStats {
  wordCount: number;
  charCount: number;
  replacedCount: number;
}

export function calculateTextStats(text: string): Pick<TextStats, 'wordCount' | 'charCount'> {
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const chars = text.length;
  
  return {
    wordCount: words,
    charCount: chars
  };
}

export function sanitizeText(
  text: string, 
  options: SanitizerOptions
): { processedText: string; replacedCount: number } {
  if (!text.trim()) return { processedText: '', replacedCount: 0 };
  
  const { restrictedWords, separator, caseSensitive, highlightTransformed } = options;
  let processedText = text;
  let replacedCount = 0;
  
  restrictedWords.forEach(restrictedWord => {
    if (!restrictedWord) return;
    
    const flags = caseSensitive ? 'g' : 'gi';
    const regex = new RegExp(`\\b${escapeRegExp(restrictedWord)}\\b`, flags);
    
    processedText = processedText.replace(regex, (match) => {
      replacedCount++;
      return match.split('').join(separator);
    });
  });
  
  // If highlighting is enabled, create HTML with highlights
  if (highlightTransformed) {
    restrictedWords.forEach(restrictedWord => {
      if (!restrictedWord) return;
      
      const sanitizedWord = restrictedWord.split('').join(separator);
      const flags = caseSensitive ? 'g' : 'gi';
      const regex = new RegExp(`\\b${escapeRegExp(sanitizedWord)}\\b`, flags);
      
      processedText = processedText.replace(regex, (match) => {
        return `<span class="bg-yellow-100 text-yellow-800 px-1 rounded">${match}</span>`;
      });
    });
  }
  
  return { processedText, replacedCount };
}
