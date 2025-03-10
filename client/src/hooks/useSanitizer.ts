import { useState, useEffect, useCallback } from 'react';
import { sanitizeText, calculateTextStats, type TextStats } from '@/lib/sanitizer';
import {
  getRestrictedWords, saveRestrictedWords,
  getSeparator, saveSeparator,
  getCaseSensitive, saveCaseSensitive,
  getHighlightTransformed, saveHighlightTransformed
} from '@/lib/storage';

export function useSanitizer() {
  const [inputText, setInputText] = useState<string>('');
  const [outputText, setOutputText] = useState<string>('');
  const [restrictedWords, setRestrictedWords] = useState<string[]>(getRestrictedWords());
  const [separator, setSeparator] = useState<string>(getSeparator());
  const [caseSensitive, setCaseSensitive] = useState<boolean>(getCaseSensitive());
  const [highlightTransformed, setHighlightTransformed] = useState<boolean>(getHighlightTransformed());
  const [stats, setStats] = useState<TextStats>({
    wordCount: 0,
    charCount: 0,
    replacedCount: 0,
  });

  const processText = useCallback((text: string, currentSeparator = separator) => {
    const { wordCount, charCount } = calculateTextStats(text);
    
    const { processedText, replacedCount } = sanitizeText(text, {
      restrictedWords,
      separator: currentSeparator,
      caseSensitive,
      highlightTransformed,
    });
    
    setOutputText(processedText);
    setStats({
      wordCount,
      charCount,
      replacedCount,
    });
  }, [restrictedWords, separator, caseSensitive, highlightTransformed]);

  const clearText = useCallback(() => {
    setInputText('');
    setOutputText('');
    setStats({
      wordCount: 0,
      charCount: 0,
      replacedCount: 0,
    });
  }, []);

  const addRestrictedWord = useCallback((word: string) => {
    // Convert to lowercase unless case sensitive is enabled
    const processedWord = caseSensitive ? word : word.toLowerCase();
    
    if (processedWord && !restrictedWords.includes(processedWord)) {
      const newWords = [...restrictedWords, processedWord];
      setRestrictedWords(newWords);
      saveRestrictedWords(newWords);
      // Re-process the text with the new word list
      processText(inputText);
    }
  }, [restrictedWords, caseSensitive, inputText, processText]);

  const deleteRestrictedWord = useCallback((word: string) => {
    const newWords = restrictedWords.filter(w => w !== word);
    setRestrictedWords(newWords);
    saveRestrictedWords(newWords);
    // Re-process the text without the deleted word
    processText(inputText);
  }, [restrictedWords, inputText, processText]);

  // Update local storage when settings change
  useEffect(() => {
    saveSeparator(separator);
    processText(inputText);
  }, [separator, inputText, processText]);

  useEffect(() => {
    saveCaseSensitive(caseSensitive);
    processText(inputText);
  }, [caseSensitive, inputText, processText]);

  useEffect(() => {
    saveHighlightTransformed(highlightTransformed);
    processText(inputText);
  }, [highlightTransformed, inputText, processText]);

  return {
    inputText,
    setInputText,
    outputText,
    setOutputText,
    separator,
    setSeparator,
    restrictedWords,
    caseSensitive,
    setCaseSensitive,
    highlightTransformed,
    setHighlightTransformed,
    stats,
    processText,
    clearText,
    addRestrictedWord,
    deleteRestrictedWord,
  };
}
