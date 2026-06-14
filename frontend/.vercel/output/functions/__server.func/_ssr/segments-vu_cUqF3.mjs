import { a as require_jsx_runtime, n as useQuery } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as LoaderCircle, N as IndianRupee, c as Target, o as TriangleAlert, q as ArrowUpRight, r as Users, s as TrendingUp, u as Sparkles } from "../_libs/lucide-react.mjs";
import { d as segmentsApi, i as SectionCard, n as Badge, t as AppLayout } from "./endpoints-C90kIyEf.mjs";
import { n as num, t as inr } from "./utils-D3up8z9V.mjs";
import { r as useCustomers } from "./use-customers-ByQ8S9gR.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/segments-vu_cUqF3.js
var import_jsx_runtime = require_jsx_runtime();
function useSegmentStats() {
	return useQuery({
		queryKey: ["segments", "stats"],
		queryFn: () => segmentsApi.getStats(),
		staleTime: 6e4
	});
}
var segmentColors = {
	"High Value": "from-[#F4D24D] to-[#F8E48A]",
	"Medium Value": "from-[#E7E4DD] to-[#F0EFEA]",
	"Low Value": "from-[#DDEFE0] to-[#EAF7EC]",
	"Dormant": "from-[#F0E4E4] to-[#FAEFEF]"
};
var segmentStrategies = {
	"High Value": "Loyalty rewards, early access to new collections, and VIP-only experiences.",
	"Medium Value": "Upsell premium tiers, bundle offers, and personalised category recommendations.",
	"Low Value": "Frequency-driving offers, free shipping thresholds, and category cross-sell.",
	"Dormant": "Reactivation discounts, personalised win-back messaging, survey + reward flow."
};
var segmentDescriptions = {
	"High Value": "Top spenders with high frequency and large basket sizes. Most loyal customers.",
	"Medium Value": "Regular customers with consistent purchases. Strong potential to grow upward.",
	"Low Value": "Occasional buyers with low ticket size. Opportunity for habit-building campaigns.",
	"Dormant": "Have not purchased in 90+ days. Win-back essential before churn."
};
function SegmentsPage() {
	const { data: stats, isLoading, isError } = useSegmentStats();
	const { data: highValueCustomers } = useCustomers({
		segment: "High Value",
		limit: 5
	});
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppLayout, {
		title: "Segments",
		subtitle: "Audience quality, value, and AI-suggested strategies",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-center py-20",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-8 w-8 animate-spin text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "ml-3 text-[14px] text-muted-foreground",
				children: "Loading segment data…"
			})]
		})
	});
	if (isError) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppLayout, {
		title: "Segments",
		subtitle: "Audience quality, value, and AI-suggested strategies",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-[24px] border border-destructive/30 bg-destructive/5 p-8 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "mx-auto h-8 w-8 text-destructive" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 text-[16px] font-semibold text-destructive",
					children: "Failed to load segments"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-[13px] text-muted-foreground",
					children: "Could not connect to the backend."
				})
			]
		})
	});
	const segments = stats ?? [];
	const highValue = segments.find((s) => s.segment_name === "High Value");
	const topCustomers = highValueCustomers?.customers ?? [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppLayout, {
		title: "Segments",
		subtitle: "Audience quality, value, and AI-suggested strategies",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4",
			children: segments.map((s) => {
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: `card-hover relative overflow-hidden rounded-[24px] border border-border bg-gradient-to-br ${segmentColors[s.segment_name] ?? "from-[#E7E4DD] to-[#F0EFEA]"} p-5`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-center justify-between",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								tone: "dark",
								children: s.segment_name
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 text-[34px] font-bold tracking-tight",
							children: num(s.audience_size)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[12px] font-medium text-foreground/65",
							children: "customers"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 grid grid-cols-2 gap-2 text-[12px]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl bg-white/55 p-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[10px] font-semibold uppercase text-foreground/55",
									children: "Avg Spend"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-0.5 text-[14px] font-bold",
									children: inr(s.average_spend)
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl bg-white/55 p-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[10px] font-semibold uppercase text-foreground/55",
									children: "Avg Orders"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-0.5 text-[14px] font-bold",
									children: s.average_orders.toFixed(1)
								})]
							})]
						})
					]
				}, s.segment_name);
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 grid grid-cols-1 gap-5 lg:grid-cols-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionCard, {
				className: "lg:col-span-8",
				title: `High Value · Segment detail`,
				subtitle: segmentDescriptions["High Value"],
				right: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/copilot",
					className: "inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-[12px] font-semibold text-primary-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5" }), " Generate Campaign"]
				}),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-2 gap-3 md:grid-cols-4",
					children: [
						{
							icon: Users,
							label: "Customers",
							value: num(highValue?.audience_size ?? 0)
						},
						{
							icon: IndianRupee,
							label: "Avg Spend",
							value: inr(highValue?.average_spend ?? 0)
						},
						{
							icon: Target,
							label: "Avg Orders",
							value: (highValue?.average_orders ?? 0).toFixed(1)
						},
						{
							icon: TrendingUp,
							label: "Segment",
							value: "High Value"
						}
					].map(({ icon: Icon, label, value }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl bg-muted/60 p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4 text-muted-foreground" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 text-[20px] font-bold",
								children: value
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[11px] text-muted-foreground",
								children: label
							})
						]
					}, label))
				}), topCustomers.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-2 text-[12px] font-semibold uppercase tracking-wider text-muted-foreground",
						children: "Top Customers"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "divide-y divide-border rounded-2xl border border-border",
						children: topCustomers.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center justify-between p-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid h-9 w-9 place-items-center rounded-full bg-primary text-[12px] font-bold text-primary-foreground",
									children: c.name.charAt(0)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[13px] font-semibold",
									children: c.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[11px] text-muted-foreground",
									children: c.email
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[14px] font-bold",
								children: c.city ?? "—"
							})]
						}, c.id))
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionCard, {
				className: "lg:col-span-4",
				title: "Suggested AI Strategy",
				subtitle: "Auto-generated by CamPilot AI",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl bg-primary p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 text-[12px] font-semibold",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4" }), " Strategy · 92% confidence"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-[13.5px] leading-relaxed",
							children: segmentStrategies["High Value"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mt-4 space-y-3 text-[13px]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-start gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" }), "Send VIP early-access invite 48 hours before launch."]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-start gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" }), "Bundle high-margin products with concierge support."]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-start gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" }), "Trigger personalised WhatsApp message at 7pm IST."]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-start gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" }), "Reward repeat purchase within 14 days with loyalty points."]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/copilot",
						className: "mt-5 inline-flex items-center gap-2 text-[12px] font-semibold text-foreground/70 hover:text-foreground",
						children: ["Open in Copilot ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "h-3.5 w-3.5" })]
					})
				]
			})]
		})]
	});
}
//#endregion
export { SegmentsPage as component };
