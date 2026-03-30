import { useState, useEffect } from 'react';
import { exchangeCodeForToken } from '../api/GithubAuth';
import { AuthResponse, GithubUser } from '../types';

export const useAuth = () => {
  const [user, setUser] = useState<GithubUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('github_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const handleLogin = (response: AuthResponse) => {
    localStorage.setItem('github_token', response.access_token);
    localStorage.setItem('github_user', JSON.stringify(response.user));
    setUser(response.user);
  };

  const handleLogout = () => {
    localStorage.removeItem('github_token');
    localStorage.removeItem('github_user');
    setUser(null);
  };

  const processCallback = async (code: string) => {
    setLoading(true);
    try {
      const response = await exchangeCodeForToken(code);
      handleLogin(response);
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    error,
    processCallback,
    handleLogout,
  };
};
