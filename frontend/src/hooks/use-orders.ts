import { useQuery } from "@tanstack/react-query";
import { ordersApi } from "@/lib/api/endpoints";

export function useOrders(params?: { page?: number; limit?: number }) {
  return useQuery({
    queryKey: ["orders", params],
    queryFn: () => ordersApi.list(params),
    staleTime: 15_000,
  });
}
