import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '', title }) => {
  return (
    <div className={`bg-slate-800 rounded-lg p-6 shadow-lg border border-slate-700 ${className}`}>
      {title && <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>}
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
};

export default Card;
