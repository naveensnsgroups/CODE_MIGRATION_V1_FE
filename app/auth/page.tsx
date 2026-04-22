'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Zap, Mail, Lock, User as UserIcon, ArrowRight } from 'lucide-react';
import { useAuth } from '@/features/auth/hooks/UseAuth';
import { getLoginUrl } from '@/features/auth/api/GithubAuth';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [mode, setMode] = useState<'enterprise' | 'standalone'>('enterprise');
  const [formData, setFormData] = useState({ email: '', password: '', full_name: '' });
  const router = useRouter();
  const { login, signup, loading, error: authError } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await login({ ...formData, selected_mode: mode });
      } else {
        await signup({ ...formData, default_mode: mode });
      }
      router.push('/');
    } catch (_) {}
  };

  const handleGithubLogin = async () => {
    window.location.href = await getLoginUrl();
  };

  return (
    <div className="h-screen bg-white flex items-center justify-center overflow-hidden">
      <div className="w-full max-w-[440px] px-4">

        {/* Brand Header — compact */}
        <div className="text-center mb-5">
          <h1 className="text-3xl font-black uppercase italic tracking-tighter text-zinc-950 leading-none">
            MIGRATION <span className="text-amber-500">PORTAL</span>
          </h1>
        </div>

        {/* Main Card */}
        <div className="bg-white border-4 border-zinc-950 rounded-sm shadow-[8px_8px_0px_0px_rgba(9,9,11,1)] overflow-hidden">

          {/* Tabs */}
          <div className="flex border-b-4 border-zinc-950">
            {[{ label: 'Login', value: true }, { label: 'Sign Up', value: false }].map(({ label, value }) => (
              <button
                key={label}
                onClick={() => setIsLogin(value)}
                className={`flex-1 py-3.5 text-[10px] font-black uppercase tracking-widest transition-colors ${
                  isLogin === value ? 'bg-amber-400 text-zinc-950' : 'bg-white text-zinc-400 hover:text-zinc-600'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="p-6 space-y-4">

            {/* Mode Selector */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[12px] font-black uppercase tracking-widest text-zinc-950">Migration Level</span>
                <span className="text-[8px] font-bold text-zinc-400 uppercase tracking-widest">Required</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {([
                  { val: 'enterprise', icon: ShieldCheck, label: 'Enterprise' },
                  { val: 'standalone', icon: Zap, label: 'Standalone' },
                ] as const).map(({ val, icon: Icon, label }) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setMode(val)}
                    className={`py-2.5 border-2 rounded-sm flex items-center justify-center gap-1.5 text-[12px] font-black uppercase tracking-widest transition-all ${
                      mode === val
                        ? 'bg-zinc-950 text-white border-zinc-950 shadow-[3px_3px_0px_0px_rgba(251,191,36,1)]'
                        : 'bg-white text-zinc-300 border-zinc-100 hover:border-zinc-300'
                    }`}
                  >
                    <Icon size={11} className={mode === val ? 'text-amber-400' : ''} />
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              {!isLogin && (
                <div>
                  <label className="text-[12px] font-black uppercase tracking-widest text-zinc-500 flex items-center gap-1.5 mb-1">
                    <UserIcon size={10} /> Full Name
                  </label>
                  <input
                    type="text" name="full_name" required
                    value={formData.full_name} onChange={handleInputChange}
                    className="w-full bg-zinc-50 border-2 border-zinc-200 rounded-sm px-3 py-2.5 text-[12px] font-bold focus:border-zinc-950 outline-none transition-all placeholder:text-zinc-400"
                    placeholder="Operator Name"
                  />
                </div>
              )}

              <div>
                <label className="text-[12px] font-black uppercase tracking-widest text-zinc-500 flex items-center gap-1.5 mb-1">
                  <Mail size={10} /> Email
                </label>
                <input
                  type="email" name="email" required
                  value={formData.email} onChange={handleInputChange}
                  className="w-full bg-zinc-50 border-2 border-zinc-200 rounded-sm px-3 py-2.5 text-[12px] font-bold focus:border-zinc-950 outline-none transition-all placeholder:text-zinc-400"
                  placeholder="accs@sector7.gov"
                />
              </div>

              <div>
                <label className="text-[12px] font-black uppercase tracking-widest text-zinc-500 flex items-center gap-1.5 mb-1">
                  <Lock size={10} /> Password
                </label>
                <input
                  type="password" name="password" required
                  value={formData.password} onChange={handleInputChange}
                  className="w-full bg-zinc-50 border-2 border-zinc-200 rounded-sm px-3 py-2.5 text-[12px] font-bold focus:border-zinc-950 outline-none transition-all placeholder:text-zinc-400"
                  placeholder="••••••••"
                />
              </div>

              {authError && (
                <div className="p-2.5 bg-red-50 border-2 border-red-200 text-red-500 text-[12px] font-black uppercase tracking-widest rounded-sm">
                  ⚠ {authError}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-zinc-950 text-white text-[10px] font-black uppercase tracking-[0.25em] rounded-sm flex items-center justify-center gap-2 hover:bg-zinc-800 active:scale-[0.99] transition-all disabled:opacity-60"
              >
                {loading ? 'Processing...' : (isLogin ? 'Login' : 'Create Account')}
                {!loading && <ArrowRight size={13} />}
              </button>
            </form>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t-2 border-zinc-100" /></div>
              <div className="relative flex justify-center">
                <span className="bg-white px-3 text-[8px] font-bold text-zinc-300 uppercase tracking-widest">or</span>
              </div>
            </div>

            {/* GitHub */}
            <button
              onClick={handleGithubLogin}
              className="w-full py-2.5 border-2 border-zinc-950 rounded-sm flex items-center justify-center gap-2.5 text-[10px] font-black uppercase tracking-[0.15em] hover:bg-zinc-50 transition-all shadow-[4px_4px_0px_0px_rgba(9,9,11,1)] active:shadow-none active:translate-y-[2px]"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              Continue with GitHub
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
