import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Toggle from "@/components/Toggle";
import { KeyboardEvent } from "react";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  restrictedWords: string[];
  onAddWord: (word: string) => void;
  onDeleteWord: (word: string) => void;
  caseSensitive: boolean;
  onCaseSensitiveChange: (value: boolean) => void;
  highlightTransformed: boolean;
  onHighlightChange: (value: boolean) => void;
}

export default function SettingsModal({
  isOpen,
  onClose,
  restrictedWords,
  onAddWord,
  onDeleteWord,
  caseSensitive,
  onCaseSensitiveChange,
  highlightTransformed,
  onHighlightChange,
}: SettingsModalProps) {
  const handleNewWordKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const input = e.currentTarget;
      const word = input.value.trim();
      if (word) {
        onAddWord(word);
        input.value = '';
      }
    }
  };

  const handleAddWord = () => {
    const input = document.getElementById('newWordInput') as HTMLInputElement;
    const word = input.value.trim();
    if (word) {
      onAddWord(word);
      input.value = '';
    }
  };

  const exportRestrictedWords = () => {
    const dataStr = JSON.stringify(restrictedWords, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'restricted-words.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col">
        <div className="p-5 border-b border-slate-200 flex items-center justify-between">
          <h2 className="text-xl font-semibold flex items-center">
            <i className="fas fa-cog mr-2 text-slate-500"></i>
            Settings
          </h2>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto">
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3">Restricted Words List</h3>
            <p className="text-sm text-slate-500 mb-4">Words in this list will be automatically transformed in your text. Changes are saved automatically.</p>
            
            <div className="mb-5 flex">
              <div className="flex-grow">
                <Input
                  id="newWordInput"
                  placeholder="Add a new restricted word"
                  className="w-full px-3 py-2 border border-slate-300 rounded-l-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                  onKeyDown={handleNewWordKeyPress}
                />
              </div>
              <Button
                onClick={handleAddWord}
                className="bg-primary hover:bg-primary/90 text-white font-medium px-4 py-2 rounded-r-lg transition duration-150 ease-in-out"
              >
                <i className="fas fa-plus"></i>
              </Button>
            </div>
            
            <div className="max-h-64 overflow-y-auto border border-slate-200 rounded-lg p-3 bg-slate-50">
              {restrictedWords.length === 0 ? (
                <p className="text-slate-400 text-center py-4">No restricted words added yet</p>
              ) : (
                restrictedWords.map((word, index) => (
                  <div 
                    key={index}
                    className={`restricted-word-item flex items-center justify-between bg-white p-2 rounded-lg ${index < restrictedWords.length - 1 ? 'mb-2' : ''} shadow-sm`}
                  >
                    <span className="font-medium">{word}</span>
                    <button 
                      onClick={() => onDeleteWord(word)}
                      className="text-red-500 hover:text-red-700 transition duration-150"
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
          
          <div className="border-t border-slate-200 pt-5">
            <h3 className="text-lg font-medium mb-3">Additional Options</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="font-medium">Case Sensitive Matching</label>
                  <p className="text-sm text-slate-500">Match exact case of restricted words</p>
                </div>
                <Toggle 
                  checked={caseSensitive} 
                  onChange={onCaseSensitiveChange}
                  id="caseSensitiveToggle"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <label className="font-medium">Highlight Transformed Words</label>
                  <p className="text-sm text-slate-500">Visually highlight words that have been transformed</p>
                </div>
                <Toggle 
                  checked={highlightTransformed} 
                  onChange={onHighlightChange}
                  id="highlightToggle"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-5 border-t border-slate-200 bg-slate-50 text-right">
          <Button
            onClick={exportRestrictedWords}
            variant="outline"
            className="bg-white hover:bg-slate-50 text-slate-700 font-medium rounded-lg px-4 py-2 text-sm border border-slate-200 shadow-sm transition duration-150 ease-in-out mr-2"
          >
            <i className="fas fa-download mr-2"></i>
            Export Words
          </Button>
          <Button
            onClick={onClose}
            className="bg-primary hover:bg-primary/90 text-white font-medium rounded-lg px-4 py-2 text-sm transition duration-150 ease-in-out"
          >
            Done
          </Button>
        </div>
      </div>
    </div>
  );
}
