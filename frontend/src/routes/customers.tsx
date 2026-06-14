import { createFileRoute } from "@tanstack/react-router";
import { useState, useDeferredValue } from "react";
import { Search, Filter, Download, MoreHorizontal, X, Mail, Phone, MapPin, Sparkles, Loader2, ChevronLeft, ChevronRight, AlertTriangle } from "lucide-react";
import { AppLayout } from "@/components/app-layout";
import { SectionCard, Badge, segmentTone } from "@/components/ui-bits";
import { inr } from "@/lib/utils";
import { useCustomers, useCustomerSummary, useCustomerOrders } from "@/hooks/use-customers";
import type { ApiCustomer } from "@/lib/api/types";

export const Route = createFileRoute("/customers")({
  head: () => ({
    meta: [
      { title: "Customers · CamPilot" },
      { name: "description", content: "Explore your customer database with rich filters, segment intelligence, and lifetime value insights." },
    ],
  }),
  component: CustomersPage,
});

function CustomersPage() {
  const [query, setQuery] = useState("");
  const [seg, setSeg] = useState<string>("All");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<ApiCustomer | null>(null);

  const deferredQuery = useDeferredValue(query);

  const { data, isLoading, isError } = useCustomers({
    search: deferredQuery || undefined,
    segment: seg !== "All" ? seg : undefined,
    page,
    limit: 20,
  });

  const customers = data?.customers ?? [];
  const totalPages = data?.pages ?? 1;
  const totalCount = data?.total ?? 0;

  return (
    <AppLayout title="Customers" subtitle={`${totalCount} customers · 4 segments`}>
      <SectionCard>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex flex-1 items-center gap-2 rounded-full border border-border bg-background px-4 py-2.5 min-w-[240px]">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input value={query} onChange={(e) => { setQuery(e.target.value); setPage(1); }} placeholder="Search by name or email" className="w-full bg-transparent text-[13px] outline-none" />
          </div>
          <div className="flex items-center gap-2">
            {["All", "High Value", "Medium Value", "Low Value", "Dormant"].map((s) => (
              <button key={s} onClick={() => { setSeg(s); setPage(1); }}
                className={[
                  "rounded-full px-3.5 py-2 text-[12px] font-semibold transition-colors",
                  seg === s ? "bg-secondary text-secondary-foreground" : "bg-muted text-foreground/70 hover:bg-muted/70",
                ].join(" ")}>{s}</button>
            ))}
          </div>
          <button className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 text-[12px] font-semibold"><Filter className="h-4 w-4" /> Filter</button>
          <button className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-[12px] font-semibold text-primary-foreground"><Download className="h-4 w-4" /> Export</button>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
            <span className="ml-3 text-[13px] text-muted-foreground">Loading customers…</span>
          </div>
        )}

        {/* Error */}
        {isError && (
          <div className="mt-5 rounded-2xl border border-destructive/30 bg-destructive/5 p-6 text-center">
            <AlertTriangle className="mx-auto h-6 w-6 text-destructive" />
            <div className="mt-2 text-[14px] font-semibold text-destructive">Failed to load customers</div>
            <p className="mt-1 text-[12px] text-muted-foreground">Please check backend connectivity.</p>
          </div>
        )}

        {/* Empty state */}
        {!isLoading && !isError && customers.length === 0 && (
          <div className="mt-5 rounded-2xl border border-border bg-muted/30 p-10 text-center">
            <div className="text-[16px] font-semibold">No customers found</div>
            <p className="mt-1 text-[13px] text-muted-foreground">
              {query ? `No results for "${query}"` : "No customers in this segment yet."}
            </p>
          </div>
        )}

        {/* Table */}
        {!isLoading && !isError && customers.length > 0 && (
          <>
            <div className="mt-5 overflow-hidden rounded-2xl border border-border">
              <table className="w-full text-left text-[13px]">
                <thead className="bg-muted/60 text-[11px] uppercase tracking-wider text-muted-foreground">
                  <tr>
                    {["Customer", "ID", "Segment", "Email", "City", ""].map(h => (
                      <th key={h} className="px-4 py-3 font-semibold">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {customers.map((c) => (
                    <tr key={c.id} onClick={() => setSelected(c)} className="cursor-pointer border-t border-border transition-colors hover:bg-muted/40">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="grid h-9 w-9 place-items-center rounded-full bg-primary text-[13px] font-bold text-primary-foreground">
                            {c.name.charAt(0)}
                          </div>
                          <div className="min-w-0">
                            <div className="truncate font-semibold">{c.name}</div>
                            <div className="truncate text-[11px] text-muted-foreground">{c.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 font-mono text-[11px] text-muted-foreground">#{c.id}</td>
                      <td className="px-4 py-3">
                        {c.segment && <Badge tone={segmentTone(c.segment)}>{c.segment}</Badge>}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{c.email}</td>
                      <td className="px-4 py-3 text-muted-foreground">{c.city ?? "—"}</td>
                      <td className="px-4 py-3"><MoreHorizontal className="h-4 w-4 text-muted-foreground" /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-4 flex items-center justify-between">
                <div className="text-[12px] text-muted-foreground">
                  Page {page} of {totalPages} · {totalCount} total
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page <= 1}
                    className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-3 py-2 text-[12px] font-semibold disabled:opacity-40"
                  >
                    <ChevronLeft className="h-3.5 w-3.5" /> Prev
                  </button>
                  <button
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={page >= totalPages}
                    className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-3 py-2 text-[12px] font-semibold disabled:opacity-40"
                  >
                    Next <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </SectionCard>

      {/* Drawer */}
      {selected && <CustomerDrawer customer={selected} onClose={() => setSelected(null)} />}
    </AppLayout>
  );
}

function CustomerDrawer({ customer, onClose }: { customer: ApiCustomer; onClose: () => void }) {
  const { data: summary, isLoading: summaryLoading } = useCustomerSummary(customer.id);
  const { data: orders, isLoading: ordersLoading } = useCustomerOrders(customer.id);

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm" onClick={onClose} />
      <aside className="fixed right-0 top-0 z-50 h-full w-full max-w-[460px] overflow-y-auto bg-card p-6 shadow-2xl">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-primary text-[20px] font-bold text-primary-foreground">
              {customer.name.charAt(0)}
            </div>
            <div>
              <div className="text-[18px] font-bold">{customer.name}</div>
              <div className="text-[12px] text-muted-foreground">#{customer.id}</div>
            </div>
          </div>
          <button onClick={onClose} className="grid h-9 w-9 place-items-center rounded-xl hover:bg-muted"><X className="h-4 w-4" /></button>
        </div>

        <div className="mt-5 space-y-2 rounded-2xl bg-muted/60 p-4 text-[13px]">
          <div className="flex items-center gap-2"><Mail className="h-4 w-4 text-muted-foreground" />{customer.email}</div>
          <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-muted-foreground" />{customer.phone ?? "Not provided"}</div>
          <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-muted-foreground" />{customer.city ?? "Not provided"}</div>
        </div>

        {/* Summary stats */}
        {summaryLoading && (
          <div className="mt-5 flex items-center justify-center py-6">
            <Loader2 className="h-5 w-5 animate-spin text-primary" />
          </div>
        )}
        {summary && (
          <>
            <div className="mt-5 grid grid-cols-3 gap-3">
              <div className="rounded-2xl border border-border p-3"><div className="text-[10px] uppercase text-muted-foreground">Orders</div><div className="mt-1 text-[18px] font-bold">{summary.total_orders}</div></div>
              <div className="rounded-2xl border border-border p-3"><div className="text-[10px] uppercase text-muted-foreground">Spend</div><div className="mt-1 text-[18px] font-bold">{inr(summary.total_spend)}</div></div>
              <div className="rounded-2xl bg-primary p-3"><div className="text-[10px] uppercase">Avg Order</div><div className="mt-1 text-[18px] font-bold">{inr(summary.average_order_value)}</div></div>
            </div>

            <div className="mt-5">
              <div className="mb-2 text-[12px] font-semibold uppercase tracking-wider text-muted-foreground">Segment</div>
              <Badge tone={segmentTone(summary.segment)}>{summary.segment}</Badge>
            </div>
          </>
        )}

        {/* Order history */}
        <div className="mt-5">
          <div className="mb-2 text-[12px] font-semibold uppercase tracking-wider text-muted-foreground">Order History</div>
          {ordersLoading && (
            <div className="flex items-center justify-center py-4">
              <Loader2 className="h-4 w-4 animate-spin text-primary" />
            </div>
          )}
          {orders && orders.length > 0 && (
            <ul className="space-y-2">
              {orders.slice(0, 6).map(o => (
                <li key={o.id} className="flex items-center justify-between rounded-2xl border border-border p-3">
                  <div>
                    <div className="text-[13px] font-semibold">Order #{o.id}</div>
                    <div className="text-[11px] text-muted-foreground">{o.created_at ? new Date(o.created_at).toLocaleDateString() : "—"} · {o.status}</div>
                  </div>
                  <div className="text-[14px] font-bold">{inr(o.amount)}</div>
                </li>
              ))}
            </ul>
          )}
          {orders && orders.length === 0 && (
            <p className="text-[13px] text-muted-foreground">No orders yet.</p>
          )}
        </div>

        <div className="mt-5 rounded-2xl bg-primary p-4">
          <div className="flex items-center gap-2 text-[12px] font-semibold"><Sparkles className="h-4 w-4" /> AI Insight</div>
          <p className="mt-2 text-[13px]">
            {customer.segment === "Dormant"
              ? "This customer hasn't purchased recently. Consider a win-back campaign with a special offer."
              : customer.segment === "High Value"
              ? "High likelihood to respond to a premium upgrade offer. Recommend WhatsApp outreach with a 10% loyalty reward."
              : "Good candidate for upselling campaigns. Consider bundle offers with personalised category recommendations."}
          </p>
        </div>
      </aside>
    </>
  );
}
