import { createFileRoute } from "@tanstack/react-router";
import { Send, MailCheck, MousePointerClick, AlertTriangle, Users, Loader2 } from "lucide-react";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { AppLayout } from "@/components/app-layout";
import { KpiCard, SectionCard } from "@/components/ui-bits";
import { openRateTrend, ctrTrend, channelPerformance } from "@/lib/static-data";
import { num } from "@/lib/utils";
import { useDashboardSummary } from "@/hooks/use-dashboard";
import { useCampaigns } from "@/hooks/use-campaigns";

export const Route = createFileRoute("/analytics")({
  head: () => ({
    meta: [
      { title: "Analytics · CamPilot" },
      { name: "description", content: "Campaign performance funnel, channel mix, segment effectiveness, and trend analysis." },
    ],
  }),
  component: AnalyticsPage,
});

function AnalyticsPage() {
  const { data: summary, isLoading: summaryLoading } = useDashboardSummary();
  const { data: campaigns, isLoading: campaignsLoading } = useCampaigns();

  const isLoading = summaryLoading || campaignsLoading;

  // Aggregate delivery stats from dashboard summary
  const totalDelivered = summary?.delivery_events ?? 0;
  const totalCampaigns = summary?.campaigns ?? 0;

  // Segment distribution for performance view
  const segmentDistribution = summary
    ? [
        { name: "High Value", value: summary.segments["High Value"], color: "#F4D24D" },
        { name: "Medium Value", value: summary.segments["Medium Value"], color: "#2C2C2C" },
        { name: "Low Value", value: summary.segments["Low Value"], color: "#22C55E" },
        { name: "Dormant", value: summary.segments["Dormant"], color: "#7CA6F0" },
      ]
    : [];

  // Build funnel from available data
  const totalCustomers = summary?.customers ?? 0;
  const funnel = [
    { label: "Total Customers", value: totalCustomers, pct: 100 },
    { label: "Campaigns Sent", value: totalCampaigns, pct: totalCustomers > 0 ? Math.round((totalCampaigns / totalCustomers) * 100) : 0 },
    { label: "Delivery Events", value: totalDelivered, pct: totalCustomers > 0 ? Math.round((totalDelivered / totalCustomers) * 100) : 0 },
  ];

  // Campaign summary stats
  const completedCampaigns = campaigns?.filter(c => c.status === "completed") ?? [];
  const draftCampaigns = campaigns?.filter(c => c.status === "draft") ?? [];

  return (
    <AppLayout title="Analytics" subtitle="Measure delivery, engagement, and business impact">
      {isLoading && (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-3 text-[14px] text-muted-foreground">Loading analytics…</span>
        </div>
      )}

      {!isLoading && (
        <>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
            <KpiCard label="Customers" value={num(totalCustomers)} delta={6.3} icon={<Users className="h-5 w-5" />} />
            <KpiCard label="Campaigns" value={num(totalCampaigns)} delta={7.1} icon={<Send className="h-5 w-5" />} />
            <KpiCard label="Delivered Events" value={num(totalDelivered)} delta={11.2} icon={<MailCheck className="h-5 w-5" />} accent />
            <KpiCard label="Completed" value={num(completedCampaigns.length)} delta={9.7} icon={<MousePointerClick className="h-5 w-5" />} />
            <KpiCard label="Drafts" value={num(draftCampaigns.length)} delta={-2.4} icon={<AlertTriangle className="h-5 w-5" />} />
          </div>

          <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-12">
            <SectionCard className="lg:col-span-5" title="Platform overview" subtitle="Key metrics funnel">
              <div className="space-y-3">
                {funnel.map((f, i) => (
                  <div key={f.label} className="rounded-2xl border border-border p-4" style={{ width: `${100 - i * 15}%`, marginLeft: `${i * 7}%` }}>
                    <div className="flex items-center justify-between">
                      <span className="text-[13px] font-semibold">{f.label}</span>
                      <span className="text-[12px] text-muted-foreground">{f.pct}%</span>
                    </div>
                    <div className="mt-2 flex items-end justify-between">
                      <span className="text-[22px] font-bold tracking-tight">{num(f.value)}</span>
                    </div>
                    <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
                      <div className="h-full rounded-full bg-primary" style={{ width: `${Math.min(f.pct, 100)}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>

            <div className="space-y-5 lg:col-span-7">
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <SectionCard title="Open rate trend" subtitle="Last 7 days">
                  <div className="h-[180px]">
                    <ResponsiveContainer>
                      <AreaChart data={openRateTrend} margin={{ left: -20, right: 8 }}>
                        <defs>
                          <linearGradient id="op" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#F4D24D" stopOpacity={0.7} />
                            <stop offset="100%" stopColor="#F4D24D" stopOpacity={0.05} />
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="day" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                        <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #E7E4DD" }} />
                        <Area type="monotone" dataKey="rate" stroke="#2C2C2C" strokeWidth={2.5} fill="url(#op)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </SectionCard>
                <SectionCard title="CTR trend" subtitle="Last 7 days">
                  <div className="h-[180px]">
                    <ResponsiveContainer>
                      <AreaChart data={ctrTrend} margin={{ left: -20, right: 8 }}>
                        <defs>
                          <linearGradient id="ctr" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#22C55E" stopOpacity={0.6} />
                            <stop offset="100%" stopColor="#22C55E" stopOpacity={0.05} />
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="day" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                        <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #E7E4DD" }} />
                        <Area type="monotone" dataKey="rate" stroke="#22C55E" strokeWidth={2.5} fill="url(#ctr)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </SectionCard>
              </div>

              <SectionCard title="Channel performance" subtitle="Delivered, open rate and CTR by channel">
                <div className="h-[220px]">
                  <ResponsiveContainer>
                    <BarChart data={channelPerformance} margin={{ left: -20, right: 8 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#EEEAE0" />
                      <XAxis dataKey="channel" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #E7E4DD" }} />
                      <Bar dataKey="openRate" fill="#F4D24D" radius={[10,10,0,0]} name="Open rate %" />
                      <Bar dataKey="ctr" fill="#2C2C2C" radius={[10,10,0,0]} name="CTR %" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </SectionCard>
            </div>
          </div>

          <SectionCard className="mt-6" title="Segment performance" subtitle="Customer distribution by segment">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
              {segmentDistribution.map((s) => {
                const total = segmentDistribution.reduce((a, b) => a + b.value, 0);
                const pct = total > 0 ? (s.value / total) * 100 : 0;
                return (
                  <div key={s.name} className="rounded-2xl border border-border p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[13px] font-semibold">{s.name}</span>
                      <span className="h-2.5 w-2.5 rounded-full" style={{ background: s.color }} />
                    </div>
                    <div className="mt-3 text-[22px] font-bold">{num(s.value)}</div>
                    <div className="text-[11px] text-muted-foreground">customers · {pct.toFixed(1)}%</div>
                    <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                      <div className="h-full rounded-full" style={{ width: `${pct}%`, background: s.color }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </SectionCard>
        </>
      )}
    </AppLayout>
  );
}
