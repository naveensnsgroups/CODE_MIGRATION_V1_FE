'use client';

import React, { useState } from 'react';
import { FileTree } from './FileTree';
import { IngestionResponse } from '../types';
import { AnalysisReport } from './AnalysisReport';
import { analysisClient } from '../../../api/AnalysisClient';

interface WorkbenchProps {
  data: IngestionResponse;
}

export const Workbench: React.FC<WorkbenchProps> = ({ data }) => {
  const [isAnalyzing, setIsAnalyzing] = useState<string | null>(null); // Track which action is analyzing
  const [analysisResults, setAnalysisResults] = useState<Record<string, string | null>>({});
  const [activeAction, setActiveAction] = useState<string>('general');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleAnalyze = async (action: string = 'general') => {
    try {
      setIsAnalyzing(action);
      setActiveAction(action);
      
      // 1. Get Code Context from Local Backend
      const context = await analysisClient.getLocalContext(data.project_id);
      
      // 2. Send to n8n LLM Agent with specialized action
      const result = await analysisClient.analyzeWithAgent(data.project_id, context, action);
      
      // Extract the result output from n8n Array structure
      const output = result[0]?.json?.response || result?.output || (typeof result === 'string' ? result : JSON.stringify(result));
      
      setAnalysisResults(prev => ({ ...prev, [action]: output }));
    } catch (error) {
      console.error(`Analysis (${action}) failed:`, error);
      alert(`${action} scan failed. Check console for details.`);
    } finally {
      setIsAnalyzing(null);
    }
  };

  const actions = [
    { id: 'general', label: 'General Scan', icon: 'M13 10V3L4 14h7v7l9-11h-7z', color: 'blue' },
    { id: 'routes', label: 'Map Routes', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', color: 'emerald' },
    { id: 'logic', label: 'Logic Breakdown', icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z', color: 'amber' },
    { id: 'migration', label: 'Migration Strategy', icon: 'M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z', color: 'indigo' }
  ];

  return (
    <div className="space-y-10 animate-in fade-in zoom-in-95 duration-500">
      {/* Workbench Header */}
      <div className="flex items-center justify-between border-b border-zinc-200 pb-6">
        <div className="space-y-1.5">
          <h2 className="text-3xl font-black italic uppercase tracking-tighter text-black">Analysis Live</h2>
          <div className="flex items-center gap-3">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <p className="font-mono text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Active Workspace: <span className="text-zinc-600">{data.project_id}</span></p>
          </div>
        </div>
        <button 
          onClick={() => window.location.reload()}
          className="px-5 py-2.5 bg-black text-white text-[10px] font-black uppercase tracking-widest hover:bg-zinc-800 transition-all active:scale-95 shadow-lg shadow-black/10"
        >
          New Migration
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 bg-white border border-zinc-200 rounded-sm shadow-xl shadow-zinc-200/50 overflow-hidden">
        {/* Main: Code Explorer (Left) */}
        {!isExpanded && (
          <div className="lg:col-span-8 flex flex-col h-[850px] border-r border-zinc-100 animate-in slide-in-from-left-4 duration-500">
            <div className="bg-white border-b border-zinc-100 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-[11px] font-black uppercase tracking-[0.2em] italic text-zinc-900">Architectural Explorer</span>
                <span className="px-2 py-0.5 bg-blue-600 text-[8px] font-black text-white uppercase tracking-widest rounded-full shadow-lg shadow-blue-200">Ready</span>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
              <FileTree tree={data.file_tree} />
            </div>
          </div>
        )}

        {/* Sidebar: Intelligence Hub (Right) */}
        <div className={`${isExpanded ? 'lg:col-span-12' : 'lg:col-span-4'} bg-zinc-50/50 flex flex-col h-[850px] transition-all duration-700 ease-in-out relative`}>
          {/* Expand Toggle Button */}
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            title={isExpanded ? "Collapse Sidebar" : "Expand Sidebar"}
            aria-label="Toggle Sidebar Expansion"
            className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-12 bg-black text-white flex items-center justify-center rounded-sm shadow-xl z-50 hover:bg-zinc-800 transition-all group scale-90"
          >
            <svg 
              className={`w-4 h-4 transition-transform duration-500 ${isExpanded ? 'rotate-180' : ''}`} 
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path d="M15 19l-7-7 7-7" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">
            {/* Project Quick Meta */}
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-8 flex items-center gap-2">
                <span className="w-4 h-0.5 bg-blue-500 rounded-full" />
                Intelligence Hub
              </h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="group">
                  <label className="text-[8px] font-black uppercase tracking-widest text-zinc-400 block mb-2">Base Language</label>
                  <p className="text-xs font-black italic uppercase text-blue-600">{data.metadata?.language || 'Unknown'}</p>
                </div>
                <div className="group">
                  <label className="text-[8px] font-black uppercase tracking-widest text-zinc-400 block mb-2">Framework</label>
                  <p className="text-xs font-black italic uppercase text-zinc-900 truncate">{data.metadata?.framework || 'Unknown'}</p>
                </div>
              </div>
            </div>

            {/* Analysis Tabs */}
            <div className="pt-8 border-t border-zinc-100">
               <div className="flex border-b border-zinc-200 mb-6">
                  {actions.map(action => (
                    <button
                      key={action.id}
                      onClick={() => setActiveAction(action.id)}
                      className={`px-4 py-2 text-[8px] font-black uppercase tracking-widest transition-all border-b-2 ${activeAction === action.id ? 'border-blue-600 text-blue-600' : 'border-transparent text-zinc-400 hover:text-zinc-600'}`}
                    >
                      {action.label.split(' ')[0]}
                    </button>
                  ))}
               </div>
               
               <div className="min-h-[300px]">
                  {isAnalyzing === activeAction ? (
                    <div className="h-48 flex flex-col items-center justify-center space-y-4 opacity-50">
                       <div className="w-8 h-8 rounded-full border-2 border-blue-600 border-t-transparent animate-spin" />
                       <p className="text-[8px] font-black uppercase tracking-[0.3em] text-blue-600">Architect Thinking...</p>
                    </div>
                  ) : analysisResults[activeAction] ? (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
                       <div className="bg-white border border-blue-100 p-6 rounded-sm shadow-sm">
                          <AnalysisReport content={analysisResults[activeAction] as string} />
                       </div>
                    </div>
                  ) : (
                    <div className="h-48 flex flex-col items-center justify-center text-center opacity-30 grayscale saturate-0 group hover:grayscale-0 hover:opacity-100 transition-all">
                       <svg className="w-10 h-10 text-zinc-300 group-hover:text-blue-500 mb-4 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                       </svg>
                       <p className="text-[8px] font-black uppercase tracking-widest text-zinc-400">Scan Required for Insights</p>
                    </div>
                  )}
               </div>
            </div>
          </div>

          {/* Action Control Hub */}
          <div className="p-8 border-t border-zinc-200 bg-white">
             <div className="grid grid-cols-2 gap-4">
                {actions.map(action => (
                  <button
                    key={action.id}
                    onClick={() => handleAnalyze(action.id)}
                    disabled={!!isAnalyzing}
                    className={`p-4 rounded-sm border transition-all relative overflow-hidden group ${activeAction === action.id ? 'border-blue-600 bg-blue-50/50' : 'border-zinc-100 hover:border-zinc-300 bg-white'}`}
                  >
                    <div className="flex items-center gap-3 relative z-10">
                      <div className={`w-8 h-8 flex items-center justify-center rounded-sm transition-colors ${activeAction === action.id ? 'bg-blue-600 text-white' : 'bg-zinc-50 text-zinc-400 group-hover:bg-zinc-900 group-hover:text-white'}`}>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d={action.icon} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </div>
                      <div className="text-left">
                        <p className={`text-[8px] font-black uppercase tracking-widest ${activeAction === action.id ? 'text-blue-600' : 'text-zinc-900'}`}>{action.label}</p>
                        <p className="text-[7px] font-bold text-zinc-400 uppercase tracking-widest truncate">Trigger Scan</p>
                      </div>
                    </div>
                  </button>
                ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
