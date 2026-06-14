import { i as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { A as LoaderCircle, O as Mail, S as PenLine, T as MessageSquare, V as CircleCheck, c as Target, h as Send, o as TriangleAlert, r as Users, t as Zap, u as Sparkles } from "../_libs/lucide-react.mjs";
import { i as SectionCard, n as Badge, t as AppLayout } from "./endpoints-C90kIyEf.mjs";
import { i as useGenerateCampaign, r as useExecuteCampaign } from "./use-campaigns-5CNO2yAQ.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/copilot-kxCGtAZA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var examples = [
	"Increase repeat purchases from mid-tier customers",
	"Re-engage dormant customers from the last 90 days",
	"Upsell premium products to High Value segment",
	"Increase order frequency for weekend buyers"
];
function CopilotPage() {
	const [prompt, setPrompt] = (0, import_react.useState)("");
	const [result, setResult] = (0, import_react.useState)(null);
	const [editing, setEditing] = (0, import_react.useState)(false);
	const generateMutation = useGenerateCampaign();
	const executeMutation = useExecuteCampaign();
	function generate() {
		if (!prompt.trim()) {
			toast.error("Add a business goal to continue");
			return;
		}
		setResult(null);
		generateMutation.mutate({ goal: prompt }, {
			onSuccess: (data) => {
				setResult(data);
				if (data.status === "fallback") toast.warning("AI was unavailable — used fallback strategy", { description: "The campaign was created with safe defaults. You can edit it before launching." });
				else toast.success("Campaign generated successfully!");
			},
			onError: (err) => {
				toast.error("Campaign generation failed", { description: err.message });
			}
		});
	}
	function execute() {
		if (!result) return;
		executeMutation.mutate(result.campaign_id, {
			onSuccess: (data) => {
				toast.success("Campaign executed", { description: `Sent to ${data.audience_size.toLocaleString("en-IN")} customers. ${data.events_created} delivery events created.` });
			},
			onError: (err) => {
				toast.error("Execution failed", { description: err.message });
			}
		});
	}
	const isGenerating = generateMutation.isPending;
	const isExecuting = executeMutation.isPending;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppLayout, {
		title: "AI Campaign Copilot",
		subtitle: "Generate complete campaign strategies with one prompt",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative overflow-hidden rounded-[32px] border border-border bg-card p-8 md:p-12 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-primary/40 blur-3xl" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute -bottom-24 -right-12 h-72 w-72 rounded-full bg-[color:var(--color-surface-alt)] blur-3xl" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "inline-flex items-center gap-2 rounded-full surface-alt px-3 py-1.5 text-[11px] font-semibold",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5" }), " Powered by Gemini"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-4 text-[34px] font-bold leading-tight tracking-tight md:text-[44px]",
								children: "Generate CRM Campaigns with AI"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mx-auto mt-3 max-w-xl text-[15px] text-muted-foreground",
								children: "Describe your business goal and let AI create a complete campaign strategy — audience, content, channel, and predicted outcomes."
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 grid grid-cols-1 gap-5 lg:grid-cols-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionCard, {
					className: "lg:col-span-8",
					title: "Describe your goal",
					subtitle: "Be specific — segment, outcome, timing",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						value: prompt,
						onChange: (e) => setPrompt(e.target.value),
						placeholder: "e.g. Re-engage dormant customers who haven't purchased in 90 days and recover at least ₹15L this month.",
						className: "min-h-[140px] w-full resize-none rounded-2xl border border-border bg-background p-4 text-[14px] outline-none transition-shadow focus:shadow-[0_0_0_4px_rgba(244,210,77,0.25)]"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-[11px] text-muted-foreground",
							children: [prompt.length, " characters"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: generate,
							disabled: isGenerating,
							className: "inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-[14px] font-bold text-primary-foreground transition-transform hover:-translate-y-0.5 disabled:opacity-60",
							children: [isGenerating ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4" }), isGenerating ? "Generating…" : "Generate Campaign"]
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
					className: "lg:col-span-4",
					title: "Example prompts",
					subtitle: "Tap to fill the box",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-2",
						children: examples.map((ex) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setPrompt(ex),
							className: "w-full rounded-2xl border border-border bg-card px-4 py-3 text-left text-[13px] transition-colors hover:bg-muted/60",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "mr-2 inline h-3.5 w-3.5 text-primary" }), ex]
						}) }, ex))
					})
				})]
			}),
			isGenerating && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
				className: "mt-6",
				title: "Working on it…",
				subtitle: "CamPilot AI is composing your campaign",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-3",
					children: [
						"Analyzing Customer Data...",
						"Identifying Best Segment...",
						"Generating Campaign Strategy...",
						"Optimizing Messaging...",
						"Finalizing Recommendations..."
					].map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center gap-3 text-[13.5px]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid h-7 w-7 place-items-center rounded-full bg-primary text-primary-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-semibold",
							children: s
						})]
					}, s))
				})
			}),
			generateMutation.isError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
				className: "mt-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border border-destructive/30 bg-destructive/5 p-6 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "mx-auto h-6 w-6 text-destructive" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 text-[14px] font-semibold text-destructive",
							children: "Campaign generation failed"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-[12px] text-muted-foreground",
							children: generateMutation.error?.message ?? "Please try again."
						})
					]
				})
			}),
			result && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 grid grid-cols-1 gap-5 lg:grid-cols-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionCard, {
					className: "lg:col-span-5",
					title: "Audience & Reasoning",
					subtitle: "Selected by AI based on your goal",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl bg-primary p-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-4 w-4" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-2 text-[10px] font-semibold uppercase",
										children: "Segment"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[20px] font-bold",
										children: result.selected_segment.segment_name
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl bg-muted/60 p-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, { className: "h-4 w-4" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-2 text-[10px] font-semibold uppercase text-muted-foreground",
										children: "Audience size"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[20px] font-bold",
										children: result.segment_stats.audience_size.toLocaleString("en-IN")
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 rounded-2xl border border-border p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[11px] font-semibold uppercase tracking-wider text-muted-foreground",
								children: "Segment Stats"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 grid grid-cols-2 gap-2 text-[13px]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["Avg Spend: ", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-semibold",
									children: ["₹", result.segment_stats.average_spend.toLocaleString("en-IN")]
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["Avg Orders: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold",
									children: result.segment_stats.average_orders.toFixed(1)
								})] })]
							})]
						}),
						result.status === "fallback" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 rounded-2xl border border-yellow-400/40 bg-yellow-50 p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[11px] font-semibold uppercase tracking-wider text-yellow-700",
								children: "⚠ Fallback Mode"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-[13px] text-yellow-800",
								children: "AI was unavailable. This is a safe default campaign. You can edit all fields before launching."
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionCard, {
					className: "lg:col-span-7",
					title: "Campaign content",
					subtitle: "Edit any field before launch",
					right: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setEditing((e) => !e),
						className: "inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 text-[11px] font-semibold",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PenLine, { className: "h-3 w-3" }),
							" ",
							editing ? "Done" : "Edit"
						]
					}),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Campaign name",
									value: result.campaign.campaign_name,
									editing,
									onChange: (v) => setResult({
										...result,
										campaign: {
											...result.campaign,
											campaign_name: v
										}
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Subject line",
									value: result.campaign.subject_line,
									editing,
									onChange: (v) => setResult({
										...result,
										campaign: {
											...result.campaign,
											subject_line: v
										}
									}),
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-3.5 w-3.5" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Message",
									value: result.campaign.message,
									editing,
									onChange: (v) => setResult({
										...result,
										campaign: {
											...result.campaign,
											message: v
										}
									}),
									multiline: true,
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "h-3.5 w-3.5" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "CTA",
										value: result.campaign.cta,
										editing,
										onChange: (v) => setResult({
											...result,
											campaign: {
												...result.campaign,
												cta: v
											}
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Channel",
										value: result.campaign.recommended_channel,
										editing,
										onChange: (v) => setResult({
											...result,
											campaign: {
												...result.campaign,
												recommended_channel: v
											}
										})
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center gap-3 pt-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											tone: "dark",
											children: result.campaign.recommended_channel
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											tone: result.status === "fallback" ? "yellow" : "green",
											children: result.status === "fallback" ? "Fallback" : "AI Generated"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
											tone: "dark",
											children: ["Campaign #", result.campaign_id]
										})
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: execute,
							disabled: isExecuting,
							className: "mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-secondary px-6 py-3.5 text-[14px] font-bold text-secondary-foreground transition-transform hover:-translate-y-0.5 disabled:opacity-60",
							children: [isExecuting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "h-4 w-4" }), isExecuting ? "Executing…" : "Execute Campaign"]
						}),
						executeMutation.isSuccess && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 flex items-center gap-2 rounded-2xl bg-[color:var(--color-success)]/10 p-3 text-[13px] font-semibold text-[color:var(--color-success)]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4" }),
								"Campaign executed — ",
								executeMutation.data.events_created,
								" events sent to ",
								executeMutation.data.audience_size,
								" customers"
							]
						})
					]
				})]
			})
		]
	});
}
function Field({ label, value, editing, onChange, multiline, icon }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border border-border bg-card p-3.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground",
			children: [icon, label]
		}), editing ? multiline ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
			value,
			onChange: (e) => onChange(e.target.value),
			rows: 3,
			className: "mt-1 w-full resize-none bg-transparent text-[13.5px] outline-none"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			value,
			onChange: (e) => onChange(e.target.value),
			className: "mt-1 w-full bg-transparent text-[13.5px] font-semibold outline-none"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: ["mt-1 text-[13.5px]", multiline ? "" : "font-semibold"].join(" "),
			children: value
		})]
	});
}
//#endregion
export { CopilotPage as component };
