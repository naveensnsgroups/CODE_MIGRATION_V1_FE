import { Zap } from 'lucide-react';

export interface RouteNode {
  path: string;
  method: string;
  desc: string;
  controller_logic?: string;
  target?: string;
  dependencies?: string[];
}

export interface StructuredData {
  summary: string;
  tech_stack: {
    frontend: string[];
    backend: string[];
    statics: string[];
  };
  architecture?: Array<{ file: string; purpose: string; complexity_score?: number }>;
  core_features?: Array<{ label: string; desc: string; dependencies?: string[] } | string>;
  business_rules?: string[];
  routes?: Array<RouteNode>;
  logic_units?: Array<{
    function_name: string;
    description: string;
    complexity: number;
    migration_strategy: string;
  }>;
  target_stack?: {
    backend: string;
    framework: string;
    frontend?: string;
    database?: string;
  };
  roadmap?: Array<{
    phase: string;
    tasks: string[];
    priority: 'High' | 'Med' | 'Low' | 'Critical';
  }>;
  feasibility_score?: number;
  modernization_strategy?: string;
}

export const Tag: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="px-2 py-0.5 bg-zinc-950 text-white text-[9px] font-medium uppercase tracking-widest rounded-sm border-2 border-zinc-950 shadow-[2px_2px_0px_0px_rgba(251,191,36,1)] transition-transform hover:-translate-y-0.5">
    {children}
  </span>
);

export const SectionHeading: React.FC<{ icon: React.ReactNode; title: string }> = ({ icon, title }) => (
  <div className="flex items-center gap-3 mb-6">
    <div className="w-8 h-8 rounded-sm bg-zinc-950 text-amber-400 flex items-center justify-center border-2 border-zinc-950 shadow-[3px_3px_0px_0px_rgba(228,228,231,1)]">
      {icon}
    </div>
    <h3 className="text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-950 italic border-b-4 border-amber-400 pb-0.5 leading-none">
      {title}
    </h3>
  </div>
);

export const SummaryBox: React.FC<{ summary?: string; activeAction?: string }> = ({ summary, activeAction }) => {
  if (!summary) return null;
  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-amber-400 rotate-0.5 rounded-sm opacity-5 group-hover:opacity-10 transition-opacity" />
      <div className="relative bg-zinc-50 border-2 border-zinc-950 p-7 rounded-sm shadow-[6px_6px_0px_0px_rgba(9,9,11,1)] overflow-hidden">

        <div className="flex items-center justify-between mb-6">
          <div className="bg-amber-400 border-2 border-zinc-950 px-3 py-1.5 flex items-center gap-2 shadow-[4px_4px_0px_0px_rgba(9,9,11,1)]">
            <Zap className="w-3.5 h-3.5 text-zinc-950 fill-zinc-950" />
            <span className="text-[10px] font-medium uppercase tracking-tighter text-zinc-950">
              &quot;High-Depth Strategic Migration Intelligence&quot;
            </span>
          </div>
          {activeAction && (
            <span className="px-2 py-0.5 bg-emerald-500 text-white text-[8px] font-bold uppercase tracking-widest rounded-sm border border-emerald-600">
              FOCUS: {activeAction.toUpperCase()} SCAN
            </span>
          )}
        </div>

        <p className="text-sm font-bold leading-relaxed text-zinc-900 pr-4 italic">
          &quot;{summary}&quot;
        </p>

        <div className="mt-6 flex gap-4 opacity-50 grayscale hover:grayscale-0 transition-all">
          <div className="w-12 h-1 bg-zinc-300 rounded-full" />
          <div className="w-8 h-1 bg-amber-400 rounded-full" />
          <div className="w-16 h-1 bg-zinc-950 rounded-full" />
        </div>
      </div>
    </div>
  );
};
