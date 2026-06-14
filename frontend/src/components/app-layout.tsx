import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard, Users, ShoppingCart, Layers, Sparkles,
  Megaphone, BarChart3, Activity, Moon, Sun, Search, Bell, Settings, ChevronRight,
} from "lucide-react";
import { useState, type ReactNode } from "react";

const nav = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/customers", label: "Customers", icon: Users },
  { to: "/orders", label: "Orders", icon: ShoppingCart },
  { to: "/segments", label: "Segments", icon: Layers },
  { to: "/copilot", label: "AI Copilot", icon: Sparkles },
  { to: "/campaigns", label: "Campaigns", icon: Megaphone },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/health", label: "System Health", icon: Activity },
] as const;

export function AppLayout({ children, title, subtitle, actions }: { children: ReactNode; title?: string; subtitle?: string; actions?: ReactNode }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [dark, setDark] = useState(false);
  const current = nav.find((n) => (n.to === "/" ? path === "/" : path.startsWith(n.to)));

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto flex max-w-[1600px] gap-6 p-4 lg:p-6">
        {/* Sidebar */}
        <aside className="sticky top-6 hidden h-[calc(100vh-3rem)] w-[260px] shrink-0 flex-col rounded-[32px] border border-border bg-card p-5 shadow-[0_4px_20px_rgba(0,0,0,0.04)] lg:flex">
          <div className="flex items-center gap-2.5 px-2 pb-6">
            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-primary text-primary-foreground">
              <Sparkles className="h-5 w-5" strokeWidth={2.4} />
            </div>
            <div className="leading-tight">
              <div className="text-[17px] font-bold tracking-tight">CamPilot</div>
              <div className="text-[11px] font-medium text-muted-foreground">AI-native CRM</div>
            </div>
          </div>

          <nav className="flex-1 space-y-1">
            <div className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Workspace</div>
            {nav.map((item) => {
              const active = item.to === "/" ? path === "/" : path.startsWith(item.to);
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={[
                    "group flex items-center gap-3 rounded-2xl px-3 py-2.5 text-[14px] font-medium transition-all",
                    active ? "bg-secondary text-secondary-foreground shadow-[0_4px_14px_rgba(0,0,0,0.18)]" : "text-foreground/70 hover:bg-muted",
                  ].join(" ")}
                >
                  <Icon className={["h-[18px] w-[18px] transition-transform group-hover:scale-110", active ? "" : "text-foreground/60"].join(" ")} strokeWidth={2} />
                  <span className="flex-1">{item.label}</span>
                  {active && <ChevronRight className="h-4 w-4 opacity-70" />}
                </Link>
              );
            })}
          </nav>

          <div className="mt-4 rounded-2xl surface-alt p-4">
            <div className="flex items-center gap-2 text-[12px] font-semibold">
              <Sparkles className="h-3.5 w-3.5" /> AI Credits
            </div>
            <div className="mt-2 text-[22px] font-bold tracking-tight">8,420</div>
            <div className="text-[11px] text-muted-foreground">Refreshes in 12 days</div>
            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/60">
              <div className="h-full w-[68%] rounded-full bg-secondary" />
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between rounded-2xl border border-border p-2">
            <div className="flex items-center gap-2.5 pl-1.5">
              <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop&crop=faces" alt="User" className="h-9 w-9 rounded-full object-cover" />
              <div className="leading-tight">
                <div className="text-[13px] font-semibold">Tanmay D.</div>
                <div className="text-[11px] text-muted-foreground">Admin</div>
              </div>
            </div>
            <button
              onClick={() => setDark((d) => !d)}
              className="grid h-9 w-9 place-items-center rounded-xl text-foreground/60 transition-colors hover:bg-muted"
              aria-label="Toggle theme"
            >
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          </div>
        </aside>

        {/* Main */}
        <main className="min-w-0 flex-1">
          {/* Header */}
          <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0">
              <div className="text-[12px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                {current?.label ?? "Workspace"}
              </div>
              <h1 className="mt-1 truncate text-[28px] font-bold leading-tight tracking-tight md:text-[34px]">
                {title ?? "Welcome back, Tanmay 👋"}
              </h1>
              {subtitle && <p className="mt-1 text-[14px] text-muted-foreground">{subtitle}</p>}
            </div>
            <div className="flex items-center gap-2">
              <div className="hidden items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 md:flex">
                <Search className="h-4 w-4 text-muted-foreground" />
                <input
                  placeholder="Search customers, campaigns…"
                  className="w-64 bg-transparent text-[13px] outline-none placeholder:text-muted-foreground"
                />
                <kbd className="rounded-md bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">⌘K</kbd>
              </div>
              <button className="relative grid h-11 w-11 place-items-center rounded-full border border-border bg-card transition-colors hover:bg-muted" aria-label="Notifications">
                <Bell className="h-[18px] w-[18px]" />
                <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-primary" />
              </button>
              <button className="grid h-11 w-11 place-items-center rounded-full border border-border bg-card transition-colors hover:bg-muted" aria-label="Settings">
                <Settings className="h-[18px] w-[18px]" />
              </button>
              {actions}
            </div>
          </div>

          <div className="animate-fade-up">{children}</div>
        </main>
      </div>
    </div>
  );
}
