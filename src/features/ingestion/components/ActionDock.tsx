import React from 'react';
import { CheckCircle2, ChevronUp, ChevronDown } from 'lucide-react';
import { ACTIONS } from '../config/actions';
import { WorkbenchMode } from '../types/workbench';

interface ActionDockProps {
  isActionsCollapsed: boolean;
  setIsActionsCollapsed: (collapsed: boolean) => void;
  onAnalyzeClick: (actionId: string) => void;
  isAnalyzing: string | null;
  analysisResults: Record<string, string | null>;
  activeAction: string;
  workbenchMode: WorkbenchMode;
}

export const ActionDock: React.FC<ActionDockProps> = ({
  isActionsCollapsed,
  setIsActionsCollapsed,
  onAnalyzeClick,
  isAnalyzing,
  analysisResults,
  activeAction,
  workbenchMode
}) => {
  const visibleActions = ACTIONS.filter(action => {
    if (workbenchMode === 'standalone') {
      return action.id === 'migration' || action.id === 'quick_migration';
    }
    // Enterprise: Show 6 tactical options, excluding only 'quick_migration'
    return action.id !== 'quick_migration';
  });

  return (
    <div className="flex flex-col flex-shrink-0">
      <div className="relative border-t-2 border-zinc-950 flex justify-center">
        <button
          onClick={() => setIsActionsCollapsed(!isActionsCollapsed)}
          title={isActionsCollapsed ? "Expand Mission Control" : "Collapse Mission Control"}
          className="absolute -top-4 w-8 h-8 rounded-full bg-zinc-950 border-2 border-zinc-950 text-white flex items-center justify-center hover:bg-amber-400 hover:text-zinc-950 transition-all shadow-[2px_2px_0px_0px_rgba(9,9,11,1)] z-[60]"
        >
          {isActionsCollapsed ? <ChevronUp size={16} strokeWidth={3} /> : <ChevronDown size={16} strokeWidth={3} />}
        </button>
      </div>

      {!isActionsCollapsed && (
        <div className={`grid ${visibleActions.length > 1 ? 'grid-cols-2' : 'grid-cols-1'} flex-shrink-0 animate-in slide-in-from-bottom-4 duration-300 bg-white`}>
          {visibleActions.map((action, i) => {
            const hasResult = !!analysisResults[action.id];
            const isLastRow = i >= visibleActions.length - (visibleActions.length % 2 === 0 ? 2 : 1);
            const isRightCol = i % 2 !== 0;

            return (
              <button
                key={action.id}
                onClick={() => onAnalyzeClick(action.id)}
                disabled={!!isAnalyzing}
                className={`py-4 px-4 flex items-center gap-3 text-left transition-all border-zinc-200 disabled:opacity-40 disabled:cursor-not-allowed
                  ${visibleActions.length > 1 && !isRightCol ? 'border-r-2 border-zinc-950' : ''}
                  ${isLastRow ? '' : 'border-b-2 border-zinc-950'}
                  ${activeAction === action.id && !isAnalyzing
                    ? 'bg-amber-400 text-zinc-950'
                    : 'bg-white hover:bg-zinc-950 hover:text-white text-zinc-900 group'
                  }`}
              >
                <div className="relative">
                  <action.icon className={`w-4 h-4 flex-shrink-0 transition-transform duration-300 group-hover:scale-110 ${activeAction === action.id ? 'text-zinc-950' : 'text-zinc-400 group-hover:text-amber-400'}`} strokeWidth={2} />
                  {hasResult && (
                    <div className="absolute -top-1.5 -right-1.5 bg-emerald-500 rounded-full border border-white">
                      <CheckCircle2 size={10} className="text-white" strokeWidth={4} />
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-[11px] font-black uppercase tracking-widest leading-none mb-1">{action.label}</p>
                  <p className="text-[8px] font-bold uppercase tracking-widest opacity-60 leading-none">
                    {hasResult ? 'Stored . Update?' : 'Initiate Scan'}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
