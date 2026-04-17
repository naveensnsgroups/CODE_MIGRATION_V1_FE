'use client';

import React, { useState, useEffect } from 'react';
import {
    Code,
    X,
    Copy,
    CheckCircle2,
    Loader2,
    AlertTriangle,
    ArrowLeft,
    FileCode
} from 'lucide-react';
import apiClient from '../../../api/Client';

interface CodeViewerProps {
    projectId: string;
    filePath: string;
    onClose: () => void;
}

export const CodeViewer: React.FC<CodeViewerProps> = ({ projectId, filePath, onClose }) => {
    const [fileData, setFileData] = useState<{ content: string; type: 'text' | 'image' | 'binary' } | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                setLoading(true);
                const response = await apiClient.get(`ingest/${projectId}/file`, {
                    params: { path: filePath }
                });
                if (response.data) {
                    setFileData({
                        content: response.data.content || '',
                        type: response.data.type || 'text'
                    });
                }
            } catch (err: any) {
                console.error('Failed to fetch file content:', err);
                setError(err.response?.data?.detail || 'Terminal access denied or file not found.');
            } finally {
                setLoading(false);
            }
        };

        fetchContent();
    }, [projectId, filePath]);

    const handleCopy = () => {
        if (!fileData?.content || fileData.type !== 'text') return;
        navigator.clipboard.writeText(fileData.content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex flex-col h-full bg-zinc-950 border-2 border-zinc-950 rounded-sm shadow-[6px_6px_0px_0px_rgba(9,9,11,1)] overflow-hidden animate-in fade-in zoom-in-95 duration-300">
            {/* ── Console Header ── */}
            <div className="bg-zinc-950 px-6 py-4 flex items-center justify-between border-b border-zinc-800">
                <div className="flex items-center gap-4">
                    <button
                        onClick={onClose}
                        title="Back to Explorer"
                        className="p-1 text-zinc-500 hover:text-amber-400 transition-colors group"
                    >
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    </button>
                    <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                            <FileCode size={13} className="text-amber-400" />
                            <span className="text-[12px] font-semibold text-white uppercase tracking-widest italic leading-none">Source Terminal</span>
                        </div>
                        <p className="font-mono text-[11px] text-zinc-400 uppercase tracking-relaxed">{filePath}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    {fileData?.type === 'text' && (
                        <button
                            onClick={handleCopy}
                            disabled={!fileData.content}
                            className="p-2 text-zinc-400 hover:text-amber-500 transition-colors disabled:opacity-30"
                            title="Copy Source"
                        >
                            {copied ? <CheckCircle2 size={14} className="text-emerald-500" /> : <Copy size={14} />}
                        </button>
                    )}
                    <button
                        onClick={onClose}
                        className="p-2 text-zinc-400 hover:text-red-500 transition-colors"
                        title="Close Port"
                    >
                        <X size={14} />
                    </button>
                </div>
            </div>

            {/* ── Console Content ── */}
            <div className="flex-1 overflow-auto bg-zinc-950 p-6 scroller-industrial flex items-start justify-center">
                {loading ? (
                    <div className="h-full w-full flex flex-col items-center justify-center gap-4">
                        <Loader2 className="w-8 h-8 text-amber-500 animate-spin" strokeWidth={1.5} />
                        <p className="text-[11px] font-bold text-zinc-600 uppercase tracking-[0.3em] animate-pulse">Streaming Asset Payload...</p>
                    </div>
                ) : error ? (
                    <div className="h-full w-full flex flex-col items-center justify-center gap-4 text-center p-8">
                        <div className="w-12 h-12 bg-red-500/10 border border-red-500/20 rounded-sm flex items-center justify-center text-red-500">
                            <AlertTriangle size={24} />
                        </div>
                        <div className="space-y-1">
                            <p className="text-xs font-bold text-white uppercase tracking-widest italic">{error}</p>
                            <p className="text-[11px] text-zinc-500 uppercase tracking-tighter">Please verify the asset path in the project explorer.</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="mt-4 px-4 py-2 bg-zinc-900 border border-zinc-800 text-[11px] font-bold text-white uppercase tracking-widest rounded-sm hover:border-zinc-700 transition-all"
                        >
                            Return to Explorer
                        </button>
                    </div>
                ) : fileData?.type === 'image' ? (
                    <div className="h-full flex flex-col items-center justify-center gap-6 p-12">
                        <div className="p-4 bg-zinc-900 border-2 border-zinc-800 rounded-sm shadow-[8px_8px_0px_0px_rgba(0,0,0,0.5)] group transition-all">
                            <img
                                src={`data:image/*;base64,${fileData.content}`}
                                alt={filePath}
                                className="max-w-full max-h-[400px] object-contain group-hover:scale-[1.02] transition-transform duration-500"
                            />
                        </div>
                        <div className="space-y-1 text-center">
                            <span className="text-[12px] font-bold text-white uppercase tracking-widest italic leading-none">Visual Asset Preview</span>
                            <p className="text-[11px] font-mono text-zinc-500 uppercase tracking-tighter">Rendered via Base64 Industrial Port</p>
                        </div>
                    </div>
                ) : fileData?.type === 'binary' ? (
                    <div className="h-full w-full flex flex-col items-center justify-center gap-4 text-center">
                        <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-sm flex items-center justify-center text-zinc-500">
                            <FileCode size={24} />
                        </div>
                        <div className="space-y-1">
                            <p className="text-xs font-bold text-white uppercase tracking-widest italic">Binary Asset Locked</p>
                            <p className="text-[11px] text-zinc-500 uppercase tracking-tighter">This file format is not supported for visual rendering.</p>
                        </div>
                    </div>
                ) : (
                    <pre className="w-full font-mono text-[11px] leading-relaxed text-zinc-300 selection:bg-amber-400 selection:text-zinc-950 whitespace-pre-wrap break-all">
                        {fileData?.content}
                    </pre>
                )}
            </div>

            {/* ── Console Footer ── */}
            <div className="bg-zinc-950 px-6 py-2 border-t border-zinc-900 flex items-center justify-between">
                <span className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest italic">Terminal Mode: READ_ONLY</span>
                <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500/50" />
                    <div className="w-2 h-2 rounded-full bg-amber-400/50" />
                    <div className="w-2 h-2 rounded-full bg-emerald-500/50" />
                </div>
            </div>
        </div>
    );
};
