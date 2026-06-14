import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ShoppingCart, IndianRupee, Repeat, Sparkles, Loader2, AlertTriangle, ChevronLeft, ChevronRight } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, LineChart, Line, CartesianGrid } from "recharts";
import { AppLayout } from "@/components/app-layout";
import { KpiCard, SectionCard, Badge } from "@/components/ui-bits";
import { revenueTrend } from "@/lib/static-data";
import { inr } from "@/lib/utils";
import { useDashboardSummary } from "@/hooks/use-dashboard";
import { useOrders } from "@/hooks/use-orders";

export const Route = createFileRoute("/orders")({
  head: () => ({
    meta: [
      { title: "Orders · CamPilot" },
      { name: "description", content: "Visualize transactions, revenue trends, and purchase frequency across customer segments." },
    ],
  }),
  component: OrdersPage,
});

const frequency = [
  { bucket: "1 order", customers: 6200 },
  { bucket: "2–3 orders", customers: 8800 },
  { bucket: "4–6 orders", customers: 5400 },
  { bucket: "7–10 orders", customers: 2600 },
  { bucket: "10+ orders", customers: 1586 },
];

function OrdersPage() {
  const [page, setPage] = useState(1);
  const { data: summary } = useDashboardSummary();
  const { data: ordersData, isLoading, isError } = useOrders({ page, limit: 14 });

  const orders = ordersData?.orders ?? [];
  const totalPages = ordersData?.pages ?? 1;

  const totalOrders = summary?.orders ?? 0;
  const totalRevenue = summary?.total_revenue ?? 0;

  return (
    <AppLayout title="Orders" subtitle="Transaction insights across channels and segments">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <KpiCard label="Total Orders" value={totalOrders.toLocaleString("en-IN")} delta={8.1} icon={<ShoppingCart className="h-5 w-5" />} />
        <KpiCard label="Revenue" value={inr(totalRevenue)} delta={18.7} icon={<IndianRupee className="h-5 w-5" />} accent />
        <KpiCard label="Repeat Purchase" value="42.6%" delta={5.4} icon={<Repeat className="h-5 w-5" />} />
        <KpiCard label="AI Optimised" value="1,840" delta={22.0} icon={<Sparkles className="h-5 w-5" />} />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-12">
        <SectionCard className="lg:col-span-7" title="Revenue trend" subtitle="Weekly order revenue · last 12 months">
          <div className="h-[260px] w-full">
            <ResponsiveContainer>
              <LineChart data={revenueTrend} margin={{ left: -20, right: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#EEEAE0" />
                <XAxis dataKey="month" stroke="#9a9a9a" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis stroke="#9a9a9a" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v/1000).toFixed(0)}`} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #E7E4DD" }} />
                <Line type="monotone" dataKey="orders" stroke="#2C2C2C" strokeWidth={2.5} dot={{ fill: "#F4D24D", r: 4, strokeWidth: 2, stroke: "#2C2C2C" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard className="lg:col-span-5" title="Purchase frequency" subtitle="Customer order distribution">
          <div className="h-[260px] w-full">
            <ResponsiveContainer>
              <BarChart data={frequency} margin={{ left: -20, right: 8 }}>
                <XAxis dataKey="bucket" stroke="#9a9a9a" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis stroke="#9a9a9a" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #E7E4DD" }} />
                <Bar dataKey="customers" fill="#F4D24D" radius={[10,10,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>
      </div>

      <div className="mt-6">
        <SectionCard title="Recent orders" subtitle={`${ordersData?.total ?? 0} total transactions`}>
          {isLoading && (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
              <span className="ml-3 text-[13px] text-muted-foreground">Loading orders…</span>
            </div>
          )}

          {isError && (
            <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-6 text-center">
              <AlertTriangle className="mx-auto h-6 w-6 text-destructive" />
              <div className="mt-2 text-[14px] font-semibold text-destructive">Failed to load orders</div>
            </div>
          )}

          {!isLoading && !isError && orders.length === 0 && (
            <div className="rounded-2xl border border-border bg-muted/30 p-10 text-center">
              <div className="text-[16px] font-semibold">No orders yet</div>
              <p className="mt-1 text-[13px] text-muted-foreground">Orders will appear here once customers make purchases.</p>
            </div>
          )}

          {!isLoading && !isError && orders.length > 0 && (
            <>
              <div className="overflow-hidden rounded-2xl border border-border">
                <table className="w-full text-left text-[13px]">
                  <thead className="bg-muted/60 text-[11px] uppercase tracking-wider text-muted-foreground">
                    <tr>{["Order","Customer","Segment","Amount","Status","Date"].map(h => <th key={h} className="px-4 py-3 font-semibold">{h}</th>)}</tr>
                  </thead>
                  <tbody>
                    {orders.map((o) => (
                      <tr key={o.id} className="border-t border-border transition-colors hover:bg-muted/40">
                        <td className="px-4 py-3 font-mono text-[11px] text-muted-foreground">#{o.id}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="grid h-7 w-7 place-items-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground">
                              {o.customer_name.charAt(0)}
                            </div>
                            <span className="font-semibold">{o.customer_name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <Badge tone="default">{o.customer_segment ?? "—"}</Badge>
                        </td>
                        <td className="px-4 py-3 font-bold">{inr(o.amount)}</td>
                        <td className="px-4 py-3">
                          <Badge tone={o.status === "completed" ? "green" : o.status === "pending" ? "yellow" : "default"}>{o.status}</Badge>
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">
                          {o.created_at ? new Date(o.created_at).toLocaleDateString() : "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {totalPages > 1 && (
                <div className="mt-4 flex items-center justify-between">
                  <div className="text-[12px] text-muted-foreground">
                    Page {page} of {totalPages}
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page <= 1}
                      className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-3 py-2 text-[12px] font-semibold disabled:opacity-40">
                      <ChevronLeft className="h-3.5 w-3.5" /> Prev
                    </button>
                    <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page >= totalPages}
                      className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-3 py-2 text-[12px] font-semibold disabled:opacity-40">
                      Next <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </SectionCard>
      </div>
    </AppLayout>
  );
}
