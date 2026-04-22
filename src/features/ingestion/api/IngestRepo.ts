import apiClient from '@/api/Client';
import { IngestionResponse } from '../types';

export const ingestRepository = async (
  repoUrl: string, 
  githubToken?: string | null, 
  mode?: string,
  userInfo?: any
): Promise<IngestionResponse> => {
  const body: Record<string, any> = { repo_url: repoUrl };
  if (githubToken) body.github_token = githubToken;
  if (mode) body.mode = mode;
  if (userInfo) body.user_info = userInfo;

  const { data } = await apiClient.post<IngestionResponse>('/ingest/', body);
  return data;
};
