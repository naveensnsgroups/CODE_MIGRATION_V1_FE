'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/common/Navbar';
import { Button } from '@/components/common/Button';

export default function LandingPage() {
  const [repoUrl, setRepoUrl] = useState('');
  const router = useRouter();

  const handleGitHubLogin = () => {
    window.location.href = "http://localhost:8000/api/auth/login";
  };

  const handleDirectAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    if (repoUrl.trim()) {
      router.push(`/dashboard?url=${encodeURIComponent(repoUrl.trim())}`);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 overflow-x-hidden font-sans">
      <Navbar />

      <main className="relative">
        {/* Subtle Background Accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-primary/5 blur-[120px] rounded-full -z-10 opacity-30" />

        <section className="max-w-7xl mx-auto px-6 pt-5 pb-10">
          {/* Hero Content */}
          <div className="text-center space-y-6 mb-5 animate-fade-in">

            <h1 className="text-3xl md:text-5xl font-black tracking-tighter leading-tight">
              MIGRATE <br />
              <span className="bg-gradient-to-r from-primary via-foreground to-primary bg-clip-text text-transparent italic tracking-tight">SMARTER.</span>
            </h1>

            <p className="max-w-xl mx-auto text-base opacity-60 leading-relaxed font-medium">
              The next generation of code transformation. Analyze, architect,
              and modernize legacy systems with zero-friction AI orchestration.
            </p>
          </div>

          {/* Two-Option Entry Flow: Clean White Cards */}
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            {/* Entry Path 1: GitHub */}
            <div className="group relative p-[1px] rounded-sm overflow-hidden transition-all hover:scale-[1.01] border border-border shadow-xl shadow-zinc-200/40">
              <div className="relative h-full bg-background p-8 flex flex-col items-center justify-between z-10">
                <div className="space-y-6 text-center">
                  <div className="w-16 h-16 rounded-sm bg-primary flex items-center justify-center mx-auto shadow-xl shadow-primary/20">
                    <svg className="w-8 h-8 text-zinc-950" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-2xl font-black italic tracking-tighter uppercase">Enterprise Access</h2>
                    <p className="text-[10px] font-semibold opacity-40 uppercase tracking-widest leading-loose">Automated Auth &bull; Advanced Telemetry</p>
                  </div>
                </div>
                <Button onClick={handleGitHubLogin} className="w-full h-14 mt-8 font-black italic">
                  Log In With GitHub
                </Button>
              </div>
            </div>

            {/* Entry Path 2: Direct */}
            <div className="group relative p-[1px] rounded-sm overflow-hidden transition-all hover:scale-[1.01] border border-border shadow-xl shadow-zinc-200/40">
              <div className="relative h-full bg-background p-8 flex flex-col items-center justify-between z-10">
                <div className="space-y-6 text-center w-full">
                  <div className="w-16 h-16 rounded-sm bg-secondary border border-border flex items-center justify-center mx-auto">
                    <svg className="w-8 h-8 opacity-30 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.172 13.828a4 4 0 015.656 0l4-4a4 4 0 01-5.656-5.656l-1.102 1.101" />
                    </svg>
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-2xl font-black italic tracking-tighter uppercase">Instant Analysis</h2>
                    <p className="text-[10px] font-semibold opacity-40 uppercase tracking-widest leading-loose">Public Ingestion &bull; Zero Config</p>
                  </div>
                </div>

                <form onSubmit={handleDirectAnalyze} className="w-full mt-8 space-y-2">
                  <input 
                    type="url" 
                    placeholder="Repository URL"
                    value={repoUrl}
                    onChange={(e) => setRepoUrl(e.target.value)}
                    className="w-full bg-gray-50 border border-border rounded-sm px-4 py-3 text-sm focus:ring-1 focus:ring-black focus:border-black outline-none transition-all placeholder:text-gray-400 placeholder:opacity-100 font-mono text-center text-gray-900"
                  />
                  <Button variant="primary" type="submit" className="w-full h-14 font-black uppercase italic">
                    Analyze Now
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
