'use client';

import { useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/features/auth/hooks/UseAuth';

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { processCallback, error } = useAuth();
  const processed = useRef(false);

  useEffect(() => {
    const code = searchParams.get('code');
    if (code && !processed.current) {
      processed.current = true;
      processCallback(code).then(() => {
        router.push('/');
      });
    }
  }, [searchParams, processCallback, router]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-black">
        <div className="p-8 bg-white dark:bg-zinc-900 border border-red-200 dark:border-red-900/30 rounded-2xl shadow-sm text-center">
          <p className="text-red-600 dark:text-red-400 font-bold mb-4">Authentication Error</p>
          <p className="text-zinc-500 text-sm mb-6">{error}</p>
          <button onClick={() => router.push('/')} className="text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-zinc-900">
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-black">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-zinc-200 dark:border-zinc-800 border-t-zinc-900 dark:border-t-white rounded-full animate-spin" />
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">Authenticating</p>
      </div>
    </div>
  );
}
