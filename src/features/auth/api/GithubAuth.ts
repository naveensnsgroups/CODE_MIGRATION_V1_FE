import apiClient from '@/api/Client';
import { AuthResponse } from '../types';

export const exchangeCodeForToken = async (code: string): Promise<AuthResponse> => {
  const { data } = await apiClient.get<AuthResponse>(`http://localhost:8000/api/auth/callback?code=${code}`);
  return data;
};

export const getLoginUrl = async (): Promise<string> => {
  return "http://localhost:8000/api/auth/login/github";
};
