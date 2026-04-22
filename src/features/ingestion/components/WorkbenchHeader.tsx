import React from 'react';
import { Sparkles, RefreshCcw, Layout, ShieldCheck, Zap } from 'lucide-react';
import { WorkbenchMode } from '../types/workbench';

interface WorkbenchHeaderProps {
  projectName: string;
  onGeneratePlan: () => void;
  onSyncIntelligence: () => void;
  onNewProject: () => void;
  showGeneratePlan: boolean;
}

export const WorkbenchHeader: React.FC<WorkbenchHeaderProps> = ({
  projectName,
  onGeneratePlan,
  onSyncIntelligence,
  onNewProject,
  showGeneratePlan
}) => {
  return (
    <div className="bg-white border-2 border-zinc-950 rounded-sm shadow-[6px_6px_0px_0px_rgba(9,9,11,1)] px-8 py-5 flex items-center justify-between">
      <div className="flex items-center gap-8">
        <div className="space-y-1">
          <h2 className="text-xl font-medium italic uppercase tracking-tighter text-zinc-950">
            Migration <span className="text-amber-500">Workbench</span>
          </h2>
          <div className="flex items-center gap-3">
            <p className="font-mono text-[11px] font-bold text-zinc-950 uppercase tracking-widest border-r-2 border-zinc-200 pr-3">
              Project: <span className="text-zinc-500 ">{projectName}</span>
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        {showGeneratePlan && (
          <button
            onClick={onGeneratePlan}
            className="px-5 py-2.5 bg-amber-400 border-2 border-zinc-950 text-zinc-950 text-[12px] font-medium uppercase tracking-widest rounded-sm hover:bg-amber-300 transition-all flex items-center gap-2 shadow-[2px_2px_0px_0px_rgba(9,9,11,1)] active:shadow-none active:translate-x-0.5 active:translate-y-0.5"
          >
            <Sparkles className="w-3 h-3" />
            Generate Execution Plan
          </button>
        )}
        <button
          onClick={onSyncIntelligence}
          className="px-5 py-2.5 bg-white border-2 border-zinc-950 text-zinc-950 text-[12px] font-medium uppercase tracking-widest rounded-sm hover:bg-zinc-50 transition-all flex items-center gap-2 shadow-[2px_2px_0px_0px_rgba(9,9,11,1)] active:shadow-none active:translate-x-0.5 active:translate-y-0.5"
        >
          <RefreshCcw className="w-3 h-3 text-amber-500" />
          Sync Intelligence Hub
        </button>
        <button
          onClick={onNewProject}
          className="px-5 py-2.5 bg-zinc-950 text-white text-[12px] font-medium uppercase tracking-widest rounded-sm hover:bg-zinc-800 transition-all flex items-center gap-2 group"
        >
          <Layout className="w-3 h-3 group-hover:rotate-12 transition-transform duration-500" />
          New Project
        </button>
      </div>
    </div>
  );
};
