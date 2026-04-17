import React from 'react';
import { Database, Folder, GitBranch, ShieldCheck } from 'lucide-react';
import { SectionHeading, StructuredData, SafeText } from './CommonElements';

type CodeLayerBackendEntry = {
  file_name?: string;
  type?: string;
  imports?: string[];
  libraries?: string[];
  purpose?: string;
};

type SharedDependency = {
  file_name?: string;
  component?: string;
  type?: string;
  used_in?: string[];
};

export const CodeLayerHero: React.FC<{ data: StructuredData }> = ({ data }) => {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <section className="bg-zinc-950 p-8 rounded-sm text-white overflow-hidden relative shadow-[8px_8px_0px_0px_rgba(251,191,36,0.1)]">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400 opacity-5 -mr-32 -mt-32 rounded-full blur-[80px]" />
        <div className="relative z-10 grid grid-cols-1 gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-5 w-1 bg-amber-400" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-amber-400">
                Code Layer Intelligence
              </span>
            </div>
            <p className="text-[14px] font-medium leading-relaxed italic text-zinc-300">
              “<SafeText text={data.summary || 'Analyzing architectural tiers and shared dependencies across backend services.'} />”
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white bg-opacity-5 border border-zinc-800 p-5 rounded-sm">
              <span className="text-[12px] font-semibold uppercase tracking-[0.35em] text-zinc-800">Backend Files</span>
              <p className="mt-3 text-sm text-zinc-800 leading-relaxed">{data.backend?.length ?? 0} backend components detected.</p>
            </div>
            <div className="bg-white bg-opacity-5 border border-zinc-800 p-5 rounded-sm">
              <span className="text-[12px] font-semibold uppercase tracking-[0.35em] text-zinc-800">Shared Dependencies</span>
              <p className="mt-3 text-sm text-zinc-800 leading-relaxed">{data.shared_dependencies?.length ?? 0} shared dependency records.</p>
            </div>
          </div>
        </div>
      </section>

      {data.backend && data.backend.length > 0 ? (
        <section>
          <SectionHeading icon={<Folder size={14} strokeWidth={3} />} title="Backend Layer Map" />
          <div className="grid grid-cols-1 gap-6">
            {data.backend.map((entry: CodeLayerBackendEntry, index: number) => (
              <div key={index} className="border-2 border-zinc-950 rounded-sm bg-white p-6 shadow-[6px_6px_0px_0px_rgba(9,9,11,1)] hover:shadow-none transition-all">
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div>
                    <h4 className="text-[13px] font-semibold uppercase tracking-[0.2em] text-zinc-950">{entry.file_name || 'Unknown file'}</h4>
                    <p className="text-[12px] uppercase tracking-[0.25em] text-zinc-500 font-bold">{entry.type || 'component'}</p>
                  </div>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.35em] px-2 py-1 bg-zinc-950 text-white rounded-sm">{entry.libraries?.length ?? 0} libs</span>
                </div>
                <p className="text-[11px] text-zinc-600 leading-relaxed mb-4">{entry.purpose || 'No purpose description available.'}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-zinc-50 border border-zinc-200 rounded-sm p-4">
                    <div className="flex items-center gap-2 mb-2 text-[12px] uppercase tracking-[0.3em] text-zinc-500 font-bold">
                      <GitBranch size={12} /> Imports
                    </div>
                    {Array.isArray(entry.imports) && entry.imports.length > 0 ? (
                      <ul className="text-[12px] font-medium text-zinc-700 space-y-2">
                        {entry.imports.map((imp: string, impIndex: number) => (
                          <li key={impIndex}>{imp}</li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-[12px] text-zinc-400">No imports detected.</span>
                    )}
                  </div>
                  <div className="bg-zinc-50 border border-zinc-200 rounded-sm p-4">
                    <div className="flex items-center gap-2 mb-2 text-[12px] uppercase tracking-[0.3em] text-zinc-500 font-bold">
                      <ShieldCheck size={12} /> Libraries
                    </div>
                    {Array.isArray(entry.libraries) && entry.libraries.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {entry.libraries.map((lib: string, libIndex: number) => (
                          <span key={libIndex} className="px-2 py-1 bg-amber-50 text-amber-700 text-[12px] font-semibold uppercase tracking-tight rounded-sm border border-amber-100">
                            {lib}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-[12px] text-zinc-400">No libraries detected.</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : (
        <section className="bg-white border-2 border-zinc-950 rounded-sm p-6 shadow-[6px_6px_0px_0px_rgba(9,9,11,1)]">
          <p className="text-sm text-zinc-500 uppercase tracking-[0.25em]">No backend layer details were found in this report.</p>
        </section>
      )}

      {data.shared_dependencies && data.shared_dependencies.length > 0 && (
        <section>
          <SectionHeading icon={<Database size={14} strokeWidth={3} />} title="Shared Dependencies" />
          <div className="grid grid-cols-1 gap-4">
            {data.shared_dependencies.map((dep: SharedDependency, index: number) => (
              <div key={index} className="border-2 border-zinc-950 rounded-sm bg-white p-5 shadow-[6px_6px_0px_0px_rgba(9,9,11,1)]">
                <div className="flex items-center justify-between gap-4 mb-3">
                  <div>
                    <h4 className="text-[12px] font-semibold uppercase tracking-[0.2em] text-zinc-950">{dep.file_name || dep.component || 'Shared file'}</h4>
                    <p className="text-[12px] uppercase tracking-[0.25em] text-zinc-500">{dep.type || 'dependency record'}</p>
                  </div>
                  <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-zinc-500">Used in {dep.used_in?.length || 0} places</span>
                </div>
                {Array.isArray(dep.used_in) && dep.used_in.length > 0 ? (
                  <div className="text-[12px] text-zinc-600 space-y-2">
                    {dep.used_in.map((reuse: string, reuseIndex: number) => (
                      <div key={reuseIndex} className="flex items-center gap-2">
                        <span className="block h-1 w-1 rounded-full bg-amber-500" />
                        <span>{reuse}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-[12px] text-zinc-400">No usage locations provided.</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
