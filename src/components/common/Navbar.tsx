'use client';

import React from 'react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { LoginButton } from '@/features/auth';

export const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md shadow-sm dark:shadow-white/5">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-semibold tracking-tight text-sm uppercase">Migration Platform</span>
        </div>
        <div className="flex items-center gap-6">
          <ThemeToggle />
          <LoginButton />
        </div>
      </div>
    </nav>
  );
};
