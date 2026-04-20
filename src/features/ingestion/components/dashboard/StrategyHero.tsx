import React, { useState } from 'react';
import {
   Rocket,
   Map,
   Flag,
   CheckCircle2,
   ArrowRight,
   Cpu,
   ShieldCheck,
   Zap,
   Code,
   Terminal,
   FileCode,
   Copy,
   Download,
   ChevronRight,
   Package,
   Server
} from 'lucide-react';
import { StructuredData, SectionHeading, SafeText } from './CommonElements';

export const StrategyHero: React.FC<{ data: StructuredData }> = ({ data }) => {
   const [activeFile, setActiveFile] = useState<number | null>(0);
   const [copied, setCopied] = useState<string | null>(null);

   //  Technical Data Extraction (v28.2 Migration Schema)
   const files = data.files || [];
   const targetStack = data.target_stack || { backend: 'Python', framework: 'FastAPI', runtime: '3.10+' };
   const envCleanup = data.environment_setup || { steps: [], commands: [] };
   const deps = data.dependencies || { libraries: [], install_commands: [] };
   const strategy = data.migration_strategy || {};
   const runCmds = data.run_commands || [];

   const handleCopy = (text: string, id: string) => {
      navigator.clipboard.writeText(text);
      setCopied(id);
      setTimeout(() => setCopied(null), 2000);
   };

   const handleDownload = (content: string, filename: string) => {
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
   };

   return (
      <div className="space-y-16 animate-in fade-in slide-in-from-bottom-6 duration-1000">

         {/* ──  Industrial Target Stack Header ── */}
         <div className="relative overflow-hidden bg-zinc-950 border-b-8 border-amber-400 p-8 rounded-sm shadow-[12px_12px_0px_0px_rgba(39,39,42,0.1)]">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400 opacity-5 -mr-20 -mt-20 rounded-full blur-3xl animate-pulse" />
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
               <div className="space-y-2">
                  <div className="flex items-center gap-3">
                     <span className="px-2 py-0.5 bg-amber-400 text-zinc-950 text-[12px] font-bold uppercase tracking-[0.2em] rounded-sm italic">Migration Active</span>
                     {/* <span className="text-zinc-500 text-[12px] font-bold uppercase tracking-widest leading-none">Status: Ready for Deployment</span> */}
                  </div>
                  <h2 className="text-3xl font-black text-white uppercase tracking-tighter italic">
                     Target Stack: <span className="text-amber-400">{targetStack.framework}</span>
                  </h2>
                  <div className="flex items-center gap-4 text-[11px] font-bold text-zinc-400 uppercase tracking-widest">
                     <span>Runtime: {targetStack.backend} {targetStack.runtime}</span>
                     <div className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
                     {/* <span>Architecture: ASGI / Modernized</span> */}
                  </div>
               </div>

               <div className="flex gap-4">
                  <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-sm space-y-1">
                     <p className="text-[12px] font-bold text-zinc-500 uppercase italic">File Extraction</p>
                     <p className="text-2xl font-black text-white">{files.length}</p>
                  </div>
                  <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-sm space-y-1">
                     <p className="text-[12px] font-bold text-zinc-500 uppercase italic">Env Readiness</p>
                     <p className="text-2xl font-black text-emerald-400">100%</p>
                  </div>
               </div>
            </div>
         </div>

         {/* ──  Generated File Registry & Code Viewer ── */}
         <div className="space-y-8">
            <SectionHeading icon={<FileCode size={14} strokeWidth={3} />} title="High-Depth File Extraction Registry" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border-2 border-zinc-950 rounded-sm shadow-[10px_10px_0px_0px_rgba(9,9,11,0.05)] overflow-hidden bg-white">
               {/* Sidebar */}
               <div className="lg:col-span-4 bg-zinc-50 border-r-2 border-zinc-950 divide-y-2 divide-zinc-950/5 h-[600px] overflow-y-auto">
                  {files.map((file: any, i: number) => (
                     <button
                        key={i}
                        onClick={() => setActiveFile(i)}
                        className={`w-full text-left p-6 transition-all group flex items-start gap-4 ${activeFile === i ? 'bg-amber-400 border-l-[12px] border-zinc-950' : 'hover:bg-zinc-100'}`}
                     >
                        <div className={`mt-1 p-2 rounded-sm ${activeFile === i ? 'bg-zinc-950 text-white' : 'bg-zinc-200 text-zinc-500'}`}>
                           <Code size={12} strokeWidth={3} />
                        </div>
                        <div className="space-y-1 overflow-hidden">
                           <p className={`text-[13px] font-bold uppercase tracking-tight italic truncate ${activeFile === i ? 'text-zinc-950' : 'text-zinc-900'}`}>{file.file_name}</p>
                           <p className={`text-[12px] font-medium uppercase tracking-tighter italic truncate ${activeFile === i ? 'text-zinc-800' : 'text-zinc-400'}`}>{file.path}</p>
                        </div>
                     </button>
                  ))}
               </div>

               {/* Code Viewer */}
               <div className="lg:col-span-8 bg-zinc-950 relative h-[600px] flex flex-col">
                  <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
                     <div className="flex items-center gap-3">
                        <div className="flex gap-1.5">
                           <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
                           <div className="w-2.5 h-2.5 rounded-full bg-amber-500/20" />
                           <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/20" />
                        </div>
                        <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest italic">{files[activeFile ?? 0]?.path}</span>
                     </div>
                     <div className="flex items-center gap-2">
                        <button
                           onClick={() => handleDownload(files[activeFile ?? 0]?.content || '', files[activeFile ?? 0]?.file_name || 'file.txt')}
                           className="flex items-center gap-2 px-3 py-1.5 bg-zinc-900 border border-zinc-800 text-zinc-400 text-[12px] font-bold uppercase hover:bg-zinc-800 hover:text-white transition-all"
                        >
                           <Download size={12} />
                           Download
                        </button>
                        <button
                           onClick={() => handleCopy(files[activeFile ?? 0]?.content || '', 'file')}
                           className="flex items-center gap-2 px-3 py-1.5 bg-zinc-900 border border-zinc-800 text-zinc-400 text-[12px] font-bold uppercase hover:bg-zinc-800 hover:text-white transition-all"
                        >
                           {copied === 'file' ? <CheckCircle2 size={12} className="text-emerald-400" /> : <Copy size={12} />}
                           {copied === 'file' ? 'Copied' : 'Copy Source'}
                        </button>
                     </div>
                  </div>
                  <div className="flex-1 overflow-auto p-8 font-mono text-[13px] leading-relaxed text-zinc-300">
                     <pre className="whitespace-pre">{files[activeFile ?? 0]?.content || '# No Content Detected'}</pre>
                  </div>
               </div>
            </div>
         </div>

         {/* ── ️ Command Console & Dependency Manifest ── */}
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-6 border-t-2 border-zinc-100">

            {/* Environment Setup Console */}
            <div className="space-y-6">
               <SectionHeading icon={<Terminal size={14} strokeWidth={3} />} title="Setup Console Protocol" />
               <div className="bg-zinc-950 rounded-sm overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)]">
                  <div className="bg-zinc-900 px-5 py-3 border-b border-zinc-800 flex justify-between items-center">
                     <span className="text-[12px] font-bold text-zinc-500 uppercase tracking-widest italic">Industrial Startup Sequences</span>
                     <div className="w-3 h-3 rounded-full bg-emerald-500/80 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                  </div>
                  <div className="p-6 space-y-6">
                     <div className="space-y-4">
                        <p className="text-[11px] font-bold text-amber-500 uppercase italic leading-none tracking-widest">Environment Alignment</p>
                        <div className="space-y-2">
                           {envCleanup.commands?.map((cmd: string, i: number) => (
                              <div key={i} className="group relative">
                                 <pre className="bg-zinc-900 p-4 font-mono text-[12px] text-emerald-400 border border-zinc-800 break-all transition-all hover:bg-zinc-800">
                                    $ {cmd}
                                 </pre>
                                 <button
                                    onClick={() => handleCopy(cmd, `env-${i}`)}
                                    className="absolute right-3 top-3 p-2 bg-zinc-950 text-zinc-500 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                 >
                                    {copied === `env-${i}` ? <CheckCircle2 size={12} className="text-emerald-400" /> : <Copy size={12} />}
                                 </button>
                              </div>
                           ))}
                        </div>
                     </div>

                     <div className="space-y-4 pt-4 border-t border-zinc-900">
                        <p className="text-[11px] font-bold text-amber-500 uppercase italic leading-none tracking-widest">Runtime Execution</p>
                        <div className="space-y-2">
                           {runCmds.map((cmd: string, i: number) => (
                              <div key={i} className="group relative">
                                 <pre className="bg-emerald-950/20 p-4 font-mono text-[12px] text-white border border-emerald-900/30 break-all italic">
                                    # EXEC: {cmd}
                                 </pre>
                                 <button
                                    onClick={() => handleCopy(cmd, `run-${i}`)}
                                    className="absolute right-3 top-3 p-2 bg-zinc-950 text-zinc-500 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                 >
                                    {copied === `run-${i}` ? <CheckCircle2 size={12} className="text-emerald-400" /> : <Copy size={12} />}
                                 </button>
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            {/* Technical Registry */}
            <div className="space-y-10">
               {/* Dependencies */}
               <div className="space-y-6">
                  <SectionHeading icon={<Package size={14} strokeWidth={3} />} title="Python Dependency Manifest" />
                  <div className="flex flex-wrap gap-2">
                     {deps.libraries?.map((lib: string, i: number) => (
                        <div key={i} className="px-3 py-1.5 bg-white border-2 border-zinc-950 rounded-sm flex items-center gap-2 group hover:bg-amber-400 transition-all shadow-[3px_3px_0px_0px_rgba(0,0,0,0.05)]">
                           <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full group-hover:bg-zinc-950" />
                           <span className="text-[11px] font-bold text-zinc-950 uppercase italic tracking-tighter">{lib}</span>
                        </div>
                     ))}
                  </div>
               </div>

               {/* Server Setup Logic */}
               <div className="space-y-6">
                  <SectionHeading icon={<Server size={14} strokeWidth={3} />} title="Industrial Server Setup" />
                  <div className="bg-zinc-50 border-2 border-zinc-950 rounded-sm p-6 space-y-4">
                     {data.server_setup?.steps?.map((step: string, i: number) => (
                        <div key={i} className="flex gap-4 group">
                           <div className="flex-shrink-0 w-5 h-5 bg-zinc-950 text-white flex items-center justify-center text-[12px] font-black rounded-[2px] italic shadow-[2px_2px_0px_0px_rgba(251,191,36,1)] group-hover:-translate-y-0.5 transition-transform">
                              {i + 1}
                           </div>
                           <p className="text-[12px] font-medium text-zinc-600 leading-tight italic uppercase tracking-tight group-hover:text-zinc-950 transition-colors">
                              {step}
                           </p>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </div>

         {/* ──  Architectural Bridge (v28.2 Migration Mapping) ── */}
         <div className="space-y-8 pt-8 border-t-4 border-zinc-950">
            <SectionHeading icon={<ShieldCheck size={14} strokeWidth={3} />} title="Architectural Migration Bridge" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <div className="bg-white border-2 border-zinc-950 p-6 rounded-sm shadow-[8px_8px_0px_0px_rgba(9,9,11,0.05)] space-y-4">
                  <h5 className="text-[11px] font-black text-amber-500 uppercase tracking-[0.2em] italic">Routing Layer</h5>
                  <p className="text-[13px] font-bold text-zinc-950 leading-relaxed italic uppercase tracking-tighter shadow-inner p-4 bg-zinc-50 border-l-4 border-amber-400">
                     {strategy.routes_mapping || 'Surgical Path Conversion Active'}
                  </p>
               </div>
               <div className="bg-white border-2 border-zinc-950 p-6 rounded-sm shadow-[8px_8px_0px_0px_rgba(9,9,11,0.05)] space-y-4">
                  <h5 className="text-[11px] font-black text-amber-500 uppercase tracking-[0.2em] italic">Business Logic</h5>
                  <p className="text-[13px] font-bold text-zinc-950 leading-relaxed italic uppercase tracking-tighter shadow-inner p-4 bg-zinc-50 border-l-4 border-amber-400">
                     {strategy.controller_mapping || 'Logical Controller Translation Sync'}
                  </p>
               </div>
               <div className="bg-white border-2 border-zinc-950 p-6 rounded-sm shadow-[8px_8px_0px_0px_rgba(9,9,11,0.05)] space-y-4">
                  <h5 className="text-[11px] font-black text-amber-500 uppercase tracking-[0.2em] italic">Middleware Guard</h5>
                  <p className="text-[13px] font-bold text-zinc-950 leading-relaxed italic uppercase tracking-tighter shadow-inner p-4 bg-zinc-50 border-l-4 border-amber-400">
                     {strategy.middleware_mapping || 'Dependency Injection Integration Active'}
                  </p>
               </div>
            </div>
         </div>

      </div>
   );
};
