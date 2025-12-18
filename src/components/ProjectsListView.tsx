import React from 'react';
import { Folder, ExternalLink, Activity } from 'lucide-react';
import Badge from './Badge';

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

interface ProjectsListViewProps {
  projects: Project[];
  onProjectSelect: (id: string) => void;
}

const ProjectsListView: React.FC<ProjectsListViewProps> = ({ projects, onProjectSelect }) => {
  return (
    <div className="max-w-7xl mx-auto animate-fade-in">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <Folder className="w-6 h-6 text-cyan-400" />
            Directorio de Proyectos
          </h1>
          <p className="text-slate-400 text-sm">
            Gestión centralizada de módulos activos y arquitecturas heredadas.
          </p>
        </div>
        <div className="text-xs font-mono text-slate-500">
          TOTAL INDEXADO: <span className="text-white">{projects.length}</span>
        </div>
      </div>
      <div className="bg-slate-900 border border-slate-800 rounded-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-950/50 text-xs uppercase text-slate-500 font-bold tracking-wider">
              <th className="p-4">ID / Nombre</th>
              <th className="p-4">Estado</th>
              <th className="p-4">Versión</th>
              <th className="p-4">Rendimiento (CPU)</th>
              <th className="p-4 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-slate-800">
            {projects.map((project) => (
              <tr key={project.id} className="group hover:bg-slate-800/50 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center text-slate-500 group-hover:text-cyan-400 transition-colors">
                      <Folder className="w-4 h-4" />
                    </div>
                    <div>
                      <div 
                        className="font-medium text-slate-200 group-hover:text-white cursor-pointer" 
                        onClick={() => onProjectSelect(project.id)}
                      >
                        {project.name}
                      </div>
                      <div className="text-xs font-mono text-slate-500">{project.id}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <Badge variant={project.status}>{project.badgeText}</Badge>
                </td>
                <td className="p-4 font-mono text-slate-400">{project.version}</td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-slate-600" />
                    <span className={`font-mono ${parseInt(project.metrics.cpu) > 50 ? 'text-amber-400' : 'text-emerald-400'}`}>
                      {project.metrics.cpu}
                    </span>
                  </div>
                </td>
                <td className="p-4 text-right">
                  <button 
                    onClick={() => onProjectSelect(project.id)}
                    className="text-slate-500 hover:text-cyan-400 transition-colors p-2"
                    aria-label={`Ver detalles de ${project.name}`}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectsListView;
