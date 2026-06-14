import { useQuery } from "@tanstack/react-query";
import { customersApi } from "@/lib/api/endpoints";

export function useCustomers(params?: {
  search?: string;
  segment?: string;
  page?: number;
  limit?: number;
}) {
  return useQuery({
    queryKey: ["customers", params],
    queryFn: () => customersApi.list(params),
    staleTime: 15_000,
  });
}

export function useCustomerSummary(customerId: number | null) {
  return useQuery({
    queryKey: ["customer", customerId, "summary"],
    queryFn: () => customersApi.getSummary(customerId!),
    enabled: customerId !== null,
    staleTime: 30_000,
  });
}

export function useCustomerMetrics(customerId: number | null) {
  return useQuery({
    queryKey: ["customer", customerId, "metrics"],
    queryFn: () => customersApi.getMetrics(customerId!),
    enabled: customerId !== null,
    staleTime: 30_000,
  });
}

export function useCustomerOrders(customerId: number | null) {
  return useQuery({
    queryKey: ["customer", customerId, "orders"],
    queryFn: () => customersApi.getOrders(customerId!),
    enabled: customerId !== null,
    staleTime: 15_000,
  });
}
