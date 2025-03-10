import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

interface TextInputPanelProps {
  inputText: string;
  onInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onClear: () => void;
  stats: {
    wordCount: number;
    charCount: number;
  };
}

export default function TextInputPanel({
  inputText,
  onInputChange,
  onClear,
  stats,
}: TextInputPanelProps) {
  return (
    <Card className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-5 border-b border-slate-200 bg-slate-50">
        <h2 className="text-lg font-semibold flex items-center">
          <i className="fas fa-edit mr-2 text-slate-500"></i>
          Input Text
        </h2>
      </div>
      <div className="p-5">
        <div className="mb-4">
          <p className="text-sm text-slate-500 mb-2">
            Enter your text below and watch restricted words transform automatically:
          </p>
          <Textarea
            value={inputText}
            onChange={onInputChange}
            className="w-full h-64 p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition duration-150 resize-none"
            placeholder="Type or paste your text here..."
          />
        </div>
        
        <div className="flex justify-between items-center">
          <div className="text-sm text-slate-500">
            <span>{stats.wordCount}</span> words | <span>{stats.charCount}</span> characters
          </div>
          <button 
            onClick={onClear}
            className="text-sm text-slate-500 hover:text-slate-700"
          >
            <i className="fas fa-times mr-1"></i> Clear
          </button>
        </div>
      </div>
    </Card>
  );
}
