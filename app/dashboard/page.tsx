"use client";

import React, { useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { useIngestion, IngestHero, Workbench } from '@/features/ingestion';
import { Navbar } from '@/components/common/Navbar';
import { useAuth } from '@/features/auth';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const { data, loading, error, startIngestion } = useIngestion();
  const { processCallback } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();
  const autoStarted = useRef(false);

  useEffect(() => {
    // Automatic Memory Trace: If we are logged in and have a target, start ingestion
    const hasToken = localStorage.getItem('auth_token');
    const targetRepo = localStorage.getItem('target_repo');
    
    if (hasToken && targetRepo && !autoStarted.current) {
      autoStarted.current = true;
      startIngestion(targetRepo);
      localStorage.removeItem('target_repo');
    }

    // 2. Handle Direct Link Analysis
    const urlParam = searchParams.get('url');
    if (urlParam && !autoStarted.current) {
      autoStarted.current = true;
      startIngestion(urlParam);
    }
  }, [searchParams, startIngestion, processCallback]);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-foreground selection:bg-primary/10">
      <Navbar />

      <main className="max-w-[1600px] mx-auto px-6 py-12">
        {!data ? (
          <IngestHero 
            onAnalyze={startIngestion} 
            loading={loading} 
            error={error} 
          />
        ) : (
          <Workbench data={data} />
        )}
      </main>
    </div>
  );
}
