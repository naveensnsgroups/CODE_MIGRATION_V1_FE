'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/common/Navbar';
import { Button } from '@/components/common/Button';

export default function LandingPage() {
  const [repoUrl, setRepoUrl] = useState('');
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#f8fafc] text-zinc-950 selection:bg-amber-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-20 animate-in fade-in zoom-in-95 duration-1000">
        {/* Main Command Center Header */}
        <div className="max-w-4xl w-full space-y-4 text-center mb-16">

          <h1 className="text-6xl md:text-5xl font-medium italic tracking-tighter uppercase leading-[0.8] text-zinc-950 drop-shadow-sm">
            Code Migration <br />
            <span className="text-amber-500 underline decoration-zinc-950 decoration-8 underline-offset-8">Intelligence</span>
          </h1>
        </div>

        {/* Industrial Action Panel */}
        <div className="w-full max-w-2xl bg-white border-2 border-zinc-950 rounded-sm shadow-[12px_12px_0px_0px_rgba(9,9,11,1)] overflow-hidden transition-all hover:shadow-[16px_16px_0px_0px_rgba(9,9,11,1)]">
          <div className="bg-zinc-950 px-6 py-2 flex items-center justify-between">
            <span className="text-[12px] font-medium uppercase tracking-widest text-white italic">Migration Entry Pipeline</span>
            <div className="flex gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500" />
              <div className="w-2 h-2 rounded-full bg-amber-500" />
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
            </div>
          </div>

          <div className="p-10 space-y-8">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-medium uppercase tracking-widest text-zinc-900">Source Repository URL</label>
                <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Public Domain</span>
              </div>
              <input
                type="text"
                placeholder="https://github.com/org/repo"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                className="w-full h-14 bg-zinc-50 border-2 border-zinc-200 rounded-sm px-6 font-mono text-sm focus:outline-none focus:border-zinc-950 focus:ring-0 transition-all placeholder:text-zinc-300"
              />
            </div>

            <div className="flex flex-col gap-4">
              <Button
                onClick={() => repoUrl && router.push(`/dashboard?url=${encodeURIComponent(repoUrl)}`)}
                className="h-14 text-sm font-medium italic uppercase !rounded-sm tracking-widest w-full"
                variant="amber"
              >
                Public Analysis
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
