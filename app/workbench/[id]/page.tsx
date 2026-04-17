'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Navbar } from '@/components/common/Navbar';
import { Workbench } from '@/features/ingestion';
import { Loader2, AlertTriangle, ArrowLeft } from 'lucide-react';
import apiClient from '@/api/Client';

export default function WorkbenchPage() {
  const { id } = useParams();
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchProject = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get(`ingest/${id}`);
        if (response.data) {
          setData(response.data);
        }
      } catch (err: any) {
        console.error('Failed to fetch project:', err);
        setError(err.response?.data?.detail || 'Project intelligence scan failed or project not found.');
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col font-sans">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          <Loader2 className="w-12 h-12 text-amber-500 animate-spin" strokeWidth={1} />
          <p className="text-[12px] font-medium uppercase tracking-[0.3em] text-zinc-400 animate-pulse">Synchronizing Intelligence...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex flex-col font-sans">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center gap-6 px-6 text-center">
          <div className="w-16 h-16 bg-red-50 border-2 border-red-200 rounded-sm flex items-center justify-center text-red-500">
            <AlertTriangle size={32} />
          </div>
          <div className="space-y-2">
            <h1 className="text-xl font-medium uppercase tracking-tighter text-zinc-950 italic">Project Not Found</h1>
            <p className="text-[12px] font-medium uppercase tracking-widest text-zinc-500 max-w-md mx-auto leading-relaxed">{error}</p>
          </div>
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-2 px-6 py-3 bg-zinc-950 text-white text-[12px] font-medium uppercase tracking-widest rounded-sm hover:bg-zinc-800 transition-all group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Back to Command Center
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Navbar />
      <div className="flex-1 animate-in fade-in duration-700">
        <Workbench data={data} />
      </div>
    </div>
  );
}
