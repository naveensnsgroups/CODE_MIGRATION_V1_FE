import apiClient from '@/api/Client';
import { IngestionResponse } from '../types';

export const ingestRepository = async (repoUrl: string): Promise<IngestionResponse> => {
  const { data } = await apiClient.post<IngestionResponse>('/ingest/', {
    repo_url: repoUrl,
  });
  return data;
};
