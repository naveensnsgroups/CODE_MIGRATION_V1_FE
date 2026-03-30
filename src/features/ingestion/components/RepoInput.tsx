'use client';

import React, { useState } from 'react';
import { Button } from '@/components/common/Button';

interface RepoInputProps {
  onAnalyze: (url: string) => void;
  loading: boolean;
}

export const RepoInput: React.FC<RepoInputProps> = ({ onAnalyze, loading }) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onAnalyze(url);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-10 bg-background border border-border rounded-2xl shadow-sm transition-all duration-300">
      <div className="mb-8">
        <h2 className="mb-2">Code Migration</h2>
        <p className="text-sm">
          Paste your repository URL to begin deep architectural analysis.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://github.com/organization/repository"
          required
          className="flex-1 bg-secondary/30 border border-border rounded-sm px-4 py-3 text-sm transition-all focus:ring-2 focus:ring-primary/20 focus:border-primary/50 outline-none placeholder:text-muted/50 font-mono text-foreground"
        />
        <Button
          type="submit"
          loading={loading}
          className="px-8"
        >
          Start Migration
        </Button>
      </form>
    </div>
  );
};
