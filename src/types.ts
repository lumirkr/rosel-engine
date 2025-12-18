export type ProjectStatus = 'default' | 'success' | 'warning' | 'danger' | 'online';

export interface ProjectMetrics {
  uptime: string;
  cpu: string;
  memory: string;
}

export interface Project {
  id: string;
  name: string;
  version: string;
  status: ProjectStatus;
  badgeText: string;
  description: string;
  lastUpdate: string;
  metrics: ProjectMetrics;
  consoleOutput?: boolean;
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}

export interface SidebarItemProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  active: boolean;
  onClick: () => void;
}

export interface BadgeProps {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'online';
  children: React.ReactNode;
  className?: string;
}
