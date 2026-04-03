'use client';

import React, { useState, useCallback } from 'react';
import { FileTree } from './FileTree';
import { IngestionResponse } from '../types';
import { AnalysisReport } from './AnalysisReport';
import {
  Layout,
  Map as MapIcon,
  Cpu,
  Layers,
  Loader2,
  Sparkles,
  RefreshCcw,
  ChevronLeft,
  ChevronRight,
  CheckCircle2
} from 'lucide-react';
import { analysisClient } from '../../../api/AnalysisClient';
import apiClient from '../../../api/Client';
import { ConfirmationModal } from './modals/ConfirmationModal';
import { MigrationWizard } from './modals/MigrationWizard';

interface WorkbenchProps {
  data: IngestionResponse;
}

export const Workbench: React.FC<WorkbenchProps> = ({ data }) => {
  const [isAnalyzing, setIsAnalyzing] = useState<string | null>(null);
  const [analysisResults, setAnalysisResults] = useState<Record<string, string | null>>({});
  const [activeAction, setActiveAction] = useState<string>('general');
  const [isExpanded, setIsExpanded] = useState(false);
  const [showRerunModal, setShowRerunModal] = useState<string | null>(null);
  const [isMigrationWizardOpen, setIsMigrationWizardOpen] = useState(false);

  const syncIntelligence = useCallback(async () => {
    try {
      const response = await apiClient.get(`analysis/${data.project_id}/reports`);
      if (response.data?.reports) {
        const loadedResults: Record<string, string> = {};
        response.data.reports.forEach((report: { action: string; content: string }) => {
          loadedResults[report.action] = report.content;
        });

        setAnalysisResults(prev => ({ ...prev, ...loadedResults }));

        // Auto-select general only if nothing is selected or if we just loaded it
        if (loadedResults['general']) {
          setActiveAction(prev => (prev === 'general' || !prev ? 'general' : prev));
        }
        console.log(`[Intelligence Hub] Synced reports from DB.`);
      }
    } catch (err) {
      console.warn('Could not sync intelligence hub:', err);
    }
  }, [data.project_id]); // ⚡ Removed analysisResults to break the infinite loop

  React.useEffect(() => {
    if (data.project_id) syncIntelligence();
  }, [data.project_id, syncIntelligence]);

  const autoSave = async (action: string, content: string) => {
    try {
      await apiClient.post(`analysis/${data.project_id}/save`, {
        action,
        content,
      });
      console.log(`[Auto-Save] ${action} finalized in DB.`);
    } catch (e) {
      console.error('Auto-save failed:', e);
    }
  };

  const executeAnalysis = async (action: string, stackSettings?: { backend: string; framework: string; frontend?: string }) => {
    try {
      setIsAnalyzing(action);
      setActiveAction(action);
      const context = await analysisClient.getLocalContext(data.project_id);

      // 🧠 Cumulative Intelligence: If migration scan, gather all previous intelligence
      let previousIntelligence = '';
      if (action === 'migration') {
        const intelParts = Object.entries(analysisResults)
          .filter(([key, val]) => key !== 'migration' && val)
          .map(([key, val]) => `STAGE: ${key.toUpperCase()}\n${val}`);

        if (intelParts.length > 0) {
          previousIntelligence = intelParts.join('\n\n---\n\n');
          console.log(`[Intelligence Hub] Bundling ${intelParts.length} previous reports for Migration Strategy`);
        }
      }

      // 🚀 Trigger AI Scan
      const output = await analysisClient.analyzeWithAgent(
        data.project_id,
        context,
        action,
        previousIntelligence,
        stackSettings
      );

      // Update UI
      setAnalysisResults(prev => ({ ...prev, [action]: output }));

      // 💾 Auto-Save to Database
      autoSave(action, output);

    } catch (error) {
      console.error(`Analysis (${action}) failed:`, error);
      alert(`${action} scan failed. Check console for details.`);
    } finally {
      setIsAnalyzing(null);
      setShowRerunModal(null);
    }
  };

  const handleAnalyzeClick = (action: string) => {
    if (action === 'migration') {
      setIsMigrationWizardOpen(true);
      return;
    }

    if (analysisResults[action]) {
      setShowRerunModal(action);
    } else {
      executeAnalysis(action);
    }
  };

  const handleMigrationConfirm = (settings: { backend: string; framework: string; frontend?: string }) => {
    setIsMigrationWizardOpen(false);
    executeAnalysis('migration', settings);
  };

  const handleGeneratePlan = async () => {
    try {
      setIsAnalyzing('planner');
      const migrationResult = analysisResults['migration'];
      if (!migrationResult) return;

      const output = await analysisClient.analyzeWithAgent(
        data.project_id,
        migrationResult, // 🧠 Send the Architect's roadmap as context
        'planner'
      );

      setAnalysisResults(prev => ({ ...prev, planner: output }));
      autoSave('planner', output);
    } catch (e) {
      console.error('Planner Agent failed:', e);
    } finally {
      setIsAnalyzing(null);
    }
  };

  const actions = [
    {
      id: 'general',
      label: 'General Scan',
      icon: Layout,
      desc: 'Architecture, stack, and file map.',
      guidance: 'Perform a high-depth architectural overview. IDENTIFY the primary source language (e.g., COBOL, JCL). FORBID: Do not mention Java or Spring Boot unless specifically detected.'
    },
    {
      id: 'routes',
      label: 'Map Routes',
      icon: MapIcon,
      desc: 'API endpoints and logic handlers.',
      guidance: 'MAPPING PROTOCOL: Map legacy procedure calls to API patterns. FORBID: No Spring Boot templates or Java classes.'
    },
    {
      id: 'logic',
      label: 'Logic Breakdown',
      icon: Cpu,
      desc: 'Business rules and data flow.',
      guidance: 'LOGIC SNIPPETS: Extract business rules. FORBID: No Java classes or Spring Boot services.'
    },
    {
      id: 'migration',
      label: 'Migration Strategy',
      icon: Layers,
      desc: 'Step-by-step roadmap.',
      guidance: 'MASTER ARCHITECT v2.3: Perform a high-depth architectural synthesis. Map legacy logic (COBOL/JCL) to target framework idioms.'
    },
    {
      id: 'planner',
      label: 'Execution Plan',
      icon: Sparkles,
      desc: 'Step-by-step commands.',
      guidance: 'EXECUTION PLANNER v2.4: Provide tactical terminal commands and file templates based on the strategy.'
    },
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
          {analysisResults['migration'] && !analysisResults['planner'] && (
            <button
              onClick={handleGeneratePlan}
              className="px-5 py-2.5 bg-amber-400 border-2 border-zinc-950 text-zinc-950 text-[10px] font-medium uppercase tracking-widest rounded-sm hover:bg-amber-300 transition-all flex items-center gap-2 shadow-[2px_2px_0px_0px_rgba(9,9,11,1)] active:shadow-none active:translate-x-0.5 active:translate-y-0.5"
            >
              <Sparkles className="w-3 h-3" />
              Generate Execution Plan
            </button>
          )}
          <button
            onClick={syncIntelligence}
            className="px-5 py-2.5 bg-white border-2 border-zinc-950 text-zinc-950 text-[10px] font-medium uppercase tracking-widest rounded-sm hover:bg-zinc-50 transition-all flex items-center gap-2 shadow-[2px_2px_0px_0px_rgba(9,9,11,1)] active:shadow-none active:translate-x-0.5 active:translate-y-0.5"
          >
            <RefreshCcw className="w-3 h-3 text-amber-500" />
            Sync Intelligence Hub
          </button>
          <button
            onClick={() => window.location.reload()}
            className="px-5 py-2.5 bg-zinc-950 text-white text-[10px] font-medium uppercase tracking-widest rounded-sm hover:bg-zinc-800 transition-all flex items-center gap-2 group"
          >
            <Layout className="w-3 h-3 group-hover:rotate-12 transition-transform duration-500" />
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
          <div className="flex border-b-2 border-zinc-950 flex-shrink-0 overflow-x-auto scroller-hide">
            {actions.map(action => (
              <button
                key={action.id}
                onClick={() => setActiveAction(action.id)}
                className={`flex-1 min-w-[100px] py-3 px-2 text-[9px] font-medium uppercase tracking-widest transition-all border-r border-zinc-200 last:border-r-0 flex flex-col items-center justify-center gap-0.5 ${activeAction === action.id
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
          <div className="flex-1 overflow-y-auto p-6 scroll-smooth">
            {isAnalyzing === activeAction ? (
              <div className="h-full flex flex-col items-center justify-center gap-4">
                <Loader2 className="w-10 h-10 text-amber-500 animate-spin" strokeWidth={1.5} />
                <p className="text-xs font-medium uppercase tracking-widest text-zinc-950 animate-pulse">Scanning Architecture...</p>
                <div className="flex items-center gap-2 px-3 py-1 bg-zinc-50 border border-zinc-200 rounded-full">
                  <Sparkles className="w-3 h-3 text-amber-500" />
                  <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Bundling surgical context</span>
                </div>
              </div>
            ) : analysisResults[activeAction] ? (
              <div className="animate-in fade-in duration-500">
                <AnalysisReport
                  content={analysisResults[activeAction] as string}
                  activeAction={activeAction}
                />
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center gap-4 text-center p-8 border-4 border-dashed border-zinc-50 rounded-sm">
                <div className="w-14 h-14 border-2 border-zinc-200 rounded-sm flex items-center justify-center text-zinc-200 group-hover:border-zinc-950 transition-colors">
                  <Sparkles className="w-7 h-7" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium uppercase tracking-widest text-zinc-300">Hub Empty</p>
                  <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-tighter max-w-[200px] leading-tight">Run a surgical scan below to populate this intelligence node.</p>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons (Bottom Grid) */}
          <div className="border-t-2 border-zinc-950 grid grid-cols-2 flex-shrink-0">
            {actions.map((action, i) => {
              const worksExist = !!analysisResults[action.id];
              return (
                <button
                  key={action.id}
                  onClick={() => handleAnalyzeClick(action.id)}
                  disabled={!!isAnalyzing}
                  className={`py-4 px-4 flex items-center gap-3 text-left transition-all border-zinc-200 disabled:opacity-40 disabled:cursor-not-allowed
                    ${i % 2 === 0 ? 'border-r' : ''}
                    ${i < 2 ? 'border-b' : ''}
                    ${activeAction === action.id && !isAnalyzing
                      ? 'bg-amber-400 text-zinc-950'
                      : 'bg-white hover:bg-zinc-950 hover:text-white text-zinc-900 group'
                    }`}
                >
                  <div className="relative">
                    <action.icon className={`w-4 h-4 flex-shrink-0 transition-transform duration-300 group-hover:scale-110 ${activeAction === action.id ? 'text-zinc-950' : 'text-zinc-400 group-hover:text-amber-400'}`} strokeWidth={2} />
                    {worksExist && (
                      <div className="absolute -top-1.5 -right-1.5 bg-emerald-500 rounded-full border border-white">
                        <CheckCircle2 size={10} className="text-white" strokeWidth={4} />
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-[9px] font-medium uppercase tracking-widest leading-none mb-1">{action.label}</p>
                    <p className="text-[8px] font-bold uppercase tracking-widest opacity-60 leading-none">
                      {worksExist ? 'Stored . Update?' : 'Initiate Scan'}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 🔮 Intelligence Confirmation Modal */}
      <ConfirmationModal
        isOpen={!!showRerunModal}
        onClose={() => setShowRerunModal(null)}
        onConfirm={() => executeAnalysis(showRerunModal!)}
        title="Override Stored Intelligence?"
        message={`Deep surgical data for ${showRerunModal?.toUpperCase()} already exists in the intelligence hub. Do you want to run a fresh scan to update it?`}
      />

      <MigrationWizard
        isOpen={isMigrationWizardOpen}
        onClose={() => setIsMigrationWizardOpen(false)}
        onConfirm={handleMigrationConfirm}
      />
    </div>
  );
};
