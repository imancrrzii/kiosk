import { useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAuthStore from "@/stores/authStore";
import { AuthService } from "@/services/authServices";

export const useAuth = () => {
  const {
    token,
    user,
    isAuthenticated,
    isLoading,
    error,
    setAuth,
    setUser,
    setLoading,
    setError,
    clearError,
    logout: logoutStore,
    getToken,
    getUser,
    hasRole,
    hasAnyRole,
  } = useAuthStore();

  /**
   * Login Mutation
   */
  const loginMutation = useMutation({
    mutationFn: ({ username, password }) =>
      AuthService.login(username, password),
    onMutate: () => {
      setLoading(true);
      clearError();
    },
    onSuccess: (data) => {
      setAuth(data.token, data.user);
      setLoading(false);
    },
    onError: (err) => {
      const errorMessage = err.message || "Login gagal. Silakan coba lagi.";
      setError(errorMessage);
      setLoading(false);
    },
  });

  /**
   * Logout Mutation
   * Memanggil API logout ke server sebelum membersihkan state lokal
   */
  const logoutMutation = useMutation({
    mutationFn: AuthService.logout,
    onSettled: () => {
      // Selalu bersihkan state lokal, baik API berhasil atau gagal
      logoutStore();
    },
  });

  /**
   * Login function
   */
  const login = async (username, password) => {
    try {
      await loginMutation.mutateAsync({ username, password });
      return { success: true, user: useAuthStore.getState().user };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  /**
   * Logout function
   * Memanggil API logout dan membersihkan state
   */
  const logout = async () => {
    try {
      await logoutMutation.mutateAsync();
    } catch (err) {
      // Error sudah di-handle di onSettled
      console.error("Logout error:", err);
    }
  };

  /**
   * Fetch User Query
   */
  const { refetch: refetchUser } = useQuery({
    queryKey: ["auth", "me"],
    queryFn: AuthService.me,
    enabled: false, // Manual trigger
    onSuccess: (userData) => {
      setUser(userData);
    },
    onError: (err) => {
      console.error("Failed to refresh user:", err);
      if (err.message?.includes("401") || err.message?.includes("Unauthorized")) {
        logout();
      }
    },
  });

  /**
   * Refresh user data
   */
  const refreshUser = async () => {
    if (!token) return;
    await refetchUser();
  };

  /**
   * Auto-validate token on mount
   */
  useEffect(() => {
    if (token && !user) {
      refreshUser();
    }
  }, [token]);

  return {
    // State
    token,
    user,
    isAuthenticated,
    isLoading: isLoading || loginMutation.isPending || logoutMutation.isPending,
    error,

    // Actions
    login,
    logout,
    refreshUser,
    clearError,

    // Helpers
    getToken,
    getUser,
    hasRole,
    hasAnyRole,
  };
};