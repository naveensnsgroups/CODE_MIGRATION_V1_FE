import { useState, useEffect } from 'react';
import { exchangeCodeForToken } from '../api/GithubAuth';
import { AuthResponse, GithubUser } from '../types';

export const useAuth = () => {
  const [user, setUser] = useState<GithubUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('auth_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const handleLogin = (response: AuthResponse) => {
    localStorage.setItem('auth_token', response.access_token);
    localStorage.setItem('auth_user', JSON.stringify(response.user));
    setUser(response.user);
  };

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    setUser(null);
  };

  const processCallback = async (code: string) => {
    setLoading(true);
    try {
      // Direct GET callback to backend which handles token exchange
      const response = await fetch(`http://localhost:8000/api/auth/callback?code=${code}`);
      const data = await response.json();
      
      if (data.access_token) {
        localStorage.setItem('auth_token', data.access_token);
        localStorage.setItem('auth_user', JSON.stringify(data.user));
        setUser(data.user);
        return data;
      }
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
