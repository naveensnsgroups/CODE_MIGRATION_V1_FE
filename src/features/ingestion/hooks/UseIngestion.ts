import { useState } from 'react';
import { ingestRepository } from '../api/IngestRepo';
import { IngestionResponse } from '../types';

export const useIngestion = () => {
  const [data, setData] = useState<IngestionResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startIngestion = async (repoUrl: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await ingestRepository(repoUrl);
      setData(response);
    } catch (err: any) {
      setError(err.message || 'An error occurred during ingestion.');
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    startIngestion,
  };
};
