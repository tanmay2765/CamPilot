import { i as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link, l as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { E as Megaphone, H as ChevronRight, J as ArrowDownRight, K as Bell, M as Layers, W as ChartColumn, Y as Activity, d as ShoppingCart, g as Search, j as LayoutDashboard, l as Sun, p as Settings, q as ArrowUpRight, r as Users, u as Sparkles, w as Moon } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/endpoints-zM8uB21C.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var nav = [
	{
		to: "/",
		label: "Dashboard",
		icon: LayoutDashboard
	},
	{
		to: "/customers",
		label: "Customers",
		icon: Users
	},
	{
		to: "/orders",
		label: "Orders",
		icon: ShoppingCart
	},
	{
		to: "/segments",
		label: "Segments",
		icon: Layers
	},
	{
		to: "/copilot",
		label: "AI Copilot",
		icon: Sparkles
	},
	{
		to: "/campaigns",
		label: "Campaigns",
		icon: Megaphone
	},
	{
		to: "/analytics",
		label: "Analytics",
		icon: ChartColumn
	},
	{
		to: "/health",
		label: "System Health",
		icon: Activity
	}
];
function AppLayout({ children, title, subtitle, actions }) {
	const path = useRouterState({ select: (s) => s.location.pathname });
	const [dark, setDark] = (0, import_react.useState)(false);
	const current = nav.find((n) => n.to === "/" ? path === "/" : path.startsWith(n.to));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen bg-background",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-[1600px] gap-6 p-4 lg:p-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "sticky top-6 hidden h-[calc(100vh-3rem)] w-[260px] shrink-0 flex-col rounded-[32px] border border-border bg-card p-5 shadow-[0_4px_20px_rgba(0,0,0,0.04)] lg:flex",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2.5 px-2 pb-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid h-10 w-10 place-items-center rounded-2xl bg-primary text-primary-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {
								className: "h-5 w-5",
								strokeWidth: 2.4
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "leading-tight",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[17px] font-bold tracking-tight",
								children: "CamPilot"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[11px] font-medium text-muted-foreground",
								children: "AI-native CRM"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						className: "flex-1 space-y-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground",
							children: "Workspace"
						}), nav.map((item) => {
							const active = item.to === "/" ? path === "/" : path.startsWith(item.to);
							const Icon = item.icon;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: item.to,
								className: ["group flex items-center gap-3 rounded-2xl px-3 py-2.5 text-[14px] font-medium transition-all", active ? "bg-secondary text-secondary-foreground shadow-[0_4px_14px_rgba(0,0,0,0.18)]" : "text-foreground/70 hover:bg-muted"].join(" "),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
										className: ["h-[18px] w-[18px] transition-transform group-hover:scale-110", active ? "" : "text-foreground/60"].join(" "),
										strokeWidth: 2
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "flex-1",
										children: item.label
									}),
									active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4 opacity-70" })
								]
							}, item.to);
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 rounded-2xl surface-alt p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-[12px] font-semibold",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5" }), " AI Credits"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 text-[22px] font-bold tracking-tight",
								children: "8,420"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[11px] text-muted-foreground",
								children: "Refreshes in 12 days"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/60",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-full w-[68%] rounded-full bg-secondary" })
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex items-center justify-between rounded-2xl border border-border p-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2.5 pl-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop&crop=faces",
								alt: "User",
								className: "h-9 w-9 rounded-full object-cover"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "leading-tight",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[13px] font-semibold",
									children: "Tanmay D."
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[11px] text-muted-foreground",
									children: "Admin"
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setDark((d) => !d),
							className: "grid h-9 w-9 place-items-center rounded-xl text-foreground/60 transition-colors hover:bg-muted",
							"aria-label": "Toggle theme",
							children: dark ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "h-4 w-4" })
						})]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[12px] font-semibold uppercase tracking-[0.14em] text-muted-foreground",
								children: current?.label ?? "Workspace"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "mt-1 truncate text-[28px] font-bold leading-tight tracking-tight md:text-[34px]",
								children: title ?? "Welcome back, Tanmay 👋"
							}),
							subtitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-[14px] text-muted-foreground",
								children: subtitle
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "hidden items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 md:flex",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-4 w-4 text-muted-foreground" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										placeholder: "Search customers, campaigns…",
										className: "w-64 bg-transparent text-[13px] outline-none placeholder:text-muted-foreground"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
										className: "rounded-md bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground",
										children: "⌘K"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: "relative grid h-11 w-11 place-items-center rounded-full border border-border bg-card transition-colors hover:bg-muted",
								"aria-label": "Notifications",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "h-[18px] w-[18px]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-primary" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "grid h-11 w-11 place-items-center rounded-full border border-border bg-card transition-colors hover:bg-muted",
								"aria-label": "Settings",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "h-[18px] w-[18px]" })
							}),
							actions
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "animate-fade-up",
					children
				})]
			})]
		})
	});
}
function KpiCard({ label, value, delta, icon, accent }) {
	const positive = (delta ?? 0) >= 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: ["card-hover group relative overflow-hidden rounded-[24px] border border-border p-5", accent ? "bg-primary text-primary-foreground" : "bg-card"].join(" "),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: ["grid h-10 w-10 place-items-center rounded-2xl", accent ? "bg-black/10" : "bg-muted"].join(" "),
				children: icon
			}), typeof delta === "number" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: ["flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-semibold", positive ? accent ? "bg-black/15 text-foreground" : "bg-[color:var(--color-success)]/12 text-[color:var(--color-success)]" : "bg-destructive/10 text-destructive"].join(" "),
				children: [
					positive ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "h-3 w-3" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDownRight, { className: "h-3 w-3" }),
					Math.abs(delta).toFixed(1),
					"%"
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: ["text-[28px] font-bold tracking-tight md:text-[32px]", accent ? "" : ""].join(" "),
				children: value
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: ["mt-1 text-[13px]", accent ? "text-foreground/70" : "text-muted-foreground"].join(" "),
				children: label
			})]
		})]
	});
}
function SectionCard({ title, subtitle, right, children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: ["rounded-[24px] border border-border bg-card p-5 shadow-[0_4px_20px_rgba(0,0,0,0.04)]", className ?? ""].join(" "),
		children: [(title || right) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex items-start justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [title && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "truncate text-[17px] font-semibold tracking-tight",
					children: title
				}), subtitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-0.5 text-[12px] text-muted-foreground",
					children: subtitle
				})]
			}), right]
		}), children]
	});
}
function Badge({ children, tone = "default" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: ["inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold", {
			default: "bg-muted text-foreground/70",
			yellow: "bg-[color:var(--color-surface-alt)] text-foreground",
			green: "bg-[color:var(--color-success)]/12 text-[color:var(--color-success)]",
			red: "bg-destructive/10 text-destructive",
			blue: "bg-[color:var(--color-info)]/12 text-[color:var(--color-info)]",
			dark: "bg-secondary text-secondary-foreground"
		}[tone]].join(" "),
		children
	});
}
function segmentTone(seg) {
	return seg === "High Value" ? "yellow" : seg === "Medium Value" ? "blue" : seg === "Low Value" ? "green" : "red";
}
var BASE_URL = "/api";
var ApiError = class extends Error {
	status;
	statusText;
	body;
	constructor(status, statusText, body) {
		super(`API Error ${status}: ${statusText}`);
		this.status = status;
		this.statusText = statusText;
		this.body = body;
		this.name = "ApiError";
	}
};
async function handleResponse(response) {
	if (!response.ok) {
		let body;
		try {
			body = await response.json();
		} catch {
			body = await response.text();
		}
		throw new ApiError(response.status, response.statusText, body);
	}
	return response.json();
}
function buildUrl(path, params) {
	const fullPath = `${BASE_URL}${path}`;
	const searchParams = new URLSearchParams();
	if (params) Object.entries(params).forEach(([key, value]) => {
		if (value !== void 0 && value !== null && value !== "") searchParams.set(key, String(value));
	});
	const qs = searchParams.toString();
	return qs ? `${fullPath}?${qs}` : fullPath;
}
var apiClient = {
	async get(path, params) {
		const url = buildUrl(path, params);
		return handleResponse(await fetch(url, { headers: { Accept: "application/json" } }));
	},
	async post(path, body) {
		return handleResponse(await fetch(`${BASE_URL}${path}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json"
			},
			body: body ? JSON.stringify(body) : void 0
		}));
	}
};
var dashboardApi = { getSummary: () => apiClient.get("/dashboard/summary") };
var customersApi = {
	list: (params) => apiClient.get("/customers", params),
	getSummary: (customerId) => apiClient.get(`/customers/${customerId}/summary`),
	getMetrics: (customerId) => apiClient.get(`/customers/${customerId}/metrics`),
	getOrders: (customerId) => apiClient.get(`/customers/${customerId}/orders`)
};
var ordersApi = { list: (params) => apiClient.get("/orders", params) };
var campaignsApi = {
	list: () => apiClient.get("/campaigns"),
	generate: (data) => apiClient.post("/campaigns/generate", data),
	execute: (campaignId) => apiClient.post(`/campaigns/${campaignId}/execute`),
	getAnalytics: (campaignId) => apiClient.get(`/campaigns/${campaignId}/analytics`)
};
var segmentsApi = { getStats: () => apiClient.get("/segments/stats") };
var healthApi = { check: () => apiClient.get("/health") };
//#endregion
export { campaignsApi as a, healthApi as c, segmentsApi as d, SectionCard as i, ordersApi as l, Badge as n, customersApi as o, KpiCard as r, dashboardApi as s, AppLayout as t, segmentTone as u };
