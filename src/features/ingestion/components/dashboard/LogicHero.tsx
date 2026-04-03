import React from 'react';
import { ListTodo } from 'lucide-react';
import { SectionHeading, StructuredData } from './CommonElements';

export const LogicHero: React.FC<{ rules?: StructuredData['business_rules']; units?: StructuredData['logic_units'] }> = ({ rules, units }) => {
  return (
    <section className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-12">
      {/* ── Surgical Logic Units (Protocol #3) ── */}
      {units && units.length > 0 && (
        <div className="space-y-6">
          <SectionHeading icon={<ListTodo size={14} strokeWidth={3} />} title="Surgical Logic Snippets" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {units.map((unit, i) => (
              <div key={i} className="p-6 bg-zinc-950 border-2 border-zinc-950 shadow-[6px_6px_0px_0px_rgba(251,191,36,0.1)] rounded-sm group hover:shadow-amber-400/20 transition-all">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[10px] font-semibold text-amber-400 uppercase tracking-widest leading-none">
                    {unit.function_name}
                  </span>
                  <span className="text-[9px] font-semibold text-zinc-600 uppercase italic">
                    Complexity: {unit.complexity}/10
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400 mb-6 leading-relaxed italic pr-4 font-medium">
                  &quot;{unit.description}&quot;
                </p>
                <div className="relative p-4 bg-zinc-900/50 border-l-4 border-amber-400 rounded-sm">
                  <span className="absolute -top-2.5 right-4 px-2 py-0.5 bg-amber-400 text-zinc-950 text-[8px] font-medium uppercase tracking-tighter shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)]">
                    Migration Strategy
                  </span>
                  <p className="text-[10px] font-medium text-zinc-300 leading-tight italic">
                    {unit.migration_strategy}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Core Constraints (Foundational Logic) ── */}
      {rules && rules.length > 0 && (
        <div className="pt-12 border-t-4 border-zinc-950">
          <SectionHeading icon={<ListTodo size={14} strokeWidth={3} />} title="Strategic Business Rules" />
          <div className="bg-zinc-950 border-2 border-zinc-950 rounded-sm p-6 shadow-[8px_8px_0px_0px_rgba(9,9,11,0.1)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400 opacity-5 -mr-16 -mt-16 rounded-full blur-3xl" />
            <ul className="space-y-4 relative z-10">
              {rules.map((rule, i) => (
                <li key={i} className="flex gap-4 group">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-400 text-zinc-950 flex items-center justify-center text-[10px] font-black italic shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)]">
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
