import apiClient from '@/api/Client';
import { IngestionResponse } from '../types';

export const ingestRepository = async (repoUrl: string, githubToken?: string | null): Promise<IngestionResponse> => {
  const body: Record<string, string> = { repo_url: repoUrl };
  if (githubToken) body.github_token = githubToken;

  const { data } = await apiClient.post<IngestionResponse>('/ingest/', body);
  return data;
};
