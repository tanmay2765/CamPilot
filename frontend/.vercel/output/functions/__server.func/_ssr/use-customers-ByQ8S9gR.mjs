import { n as useQuery } from "../_libs/react+tanstack__react-query.mjs";
import { o as customersApi } from "./endpoints-C90kIyEf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/use-customers-ByQ8S9gR.js
function useCustomers(params) {
	return useQuery({
		queryKey: ["customers", params],
		queryFn: () => customersApi.list(params),
		staleTime: 15e3
	});
}
function useCustomerSummary(customerId) {
	return useQuery({
		queryKey: [
			"customer",
			customerId,
			"summary"
		],
		queryFn: () => customersApi.getSummary(customerId),
		enabled: customerId !== null,
		staleTime: 3e4
	});
}
function useCustomerOrders(customerId) {
	return useQuery({
		queryKey: [
			"customer",
			customerId,
			"orders"
		],
		queryFn: () => customersApi.getOrders(customerId),
		enabled: customerId !== null,
		staleTime: 15e3
	});
}
//#endregion
export { useCustomerSummary as n, useCustomers as r, useCustomerOrders as t };
