'use client';

import React from 'react';
import { RepoInput, FileTree, useIngestion } from '@/features/ingestion';
import { LoginButton } from '@/features/auth';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function Home() {
  const { data, loading, error, startIngestion } = useIngestion();

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/10">
      {/* Search Header */}
      <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md shadow-sm dark:shadow-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center border border-border">
              <span className="text-background font-bold text-xs uppercase">AG</span>
            </div>
            <span className="font-bold tracking-tight text-sm uppercase">Migration Platform</span>
          </div>
          <div className="flex items-center gap-6">
            <ThemeToggle />
            <LoginButton />
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Input & Info */}
          <div className="lg:col-span-12 space-y-12">
            <div className="max-w-3xl mx-auto text-center space-y-4 text-xl">
              <h1>Modernize Your Legacy Codebase</h1>
              <p className="max-w-xl mx-auto leading-relaxed">
                Automated architectural analysis and code transformation. Start by 
                importing your source repository below.
              </p>
            </div>

            <RepoInput onAnalyze={startIngestion} loading={loading} />

            {error && (
              <div className="max-w-4xl mx-auto p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-medium text-center">
                {error}
              </div>
            )}
          </div>

          {/* Results Section */}
          {data && (
            <>
              <div className="lg:col-span-4 space-y-6">
                <div className="p-8 bg-background border border-border rounded-2xl shadow-sm">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-muted mb-6">Project Metadata</h3>
                  <div className="space-y-6">
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-widest text-muted block mb-1.5">Primary Language</label>
                      <p className="text-lg font-bold text-foreground">{data.metadata?.language || 'Unknown'}</p>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-widest text-muted block mb-1.5">Detected Framework</label>
                      <p className="text-lg font-bold text-foreground">{data.metadata?.framework || 'Monolith'}</p>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-widest text-muted block mb-1.5">Project ID</label>
                      <p className="font-mono text-xs text-muted truncate">{data.project_id}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-8 h-[600px]">
                <FileTree tree={data.file_tree} />
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
