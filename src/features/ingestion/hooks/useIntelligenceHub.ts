import { useState, useCallback, useEffect } from 'react';
import apiClient from '../../../api/Client';
import { analysisClient } from '../../../api/AnalysisClient';
import { IngestionResponse } from '../types';
import { WorkbenchMode, WorkbenchSettings } from '../types/workbench';

export const useIntelligenceHub = (data: IngestionResponse) => {
  const [isAnalyzing, setIsAnalyzing] = useState<string | null>(null);
  const [analysisResults, setAnalysisResults] = useState<Record<string, string | null>>({});
  const [activeAction, setActiveAction] = useState<string>('general');
  const [workbenchMode, setWorkbenchMode] = useState<WorkbenchMode>('enterprise');

  useEffect(() => {
    const saved = localStorage.getItem('workbench_mode') as WorkbenchMode;
    if (saved) {
      setWorkbenchMode(saved);
      if (saved === 'standalone') {
        setActiveAction('quick_migration');
      }
    }
  }, []);
  const [isPolling, setIsPolling] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('workbench_mode', workbenchMode);
    }
    if (workbenchMode === 'standalone') {
      setActiveAction('quick_migration');
    }
  }, [workbenchMode]);

  const syncIntelligence = useCallback(async () => {
    try {
      const response = await apiClient.get(`analysis/${data.project_id}/reports`);
      if (response.data?.reports) {
        const loadedResults: Record<string, string> = {};
        response.data.reports.forEach((report: { action: string; content: string }) => {
          loadedResults[report.action] = report.content;
        });

        setAnalysisResults(prev => ({ ...prev, ...loadedResults }));
        
        if (response.data?.workbench_mode) {
          setWorkbenchMode(response.data.workbench_mode);
        }

        if (loadedResults['routes']) {
          setActiveAction('routes');
        } else if (loadedResults['general']) {
          setActiveAction(prev => (prev === 'general' || !prev ? 'general' : prev));
        }
      }
    } catch (err) {
      console.warn('Could not sync intelligence hub:', err);
    }
  }, [data.project_id]);

  useEffect(() => {
    if (data.workbench_mode) {
      setWorkbenchMode(data.workbench_mode as any);
    }

    if (data.reports && Object.keys(data.reports).length > 0) {
      const loadedResults: Record<string, string> = {};
      Object.entries(data.reports).forEach(([action, content]) => {
        loadedResults[action] = typeof content === 'string' ? content : JSON.stringify(content);
      });
      setAnalysisResults(loadedResults);
      if (loadedResults['general'] && activeAction === 'general') {
        setActiveAction('general');
      }
    } else if (data.project_id) {
      syncIntelligence();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.project_id, data.reports]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPolling) {
      interval = setInterval(async () => {
        try {
          const response = await apiClient.get(`analysis/${data.project_id}/reports`);
          if (response.data?.reports) {
            const remoteReport = response.data.reports.find((r: any) => r.action === isPolling);
            if (remoteReport) {
              setAnalysisResults(prev => ({ ...prev, [isPolling]: remoteReport.content }));
              setIsPolling(null);
              setIsAnalyzing(null);
            }
          }
        } catch (err) {
          console.warn('[Polling Engine] Sync attempt failed:', err);
        }
      }, 10000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPolling, data.project_id]);

  const autoSave = async (action: string, content: string) => {
    try {
      await apiClient.post(`analysis/${data.project_id}/save`, {
        action,
        content,
      });
    } catch (e) {
      console.error('Auto-save failed:', e);
    }
  };

  const executeAnalysis = async (action: string, stackSettings?: WorkbenchSettings) => {
    try {
      setIsAnalyzing(action);
      setActiveAction(action);
      
      const context = await analysisClient.getLocalContext(data.project_id);

      let previousIntelligence = '';
      if (action === 'migration' || action === 'quick_migration') {
        const intelParts = Object.entries(analysisResults)
          .filter(([key, val]) => (key !== 'migration' && key !== 'quick_migration') && val)
          .map(([key, val]) => `STAGE: ${key.toUpperCase()}\n${val}`);

        if (intelParts.length > 0) {
          previousIntelligence = intelParts.join('\n\n---\n\n');
        }
      }

      const output = await analysisClient.analyzeWithAgent(
        data.project_id,
        context,
        action,
        previousIntelligence,
        stackSettings
      );

      setAnalysisResults(prev => ({ ...prev, [action]: output }));
      autoSave(action, output);

    } catch (error: any) {
      if (error.message === 'BACKGROUND_PROCESS_STARTED') {
        setIsPolling(action);
      } else {
        console.error(`Analysis (${action}) failed:`, error);
        alert(`${action} scan failed. Check console for details.`);
        setIsAnalyzing(null);
      }
    } finally {
      if (isAnalyzing && !isPolling) {
        setIsAnalyzing(null);
      }
    }
  };

  return {
    isAnalyzing,
    analysisResults,
    activeAction,
    setActiveAction,
    setIsAnalyzing,
    executeAnalysis,
    syncIntelligence,
    isPolling,
    workbenchMode,
    setWorkbenchMode
  };
};
