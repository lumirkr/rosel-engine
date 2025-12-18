import { useState, useEffect } from 'react';
import { Activity } from 'lucide-react';

const bootSteps = [
  "INITIALIZING ROSEL KERNEL V4.0...",
  "LOADING MEMORY MODULES...",
  "MOUNTING VIRTUAL FILESYSTEM...",
  "DECRYPTING USER DATA...",
  "ESTABLISHING SECURE CONNECTION...",
  "ACCESS GRANTED."
];

interface BootLoaderProps {
  onComplete: () => void;
}

const BootLoader = ({ onComplete }: BootLoaderProps) => {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Text step animation
    if (step < bootSteps.length) {
      const timeout = setTimeout(() => {
        setStep(prev => prev + 1);
      }, 500);
      return () => clearTimeout(timeout);
    } else {
      // Wait a moment before completing
      setTimeout(onComplete, 800);
    }
  }, [step, onComplete]);

  useEffect(() => {
    // Progress bar animation
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center font-mono text-xs">
      <div className="w-80 space-y-4">
        <div className="flex items-center gap-2 text-cyan-500 mb-6">
          <Activity className="w-5 h-5 animate-pulse" />
          <span className="tracking-widest font-bold">SYSTEM BOOT</span>
        </div>
        
        {/* Loading log */}
        <div className="h-32 flex flex-col justify-end overflow-hidden border-l-2 border-slate-800 pl-4 space-y-1">
          {bootSteps.slice(0, step + 1).map((text, i) => (
            <div key={i} className={`${i === step ? 'text-white' : 'text-slate-500'} transition-colors`}>
              <span className="text-cyan-600 mr-2">{'>'}</span>
              {text}
            </div>
          ))}
        </div>
        
        {/* Progress bar */}
        <div className="w-full h-1 bg-slate-900 rounded-full overflow-hidden mt-4">
          <div 
            className="h-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.8)] transition-all duration-75 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <div className="flex justify-between text-[10px] text-slate-600 uppercase">
          <span>Memory: 64TB OK</span>
          <span>{Math.round(progress)}%</span>
        </div>
      </div>
    </div>
  );
};

export default BootLoader;
