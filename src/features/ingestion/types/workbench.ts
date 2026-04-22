import { LucideIcon } from 'lucide-react';

export type WorkbenchMode = 'enterprise' | 'standalone';

export interface Action {
  id: string;
  label: string;
  icon: LucideIcon;
  desc: string;
  guidance: string;
}

export interface WorkbenchSettings {
  backend: string;
  framework: string;
  frontend?: string;
}
