import React from 'react';
import { Button } from './Button';
import { useAuth } from '@/features/auth';

export const Navbar = () => {
  const { user, handleLogout } = useAuth();

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-zinc-100 shadow-xl shadow-zinc-100/80">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-semibold italic uppercase tracking-[0.3em] text-[14px]">Migration Platform</span>
        </div>

        <div className="flex items-center gap-6">
          {user ? (
            <div className="flex items-center gap-4 animate-in fade-in slide-in-from-right-4">
              <div className="flex items-center gap-3 px-3 py-1 bg-zinc-50 border border-zinc-100 rounded-sm">
                <img src={user.avatar_url} alt="Avatar" className="w-7 h-7 rounded-sm border border-zinc-200 shadow-sm" />
                <span className="text-[10px] font-medium uppercase text-zinc-900 italic tracking-widest">{user.login}</span>
              </div>
              <Button
                onClick={handleLogout}
                variant="primary"
                className="scale-75 origin-right px-6 py-2"
              >
                Disconnect
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </nav>
  );
};
