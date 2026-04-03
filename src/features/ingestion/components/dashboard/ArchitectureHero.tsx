import React from 'react';
import { Layers, Cpu, Zap, CheckCircle2, ShieldCheck } from 'lucide-react';
import { SectionHeading, Tag, StructuredData } from './CommonElements';

export const ArchitectureHero: React.FC<{ data: StructuredData }> = ({ data }) => {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">

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
                  <tr key={i} className="hover:bg-amber-50 group">
                    <td className="px-5 py-4 font-mono text-[10px] font-medium text-zinc-950 border-r border-zinc-950/5">
                      <span className="text-amber-600 group-hover:animate-pulse mr-1">_</span>{item.file}
                    </td>
                    <td className="px-5 py-4 text-xs font-semibold text-zinc-600 border-r border-zinc-950/5">{item.purpose}</td>
                    <td className="px-5 py-4 text-center">
                      <span className={`text-[10px] font-bold font-mono ${(item.complexity_score || 0) > 7 ? 'text-red-500' : 'text-zinc-400'
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

      {/* ── Tech Stack Reactor ── */}
      {data.tech_stack && (
        <section>
          <SectionHeading icon={<Cpu size={14} strokeWidth={3} />} title="Stack Intelligence" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(data.tech_stack).map(([key, tags]) => (
              tags && tags.length > 0 && (
                <div key={key} className="p-5 bg-white border-2 border-zinc-200 rounded-sm hover:border-zinc-950 transition-colors group">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-zinc-400 group-hover:text-zinc-950 transition-colors">{key} Layers</span>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
                  </div>
                </div>
              )
            ))}
          </div>
        </section>
      )}

      {/* ── Functional Modules (Robust Grid) ── */}
      {data.core_features && (
        <section>
          <SectionHeading icon={<Zap size={14} strokeWidth={3} />} title="Functional Modules" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {data.core_features.map((feature: string | { label?: string; name?: string; title?: string; feature?: string; module?: string; desc?: string; description?: string; explanation?: string; purpose?: string; summary?: string }, i) => {
              // 🧠 Surgical Detection: Support both String arrays and Object arrays
              const isString = typeof feature === 'string';
              const label = isString ? feature : (feature.label || feature.name || feature.title || feature.feature || feature.module || 'Module');
              const description = isString ? '' : (feature.desc || feature.description || feature.explanation || feature.purpose || feature.summary || '');

              return (
                <div key={i} className="group p-5 bg-white border-2 border-zinc-950 rounded-sm shadow-[0px_4px_0px_0px_rgba(9,9,11,1)] hover:shadow-none hover:translate-y-[4px] transition-all">
                  <div className="relative z-10 flex gap-4">
                    <div className="h-10 w-10 shrink-0 bg-zinc-950 text-white rounded-sm flex items-center justify-center group-hover:bg-amber-400 group-hover:text-zinc-950 transition-colors">
                      <CheckCircle2 size={18} strokeWidth={3} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-[11px] font-medium uppercase tracking-tight text-zinc-950 truncate">
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
      {/* ── Business Rules (Foundational Logic) ── */}
      {data.business_rules && data.business_rules.length > 0 && (
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
          <SectionHeading icon={<ShieldCheck size={14} strokeWidth={3} />} title="Strategic Business Rules" />
          <div className="bg-zinc-950 border-2 border-zinc-950 rounded-sm p-6 shadow-[8px_8px_0px_0px_rgba(9,9,11,0.1)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400 opacity-5 -mr-16 -mt-16 rounded-full blur-3xl" />
            <ul className="space-y-4 relative z-10">
              {data.business_rules.map((rule, i) => (
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
