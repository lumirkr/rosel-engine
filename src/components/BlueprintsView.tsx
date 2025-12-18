import { Boxes, Maximize, Minus, Download } from 'lucide-react';
import Button from './Button';

const Blueprint = ({ title, status, color }: { title: string; status: string; color: string }) => (
  <div className={`p-4 bg-slate-950 border ${getBorderColor(color)} rounded-sm shadow-lg`}>
    <div className="flex justify-between items-center mb-3">
      <h4 className="text-sm font-bold text-slate-300">{title}</h4>
      <span className={`text-xs font-mono uppercase ${getTextColor(color)}`}>{status}</span>
    </div>
    <div className={`h-24 bg-slate-900 border border-dashed ${getDashedBorderColor(color)} flex items-center justify-center text-slate-600 text-xs`}>
      [Diagrama Esquematizado]
    </div>
    <div className="flex justify-end mt-3 gap-2">
      <Button variant="ghost" icon={Maximize}>Ver</Button>
      <Button variant="outline" icon={Download}>Exportar</Button>
    </div>
  </div>
);

// Helper functions for dynamic Tailwind classes
const getBorderColor = (color: string) => {
  switch (color) {
    case 'emerald': return 'border-emerald-800';
    case 'amber': return 'border-amber-800';
    case 'cyan': return 'border-cyan-800';
    default: return 'border-slate-800';
  }
};

const getTextColor = (color: string) => {
  switch (color) {
    case 'emerald': return 'text-emerald-400';
    case 'amber': return 'text-amber-400';
    case 'cyan': return 'text-cyan-400';
    default: return 'text-slate-400';
  }
};

const getDashedBorderColor = (color: string) => {
  switch (color) {
    case 'emerald': return 'border-emerald-700/50';
    case 'amber': return 'border-amber-700/50';
    case 'cyan': return 'border-cyan-700/50';
    default: return 'border-slate-700/50';
  }
};

const BlueprintsView = () => {
  return (
    <div className="max-w-6xl mx-auto animate-fade-in">
      <h1 className="text-3xl font-bold text-white mb-2 tracking-tight flex items-center gap-3">
        <Boxes className="w-6 h-6 text-cyan-400" />
        Planos (Blueprints)
      </h1>
      <p className="text-slate-400 text-sm max-w-xl mb-8">
        Visualice y gestione la arquitectura modular. Precisión milimétrica para la estructura del código.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Blueprint title="DB Schema V1.2" status="Estable" color="emerald" />
        <Blueprint title="Flujo de Auth" status="Revisión" color="amber" />
        <Blueprint title="Render Core" status="Activo" color="cyan" />
      </div>
      
      <div className="mt-12 p-8 bg-slate-900 border border-dashed border-slate-800 rounded-sm text-center">
        <Minus className="w-8 h-8 text-slate-700 mx-auto mb-3" />
        <p className="text-slate-500">
          Utilice el comando `rosel new blueprint` en la consola para generar un nuevo esquema.
        </p>
      </div>
    </div>
  );
};

export default BlueprintsView;
