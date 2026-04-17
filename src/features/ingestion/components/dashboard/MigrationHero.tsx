import React from 'react';
import { Layers, CheckCircle2, AlertTriangle, ArrowRight, Gauge, Sparkles, Cpu } from 'lucide-react';
import { SectionHeading, StructuredData, Tag } from './CommonElements';

export const MigrationHero: React.FC<{ data: StructuredData }> = ({ data }) => {
  const roadmap = data.roadmap || [];
  const targetStack = data.target_stack || { backend: '?', framework: '?' };
  const sourceStack = data.tech_stack || { backend: [], frontend: [], statics: [] };
  const coreFeatures = data.core_features || [];
  const businessRules = data.business_rules || [];
  const score = data.feasibility_score || 0;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-12 pb-12">

      {/* ── Architectural Context comparison ── */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Source Environment */}
        <div className="bg-white p-6 border-4 border-dashed border-zinc-200 rounded-sm shadow-[6px_6px_0px_0px_rgba(0,0,0,0.05)]">
          <div className="flex items-center gap-3 mb-6">
            <AlertTriangle size={18} className="text-zinc-400" />
            <span className="text-[12px] font-medium uppercase tracking-widest text-zinc-500">Source Environment (Legacy)</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[8px] font-bold text-zinc-400 uppercase mb-2">Backend Hub</p>
              <div className="flex flex-wrap gap-1">
                {sourceStack.backend.map((t, i) => <span key={i} className="px-1.5 py-0.5 bg-zinc-100 text-zinc-600 text-[8px] font-bold uppercase rounded-sm border border-zinc-200">{t}</span>)}
              </div>
            </div>
            <div>
              <p className="text-[8px] font-bold text-zinc-400 uppercase mb-2">Statics/Data</p>
              <div className="flex flex-wrap gap-1">
                {sourceStack.statics.map((t, i) => <span key={i} className="px-1.5 py-0.5 bg-zinc-100 text-zinc-600 text-[8px] font-bold uppercase rounded-sm border border-zinc-200">{t}</span>)}
              </div>
            </div>
          </div>
        </div>

        {/* Target Destination */}
        <div className="bg-zinc-950 p-6 border-4 border-zinc-950 rounded-sm shadow-[6px_6px_0px_0px_rgba(251,191,36,0.15)] flex flex-col justify-between overflow-hidden relative group">
          <div className="absolute top-0 right-0 p-1 opacity-10 group-hover:opacity-20 transition-opacity">
            <Sparkles size={120} className="text-white" />
          </div>
          <div className="flex items-center gap-3 mb-4 relative z-10">
            <Layers size={18} className="text-amber-400" />
            <span className="text-[12px] font-medium uppercase tracking-widest text-zinc-400">Target Destination</span>
          </div>
          <div className="relative z-10">
            <h4 className="text-xl font-medium text-white uppercase italic leading-none">{targetStack.framework}</h4>
            <p className="text-[11px] font-bold text-zinc-500 uppercase mt-2 tracking-tighter">Native Stack: <span className="text-amber-500">{targetStack.backend}</span> / {targetStack.database || "SQL Basis"}</p>
          </div>
        </div>
      </section>

      {/* ── Feasibility & Strategy ── */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 border-4 border-zinc-950 rounded-sm shadow-[8px_8px_0px_0px_rgba(9,9,11,1)]">
          <div className="flex items-center gap-3 mb-4">
            <Gauge size={18} className="text-zinc-950" />
            <span className="text-[12px] font-medium uppercase tracking-widest text-zinc-500">Modernization Feasibility</span>
          </div>
          <div className="flex items-end gap-3">
            <span className="text-5xl font-medium text-zinc-950 italic leading-none">{score}%</span>
            <Tag>{score > 75 ? 'High' : score > 50 ? 'Stable' : 'Surgical'}</Tag>
          </div>
        </div>

        <div className="bg-amber-400 p-7 border-4 border-zinc-950 rounded-sm shadow-[8px_8px_0px_0px_rgba(9,9,11,1)] flex flex-col justify-center italic relative overflow-hidden">
          <div className="absolute -top-4 -right-4 p-1 opacity-20 rotate-12">
            <Sparkles size={110} className="text-amber-600" />
          </div>
          <p className="text-[11px] font-medium leading-relaxed text-zinc-950 uppercase opacity-90 relative z-10">
            {data.modernization_strategy || "Surgical modernizing protocol active. Awaiting code extraction context..."}
          </p>
        </div>
      </section>

      {/* ── Core Logic Units ── */}
      {coreFeatures.length > 0 && (
        <section>
          <SectionHeading icon={<Cpu size={14} strokeWidth={3} />} title="Extracted Logic Features" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {coreFeatures.map((feature, i) => {
              const f = typeof feature === 'string' ? { label: feature, desc: 'Logic extraction pending.' } : feature;
              return (
                <div key={i} className="bg-zinc-50 border-2 border-zinc-200 p-5 rounded-sm hover:border-zinc-950 transition-all group shadow-[4px_4px_0px_0px_rgba(0,0,0,0.05)] hover:shadow-[4px_4px_0px_0px_rgba(9,9,11,1)]">
                  <h5 className="text-[12px] font-medium uppercase text-zinc-950 mb-2 leading-none border-l-4 border-amber-400 pl-3">
                    {f.label}
                  </h5>
                  <p className="text-[12px] font-medium text-zinc-500 leading-relaxed italic">
                    {f.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ── Surgical Migration Roadmap ── */}
      <section>
        <SectionHeading icon={<CheckCircle2 size={14} strokeWidth={3} />} title="Modernization Roadmap" />

        <div className="space-y-4">
          {roadmap.length > 0 ? roadmap.map((phase, i) => (
            <div key={i} className="group flex items-stretch gap-6 animate-in fade-in slide-in-from-left-4 duration-500" style={{ animationDelay: `${i * 150}ms` }}>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-sm bg-zinc-950 text-white flex items-center justify-center border-4 border-zinc-950 group-hover:bg-amber-400 group-hover:text-zinc-950 transition-colors z-10 font-medium italic text-sm">
                  {String(i + 1).padStart(2, '0')}
                </div>
                {i !== roadmap.length - 1 && (
                  <div className="w-1 bg-zinc-200 flex-1 my-2 rounded-full" />
                )}
              </div>

              <div className="flex-1 pb-8">
                <div className="bg-white border-4 border-zinc-950 p-8 rounded-sm shadow-[8px_8px_0px_0px_rgba(9,9,11,1)] group-hover:shadow-[8px_8px_0px_0px_rgba(251,191,36,1)] transition-all relative overflow-hidden">
                  <div className={`absolute top-0 right-0 px-4 py-1 text-[8px] font-medium uppercase tracking-widest border-l-4 border-b-4 border-zinc-950 ${phase.priority === 'Critical' ? 'bg-red-500 text-white' :
                    phase.priority === 'High' ? 'bg-amber-400 text-zinc-950' :
                      'bg-emerald-500 text-white'
                    }`}>
                    {phase.priority}
                  </div>

                  <h4 className="text-sm font-medium uppercase tracking-widest text-zinc-950 mb-6 italic underline decoration-amber-400 decoration-8 underline-offset-8 leading-none pb-1">
                    {phase.phase}
                  </h4>

                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                    {Array.isArray(phase.tasks) ? phase.tasks.map((task, j) => (
                      <li key={j} className="flex items-start gap-3 p-3 bg-zinc-50 border-2 border-dashed border-zinc-100 rounded-sm hover:border-zinc-950 hover:bg-white transition-all group/task">
                        <ArrowRight size={14} className="shrink-0 mt-0.5 text-amber-500 group-hover/task:translate-x-1 transition-transform" />
                        <span className="text-[12px] font-bold text-zinc-700 uppercase leading-snug tracking-tight italic">{task}</span>
                      </li>
                    )) : (
                      <li className="p-3 text-[12px] font-bold text-zinc-400 uppercase italic">Extraction in progress...</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          )) : (
            <div className="p-12 border-4 border-dashed border-zinc-200 rounded-sm text-center">
              <AlertTriangle className="mx-auto text-zinc-200 mb-4" size={48} />
              <p className="text-[12px] font-medium uppercase tracking-widest text-zinc-400 italic">Initiate a surgical scan to generate modernization roadmap.</p>
            </div>
          )}
        </div>
      </section>

      {/* ── Business Logic Registry ── */}
      {businessRules.length > 0 && (
        <section className="bg-zinc-950 p-8 border-4 border-zinc-950 shadow-[10px_10px_0px_0px_rgba(251,191,36,1)] rounded-sm">
          <div className="flex items-center gap-3 mb-8">
            <Layers size={18} className="text-amber-400" />
            <span className="text-[12px] font-medium uppercase tracking-widest text-white italic underline decoration-amber-400">Business Logic Registry</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            {businessRules.map((rule, i) => (
              <div key={i} className="flex items-center gap-4 text-white border-b border-zinc-800 pb-3 group">
                <div className="w-5 h-5 border border-amber-400 flex items-center justify-center shrink-0 group-hover:bg-amber-400 group-hover:text-zinc-950 transition-all">
                  <span className="text-[12px] font-medium italic">{i + 1}</span>
                </div>
                <p className="text-[11px] font-bold uppercase tracking-tight opacity-70 group-hover:opacity-100 transition-opacity leading-tight pr-4">
                  {rule}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
};
