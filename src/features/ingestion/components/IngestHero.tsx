'use client';

import React from 'react';
import { RepoInput } from './RepoInput';

interface IngestHeroProps {
  onAnalyze: (url: string) => void;
  loading: boolean;
  error: string | null;
}

export const IngestHero: React.FC<IngestHeroProps> = ({ onAnalyze, loading, error }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight uppercase italic underline decoration-black/5">
          Code Migration <br />
          <span className="text-zinc-400">Workspace</span>
        </h1>
        <p className="max-w-xl mx-auto text-sm font-semibold opacity-40 uppercase tracking-[0.2em] leading-relaxed">
          Analyze &bull; Architect &bull; Transform &bull; Scale
        </p>
      </div>

      <RepoInput onAnalyze={onAnalyze} loading={loading} />

      {error && (
        <div className="max-w-2xl mx-auto p-4 rounded-sm bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/30 text-red-600 dark:text-red-400 text-xs font-bold text-center uppercase tracking-widest animate-shake">
          {error}
        </div>
      )}
    </div>
  );
};
