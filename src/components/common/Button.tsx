'use client';

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'amber' | 'blue' | 'outline';
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  loading = false,
  className = '',
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-sm px-8 py-4 text-[11px] font-black uppercase tracking-widest transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl relative overflow-hidden group";
  
  const variants = {
    primary: "bg-zinc-950 text-white hover:bg-black shadow-zinc-200/50",
    amber: "bg-[#facc15] text-zinc-950 hover:bg-[#eab308] shadow-yellow-200/40",
    blue: "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-200/40",
    outline: "bg-transparent border-2 border-zinc-200 text-zinc-900 hover:border-zinc-300 hover:bg-zinc-50 shadow-none",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {/* Titanium Inner Glow */}
      <span className="absolute inset-0 bg-gradient-to-tr from-white/0 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      
      {loading ? (
        <span className="flex items-center gap-3 relative z-10">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Engaging...
        </span>
      ) : (
        <span className="relative z-10">{children}</span>
      )}
    </button>
  );
};
