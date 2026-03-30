'use client';

import React from 'react';
import { RepoInput, FileTree, useIngestion } from '@/features/ingestion';
import { Navbar } from '@/components/common/Navbar';

export default function DashboardPage() {
  const { data, loading, error, startIngestion } = useIngestion();

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/10">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Input & Info */}
          <div className="lg:col-span-12 space-y-12">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <h1>Code Migration Workspace</h1>
              <p className="max-w-xl mx-auto leading-relaxed">
                Analyze, architect, and transform. Your migration command center.
              </p>
            </div>

            <RepoInput onAnalyze={startIngestion} loading={loading} />

            {error && (
              <div className="max-w-4xl mx-auto p-4 rounded-sm bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-medium text-center">
                {error}
              </div>
            )}
          </div>

          {/* Results Section */}
          {data && (
            <>
              <div className="lg:col-span-4 space-y-6">
                <div className="p-8 bg-background border border-border rounded-2xl shadow-sm">
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-muted mb-6">Project Metadata</h3>
                  <div className="space-y-6">
                    <div>
                      <label className="text-[10px] font-semibold uppercase tracking-widest text-muted block mb-1.5">Primary Language</label>
                      <p className="text-lg font-semibold text-foreground">{data.metadata?.language || 'Unknown'}</p>
                    </div>
                    <div>
                      <label className="text-[10px] font-semibold uppercase tracking-widest text-muted block mb-1.5">Detected Framework</label>
                      <p className="text-lg font-semibold text-foreground">{data.metadata?.framework || 'Monolith'}</p>
                    </div>
                    <div>
                      <label className="text-[10px] font-semibold uppercase tracking-widest text-muted block mb-1.5">Project ID</label>
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
