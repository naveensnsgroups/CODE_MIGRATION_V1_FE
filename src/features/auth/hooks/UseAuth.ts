import { useState, useEffect, useCallback } from 'react';
import { AuthResponse, User } from '../types';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('auth_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const handleLogin = useCallback((response: AuthResponse) => {
    localStorage.setItem('auth_token', response.access_token);
    localStorage.setItem('auth_user', JSON.stringify(response.user));
    
    // Sync workbench mode
    if (response.user.default_mode) {
      localStorage.setItem('workbench_mode', response.user.default_mode);
    }
    
    setUser(response.user);
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    localStorage.removeItem('workbench_mode');
    setUser(null);
    window.location.href = "/"; // Force total refresh and clean URL
  }, []);

  const signup = useCallback(async (data: any) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:8000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.detail || 'Registration failed');
      handleLogin(result);
      return result;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [handleLogin]);

  const login = useCallback(async (data: any) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:8000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.detail || 'Login failed');
      handleLogin(result);
      return result;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [handleLogin]);

  const processCallback = useCallback(async (code: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:8000/api/auth/callback?code=${code}`);
      if (!response.ok) throw new Error('GitHub authentication failed');
      
      // The callback currently returns a RedirectResponse which the browser follows.
      // But in app/page.tsx, it's captured from searchParams.
      // We might need a separate client-side exchange if we want to change this flow.
      // For now, keeping as is but ensuring types match.
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    user,
    loading,
    error,
    signup,
    login,
    processCallback,
    handleLogin,
    handleLogout,
  };
};
