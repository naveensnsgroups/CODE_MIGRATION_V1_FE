'use client';

import React, { useState } from 'react';
import { FileTree } from './FileTree';
import { IngestionResponse } from '../types';
import { AnalysisReport } from './AnalysisReport';
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
    { id: 'general', label: 'General Scan', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
    { id: 'routes', label: 'Map Routes', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
    { id: 'logic', label: 'Logic Breakdown', icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' },
    { id: 'migration', label: 'Migration Strategy', icon: 'M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z' },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 lg:p-8 space-y-6">

      {/* ── Header Bar ── */}
      <div className="bg-white border-2 border-zinc-950 rounded-sm shadow-[6px_6px_0px_0px_rgba(9,9,11,1)] px-8 py-5 flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-xl font-medium italic uppercase tracking-tighter text-zinc-950">
            Migration <span className="text-amber-500">Workbench</span>
          </h2>
          <p className="font-mono text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
            Project ID: <span className="text-zinc-950">{data.project_id}</span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => window.location.reload()}
            className="px-5 py-2.5 bg-zinc-950 text-white text-[10px] font-medium uppercase tracking-widest rounded-sm hover:bg-zinc-800 transition-colors"
          >
            New Session
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
        <div className={`${isExpanded ? 'lg:col-span-12' : 'lg:col-span-5'} flex flex-col h-[760px] bg-white border-2 border-zinc-950 rounded-sm shadow-[6px_6px_0px_0px_rgba(9,9,11,1)] overflow-hidden transition-all duration-500 relative`}>

          {/* Expand Toggle */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            title={isExpanded ? 'Collapse' : 'Expand'}
            className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-14 bg-zinc-950 text-white flex items-center justify-center rounded-l-sm z-50 hover:bg-amber-400 hover:text-zinc-950 transition-colors"
          >
            <svg className={`w-3 h-3 transition-transform duration-500 ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M15 19l-7-7 7-7" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
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
                <div className="w-10 h-10 border-2 border-zinc-950 border-t-amber-400 rounded-full animate-spin" />
                <p className="text-xs font-medium uppercase tracking-widest text-zinc-950 animate-pulse">Scanning Architecture...</p>
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Bundling code context</p>
              </div>
            ) : analysisResults[activeAction] ? (
              <div className="prose prose-sm max-w-none">
                <AnalysisReport content={analysisResults[activeAction] as string} />
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center gap-4 text-center">
                <div className="w-14 h-14 border-2 border-zinc-200 rounded-sm flex items-center justify-center text-zinc-300">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
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
                    : 'bg-white hover:bg-zinc-950 hover:text-white text-zinc-900'
                  }`}
              >
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d={action.icon} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
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
