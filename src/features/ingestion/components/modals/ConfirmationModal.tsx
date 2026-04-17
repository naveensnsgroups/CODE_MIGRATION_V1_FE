import React from 'react';
import { AlertTriangle, X, Zap } from 'lucide-react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  actionLabel?: string;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  actionLabel = "Re-Analyze & Overwrite"
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-zinc-950/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white border-4 border-zinc-950 w-full max-w-md shadow-[12px_12px_0px_0px_rgba(9,9,11,1)] overflow-hidden animate-in zoom-in-95 duration-300">

        {/* Header */}
        <div className="bg-amber-400 border-b-4 border-zinc-950 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-zinc-950" strokeWidth={3} />
            <h3 className="text-sm font-medium uppercase tracking-tighter text-zinc-950">{title}</h3>
          </div>
          <button onClick={onClose} className="hover:rotate-90 transition-transform">
            <X className="w-5 h-5 text-zinc-950" strokeWidth={3} />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 space-y-6">
          <p className="text-xs font-bold text-zinc-600 leading-relaxed italic pr-4">
            &quot;{message}&quot;
          </p>

          <div className="flex items-start gap-4 p-4 bg-zinc-50 border-2 border-zinc-950 rounded-sm">
            <Zap className="w-5 h-5 text-amber-500 flex-shrink-0" fill="currentColor" />
            <p className="text-[12px] font-bold text-zinc-400 uppercase tracking-widest leading-normal">
              Warning: Re-running will consume new AI context tokens and replace the previous extraction.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t-4 border-zinc-950 p-6 grid grid-cols-2 gap-4 bg-zinc-50">
          <button
            onClick={onClose}
            className="px-6 py-3 border-2 border-zinc-950 text-[12px] font-bold uppercase tracking-widest hover:bg-zinc-200 transition-colors bg-white shadow-[4px_4px_0px_0px_rgba(9,9,11,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
          >
            Keep Stored
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-3 bg-zinc-950 text-white text-[12px] font-bold uppercase tracking-widest hover:bg-amber-400 hover:text-zinc-950 transition-all shadow-[4px_4px_0px_0px_rgba(251,191,36,0.3)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
          >
            {actionLabel}
          </button>
        </div>

      </div>
    </div>
  );
};
