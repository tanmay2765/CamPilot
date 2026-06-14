import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/react+tanstack__react-query.mjs";
import { a as campaignsApi } from "./endpoints-zM8uB21C.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/use-campaigns-NzVi7Vzt.js
function useCampaigns() {
	return useQuery({
		queryKey: ["campaigns"],
		queryFn: () => campaignsApi.list(),
		staleTime: 15e3
	});
}
function useCampaignAnalytics(campaignId) {
	return useQuery({
		queryKey: [
			"campaign",
			campaignId,
			"analytics"
		],
		queryFn: () => campaignsApi.getAnalytics(campaignId),
		enabled: campaignId !== null,
		staleTime: 3e4,
		retry: 1
	});
}
function useGenerateCampaign() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (data) => campaignsApi.generate(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["campaigns"] });
		}
	});
}
function useExecuteCampaign() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (campaignId) => campaignsApi.execute(campaignId),
		onSuccess: (_data, campaignId) => {
			queryClient.invalidateQueries({ queryKey: ["campaigns"] });
			queryClient.invalidateQueries({ queryKey: [
				"campaign",
				campaignId,
				"analytics"
			] });
			queryClient.invalidateQueries({ queryKey: ["dashboard"] });
		}
	});
}
//#endregion
export { useGenerateCampaign as i, useCampaigns as n, useExecuteCampaign as r, useCampaignAnalytics as t };
