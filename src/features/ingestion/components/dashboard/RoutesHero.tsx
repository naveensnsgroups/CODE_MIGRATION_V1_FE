import React from 'react';
import { Map, ArrowRight, Cpu, Database, Zap } from 'lucide-react';
import { SectionHeading, StructuredData } from './CommonElements';

export const RoutesHero: React.FC<{ data: StructuredData }> = ({ data }) => {
  const routes = data.routes || [];
  const logicUnits = (data as any).logic_units || [];
  const dataAccess = (data as any).data_access || [];

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* ── API & Interface Map ── */}
      <section>
        <SectionHeading icon={<Map size={14} strokeWidth={3} />} title="Interface Map" />
        <div className="border-2 border-zinc-950 rounded-sm overflow-hidden bg-zinc-950 shadow-[6px_6px_0px_0px_rgba(251,191,36,0.1)]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-900 text-zinc-400">
                <th className="px-5 py-3 text-[9px] font-medium uppercase tracking-widest border-r border-zinc-800 w-24">Method</th>
                <th className="px-5 py-3 text-[9px] font-medium uppercase tracking-widest border-r border-zinc-800">Endpoint / Linkage</th>
                <th className="px-5 py-3 text-[9px] font-medium uppercase tracking-widest">Handler / Logic</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {routes.map((route, i) => (
                <tr key={i} className="hover:bg-zinc-900 group transition-colors">
                  <td className="px-5 py-4">
                    <span className={`px-2 py-1 rounded-[2px] text-[8px] font-medium uppercase tracking-tighter ${route.method === 'POST' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                        route.method === 'GET' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                          'bg-zinc-800 text-zinc-300 border border-zinc-700'
                      }`}>
                      {route.method}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[11px] font-medium text-white group-hover:text-amber-400 transition-colors uppercase tracking-tight italic">
                        {route.path}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[11px] font-medium text-white uppercase tracking-tight group-hover:text-amber-400 transition-colors">
                        {route.controller_logic || 'Anonymous Handler'}
                      </span>
                      <span className="text-[11px] text-zinc-400 leading-relaxed italic pr-4 font-medium">
                        {route.desc}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Logic Complexity Units ── */}
      {logicUnits.length > 0 && (
        <section>
          <SectionHeading icon={<Cpu size={14} strokeWidth={3} />} title="Logic Complexity Units" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {logicUnits.map((unit: any, i: number) => (
              <div key={i} className="bg-white border-2 border-zinc-950 p-5 rounded-sm shadow-[4px_4px_0px_0px_rgba(9,9,11,1)] flex flex-col justify-between group hover:translate-x-0.5 hover:translate-y-0.5 transition-all">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-medium uppercase tracking-widest text-zinc-950 italic flex items-center gap-2">
                      <Zap size={12} className="text-amber-500" />
                      {unit.function_name}
                    </span>
                    <span className="px-2 py-0.5 bg-zinc-950 text-white text-[11px] font-medium uppercase tracking-tighter rounded-sm">
                      COMPLEXITY: {unit.complexity}
                    </span>
                  </div>
                  <p className="text-[12px] font-medium text-zinc-600 leading-relaxed">{unit.description}</p>
                </div>
                <div className="mt-4 pt-4 border-t border-zinc-100">
                  <p className="text-[12px] font-medium uppercase tracking-widest text-amber-600 mb-1">Migration Strategy</p>
                  <p className="text-[12px] font-medium text-zinc-950 italic">{unit.migration_strategy}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Data Persistence Mapping ── */}
      {dataAccess.length > 0 && (
        <section>
          <SectionHeading icon={<Database size={14} strokeWidth={3} />} title="Data Persistence Mapping" />
          <div className="border-2 border-zinc-950 rounded-sm overflow-hidden bg-white shadow-[6px_6px_0px_0px_rgba(9,9,11,1)]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-50 text-zinc-500 border-b-2 border-zinc-950">
                  <th className="px-5 py-3 text-[9px] font-medium uppercase tracking-widest border-r-2 border-zinc-950 w-24">Operation</th>
                  <th className="px-5 py-3 text-[9px] font-medium uppercase tracking-widest border-r-2 border-zinc-950">Source Origin</th>
                  <th className="px-5 py-3 text-[9px] font-medium uppercase tracking-widest">Procedural Context</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-zinc-950">
                {dataAccess.map((op: any, i: number) => (
                  <tr key={i} className="hover:bg-zinc-50 transition-colors">
                    <td className="px-5 py-4">
                      <span className="px-3 py-1 bg-zinc-950 text-white text-[10px] font-medium uppercase tracking-tighter rounded-sm">
                        {op.operation}
                      </span>
                    </td>
                    <td className="px-5 py-4 border-l-2 border-zinc-950">
                      <span className="text-[11px] font-medium text-zinc-950 uppercase tracking-tight italic bg-amber-100 px-1.5 py-0.5 rounded-sm">
                        {op.source}
                      </span>
                    </td>
                    <td className="px-5 py-4 border-l-2 border-zinc-950">
                      <span className="text-[12px] font-medium text-zinc-800 leading-relaxed font-medium">
                        {op.description}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
};
