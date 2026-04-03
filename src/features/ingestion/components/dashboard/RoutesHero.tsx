import React from 'react';
import { Map, ArrowRight } from 'lucide-react';
import { SectionHeading, StructuredData, RouteNode } from './CommonElements';

export const RoutesHero: React.FC<{ routes?: RouteNode[] }> = ({ routes }) => {
  if (!routes) return null;

  return (
    <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
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
                        route.method.includes('INPUT') ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30' :
                          route.method.includes('CALL') ? 'bg-violet-500/20 text-violet-400 border border-violet-500/30' :
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
                    {route.target && (
                      <>
                        <ArrowRight size={10} className="text-zinc-500 shrink-0" />
                        <span className="px-1.5 py-0.5 bg-zinc-800 text-zinc-300 text-[8px] font-medium uppercase tracking-tighter rounded-[2px] border border-zinc-700 shrink-0">
                          {route.target}
                        </span>
                      </>
                    )}
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
                    {route.dependencies && route.dependencies.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {route.dependencies.map(dep => (
                          <span key={dep} className="px-1.5 py-0.5 bg-amber-400/10 text-amber-500 border border-amber-500/20 rounded-[2px] text-[8px] font-bold uppercase">
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
  );
};
