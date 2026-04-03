"use client";

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // EMERGENCY INTERCEPTION: Redirect any stray /dashboard hits back to Home (/) 
    // while preserving all query parameters (token, code, user, etc.)
    const params = searchParams.toString();
    router.replace(`/${params ? '?' + params : ''}`);
  }, [router, searchParams]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-zinc-950 border-t-amber-400 rounded-full animate-spin" />
        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-950">Redirecting to Intelligence Hub...</p>
      </div>
    </div>
  );
}
