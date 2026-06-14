import { useQuery } from "@tanstack/react-query";
import { healthApi } from "@/lib/api/endpoints";

export function useHealthCheck() {
  return useQuery({
    queryKey: ["health"],
    queryFn: () => healthApi.check(),
    refetchInterval: 30_000, // Auto-refresh every 30 seconds
    staleTime: 10_000,
    retry: 1,
  });
}
