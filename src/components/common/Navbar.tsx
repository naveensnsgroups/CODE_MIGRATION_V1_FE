'use client';

import React, { useEffect, useState } from 'react';
import { Button } from './Button';

export const Navbar = () => {
  const [user, setUser] = useState<{ login: string; avatar: string } | null>(null);

  useEffect(() => {
    // Run ONCE on mount — [] dependency is the key fix.
    // Previously [user] caused re-runs every time setUser() fired → multiple 307s.
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const login = params.get('user');
    const avatar = params.get('avatar');

    if (token && login && avatar) {
      localStorage.setItem('auth_token', token);
      localStorage.setItem('auth_user', JSON.stringify({ login, avatar }));
      window.history.replaceState({}, document.title, window.location.pathname);
      setUser({ login, avatar });
    } else {
      const cachedUser = localStorage.getItem('auth_user');
      if (cachedUser) {
        setUser(JSON.parse(cachedUser));
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    setUser(null);
    window.location.href = "/";
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-zinc-100 shadow-xl shadow-zinc-100/80">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-bold italic uppercase tracking-[0.3em] text-[10px] text-zinc-950">Migration Platform</span>
        </div>
        
        <div className="flex items-center gap-6">
          {user ? (
            <div className="flex items-center gap-4 animate-in fade-in slide-in-from-right-4">
               <div className="flex items-center gap-3 px-3 py-1 bg-zinc-50 border border-zinc-100 rounded-sm">
                  <img src={user.avatar} alt="Avatar" className="w-6 h-6 rounded-sm border border-zinc-200 shadow-sm" />
                  <span className="text-[10px] font-black uppercase text-zinc-900 italic tracking-widest">{user.login}</span>
               </div>
               <Button 
                onClick={handleLogout}
                variant="primary"
                className="scale-75 origin-right px-6 py-2"
               >
                 Disconnect
               </Button>
            </div>
          ) : (
             <Button 
              onClick={() => window.location.href = "http://localhost:8000/api/auth/login"}
              variant="amber"
              className="scale-75 origin-right"
             >
               Connect GitHub
             </Button>
          )}
        </div>
      </div>
    </nav>
  );
};
