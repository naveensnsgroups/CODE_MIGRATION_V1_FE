import React from 'react';
import { 
  Rocket, 
  Map, 
  Flag, 
  CheckCircle2, 
  ArrowRight,
  Cpu,
  ShieldCheck,
  Zap,
  Code
} from 'lucide-react';
import { StructuredData, SectionHeading } from './CommonElements';

export const StrategyHero: React.FC<{ data: StructuredData }> = ({ data }) => {
  // Logic: Extract roadmap segments from the high-depth strategy report
  const roadmap = data.roadmap || data.strategy?.roadmap || [];
  const milestones = data.milestones || data.strategy?.milestones || [];
  const stack = data.stack_decisions || data.strategy?.stack_decisions || [];

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* ── Industrial Roadmap (v17.1) ── */}
      <div className="space-y-8">
        <SectionHeading icon={<Map size={14} strokeWidth={3} />} title="Modernization Roadmap" />
        
        <div className="relative pl-8 space-y-12 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-zinc-100 before:border-l-2 before:border-dashed before:border-zinc-200">
          {roadmap.map((phase: any, i: number) => (
            <div key={i} className="relative transition-all group">
              {/* Status Indicator */}
              <div className="absolute -left-10 top-0 w-6 h-6 bg-white border-2 border-zinc-950 rounded-sm flex items-center justify-center z-10 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] group-hover:bg-amber-400 transition-colors">
                <span className="text-[10px] font-bold text-zinc-950">{i + 1}</span>
              </div>
              
              <div className="bg-white border-2 border-zinc-950 rounded-sm p-6 shadow-[6px_6px_0px_0px_rgba(251,191,36,0.1)] group-hover:translate-x-1 transition-transform">
                <div className="flex items-center justify-between mb-4 border-b border-zinc-100 pb-3">
                  <h4 className="text-[14px] font-semibold text-zinc-950 uppercase tracking-tight italic">
                    Phase {i + 1}: {phase.title}
                  </h4>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-zinc-900 text-white text-[9px] font-bold uppercase tracking-tighter rounded-[2px] italic">
                      {phase.duration || 'TBD'}
                    </span>
                  </div>
                </div>
                
                <p className="text-[11px] font-medium text-zinc-500 leading-relaxed italic mb-6">
                  &quot;{phase.objective}&quot;
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {phase.tasks?.map((task: any, tIdx: number) => (
                    <div key={tIdx} className="flex items-start gap-3 bg-zinc-50 p-3 border border-zinc-100 rounded-sm">
                      <div className="mt-0.5">
                        <CheckCircle2 size={12} className="text-emerald-500" strokeWidth={3} />
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] font-bold text-zinc-950 uppercase tracking-tight leading-none uppercase">
                          {task.title}
                        </p>
                        <p className="text-[9px] font-medium text-zinc-400 uppercase tracking-tighter italic">
                          {task.impact}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Stack Supremacy & Skills Audit ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-6 border-t-2 border-zinc-100">
        
        {/* Modernization Stack */}
        <div className="space-y-6">
          <SectionHeading icon={<Cpu size={14} strokeWidth={3} />} title="Target Stack Decisions" />
          <div className="space-y-3">
            {stack.map((item: any, i: number) => (
              <div key={i} className="flex items-center justify-between p-4 bg-white border-2 border-zinc-950 rounded-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,0.05)]">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-zinc-950 rounded-sm">
                    <Zap size={14} className="text-amber-400" />
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest leading-none mb-1">{item.layer}</p>
                    <p className="text-[13px] font-semibold text-zinc-950 uppercase tracking-tight italic">{item.technology}</p>
                  </div>
                </div>
                <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-sm border border-emerald-100 uppercase tracking-tighter">
                  Confirmed
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Surgical Milestones */}
        <div className="space-y-6">
          <SectionHeading icon={<Flag size={14} strokeWidth={3} />} title="Critical Milestones" />
          <div className="bg-zinc-950 rounded-sm p-6 space-y-4">
            {milestones.map((ms: any, i: number) => (
              <div key={i} className="flex items-start gap-4 pb-4 border-b border-zinc-800 last:border-0 last:pb-0">
                <div className="mt-1">
                  <Rocket size={14} className="text-amber-400" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-white uppercase tracking-tight">{ms.title}</p>
                  <p className="text-[10px] font-medium text-zinc-500 uppercase tracking-tighter italic leading-relaxed">
                    Expected Outcome: {ms.outcome}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};
