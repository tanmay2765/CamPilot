import { useQuery } from "@tanstack/react-query";
import { segmentsApi } from "@/lib/api/endpoints";

export function useSegmentStats() {
  return useQuery({
    queryKey: ["segments", "stats"],
    queryFn: () => segmentsApi.getStats(),
    staleTime: 60_000, // 1 minute — segment data changes infrequently
  });
}
