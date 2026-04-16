import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QueueService } from "@/services/queueServices";

export const useQueue = () => {
  const queryClient = useQueryClient();

  /**
   * Get Queue State
   */
  const {
    data: queueState,
    isLoading: isStateLoading,
    refetch: refreshQueueState,
  } = useQuery({
    queryKey: ["queue", "state"],
    queryFn: QueueService.getState,
    refetchInterval: false,
  });

  /**
   * Get Services
   */
  const {
    data: services,
    isLoading: isServicesLoading,
  } = useQuery({
    queryKey: ["queue", "services"],
    queryFn: QueueService.getServices,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  /**
   * Take Queue Mutation
   */
  const takeQueueMutation = useMutation({
    mutationFn: QueueService.takeQueue,
    onSuccess: () => {
      queryClient.invalidateQueries(["queue", "state"]);
    },
  });

  return {
    // Data
    queueState,
    services,
    
    // Loading states
    isStateLoading,
    isServicesLoading,
    isTakingQueue: takeQueueMutation.isPending,

    // Actions
    refreshQueueState,
    takeQueue: takeQueueMutation.mutateAsync,
    
    // Mutation object (for error handling)
    takeQueueMutation,
  };
};