import { a as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { A as LoaderCircle, C as MousePointerClick, h as Send, k as MailCheck, o as TriangleAlert, r as Users } from "../_libs/lucide-react.mjs";
import { i as SectionCard, r as KpiCard, t as AppLayout } from "./endpoints-C90kIyEf.mjs";
import { i as openRateTrend, n as channelPerformance, o as useDashboardSummary, r as ctrTrend } from "./use-dashboard-BLEiF2bA.mjs";
import { n as num } from "./utils-D3up8z9V.mjs";
import { n as useCampaigns } from "./use-campaigns-5CNO2yAQ.mjs";
import { a as YAxis, l as CartesianGrid, m as Tooltip, o as XAxis, p as ResponsiveContainer, r as BarChart, s as Area, t as AreaChart, u as Bar } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/analytics-D5srFKUJ.js
var import_jsx_runtime = require_jsx_runtime();
function AnalyticsPage() {
	const { data: summary, isLoading: summaryLoading } = useDashboardSummary();
	const { data: campaigns, isLoading: campaignsLoading } = useCampaigns();
	const isLoading = summaryLoading || campaignsLoading;
	const totalDelivered = summary?.delivery_events ?? 0;
	const totalCampaigns = summary?.campaigns ?? 0;
	const segmentDistribution = summary ? [
		{
			name: "High Value",
			value: summary.segments["High Value"],
			color: "#F4D24D"
		},
		{
			name: "Medium Value",
			value: summary.segments["Medium Value"],
			color: "#2C2C2C"
		},
		{
			name: "Low Value",
			value: summary.segments["Low Value"],
			color: "#22C55E"
		},
		{
			name: "Dormant",
			value: summary.segments["Dormant"],
			color: "#7CA6F0"
		}
	] : [];
	const totalCustomers = summary?.customers ?? 0;
	const funnel = [
		{
			label: "Total Customers",
			value: totalCustomers,
			pct: 100
		},
		{
			label: "Campaigns Sent",
			value: totalCampaigns,
			pct: totalCustomers > 0 ? Math.round(totalCampaigns / totalCustomers * 100) : 0
		},
		{
			label: "Delivery Events",
			value: totalDelivered,
			pct: totalCustomers > 0 ? Math.round(totalDelivered / totalCustomers * 100) : 0
		}
	];
	const completedCampaigns = campaigns?.filter((c) => c.status === "completed") ?? [];
	const draftCampaigns = campaigns?.filter((c) => c.status === "draft") ?? [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppLayout, {
		title: "Analytics",
		subtitle: "Measure delivery, engagement, and business impact",
		children: [isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-center py-20",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-8 w-8 animate-spin text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "ml-3 text-[14px] text-muted-foreground",
				children: "Loading analytics…"
			})]
		}), !isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-4 md:grid-cols-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
						label: "Customers",
						value: num(totalCustomers),
						delta: 6.3,
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-5 w-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
						label: "Campaigns",
						value: num(totalCampaigns),
						delta: 7.1,
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "h-5 w-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
						label: "Delivered Events",
						value: num(totalDelivered),
						delta: 11.2,
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MailCheck, { className: "h-5 w-5" }),
						accent: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
						label: "Completed",
						value: num(completedCampaigns.length),
						delta: 9.7,
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MousePointerClick, { className: "h-5 w-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
						label: "Drafts",
						value: num(draftCampaigns.length),
						delta: -2.4,
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-5 w-5" })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 grid grid-cols-1 gap-5 lg:grid-cols-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
					className: "lg:col-span-5",
					title: "Platform overview",
					subtitle: "Key metrics funnel",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-3",
						children: funnel.map((f, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl border border-border p-4",
							style: {
								width: `${100 - i * 15}%`,
								marginLeft: `${i * 7}%`
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[13px] font-semibold",
										children: f.label
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-[12px] text-muted-foreground",
										children: [f.pct, "%"]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-2 flex items-end justify-between",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[22px] font-bold tracking-tight",
										children: num(f.value)
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-2 h-2 w-full overflow-hidden rounded-full bg-muted",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-full rounded-full bg-primary",
										style: { width: `${Math.min(f.pct, 100)}%` }
									})
								})
							]
						}, f.label))
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-5 lg:col-span-7",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-1 gap-5 md:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
							title: "Open rate trend",
							subtitle: "Last 7 days",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-[180px]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
									data: openRateTrend,
									margin: {
										left: -20,
										right: 8
									},
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
											id: "op",
											x1: "0",
											y1: "0",
											x2: "0",
											y2: "1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
												offset: "0%",
												stopColor: "#F4D24D",
												stopOpacity: .7
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
												offset: "100%",
												stopColor: "#F4D24D",
												stopOpacity: .05
											})]
										}) }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
											dataKey: "day",
											tick: { fontSize: 11 },
											axisLine: false,
											tickLine: false
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
											tick: { fontSize: 11 },
											axisLine: false,
											tickLine: false
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
											borderRadius: 12,
											border: "1px solid #E7E4DD"
										} }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
											type: "monotone",
											dataKey: "rate",
											stroke: "#2C2C2C",
											strokeWidth: 2.5,
											fill: "url(#op)"
										})
									]
								}) })
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
							title: "CTR trend",
							subtitle: "Last 7 days",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-[180px]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
									data: ctrTrend,
									margin: {
										left: -20,
										right: 8
									},
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
											id: "ctr",
											x1: "0",
											y1: "0",
											x2: "0",
											y2: "1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
												offset: "0%",
												stopColor: "#22C55E",
												stopOpacity: .6
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
												offset: "100%",
												stopColor: "#22C55E",
												stopOpacity: .05
											})]
										}) }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
											dataKey: "day",
											tick: { fontSize: 11 },
											axisLine: false,
											tickLine: false
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
											tick: { fontSize: 11 },
											axisLine: false,
											tickLine: false
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
											borderRadius: 12,
											border: "1px solid #E7E4DD"
										} }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
											type: "monotone",
											dataKey: "rate",
											stroke: "#22C55E",
											strokeWidth: 2.5,
											fill: "url(#ctr)"
										})
									]
								}) })
							})
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
						title: "Channel performance",
						subtitle: "Delivered, open rate and CTR by channel",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-[220px]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
								data: channelPerformance,
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
										dataKey: "channel",
										tick: { fontSize: 11 },
										axisLine: false,
										tickLine: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
										tick: { fontSize: 11 },
										axisLine: false,
										tickLine: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
										borderRadius: 12,
										border: "1px solid #E7E4DD"
									} }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
										dataKey: "openRate",
										fill: "#F4D24D",
										radius: [
											10,
											10,
											0,
											0
										],
										name: "Open rate %"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
										dataKey: "ctr",
										fill: "#2C2C2C",
										radius: [
											10,
											10,
											0,
											0
										],
										name: "CTR %"
									})
								]
							}) })
						})
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
				className: "mt-6",
				title: "Segment performance",
				subtitle: "Customer distribution by segment",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-1 gap-4 md:grid-cols-4",
					children: segmentDistribution.map((s) => {
						const total = segmentDistribution.reduce((a, b) => a + b.value, 0);
						const pct = total > 0 ? s.value / total * 100 : 0;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl border border-border p-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[13px] font-semibold",
										children: s.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "h-2.5 w-2.5 rounded-full",
										style: { background: s.color }
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-3 text-[22px] font-bold",
									children: num(s.value)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-[11px] text-muted-foreground",
									children: [
										"customers · ",
										pct.toFixed(1),
										"%"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-3 h-1.5 w-full overflow-hidden rounded-full bg-muted",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-full rounded-full",
										style: {
											width: `${pct}%`,
											background: s.color
										}
									})
								})
							]
						}, s.name);
					})
				})
			})
		] })]
	});
}
//#endregion
export { AnalyticsPage as component };
