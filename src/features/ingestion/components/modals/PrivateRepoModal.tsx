import React, { useState, useEffect } from 'react';
import { Button } from '@/components/common/Button';
import { Lock, Mail, X, Loader2, CheckCircle, User, AlertCircle } from 'lucide-react';

interface PrivateRepoModalProps {
  isOpen: boolean;
  onClose: () => void;
  repoUrl: string;
}

const GithubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export const PrivateRepoModal = ({ isOpen, onClose, repoUrl }: PrivateRepoModalProps) => {
  const [loading, setLoading] = useState(false);
  const [resolving, setResolving] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ownerData, setOwnerData] = useState<{ username: string, email: string | null } | null>(null);
  const [manualEmail, setManualEmail] = useState('');

  // 🔍 Surgical Owner Resolution on Open
  useEffect(() => {
    if (isOpen && repoUrl) {
      resolveOwner();
    }
  }, [isOpen, repoUrl]);

  const resolveOwner = async () => {
    setResolving(true);
    try {
      const response = await fetch('http://localhost:8000/api/ingest/resolve-owner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ repo_url: repoUrl })
      });
      if (response.ok) {
        const data = await response.json();
        setOwnerData({
          username: data.owner_username,
          email: data.owner_email
        });
      }
    } catch (err) {
      console.error("[Owner Resolution] Failed:", err);
    } finally {
      setResolving(false);
    }
  };

  if (!isOpen) return null;

  const handleRequestAccess = async () => {
    const targetEmail = ownerData?.email || manualEmail;
    if (!targetEmail) {
      setError("Target email is required.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:8000/api/ingest/request-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          repo_url: repoUrl,
          owner_email: targetEmail,
          request_user: "Anonymous Developer"
        })
      });

      if (!response.ok) throw new Error("Failed to send request.");
      setSent(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleConnect = () => {
    window.location.href = 'http://localhost:8000/api/auth/login';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-zinc-950/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="w-full max-w-lg max-h-[90vh] bg-white border-4 border-zinc-950 shadow-[8px_8px_0px_0px_rgba(9,9,11,1)] sm:shadow-[12px_12px_0px_0px_rgba(9,9,11,1)] flex flex-col overflow-hidden">
        {/* Industrial Header - Fixed */}
        <div className="bg-zinc-950 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between border-b-4 border-zinc-950 shrink-0">
          <div className="flex items-center gap-3">
            <Lock className="text-amber-400" size={18} />
            <span className="text-[12px] font-medium uppercase tracking-[0.3em] text-white italic">Access Restricted</span>
          </div>
          <button
            onClick={onClose}
            title="Close Access Information"
            className="text-zinc-500 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Content Hub */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-8 custom-scrollbar">
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-medium uppercase tracking-tighter italic text-zinc-950 leading-tight">Private Repository Detected</h2>
            <p className="text-[12px] sm:text-[11px] font-medium text-zinc-500 uppercase leading-relaxed tracking-wider">
              The repository <span className="text-zinc-950 font-semibold px-1 bg-zinc-50 border border-zinc-100">{repoUrl.split('/').pop()}</span> is restricted.
              You must either have permission or be authenticated to analyze its contents.
            </p>
          </div>

          {!sent ? (
            <div className="grid grid-cols-1 gap-6">
              {/* Option A: Connect */}
              <div className="p-4 sm:p-6 border-2 border-zinc-100 rounded-sm bg-zinc-50/50 hover:border-amber-400 transition-colors group">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="p-2 bg-white border-2 border-zinc-200 rounded-sm shadow-[3px_3px_0px_0px_rgba(39,201,63,1)] w-fit">
                    <GithubIcon />
                  </div>
                  <Button
                    onClick={handleConnect}
                    variant="primary"
                    title="Connect your GitHub account"
                    className="w-full sm:w-auto h-10 px-6 text-[12px] uppercase tracking-widest font-medium"
                  >
                    Connect GitHub
                  </Button>
                </div>
                <p className="hidden sm:block text-[12px] font-semibold text-zinc-500 uppercase tracking-widest mt-4">Connect your own account to check for authorized access automatically.</p>
              </div>

              {/* Option B: Request */}
              <div className="p-4 sm:p-6 border-2 border-zinc-950 rounded-sm bg-zinc-50/50 shadow-[6px_6px_0px_0px_rgba(251,191,36,0.1)] transition-all">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-zinc-950 rounded-sm">
                    <Mail size={16} className="text-amber-400" />
                  </div>
                  <h3 className="text-[12px] sm:text-[11px] font-medium uppercase tracking-widest text-zinc-950">Automated Intelligence Outreach</h3>
                </div>

                {resolving ? (
                  <div className="flex items-center gap-3 py-4">
                    <Loader2 size={16} className="animate-spin text-amber-500" />
                    <span className="text-[12px] font-semibold uppercase tracking-widest text-zinc-400 italic">Resolving Repository Owner...</span>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {ownerData ? (
                      <div className="flex items-center gap-3 p-3 bg-white border-2 border-zinc-100 rounded-sm">
                        <div className="w-8 h-8 bg-zinc-50 border border-zinc-200 rounded-full flex items-center justify-center shrink-0">
                          <User size={14} className="text-zinc-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[11px] sm:text-[12px] font-semibold text-zinc-500 uppercase tracking-widest">Found Owner</p>
                          <p className="text-[11px] sm:text-[12px] font-medium text-zinc-950 truncate">@{ownerData.username}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3 p-3 bg-red-50 border border-red-100 rounded-sm text-red-500">
                        <AlertCircle size={14} />
                        <span className="text-[11px] font-bold uppercase tracking-widest">Could not identify owner automatically</span>
                      </div>
                    )}

                    {ownerData?.email ? (
                      <div className="p-3 bg-amber-50/50 border border-amber-100 rounded-sm">
                        <p className="text-[12px] font-semibold text-amber-600 uppercase tracking-widest mb-1 italic px-1">Target email identified</p>
                        <p className="text-[11px] sm:text-[12px] font-medium text-zinc-600 truncate">{ownerData.email}</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <p className="text-[11px] sm:text-[12px] font-semibold text-zinc-500 uppercase tracking-widest italic px-1 leading-relaxed">Owner email is private. Please enter manually:</p>
                        <input
                          type="email"
                          placeholder="owner-contact@example.com"
                          value={manualEmail}
                          onChange={(e) => setManualEmail(e.target.value)}
                          className="w-full bg-white border-2 border-zinc-200 rounded-sm px-4 py-3 text-[11px] sm:text-[12px] font-medium placeholder:text-zinc-500 outline-none focus:border-zinc-950 transition-all"
                        />
                      </div>
                    )}

                    <Button
                      onClick={handleRequestAccess}
                      disabled={!ownerData?.email && !manualEmail}
                      loading={loading}
                      variant="amber"
                      title="Request access via IHUB Mailer"
                      className="w-full h-12 text-[12px] uppercase tracking-widest font-black"
                    >
                      Send Request to {ownerData?.email || manualEmail || '...'}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-10 space-y-4 animate-in zoom-in-95">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center border-2 border-green-200 text-green-500">
                <CheckCircle size={32} />
              </div>
              <div className="text-center">
                <p className="text-[12px] font-medium uppercase tracking-widest text-zinc-950">Request Transmitted</p>
                <p className="text-[12px] font-semibold text-zinc-500 uppercase mt-1">Repository owner has been notified via IHUB Mailer.</p>
              </div>
              <Button onClick={onClose} variant="primary" className="mt-4 px-10">Return to Hub</Button>
            </div>
          )}

          {error && (
            <div className="p-3 bg-red-50 border border-red-100 text-red-500 text-[12px] font-semibold uppercase tracking-widest text-center animate-shake">
              {error}
            </div>
          )}
        </div>

        {/* Action Panel Footer - Fixed */}
        <div className="bg-zinc-50 px-4 sm:px-6 py-4 border-t-2 border-zinc-100 flex justify-between items-center shrink-0">
          <span className="text-[11px] font-medium text-zinc-600 uppercase tracking-[0.3em] italic">Code Migration Intelligence 1.0</span>
          <div className="flex gap-2">
            <div className="w-2 h-2 rounded-full bg-zinc-200" />
            <div className="w-2 h-2 rounded-full bg-zinc-200" />
            <div className="w-2 h-2 rounded-full bg-zinc-950" />
          </div>
        </div>
      </div>
    </div>
  );
};
