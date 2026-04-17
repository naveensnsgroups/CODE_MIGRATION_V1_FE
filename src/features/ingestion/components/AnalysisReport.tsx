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
import { ReportDashboard } from './dashboard/ReportDashboard';
import { StructuredData } from './dashboard/CommonElements';

interface AnalysisReportProps {
  content: string;
  activeAction?: string;
  fullContext?: string | null;
}

/** Deep Clean & Parse JSON Helper */
function cleanAndParse(raw: string | object | null, contextRaw?: string | null): { type: 'json' | 'markdown'; data: StructuredData | string } {
  if (!raw) return { type: 'markdown', data: '' };

  const extract = (val: any, depth = 0): any => {
    if (depth > 2) return val; // Deep dive limit
    if (typeof val === 'object') return val;
    if (typeof val !== 'string') return String(val);

    let cleaned = val.trim();
    // Strip markdown code fences if present
    cleaned = cleaned.replace(/^```(json)?\n/i, '').replace(/\n```$/i, '');

    try {
      const parsed = JSON.parse(cleaned);

      // 🧪  Surgical Unwrap: Detect {"items": [{"json": ...}]}
      if (parsed && Array.isArray(parsed.items) && parsed.items.length > 0) {
        const firstItem = parsed.items[0];
        const payload = firstItem.json || firstItem;
        return extract(payload, depth + 1);
      }

      // Recursively dive if the parsed result is still a string
      if (typeof parsed === 'string') {
        return extract(parsed, depth + 1);
      }
      return parsed;
    } catch {
      return val;
    }
  };

  // 1. Initial Parse & Unwrap
  let parsed = extract(raw);

  // 🧪 Surgical Unwrap: Deep Dive into  results (items, result, response)
  if (parsed && typeof parsed === 'object') {
    parsed = (parsed as any)?.items?.[0]?.json ||
      (parsed as any)?.items?.[0] ||
      (parsed as any)?.result?.response ||
      (parsed as any)?.result ||
      (parsed as any)?.response ||
      parsed;

    // Recursive extraction if still a string
    parsed = extract(parsed);
  }

  // 2. 🧠 Cumulative Intelligence Merge
  if (contextRaw && typeof parsed === 'object') {
    const contextParsed = extract(contextRaw);
    if (typeof contextParsed === 'object') {
      // Merge context, but prioritize CURRENT mission segments
      parsed = { ...contextParsed, ...parsed };
    }
  }

  // 3. 🧪 Precision Promotion: If top-level keys are missing but buried in arrays, promote them
  if (parsed && typeof parsed === 'object') {
    const dataObj = parsed as any;
    // If we detect a specific agent payload structure, extract the payload
    if (!dataObj.apis && !dataObj.models && !dataObj.routes && !dataObj.endpoints && !dataObj.files && !dataObj.target_stack) {
      const buried = dataObj.result?.response || dataObj.result || dataObj.response || dataObj.data;
      if (buried && typeof buried === 'object') {
        parsed = { ...buried, ...dataObj }; // Merge so we keep original metadata like 'action'
      }
    }
  }

  // 4. Final Content Validation
  if (parsed && typeof parsed === 'object') {
    return { type: 'json', data: parsed as StructuredData };
  }

  return { type: 'markdown', data: String(parsed) };
}

export const AnalysisReport: React.FC<AnalysisReportProps> = ({ content, activeAction, fullContext }) => {
  const [viewMode, setViewMode] = useState<'pretty' | 'raw'>('pretty');
  const [copied, setCopied] = useState(false);

  const { type, data } = cleanAndParse(content, fullContext);

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
            className={`px-4 py-1.5 text-[11px] font-medium uppercase tracking-widest rounded-sm transition-all flex items-center gap-2 ${viewMode === 'pretty' ? 'bg-zinc-950 text-white shadow-[3px_3px_0px_0px_rgba(251,191,36,1)]' : 'text-zinc-400 hover:text-zinc-950'
              }`}
          >
            <Eye size={12} /> Dashboard
          </button>
          <button
            onClick={() => setViewMode('raw')}
            className={`px-4 py-1.5 text-[11px] font-medium uppercase tracking-widest rounded-sm transition-all flex items-center gap-2 ${viewMode === 'raw' ? 'bg-zinc-950 text-white shadow-[3px_3px_0px_0px_rgba(251,191,36,1)]' : 'text-zinc-400 hover:text-zinc-950'
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
            <ReportDashboard data={data as StructuredData} activeAction={activeAction} />
          ) : (
            <div className="prose prose-zinc prose-sm max-w-none">
              <ReactMarkdown
                components={{
                  h1: ({ children }) => <h1 className="text-base font-medium uppercase tracking-widest text-zinc-950 border-b-2 border-amber-400 pb-2 mb-4 italic">{children}</h1>,
                  h2: ({ children }) => <h2 className="text-sm font-medium uppercase tracking-wider text-zinc-950 mt-8 mb-3">{children}</h2>,
                  h3: ({ children }) => <h3 className="text-[12px] font-medium uppercase text-zinc-700 mt-5 mb-2 tracking-widest underline decoration-amber-400">{children}</h3>,
                  p: ({ children }) => <p className="text-sm leading-relaxed text-zinc-700 mb-4 font-medium">{children}</p>,
                  ul: ({ children }) => <ul className="list-disc ml-5 mb-6 space-y-2">{children}</ul>,
                  li: ({ children }) => <li className="text-xs text-zinc-600 font-bold uppercase tracking-tight">{children}</li>,
                  strong: ({ children }) => <strong className="font-medium text-zinc-950">{children}</strong>,
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
            <div className="absolute top-2 right-2 px-2 py-1 bg-zinc-800 text-[8px] font-medium text-zinc-400 uppercase tracking-widest rounded-sm opacity-0 group-hover:opacity-100 transition-opacity">Raw JSON Format</div>
            <pre className="bg-zinc-950 text-zinc-300 p-8 rounded-sm text-[12px] font-mono overflow-x-auto leading-relaxed border-2 border-zinc-950 shadow-[6px_6px_0px_0px_rgba(251,191,36,0.1)]">
              {content}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

