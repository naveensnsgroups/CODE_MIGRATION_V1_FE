import React, { useState } from 'react';
import { X, Server, Layers, Globe, Check, Sparkles, ChevronRight } from 'lucide-react';

interface MigrationWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (settings: { backend: string; framework: string; frontend?: string; frontendEnabled: boolean }) => void;
}

export const MigrationWizard: React.FC<MigrationWizardProps> = ({ isOpen, onClose, onConfirm }) => {
  const [backend, setBackend] = useState('Python');
  const [framework, setFramework] = useState('FastAPI');
  const [includeFrontend, setIncludeFrontend] = useState(true);
  const [frontend, setFrontend] = useState('React/Vite');

  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm({
      backend,
      framework,
      frontend: includeFrontend ? frontend : undefined,
      frontendEnabled: includeFrontend
    });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="w-full max-w-xl bg-white border-4 border-zinc-950 shadow-[12px_12px_0px_0px_rgba(9,9,11,1)] rounded-sm overflow-hidden flex flex-col translate-y-0 animate-in slide-in-from-bottom-8 duration-500">
        {/* ── Header ── */}
        <div className="bg-zinc-950 px-8 py-6 flex items-center justify-between border-b-2 border-zinc-950">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-sm bg-amber-400 text-zinc-950 flex items-center justify-center border-2 border-zinc-950 shadow-[3px_3px_0px_0px_rgba(255,255,255,1)]">
              <Layers size={18} strokeWidth={3} />
            </div>
            <div>
              <h2 className="text-sm font-medium uppercase tracking-widest text-white italic">Surgical Migration Wizard</h2>
              <p className="text-[12px] font-semibold text-amber-400/80 uppercase tracking-tight">Select Target Paradigm </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white transition-colors"
            title="Close Wizard"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-8 space-y-8 flex-1 overflow-y-auto max-h-[70vh]">
          {/* ── Backend Section ── */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 border-b-4 border-zinc-100 pb-2">
              <Server size={14} className="text-zinc-400" />
              <h3 className="text-[11px] font-medium uppercase tracking-widest text-zinc-950 italic">Target Backend Layer</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[11px] font-semibold uppercase text-zinc-500">Language</label>
                <select
                  value={backend}
                  title="Select Backend Language"
                  onChange={(e) => {
                    const val = e.target.value;
                    setBackend(val);
                    if (val === 'Python') setFramework('FastAPI');
                    if (val === 'Node.js') setFramework('Express');
                    if (val === 'Go') setFramework('Standard Library');
                  }}
                  className="w-full h-12 bg-zinc-50 border-2 border-zinc-950 px-4 text-xs font-semibold uppercase tracking-tight focus:bg-amber-50 focus:outline-none transition-colors"
                >
                  <option>Python</option>
                  <option>Node.js</option>
                  <option>Go</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-semibold uppercase text-zinc-500">Framework</label>
                <select
                  value={framework}
                  title="Select Backend Framework"
                  onChange={(e) => setFramework(e.target.value)}
                  className="w-full h-12 bg-zinc-50 border-2 border-zinc-950 px-4 text-xs font-semibold uppercase tracking-tight focus:bg-amber-50 focus:outline-none transition-colors"
                >
                  {backend === 'Python' ? (
                    <>
                      <option>FastAPI</option>
                      <option>Django</option>
                      <option>Flask</option>
                    </>
                  ) : backend === 'Node.js' ? (
                    <>
                      <option>Express</option>
                      <option>NestJS</option>
                      <option>Next.js Backend</option>
                    </>
                  ) : (
                    <option>Standard Library</option>
                  )}
                </select>
              </div>
            </div>
          </section>

          {/* ── Frontend Section ── */}
          <section className="space-y-4">
            <div className="flex items-center justify-between border-b-4 border-zinc-100 pb-2">
              <div className="flex items-center gap-2">
                <Globe size={14} className="text-zinc-400" />
                <h3 className="text-[11px] font-medium uppercase tracking-widest text-zinc-950 italic">UI Modernization</h3>
              </div>
              <button
                onClick={() => setIncludeFrontend(!includeFrontend)}
                title={includeFrontend ? "Disable Frontend Modernization" : "Enable Frontend Modernization"}
                className={`flex items-center gap-2 px-3 py-1 rounded-sm border-2 border-zinc-950 text-[12px] font-medium uppercase transition-all ${includeFrontend ? 'bg-emerald-500 text-white shadow-[2px_2px_0px_0px_rgba(9,9,11,1)]' : 'bg-zinc-100 text-zinc-400'}`}
              >
                {includeFrontend ? <><Check size={12} strokeWidth={4} /> Enabled</> : 'Disabled'}
              </button>
            </div>
            {includeFrontend && (
              <div className="animate-in slide-in-from-top-4 duration-300">
                <span className="text-[11px] font-semibold uppercase text-zinc-500 mb-2 block">Frontend Stack</span>
                <div className="grid grid-cols-3 gap-3" role="radiogroup" aria-label="Frontend Stack Selection">
                  {['React/Vite', 'Next.js', 'Vue 3'].map(opt => (
                    <button
                      key={opt}
                      role="radio"
                      aria-checked={frontend === opt ? "true" : "false"}
                      onClick={() => setFrontend(opt)}
                      className={`h-12 border-2 border-zinc-950 text-[12px] font-medium uppercase tracking-tighter transition-all ${frontend === opt ? 'bg-amber-400 text-zinc-950 shadow-[4px_4px_0px_0px_rgba(9,9,11,1)] -translate-x-1 -translate-y-1' : 'bg-white text-zinc-400 hover:bg-zinc-50'}`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </section>
        </div>

        {/* ── Footer ── */}
        <div className="bg-zinc-50 p-8 border-t-4 border-zinc-950 flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={onClose}
              className="flex-1 h-16 bg-white border-2 border-zinc-950 text-xs font-medium uppercase tracking-widest hover:bg-zinc-100 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className="flex-[2] h-16 bg-zinc-950 text-white text-xs font-medium uppercase tracking-widest shadow-[6px_6px_0px_0px_rgba(251,191,36,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex items-center justify-center gap-3"
            >
              Initiate Extraction <ChevronRight size={18} strokeWidth={3} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
