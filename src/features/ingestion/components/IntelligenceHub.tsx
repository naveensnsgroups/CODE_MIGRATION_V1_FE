import React from 'react';
import { ChevronLeft, ChevronRight, Loader2, Sparkles } from 'lucide-react';
import { ACTIONS } from '../config/actions';
import { AnalysisReport } from './AnalysisReport';
import { ActionDock } from './ActionDock';
import { WorkbenchMode } from '../types/workbench';

interface IntelligenceHubProps {
  isExpanded: boolean;
  setIsExpanded: (expanded: boolean) => void;
  activeAction: string;
  setActiveAction: (action: string) => void;
  isAnalyzing: string | null;
  analysisResults: Record<string, string | null>;
  metadata: any;
  isActionsCollapsed: boolean;
  setIsActionsCollapsed: (collapsed: boolean) => void;
  onAnalyzeClick: (actionId: string) => void;
  workbenchMode: WorkbenchMode;
}

export const IntelligenceHub: React.FC<IntelligenceHubProps> = ({
  isExpanded,
  setIsExpanded,
  activeAction,
  setActiveAction,
  isAnalyzing,
  analysisResults,
  metadata,
  isActionsCollapsed,
  setIsActionsCollapsed,
  onAnalyzeClick,
  workbenchMode
}) => {
  const visibleActions = ACTIONS.filter(action => {
    if (workbenchMode === 'standalone') {
      return action.id === 'migration' || action.id === 'quick_migration';
    }
    // Enterprise: Show 6 tabs, excluding only 'quick_migration' to prevent disruption
    return action.id !== 'quick_migration';
  });

  return (
    <div className={`${isExpanded ? 'lg:col-span-12' : 'lg:col-span-5'} flex flex-col h-[860px] bg-white border-2 border-zinc-950 rounded-sm shadow-[6px_6px_0px_0px_rgba(9,9,11,1)] transition-all duration-500 relative`}>

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        title={isExpanded ? 'Collapse' : 'Expand'}
        className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-14 bg-zinc-950 text-white flex items-center justify-center rounded-sm border-2 border-zinc-950 z-50 hover:bg-amber-400 hover:text-zinc-950 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
      >
        {isExpanded ? <ChevronRight size={16} strokeWidth={3} /> : <ChevronLeft size={16} strokeWidth={3} />}
      </button>

      {/* Panel Header */}
      <div className="bg-zinc-950 px-6 py-3 flex items-center justify-between flex-shrink-0">
        <span className="text-[12px] font-medium uppercase tracking-widest text-white italic">Intelligence Hub</span>
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest">
            {metadata?.language || '—'} / {metadata?.framework || '—'}
          </span>
        </div>
      </div>

      {/* Scan Tabs */}
      <div className="flex border-b-2 border-zinc-950 flex-shrink-0 overflow-x-auto scroller-hide">
        {visibleActions.map(action => (
          <button
            key={action.id}
            onClick={() => setActiveAction(action.id)}
            className={`flex-1 min-w-[100px] py-3 px-2 text-[11px] font-medium uppercase tracking-widest transition-all border-r border-zinc-200 last:border-r-0 flex flex-col items-center justify-center gap-0.5 ${activeAction === action.id
              ? 'bg-amber-400 text-zinc-950'
              : 'bg-white text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900'
              }`}
          >
            <span>{action.label.split(' ')[0]}</span>
            {analysisResults[action.id] && (
              <span className="text-[7px] font-medium tracking-tighter opacity-70 flex items-center gap-1 leading-none uppercase">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full border border-white" />
                Stored . Update?
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Result Area */}
      <div className="flex-1 overflow-y-auto p-6 scroll-smooth scroller-industrial">
        {isAnalyzing === activeAction ? (
          <div className="h-full flex flex-col items-center justify-center gap-4">
            <Loader2 className="w-10 h-10 text-amber-500 animate-spin" strokeWidth={1.5} />
            <p className="text-xs font-medium uppercase tracking-widest text-zinc-950 animate-pulse">Scanning Architecture...</p>
            <div className="flex items-center gap-2 px-3 py-1 bg-zinc-50 border border-zinc-200 rounded-full">
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest">Bundling surgical context</span>
            </div>
          </div>
        ) : analysisResults[activeAction] ? (
          <div className="animate-in fade-in duration-500">
            <AnalysisReport
              content={analysisResults[activeAction] as string}
              activeAction={activeAction}
              fullContext={analysisResults['general'] || null}
            />
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center gap-4 text-center p-8 border-4 border-dashed border-zinc-50 rounded-sm">
            <div className="w-14 h-14 border-2 border-zinc-200 rounded-sm flex items-center justify-center text-zinc-200">
              <Sparkles className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <p className="text-xs font-medium uppercase tracking-widest text-zinc-300">Hub Empty</p>
              <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-tighter max-w-[200px] leading-tight">Run a surgical scan below to populate this intelligence node.</p>
            </div>
          </div>
        )}
      </div>

      <ActionDock
        isActionsCollapsed={isActionsCollapsed}
        setIsActionsCollapsed={setIsActionsCollapsed}
        onAnalyzeClick={onAnalyzeClick}
        isAnalyzing={isAnalyzing}
        analysisResults={analysisResults}
        activeAction={activeAction}
        workbenchMode={workbenchMode}
      />
    </div>
  );
};
