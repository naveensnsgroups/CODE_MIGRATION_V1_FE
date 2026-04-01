import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { 
  Layout, 
  Cpu, 
  Layers, 
  ShieldCheck, 
  Map, 
  Zap,
  Code as CodeIcon,
  Eye,
  Copy,
  CheckCircle2,
  ListTodo
} from 'lucide-react';

interface AnalysisReportProps {
  content: string;
}

/** Structured Data Types */
interface StructuredData {
  summary?: string;
  tech_stack?: {
    frontend?: string[];
    backend?: string[];
    statics?: string[];
  };
  architecture?: Array<{ file: string; purpose: string }>;
  core_features?: Array<{ label: string; desc: string }>;
  business_rules?: string[];
  routes?: Array<{ path: string; method: string; desc: string }>;
}

/** Deep Clean & Parse JSON Helper */
function cleanAndParse(raw: any): { type: 'json' | 'markdown'; data: StructuredData | string } {
  if (!raw) return { type: 'markdown', data: '' };
  
  const extract = (val: any): string | object => {
    if (typeof val === 'object') return val;
    if (typeof val !== 'string') return String(val);
    
    let cleaned = val.trim();
    // Strip markdown code fences if present
    cleaned = cleaned.replace(/^```(json)?\n/i, '').replace(/\n```$/i, '');
    
    try {
      return JSON.parse(cleaned);
    } catch {
      return val;
    }
  };

  const parsed = extract(raw);
  
  if (typeof parsed === 'object') {
    // If it's a wrapper, dive into known result fields
    const content = (parsed as any)?.result?.response || (parsed as any)?.response || parsed;
    const finalContent = extract(content);
    
    if (typeof finalContent === 'object') {
       return { type: 'json', data: finalContent as StructuredData };
    }
    return { type: 'markdown', data: String(finalContent) };
  }
  
  return { type: 'markdown', data: String(parsed) };
}

const Tag: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="px-2 py-0.5 bg-zinc-950 text-white text-[9px] font-black uppercase tracking-widest rounded-sm border-2 border-zinc-950 shadow-[2px_2px_0px_0px_rgba(251,191,36,1)] transition-transform hover:-translate-y-0.5">
    {children}
  </span>
);

const SectionHeading: React.FC<{ icon: React.ReactNode; title: string }> = ({ icon, title }) => (
  <div className="flex items-center gap-3 mb-6">
    <div className="w-8 h-8 rounded-sm bg-zinc-950 text-amber-400 flex items-center justify-center border-2 border-zinc-950 shadow-[3px_3px_0px_0px_rgba(228,228,231,1)]">
      {icon}
    </div>
    <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-950 italic border-b-4 border-amber-400 pb-0.5 leading-none">
      {title}
    </h3>
  </div>
);

const StructuredReport: React.FC<{ data: StructuredData }> = ({ data }) => {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-1000">
      
      {/* ── Industrial Summary ── */}
      {data.summary && (
        <div className="relative group">
          <div className="absolute inset-0 bg-amber-400 -rotate-1 rounded-sm opacity-10 group-hover:opacity-20 transition-opacity" />
          <div className="relative bg-zinc-50 border-2 border-zinc-950 p-6 rounded-sm shadow-[6px_6px_0px_0px_rgba(39,39,42,1)]">
            <p className="text-sm font-bold leading-relaxed text-zinc-900 border-l-4 border-amber-400 pl-4">
              {data.summary}
            </p>
          </div>
        </div>
      )}

      {/* ── Architecture Pipeline ── */}
      {data.architecture && (
         <section>
           <SectionHeading icon={<Layers size={14} strokeWidth={3} />} title="Architecture Pipeline" />
           <div className="border-2 border-zinc-950 rounded-sm overflow-hidden bg-white shadow-[6px_6px_0px_0px_rgba(228,228,231,1)]">
             <table className="w-full text-left border-collapse">
               <thead>
                 <tr className="bg-zinc-950 text-white">
                   <th className="px-5 py-3 text-[9px] font-black uppercase tracking-widest italic border-r border-zinc-800">File Logic</th>
                   <th className="px-5 py-3 text-[9px] font-black uppercase tracking-widest italic">Core Mission</th>
                 </tr>
               </thead>
               <tbody className="divide-y-2 divide-zinc-950/5">
                 {data.architecture.map((item, i) => (
                   <tr key={i} className="hover:bg-amber-50 group">
                     <td className="px-5 py-4 font-mono text-[10px] font-black text-zinc-950 border-r border-zinc-950/5">
                       <span className="text-amber-600 group-hover:animate-pulse">_</span>{item.file}
                     </td>
                     <td className="px-5 py-4 text-xs font-semibold text-zinc-600">{item.purpose}</td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
         </section>
      )}

      {/* ── Tech Stack Reactor ── */}
      {data.tech_stack && (
        <section>
          <SectionHeading icon={<Cpu size={14} strokeWidth={3} />} title="Stack Intelligence" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(data.tech_stack).map(([key, tags]) => (
              tags && tags.length > 0 && (
                <div key={key} className="p-5 bg-white border-2 border-zinc-200 rounded-sm hover:border-zinc-950 transition-colors group">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-black uppercase tracking-[0.15em] text-zinc-400 group-hover:text-zinc-950 transition-colors">{key} Layers</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
                  </div>
                </div>
              )
            ))}
          </div>
        </section>
      )}

      {/* ── Core Modules (Staggered Grid) ── */}
      {data.core_features && (
        <section>
          <SectionHeading icon={<Zap size={14} strokeWidth={3} />} title="Functional Modules" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {data.core_features.map((feature, i) => (
              <div key={i} className="group p-5 bg-white border-2 border-zinc-950 rounded-sm shadow-[0px_4px_0px_0px_rgba(9,9,11,1)] hover:shadow-none hover:translate-y-[4px] transition-all relative overflow-hidden">
                <div className="absolute -top-6 -right-6 w-12 h-12 bg-amber-400 rotate-45 transform transition-transform group-hover:scale-150" />
                <div className="relative z-10 flex gap-4">
                  <div className="h-10 w-10 shrink-0 bg-zinc-950 text-white rounded-sm flex items-center justify-center group-hover:bg-amber-400 group-hover:text-zinc-950 transition-colors">
                    <CheckCircle2 size={18} strokeWidth={3} />
                  </div>
                  <div>
                    <h4 className="text-[11px] font-black uppercase tracking-tight text-zinc-950">{feature.label}</h4>
                    <p className="text-xs text-zinc-500 mt-1 font-bold leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Mapped Interfaces ── */}
      {data.routes && (
        <section>
          <SectionHeading icon={<Map size={14} strokeWidth={3} />} title="Interface Map" />
          <div className="space-y-3 bg-zinc-950 p-6 rounded-sm">
             {data.routes.map((route, i) => (
               <div key={i} className="flex items-center justify-between group border-b border-zinc-800 pb-3 last:border-0 last:pb-0">
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-[10px] font-black text-amber-400 uppercase tracking-widest w-12">{route.method}</span>
                    <span className="font-mono text-xs font-black text-white group-hover:text-amber-400 transition-colors">{route.path}</span>
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500 group-hover:text-zinc-300 transition-colors">&gt;&gt; {route.desc}</span>
               </div>
             ))}
          </div>
        </section>
      )}

      {/* ── Logic Flow ── */}
      {data.business_rules && (
        <section>
          <SectionHeading icon={<ListTodo size={14} strokeWidth={3} />} title="Logic Constraints" />
          <div className="grid grid-cols-1 gap-2">
            {data.business_rules.map((rule, i) => (
              <div key={i} className="flex items-start gap-4 p-3 bg-white border border-zinc-100 rounded-sm hover:border-zinc-300 transition-all">
                <span className="text-[10px] font-black text-amber-500 font-mono">0{i+1}</span>
                <p className="text-xs font-bold text-zinc-700 leading-tight uppercase tracking-tight">{rule}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export const AnalysisReport: React.FC<AnalysisReportProps> = ({ content }) => {
  const [viewMode, setViewMode] = useState<'pretty' | 'raw'>('pretty');
  const [copied, setCopied] = useState(false);
  
  const { type, data } = cleanAndParse(content);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full bg-white group/container">
      
      {/* ── Report Console Header ── */}
      <div className="flex items-center justify-between mb-8 border-b-2 border-zinc-950 pb-4">
         <div className="flex items-center gap-4">
            <button 
              onClick={() => setViewMode('pretty')}
              className={`px-4 py-1.5 text-[9px] font-black uppercase tracking-widest rounded-sm transition-all flex items-center gap-2 ${
                viewMode === 'pretty' ? 'bg-zinc-950 text-white shadow-[3px_3px_0px_0px_rgba(251,191,36,1)]' : 'text-zinc-400 hover:text-zinc-950'
              }`}
            >
              <Eye size={12} /> Dashboard
            </button>
            <button 
              onClick={() => setViewMode('raw')}
              className={`px-4 py-1.5 text-[9px] font-black uppercase tracking-widest rounded-sm transition-all flex items-center gap-2 ${
                viewMode === 'raw' ? 'bg-zinc-950 text-white shadow-[3px_3px_0px_0px_rgba(251,191,36,1)]' : 'text-zinc-400 hover:text-zinc-950'
              }`}
            >
              <CodeIcon size={12} /> Code
            </button>
         </div>
         <button 
           onClick={handleCopy}
           className="p-2 text-zinc-400 hover:text-amber-500 transition-colors"
           title="Copy Raw Content"
         >
           {copied ? <CheckCircle2 size={14} className="text-emerald-500" /> : <Copy size={14} />}
         </button>
      </div>

      {/* ── Dynamic Content ── */}
      <div className="flex-1">
        {viewMode === 'pretty' ? (
          type === 'json' ? (
            <StructuredReport data={data as StructuredData} />
          ) : (
            <div className="prose prose-zinc prose-sm max-w-none">
              <ReactMarkdown
                components={{
                  h1: ({ children }) => <h1 className="text-base font-black uppercase tracking-widest text-zinc-950 border-b-2 border-amber-400 pb-2 mb-4 italic">{children}</h1>,
                  h2: ({ children }) => <h2 className="text-sm font-black uppercase tracking-wider text-zinc-950 mt-8 mb-3">{children}</h2>,
                  h3: ({ children }) => <h3 className="text-[10px] font-black uppercase text-zinc-700 mt-5 mb-2 tracking-widest underline decoration-amber-400">{children}</h3>,
                  p: ({ children }) => <p className="text-sm leading-relaxed text-zinc-700 mb-4 font-medium">{children}</p>,
                  ul: ({ children }) => <ul className="list-disc ml-5 mb-6 space-y-2">{children}</ul>,
                  li: ({ children }) => <li className="text-xs text-zinc-600 font-bold uppercase tracking-tight">{children}</li>,
                  strong: ({ children }) => <strong className="font-black text-zinc-950">{children}</strong>,
                  hr: () => <hr className="my-8 border-2 border-dashed border-zinc-100" />,
                  code: ({ children }) => <code className="bg-amber-50 text-amber-700 px-1.5 py-0.5 rounded font-mono text-xs">{children}</code>,
                  pre: ({ children }) => <pre className="bg-zinc-950 text-white p-6 rounded-sm text-xs font-mono overflow-x-auto my-6 border-b-4 border-amber-400">{children}</pre>,
                }}
              >
                {data as string}
              </ReactMarkdown>
            </div>
          )
        ) : (
          <div className="relative group">
            <div className="absolute top-2 right-2 px-2 py-1 bg-zinc-800 text-[8px] font-black text-zinc-400 uppercase tracking-widest rounded-sm opacity-0 group-hover:opacity-100 transition-opacity">Raw JSON Format</div>
            <pre className="bg-zinc-950 text-zinc-300 p-8 rounded-sm text-[10px] font-mono overflow-x-auto leading-relaxed border-2 border-zinc-950 shadow-[6px_6px_0px_0px_rgba(251,191,36,0.1)]">
              {content}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

