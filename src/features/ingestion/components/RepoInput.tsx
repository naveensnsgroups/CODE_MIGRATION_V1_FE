'use client';

import React, { useState } from 'react';
import { GitBranch, LogOut, Search, ShieldCheck, Zap } from 'lucide-react';
import { Button } from '@/components/common/Button';
import { useAuth } from '../../auth/hooks/UseAuth';
import { RepoSelector } from './RepoSelector';
import { WorkbenchMode } from '../types/workbench';

interface RepoInputProps {
  onAnalyze: (url: string) => void;
  loading: boolean;
}

export const RepoInput: React.FC<RepoInputProps> = ({ onAnalyze, loading }) => {
  const [url, setUrl] = useState('');
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  const [workbenchMode, setWorkbenchMode] = useState<WorkbenchMode>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('workbench_mode') as WorkbenchMode;
      return saved || 'enterprise';
    }
    return 'enterprise';
  });
  const { user, handleLogout } = useAuth();

  const handleModeChange = (mode: WorkbenchMode) => {
    setWorkbenchMode(mode);
    localStorage.setItem('workbench_mode', mode);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onAnalyze(url);
    }
  };

  const handleGithubLogin = () => {
    window.location.href = 'http://localhost:8000/api/auth/login';
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-12 bg-white border-4 border-zinc-950 rounded-sm shadow-[12px_12px_0px_0px_rgba(9,9,11,1)]">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 border-b-4 border-zinc-100 pb-8">
        <div className="flex items-center gap-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-black uppercase italic tracking-tighter text-zinc-950">
              Migration <span className="text-amber-500">Entry</span> Pipeline
            </h2>
            <p className="text-[12px] font-bold text-zinc-400 uppercase tracking-widest leading-none">
              {user ? `Connected as ${user.login}` : 'Connect repository for analysis.'}
            </p>
          </div>
        </div>

        {user && (
          <div className="flex items-center gap-4">
            <img src={user.avatar_url} alt={user.login} className="w-10 h-10 border-2 border-zinc-950 rounded-sm italic shadow-[2px_2px_0px_0px_rgba(251,191,36,1)]" />
            <button
              onClick={handleLogout}
              className="p-2 text-zinc-400 hover:text-red-500 transition-colors"
              title="Disconnect"
            >
              <LogOut size={16} />
            </button>
          </div>
        )}
      </div>

      {/* NEW Prominent Mission Selection Section */}
      <div className="mb-10 p-8 border-4 border-dashed border-zinc-100 rounded-sm flex flex-col md:flex-row items-center justify-between gap-8 bg-zinc-50/30">
        <div className="space-y-1">
          <h3 className="text-[14px] font-black uppercase tracking-widest text-zinc-950">Mission Selection</h3>
          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Select your tactical Migration level.</p>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <button
            onClick={() => handleModeChange('enterprise')}
            className={`flex-1 md:flex-none px-8 py-4 flex items-center justify-center gap-3 text-[11px] font-black uppercase tracking-widest transition-all rounded-sm border-2 ${
              workbenchMode === 'enterprise'
                ? 'bg-zinc-950 text-white border-zinc-950 shadow-[6px_6px_0px_0px_rgba(251,191,36,1)]'
                : 'bg-white text-zinc-400 border-zinc-200 hover:border-zinc-950 hover:text-zinc-950'
            }`}
          >
            <ShieldCheck size={16} className={workbenchMode === 'enterprise' ? 'text-amber-400' : ''} />
            Enterprise Level
          </button>
          <button
            onClick={() => handleModeChange('standalone')}
            className={`flex-1 md:flex-none px-8 py-4 flex items-center justify-center gap-3 text-[11px] font-black uppercase tracking-widest transition-all rounded-sm border-2 ${
              workbenchMode === 'standalone'
                ? 'bg-zinc-950 text-white border-zinc-950 shadow-[6px_6px_0px_0px_rgba(251,191,36,1)]'
                : 'bg-white text-zinc-400 border-zinc-200 hover:border-zinc-950 hover:text-zinc-950'
            }`}
          >
            <Zap size={16} className={workbenchMode === 'standalone' ? 'text-amber-400' : ''} />
            Standalone Mode
          </button>
        </div>
      </div>

      {!user && (
        <div className="p-8 border-4 border-dashed border-zinc-100 rounded-sm flex flex-col md:flex-row items-center justify-between gap-8 mb-10">
          <div className="space-y-1">
            <h3 className="text-[14px] font-black uppercase tracking-widest text-zinc-950">Developer Portal</h3>
            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Connect your account for private access.</p>
          </div>
          <button
            onClick={handleGithubLogin}
            className="w-full md:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-zinc-950 text-white text-[11px] font-black uppercase tracking-widest rounded-sm hover:bg-zinc-800 transition-all shadow-[6px_6px_0px_0px_rgba(251,191,36,1)] active:shadow-none active:translate-x-1 active:translate-y-1"
          >
            <GitBranch size={16} className="text-amber-400" />
            Connect GitHub Account
          </button>
        </div>
      )}

      {user ? (
        <div className="space-y-6">
          <div
            onClick={() => setIsSelectorOpen(true)}
            className="p-8 border-4 border-dashed border-zinc-100 rounded-sm flex flex-col items-center justify-center text-center group hover:border-amber-400 transition-colors cursor-pointer bg-zinc-50/50"
          >
            <Search size={32} className="text-zinc-200 mb-4 group-hover:text-amber-400 transition-colors" />
            <p className="text-[12px] font-black uppercase tracking-widest text-zinc-400 group-hover:text-zinc-950">Select From Accessible Repositories</p>
            <span className="text-[8px] font-bold text-zinc-300 mt-2">PRIVATE & PUBLIC ACCESS ACTIVE</span>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-zinc-100"></span></div>
            <div className="relative flex justify-center text-[8px] font-black uppercase tracking-[0.3em] text-zinc-300"><span className="bg-white px-4">OR USE PUBLIC URL</span></div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="PASTE PUBLIC GITHUB REPOSITORY URL"
              required
              className="flex-1 bg-zinc-50 border-2 border-zinc-200 rounded-sm px-6 py-4 text-[12px] font-bold uppercase tracking-widest focus:border-zinc-950 outline-none placeholder:text-zinc-300 transition-all"
            />
            <Button
              type="submit"
              loading={loading}
              className="px-10 h-14"
            >
              Public Analysis
            </Button>
          </form>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="HTTPS://GITHUB.COM/ORG/REPO"
            required
            className="flex-1 bg-zinc-50 border-2 border-zinc-200 rounded-sm px-6 py-4 text-[12px] font-bold uppercase tracking-widest focus:border-zinc-950 outline-none placeholder:text-zinc-300 transition-all"
          />
          <Button
            type="submit"
            loading={loading}
            className="px-10 h-14"
          >
            Public Analysis
          </Button>
        </form>
      )}

      <RepoSelector
        isOpen={isSelectorOpen}
        onClose={() => setIsSelectorOpen(false)}
        onSelect={(repoUrl) => {
          onAnalyze(repoUrl);
          setIsSelectorOpen(false);
        }}
      />
    </div>
  );
};
