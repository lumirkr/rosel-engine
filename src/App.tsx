import { useState } from 'react';
import { 
  LayoutDashboard, 
  Folder, 
  Boxes, 
  Settings, 
  Plus, 
  Terminal, 
  LogOut 
} from 'lucide-react';
// Importación de Componentes Modulares 
import Badge from './components/Badge'; 
import Button from './components/Button'; 
import Card from './components/Card'; 
import ConsoleView from './components/ConsoleView'; 
import BlueprintsView from './components/BlueprintsView'; 
import SettingsView from './components/SettingsView'; 
import ProjectsListView from './components/ProjectsListView'; 
import ProjectDetailView from './components/ProjectDetailView'; 
import LoginView from './components/LoginView';
import BootLoader from './components/BootLoader';
import type { Project, SidebarItemProps } from './types';

// --- DATOS MOCK --- 
const PROJECTS: Project[] = [
  { 
    id: 'p-alpha', 
    name: 'Proyecto Alpha', 
    version: 'v1.0.4', 
    status: 'success', 
    badgeText: 'ONLINE', 
    description: 'Sistema de gestión centralizado para arquitectura modular.',
    lastUpdate: 'Hace 2 horas',
    metrics: {
      uptime: '99.98%',
      cpu: '12%',
      memory: '2.4GB'
    }
  },
  {
    id: 'p-core',
    name: 'Rosel Core',
    version: 'v0.9.2-beta',
    status: 'warning',
    badgeText: 'COMPILANDO',
    description: 'Motor principal de renderizado y lógica de negocio.',
    lastUpdate: 'Hace 5 min',
    metrics: {
      uptime: '---',
      cpu: '85%',
      memory: '6.1GB'
    },
    consoleOutput: true
  },
  {
    id: 'p-mod-x',
    name: 'Módulo X',
    version: 'v0.1.0',
    status: 'default',
    badgeText: 'PLANIFICACIÓN',
    description: 'Extensión experimental para análisis de datos.',
    lastUpdate: 'Hace 3 días',
    metrics: {
      uptime: 'OFF',
      cpu: '0%',
      memory: '0MB'
    }
  }
];

// --- APLICACIÓN PRINCIPAL ---
export default function RoselEngineApp() {
  // Estados
  const [isAuthenticated, setIsAuthenticated] = useState(() => localStorage.getItem('rosel_auth_token') === 'valid');
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Lógica de Proyecto Activo
  const activeProject = PROJECTS.find(p => p.id === selectedProjectId);

  const handleProjectClick = (id: string) => {
    setSelectedProjectId(id);
    setCurrentView('project');
  };

  const handleLogin = () => {
    setIsLoading(true);
  };

  const finishLoading = () => {
    localStorage.setItem('rosel_auth_token', 'valid');
    setIsAuthenticated(true);
    setIsLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('rosel_auth_token');
    setIsAuthenticated(false);
    setCurrentView('dashboard');
  };

  // Componente de Item de Menú Lateral
  const SidebarItem = ({ icon: Icon, label, active, onClick }: SidebarItemProps) => (
    <button
      onClick={onClick}
      className={`w-full flex items-center px-4 py-3 text-sm font-medium transition-all duration-200 border-l-2 ${
        active ? 'border-cyan-500 text-cyan-400 bg-cyan-950/10' : 'border-transparent text-slate-500 hover:text-slate-200 hover:bg-slate-900'
      }`}
    >
      <Icon className="w-5 h-5 mr-3" />
      {label}
    </button>
  );

  // --- CONDICIONAL DE SEGURIDAD (LOGIN) ---
  if (!isAuthenticated) { 
    return <LoginView onLogin={handleLogin} />; 
  }

  // Mostrar BootLoader durante la carga
  if (isLoading) {
    return <BootLoader onComplete={finishLoading} />;
  }

  // --- INTERFAZ PRINCIPAL ---
  return (
    <div className="flex h-screen bg-slate-950 text-slate-300 overflow-hidden">
      {/* SIDEBAR */}
      <div className="w-64 bg-slate-950 border-r border-slate-800 flex flex-col shrink-0 z-20 shadow-2xl">
        <div className="h-16 flex items-center px-6 border-b border-slate-800">
          <div className="w-6 h-6 bg-cyan-600 rounded-sm mr-3 flex items-center justify-center shadow-[0_0_10px_rgba(8,145,178,0.5)]">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
          <span className="font-bold tracking-wider text-slate-100 uppercase">Rosel Engine</span>
        </div>
        <nav className="flex-1 py-6 space-y-1">
          <div className="px-4 mb-2 text-[10px] uppercase text-slate-600 font-bold tracking-widest">Main Menu</div>
          <SidebarItem icon={LayoutDashboard} label="Dashboard" active={currentView === 'dashboard'} onClick={() => setCurrentView('dashboard')} />
          <SidebarItem icon={Folder} label="Proyectos" active={currentView === 'projects_list'} onClick={() => setCurrentView('projects_list')} />
          <SidebarItem icon={Boxes} label="Planos (Blueprints)" active={currentView === 'blueprints'} onClick={() => setCurrentView('blueprints')} />
          
          <div className="px-4 mt-8 mb-2 text-[10px] uppercase text-slate-600 font-bold tracking-widest">Sistema</div>
          <SidebarItem icon={Terminal} label="Consola Global" active={currentView === 'console'} onClick={() => setCurrentView('console')} />
          <SidebarItem icon={Settings} label="Configuración" active={currentView === 'settings'} onClick={() => setCurrentView('settings')} />
        </nav>
        <div className="p-4 border-t border-slate-800 bg-slate-900/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-sm bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-mono text-cyan-400">LR</div>
            <div className="flex-1 overflow-hidden">
              <p className="text-xs font-medium text-slate-200 truncate">Luis Reyes</p>
              <p className="text-xs text-slate-500 truncate cursor-pointer hover:text-red-400 transition-colors" onClick={handleLogout}>Cerrar Sesión</p>
            </div>
            <LogOut className="w-4 h-4 text-slate-600 cursor-pointer hover:text-red-400 transition-colors" onClick={handleLogout} />
          </div>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col relative overflow-hidden bg-slate-900">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
        </div>
        <header className="h-16 border-b border-slate-800 bg-slate-900/80 backdrop-blur-sm flex items-center justify-between px-8 shrink-0 z-10">
          <div className="flex items-center text-slate-500 text-sm">
            <span className="mr-2">Workspace</span>
            <span className="mr-2">/</span>
            <span className={currentView === 'dashboard' ? 'text-white font-medium' : ''}>
              {currentView === 'dashboard' ? 'Main' : currentView.toUpperCase()}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="online">SYSTEM ONLINE</Badge>
          </div>
        </header>
        <div className="flex-1 overflow-auto relative z-0">
          
          {/* VISTA: DASHBOARD */}
          {currentView === 'dashboard' && (
            <div className="max-w-6xl mx-auto p-8 animate-fade-in">
              <div className="flex items-end justify-between mb-8">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Panel de Control</h1>
                  <p className="text-slate-400 text-sm max-w-xl">
                    Bienvenido al <span className="text-cyan-400">Rosel Engine</span>.
                  </p>
                </div>
                <Button icon={Plus} onClick={() => { setSelectedProjectId(null); setCurrentView('project'); }}>
                  Nuevo Proyecto
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {PROJECTS.map((project) => (
                  <Card 
                    key={project.id} 
                    title={project.id.toUpperCase()} 
                    className="cursor-pointer group hover:-translate-y-1"
                  >
                    <div onClick={() => handleProjectClick(project.id)}>
                      <div className="flex justify-between items-start mb-4">
                        <div className="w-12 h-12 bg-slate-950 border border-slate-800 rounded-sm flex items-center justify-center text-slate-600 group-hover:text-cyan-400 group-hover:border-cyan-900 transition-all">
                          <Folder className="w-6 h-6" />
                        </div>
                        <Badge variant={project.status}>{project.badgeText}</Badge>
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">{project.name}</h3>
                      <p className="text-xs text-slate-400 mb-6 leading-relaxed h-10 overflow-hidden">{project.description}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* VISTA: LISTA DE PROYECTOS */}
          {currentView === 'projects_list' && (
            <div className="flex-1 p-8">
              <ProjectsListView projects={PROJECTS} onProjectSelect={handleProjectClick} />
            </div>
          )}

          {/* VISTA: CONSOLA GLOBAL */}
          {currentView === 'console' && (
            <div className="max-w-7xl mx-auto h-full w-full p-8 animate-fade-in pb-10">
               <ConsoleView />
            </div>
          )}

          {/* VISTA: PLANOS (BLUEPRINTS) */}
          {currentView === 'blueprints' && (
            <div className="flex-1 p-8">
              <BlueprintsView />
            </div>
          )}

          {/* VISTA: CONFIGURACIÓN */}
          {currentView === 'settings' && (
            <div className="flex-1 p-8">
              <SettingsView />
            </div>
          )}

          {/* VISTA: DETALLE DE PROYECTO */}
          {currentView === 'project' && (
            <div className="flex-1 p-8">
              <ProjectDetailView 
                project={activeProject || null} 
                onBack={() => setCurrentView('dashboard')} 
              />
            </div>
          )}

          {/* VISTA: CONSOLA GLOBAL */}
          {currentView === 'console' && (
            <div className="h-full w-full p-6 animate-fade-in">
              <ConsoleView />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}