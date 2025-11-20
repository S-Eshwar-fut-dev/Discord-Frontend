"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/api";
import { useSessionStore } from "@/store/session";
import type { User } from "@/types/api";

interface UseAuthReturn {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (username: string) => Promise<void>;
  signup: (username: string) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

export function useAuth(): UseAuthReturn {
  const router = useRouter();
  const { user, setUser, logout: clearSession } = useSessionStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Login
  const login = useCallback(
    async (username: string) => {
      setLoading(true);
      setError(null);

      try {
        const response = await apiClient.login(username);
        setUser(response.user);
        router.push("/dashboard");
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : "Login failed";
        setError(errorMsg);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [router, setUser]
  );

  // Signup
  const signup = useCallback(
    async (username: string) => {
      setLoading(true);
      setError(null);

      try {
        const response = await apiClient.signup(username);
        setUser(response.user);
        router.push("/dashboard");
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : "Signup failed";
        setError(errorMsg);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [router, setUser]
  );

  // Logout
  const logout = useCallback(() => {
    apiClient.setToken(null);
    clearSession();
    router.push("/sign-in");
  }, [router, clearSession]);

  // Refresh user data
  const refreshUser = useCallback(async () => {
    const token = apiClient.getToken();
    if (!token) return;

    setLoading(true);
    try {
      const response = await apiClient.getMe();
      setUser(response.user);
    } catch (err) {
      console.error("Failed to refresh user:", err);
      // Token might be invalid, logout
      logout();
    } finally {
      setLoading(false);
    }
  }, [setUser, logout]);

  // Auto-refresh user on mount if token exists
  useEffect(() => {
    const token = apiClient.getToken();
    if (token && !user) {
      refreshUser();
    }
  }, []);

  return {
    user,
    loading,
    error,
    login,
    signup,
    logout,
    refreshUser,
  };
}
