import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface OutputPanelProps {
  outputText: string;
  onOutputChange: (text: string) => void;
  separator: string;
  onSeparatorChange: (e: { target: { value: string } }) => void;
  onCopy: () => void;
  replacedCount: number;
}

export default function OutputPanel({
  outputText,
  onOutputChange,
  separator,
  onSeparatorChange,
  onCopy,
  replacedCount,
}: OutputPanelProps) {
  return (
    <Card className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-5 border-b border-slate-200 bg-slate-50">
        <h2 className="text-lg font-semibold flex items-center">
          <i className="fas fa-check-circle mr-2 text-slate-500"></i>
          Sanitized Output
        </h2>
      </div>
      <div className="p-5">
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm text-slate-500">Edit sanitized text if needed:</label>
            <div className="flex items-center">
              <label className="text-sm text-slate-500 mr-2">Separator:</label>
              <Select 
                value={separator} 
                onValueChange={(value) => onSeparatorChange({ target: { value } })}
              >
                <SelectTrigger className="w-[120px] h-8 text-sm">
                  <SelectValue placeholder="Select separator" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="-">Hyphen (-)</SelectItem>
                  <SelectItem value="*">Asterisk (*)</SelectItem>
                  <SelectItem value="_">Underscore (_)</SelectItem>
                  <SelectItem value=".">Dot (.)</SelectItem>
                  <SelectItem value=" ">Space</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div 
            contentEditable={true}
            onInput={(e) => onOutputChange(e.currentTarget.innerHTML)}
            dangerouslySetInnerHTML={{ __html: outputText || '<p class="text-slate-400">Sanitized text will appear here...</p>' }}
            className="w-full h-64 p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition duration-150 overflow-y-auto"
          />
        </div>
        
        <div className="flex justify-between items-center">
          <div className="text-sm text-slate-500">
            <span>{replacedCount}</span> words replaced
          </div>
          <Button 
            onClick={onCopy}
            className="flex items-center justify-center bg-primary hover:bg-primary/90 text-white font-medium rounded-lg px-4 py-2 text-sm transition duration-150 ease-in-out"
          >
            <i className="fas fa-copy mr-2"></i>
            Copy Text
          </Button>
        </div>
      </div>
    </Card>
  );
}
