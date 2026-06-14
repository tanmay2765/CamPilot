import { i as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, n as useQuery, o as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { A as LoaderCircle, H as ChevronRight, N as IndianRupee, U as ChevronLeft, _ as Repeat, d as ShoppingCart, o as TriangleAlert, u as Sparkles } from "../_libs/lucide-react.mjs";
import { i as SectionCard, l as ordersApi, n as Badge, r as KpiCard, t as AppLayout } from "./endpoints-zM8uB21C.mjs";
import { a as revenueTrend, o as useDashboardSummary } from "./use-dashboard-CYfVWpkS.mjs";
import { t as inr } from "./utils-D3up8z9V.mjs";
import { a as YAxis, c as Line, i as LineChart, l as CartesianGrid, m as Tooltip, o as XAxis, p as ResponsiveContainer, r as BarChart, u as Bar } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/orders-Co2yVokz.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function useOrders(params) {
	return useQuery({
		queryKey: ["orders", params],
		queryFn: () => ordersApi.list(params),
		staleTime: 15e3
	});
}
var frequency = [
	{
		bucket: "1 order",
		customers: 6200
	},
	{
		bucket: "2–3 orders",
		customers: 8800
	},
	{
		bucket: "4–6 orders",
		customers: 5400
	},
	{
		bucket: "7–10 orders",
		customers: 2600
	},
	{
		bucket: "10+ orders",
		customers: 1586
	}
];
function OrdersPage() {
	const [page, setPage] = (0, import_react.useState)(1);
	const { data: summary } = useDashboardSummary();
	const { data: ordersData, isLoading, isError } = useOrders({
		page,
		limit: 14
	});
	const orders = ordersData?.orders ?? [];
	const totalPages = ordersData?.pages ?? 1;
	const totalOrders = summary?.orders ?? 0;
	const totalRevenue = summary?.total_revenue ?? 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppLayout, {
		title: "Orders",
		subtitle: "Transaction insights across channels and segments",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-4 md:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
						label: "Total Orders",
						value: totalOrders.toLocaleString("en-IN"),
						delta: 8.1,
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, { className: "h-5 w-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
						label: "Revenue",
						value: inr(totalRevenue),
						delta: 18.7,
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IndianRupee, { className: "h-5 w-5" }),
						accent: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
						label: "Repeat Purchase",
						value: "42.6%",
						delta: 5.4,
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Repeat, { className: "h-5 w-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
						label: "AI Optimised",
						value: "1,840",
						delta: 22,
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-5 w-5" })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 grid grid-cols-1 gap-5 lg:grid-cols-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
					className: "lg:col-span-7",
					title: "Revenue trend",
					subtitle: "Weekly order revenue · last 12 months",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-[260px] w-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
							data: revenueTrend,
							margin: {
								left: -20,
								right: 8
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
									strokeDasharray: "3 3",
									stroke: "#EEEAE0"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
									dataKey: "month",
									stroke: "#9a9a9a",
									tick: { fontSize: 11 },
									axisLine: false,
									tickLine: false
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
									stroke: "#9a9a9a",
									tick: { fontSize: 11 },
									axisLine: false,
									tickLine: false,
									tickFormatter: (v) => `${(v / 1e3).toFixed(0)}`
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
									borderRadius: 12,
									border: "1px solid #E7E4DD"
								} }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
									type: "monotone",
									dataKey: "orders",
									stroke: "#2C2C2C",
									strokeWidth: 2.5,
									dot: {
										fill: "#F4D24D",
										r: 4,
										strokeWidth: 2,
										stroke: "#2C2C2C"
									}
								})
							]
						}) })
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
					className: "lg:col-span-5",
					title: "Purchase frequency",
					subtitle: "Customer order distribution",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-[260px] w-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
							data: frequency,
							margin: {
								left: -20,
								right: 8
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
									dataKey: "bucket",
									stroke: "#9a9a9a",
									tick: { fontSize: 10 },
									axisLine: false,
									tickLine: false
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
									stroke: "#9a9a9a",
									tick: { fontSize: 11 },
									axisLine: false,
									tickLine: false
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
									borderRadius: 12,
									border: "1px solid #E7E4DD"
								} }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
									dataKey: "customers",
									fill: "#F4D24D",
									radius: [
										10,
										10,
										0,
										0
									]
								})
							]
						}) })
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionCard, {
					title: "Recent orders",
					subtitle: `${ordersData?.total ?? 0} total transactions`,
					children: [
						isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-center py-16",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-6 w-6 animate-spin text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ml-3 text-[13px] text-muted-foreground",
								children: "Loading orders…"
							})]
						}),
						isError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl border border-destructive/30 bg-destructive/5 p-6 text-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "mx-auto h-6 w-6 text-destructive" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 text-[14px] font-semibold text-destructive",
								children: "Failed to load orders"
							})]
						}),
						!isLoading && !isError && orders.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl border border-border bg-muted/30 p-10 text-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[16px] font-semibold",
								children: "No orders yet"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-[13px] text-muted-foreground",
								children: "Orders will appear here once customers make purchases."
							})]
						}),
						!isLoading && !isError && orders.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "overflow-hidden rounded-2xl border border-border",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
								className: "w-full text-left text-[13px]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
									className: "bg-muted/60 text-[11px] uppercase tracking-wider text-muted-foreground",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: [
										"Order",
										"Customer",
										"Segment",
										"Amount",
										"Status",
										"Date"
									].map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-4 py-3 font-semibold",
										children: h
									}, h)) })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: orders.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "border-t border-border transition-colors hover:bg-muted/40",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
											className: "px-4 py-3 font-mono text-[11px] text-muted-foreground",
											children: ["#", o.id]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-3",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "grid h-7 w-7 place-items-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground",
													children: o.customer_name.charAt(0)
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-semibold",
													children: o.customer_name
												})]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-3",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
												tone: "default",
												children: o.customer_segment ?? "—"
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-3 font-bold",
											children: inr(o.amount)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-3",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
												tone: o.status === "completed" ? "green" : o.status === "pending" ? "yellow" : "default",
												children: o.status
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-3 text-muted-foreground",
											children: o.created_at ? new Date(o.created_at).toLocaleDateString() : "—"
										})
									]
								}, o.id)) })]
							})
						}), totalPages > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-[12px] text-muted-foreground",
								children: [
									"Page ",
									page,
									" of ",
									totalPages
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setPage((p) => Math.max(1, p - 1)),
									disabled: page <= 1,
									className: "inline-flex items-center gap-1 rounded-full border border-border bg-card px-3 py-2 text-[12px] font-semibold disabled:opacity-40",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-3.5 w-3.5" }), " Prev"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setPage((p) => Math.min(totalPages, p + 1)),
									disabled: page >= totalPages,
									className: "inline-flex items-center gap-1 rounded-full border border-border bg-card px-3 py-2 text-[12px] font-semibold disabled:opacity-40",
									children: ["Next ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-3.5 w-3.5" })]
								})]
							})]
						})] })
					]
				})
			})
		]
	});
}
//#endregion
export { OrdersPage as component };
