import React from 'react';
import { type LucideIcon } from 'lucide-react';

type ButtonProps = {
  variant?: 'primary' | 'outline' | 'ghost';
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  icon?: LucideIcon;
};

const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  children, 
  className = '', 
  onClick, 
  icon: Icon 
}) => {
  const baseStyles = "inline-flex items-center justify-center px-4 py-2 text-sm font-semibold tracking-wider uppercase transition-all duration-150 rounded-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-900";
  
  const variants = {
    primary: "bg-cyan-600 text-white hover:bg-cyan-700 shadow-lg shadow-cyan-900/20",
    outline: "border border-slate-600 text-slate-300 hover:border-slate-400 hover:bg-slate-800",
    ghost: "text-slate-400 hover:text-white hover:bg-slate-800"
  };

  return (
    <button onClick={onClick} className={`${baseStyles} ${variants[variant]} ${className}`}>
      {Icon && <Icon className="w-4 h-4 mr-2" />}
      {children}
    </button>
  );
};

export default Button;
