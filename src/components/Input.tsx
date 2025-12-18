import React from 'react';

type InputProps = {
  label?: string;
  placeholder?: string;
  value?: string;
  readOnly?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input: React.FC<InputProps> = ({ 
  label, 
  placeholder, 
  value, 
  readOnly,
  onChange
}) => (
  <div className="w-full">
    {label && (
      <label className="block text-[10px] uppercase tracking-wider text-slate-500 mb-1.5 font-bold">
        {label}
      </label>
    )}
    <div className="relative group">
      <input 
        type="text" 
        readOnly={readOnly}
        value={value}
        onChange={onChange}
        className="w-full bg-slate-950 text-cyan-100 font-mono text-xs border border-slate-800 rounded-sm px-3 py-2.5 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors placeholder-slate-700"
        placeholder={placeholder}
      />
      <div className="absolute right-2 top-2.5 w-2 h-2 border-r border-b border-slate-600 opacity-50"></div>
    </div>
  </div>
);

export default Input;
