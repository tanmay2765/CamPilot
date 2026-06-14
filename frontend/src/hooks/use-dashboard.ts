import { useQuery } from "@tanstack/react-query";
import { dashboardApi } from "@/lib/api/endpoints";

export function useDashboardSummary() {
  return useQuery({
    queryKey: ["dashboard", "summary"],
    queryFn: () => dashboardApi.getSummary(),
    staleTime: 30_000, // 30 seconds
  });
}
