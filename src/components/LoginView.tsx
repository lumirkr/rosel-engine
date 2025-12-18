import React, { useState } from 'react';
import { Shield, ArrowRight, Lock } from 'lucide-react';

interface LoginViewProps {
  onLogin: () => void;
}

const LoginView: React.FC<LoginViewProps> = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    
    // Simulación de verificación
    setTimeout(() => {
      if (password === 'admin' || password === '1234') { // Contraseña simple para demo
        onLogin();
      } else {
        setError(true);
        setLoading(false);
      }
    }, 1500);
  };
  
  return (
    <div className="h-screen w-full bg-slate-950 flex items-center justify-center relative overflow-hidden">
      {/* Fondo decorativo */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none" 
        style={{ 
          backgroundImage: 'radial-gradient(circle at center, #0891b2 1px, transparent 1px)', 
          backgroundSize: '40px 40px' 
        }}
      />
      
      <div className="w-full max-w-md p-8 bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-sm shadow-2xl relative z-10 animate-fade-in">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-cyan-900/30 rounded-full flex items-center justify-center mx-auto mb-4 border border-cyan-500/30">
            <Shield className="w-6 h-6 text-cyan-400" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-wider uppercase">Rosel Engine</h1>
          <p className="text-slate-500 text-xs font-mono mt-2">SISTEMA DE ARQUITECTURA MODULAR</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
              Credenciales de Acceso
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-600" />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-sm py-2.5 pl-10 pr-4 text-slate-200 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all font-mono"
                placeholder="••••••••"
                autoFocus
                aria-label="Contraseña"
              />
            </div>
            {error && (
              <p className="text-red-500 text-xs mt-2 font-mono">
                ⚠ Acceso denegado. Credenciales inválidas.
              </p>
            )}
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className={`w-full py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm tracking-wide rounded-sm transition-all flex items-center justify-center ${
              loading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
            aria-label="Iniciar sesión"
          >
            {loading ? (
              <span className="animate-pulse">VERIFICANDO IDENTIDAD...</span>
            ) : (
              <>
                INICIAR SESIÓN <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </button>
        </form>
        
        <div className="mt-8 text-center">
          <p className="text-[10px] text-slate-600 font-mono">
            SECURE CONNECTION ESTABLISHED • V4.0.0
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
