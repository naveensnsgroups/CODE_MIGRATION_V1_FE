import React from 'react';
import { ListTodo, Cpu, Layout, ArrowRight, Zap, Code, Shield } from 'lucide-react';
import { SectionHeading, StructuredData } from './CommonElements';

export const LogicHero: React.FC<{ data: StructuredData }> = ({ data }) => {
  // 🔍 Deep Discovery: Find backend/frontend segments even if nested
  const findSegment = (obj: any, key: 'backend' | 'frontend'): any[] => {
    if (!obj || typeof obj !== 'object') return [];
    if (Array.isArray(obj[key])) return obj[key];
    
    const nested = obj.result || obj.response || obj.data || (obj.items && obj.items[0]?.json) || obj.items?.[0];
    if (nested && typeof nested === 'object') {
      return findSegment(nested, key);
    }
    return [];
  };

  const backendItems = findSegment(data, 'backend');
  const frontendItems = findSegment(data, 'frontend');
  const oldUnits = data.logic_units || [];
  const rules = data.business_rules || [];

  return (
    <section className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-16">
      {/* ── Backend Industrial Logic (v8.0) ── */}
      {backendItems.length > 0 && (
        <div className="space-y-8">
          <SectionHeading icon={<Cpu size={14} strokeWidth={3} />} title="Backend Logic Architecture" />
          <div className="space-y-10">
            {backendItems.map((file, fileIdx) => (
              <div key={fileIdx} className="space-y-4">
                <div className="flex items-center gap-3 px-4 py-2 bg-zinc-950 border-2 border-zinc-950 rounded-sm">
                  <Code size={14} className="text-amber-400" />
                  <span className="text-[12px] font-medium text-white uppercase tracking-widest italic leading-none">
                    {file.file_name}
                  </span>
                </div>
                <div className="grid grid-cols-1 gap-6 pl-4 border-l-2 border-zinc-100">
                  {file.endpoints.map((endpoint, endIdx) => (
                    <div key={endIdx} className="bg-white border-2 border-zinc-950 rounded-sm shadow-[6px_6px_0px_0px_rgba(251,191,36,0.1)] overflow-hidden transition-all hover:translate-x-1">
                      {/* Endpoint Header */}
                      <div className="bg-zinc-950 px-6 py-4 flex items-center justify-between border-b-2 border-zinc-950">
                        <div className="flex items-center gap-3">
                          <span className={`px-2 py-0.5 rounded-[2px] text-[10px] font-medium uppercase tracking-tighter ${endpoint.method === 'POST' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
                            {endpoint.method}
                          </span>
                          <span className="text-[12px] font-medium text-white tracking-tight uppercase italic">{endpoint.function_name}</span>
                        </div>
                        <span className="text-[12px] font-medium text-zinc-600 uppercase tracking-tighter">{endpoint.endpoint}</span>
                      </div>
                      
                      <div className="p-6 space-y-6">
                        <p className="text-[12px] text-zinc-800 font-medium leading-relaxed italic border-l-4 border-amber-400 pl-4 bg-zinc-50 py-3 rounded-sm">
                          &quot;{endpoint.description}&quot;
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Inputs & Outputs */}
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <span className="text-[11px] font-medium uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                                <ArrowRight size={10} className="text-zinc-900" /> Inputs
                              </span>
                              <div className="flex flex-wrap gap-2">
                                {endpoint.input.map((inp, idx) => (
                                  <span key={idx} className="px-2 py-1 bg-zinc-100 text-zinc-800 text-[11px] font-medium uppercase tracking-tighter rounded-sm border border-zinc-200">{inp}</span>
                                ))}
                              </div>
                            </div>
                            <div className="space-y-2">
                              <span className="text-[11px] font-medium uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                                <Zap size={10} className="text-zinc-900" /> Outputs
                              </span>
                              <div className="flex flex-wrap gap-2">
                                {endpoint.output.map((out, idx) => (
                                  <span key={idx} className="px-2 py-1 bg-emerald-50 text-emerald-700 text-[11px] font-medium uppercase tracking-tighter rounded-sm border border-emerald-100">{out}</span>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Business Rules */}
                          <div className="space-y-2">
                            <span className="text-[11px] font-medium uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                              <Shield size={10} className="text-amber-500" /> Core Constraints
                            </span>
                            <div className="space-y-1.5">
                              {endpoint.business_rules.map((rule, idx) => (
                                <div key={idx} className="flex gap-2 group">
                                  <span className="text-amber-500 font-medium text-[11px]">#</span>
                                  <p className="text-[12px] font-medium text-zinc-500 leading-tight italic group-hover:text-zinc-950 transition-colors">{rule}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Execution Flow */}
                        <div className="pt-6 border-t border-zinc-100 space-y-3">
                          <span className="text-[11px] font-medium uppercase tracking-widest text-zinc-950 flex items-center gap-2 italic">
                            <ListTodo size={12} className="text-amber-500" /> Execution Protocol
                          </span>
                          <div className="space-y-2">
                            {endpoint.flow.map((step, idx) => (
                              <div key={idx} className="flex items-start gap-4 group">
                                <span className="flex-shrink-0 w-5 h-5 rounded-sm bg-zinc-950 text-white flex items-center justify-center text-[9px] font-medium shadow-[2px_2px_0px_0px_rgba(251,191,36,1)] group-hover:-translate-y-0.5 transition-transform">
                                  {String(idx + 1).padStart(2, '0')}
                                </span>
                                <p className="text-[12px] font-medium text-zinc-600 leading-relaxed italic group-hover:text-zinc-950 transition-colors">{step}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Frontend Interaction Map (v8.0) ── */}
      {frontendItems.length > 0 && (
        <div className="space-y-8">
          <SectionHeading icon={<Layout size={14} strokeWidth={3} />} title="Frontend Interaction Map" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {frontendItems.map((page, i) => (
              <div key={i} className="bg-zinc-900 border-2 border-zinc-950 rounded-sm p-7 shadow-[8px_8px_0px_0px_rgba(9,9,11,0.1)] space-y-6 group hover:translate-x-1 transition-all">
                <div className="space-y-1">
                  <h4 className="text-[11px] font-medium uppercase tracking-[0.2em] text-amber-400 italic leading-none">{page.page_name}</h4>
                  <p className="text-[12px]  text-white uppercase tracking-normal italic">{page.file_name}</p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <span className="text-[11px] font-medium uppercase tracking-widest text-zinc-400">User Actions</span>
                    <div className="space-y-1.5 pl-3 border-l border-zinc-700">
                      {page.user_actions.map((act, idx) => (
                        <p key={idx} className="text-[12px] font-medium text-zinc-300 italic group-hover:text-white transition-colors">• {act}</p>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="text-[9px] font-medium uppercase tracking-widest text-zinc-400">API Triggers</span>
                    <div className="flex flex-wrap gap-2">
                      {page.api_calls.map((call, idx) => (
                        <div key={idx} className="bg-zinc-800 border border-zinc-700 px-3 py-1.5 rounded-sm flex items-center gap-2">
                          <span className="text-[10px] font-medium text-amber-400 uppercase">{call.method}</span>
                          <span className="text-[11px]  text-zinc-200 tracking-normal uppercase italic">{call.endpoint}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Legacy Support Segment (Fallback) ── */}
      {oldUnits.length > 0 && backendItems.length === 0 && (
        <div className="space-y-6">
          <SectionHeading icon={<ListTodo size={14} strokeWidth={3} />} title="Surgical Logic Snippets" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {oldUnits.map((unit, i) => (
              <div key={i} className="p-6 bg-zinc-950 border-2 border-zinc-950 shadow-[6px_6px_0px_0px_rgba(251,191,36,0.1)] rounded-sm group hover:shadow-amber-400/20 transition-all">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[12px] font-semibold text-amber-400 uppercase tracking-widest leading-none">
                    {unit.function_name}
                  </span>
                  <span className="text-[10px] font-semibold text-zinc-600 uppercase italic">
                    Complexity: {unit.complexity}/10
                  </span>
                </div>
                <p className="text-[12px] text-zinc-400 mb-6 leading-relaxed italic pr-4 font-medium">
                  &quot;{unit.description}&quot;
                </p>
                <div className="relative p-4 bg-zinc-900/50 border-l-4 border-amber-400 rounded-sm">
                  <span className="absolute -top-2.5 right-4 px-2 py-0.5 bg-amber-400 text-zinc-950 text-[8px] font-medium uppercase tracking-tighter shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)]">
                    Migration Strategy
                  </span>
                  <p className="text-[11px] font-medium text-zinc-300 leading-tight italic">
                    {unit.migration_strategy}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Foundational Constraints (Global) ── */}
      {rules.length > 0 && (
        <div className="pt-12 border-t-4 border-zinc-950">
          <SectionHeading icon={<ListTodo size={14} strokeWidth={3} />} title="Strategic Business Rules" />
          <div className="bg-zinc-950 border-2 border-zinc-950 rounded-sm p-6 shadow-[8px_8px_0px_0px_rgba(9,9,11,0.1)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400 opacity-5 -mr-16 -mt-16 rounded-full blur-3xl" />
            <ul className="space-y-4 relative z-10">
              {rules.map((rule, i) => (
                <li key={i} className="flex gap-4 group">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-400 text-zinc-950 flex items-center justify-center text-[10px] font-medium italic shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="text-[11px] font-medium text-zinc-300 leading-relaxed group-hover:text-amber-400 transition-colors italic">
                    {rule}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
};
