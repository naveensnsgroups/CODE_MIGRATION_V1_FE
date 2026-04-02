'use client';

import React, { useState } from 'react';
import { FileTree } from './FileTree';
import { IngestionResponse } from '../types';
import { AnalysisReport } from './AnalysisReport';
import { Zap, Route, Brain, Rocket, Loader2, Sparkles, RefreshCcw, ChevronLeft, ChevronRight } from 'lucide-react';
import { analysisClient } from '../../../api/AnalysisClient';
import apiClient from '../../../api/Client';

interface WorkbenchProps {
  data: IngestionResponse;
}

export const Workbench: React.FC<WorkbenchProps> = ({ data }) => {
  const [isAnalyzing, setIsAnalyzing] = useState<string | null>(null);
  const [analysisResults, setAnalysisResults] = useState<Record<string, string | null>>({});
  const [activeAction, setActiveAction] = useState<string>('general');
  const [isExpanded, setIsExpanded] = useState(false);

  React.useEffect(() => {
    const fetchSavedReports = async () => {
      try {
        const response = await apiClient.get(`/analysis/${data.project_id}/reports`);
        if (response.data?.reports) {
          const loadedResults: Record<string, string> = {};
          response.data.reports.forEach((report: any) => {
            loadedResults[report.action] = report.content;
          });
          setAnalysisResults(prev => ({ ...prev, ...loadedResults }));
        }
      } catch (err) {
        console.warn('Could not load existing reports:', err);
      }
    };

    if (data.project_id) fetchSavedReports();
  }, [data.project_id]);

  const autoSave = async (action: string, content: string) => {
    try {
      await apiClient.post(`/analysis/${data.project_id}/save`, {
        action,
        content,
      });
      console.log(`[Auto-Save] ${action} finalized in DB.`);
    } catch (e) {
      console.error('Auto-save failed:', e);
    }
  };

  const handleAnalyze = async (action: string = 'general') => {
    try {
      setIsAnalyzing(action);
      setActiveAction(action);
      const context = await analysisClient.getLocalContext(data.project_id);
      
      // 🚀 Trigger AI Scan
      const output = await analysisClient.analyzeWithAgent(data.project_id, context, action);
      
      // Update UI
      setAnalysisResults(prev => ({ ...prev, [action]: output }));

      // 💾 Auto-Save to MongoDB immediately
      autoSave(action, output);

    } catch (error) {
      console.error(`Analysis (${action}) failed:`, error);
      alert(`${action} scan failed. Check console for details.`);
    } finally {
      setIsAnalyzing(null);
    }
  };

  const actions = [
    { id: 'general', label: 'General Scan', icon: Zap },
    { id: 'routes', label: 'Map Routes', icon: Route },
    { id: 'logic', label: 'Logic Breakdown', icon: Brain },
    { id: 'migration', label: 'Migration Strategy', icon: Rocket },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 lg:p-8 space-y-6">

      {/* ── Header Bar ── */}
      <div className="bg-white border-2 border-zinc-950 rounded-sm shadow-[6px_6px_0px_0px_rgba(9,9,11,1)] px-8 py-5 flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-xl font-medium italic uppercase tracking-tighter text-zinc-950">
            Migration <span className="text-amber-500">Workbench</span>
          </h2>
          <div className="flex items-center gap-3">
             <p className="font-mono text-[11px] font-bold text-zinc-950 uppercase tracking-widest border-r-2 border-zinc-200 pr-3">
              Project: <span className="text-zinc-500 ">{data.project_name}</span>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => window.location.reload()}
            className="px-5 py-2.5 bg-zinc-950 text-white text-[10px] font-medium uppercase tracking-widest rounded-sm hover:bg-zinc-800 transition-all flex items-center gap-2 group"
          >
            <RefreshCcw className="w-3 h-3 group-hover:rotate-180 transition-transform duration-500" />
            New Project
          </button>
        </div>
      </div>

      {/* ── Main Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* File Explorer */}
        {!isExpanded && (
          <div className="lg:col-span-7 flex flex-col h-[760px] bg-white border-2 border-zinc-950 rounded-sm shadow-[6px_6px_0px_0px_rgba(9,9,11,1)] overflow-hidden">
            {/* Panel Header */}
            <div className="bg-zinc-950 px-6 py-3 flex items-center justify-between">
              <span className="text-[10px] font-medium uppercase tracking-widest text-white italic">Source Explorer</span>
              <div className="flex gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500" />
                <div className="w-2 h-2 rounded-full bg-amber-400" />
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <FileTree tree={data.file_tree} />
            </div>
          </div>
        )}

        {/* Intelligence Panel */}
        <div className={`${isExpanded ? 'lg:col-span-12' : 'lg:col-span-5'} flex flex-col h-[760px] bg-white border-2 border-zinc-950 rounded-sm shadow-[6px_6px_0px_0px_rgba(9,9,11,1)] transition-all duration-500 relative`}>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            title={isExpanded ? 'Collapse' : 'Expand'}
            className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-14 bg-zinc-950 text-white flex items-center justify-center rounded-sm border-2 border-zinc-950 z-50 hover:bg-amber-400 hover:text-zinc-950 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
          >
            {isExpanded ? (
              <ChevronRight className="w-4 h-4" strokeWidth={3} />
            ) : (
              <ChevronLeft className="w-4 h-4" strokeWidth={3} />
            )}
          </button>

          {/* Panel Header */}
          <div className="bg-zinc-950 px-6 py-3 flex items-center justify-between flex-shrink-0">
            <span className="text-[10px] font-medium uppercase tracking-widest text-white italic">Intelligence Hub</span>
            <div className="flex items-center gap-3">
              <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">
                {data.metadata?.language || '—'} / {data.metadata?.framework || '—'}
              </span>
            </div>
          </div>

          {/* Scan Tabs */}
          <div className="flex border-b-2 border-zinc-950 flex-shrink-0">
            {actions.map(action => (
              <button
                key={action.id}
                onClick={() => setActiveAction(action.id)}
                className={`flex-1 py-3 text-[9px] font-medium uppercase tracking-widest transition-all border-r border-zinc-200 last:border-r-0 ${activeAction === action.id
                    ? 'bg-amber-400 text-zinc-950'
                    : 'bg-white text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900'
                  }`}
              >
                {action.label.split(' ')[0]}
              </button>
            ))}
          </div>

          {/* Result Area */}
          <div className="flex-1 overflow-y-auto p-6">
            {isAnalyzing === activeAction ? (
              <div className="h-full flex flex-col items-center justify-center gap-4">
                <Loader2 className="w-10 h-10 text-amber-500 animate-spin" strokeWidth={1.5} />
                <p className="text-xs font-medium uppercase tracking-widest text-zinc-950 animate-pulse">Scanning Architecture...</p>
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                  <Sparkles className="w-3 h-3" /> Bundling code context
                </p>
              </div>
            ) : analysisResults[activeAction] ? (
              <div className="prose prose-sm max-w-none">
                <AnalysisReport content={analysisResults[activeAction] as string} />
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center gap-4 text-center">
                <div className="w-14 h-14 border-2 border-zinc-200 rounded-sm flex items-center justify-center text-zinc-300">
                  <Sparkles className="w-7 h-7" />
                </div>
                <p className="text-xs font-medium uppercase tracking-widest text-zinc-400">Select a scan below to begin</p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="border-t-2 border-zinc-950 grid grid-cols-2 flex-shrink-0">
            {actions.map((action, i) => (
              <button
                key={action.id}
                onClick={() => handleAnalyze(action.id)}
                disabled={!!isAnalyzing}
                className={`py-4 px-4 flex items-center gap-3 text-left transition-all border-zinc-200 disabled:opacity-40 disabled:cursor-not-allowed
                  ${i % 2 === 0 ? 'border-r' : ''}
                  ${i < 2 ? 'border-b' : ''}
                  ${activeAction === action.id && !isAnalyzing
                    ? 'bg-amber-400 text-zinc-950'
                    : 'bg-white hover:bg-zinc-950 hover:text-white text-zinc-900 group'
                  }`}
              >
                <action.icon className={`w-4 h-4 flex-shrink-0 transition-transform duration-300 group-hover:scale-110 ${activeAction === action.id ? 'text-zinc-950' : 'text-zinc-400 group-hover:text-amber-400'}`} strokeWidth={2} />
                <div>
                  <p className="text-[9px] font-medium uppercase tracking-widest">{action.label}</p>
                  <p className="text-[8px] font-bold uppercase tracking-widest opacity-60">Run Scan</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
