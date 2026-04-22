'use client';

import React, { useState } from 'react';
import { FileTree } from './FileTree';
import { CodeViewer } from './CodeViewer';
import { IngestionResponse } from '../types';
import { ConfirmationModal } from './modals/ConfirmationModal';
import { MigrationWizard } from './modals/MigrationWizard';
import { WorkbenchHeader } from './WorkbenchHeader';
import { IntelligenceHub } from './IntelligenceHub';
import { useIntelligenceHub } from '../hooks/useIntelligenceHub';
import { WorkbenchSettings } from '../types/workbench';

interface WorkbenchProps {
  data: IngestionResponse;
}

export const Workbench: React.FC<WorkbenchProps> = ({ data }) => {
  const {
    isAnalyzing,
    analysisResults,
    activeAction,
    setActiveAction,
    executeAnalysis,
    syncIntelligence,
    isPolling,
    workbenchMode,
    setWorkbenchMode
  } = useIntelligenceHub(data);

  const [isExpanded, setIsExpanded] = useState(false);
  const [showRerunModal, setShowRerunModal] = useState<string | null>(null);
  const [isMigrationWizardOpen, setIsMigrationWizardOpen] = useState(false);
  const [selectedFilePath, setSelectedFilePath] = useState<string | null>(null);
  const [isActionsCollapsed, setIsActionsCollapsed] = useState(false);

  const handleMigrationConfirm = (settings: WorkbenchSettings) => {
    setIsMigrationWizardOpen(false);
    executeAnalysis('migration', settings);
  };

  const handleGeneratePlan = () => executeAnalysis('planner');

  const handleAnalyzeClick = (actionId: string) => {
    if (actionId === 'migration') {
      setIsMigrationWizardOpen(true);
      return;
    }
    if (analysisResults[actionId]) {
      setShowRerunModal(actionId);
    } else {
      executeAnalysis(actionId);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 lg:p-8 space-y-6">
      <WorkbenchHeader
        projectName={data.project_name}
        onGeneratePlan={handleGeneratePlan}
        onSyncIntelligence={syncIntelligence}
        onNewProject={() => window.location.reload()}
        showGeneratePlan={!!analysisResults['migration'] && !analysisResults['planner']}
        workbenchMode={workbenchMode}
        setWorkbenchMode={setWorkbenchMode}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* File Explorer / Code Viewer */}
        {!isExpanded && (
          <div className="lg:col-span-7 flex flex-col h-[860px]">
            {selectedFilePath ? (
              <CodeViewer
                projectId={data.project_id}
                filePath={selectedFilePath}
                onClose={() => setSelectedFilePath(null)}
              />
            ) : (
              <div className="flex flex-col h-full bg-white border-2 border-zinc-950 rounded-sm shadow-[6px_6px_0px_0px_rgba(9,9,11,1)] overflow-hidden">
                <div className="bg-zinc-950 px-6 py-3 flex items-center justify-between">
                  <span className="text-[12px] font-medium uppercase tracking-widest text-white italic">Source Explorer</span>
                  <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500" />
                    <div className="w-2 h-2 rounded-full bg-amber-400" />
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto p-4 scroller-industrial">
                  <FileTree
                    tree={data.file_tree}
                    onFileClick={(path) => setSelectedFilePath(path)}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        <IntelligenceHub
          isExpanded={isExpanded}
          setIsExpanded={setIsExpanded}
          activeAction={activeAction}
          setActiveAction={setActiveAction}
          isAnalyzing={isAnalyzing}
          analysisResults={analysisResults}
          metadata={data.metadata}
          isActionsCollapsed={isActionsCollapsed}
          setIsActionsCollapsed={setIsActionsCollapsed}
          onAnalyzeClick={handleAnalyzeClick}
          workbenchMode={workbenchMode}
        />
      </div>

      <ConfirmationModal
        isOpen={!!showRerunModal}
        onClose={() => setShowRerunModal(null)}
        onConfirm={() => {
          executeAnalysis(showRerunModal!);
          setShowRerunModal(null);
        }}
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
