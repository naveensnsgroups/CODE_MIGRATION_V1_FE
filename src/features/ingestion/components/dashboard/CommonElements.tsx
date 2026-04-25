import { Zap } from 'lucide-react';

export interface RouteNode {
  path: string;
  method: string;
  desc: string;
  controller_logic?: string;
  target?: string;
  dependencies?: string[];
}

export interface ApiNode {
  path: string;
  method: string;
  controller: string;
  route_file: string;
  controller_file: string;
  description: string;
  request: {
    body: string[];
    params: string[];
    query: string[];
  };
  response: {
    status_codes: number[];
    fields: string[];
  };
  database: {
    models: string[];
    operations: string[];
  };
  dependencies: string[];
  auth_required: boolean;
  business_logic: string;
}

export interface ModelNode {
  name: string;
  file: string;
  fields: Array<{
    name: string;
    type: string;
    required: boolean;
    default: any;
    enum: string[];
  }>;
  relations: Array<{
    field: string;
    ref: string;
    type: string;
  }>;
}

export interface ExternalService {
  name: string;
  type: string;
  usage: string;
}

export interface StructuredData {
  summary: string | {
    database_type?: string;
    orm?: string;
    total_models?: number;
    [key: string]: any;
  };
  analysis_summary?: string;
  project_id?: string;
  action?: string;
  tech_stack?: {
    frontend: string[];
    backend: string[];
    statics: string[];
  };
  package_summary?: {
    total_dependencies: number;
    total_dev_dependencies: number;
  };
  dependencies?: Array<{ name: string; version: string; purpose: string; type?: string }>;
  dev_dependencies?: Array<{ name: string; version: string; purpose: string }>;
  env_summary?: string;
  total_env_files?: number;
  files?: Array<{ file_name: string; variables_count: number }>;
  grouped_variables?: Record<string, Array<any>>;
  metadata?: {
    language?: string;
    framework?: string;
    total_files?: number;
    [key: string]: any;
  };
  architecture?: Array<{ file: string; purpose: string; complexity_score?: number }>;
  core_features?: Array<{ label: string; desc: string; dependencies?: string[] } | string>;
  business_rules?: string[];
  routes?: Array<RouteNode>;
  apis?: Array<ApiNode>;
  models?: Array<ModelNode>;
  external_services?: Array<ExternalService>;
  operations?: Array<{
    model: string;
    used_in: string;
    operations: string[];
  }>;
  total_apis?: number;
  total_models?: number;
  logic_units?: Array<{
    function_name: string;
    description: string;
    complexity: number;
    migration_strategy: string;
  }>;
  data_access?: Array<{
    operation: string;
    source: string;
    description: string;
  }>;
  backend?: any;
  frontend?: any;
  assets?: any[];
  target_stack?: {
    backend: string;
    framework: string;
    frontend?: string;
    database?: string;
  };
  strategy?: {
    roadmap?: any[];
    milestones?: any[];
    stack_decisions?: any[];
  };
  roadmap?: any[];
  milestones?: any[];
  stack_decisions?: any[];
  feasibility_score?: number;
  modernization_strategy?: string;
  [key: string]: any;
}

export const Tag: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="px-2 py-0.5 bg-zinc-950 text-white text-[11px] font-medium uppercase tracking-widest rounded-sm border-2 border-zinc-950 shadow-[2px_2px_0px_0px_rgba(251,191,36,1)] transition-transform hover:-translate-y-0.5">
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

export const SafeText: React.FC<{ text?: any; fallback?: string }> = ({ text, fallback }) => {
  if (!text) return <span>{fallback}</span>;
  if (typeof text === 'string') return <span>{text}</span>;
  if (Array.isArray(text)) return <span>{text.join(' ')}</span>;
  if (typeof text === 'object') return <span>{JSON.stringify(text).substring(0, 150)}...</span>;
  return <span>{String(text)}</span>;
};

export const SummaryBox: React.FC<{ summary?: any; activeAction?: string }> = ({ summary, activeAction }) => {
  if (!summary) return null;

  // For quick_migration, summary might be an object like {project_type, framework, ...}
  // We need to guard against nested objects/arrays that can't be rendered as React children
  const isObject = typeof summary === 'object' && !Array.isArray(summary);

  const safeRenderValue = (val: any): string => {
    if (val === null || val === undefined) return '—';
    if (typeof val === 'string') return val;
    if (typeof val === 'number' || typeof val === 'boolean') return String(val);
    if (Array.isArray(val)) return val.map(v => typeof v === 'object' ? JSON.stringify(v) : String(v)).join(', ');
    if (typeof val === 'object') return JSON.stringify(val).substring(0, 100);
    return String(val);
  };

  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-amber-400 rotate-0.5 rounded-sm opacity-5 group-hover:opacity-10 transition-opacity" />
      <div className="relative bg-zinc-50 border-2 border-zinc-950 p-7 rounded-sm shadow-[6px_6px_0px_0px_rgba(9,9,11,1)] overflow-hidden">

        <div className="flex items-center justify-between mb-6">
          <div className="bg-amber-400 border-2 border-zinc-950 px-3 py-1.5 flex items-center gap-2 shadow-[4px_4px_0px_0px_rgba(9,9,11,1)]">
            <Zap className="w-3.5 h-3.5 text-zinc-950 fill-zinc-950" />
            <span className="text-[12px] font-medium uppercase tracking-tighter text-zinc-950">
              &quot;High-Depth Strategic Migration Intelligence&quot;
            </span>
          </div>
          {activeAction && (
            <span className="px-2 py-0.5 bg-zinc-950 text-white text-[12px] font-semibold uppercase tracking-widest rounded-sm border border-zinc-950">
              FOCUS: {activeAction.toUpperCase()} NODE
            </span>
          )}
        </div>

        {isObject ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(summary).map(([key, value]) => {
              const label = key.replace(/_/g, ' ').toUpperCase();
              return (
                <div key={key} className="bg-white border border-zinc-200 p-4 rounded-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,0.05)] transition-all hover:bg-zinc-50">
                  <span className="block text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-1">{label}</span>
                  <span className="text-[14px] font-bold text-zinc-950 uppercase italic tracking-tight">
                    {safeRenderValue(value)}
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-sm font-bold leading-relaxed text-zinc-900 pr-4 italic">
            &quot;<SafeText text={summary} />&quot;
          </p>
        )}

        <div className="mt-8 flex gap-4 opacity-50 grayscale hover:grayscale-0 transition-all">
          <div className="w-12 h-1 bg-zinc-300 rounded-full" />
          <div className="w-8 h-1 bg-amber-400 rounded-full" />
          <div className="w-16 h-1 bg-zinc-950 rounded-full" />
        </div>
      </div>
    </div>
  );
};
