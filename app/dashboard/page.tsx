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
    // Handle GitHub Code Callback
    const code = searchParams.get('code');
    if (code && !autoStarted.current) {
      autoStarted.current = true;
      processCallback(code).then(() => {
        // Clean the URL without refreshing
        const newUrl = window.location.pathname;
        window.history.replaceState({}, '', newUrl);
      });
    }

    // Handle Direct Analysis URL Ingestion
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
