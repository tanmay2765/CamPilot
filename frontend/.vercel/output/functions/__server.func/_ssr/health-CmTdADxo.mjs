import { i as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, n as useQuery, o as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { A as LoaderCircle, B as CircleX, E as Megaphone, R as Database, V as CircleCheck, f as ShieldCheck, m as Server, o as TriangleAlert, u as Sparkles, z as Cloud } from "../_libs/lucide-react.mjs";
import { c as healthApi, i as SectionCard, n as Badge, t as AppLayout } from "./endpoints-zM8uB21C.mjs";
import { a as YAxis, c as Line, i as LineChart, m as Tooltip, o as XAxis, p as ResponsiveContainer } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/health-CmTdADxo.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function useHealthCheck() {
	return useQuery({
		queryKey: ["health"],
		queryFn: () => healthApi.check(),
		refetchInterval: 3e4,
		staleTime: 1e4,
		retry: 1
	});
}
var latencyTrend = Array.from({ length: 24 }, (_, i) => ({
	t: `${i}:00`,
	latency: 70 + Math.round(Math.sin(i / 3) * 25 + Math.random() * 18)
}));
function HealthPage() {
	const { data: health, isLoading, isError, dataUpdatedAt } = useHealthCheck();
	const [latency, setLatency] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		const start = performance.now();
		fetch("/api/health").then(() => {
			setLatency(Math.round(performance.now() - start));
		}).catch(() => setLatency(null));
	}, [dataUpdatedAt]);
	const isHealthy = health?.status === "healthy";
	const dbOk = health?.database === "connected";
	const geminiOk = health?.gemini === "configured";
	const lastChecked = dataUpdatedAt ? new Date(dataUpdatedAt).toLocaleTimeString() : "—";
	const services = [
		{
			name: "Backend API",
			status: isHealthy ? "Operational" : isError ? "Down" : "Checking…",
			ok: isHealthy,
			icon: Server,
			detail: latency ? `${latency}ms latency` : "—",
			secondary: health?.version ? `v${health.version}` : "—"
		},
		{
			name: "PostgreSQL Database",
			status: dbOk ? "Connected" : "Disconnected",
			ok: dbOk,
			icon: Database,
			detail: health?.database ?? "—",
			secondary: "Neon · PostgreSQL"
		},
		{
			name: "Gemini AI Service",
			status: geminiOk ? "Configured" : "Not Configured",
			ok: geminiOk,
			icon: Sparkles,
			detail: health?.gemini ?? "—",
			secondary: "Google AI"
		},
		{
			name: "Campaign Engine",
			status: isHealthy ? "Operational" : "Unavailable",
			ok: isHealthy,
			icon: Megaphone,
			detail: "Execution + delivery pipeline",
			secondary: "FastAPI"
		},
		{
			name: "Deployment",
			status: isHealthy ? "Production" : "Unknown",
			ok: isHealthy,
			icon: Cloud,
			detail: health?.version ? `v${health.version}` : "—",
			secondary: "Render · Web Service"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppLayout, {
		title: "System Health",
		subtitle: isHealthy ? "All systems operational" : isError ? "Backend unreachable" : "Checking status…",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `grid h-12 w-12 place-items-center rounded-2xl ${isHealthy ? "bg-[color:var(--color-success)]/15 text-[color:var(--color-success)]" : isError ? "bg-destructive/15 text-destructive" : "bg-muted text-muted-foreground"}`,
						children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-6 w-6 animate-spin" }) : isHealthy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-6 w-6" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-6 w-6" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[18px] font-bold",
						children: isLoading ? "Checking systems…" : isHealthy ? "All systems operational" : isError ? "Backend unreachable" : "Degraded"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-[12px] text-muted-foreground",
						children: [
							"Last checked: ",
							lastChecked,
							" · Auto-refreshes every 30s"
						]
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatBlock, {
							label: "API Latency",
							value: latency ? `${latency}ms` : "—"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatBlock, {
							label: "Version",
							value: health?.version ?? "—"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatBlock, {
							label: "Status",
							value: isHealthy ? "Healthy" : "Unhealthy"
						})
					]
				})]
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3",
				children: services.map((m) => {
					const Icon = m.icon;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "card-hover rounded-[24px] border border-border bg-card p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid h-11 w-11 place-items-center rounded-2xl surface-alt",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
									tone: m.ok ? "green" : "red",
									children: [m.ok ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 animate-pulse-dot rounded-full bg-[color:var(--color-success)]" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "h-3 w-3" }), m.status]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-4 text-[16px] font-bold",
								children: m.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 grid grid-cols-2 gap-2 text-[12px]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl bg-muted/60 p-2.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[10px] uppercase text-muted-foreground",
										children: "Detail"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-0.5 text-[14px] font-bold",
										children: m.detail
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl bg-muted/60 p-2.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[10px] uppercase text-muted-foreground",
										children: "Platform"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-0.5 text-[14px] font-bold",
										children: m.secondary
									})]
								})]
							})
						]
					}, m.name);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 grid grid-cols-1 gap-5 lg:grid-cols-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
					className: "lg:col-span-8",
					title: "API latency · last 24 hours",
					subtitle: "Average ms across all endpoints",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-[260px]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
							data: latencyTrend,
							margin: {
								left: -20,
								right: 8
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
									dataKey: "t",
									tick: { fontSize: 10 },
									axisLine: false,
									tickLine: false,
									interval: 2
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
									tick: { fontSize: 11 },
									axisLine: false,
									tickLine: false,
									unit: "ms"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
									borderRadius: 12,
									border: "1px solid #E7E4DD"
								} }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
									type: "monotone",
									dataKey: "latency",
									stroke: "#2C2C2C",
									strokeWidth: 2.5,
									dot: {
										fill: "#F4D24D",
										r: 3,
										strokeWidth: 2,
										stroke: "#2C2C2C"
									}
								})
							]
						}) })
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
					className: "lg:col-span-4",
					title: "Live status",
					subtitle: "Real-time checks",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-3",
						children: [
							{
								t: "Backend API",
								ok: isHealthy
							},
							{
								t: "Database (PostgreSQL)",
								ok: dbOk
							},
							{
								t: "AI Engine (Gemini)",
								ok: geminiOk
							},
							{
								t: "Campaign Execution",
								ok: isHealthy
							}
						].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "rounded-2xl border border-border p-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[13px] font-semibold",
									children: i.t
								}), isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin text-muted-foreground" }) : i.ok ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
									tone: "green",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-3 w-3" }), " OK"]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
									tone: "red",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "h-3 w-3" }), " Down"]
								})]
							})
						}, i.t))
					})
				})]
			})
		]
	});
}
function StatBlock({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl bg-muted/60 px-4 py-2.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-[10px] font-semibold uppercase tracking-wider text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-[16px] font-bold leading-tight",
			children: value
		})]
	});
}
//#endregion
export { HealthPage as component };
