import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Users, ShoppingCart, IndianRupee, ReceiptText, Megaphone, Zap, Sparkles, Trophy,
  ArrowUpRight, Plus, Bot, UserPlus, MailCheck, Loader2,
} from "lucide-react";
import {
  AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip,
  PieChart, Pie, Cell,
} from "recharts";
import { AppLayout } from "@/components/app-layout";
import { KpiCard, SectionCard } from "@/components/ui-bits";
import { revenueTrend, activities } from "@/lib/static-data";
import { inr, num } from "@/lib/utils";
import { useDashboardSummary } from "@/hooks/use-dashboard";

export const Route = createFileRoute("/")(  {
  head: () => ({
    meta: [
      { title: "Dashboard · CamPilot" },
      { name: "description", content: "Executive overview of customers, revenue, segments, and AI-generated campaigns." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const { data: summary, isLoading, isError } = useDashboardSummary();

  // Build segment distribution from real data
  const totalCustomers = summary?.customers ?? 0;
  const segmentDistribution = summary
    ? [
        { name: "High Value", value: summary.segments["High Value"], color: "var(--color-chart-1)" },
        { name: "Medium Value", value: summary.segments["Medium Value"], color: "var(--color-chart-2)" },
        { name: "Low Value", value: summary.segments["Low Value"], color: "var(--color-chart-3)" },
        { name: "Dormant", value: summary.segments["Dormant"], color: "var(--color-chart-4)" },
      ]
    : [];

  const segmentPieData = segmentDistribution.map((s) => ({
    ...s,
    pct: totalCustomers > 0 ? Math.round((s.value / totalCustomers) * 100) : 0,
  }));

  const avgOrderValue = summary && summary.orders > 0
    ? Math.round(summary.total_revenue / summary.orders)
    : 0;

  return (
    <AppLayout title="Welcome back, Tanmay 👋" subtitle="Here's what's happening across your CRM today.">
      {/* Loading state */}
      {isLoading && (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-3 text-[14px] text-muted-foreground">Loading dashboard data…</span>
        </div>
      )}

      {/* Error state */}
      {isError && (
        <div className="rounded-[24px] border border-destructive/30 bg-destructive/5 p-8 text-center">
          <div className="text-[16px] font-semibold text-destructive">Failed to load dashboard</div>
          <p className="mt-2 text-[13px] text-muted-foreground">
            Could not connect to the backend. Please check your connection and try again.
          </p>
        </div>
      )}

      {/* Data loaded */}
      {summary && (
        <>
          {/* KPI grid */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <KpiCard label="Total Customers" value={num(summary.customers)} delta={12.4} icon={<Users className="h-5 w-5" />} />
            <KpiCard label="Total Orders" value={num(summary.orders)} delta={8.1} icon={<ShoppingCart className="h-5 w-5" />} />
            <KpiCard label="Total Revenue" value={inr(summary.total_revenue)} delta={18.7} icon={<IndianRupee className="h-5 w-5" />} accent />
            <KpiCard label="Avg. Order Value" value={inr(avgOrderValue)} delta={3.2} icon={<ReceiptText className="h-5 w-5" />} />
            <KpiCard label="Total Campaigns" value={summary.campaigns} delta={6.5} icon={<Megaphone className="h-5 w-5" />} />
            <KpiCard label="Delivery Events" value={num(summary.delivery_events)} delta={4.2} icon={<Zap className="h-5 w-5" />} />
            <KpiCard label="Segments" value="4" delta={0} icon={<Sparkles className="h-5 w-5" />} />
            <KpiCard label="Largest Segment" value={
              Object.entries(summary.segments).sort(([,a],[,b]) => b - a)[0]?.[0] ?? "—"
            } icon={<Trophy className="h-5 w-5" />} />
          </div>

          {/* Charts row */}
          <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-12">
            <SectionCard
              className="lg:col-span-8"
              title="Revenue Overview"
              subtitle="Monthly revenue performance · Last 12 months"
              right={
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-[color:var(--color-success)]/12 px-2.5 py-1 text-[11px] font-semibold text-[color:var(--color-success)]">
                    <ArrowUpRight className="h-3 w-3" /> +18.7%
                  </span>
                  <select className="rounded-full border border-border bg-card px-3 py-1.5 text-[12px] font-medium outline-none">
                    <option>Last 12 months</option>
                    <option>Last 6 months</option>
                    <option>Last 30 days</option>
                  </select>
                </div>
              }
            >
              <div className="mt-1 flex items-baseline gap-3">
                <div className="text-[36px] font-bold tracking-tight">{inr(summary.total_revenue)}</div>
                <div className="text-[13px] text-muted-foreground">total over period</div>
              </div>
              <div className="mt-4 h-[280px] w-full">
                <ResponsiveContainer>
                  <AreaChart data={revenueTrend} margin={{ left: -20, right: 8, top: 8, bottom: 0 }}>
                    <defs>
                      <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#F4D24D" stopOpacity={0.6} />
                        <stop offset="100%" stopColor="#F4D24D" stopOpacity={0.02} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" stroke="#9a9a9a" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis stroke="#9a9a9a" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${v/100000}L`} />
                    <Tooltip
                      contentStyle={{ borderRadius: 12, border: "1px solid #E7E4DD", boxShadow: "0 8px 24px rgba(0,0,0,0.06)" }}
                      formatter={(v: number) => [inr(v), "Revenue"]}
                    />
                    <Area type="monotone" dataKey="revenue" stroke="#2C2C2C" strokeWidth={2.5} fill="url(#rev)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </SectionCard>

            <SectionCard className="lg:col-span-4" title="Customer Distribution" subtitle="By segment value">
              <div className="relative mx-auto h-[200px] w-[200px]">
                <ResponsiveContainer>
                  <PieChart>
                    <Pie data={segmentPieData} innerRadius={62} outerRadius={92} dataKey="value" paddingAngle={3} stroke="none">
                      {segmentPieData.map((_, i) => (
                        <Cell key={i} fill={["#F4D24D", "#2C2C2C", "#22C55E", "#7CA6F0"][i]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="pointer-events-none absolute inset-0 grid place-items-center">
                  <div className="text-center">
                    <div className="text-[22px] font-bold leading-tight">{num(totalCustomers)}</div>
                    <div className="text-[11px] text-muted-foreground">customers</div>
                  </div>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                {segmentPieData.map((s, i) => (
                  <div key={s.name} className="flex items-center justify-between text-[13px]">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full" style={{ background: ["#F4D24D","#2C2C2C","#22C55E","#7CA6F0"][i] }} />
                      <span className="font-medium">{s.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">{num(s.value)}</span>
                      <span className="w-9 text-right font-semibold">{s.pct}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>
          </div>

          {/* AI + Activity */}
          <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="card-hover relative overflow-hidden rounded-[24px] bg-primary p-6">
                <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-white/20 blur-2xl" />
                <div className="absolute -bottom-16 -right-4 h-44 w-44 rounded-full bg-black/10 blur-2xl" />
                <div className="relative">
                  <div className="inline-flex items-center gap-2 rounded-full bg-black/10 px-3 py-1 text-[11px] font-semibold">
                    <Sparkles className="h-3.5 w-3.5" /> AI Recommendation · Powered by Gemini
                  </div>
                  <h3 className="mt-4 text-[24px] font-bold leading-tight tracking-tight md:text-[28px]">
                    Re-engage {num(summary.segments["Dormant"])} dormant customers with a personalised win-back flow
                  </h3>
                  <p className="mt-2 max-w-xl text-[14px] text-foreground/75">
                    Based on your CRM data, dormant customers respond best to WhatsApp with a 10% reward.
                    Total revenue to recover: <span className="font-semibold text-foreground">{inr(summary.total_revenue * 0.12)}</span>.
                  </p>
                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <Link to="/copilot" className="inline-flex items-center gap-2 rounded-full bg-secondary px-5 py-2.5 text-[13px] font-semibold text-secondary-foreground transition-transform hover:-translate-y-0.5">
                      <Sparkles className="h-4 w-4" /> Generate Campaign
                    </Link>
                    <Link to="/segments" className="inline-flex items-center gap-2 rounded-full bg-white/70 px-5 py-2.5 text-[13px] font-semibold text-foreground transition-colors hover:bg-white">
                      View segment
                    </Link>
                  </div>
                  <div className="mt-5 grid grid-cols-3 gap-3">
                    {[
                      { k: "Segment", v: "Dormant" },
                      { k: "Audience", v: num(summary.segments["Dormant"]) },
                      { k: "Channel", v: "WhatsApp" },
                    ].map((x) => (
                      <div key={x.k} className="rounded-2xl bg-white/55 px-4 py-3">
                        <div className="text-[10px] font-semibold uppercase tracking-wider text-foreground/60">{x.k}</div>
                        <div className="mt-0.5 text-[16px] font-bold">{x.v}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <SectionCard
              className="lg:col-span-5"
              title="Recent Activity"
              subtitle="Live events across the platform"
              right={<button className="text-[12px] font-semibold text-muted-foreground hover:text-foreground">View all</button>}
            >
              <ul className="space-y-3">
                {activities.map((a, i) => {
                  const Icon = a.type === "customer" ? UserPlus : a.type === "order" ? ShoppingCart : a.type === "campaign" ? MailCheck : Bot;
                  return (
                    <li key={i} className="flex items-start gap-3 rounded-2xl p-2 transition-colors hover:bg-muted/60">
                      {a.avatar ? (
                        <img src={a.avatar} alt="" className="h-9 w-9 shrink-0 rounded-full object-cover" />
                      ) : (
                        <div className={["grid h-9 w-9 shrink-0 place-items-center rounded-full",
                          a.type === "campaign" ? "bg-[color:var(--color-success)]/15 text-[color:var(--color-success)]" : "bg-primary text-primary-foreground"].join(" ")}>
                          <Icon className="h-4 w-4" />
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-[13px] font-medium">{a.text}</div>
                        <div className="text-[11px] text-muted-foreground">{a.time}</div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </SectionCard>
          </div>

          {/* Quick actions row */}
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            {[
              { label: "Add new customer", icon: UserPlus, to: "/customers" },
              { label: "Generate campaign with AI", icon: Sparkles, to: "/copilot" },
              { label: "View analytics report", icon: Plus, to: "/analytics" },
            ].map(({ label, icon: Icon, to }) => (
              <Link key={label} to={to} className="card-hover flex items-center justify-between rounded-[24px] border border-border bg-card p-5">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-2xl surface-alt">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-[14px] font-semibold">{label}</span>
                </div>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
              </Link>
            ))}
          </div>
        </>
      )}
    </AppLayout>
  );
}
