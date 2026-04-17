'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState, useEffect, useRef } from 'react';
import { Navbar } from '@/components/common/Navbar';
import { Button } from '@/components/common/Button';
import { useIngestion } from '@/features/ingestion';
import { useAuth } from '@/features/auth';
import { RepoSelector } from '@/features/ingestion/components/RepoSelector';
import { PrivateRepoModal } from '@/features/ingestion/components/modals/PrivateRepoModal';

export default function LandingPage() {
  const { data, loading, error, startIngestion, reset } = useIngestion();
  const { user, handleLogin, handleLogout } = useAuth();
  const [repoUrl, setRepoUrl] = useState('');
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const autoStarted = useRef(false);
  const prevUser = useRef(user);

  // Atomic Logout Reset: ONLY clear data if we transitioned from Logged In -> Logged Out
  useEffect(() => {
    if (prevUser.current && !user) {
      reset();
    }
    prevUser.current = user;
  }, [user, reset]);

  useEffect(() => {
    // 0. Handle GitHub OAuth Callback from URL (Token Flow)
    const token = searchParams.get('token');
    const uid = searchParams.get('uid');
    const githubUser = searchParams.get('user');
    const avatar = searchParams.get('avatar');

    if (token && uid && githubUser && !autoStarted.current) {
      autoStarted.current = true; // Surgical Guard
      handleLogin({
        access_token: token,
        user: {
          id: parseInt(uid),
          login: githubUser,
          avatar_url: avatar || ''
        }
      });
      // Clean URL after login
      router.replace('/');
      return;
    }

    // 0.1 Handle direct GitHub code (Relay fallback)
    const code = searchParams.get('code');
    if (code && !autoStarted.current) {
      autoStarted.current = true;
      window.location.href = `http://localhost:8000/api/auth/callback?code=${code}`;
      return;
    }

    // 1. Handle Direct Link Analysis (from URL param)
    const urlParam = searchParams.get('url');
    if (urlParam && !autoStarted.current) {
      autoStarted.current = true;
      startIngestion(urlParam);
    }
  }, [searchParams, handleLogin, router, startIngestion]);

  // 🚀 Industrial Navigation: Redirect to Workbench on Success
  useEffect(() => {
    if (data?.project_id) {
      router.push(`/workbench/${data.project_id}`);
    }
  }, [data?.project_id, router]);

  const handleManualAnalyze = () => {
    if (repoUrl.trim()) {
      startIngestion(repoUrl);
    }
  };

  return (
    <div className="min-h-screen bg-white text-zinc-950 selection:bg-amber-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-20 animate-in fade-in zoom-in-95 duration-1000 w-full text-center">
        <div className="max-w-[1600px] mx-auto w-full flex flex-col items-center">
          {/* Main Command Center Header */}
          <div className="max-w-4xl w-full space-y-4 text-center mb-12">
            <h1 className="text-5xl md:text-5xl font-medium italic tracking-tighter uppercase leading-[0.8] text-zinc-950 drop-shadow-sm">
              Code Migration <br />
              <span className="text-amber-500 underline decoration-zinc-950 decoration-[12px] underline-offset-[16px]">Intelligence</span>
            </h1>
          </div>

          {/* Industrial Action Panel */}
          <div className="w-full max-w-2xl bg-white border-4 border-zinc-950 rounded-sm shadow-[12px_12px_0px_0px_rgba(9,9,11,1)] overflow-hidden transition-all hover:shadow-[16px_16px_0px_0px_rgba(9,9,11,1)] text-left">
            {/* Industrial Toolbar */}
            <div className="bg-zinc-950 px-6 py-4 flex items-center justify-between border-b-4 border-zinc-950">
              <span className="text-[12px] font-medium uppercase tracking-[0.3em] text-white italic">Migration Entry Pipeline</span>
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
              </div>
            </div>

            <div className="p-12 space-y-10">
              {/* GitHub Connector Area */}
              {!user ? (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-8 border-4 border-dashed border-zinc-100 rounded-sm bg-zinc-50/50 group hover:border-amber-400 transition-colors text-left">
                  <div>
                    <h3 className="text-[12px] font-medium uppercase tracking-widest text-zinc-950 mb-1">Developer Portal</h3>
                    <p className="text-[12px] font-semibold text-zinc-500 uppercase tracking-tight">Connect your account for private repository access</p>
                  </div>
                  <Button
                    onClick={() => window.location.href = 'http://localhost:8000/api/auth/login'}
                    className="h-14 px-10 text-[12px] font-medium uppercase tracking-[0.2em] !rounded-sm shadow-[6px_6px_0px_0px_rgba(251,191,36,1)] active:shadow-none active:translate-x-1 active:translate-y-1"
                    variant="primary"
                  >
                    Connect GitHub Account
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center justify-between px-2">
                    <div className="flex items-center gap-3">
                      <img src={user.avatar_url} alt={user.login} className="w-10 h-10 border-2 border-zinc-950 rounded-sm shadow-[3px_3px_0px_0px_rgba(251,191,36,1)]" />
                      <p className="text-[12px] font-medium uppercase tracking-widest text-zinc-950 italic">Connected as {user.login}</p>
                    </div>
                    <button onClick={handleLogout} className="text-[12px] font-medium uppercase tracking-widest text-zinc-400 hover:text-red-500 transition-colors">Disconnect</button>
                  </div>

                  <div
                    onClick={() => setIsSelectorOpen(true)}
                    className="p-12 border-4 border-dashed border-zinc-100 rounded-sm flex flex-col items-center justify-center text-center group hover:border-amber-400 transition-colors cursor-pointer bg-zinc-50/50"
                  >
                    <svg className="w-10 h-10 text-zinc-200 mb-4 group-hover:text-amber-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-zinc-500 group-hover:text-zinc-950">Select From My Repositories</p>
                    <span className="text-[11px] font-semibold text-zinc-400 mt-2 uppercase tracking-widest">Private & Public Access Active</span>
                  </div>
                </div>
              )}

              <div className="relative">
                <div className="absolute inset-0 flex items-center"><span className="w-full border-t-2 border-zinc-100"></span></div>
                <div className="relative flex justify-center text-[11px] font-medium uppercase tracking-[0.4em] text-zinc-500 text-center"><span className="bg-white px-6 italic">Or Public Analysis</span></div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between px-2">
                  <label className="text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-950 italic">Source Repository URL</label>
                  <span className="text-[12px] font-semibold text-zinc-600 uppercase tracking-widest text-center">Public Domain</span>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="text"
                    placeholder="HTTPS://GITHUB.COM/ORG/REPO"
                    value={repoUrl}
                    onChange={(e) => setRepoUrl(e.target.value)}
                    className="flex-1 h-14 bg-zinc-50 border-2 border-zinc-200 rounded-sm px-6 font-semibold text-xs uppercase tracking-widest focus:outline-none focus:border-zinc-950 transition-all placeholder:text-zinc-500 font-mono"
                  />
                  <Button
                    onClick={handleManualAnalyze}
                    loading={loading}
                    className="h-14 px-10 text-[12px] font-medium italic uppercase !rounded-sm tracking-[0.2em]"
                    variant="amber"
                    disabled={!repoUrl}
                  >
                    Public Analysis
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {error && (
            <div className="mt-8 max-w-2xl w-full p-4 rounded-sm bg-red-50 border border-red-200 text-red-600 text-[12px] font-medium text-center uppercase tracking-widest animate-shake">
              {error}
            </div>
          )}
        </div>
      </main>

      <RepoSelector
        isOpen={isSelectorOpen}
        onClose={() => setIsSelectorOpen(false)}
        onSelect={(repoUrl: string) => {
          startIngestion(repoUrl);
          setIsSelectorOpen(false);
        }}
      />

      <PrivateRepoModal
        isOpen={error === "PRIVATE_REPOSITORY"}
        onClose={reset}
        repoUrl={repoUrl}
      />
    </div>
  );
}
