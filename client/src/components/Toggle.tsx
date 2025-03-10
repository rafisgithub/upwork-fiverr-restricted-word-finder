interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  id: string;
}

export default function Toggle({ checked, onChange, id }: ToggleProps) {
  return (
    <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
      <input 
        type="checkbox" 
        id={id}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="absolute w-6 h-6 opacity-0 z-10 cursor-pointer" 
      />
      <label 
        htmlFor={id}
        className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${checked ? 'bg-primary' : 'bg-slate-300'}`}
      ></label>
      <div 
        className={`toggle-dot absolute top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ease-in-out ${checked ? 'transform translate-x-6 left-1' : 'left-1'}`}
      ></div>
    </div>
  );
}
