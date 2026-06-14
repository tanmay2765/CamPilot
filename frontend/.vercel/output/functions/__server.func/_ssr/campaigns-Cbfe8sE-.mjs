import { i as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as LoaderCircle, C as MousePointerClick, F as Eye, b as Play, h as Send, k as MailCheck, o as TriangleAlert, y as Plus } from "../_libs/lucide-react.mjs";
import { i as SectionCard, n as Badge, t as AppLayout, u as segmentTone } from "./endpoints-zM8uB21C.mjs";
import { n as num } from "./utils-D3up8z9V.mjs";
import { n as useCampaigns, r as useExecuteCampaign, t as useCampaignAnalytics } from "./use-campaigns-NzVi7Vzt.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/campaigns-Cbfe8sE-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CampaignsPage() {
	const { data: campaigns, isLoading, isError } = useCampaigns();
	const [selectedId, setSelectedId] = (0, import_react.useState)(null);
	const selected = campaigns?.find((c) => c.id === selectedId) ?? campaigns?.[0] ?? null;
	const { data: analytics, isLoading: analyticsLoading } = useCampaignAnalytics(selected?.status === "completed" ? selected.id : null);
	const executeMutation = useExecuteCampaign();
	const activeCampaigns = campaigns?.filter((c) => c.status === "draft" || c.status === "completed") ?? [];
	function handleExecute() {
		if (!selected) return;
		executeMutation.mutate(selected.id, {
			onSuccess: (data) => {
				toast.success("Campaign executed", { description: `${data.events_created} delivery events created for ${data.audience_size} customers.` });
			},
			onError: (err) => {
				toast.error("Execution failed", { description: err.message });
			}
		});
	}
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppLayout, {
		title: "Campaigns",
		subtitle: "Loading campaigns…",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-center py-20",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-8 w-8 animate-spin text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "ml-3 text-[14px] text-muted-foreground",
				children: "Loading campaigns…"
			})]
		})
	});
	if (isError) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppLayout, {
		title: "Campaigns",
		subtitle: "Error",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-[24px] border border-destructive/30 bg-destructive/5 p-8 text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "mx-auto h-8 w-8 text-destructive" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 text-[16px] font-semibold text-destructive",
				children: "Failed to load campaigns"
			})]
		})
	});
	const list = campaigns ?? [];
	if (list.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppLayout, {
		title: "Campaigns",
		subtitle: "No campaigns yet",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/copilot",
			className: "inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-[12px] font-semibold text-primary-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " Generate with AI"]
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-[24px] border border-border bg-muted/30 p-12 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-[18px] font-semibold",
					children: "No campaigns created yet"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-[13px] text-muted-foreground",
					children: "Use the AI Copilot to generate your first campaign."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/copilot",
					className: "mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-[13px] font-semibold text-primary-foreground",
					children: "Generate Campaign"
				})
			]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppLayout, {
		title: "Campaigns",
		subtitle: `${list.length} total · ${activeCampaigns.length} active`,
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/copilot",
			className: "inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-[12px] font-semibold text-primary-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " New Campaign"]
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-1 gap-5 lg:grid-cols-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
				className: "lg:col-span-7",
				title: "All campaigns",
				subtitle: "Click a row to view detail",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-hidden rounded-2xl border border-border",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-left text-[13px]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "bg-muted/60 text-[11px] uppercase tracking-wider text-muted-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: [
								"Name",
								"Segment",
								"Channel",
								"Status",
								"Created"
							].map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-semibold",
								children: h
							}, h)) })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: list.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							onClick: () => setSelectedId(c.id),
							className: ["cursor-pointer border-t border-border transition-colors hover:bg-muted/40", selected?.id === c.id ? "bg-[color:var(--color-surface-alt)]" : ""].join(" "),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "px-4 py-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-semibold",
										children: c.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-[11px] text-muted-foreground",
										children: ["#", c.id]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										tone: segmentTone(c.segment_name),
										children: c.segment_name
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										tone: "default",
										children: c.channel
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										tone: c.status === "completed" ? "green" : c.status === "draft" ? "yellow" : "blue",
										children: c.status
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3 text-muted-foreground text-[11px]",
									children: c.created_at ? new Date(c.created_at).toLocaleDateString() : "—"
								})
							]
						}, c.id)) })]
					})
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-5 lg:col-span-5",
				children: selected && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionCard, {
					title: selected.name,
					subtitle: `#${selected.id} · ${selected.created_at ? new Date(selected.created_at).toLocaleDateString() : "—"}`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									tone: segmentTone(selected.segment_name),
									children: selected.segment_name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									tone: "default",
									children: selected.channel
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									tone: selected.status === "completed" ? "green" : "yellow",
									children: selected.status
								})
							]
						}),
						selected.subject_line && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 rounded-2xl border border-border p-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[10px] font-semibold uppercase text-muted-foreground",
								children: "Subject"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 text-[13px] font-semibold",
								children: selected.subject_line
							})]
						}),
						selected.message && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 rounded-2xl border border-border p-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[10px] font-semibold uppercase text-muted-foreground",
								children: "Message"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 text-[13px]",
								children: selected.message
							})]
						}),
						selected.status === "completed" && analyticsLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 flex items-center justify-center py-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-5 w-5 animate-spin text-primary" })
						}),
						analytics && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 grid grid-cols-2 gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "h-4 w-4" }),
									label: "Sent",
									value: num(analytics.total_sent)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MailCheck, { className: "h-4 w-4" }),
									label: "Opened",
									value: `${num(analytics.opened)} (${analytics.open_rate_percentage}%)`
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MousePointerClick, { className: "h-4 w-4" }),
									label: "Clicked",
									value: `${num(analytics.clicked)} (${analytics.click_rate_percentage}%)`
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-4 w-4" }),
									label: "Delivered",
									value: num(analytics.delivered)
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex items-center gap-2",
							children: [selected.status === "draft" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: handleExecute,
								disabled: executeMutation.isPending,
								className: "inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-[12px] font-semibold text-primary-foreground disabled:opacity-60",
								children: [executeMutation.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "h-3.5 w-3.5" }), "Execute"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: "inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-[12px] font-semibold",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-3.5 w-3.5" }), " Preview"]
							})]
						})
					]
				})
			})]
		})
	});
}
function Stat({ icon, label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl bg-muted/60 p-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-muted-foreground",
				children: icon
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-1.5 text-[20px] font-bold leading-tight",
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-[11px] text-muted-foreground",
				children: label
			})
		]
	});
}
//#endregion
export { CampaignsPage as component };
