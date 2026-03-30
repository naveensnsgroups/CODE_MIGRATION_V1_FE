import React from 'react';
import ReactMarkdown from 'react-markdown';

interface AnalysisReportProps {
  content: string;
}

export const AnalysisReport: React.FC<AnalysisReportProps> = ({ content }) => {
  return (
    <div className="prose prose-zinc prose-sm max-w-none prose-headings:font-black prose-headings:uppercase prose-headings:tracking-widest prose-headings:text-blue-600 prose-p:text-zinc-600 prose-strong:text-zinc-900 prose-ul:list-disc prose-li:text-zinc-600">
      <ReactMarkdown
        components={{
          h1: ({ children }) => <h1 className="text-sm font-black border-b border-blue-100 pb-2 mb-4">{children}</h1>,
          h2: ({ children }) => <h2 className="text-[10px] font-black mt-8 mb-3">{children}</h2>,
          h3: ({ children }) => <h3 className="text-[9px] font-black mt-6 mb-2 text-zinc-900">{children}</h3>,
          p: ({ children }) => <p className="text-[12px] leading-relaxed mb-4">{children}</p>,
          ul: ({ children }) => <ul className="space-y-2 mb-6 ml-4 list-disc text-blue-600/30 font-black">{children}</ul>,
          li: ({ children }) => <li className="text-[12px] text-zinc-600 font-medium pl-2">{children}</li>,
          strong: ({ children }) => <strong className="font-black text-zinc-900">{children}</strong>,
          hr: () => <hr className="my-8 border-zinc-100" />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};
