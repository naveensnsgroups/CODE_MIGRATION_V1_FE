import { useState } from 'react';
import { ingestRepository } from '../api/IngestRepo';
import { IngestionResponse } from '../types';

export const useIngestion = () => {
  const [data, setData] = useState<IngestionResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startIngestion = async (repoUrl: string, mode?: string, userInfo?: any) => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('auth_token');
      const response = await ingestRepository(repoUrl, token, mode, userInfo);
      setData(response);
    } catch (err: any) {
      //  Surgical Error Extraction (Catching FastAPI HTTPException detail)
      const detail = err.response?.data?.detail || err.message || 'An error occurred during ingestion.';
      setError(detail);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setData(null);
    setError(null);
    setLoading(false);
  };

  return {
    data,
    loading,
    error,
    startIngestion,
    reset,
  };
};
