import { useState, useEffect } from "react";
import TextInputPanel from "@/components/TextInputPanel";
import OutputPanel from "@/components/OutputPanel";
import SettingsModal from "@/components/SettingsModal";
import InfoAlert from "@/components/InfoAlert";
import { useSanitizer } from "@/hooks/useSanitizer";

export default function Home() {
  const [showSettings, setShowSettings] = useState(false);
  const [showCopyAlert, setShowCopyAlert] = useState(false);
  
  const {
    inputText,
    setInputText,
    outputText,
    setOutputText,
    separator,
    setSeparator,
    restrictedWords,
    addRestrictedWord,
    deleteRestrictedWord,
    stats,
    caseSensitive,
    setCaseSensitive,
    highlightTransformed,
    setHighlightTransformed,
    processText,
    clearText,
  } = useSanitizer();

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(outputText.replace(/<[^>]*>/g, ''));
      setShowCopyAlert(true);
      setTimeout(() => {
        setShowCopyAlert(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy text: ", error);
    }
  };

  useEffect(() => {
    if (showSettings) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [showSettings]);

  return (
    <div className="font-sans bg-slate-50 text-slate-900 min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <header className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-primary flex items-center">
                <i className="fas fa-shield-alt mr-3"></i>
                Text Sanitizer
              </h1>
              <p className="text-slate-500 mt-1">Transform restricted words while keeping your text readable</p>
            </div>
            
            <button 
              onClick={() => setShowSettings(true)} 
              className="mt-4 sm:mt-0 flex items-center justify-center bg-white hover:bg-slate-50 text-slate-700 font-medium rounded-lg px-4 py-2 text-sm border border-slate-200 shadow-sm transition duration-150 ease-in-out"
            >
              <i className="fas fa-cog mr-2"></i>
              Settings
            </button>
          </div>
        </header>

        <main>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TextInputPanel
              inputText={inputText}
              onInputChange={(e) => {
                setInputText(e.target.value);
                processText(e.target.value);
              }}
              onClear={clearText}
              stats={stats}
            />
            <OutputPanel
              outputText={outputText}
              onOutputChange={setOutputText}
              separator={separator}
              onSeparatorChange={(e) => {
                setSeparator(e.target.value);
                processText(inputText, e.target.value);
              }}
              onCopy={handleCopyText}
              replacedCount={stats.replacedCount}
            />
          </div>
        </main>
      </div>

      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        restrictedWords={restrictedWords}
        onAddWord={addRestrictedWord}
        onDeleteWord={deleteRestrictedWord}
        caseSensitive={caseSensitive}
        onCaseSensitiveChange={setCaseSensitive}
        highlightTransformed={highlightTransformed}
        onHighlightChange={setHighlightTransformed}
      />

      <InfoAlert
        isVisible={showCopyAlert}
        message="Copied to clipboard!"
        type="success"
      />
    </div>
  );
}
