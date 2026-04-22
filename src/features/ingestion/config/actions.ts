import { 
  Layout, 
  Map as MapIcon, 
  Cpu, 
  Layers, 
  Sparkles, 
  Component,
  Zap
} from 'lucide-react';
import { Action } from '../types/workbench';

export const ACTIONS: Action[] = [
  {
    id: 'general',
    label: 'General Scan',
    icon: Layout,
    desc: 'Architecture, stack, and file map.',
    guidance: 'Perform a high-depth architectural overview. IDENTIFY the primary source language (e.g., COBOL, JCL). FORBID: Do not mention Java or Spring Boot unless specifically detected.'
  },
  {
    id: 'routes',
    label: 'Map Routes',
    icon: MapIcon,
    desc: 'API endpoints and logic handlers.',
    guidance: 'MAPPING PROTOCOL: Map legacy procedure calls to API patterns. FORBID: No Spring Boot templates or Java classes.'
  },
  {
    id: 'logic',
    label: 'Logic Breakdown',
    icon: Cpu,
    desc: 'Business rules and data flow.',
    guidance: 'LOGIC SNIPPETS: Extract business rules. FORBID: No Java classes or Spring Boot services.'
  },
  {
    id: 'code_layer',
    label: 'Code Layer',
    icon: Component,
    desc: 'Architectural tiers and patterns.',
    guidance: 'LAYER ANALYZER v1.0: Analyze project tiers (Controllers, Services, REPOs). FORBID: No Spring Boot/Java.'
  },
  {
    id: 'migration',
    label: 'Migration Strategy',
    icon: Layers,
    desc: 'Step-by-step roadmap.',
    guidance: 'MASTER ARCHITECT v2.3: Perform a high-depth architectural synthesis. Map legacy logic (COBOL/JCL) to target framework idioms.'
  },
  {
    id: 'quick_migration',
    label: 'Quick Migration',
    icon: Zap,
    desc: 'Rapid refactor pointers.',
    guidance: 'QUICK MIGRATION v1.0: Focus on immediate logic handlers and rapid syntax pointers. Skip high-depth roadmaps.'
  },
  {
    id: 'planner',
    label: 'Execution Plan',
    icon: Sparkles,
    desc: 'Step-by-step commands.',
    guidance: 'EXECUTION PLANNER v2.4: Provide tactical terminal commands and file templates based on the strategy.'
  },
];
