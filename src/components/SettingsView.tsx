import React, { useState } from 'react';
import { Settings, Bell, Shield, Eye, Save, ToggleLeft, ToggleRight } from 'lucide-react';
import Button from './Button';

interface ToggleProps {
  label: string;
  active: boolean;
  onToggle: () => void;
}

const Toggle: React.FC<ToggleProps> = ({ label, active, onToggle }) => (
  <div className="flex items-center justify-between p-4 bg-slate-900 border border-slate-800 rounded-sm mb-3">
    <span className="text-sm text-slate-300 font-medium">{label}</span>
    <button 
      onClick={onToggle} 
      className={`transition-colors ${active ? 'text-cyan-400' : 'text-slate-600'}`}
      aria-label={`${label} - ${active ? 'Activo' : 'Inactivo'}`}
    >
      {active ? <ToggleRight className="w-8 h-8" /> : <ToggleLeft className="w-8 h-8" />}
    </button>
  </div>
);

const SettingsView: React.FC = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    devMode: false,
    telemetry: true,
    highContrast: false
  });

  const toggle = (key: keyof typeof settings) => 
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <h1 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
        <Settings className="w-6 h-6 text-slate-400" />
        Configuración del Sistema
      </h1>
      
      <div className="space-y-8">
        {/* Sección Sistema */}
        <section>
          <h3 className="text-xs font-bold text-cyan-500 uppercase tracking-widest mb-4 flex items-center gap-2">
            <Shield className="w-4 h-4" /> Núcleo
          </h3>
          <Toggle 
            label="Modo Desarrollador (Verbose Logs)" 
            active={settings.devMode} 
            onToggle={() => toggle('devMode')} 
          />
          <Toggle 
            label="Telemetría de Rendimiento" 
            active={settings.telemetry} 
            onToggle={() => toggle('telemetry')} 
          />
        </section>
        
        {/* Sección Notificaciones */}
        <section>
          <h3 className="text-xs font-bold text-purple-500 uppercase tracking-widest mb-4 flex items-center gap-2">
            <Bell className="w-4 h-4" /> Notificaciones
          </h3>
          <Toggle 
            label="Notificaciones del Sistema" 
            active={settings.notifications} 
            onToggle={() => toggle('notifications')} 
          />
        </section>
        
        {/* Sección Apariencia */}
        <section>
          <h3 className="text-xs font-bold text-purple-500 uppercase tracking-widest mb-4 flex items-center gap-2">
            <Eye className="w-4 h-4" /> Visualización
          </h3>
          <Toggle 
            label="Modo Alto Contraste" 
            active={settings.highContrast} 
            onToggle={() => toggle('highContrast')} 
          />
        </section>
        
        <div className="pt-6 border-t border-slate-800 flex justify-end">
          <Button icon={Save} variant="primary">
            Guardar Cambios
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;
