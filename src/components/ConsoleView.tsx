import React, { useState, useEffect, useRef } from 'react';
import { Terminal } from 'lucide-react';

type LogEntry = {
  type: 'info' | 'success' | 'warning' | 'error' | 'user';
  content: string;
};

const ConsoleView = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<LogEntry[]>([
    { type: 'info', content: 'Rosel Engine v4.0.0 Initialized...' },
    { type: 'success', content: 'System Core: ONLINE' },
    { type: 'warning', content: 'Connection to legacy modules unstable.' },
    { type: 'info', content: 'Waiting for user input...' }
  ]);
  
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll al final cuando hay nuevos mensajes 
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const cmd = input.trim();
      if (!cmd) return;

      // Agregar el comando del usuario
      const newLog = { type: 'user' as const, content: `root@rosel:~$ ${cmd}` };
      
      // Simular respuesta del sistema
      let response: LogEntry = { type: 'info', content: `Comando '${cmd}' no reconocido. Intente 'help'.` };
      
      if (cmd === 'help') response = { type: 'success', content: 'Comandos disponibles: status, clear, build, deploy' };
      if (cmd === 'status') response = { type: 'info', content: 'Todos los sistemas operando al 100% de eficiencia.' };
      if (cmd === 'clear') {
        setHistory([]);
        setInput('');
        return;
      }
      
      setHistory(prev => [...prev, newLog, response]);
      setInput('');
    }
  };

  return (
    <div className="flex flex-col h-full bg-black text-cyan-400 font-mono text-sm border border-slate-800 rounded overflow-hidden">
      {/* Header */}
      <div className="flex items-center p-2 bg-slate-900 border-b border-slate-800">
        <Terminal className="w-4 h-4 mr-2 text-cyan-400" />
        <span className="text-sm text-slate-300">Consola de Desarrollo</span>
      </div>

      {/* Area de Logs */}
      <div className="flex-1 p-4 overflow-y-auto space-y-2 bg-slate-950">
        {history.map((log, i) => (
          <div 
            key={i} 
            className={`${
              log.type === 'error' ? 'text-red-400' :
              log.type === 'success' ? 'text-emerald-400' :
              log.type === 'warning' ? 'text-amber-400' :
              log.type === 'user' ? 'text-slate-100 mt-4 font-bold' :
              'text-cyan-400'
            }`}
          >
            {log.type !== 'user' && (
              <span className="opacity-50 mr-2">[{new Date().toLocaleTimeString()}]</span>
            )}
            {log.content}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-slate-900 border-t border-slate-800 flex items-center">
        <span className="text-emerald-500 mr-2 font-bold">➜</span>
        <span className="text-cyan-500 mr-2">~</span>
        <input 
          className="flex-1 bg-transparent border-none outline-none text-slate-100 placeholder-slate-600 focus:ring-0"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleCommand}
          placeholder="Escribe un comando..."
          autoFocus
        />
      </div>
    </div>
  );
};

export default ConsoleView;
