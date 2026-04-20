import { useQuery } from "@tanstack/react-query";
import { AdminService } from "@/services/adminService";

export const useDashboard = () => {
  /**
   * Get Dashboard Stats
   * Auto-fetch on mount, refresh setiap 30 detik
   */
  const {
    data: dashboardData,
    isLoading,
    isError,
    error,
    refetch: refreshDashboard,
  } = useQuery({
    queryKey: ["admin", "dashboard-stats"],
    queryFn: AdminService.getDashboardStats,
    refetchInterval: 30000, // Refresh setiap 30 detik
  });

  // Extract nested data dari response API
  const stats = dashboardData?.data ?? null;

  return {
    // Raw response
    stats,
    isLoading,
    isError,
    error,

    // Extracted data untuk kemudahan akses
    totalQueue: stats?.total_queue ?? 0,
    totalQueueDiff: stats?.total_queue_diff ?? 0,
    avgServiceTime: stats?.avg_service_time ?? 0,
    avgServiceTimeDiff: stats?.avg_service_time_diff ?? 0,
    skipRate: stats?.skip_rate ?? 0,
    skipRateDiff: stats?.skip_rate_diff ?? 0,
    counterPerformance: stats?.counter_performance ?? [],
    busyHours: stats?.busy_hours ?? [],
    serviceComposition: stats?.service_composition ?? [],

    // Actions
    refreshDashboard,
  };
};
