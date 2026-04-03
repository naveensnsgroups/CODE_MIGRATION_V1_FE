'use client';

import React, { useState, useEffect } from 'react';
import { X, Lock, Globe, Search, RefreshCw, GitBranch, ChevronRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/common/Button';

interface Repository {
  id: number;
  name: string;
  full_name: string;
  private: boolean;
  html_url: string;
  description: string;
  updated_at: string;
  language: string;
}

interface RepoSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
}

export const RepoSelector: React.FC<RepoSelectorProps> = ({ isOpen, onClose, onSelect }) => {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (isOpen) {
      fetchRepos();
    }
  }, [isOpen]);

  const fetchRepos = async () => {
    setLoading(true);
    setError(null);
    const token = localStorage.getItem('auth_token');

    if (!token) {
      setError('Not authenticated');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('https://api.github.com/user/repos?sort=updated&per_page=100', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch repositories');
      }

      const data = await response.json();
      setRepos(data);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(message || 'Failed to load repositories');
    } finally {
      setLoading(false);
    }
  };

  const filteredRepos = repos.filter(repo => 
    repo.full_name.toLowerCase().includes(search.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="w-full max-w-2xl bg-white border-4 border-zinc-950 shadow-[12px_12px_0px_0px_rgba(9,9,11,1)] rounded-sm overflow-hidden flex flex-col translate-y-0 animate-in slide-in-from-bottom-8 duration-500">
        
        {/* ── Header ── */}
        <div className="bg-zinc-950 px-8 py-6 flex items-center justify-between border-b-2 border-zinc-950">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-sm bg-amber-400 text-zinc-950 flex items-center justify-center border-2 border-zinc-950 shadow-[3px_3px_0px_0px_rgba(255,255,255,1)]">
              <GitBranch size={18} strokeWidth={3} />
            </div>
            <div>
              <h2 className="text-sm font-medium uppercase tracking-widest text-white italic">Repository Selection</h2>
              <p className="text-[10px] font-semibold text-amber-400/80 uppercase tracking-tight">Accessing GitHub Intelligence</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 text-zinc-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* ── Search Bar ── */}
        <div className="px-8 py-6 border-b-4 border-zinc-100 bg-zinc-50/50">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
            <input
              type="text"
              placeholder="Search your repositories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border-2 border-zinc-200 rounded-sm pl-12 pr-4 py-3 text-[10px] font-semibold uppercase tracking-widest focus:border-zinc-950 outline-none transition-all"
            />
          </div>
        </div>

        {/* ── Repo List ── */}
        <div className="flex-1 overflow-y-auto max-h-[60vh] p-4 bg-white">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
              <Loader2 className="animate-spin text-amber-500" size={32} />
              <p className="text-[11px] font-medium uppercase tracking-widest text-zinc-500">Fetching Intelligence...</p>
            </div>
          ) : error ? (
            <div className="p-8 text-center space-y-4">
              <p className="text-[11px] font-semibold text-red-500 uppercase">{error}</p>
              <Button onClick={fetchRepos} className="px-6">Retry Connection</Button>
            </div>
          ) : filteredRepos.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-[11px] font-medium uppercase tracking-widest text-zinc-500">No repositories found matching &quot;{search}&quot;</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-2">
              {filteredRepos.map((repo) => (
                <button
                  key={repo.id}
                  onClick={() => onSelect(repo.html_url)}
                  className="flex items-center justify-between p-4 border-2 border-zinc-100 rounded-sm hover:border-zinc-950 hover:bg-zinc-50 transition-all group text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-sm flex items-center justify-center border ${repo.private ? 'bg-amber-50 border-amber-200 text-amber-600' : 'bg-blue-50 border-blue-200 text-blue-600'}`}>
                      {repo.private ? <Lock size={14} /> : <Globe size={14} />}
                    </div>
                    <div>
                      <h3 className="text-[11px] font-medium uppercase tracking-tighter text-zinc-950 group-hover:text-amber-500 transition-colors">
                        {repo.name}
                      </h3>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-[9px] font-semibold text-zinc-500 uppercase tracking-widest">
                          {repo.language || 'Documentation'}
                        </span>
                        <span className="text-[9px] font-medium text-zinc-500 uppercase tracking-widest">
                          Updated {new Date(repo.updated_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-zinc-200 group-hover:text-zinc-950 transition-colors translate-x-0 group-hover:translate-x-1" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── Footer ── */}
        <div className="px-8 py-4 bg-zinc-50 border-t-2 border-zinc-100 flex items-center justify-between">
          <p className="text-[8px] font-semibold text-zinc-400 uppercase tracking-widest">
            {filteredRepos.length} Repositories Available
          </p>
          <button 
            onClick={fetchRepos}
            disabled={loading}
            title="Refresh repository list"
            className="flex items-center gap-2 text-[8px] font-medium uppercase tracking-widest text-zinc-500 hover:text-zinc-950 transition-colors disabled:opacity-50"
          >
            <RefreshCw size={10} className={loading ? 'animate-spin' : ''} />
            Refresh
          </button>
        </div>
      </div>
    </div>
  );
};
