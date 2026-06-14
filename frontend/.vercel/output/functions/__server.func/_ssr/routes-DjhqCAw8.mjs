import { a as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as LoaderCircle, E as Megaphone, G as Bot, N as IndianRupee, a as Trophy, d as ShoppingCart, i as UserPlus, k as MailCheck, q as ArrowUpRight, r as Users, t as Zap, u as Sparkles, v as ReceiptText, y as Plus } from "../_libs/lucide-react.mjs";
import { i as SectionCard, r as KpiCard, t as AppLayout } from "./endpoints-C90kIyEf.mjs";
import { a as revenueTrend, o as useDashboardSummary, t as activities } from "./use-dashboard-BLEiF2bA.mjs";
import { n as num, t as inr } from "./utils-D3up8z9V.mjs";
import { a as YAxis, d as Pie, f as Cell, m as Tooltip, n as PieChart, o as XAxis, p as ResponsiveContainer, s as Area, t as AreaChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DjhqCAw8.js
var import_jsx_runtime = require_jsx_runtime();
function Dashboard() {
	const { data: summary, isLoading, isError } = useDashboardSummary();
	const totalCustomers = summary?.customers ?? 0;
	const segmentPieData = (summary ? [
		{
			name: "High Value",
			value: summary.segments["High Value"],
			color: "var(--color-chart-1)"
		},
		{
			name: "Medium Value",
			value: summary.segments["Medium Value"],
			color: "var(--color-chart-2)"
		},
		{
			name: "Low Value",
			value: summary.segments["Low Value"],
			color: "var(--color-chart-3)"
		},
		{
			name: "Dormant",
			value: summary.segments["Dormant"],
			color: "var(--color-chart-4)"
		}
	] : []).map((s) => ({
		...s,
		pct: totalCustomers > 0 ? Math.round(s.value / totalCustomers * 100) : 0
	}));
	const avgOrderValue = summary && summary.orders > 0 ? Math.round(summary.total_revenue / summary.orders) : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppLayout, {
		title: "Welcome back, Tanmay 👋",
		subtitle: "Here's what's happening across your CRM today.",
		children: [
			isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-center py-20",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-8 w-8 animate-spin text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "ml-3 text-[14px] text-muted-foreground",
					children: "Loading dashboard data…"
				})]
			}),
			isError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-[24px] border border-destructive/30 bg-destructive/5 p-8 text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-[16px] font-semibold text-destructive",
					children: "Failed to load dashboard"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-[13px] text-muted-foreground",
					children: "Could not connect to the backend. Please check your connection and try again."
				})]
			}),
			summary && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-4 md:grid-cols-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
							label: "Total Customers",
							value: num(summary.customers),
							delta: 12.4,
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-5 w-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
							label: "Total Orders",
							value: num(summary.orders),
							delta: 8.1,
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, { className: "h-5 w-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
							label: "Total Revenue",
							value: inr(summary.total_revenue),
							delta: 18.7,
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IndianRupee, { className: "h-5 w-5" }),
							accent: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
							label: "Avg. Order Value",
							value: inr(avgOrderValue),
							delta: 3.2,
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReceiptText, { className: "h-5 w-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
							label: "Total Campaigns",
							value: summary.campaigns,
							delta: 6.5,
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Megaphone, { className: "h-5 w-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
							label: "Delivery Events",
							value: num(summary.delivery_events),
							delta: 4.2,
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "h-5 w-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
							label: "Segments",
							value: "4",
							delta: 0,
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-5 w-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
							label: "Largest Segment",
							value: Object.entries(summary.segments).sort(([, a], [, b]) => b - a)[0]?.[0] ?? "—",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "h-5 w-5" })
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 grid grid-cols-1 gap-5 lg:grid-cols-12",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionCard, {
						className: "lg:col-span-8",
						title: "Revenue Overview",
						subtitle: "Monthly revenue performance · Last 12 months",
						right: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1 rounded-full bg-[color:var(--color-success)]/12 px-2.5 py-1 text-[11px] font-semibold text-[color:var(--color-success)]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "h-3 w-3" }), " +18.7%"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								className: "rounded-full border border-border bg-card px-3 py-1.5 text-[12px] font-medium outline-none",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Last 12 months" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Last 6 months" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Last 30 days" })
								]
							})]
						}),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-1 flex items-baseline gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[36px] font-bold tracking-tight",
								children: inr(summary.total_revenue)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[13px] text-muted-foreground",
								children: "total over period"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 h-[280px] w-full",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
								data: revenueTrend,
								margin: {
									left: -20,
									right: 8,
									top: 8,
									bottom: 0
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
										id: "rev",
										x1: "0",
										y1: "0",
										x2: "0",
										y2: "1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
											offset: "0%",
											stopColor: "#F4D24D",
											stopOpacity: .6
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
											offset: "100%",
											stopColor: "#F4D24D",
											stopOpacity: .02
										})]
									}) }),
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
										tickFormatter: (v) => `₹${v / 1e5}L`
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
										contentStyle: {
											borderRadius: 12,
											border: "1px solid #E7E4DD",
											boxShadow: "0 8px 24px rgba(0,0,0,0.06)"
										},
										formatter: (v) => [inr(v), "Revenue"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
										type: "monotone",
										dataKey: "revenue",
										stroke: "#2C2C2C",
										strokeWidth: 2.5,
										fill: "url(#rev)"
									})
								]
							}) })
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionCard, {
						className: "lg:col-span-4",
						title: "Customer Distribution",
						subtitle: "By segment value",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative mx-auto h-[200px] w-[200px]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PieChart, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pie, {
								data: segmentPieData,
								innerRadius: 62,
								outerRadius: 92,
								dataKey: "value",
								paddingAngle: 3,
								stroke: "none",
								children: segmentPieData.map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: [
									"#F4D24D",
									"#2C2C2C",
									"#22C55E",
									"#7CA6F0"
								][i] }, i))
							}) }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "pointer-events-none absolute inset-0 grid place-items-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[22px] font-bold leading-tight",
										children: num(totalCustomers)
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[11px] text-muted-foreground",
										children: "customers"
									})]
								})
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 space-y-2",
							children: segmentPieData.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between text-[13px]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "h-2.5 w-2.5 rounded-full",
										style: { background: [
											"#F4D24D",
											"#2C2C2C",
											"#22C55E",
											"#7CA6F0"
										][i] }
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-medium",
										children: s.name
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: num(s.value)
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "w-9 text-right font-semibold",
										children: [s.pct, "%"]
									})]
								})]
							}, s.name))
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 grid grid-cols-1 gap-5 lg:grid-cols-12",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "lg:col-span-7",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "card-hover relative overflow-hidden rounded-[24px] bg-primary p-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -right-12 -top-12 h-48 w-48 rounded-full bg-white/20 blur-2xl" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -bottom-16 -right-4 h-44 w-44 rounded-full bg-black/10 blur-2xl" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "inline-flex items-center gap-2 rounded-full bg-black/10 px-3 py-1 text-[11px] font-semibold",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5" }), " AI Recommendation · Powered by Gemini"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
											className: "mt-4 text-[24px] font-bold leading-tight tracking-tight md:text-[28px]",
											children: [
												"Re-engage ",
												num(summary.segments["Dormant"]),
												" dormant customers with a personalised win-back flow"
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "mt-2 max-w-xl text-[14px] text-foreground/75",
											children: [
												"Based on your CRM data, dormant customers respond best to WhatsApp with a 10% reward. Total revenue to recover: ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-semibold text-foreground",
													children: inr(summary.total_revenue * .12)
												}),
												"."
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-5 flex flex-wrap items-center gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
												to: "/copilot",
												className: "inline-flex items-center gap-2 rounded-full bg-secondary px-5 py-2.5 text-[13px] font-semibold text-secondary-foreground transition-transform hover:-translate-y-0.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4" }), " Generate Campaign"]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
												to: "/segments",
												className: "inline-flex items-center gap-2 rounded-full bg-white/70 px-5 py-2.5 text-[13px] font-semibold text-foreground transition-colors hover:bg-white",
												children: "View segment"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mt-5 grid grid-cols-3 gap-3",
											children: [
												{
													k: "Segment",
													v: "Dormant"
												},
												{
													k: "Audience",
													v: num(summary.segments["Dormant"])
												},
												{
													k: "Channel",
													v: "WhatsApp"
												}
											].map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "rounded-2xl bg-white/55 px-4 py-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "text-[10px] font-semibold uppercase tracking-wider text-foreground/60",
													children: x.k
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "mt-0.5 text-[16px] font-bold",
													children: x.v
												})]
											}, x.k))
										})
									]
								})
							]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
						className: "lg:col-span-5",
						title: "Recent Activity",
						subtitle: "Live events across the platform",
						right: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "text-[12px] font-semibold text-muted-foreground hover:text-foreground",
							children: "View all"
						}),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "space-y-3",
							children: activities.map((a, i) => {
								const Icon = a.type === "customer" ? UserPlus : a.type === "order" ? ShoppingCart : a.type === "campaign" ? MailCheck : Bot;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-start gap-3 rounded-2xl p-2 transition-colors hover:bg-muted/60",
									children: [a.avatar ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: a.avatar,
										alt: "",
										className: "h-9 w-9 shrink-0 rounded-full object-cover"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: ["grid h-9 w-9 shrink-0 place-items-center rounded-full", a.type === "campaign" ? "bg-[color:var(--color-success)]/15 text-[color:var(--color-success)]" : "bg-primary text-primary-foreground"].join(" "),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0 flex-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "truncate text-[13px] font-medium",
											children: a.text
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-[11px] text-muted-foreground",
											children: a.time
										})]
									})]
								}, i);
							})
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 grid grid-cols-1 gap-4 md:grid-cols-3",
					children: [
						{
							label: "Add new customer",
							icon: UserPlus,
							to: "/customers"
						},
						{
							label: "Generate campaign with AI",
							icon: Sparkles,
							to: "/copilot"
						},
						{
							label: "View analytics report",
							icon: Plus,
							to: "/analytics"
						}
					].map(({ label, icon: Icon, to }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to,
						className: "card-hover flex items-center justify-between rounded-[24px] border border-border bg-card p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid h-10 w-10 place-items-center rounded-2xl surface-alt",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[14px] font-semibold",
								children: label
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "h-4 w-4 text-muted-foreground" })]
					}, label))
				})
			] })
		]
	});
}
//#endregion
export { Dashboard as component };
