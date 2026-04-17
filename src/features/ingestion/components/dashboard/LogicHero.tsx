import React from 'react';
import { ListTodo, Cpu, Layout, ArrowRight, Zap, Code, Shield } from 'lucide-react';
import { SectionHeading, StructuredData, SafeText } from './CommonElements';

export const LogicHero: React.FC<{ data: StructuredData }> = ({ data }) => {
  // 🔍 Deep Discovery: Find segments even if nested
  const findSegment = (obj: any, key: 'backend' | 'frontend' | 'assets'): any[] => {
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
  const assetsItems = findSegment(data, 'assets');
  const rootEndpoints = data.endpoints || [];
  const oldUnits = data.logic_units || [];
  const rules = data.business_rules || [];

  return (
    <section className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-16">
      {/* ── Root-Level Industrial Execution (v27.2 New Logic Agent Schema) ── */}
      {rootEndpoints.length > 0 && (
        <div className="space-y-8">
          <SectionHeading icon={<Cpu size={14} strokeWidth={3} />} title="Global Execution protocol" />
          <div className="grid grid-cols-1 gap-10">
            {rootEndpoints.map((endpoint: any, idx: number) => (
              <div key={idx} className="bg-white border-2 border-zinc-950 rounded-sm shadow-[8px_8px_0px_0px_rgba(251,191,36,0.1)] overflow-hidden transition-all hover:translate-x-1">
                {/* Endpoint Header */}
                <div className="bg-zinc-950 px-6 py-4 flex items-center justify-between border-b-2 border-zinc-950">
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-0.5 rounded-[2px] text-[12px] font-medium uppercase tracking-tighter ${endpoint.method === 'POST' ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-zinc-950'}`}>
                      {endpoint.method}
                    </span>
                    <span className="text-[13px] font-bold text-white tracking-tight uppercase italic">{endpoint.function_name}</span>
                  </div>
                  <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-tighter bg-zinc-900 px-3 py-1 rounded-[2px] border border-zinc-800">{endpoint.path}</span>
                </div>

                <div className="p-8 space-y-8">
                  <p className="text-[13px] text-zinc-800 font-medium leading-relaxed italic border-l-4 border-amber-400 pl-5 bg-zinc-50 py-4 rounded-sm">
                    &quot;<SafeText text={endpoint.description} />&quot;
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Inputs & Outputs */}
                    <div className="space-y-6">
                      <div className="space-y-3">
                        <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                          <ArrowRight size={12} className="text-zinc-900" /> Request Payload (Body)
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {endpoint.request?.body?.map((inp: string, i: number) => (
                            <span key={i} className="px-2.5 py-1 bg-zinc-100 text-zinc-950 text-[11px] font-bold uppercase tracking-tighter rounded-sm border-2 border-zinc-950 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)]">{inp}</span>
                          )) || <span className="text-[12px] italic text-zinc-400">No body parameters defined</span>}
                        </div>
                      </div>
                      <div className="space-y-3">
                        <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                          <Zap size={12} className="text-zinc-900" /> Response Intelligence (Fields)
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {endpoint.response?.fields?.map((out: string, i: number) => (
                            <span key={i} className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-[11px] font-bold uppercase tracking-tighter rounded-sm border-2 border-emerald-950 shadow-[2px_2px_0px_0px_rgba(16,185,129,0.1)]">{out}</span>
                          )) || <span className="text-[12px] italic text-zinc-400">No response fields defined</span>}
                        </div>
                      </div>
                    </div>

                    {/* Business Rules */}
                    <div className="space-y-3 bg-zinc-50 p-6 rounded-sm border-2 border-zinc-100">
                      <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-950 flex items-center gap-2">
                        <Shield size={14} className="text-amber-500" /> Logic Constraints
                      </span>
                      <div className="space-y-3 pt-2">
                        {endpoint.business_rules?.map((rule: string, i: number) => (
                          <div key={i} className="flex gap-3 group">
                            <span className="text-amber-500 font-bold text-[12px] mt-0.5">#</span>
                            <p className="text-[12px] font-medium text-zinc-600 leading-tight italic group-hover:text-zinc-950 transition-colors uppercase tracking-tight">{rule}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Execution Protocol (The Flow) */}
                  <div className="pt-8 border-t-2 border-zinc-100 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-950 flex items-center gap-2 italic">
                        <ListTodo size={14} className="text-amber-500" /> Business Rule
                      </span>
                      <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest">{endpoint.flow?.length || 0} SECUENTIAL STEPS</span>
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                      {endpoint.flow?.map((step: string, i: number) => (
                        <div key={i} className="flex items-start gap-4 group bg-zinc-50/50 hover:bg-zinc-100 p-3 rounded-sm border border-zinc-100 transition-colors">
                          <span className="flex-shrink-0 w-6 h-6 rounded-sm bg-zinc-950 text-white flex items-center justify-center text-[12px] font-bold shadow-[3px_3px_0px_0px_rgba(251,191,36,1)] group-hover:-translate-y-0.5 transition-transform">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <p className="text-[13px] font-medium text-zinc-700 leading-relaxed italic group-hover:text-zinc-950 transition-colors tracking-tight uppercase">
                            {step}
                          </p>
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
                  {/* ── High-Depth Layer Metadata (v15.1) ── */}
                  {!file.endpoints?.length && (file.purpose || file.libraries?.length || file.imports?.length) && (
                    <div className="bg-white border-2 border-zinc-950 rounded-sm shadow-[6px_6px_0px_0px_rgba(251,191,36,0.1)] overflow-hidden transition-all hover:translate-x-1 p-6 space-y-6">
                      <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
                        <div className="flex items-center gap-3">
                          <span className="px-2 py-0.5 bg-zinc-900 text-white text-[12px] font-semibold uppercase tracking-tighter rounded-[2px] italic">
                            {file.type || 'Module'}
                          </span>
                          <h4 className="text-[14px] font-semibold text-zinc-950 uppercase tracking-tight italic">Layer Intelligence</h4>
                        </div>
                      </div>

                      {file.purpose && (
                        <p className="text-[12px] text-zinc-800 font-medium leading-relaxed italic border-l-4 border-amber-400 pl-4 bg-zinc-50 py-3 rounded-sm">
                          &quot;<SafeText text={file.purpose} />&quot;
                        </p>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
                        {file.libraries?.length > 0 && (
                          <div className="space-y-3">
                            <span className="text-[12px] font-medium uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                              <Zap size={10} className="text-amber-500" /> Libraries
                            </span>
                            <div className="flex flex-wrap gap-2">
                              {file.libraries.map((lib: any, i: number) => (
                                <span key={i} className="px-2 py-1 bg-amber-50 text-amber-700 text-[12px] font-semibold uppercase tracking-tighter rounded-sm border border-amber-100">
                                  {lib}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        {file.imports?.length > 0 && (
                          <div className="space-y-3">
                            <span className="text-[12px] font-medium uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                              <ArrowRight size={10} className="text-zinc-950" /> Internal Map
                            </span>
                            <div className="space-y-1.5 pl-2">
                              {file.imports.map((imp: any, i: number) => (
                                <div key={i} className="flex items-center gap-3 group">
                                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-900 group-hover:bg-amber-400 transition-colors" />
                                  <p className="text-[12px] font-medium text-zinc-500 truncate group-hover:text-zinc-900 transition-colors uppercase italic">{imp}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {file.endpoints?.map((endpoint: any, endIdx: number) => (
                    <div key={endIdx} className="bg-white border-2 border-zinc-950 rounded-sm shadow-[6px_6px_0px_0px_rgba(251,191,36,0.1)] overflow-hidden transition-all hover:translate-x-1">
                      {/* Endpoint Header */}
                      <div className="bg-zinc-950 px-6 py-4 flex items-center justify-between border-b-2 border-zinc-950">
                        <div className="flex items-center gap-3">
                          <span className={`px-2 py-0.5 rounded-[2px] text-[12px] font-medium uppercase tracking-tighter ${endpoint.method === 'POST' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
                            {endpoint.method}
                          </span>
                          <span className="text-[12px] font-medium text-white tracking-tight uppercase italic">{endpoint.function_name}</span>
                        </div>
                        <span className="text-[12px] font-medium text-zinc-600 uppercase tracking-tighter">{endpoint.endpoint}</span>
                      </div>

                      <div className="p-6 space-y-6">
                        <p className="text-[12px] text-zinc-800 font-medium leading-relaxed italic border-l-4 border-amber-400 pl-4 bg-zinc-50 py-3 rounded-sm">
                          &quot;<SafeText text={endpoint.description} />&quot;
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Inputs & Outputs */}
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <span className="text-[11px] font-medium uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                                <ArrowRight size={10} className="text-zinc-900" /> Inputs
                              </span>
                              <div className="flex flex-wrap gap-2">
                                {endpoint.input?.map((inp, idx) => (
                                  <span key={idx} className="px-2 py-1 bg-zinc-100 text-zinc-800 text-[11px] font-medium uppercase tracking-tighter rounded-sm border border-zinc-200">{inp}</span>
                                ))}
                              </div>
                            </div>
                            <div className="space-y-2">
                              <span className="text-[11px] font-medium uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                                <Zap size={10} className="text-zinc-900" /> Outputs
                              </span>
                              <div className="flex flex-wrap gap-2">
                                {endpoint.output?.map((out, idx) => (
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
                              {endpoint.business_rules?.map((rule, idx) => (
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
                            {endpoint.flow?.map((step, idx) => (
                              <div key={idx} className="flex items-start gap-4 group">
                                <span className="flex-shrink-0 w-5 h-5 rounded-sm bg-zinc-950 text-white flex items-center justify-center text-[11px] font-medium shadow-[2px_2px_0px_0px_rgba(251,191,36,1)] group-hover:-translate-y-0.5 transition-transform">
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
            {frontendItems.map((page: any, i: number) => (
              <div key={i} className="bg-zinc-900 border-2 border-zinc-950 rounded-sm p-7 shadow-[8px_8px_0px_0px_rgba(9,9,11,0.1)] space-y-6 group hover:translate-x-1 transition-all">
                <div className="space-y-1">
                  <h4 className="text-[11px] font-medium uppercase tracking-[0.2em] text-amber-400 italic leading-none">{page.page_name || page.type || 'Frontend Module'}</h4>
                  <p className="text-[12px]  text-white uppercase tracking-normal italic">{page.file_name}</p>
                </div>

                <div className="space-y-6">
                  {/* ── Standard Interaction View ── */}
                  {(page.user_actions?.length > 0 || page.api_calls?.length > 0) ? (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <span className="text-[11px] font-medium uppercase tracking-widest text-zinc-400">User Actions</span>
                        <div className="space-y-1.5 pl-3 border-l border-zinc-700">
                          {page.user_actions?.map((act: any, idx: number) => (
                            <p key={idx} className="text-[12px] font-medium text-zinc-300 italic group-hover:text-white transition-colors">• {act}</p>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <span className="text-[11px] font-medium uppercase tracking-widest text-zinc-400">API Triggers</span>
                        <div className="flex flex-wrap gap-2">
                          {page.api_calls?.map((call: any, idx: number) => (
                            <div key={idx} className="bg-zinc-800 border border-zinc-700 px-3 py-1.5 rounded-sm flex items-center gap-2">
                              <span className="text-[12px] font-medium text-amber-400 uppercase">{call.method}</span>
                              <span className="text-[11px]  text-zinc-200 tracking-normal uppercase italic">{call.endpoint}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* ── Architectural Layer View (v15.2) ── */
                    <div className="space-y-6">
                      {page.purpose && (
                        <p className="text-[13px] font-medium text-zinc-400 leading-relaxed italic border-l-2 border-amber-400 pl-4 py-1">
                          &quot;<SafeText text={page.purpose} />&quot;
                        </p>
                      )}

                      <div className="space-y-4">
                        {page.libraries?.length > 0 && (
                          <div className="space-y-2">
                            <span className="text-[11px] font-medium uppercase tracking-widest text-zinc-500">Stack Dependencies</span>
                            <div className="flex flex-wrap gap-1.5">
                              {page.libraries.map((lib: any, i: number) => (
                                <span key={i} className="px-2 py-0.5 bg-zinc-800 text-amber-400 text-[12px] font-semibold tracking-tighter rounded-[2px] border border-zinc-700">
                                  {lib}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        {page.imports?.length > 0 && (
                          <div className="space-y-2">
                            <span className="text-[11px] font-medium uppercase tracking-widest text-zinc-500">Internal Map</span>
                            <div className="space-y-1 pl-2">
                              {page.imports.slice(0, 8).map((imp: any, i: number) => (
                                <p key={i} className="text-[12px] font-medium text-zinc-400 truncate uppercase italic">• {imp}</p>
                              ))}
                              {page.imports.length > 8 && <p className="text-[11px] text-zinc-600 italic">+{page.imports.length - 8} more modules...</p>}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Project Asset Registry (v15.3) ── */}
      {assetsItems.length > 0 && (
        <div className="space-y-8">
          <SectionHeading icon={<Layout size={14} strokeWidth={3} />} title="Structural Asset Registry" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {assetsItems.map((asset: any, i: number) => (
              <div key={i} className="bg-white border-2 border-zinc-950 rounded-sm p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.05)] group hover:translate-x-1 hover:-translate-y-1 transition-all">
                <div className="flex items-center justify-between mb-3 pb-3 border-b border-zinc-100">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-zinc-950 rounded-sm">
                      <Code size={12} className="text-amber-400" />
                    </div>
                    <span className="text-[11px] font-semibold text-zinc-950 uppercase tracking-tighter italic">
                      {asset.type || 'Asset'}
                    </span>
                  </div>
                  <span className="text-[11px] font-medium text-zinc-400 uppercase tracking-widest leading-none">ID: {String(i + 1).padStart(2, '0')}</span>
                </div>

                <h5 className="text-[12px] font-semibold text-zinc-900 truncate mb-4 uppercase tracking-tight italic">
                  {asset.file_name}
                </h5>

                <div className="space-y-3 bg-zinc-50 p-3 rounded-sm border border-zinc-100">
                  <div className="flex items-start gap-3">
                    <ArrowRight size={10} className="text-amber-500 mt-0.5" />
                    <div className="space-y-1">
                      <span className="text-[12px] font-semibold text-zinc-600 uppercase tracking-wider block">Usage Legacy</span>
                      <p className="text-[12px] font-medium text-zinc-700 leading-tight break-all uppercase italic">
                        {asset.used_in || 'Global Scope'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Logic Unit Analyzer (v22.0) ── */}
      {/* {oldUnits.length > 0 && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
          <SectionHeading icon={<ListTodo size={14} strokeWidth={3} />} title="Logic Unit Analyzer" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {oldUnits.map((unit: any, i: number) => (
              <div key={i} className="p-6 bg-white border-2 border-zinc-950 shadow-[6px_6px_0px_0px_rgba(39,39,42,1)] rounded-sm group hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-zinc-100">
                  <span className="font-mono text-[13px] font-bold text-zinc-950 uppercase tracking-widest leading-none">
                    {unit.function_name}
                  </span>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-[11px] font-bold text-zinc-400 uppercase italic">Intensity</span>
                    <div className="flex gap-0.5">
                      {[...Array(10)].map((_, step) => (
                        <div 
                          key={step} 
                          className={`h-3 w-1.5 rounded-[1px] ${
                            step < (unit.complexity || 0) 
                              ? (unit.complexity > 7 ? 'bg-red-500' : 'bg-zinc-950') 
                              : 'bg-zinc-100'
                          }`} 
                        />
                      ))}
                    </div>
                  </div>
                </div>
                
                <p className="text-[12px] text-zinc-600 mb-6 leading-relaxed italic pr-4 font-medium">
                  &quot;<SafeText text={unit.description} />&quot;
                </p>

                <div className="relative p-5 bg-zinc-950 border-2 border-zinc-950 rounded-sm">
                   <div className="absolute -top-3 left-4 px-2 py-0.5 bg-amber-400 text-zinc-950 text-[11px] font-bold uppercase tracking-widest italic shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)]">
                      Migration Protocol
                   </div>
                   <p className="text-[11px] font-medium text-zinc-300 leading-normal italic">
                      <SafeText text={unit.migration_strategy} />
                   </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )} */}

      {/* ── Foundational Constraints (Global) ── */}
      {rules.length > 0 && (
        <div className="pt-12 border-t-4 border-zinc-950">
          <SectionHeading icon={<ListTodo size={14} strokeWidth={3} />} title="Strategic Business Rules" />
          <div className="bg-zinc-950 border-2 border-zinc-950 rounded-sm p-6 shadow-[8px_8px_0px_0px_rgba(9,9,11,0.1)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400 opacity-5 -mr-16 -mt-16 rounded-full blur-3xl" />
            <ul className="space-y-4 relative z-10">
              {rules.map((rule: any, i: number) => (
                <li key={i} className="flex gap-4 group">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-400 text-zinc-950 flex items-center justify-center text-[12px] font-medium italic shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)]">
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
