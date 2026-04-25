import React, { useState } from 'react';
import { 
  Zap, 
  Terminal, 
  FileCode, 
  CheckCircle2, 
  Layout, 
  Server, 
  ShieldAlert, 
  Info,
  Copy,
  ChevronRight,
  ChevronDown,
  ExternalLink,
  Code2,
  Download
} from 'lucide-react';
import { SectionHeading, StructuredData } from './CommonElements';
import ReactMarkdown from 'react-markdown';
import JSZip from 'jszip';

export const QuickMigrationHero: React.FC<{ data: StructuredData }> = ({ data }) => {
  const [activeTab, setActiveTab] = useState<'backend' | 'frontend'>('backend');
  const [expandedFile, setExpandedFile] = useState<string | null>(null);

  const backend = data.backend;
  const frontend = data.frontend;

  // Universal safe string converter — prevents "Objects are not valid as a React child" crashes
  const safeStr = (val: any): string => {
    if (val === null || val === undefined) return '';
    if (typeof val === 'string') return val;
    if (typeof val === 'number' || typeof val === 'boolean') return String(val);
    if (Array.isArray(val)) return val.map(v => safeStr(v)).join(', ');
    if (typeof val === 'object') return JSON.stringify(val).slice(0, 200);
    return String(val);
  };

  const handleDownload = async () => {
    const zip = new JSZip();
    
    // Add Backend Files
    if (backend && backend.files) {
      const beFolder = zip.folder("backend");
      backend.files.forEach((file: any) => {
        beFolder?.file(file.file_name, file.content);
      });
      if (backend.README) beFolder?.file("README.md", backend.README);
      if (backend.project_structure) beFolder?.file("structure.txt", backend.project_structure);
    }

    // Add Frontend Files
    if (frontend && frontend.files) {
      const feFolder = zip.folder("frontend");
      frontend.files.forEach((file: any) => {
        feFolder?.file(file.file_path, file.content);
      });
    }

    const content = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(content);
    const link = document.createElement("a");
    link.href = url;
    link.download = `migration_mission_${data.project_id || 'pack'}.zip`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const renderCodeBlock = (code: string, fileName: string) => {
    return (
      <div className="relative group/code mt-2">
        <div className="absolute top-3 right-3 flex items-center gap-2 opacity-0 group-hover/code:opacity-100 transition-opacity">
          <button 
            onClick={() => navigator.clipboard.writeText(code)}
            className="p-1.5 bg-zinc-800 text-zinc-400 hover:text-amber-400 rounded-sm border border-zinc-700 transition-colors"
            title="Copy Code"
          >
            <Copy size={12} />
          </button>
        </div>
        <div className="bg-zinc-950 p-6 rounded-sm border-2 border-zinc-950 overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]">
          <div className="flex items-center gap-2 mb-4 border-b border-zinc-800 pb-2">
            <Code2 size={12} className="text-amber-500" />
            <span className="text-[12px] font-mono text-zinc-500 uppercase tracking-widest">{fileName}</span>
          </div>
          <pre className="text-lg font-mono text-zinc-300 overflow-x-auto leading-relaxed">
            {code}
          </pre>
        </div>
      </div>
    );
  };

  const renderBackend = () => {
    if (!backend) return null;
    
    // Ensure we handle both object and array forms (though user provided object)
    const b = Array.isArray(backend) ? backend[0] : backend;

    return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        {/* -- Backend Meta -- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-zinc-950 p-4 border-2 border-zinc-950 shadow-[4px_4px_0px_0px_rgba(251,191,36,1)]">
            <span className="text-[12px] font-bold text-amber-500 uppercase tracking-widest block mb-1">Target Framework</span>
            <span className="text-lg font-bold text-white uppercase italic tracking-tighter flex items-center gap-2">
              <Server size={18} /> {safeStr(b.framework) || 'Python/FastAPI'}
            </span>
          </div>
          <div className="bg-white p-4 border-2 border-zinc-950 shadow-[4px_4px_0px_0px_rgba(9,9,11,1)]">
            <span className="text-[12px] font-bold text-zinc-400 uppercase tracking-widest block mb-1">Install Command</span>
            <code className="text-sm font-mono font-bold text-zinc-900 bg-zinc-100 px-2 py-1 block mt-1 truncate">
              {safeStr(b.install_command)}
            </code>
          </div>
        </div>

        {/* -- Dependency Pill Manifest -- */}
        {b.dependencies && (
          <div className="mb-8">
            <div className="flex flex-wrap gap-2">
              {(Array.isArray(b.dependencies) ? b.dependencies : []).map((dep: any, i: number) => (
                <span key={i} className="px-3 py-1 bg-zinc-100 border border-zinc-200 text-[12px] font-black text-zinc-700 uppercase tracking-tight rounded-full">
                  {safeStr(dep)}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* -- Setup Steps -- */}
        <div className="mb-8">
          <SectionHeading icon={<Terminal size={14} />} title="Initialization Protocol" />
          <div className="space-y-3">
            {(Array.isArray(b.setup_steps) ? b.setup_steps : []).map((s: any, i: number) => {
              // Support both string steps and object steps {step, command}
              const isString = typeof s === 'string';
              const stepLabel = isString ? s : safeStr(s.step ?? s.key ?? s.name ?? s);
              const stepCommand = isString ? null : safeStr(s.command ?? s.example ?? s.description ?? '');
              return (
                <div key={i} className="flex gap-4 items-start p-4 bg-white border border-zinc-200 rounded-sm group hover:border-zinc-950 transition-all">
                  <div className="w-6 h-6 rounded-full bg-zinc-100 flex items-center justify-center shrink-0 text-[11px] font-black text-zinc-400 group-hover:bg-zinc-950 group-hover:text-white transition-colors">
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-zinc-800 tracking-tight">{stepLabel}</p>
                    {stepCommand && (
                      <code className="text-[12px] font-mono text-zinc-500 bg-zinc-50 px-2 py-0.5 rounded-sm block w-full mt-1">
                        $ {stepCommand}
                      </code>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* -- Project Tree -- */}
        {b.project_structure && (
          <div className="mb-8">
            <SectionHeading icon={<Layout size={14} />} title="Surgical File Structure" />
            <div className="bg-zinc-50 border-2 border-zinc-950 p-6 font-mono text-sm text-zinc-800 rounded-sm leading-relaxed whitespace-pre shadow-inner">
              {safeStr(b.project_structure)}
            </div>
          </div>
        )}

        {/* -- README Manifest -- */}
        {b.README && (
          <div className="mb-8">
            <SectionHeading icon={<Info size={14} />} title="Project Manifest (README)" />
            <div className="bg-white border-2 border-zinc-950 p-8 rounded-sm shadow-[4px_4px_0px_0px_rgba(9,9,11,0.05)] prose prose-zinc prose-sm max-w-none">
              <ReactMarkdown>{safeStr(b.README)}</ReactMarkdown>
            </div>
          </div>
        )}

        {/* -- Environment Variables -- */}
        {b.env_variables && (
          <div className="mb-8">
            <SectionHeading icon={<ShieldAlert size={14} />} title="Security Environment Configuration" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {(Array.isArray(b.env_variables) ? b.env_variables : []).map((env: any, i: number) => {
                // Support both string env vars and object env vars {key, description, example}
                const isObj = typeof env === 'object' && env !== null;
                const envKey = isObj ? (env.key ?? env.name ?? `VAR_${i}`) : safeStr(env);
                const envDesc = isObj ? safeStr(env.description ?? '') : '';
                const envExample = isObj ? safeStr(env.example ?? '') : '';
                const copyVal = isObj ? `${envKey}=${envExample}` : safeStr(env);
                return (
                  <div key={i} className="bg-zinc-50 border border-zinc-200 p-3 rounded-sm group hover:border-zinc-950 transition-colors">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] font-mono font-black text-zinc-900 uppercase tracking-widest">{envKey}</span>
                      <Copy size={10} className="text-zinc-400 opacity-0 group-hover:opacity-100 cursor-pointer shrink-0" onClick={() => navigator.clipboard.writeText(copyVal)} />
                    </div>
                    {envDesc && <p className="text-[11px] text-zinc-500 font-medium mb-1 leading-snug">{envDesc}</p>}
                    {envExample && (
                      <code className="text-[11px] font-mono text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded-sm block w-full">
                        = {envExample}
                      </code>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* -- File Registry -- */}
        <div className="mb-8">
          <SectionHeading icon={<FileCode size={14} />} title="Generated Code Registry" />
          <div className="space-y-4">
            {b.files?.map((file: any, index: number) => {
              const isExpanded = expandedFile === `backend-${index}`;
              return (
                <div key={index} className="border-2 border-zinc-950 rounded-sm overflow-hidden bg-white shadow-[4px_4px_0px_0px_rgba(9,9,11,0.05)]">
                  <button 
                    onClick={() => setExpandedFile(isExpanded ? null : `backend-${index}`)}
                    className="w-full flex items-center justify-between p-4 hover:bg-zinc-50 transition-colors text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-zinc-100 flex items-center justify-center text-zinc-500 group-hover:text-zinc-900">
                        <FileCode size={16} />
                      </div>
                      <div>
                        <span className="text-[13px] font-bold text-zinc-900 tracking-tight">{file.file_name}</span>
                        <span className="block text-[12px] font-medium text-zinc-400 uppercase tracking-widest mt-0.5">Surgical Logic Fragment</span>
                      </div>
                    </div>
                    {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                  </button>
                  {isExpanded && (
                    <div className="p-4 bg-zinc-50 border-t-2 border-zinc-950 animate-in slide-in-from-top-2 duration-300">
                      {renderCodeBlock(file.content, file.file_name)}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* -- Notes & Alerts -- */}
        {b.notes && (
          <div className="bg-amber-50 border-2 border-amber-400 p-6 rounded-sm">
            <div className="flex items-center gap-2 mb-4 text-amber-900 font-bold uppercase text-[12px] tracking-widest">
              <ShieldAlert size={14} /> Critical Deployment Notes
            </div>
            <ul className="space-y-3">
              {(Array.isArray(b.notes) ? b.notes : []).map((note: any, i: number) => (
                <li key={i} className="flex gap-3 text-sm text-amber-800 font-medium italic">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                  {safeStr(note)}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };

  const renderFrontend = () => {
    if (!frontend) return null;
    const f = Array.isArray(frontend) ? frontend[0] : frontend;

    return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-zinc-950 p-4 border-2 border-zinc-950 shadow-[4px_4px_0px_0px_rgba(251,191,36,1)]">
            <span className="text-[12px] font-bold text-amber-500 uppercase tracking-widest block mb-1">UI Modernization</span>
            <span className="text-lg font-bold text-white uppercase italic tracking-tighter flex items-center gap-2">
              <Layout size={18} />Next.js
            </span>
          </div>
          <div className="bg-white p-4 border-2 border-zinc-950 shadow-[4px_4px_0px_0px_rgba(9,9,11,1)]">
            <span className="text-[12px] font-bold text-zinc-400 uppercase tracking-widest block mb-1">Framework Version</span>
            <span className="text-lg font-bold text-zinc-900 bg-zinc-100 px-2 py-1 block mt-1">
              App Router enabled
            </span>
          </div>
        </div>

        {/* -- Dependency Pill Manifest -- */}
        {f.dependencies && (
          <div className="mb-8">
            <div className="flex flex-wrap gap-2">
            {(Array.isArray(f.dependencies) ? f.dependencies : []).map((dep: any, i: number) => (
                <span key={i} className="px-3 py-1 bg-zinc-100 border border-zinc-200 text-[12px] font-black text-zinc-700 uppercase tracking-tight rounded-full">
                  {safeStr(dep)}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* -- Setup Steps -- */}
        <div className="mb-8">
          <SectionHeading icon={<Terminal size={14} />} title="Scaffolding Protocol" />
          <div className="space-y-2">
            {(Array.isArray(f.setup_steps) ? f.setup_steps : []).map((step: any, i: number) => (
              <div key={i} className="flex gap-4 items-center p-3 bg-white border-l-4 border-zinc-950 shadow-sm">
                 <CheckCircle2 size={14} className="text-zinc-300" />
                 <span className="text-sm font-medium text-zinc-700">{safeStr(step.step ?? step.key ?? step.name ?? step)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* -- File Registry -- */}
        <div className="mb-8">
          <SectionHeading icon={<Code2 size={14} />} title="Modernized Component Suite" />
          <div className="space-y-4">
            {f.files?.map((file: any, index: number) => {
              const isExpanded = expandedFile === `frontend-${index}`;
              return (
                <div key={index} className="border-2 border-zinc-950 rounded-sm overflow-hidden bg-white shadow-[4px_4px_0px_0px_rgba(9,9,11,0.05)]">
                  <button 
                    onClick={() => setExpandedFile(isExpanded ? null : `frontend-${index}`)}
                    className="w-full flex items-center justify-between p-4 hover:bg-zinc-50 transition-colors text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-zinc-100 flex items-center justify-center text-zinc-500 group-hover:text-zinc-900">
                        <FileCode size={16} />
                      </div>
                      <div>
                        <span className="text-[13px] font-bold text-zinc-900 tracking-tight">{file.file_path}</span>
                        <span className="block text-[12px] font-medium text-zinc-400 uppercase tracking-widest mt-0.5">Component Source</span>
                      </div>
                    </div>
                    {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                  </button>
                  {isExpanded && (
                    <div className="p-4 bg-zinc-50 border-t-2 border-zinc-950 animate-in slide-in-from-top-2 duration-300">
                      {renderCodeBlock(file.content, file.file_path)}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="mission-result-suite py-4">
      {/* -- Tactical Navigation -- */}
      <div className="flex gap-px bg-zinc-950 border-2 border-zinc-950 mb-10 shadow-[6px_6px_0px_0px_rgba(251,191,36,1)] overflow-hidden rounded-sm">
        <button 
          onClick={() => setActiveTab('backend')}
          className={`flex-1 py-4 text-[12px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 ${activeTab === 'backend' ? 'bg-amber-400 text-zinc-950' : 'bg-zinc-950 text-zinc-400 hover:text-white'}`}
        >
          <Server size={14} /> Target Backend
        </button>
        <button 
          onClick={() => setActiveTab('frontend')}
          className={`flex-1 py-4 text-[12px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 ${activeTab === 'frontend' ? 'bg-amber-400 text-zinc-950' : 'bg-zinc-950 text-zinc-400 hover:text-white'}`}
        >
          <Layout size={14} /> Target Frontend
        </button>
      </div>

      {activeTab === 'backend' ? renderBackend() : renderFrontend()}

      {/* -- Mission Footer -- */}
      <div className="mt-12 border-t-2 border-zinc-950 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-[3px_3px_0px_0px_rgba(9,9,11,1)] border-2 border-zinc-950">
            <CheckCircle2 size={20} />
          </div>
          <div>
            <span className="block text-[14px] font-black text-zinc-950 uppercase tracking-tighter italic">Mission Accomplished</span>
            <span className="block text-[12px] font-bold text-zinc-400 uppercase tracking-widest">Surgical Extraction Finalized</span>
          </div>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => {
              navigator.clipboard.writeText(JSON.stringify(data, null, 2));
              alert('Mission Pack copied to clipboard.');
            }}
            className="px-6 py-2.5 bg-white border-2 border-zinc-950 text-[12px] font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(9,9,11,1)] hover:bg-zinc-50 active:translate-x-1 active:translate-y-1 active:shadow-none transition-all flex items-center gap-2"
          >
            <Copy size={14} /> Copy Full Pack
          </button>
          <button 
            onClick={handleDownload}
            className="px-6 py-2.5 bg-amber-400 border-2 border-zinc-950 text-[12px] font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(9,9,11,1)] hover:bg-amber-300 active:translate-x-1 active:translate-y-1 active:shadow-none transition-all flex items-center gap-2"
          >
            <Download size={14} /> Download Project
          </button>
        </div>
      </div>
    </div>
  );
};
