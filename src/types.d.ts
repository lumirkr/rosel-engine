import { LucideIcon } from 'lucide-react';

declare global {
  // Tipos para los componentes
  interface BadgeProps {
    variant?: 'default' | 'success' | 'warning' | 'danger' | 'online';
    children: React.ReactNode;
  }

  interface ButtonProps {
    variant?: 'primary' | 'outline' | 'ghost';
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    icon?: LucideIcon;
  }

  interface CardProps {
    title?: string;
    children: React.ReactNode;
    className?: string;
    active?: boolean;
  }

  interface InputProps {
    label?: string;
    placeholder?: string;
    value?: string;
    readOnly?: boolean;
  }

  interface SidebarItemProps {
    icon: LucideIcon;
    label: string;
    active?: boolean;
    onClick?: () => void;
  }

  // Tipos para los datos
  interface ProjectMetrics {
    uptime: string;
    cpu: string;
    memory: string;
  }

  interface Project {
    id: string;
    name: string;
    version: string;
    status: 'default' | 'success' | 'warning' | 'danger';
    badgeText: string;
    description: string;
    lastUpdate: string;
    metrics: ProjectMetrics;
    consoleOutput?: boolean;
  }
}
