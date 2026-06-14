import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { campaignsApi } from "@/lib/api/endpoints";
import type { CampaignGenerateRequest } from "@/lib/api/types";

export function useCampaigns() {
  return useQuery({
    queryKey: ["campaigns"],
    queryFn: () => campaignsApi.list(),
    staleTime: 15_000,
  });
}

export function useCampaignAnalytics(campaignId: number | null) {
  return useQuery({
    queryKey: ["campaign", campaignId, "analytics"],
    queryFn: () => campaignsApi.getAnalytics(campaignId!),
    enabled: campaignId !== null,
    staleTime: 30_000,
    retry: 1,
  });
}

export function useGenerateCampaign() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CampaignGenerateRequest) => campaignsApi.generate(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["campaigns"] });
    },
  });
}

export function useExecuteCampaign() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (campaignId: number) => campaignsApi.execute(campaignId),
    onSuccess: (_data, campaignId) => {
      queryClient.invalidateQueries({ queryKey: ["campaigns"] });
      queryClient.invalidateQueries({ queryKey: ["campaign", campaignId, "analytics"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
}
