import { i as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, o as require_react, r as QueryClientProvider } from "../_libs/react+tanstack__react-query.mjs";
import { c as HeadContent, d as createRouter, f as Outlet, h as createRootRouteWithContext, m as createFileRoute, p as lazyRouteComponent, s as Scripts, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-CnuzTXi-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-C3PoxCBY.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "This route doesn't exist."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "/",
					className: "mt-6 inline-flex rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground",
					children: "Back to dashboard"
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong. Try again."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => {
						router.invalidate();
						reset();
					},
					className: "mt-6 inline-flex rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground",
					children: "Try again"
				})
			]
		})
	});
}
var Route$8 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "CamPilot — AI-native CRM Platform" },
			{
				name: "description",
				content: "CamPilot is an AI-native CRM that helps you segment customers, generate campaigns with AI, execute outreach, and analyze performance."
			},
			{
				property: "og:title",
				content: "CamPilot — AI-native CRM Platform"
			},
			{
				property: "og:description",
				content: "Segment customers, generate AI campaigns, and measure impact in one workspace."
			},
			{
				property: "og:type",
				content: "website"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$8.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(QueryClientProvider, {
		client: queryClient,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
			position: "top-right",
			richColors: true,
			closeButton: true
		})]
	});
}
var $$splitComponentImporter$7 = () => import("./segments-Cgm9GNeV.mjs");
var Route$7 = createFileRoute("/segments")({
	head: () => ({ meta: [{ title: "Segments · CamPilot" }, {
		name: "description",
		content: "Understand customer segments, revenue contribution, and AI-suggested campaign strategies."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./orders-Co2yVokz.mjs");
var Route$6 = createFileRoute("/orders")({
	head: () => ({ meta: [{ title: "Orders · CamPilot" }, {
		name: "description",
		content: "Visualize transactions, revenue trends, and purchase frequency across customer segments."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./health-CmTdADxo.mjs");
var Route$5 = createFileRoute("/health")({
	head: () => ({ meta: [{ title: "System Health · CamPilot" }, {
		name: "description",
		content: "Monitor backend, database, AI services, and campaign engine status in real time."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./customers-BXwLonJ7.mjs");
var Route$4 = createFileRoute("/customers")({
	head: () => ({ meta: [{ title: "Customers · CamPilot" }, {
		name: "description",
		content: "Explore your customer database with rich filters, segment intelligence, and lifetime value insights."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./copilot-VenXwh7r.mjs");
var Route$3 = createFileRoute("/copilot")({
	head: () => ({ meta: [{ title: "AI Copilot · CamPilot" }, {
		name: "description",
		content: "Describe a business goal and let AI generate a complete CRM campaign strategy, content, and audience."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./campaigns-Cbfe8sE-.mjs");
var Route$2 = createFileRoute("/campaigns")({
	head: () => ({ meta: [{ title: "Campaigns · CamPilot" }, {
		name: "description",
		content: "Manage your entire campaign lifecycle — content, execution, delivery, and analytics."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./analytics-BpL25Bul.mjs");
var Route$1 = createFileRoute("/analytics")({
	head: () => ({ meta: [{ title: "Analytics · CamPilot" }, {
		name: "description",
		content: "Campaign performance funnel, channel mix, segment effectiveness, and trend analysis."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./routes-DARUuCg0.mjs");
var Route = createFileRoute("/")({
	head: () => ({ meta: [{ title: "Dashboard · CamPilot" }, {
		name: "description",
		content: "Executive overview of customers, revenue, segments, and AI-generated campaigns."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var SegmentsRoute = Route$7.update({
	id: "/segments",
	path: "/segments",
	getParentRoute: () => Route$8
});
var OrdersRoute = Route$6.update({
	id: "/orders",
	path: "/orders",
	getParentRoute: () => Route$8
});
var HealthRoute = Route$5.update({
	id: "/health",
	path: "/health",
	getParentRoute: () => Route$8
});
var CustomersRoute = Route$4.update({
	id: "/customers",
	path: "/customers",
	getParentRoute: () => Route$8
});
var CopilotRoute = Route$3.update({
	id: "/copilot",
	path: "/copilot",
	getParentRoute: () => Route$8
});
var CampaignsRoute = Route$2.update({
	id: "/campaigns",
	path: "/campaigns",
	getParentRoute: () => Route$8
});
var AnalyticsRoute = Route$1.update({
	id: "/analytics",
	path: "/analytics",
	getParentRoute: () => Route$8
});
var rootRouteChildren = {
	IndexRoute: Route.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$8
	}),
	AnalyticsRoute,
	CampaignsRoute,
	CopilotRoute,
	CustomersRoute,
	HealthRoute,
	OrdersRoute,
	SegmentsRoute
};
var routeTree = Route$8._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
