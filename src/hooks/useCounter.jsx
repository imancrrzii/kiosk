import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CounterService } from "@/services/counterServices";

export const useCounter = () => {
  const queryClient = useQueryClient();

  /**
   * Get Counter Status
   */
  const {
    data: counter,
    isLoading,
    refetch: refreshCounter,
  } = useQuery({
    queryKey: ["counter", "status"],
    queryFn: CounterService.getStatus,
    refetchInterval: false,
  });

  /**
   * Counter Login Mutation
   */
  const loginMutation = useMutation({
    mutationFn: CounterService.login,
    onSuccess: () => {
      queryClient.invalidateQueries(["counter", "status"]);
    },
  });

  /**
   * Counter Logout Mutation
   */
  const logoutMutation = useMutation({
    mutationFn: CounterService.logout,
    onSuccess: () => {
      queryClient.invalidateQueries(["counter", "status"]);
    },
  });

  /**
   * Call Next Mutation
   */
  const callNextMutation = useMutation({
    mutationFn: CounterService.callNext,
    onSuccess: () => {
      queryClient.invalidateQueries(["counter", "status"]);
    },
  });

  /**
   * Mark Done Mutation
   */
  const markDoneMutation = useMutation({
    mutationFn: CounterService.markDone,
    onSuccess: () => {
      queryClient.invalidateQueries(["counter", "status"]);
    },
  });

  /**
   * Skip Mutation
   */
  const skipMutation = useMutation({
    mutationFn: CounterService.skip,
    onSuccess: () => {
      queryClient.invalidateQueries(["counter", "status"]);
    },
  });

  /**
   * Recall Mutation
   */
  const recallMutation = useMutation({
    mutationFn: CounterService.recall,
  });

  /**
   * Get Counter Stats
   */
  const { data: stats } = useQuery({
    queryKey: ["counter", "stats"],
    queryFn: CounterService.getStats,
    refetchInterval: 15000, // Refresh every 15 seconds
  });

  return {
    // Data
    counter,
    stats,
    isLoading,

    // Actions
    refreshCounter,
    counterLogin: loginMutation.mutateAsync,
    counterLogout: logoutMutation.mutateAsync,
    callNext: callNextMutation.mutateAsync,
    markDone: markDoneMutation.mutateAsync,
    skip: skipMutation.mutateAsync,
    recall: recallMutation.mutateAsync,

    // Loading states
    isLoginLoading: loginMutation.isPending,
    isCallNextLoading: callNextMutation.isPending,
  };
};