import React from 'react';

// 3. Card (Panel de Módulo)
const Card = ({ title, children, className = '', active = false }) => {
  return (
    <div className={`bg-slate-900 border rounded-sm overflow-hidden transition-all duration-300 ${active ? 'border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.1)]' : 'border-slate-800 hover:border-slate-700'} ${className}`}>
      {title && (
        <div className="border-b border-slate-800 px-4 py-3 flex justify-between items-center bg-slate-950/30">
          <h2 className="text-slate-400 uppercase tracking-widest text-xs font-bold">
            {title}
          </h2>
          <div className="flex gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-slate-700"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-slate-700"></div>
          </div>
        </div>
      )}
      <div className="p-5">
        {children}
      </div>
    </div>
  );
};

export default Card;
