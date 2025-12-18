import { useState } from 'react';
import { ArrowLeft, Play, Server, GitCommit } from 'lucide-react';
import Badge from './Badge';
import Button from './Button';
import Card from './Card';

interface ProjectMetrics {
  uptime: string;
  cpu: string;
  memory: string;
}

interface Project {
  id: string;
  name: string;
  version: string;
  status: 'default' | 'success' | 'warning' | 'danger' | 'online';
  badgeText: string;
  description: string;
  lastUpdate: string;
  metrics: ProjectMetrics;
  consoleOutput?: boolean;
}

interface ProjectDetailViewProps {
  project: Project | null;
  onBack: () => void;
}

const ProjectDetailView: React.FC<ProjectDetailViewProps> = ({ project, onBack }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'activity' | 'settings'>('overview');
  
  if (!project) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>No project selected</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto animate-fade-in pb-10">
      {/* Header de Navegación */}
      <button 
        onClick={onBack}
        className="flex items-center text-xs text-slate-500 hover:text-white mb-6 transition-colors group"
        aria-label="Volver al directorio"
      >
        <ArrowLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
        Volver al Directorio
      </button>
      
      {/* Encabezado del Proyecto */}
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-8 border-b border-slate-800 pb-8">
        <div>
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-white">{project.name}</h1>
            <Badge variant={project.status}>{project.badgeText}</Badge>
          </div>
          <p className="text-slate-400 font-mono text-sm">ID: {project.id} • Versión: {project.version}</p>
        </div>
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          <Button icon={Play} variant="primary" className="w-full sm:w-auto justify-center">
            Deploy
          </Button>
          <Button icon={Server} variant="outline" className="w-full sm:w-auto justify-center">
            Reiniciar Pod
          </Button>
        </div>
      </div>
      
      {/* Pestañas de Navegación Interna */}
      <div className="flex gap-6 border-b border-slate-800 mb-8 overflow-x-auto">
        {[
          { id: 'overview', label: 'Resumen General' },
          { id: 'activity', label: 'Actividad' },
          { id: 'settings', label: 'Configuración' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`pb-3 text-sm font-medium transition-colors border-b-2 whitespace-nowrap ${
              activeTab === tab.id 
                ? 'border-cyan-500 text-cyan-400' 
                : 'border-transparent text-slate-500 hover:text-slate-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      
      {/* CONTENIDO DE PESTAÑAS */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Métricas */}
          <Card title="Estado del Sistema" className="lg:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-950 rounded border border-slate-800">
                <div className="text-slate-500 text-xs uppercase mb-1">Uptime</div>
                <div className="text-xl font-mono text-emerald-400">{project.metrics.uptime || '99.9%'}</div>
              </div>
              <div className="p-4 bg-slate-950 rounded border border-slate-800">
                <div className="text-slate-500 text-xs uppercase mb-1">CPU Load</div>
                <div className="text-xl font-mono text-amber-400">{project.metrics.cpu}</div>
              </div>
              <div className="p-4 bg-slate-950 rounded border border-slate-800">
                <div className="text-slate-500 text-xs uppercase mb-1">Memoria</div>
                <div className="text-xl font-mono text-cyan-400">{project.metrics.memory}</div>
              </div>
            </div>
          </Card>
          
          {/* Info Lateral */}
          <Card title="Detalles Técnicos">
            <ul className="space-y-4 text-sm text-slate-400">
              <li className="flex justify-between border-b border-slate-800 pb-2">
                <span>Framework</span> <span className="text-white">React + Vite</span>
              </li>
              <li className="flex justify-between border-b border-slate-800 pb-2">
                <span>Base de Datos</span> <span className="text-white">PostgreSQL</span>
              </li>
              <li className="flex justify-between border-b border-slate-800 pb-2">
                <span>Último Deploy</span> <span className="text-white">{project.lastUpdate}</span>
              </li>
            </ul>
          </Card>
        </div>
      )}
      
      {activeTab === 'activity' && (
        <Card title="Log de Actividad Reciente">
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="mt-1"><GitCommit className="w-4 h-4 text-slate-600" /></div>
                <div>
                  <p className="text-sm text-slate-300">Actualización de dependencias críticas</p>
                  <p className="text-xs text-slate-600 font-mono">commit #8f3a2c • hace {i} horas por @lreyes</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
      
      {activeTab === 'settings' && (
        <Card title="Configuración del Proyecto">
          <div className="space-y-4">
            <div className="p-4 bg-slate-900/50 rounded border border-slate-800">
              <h4 className="text-slate-300 font-medium mb-3">Variables de Entorno</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-cyan-400 font-mono">NODE_ENV</span>
                  <span className="text-slate-400">production</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-cyan-400 font-mono">API_URL</span>
                  <span className="text-slate-400">https://api.rosel.engine/v1</span>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-4 border-t border-slate-800">
              <Button variant="outline" className="text-sm">Cancelar</Button>
              <Button variant="primary" className="text-sm">Guardar Cambios</Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ProjectDetailView;
