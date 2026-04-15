import React from 'react';
import { Layers, Cpu, Zap, CheckCircle2, ShieldCheck, Terminal, Database, Map, ArrowRight } from 'lucide-react';
import { SectionHeading, StructuredData, SafeText } from './CommonElements';

export const ArchitectureHero: React.FC<{ data: StructuredData }> = ({ data }) => {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* ── Registry Profile (v23.0) ── */}
      {(data.package_summary || data.env_summary) && (
        <section className="bg-zinc-950 p-8 rounded-sm text-white overflow-hidden relative shadow-[8px_8px_0px_0px_rgba(251,191,36,0.1)]">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400 opacity-5 -mr-32 -mt-32 rounded-full blur-[80px]" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-3 mb-2">
                 <div className="h-5 w-1 bg-amber-400" />
                 <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-amber-400">Environment Intelligence</span>
              </div>
              <p className="text-[14px] font-medium leading-relaxed italic text-zinc-300">
                &quot;<SafeText text={data.env_summary} fallback="System-wide configuration context analyzed across local and staging clusters." />&quot;
              </p>
            </div>
            {data.package_summary && (
              <div className="border-l-2 border-zinc-800 pl-8 space-y-2">
                <span className="text-[9px] font-semibold uppercase tracking-widest text-zinc-500 block">Registry Counts</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-mono font-semibold text-white">{data.package_summary.total_dependencies || 0}</span>
                  <span className="text-[10px] font-semibold text-zinc-500 uppercase italic">Libs</span>
                </div>
                <div className="flex items-baseline gap-2 pt-2">
                  <span className="text-xl font-mono font-semibold text-zinc-400">{data.package_summary.total_dev_dependencies || 0}</span>
                  <span className="text-[10px] font-semibold text-zinc-500 uppercase italic">Dev Tools</span>
                </div>
              </div>
            )}
            <div className="border-l-2 border-zinc-800 pl-8 space-y-2">
               <span className="text-[9px] font-semibold uppercase tracking-widest text-zinc-500 block">Cluster Mapping</span>
               <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-mono font-semibold text-white">{data.total_env_files || 0}</span>
                  <span className="text-[10px] font-semibold text-zinc-500 uppercase italic">Env Clusters</span>
               </div>
               <div className="flex flex-wrap gap-1.5 mt-2">
                  {data.files?.map((f: any, i: number) => (
                    <span key={i} className="px-1.5 py-0.5 bg-zinc-800 text-[11px] font-semibold text-zinc-400 rounded-sm border border-zinc-700">
                      {f.file_name}
                    </span>
                  ))}
               </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Technology Pulse (Tech Stack v24.0) ── */}
      {data.tech_stack && (
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <SectionHeading icon={<Zap size={14} strokeWidth={3} />} title="Technology Pulse (Tech Stack)" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border-2 border-zinc-950 p-6 rounded-sm shadow-[6px_6px_0px_0px_rgba(9,9,11,1)] group hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
              <div className="flex items-center justify-between mb-4 border-b border-zinc-100 pb-3">
                <span className="text-[11px] font-semibold uppercase tracking-widest text-zinc-950 italic">Backend Core</span>
                <span className="px-2 py-0.5 bg-zinc-950 text-white text-[9px] font-semibold rounded-sm italic uppercase">Active</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {data.tech_stack.backend?.length > 0 ? (
                  data.tech_stack.backend.map((tech: string, i: number) => (
                    <span key={i} className="px-2 py-1 bg-amber-50 text-amber-700 text-[11px] font-semibold uppercase tracking-tighter rounded-sm border border-amber-100 italic">
                      {tech}
                    </span>
                  ))
                ) : (
                  <span className="text-[11px] text-zinc-400 italic">No backend data detected.</span>
                )}
              </div>
            </div>

            <div className="bg-white border-2 border-zinc-950 p-6 rounded-sm shadow-[6px_6px_0px_0px_rgba(0,0,0,0.05)] group hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
              <div className="flex items-center justify-between mb-4 border-b border-zinc-100 pb-3">
                <span className="text-[11px] font-semibold uppercase tracking-widest text-zinc-600 italic">Frontend Layer</span>
                <span className="px-2 py-0.5 bg-zinc-100 text-zinc-400 text-[9px] font-semibold rounded-sm italic uppercase">Module</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {data.tech_stack.frontend?.length > 0 ? (
                  data.tech_stack.frontend.map((tech: string, i: number) => (
                    <span key={i} className="px-2 py-1 bg-zinc-50 text-zinc-600 text-[10px] font-semibold uppercase tracking-tighter rounded-sm border border-zinc-200 italic">
                      {tech}
                    </span>
                  ))
                ) : (
                  <span className="text-[11px] text-zinc-400 italic">No frontend data detected.</span>
                )}
              </div>
            </div>

            <div className="bg-zinc-950 p-6 rounded-sm shadow-[6px_6px_0px_0px_rgba(251,191,36,0.1)] group hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
              <div className="flex items-center justify-between mb-4 border-b border-zinc-800 pb-3">
                <span className="text-[11px] font-semibold uppercase tracking-widest text-amber-400 italic">Statics & Infrastructure</span>
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <div className="flex flex-wrap gap-2">
                {data.tech_stack.statics?.length > 0 ? (
                  data.tech_stack.statics.map((tech: string, i: number) => (
                    <span key={i} className="px-2 py-1 bg-zinc-800 text-zinc-300 text-[11px] font-semibold uppercase tracking-tighter rounded-sm border border-zinc-700 italic">
                      {tech}
                    </span>
                  ))
                ) : (
                  <span className="text-[11px] text-zinc-500 italic">No static assets detected.</span>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Architecture Pipeline ── */}
      {data.architecture && (
        <section>
          <SectionHeading icon={<Layers size={14} strokeWidth={3} />} title="Architecture Pipeline" />
          <div className="border-2 border-zinc-950 rounded-sm overflow-hidden bg-white shadow-[6px_6px_0px_0px_rgba(228,228,231,1)]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-950 text-white">
                  <th className="px-5 py-3 text-[9px] font-medium uppercase tracking-widest italic border-r border-zinc-800">File Logic</th>
                  <th className="px-5 py-3 text-[9px] font-medium uppercase tracking-widest italic border-r border-zinc-800">Mission</th>
                  <th className="px-5 py-3 text-[9px] font-medium uppercase tracking-widest italic text-center w-16">Debt</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-zinc-950/5">
                {data.architecture.map((item, i) => (
                  <tr key={i} className="hover:bg-amber-50 group transition-colors">
                    <td className="px-5 py-4 font-mono text-[11px] font-semibold text-zinc-950 border-r border-zinc-950/5">
                      <span className="text-amber-600 group-hover:animate-pulse mr-1 font-bold">_</span>{item.file}
                    </td>
                    <td className="px-5 py-4 text-xs font-semibold text-zinc-600 border-r border-zinc-950/5 leading-relaxed">{item.purpose}</td>
                    <td className="px-5 py-4 text-center">
                      <span className={`text-[10px] font-semibold font-mono ${(item.complexity_score || 0) > 7 ? 'text-red-500' : 'text-zinc-400'
                        }`}>
                        {item.complexity_score || '-'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* ── Database Mapping (v23.0) ── */}
      {data.database?.tables && (
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <SectionHeading icon={<Database size={14} strokeWidth={3} />} title="Database Mapping" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.database.tables.map((table: any, i: number) => (
              <div key={i} className="border-2 border-zinc-950 rounded-sm bg-white overflow-hidden shadow-[6px_6px_0px_0px_rgba(39,39,42,1)]">
                <div className="bg-zinc-950 text-white px-4 py-2 border-b-2 border-zinc-950 flex justify-between items-center">
                  <span className="text-[11px] font-bold uppercase tracking-widest italic">{table.name}</span>
                  <span className="text-[9px] font-mono text-zinc-400">#TABLE</span>
                </div>
                <div className="divide-y divide-zinc-100">
                  {table.fields?.map((field: any, fi: number) => (
                    <div key={fi} className="px-4 py-3 flex justify-between items-center group hover:bg-zinc-50 transition-colors">
                      <span className="text-[12px] font-mono font-semibold text-zinc-950 group-hover:text-amber-600">
                        {field.name || field}
                      </span>
                      <span className="text-[10px] font-bold text-zinc-400 italic">
                        {field.type || 'Object'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Interface Map (Routes v24.0) ── */}
      {data.routes && data.routes.length > 0 && (
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <SectionHeading icon={<Map size={14} strokeWidth={3} />} title="Interface Map (API Routes)" />
          <div className="border-2 border-zinc-950 rounded-sm overflow-hidden bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,0.05)]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-950 text-white">
                  <th className="px-5 py-3 text-[9px] font-bold uppercase tracking-widest italic border-r border-zinc-800 w-24">Method</th>
                  <th className="px-5 py-3 text-[9px] font-bold uppercase tracking-widest italic border-r border-zinc-800">Endpoint Linkage</th>
                  <th className="px-5 py-3 text-[9px] font-bold uppercase tracking-widest italic">Handling Strategy</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {data.routes.map((route, i) => (
                  <tr key={i} className="hover:bg-amber-50 group transition-colors italic">
                    <td className="px-5 py-4 border-r border-zinc-50">
                      <span className={`px-2 py-0.5 rounded-[2px] text-[9px] font-bold uppercase tracking-tighter ${
                        route.method === 'POST' ? 'bg-emerald-500 text-white' :
                        route.method === 'GET' ? 'bg-amber-400 text-zinc-950' :
                        'bg-zinc-950 text-white'
                      }`}>
                        {route.method}
                      </span>
                    </td>
                    <td className="px-5 py-4 border-r border-zinc-50">
                      <span className="font-mono text-[11px] font-bold text-zinc-950 group-hover:text-amber-600 transition-colors uppercase tracking-tight">
                        {route.path}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold text-zinc-900 uppercase tracking-tight group-hover:text-zinc-950 transition-colors">
                            {route.controller_logic || 'Anonymous Operation'}
                          </span>
                          {route.target && (
                            <span className="text-[9px] font-bold bg-zinc-900 text-white px-1.5 py-0.5 rounded-sm uppercase tracking-tighter italic">
                              Target: {route.target}
                            </span>
                          )}
                        </div>
                        {route.desc && <p className="text-[10px] text-zinc-400 font-medium uppercase tracking-tight leading-relaxed">{route.desc}</p>}
                        {route.dependencies && route.dependencies.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {route.dependencies.map((dep, idx) => (
                              <span key={idx} className="px-1.5 py-0.5 bg-amber-50 text-amber-600 text-[9px] font-bold uppercase tracking-tighter rounded-sm border border-amber-100">
                                {dep}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* ── Logic Complexity (Logic Units v24.0) ── */}
      {data.logic_units && data.logic_units.length > 0 && (
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <SectionHeading icon={<Cpu size={14} strokeWidth={3} />} title="Logic Complexity Analyzer" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.logic_units.map((unit, i) => (
              <div key={i} className="p-6 bg-white border-2 border-zinc-950 shadow-[6px_6px_0px_0px_rgba(9,9,11,1)] rounded-sm group hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-zinc-100">
                  <span className="font-mono text-[13px] font-bold text-zinc-950 uppercase tracking-widest leading-none italic flex items-center gap-2">
                    <Zap size={10} className="text-amber-500" /> {unit.function_name}
                  </span>
                  <div className="flex flex-col items-end gap-1">
                     <span className="text-[9px] font-bold text-zinc-400 uppercase italic">Intensity: {unit.complexity}/10</span>
                     <div className="flex gap-0.5">
                        {[...Array(10)].map((_, step) => (
                          <div key={step} className={`h-3 w-1.5 rounded-[1px] ${step < (unit.complexity || 0) ? (unit.complexity > 7 ? 'bg-red-500' : 'bg-zinc-950') : 'bg-zinc-100'}`} />
                        ))}
                     </div>
                  </div>
                </div>
                <p className="text-[12px] text-zinc-600 mb-6 leading-relaxed italic font-medium pr-4">
                  &quot;{unit.description}&quot;
                </p>
                <div className="relative p-5 bg-zinc-950 border-2 border-zinc-950 rounded-sm">
                   <div className="absolute -top-3 left-4 px-2 py-0.5 bg-amber-400 text-zinc-950 text-[9px] font-bold uppercase tracking-widest italic shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)]">
                      Migration Protocol
                   </div>
                   <p className="text-[11px] font-medium text-zinc-300 leading-normal italic">
                      {unit.migration_strategy}
                   </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Environment Hub (v23.0 - High Depth) ── */}
      {data.grouped_variables && (
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <SectionHeading icon={<Terminal size={14} strokeWidth={3} />} title="Environmental Registry" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(data.grouped_variables).map(([category, vars]) => (
              vars && Array.isArray(vars) && vars.length > 0 && (
                <div key={category} className="border-2 border-zinc-950 rounded-sm overflow-hidden bg-white shadow-[6px_6px_0px_0px_rgba(39,39,42,1)] flex flex-col">
                   <div className="px-4 py-2 bg-zinc-950 text-white flex items-center justify-between">
                      <span className="text-[12px] font-semibold uppercase tracking-widest italic">{category} Pulse</span>
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
                   </div>
                   <div className="divide-y divide-zinc-100 flex-1 overflow-auto max-h-[400px]">
                      {vars.map((v: any, index: number) => {
                        const isObject = typeof v === 'object' && v !== null;
                        const key = isObject ? v.key : String(v);
                        const value = isObject ? v.value : '';
                        const purpose = isObject ? v.purpose : '';
                        
                        return (
                          <div key={index} className="p-4 hover:bg-zinc-50 transition-colors group">
                            <div className="flex items-center justify-between mb-1.5 ">
                              <span className="text-[12px] font-mono font-semibold text-zinc-950 truncate uppercase tracking-tight">
                                {key}
                              </span>
                              {isObject && v.source && (
                                <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-widest border border-zinc-200 px-1 rounded-sm">
                                  {v.file || 'env'}
                                </span>
                              )}
                            </div>
                            {isObject && (
                              <div className="space-y-2">
                                <div className="p-1.5 bg-zinc-50 border border-zinc-100 rounded-sm font-mono text-[11px] text-zinc-700 break-all select-all">
                                  {/* Mask secrets if category is security/auth */}
                                  {(category.toLowerCase().includes('security') || category.toLowerCase().includes('auth')) && value.length > 10
                                    ? value.substring(0, 4) + '****************' + value.substring(value.length - 4)
                                    : value || 'NOT_DEFINED'}
                                </div>
                                {purpose && (
                                  <p className="text-[10px] font-medium text-zinc-600 italic leading-tight group-hover:text-zinc-500 transition-colors uppercase">
                                    // {purpose}
                                  </p>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                   </div>
                </div>
              )
            ))}
          </div>
        </section>
      )}

      {/* ── Registry Intelligence (Dependencies v23.0) ── */}
      {(data.dependencies || data.dev_dependencies) && (
        <section className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
           <SectionHeading icon={<Cpu size={14} strokeWidth={3} />} title="Registry Intelligence (Dependency Engine)" />
           
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Main Dependencies */}
              {data.dependencies && (
                <div className="space-y-4">
                  <h4 className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-zinc-400 mb-4 italic">
                    <span className="h-1 w-8 bg-amber-500" /> Production Runtime
                  </h4>
                  <div className="border-2 border-zinc-950 rounded-sm bg-white overflow-hidden shadow-[6px_6px_0px_0px_rgba(0,0,0,0.05)]">
                    <table className="w-full text-left border-collapse">
                      <thead>
                         <tr className="bg-zinc-50 text-zinc-500 border-b border-zinc-100">
                            <th className="px-4 py-2 text-[10px] uppercase tracking-widest border-r border-zinc-100 italic">Library</th>
                            <th className="px-4 py-2 text-[10px] uppercase tracking-widest italic w-20">Ver</th>
                            <th className="px-4 py-2 text-[10px] uppercase tracking-widest italic">Mission</th>
                         </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-50">
                         {data.dependencies.map((dep: any, i: number) => (
                           <tr key={i} className="hover:bg-amber-50 group">
                              <td className="px-4 py-3 border-r border-zinc-50">
                                 <span className="text-[11px] font-semibold text-zinc-950 group-hover:text-amber-600 transition-colors uppercase italic">{dep.name}</span>
                              </td>
                              <td className="px-4 py-3 border-r border-zinc-50">
                                 <span className="text-[11px] font-mono font-semibold text-zinc-500">{dep.version}</span>
                              </td>
                              <td className="px-4 py-3">
                                 <span className="text-[11px] font-medium text-zinc-600 lowercase italic line-clamp-1">{dep.purpose}</span>
                              </td>
                           </tr>
                         ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Dev Dependencies */}
              {data.dev_dependencies && (
                <div className="space-y-4">
                  <h4 className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-zinc-500 mb-4 italic">
                    <span className="h-1 w-8 bg-zinc-950" /> Developmental Tooling
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                     {data.dev_dependencies.map((dep: any, i: number) => (
                       <div key={i} className="p-3 border-2 border-zinc-100 rounded-sm bg-zinc-50/50 hover:border-zinc-950 transition-all group">
                          <div className="flex items-center justify-between mb-1">
                             <span className="text-[11px] font-semibold text-zinc-950 uppercase italic leading-none">{dep.name}</span>
                             <span className="text-[11px] font-mono text-zinc-500">{dep.version}</span>
                          </div>
                          <p className="text-[11px] text-zinc-600 uppercase tracking-tight italic line-clamp-1">{dep.purpose}</p>
                       </div>
                     ))}
                  </div>
                </div>
              )}
           </div>
        </section>
      )}

      {/* ── Functional Modules ── */}
      {data.core_features && (
        <section>
          <SectionHeading icon={<Zap size={14} strokeWidth={3} />} title="Functional Modules" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {data.core_features.map((feature: any, i: number) => {
              const isString = typeof feature === 'string';
              const label = isString ? feature : (feature.label || feature.name || feature.title || feature.feature || feature.module || 'Module');
              const description = isString ? '' : (feature.desc || feature.description || feature.explanation || feature.purpose || feature.summary || '');

              return (
                <div key={i} className="group p-5 bg-white border-2 border-zinc-950 rounded-sm shadow-[0px_4px_0px_0px_rgba(9,9,11,1)] hover:shadow-none hover:translate-y-[4px] transition-all">
                  <div className="relative z-10 flex gap-4">
                    <div className="h-10 w-10 shrink-0 bg-zinc-950 text-white rounded-sm flex items-center justify-center group-hover:bg-amber-400 group-hover:text-zinc-950 transition-colors border-2 border-zinc-950">
                      <CheckCircle2 size={18} strokeWidth={3} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-[11px] font-semibolduppercase tracking-tight text-zinc-950 truncate italic">
                        {label}
                      </h4>
                      {description && description !== label && (
                        <p className="text-[11px] text-zinc-500 mt-1 font-medium leading-relaxed italic pr-2">
                          {description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ── Business Rules ── */}
      {data.business_rules && data.business_rules.length > 0 && (
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
          <SectionHeading icon={<ShieldCheck size={14} strokeWidth={3} />} title="Strategic Business Rules" />
          <div className="bg-zinc-950 border-2 border-zinc-950 rounded-sm p-6 shadow-[8px_8px_0px_0px_rgba(9,9,11,0.1)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400 opacity-5 -mr-16 -mt-16 rounded-full blur-3xl" />
            <ul className="space-y-4 relative z-10">
              {data.business_rules.map((rule: any, i: number) => (
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
        </section>
      )}
    </div>
  );
};
