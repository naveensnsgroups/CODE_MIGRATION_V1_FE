'use client';

import React, { useState } from 'react';
import { FileNode } from '../types';

interface FileTreeProps {
  tree: FileNode[];
}

const FileTreeNode: React.FC<{ node: FileNode; depth: number }> = ({ node, depth }) => {
  const [isOpen, setIsOpen] = useState(true);

  if (node.type === 'file') {
    return (
      <div className="flex items-center gap-3 py-2 pl-3 hover:bg-zinc-50 transition-colors cursor-default group border-l-2 border-transparent hover:border-blue-500">
        <svg className="w-4 h-4 text-zinc-400 group-hover:text-blue-600 transition-colors shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="text-sm font-semibold text-zinc-700 tracking-tight truncate">{node.name}</span>
      </div>
    );
  }

  return (
    <div className="">
      <div
        className="flex items-center gap-3 py-2 cursor-pointer hover:bg-zinc-50 transition-all select-none group border-l-2 border-transparent hover:border-blue-500"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg className={`w-3 h-3 transition-transform duration-200 ${isOpen ? 'rotate-90' : 'rotate-0'} text-zinc-300 shrink-0`} fill="currentColor" viewBox="0 0 24 24">
          <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
        </svg>
        <svg className="w-5 h-5 text-amber-500 group-hover:text-amber-600 transition-colors shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
        </svg>
        <span className="text-sm font-bold text-zinc-800 tracking-tight">{node.name}</span>
      </div>
      {isOpen && node.children && (
        <div className="ml-5 pl-1.5 border-l-2 border-zinc-100 flex flex-col">
          {node.children.map((child, index) => (
            <FileTreeNode key={`${child.name}-${index}`} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

export const FileTree: React.FC<FileTreeProps> = ({ tree }) => {
  return (
    <div className="w-full h-full bg-white flex flex-col">
      <div className="flex-1 p-4 overflow-y-auto custom-scrollbar font-sans">
        {tree?.map((node, index) => (
          <FileTreeNode key={`${node.name}-${index}`} node={node} depth={0} />
        ))}
      </div>
    </div>
  );
};
