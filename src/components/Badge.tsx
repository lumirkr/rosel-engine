import React from 'react';

type BadgeProps = {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'online';
  children: React.ReactNode;
};

const Badge: React.FC<BadgeProps> = ({ variant = 'default', children }) => {
  const styles = {
    default: 'bg-slate-800 text-slate-400 border-slate-700',
    success: 'bg-emerald-950/50 text-emerald-400 border-emerald-900',
    warning: 'bg-amber-950/50 text-amber-400 border-amber-900',
    danger: 'bg-red-950/50 text-red-400 border-red-900',
    online: 'bg-blue-950/50 text-cyan-400 border-cyan-900'
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 border rounded-sm text-xs font-mono font-medium tracking-wide uppercase ${styles[variant]}`}>
      {children}
    </span>
  );
};

export default Badge;
