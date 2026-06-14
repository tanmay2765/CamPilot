import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles, ArrowUpRight, Users, IndianRupee, Target, TrendingUp, Loader2, AlertTriangle } from "lucide-react";
import { AppLayout } from "@/components/app-layout";
import { SectionCard, Badge } from "@/components/ui-bits";
import { inr, num } from "@/lib/mock-data";
import { useSegmentStats } from "@/hooks/use-segments";
import { useCustomers } from "@/hooks/use-customers";

export const Route = createFileRoute("/segments")({
  head: () => ({
    meta: [
      { title: "Segments · CamPilot" },
      { name: "description", content: "Understand customer segments, revenue contribution, and AI-suggested campaign strategies." },
    ],
  }),
  component: SegmentsPage,
});

const segmentColors: Record<string, string> = {
  "High Value": "from-[#F4D24D] to-[#F8E48A]",
  "Medium Value": "from-[#E7E4DD] to-[#F0EFEA]",
  "Low Value": "from-[#DDEFE0] to-[#EAF7EC]",
  "Dormant": "from-[#F0E4E4] to-[#FAEFEF]",
};

const segmentStrategies: Record<string, string> = {
  "High Value": "Loyalty rewards, early access to new collections, and VIP-only experiences.",
  "Medium Value": "Upsell premium tiers, bundle offers, and personalised category recommendations.",
  "Low Value": "Frequency-driving offers, free shipping thresholds, and category cross-sell.",
  "Dormant": "Reactivation discounts, personalised win-back messaging, survey + reward flow.",
};

const segmentDescriptions: Record<string, string> = {
  "High Value": "Top spenders with high frequency and large basket sizes. Most loyal customers.",
  "Medium Value": "Regular customers with consistent purchases. Strong potential to grow upward.",
  "Low Value": "Occasional buyers with low ticket size. Opportunity for habit-building campaigns.",
  "Dormant": "Have not purchased in 90+ days. Win-back essential before churn.",
};

function SegmentsPage() {
  const { data: stats, isLoading, isError } = useSegmentStats();
  const { data: highValueCustomers } = useCustomers({ segment: "High Value", limit: 5 });

  if (isLoading) {
    return (
      <AppLayout title="Segments" subtitle="Audience quality, value, and AI-suggested strategies">
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-3 text-[14px] text-muted-foreground">Loading segment data…</span>
        </div>
      </AppLayout>
    );
  }

  if (isError) {
    return (
      <AppLayout title="Segments" subtitle="Audience quality, value, and AI-suggested strategies">
        <div className="rounded-[24px] border border-destructive/30 bg-destructive/5 p-8 text-center">
          <AlertTriangle className="mx-auto h-8 w-8 text-destructive" />
          <div className="mt-3 text-[16px] font-semibold text-destructive">Failed to load segments</div>
          <p className="mt-2 text-[13px] text-muted-foreground">Could not connect to the backend.</p>
        </div>
      </AppLayout>
    );
  }

  const segments = stats ?? [];
  const highValue = segments.find(s => s.segment_name === "High Value");
  const topCustomers = highValueCustomers?.customers ?? [];

  return (
    <AppLayout title="Segments" subtitle="Audience quality, value, and AI-suggested strategies">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {segments.map((s) => {
          const color = segmentColors[s.segment_name] ?? "from-[#E7E4DD] to-[#F0EFEA]";
          return (
            <div key={s.segment_name} className={`card-hover relative overflow-hidden rounded-[24px] border border-border bg-gradient-to-br ${color} p-5`}>
              <div className="flex items-center justify-between">
                <Badge tone="dark">{s.segment_name}</Badge>
              </div>
              <div className="mt-4 text-[34px] font-bold tracking-tight">{num(s.audience_size)}</div>
              <div className="text-[12px] font-medium text-foreground/65">customers</div>
              <div className="mt-4 grid grid-cols-2 gap-2 text-[12px]">
                <div className="rounded-2xl bg-white/55 p-3">
                  <div className="text-[10px] font-semibold uppercase text-foreground/55">Avg Spend</div>
                  <div className="mt-0.5 text-[14px] font-bold">{inr(s.average_spend)}</div>
                </div>
                <div className="rounded-2xl bg-white/55 p-3">
                  <div className="text-[10px] font-semibold uppercase text-foreground/55">Avg Orders</div>
                  <div className="mt-0.5 text-[14px] font-bold">{s.average_orders.toFixed(1)}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-12">
        <SectionCard
          className="lg:col-span-8"
          title={`High Value · Segment detail`}
          subtitle={segmentDescriptions["High Value"]}
          right={
            <Link to="/copilot" className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-[12px] font-semibold text-primary-foreground">
              <Sparkles className="h-3.5 w-3.5" /> Generate Campaign
            </Link>
          }
        >
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {[
              { icon: Users, label: "Customers", value: num(highValue?.audience_size ?? 0) },
              { icon: IndianRupee, label: "Avg Spend", value: inr(highValue?.average_spend ?? 0) },
              { icon: Target, label: "Avg Orders", value: (highValue?.average_orders ?? 0).toFixed(1) },
              { icon: TrendingUp, label: "Segment", value: "High Value" },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="rounded-2xl bg-muted/60 p-4">
                <Icon className="h-4 w-4 text-muted-foreground" />
                <div className="mt-2 text-[20px] font-bold">{value}</div>
                <div className="text-[11px] text-muted-foreground">{label}</div>
              </div>
            ))}
          </div>

          {topCustomers.length > 0 && (
            <div className="mt-5">
              <div className="mb-2 text-[12px] font-semibold uppercase tracking-wider text-muted-foreground">Top Customers</div>
              <ul className="divide-y divide-border rounded-2xl border border-border">
                {topCustomers.map((c) => (
                  <li key={c.id} className="flex items-center justify-between p-3">
                    <div className="flex items-center gap-3">
                      <div className="grid h-9 w-9 place-items-center rounded-full bg-primary text-[12px] font-bold text-primary-foreground">
                        {c.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-[13px] font-semibold">{c.name}</div>
                        <div className="text-[11px] text-muted-foreground">{c.email}</div>
                      </div>
                    </div>
                    <div className="text-[14px] font-bold">{c.city ?? "—"}</div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </SectionCard>

        <SectionCard className="lg:col-span-4" title="Suggested AI Strategy" subtitle="Auto-generated by CamPilot AI">
          <div className="rounded-2xl bg-primary p-4">
            <div className="flex items-center gap-2 text-[12px] font-semibold">
              <Sparkles className="h-4 w-4" /> Strategy · 92% confidence
            </div>
            <p className="mt-2 text-[13.5px] leading-relaxed">{segmentStrategies["High Value"]}</p>
          </div>
          <ul className="mt-4 space-y-3 text-[13px]">
            <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />Send VIP early-access invite 48 hours before launch.</li>
            <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />Bundle high-margin products with concierge support.</li>
            <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />Trigger personalised WhatsApp message at 7pm IST.</li>
            <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />Reward repeat purchase within 14 days with loyalty points.</li>
          </ul>
          <Link to="/copilot" className="mt-5 inline-flex items-center gap-2 text-[12px] font-semibold text-foreground/70 hover:text-foreground">
            Open in Copilot <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </SectionCard>
      </div>
    </AppLayout>
  );
}
