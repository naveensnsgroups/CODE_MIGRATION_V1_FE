'use client';

import React, { useState } from 'react';
import { FileNode } from '../types';

interface FileTreeProps {
  tree: FileNode[];
}

const FileTreeNode: React.FC<{ node: FileNode }> = ({ node }) => {
  const [isOpen, setIsOpen] = useState(true);

  if (node.type === 'file') {
    return (
      <div className="flex items-center gap-2.5 py-1.5 pl-6 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors cursor-default group">
        <span className="text-[10px] text-zinc-300 dark:text-zinc-600 group-hover:text-blue-500 transition-colors">
          ●
        </span>
        <span className="text-sm font-medium tracking-tight truncate">{node.name}</span>
      </div>
    );
  }

  return (
    <div className="pl-4">
      <div
        className="flex items-center gap-2.5 py-1.5 cursor-pointer text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 transition-all select-none group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={`text-[8px] transition-transform duration-200 ${isOpen ? 'rotate-90' : 'rotate-0'} text-zinc-400`}>
          ▶
        </span>
        <span className="text-xs font-semibold tracking-widest uppercase opacity-40 group-hover:opacity-100 transition-opacity">
          Dir
        </span>
        <span className="text-sm font-semibold tracking-tight">{node.name}</span>
      </div>
      {isOpen && node.children && (
        <div className="border-l border-zinc-100 dark:border-zinc-800 ml-1.5 mt-0.5 mb-1 space-y-0.5">
          {node.children.map((child, index) => (
            <FileTreeNode key={`${child.name}-${index}`} node={child} />
          ))}
        </div>
      )}
    </div>
  );
};

export const FileTree: React.FC<FileTreeProps> = ({ tree }) => {
  return (
    <div className="w-full h-full bg-background border border-border rounded-2xl shadow-lg overflow-hidden flex flex-col">
      <div className="px-6 py-4 bg-secondary/30 flex items-center justify-between">
        <h3 className="text-sm font-semibold uppercase tracking-widest opacity-40">
          Explorer
        </h3>
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-muted font-semibold uppercase">
          Ready
        </span>
      </div>
      <div className="flex-1 p-6 overflow-y-auto scrollbar-hide font-sans">
        {tree?.map((node, index) => (
          <FileTreeNode key={`${node.name}-${index}`} node={node} />
        ))}
      </div>
    </div>
  );
};
