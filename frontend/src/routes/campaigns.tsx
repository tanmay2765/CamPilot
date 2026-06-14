import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Play, Eye, Loader2, MailCheck, MousePointerClick, Send, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { AppLayout } from "@/components/app-layout";
import { SectionCard, Badge, segmentTone } from "@/components/ui-bits";
import { num } from "@/lib/utils";
import { useCampaigns, useCampaignAnalytics, useExecuteCampaign } from "@/hooks/use-campaigns";
import type { ApiCampaign } from "@/lib/api/types";

export const Route = createFileRoute("/campaigns")({
  head: () => ({
    meta: [
      { title: "Campaigns · CamPilot" },
      { name: "description", content: "Manage your entire campaign lifecycle — content, execution, delivery, and analytics." },
    ],
  }),
  component: CampaignsPage,
});

function CampaignsPage() {
  const { data: campaigns, isLoading, isError } = useCampaigns();
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const selected = campaigns?.find(c => c.id === selectedId) ?? campaigns?.[0] ?? null;
  const { data: analytics, isLoading: analyticsLoading } = useCampaignAnalytics(
    selected?.status === "completed" ? selected.id : null
  );
  const executeMutation = useExecuteCampaign();

  const activeCampaigns = campaigns?.filter(c => c.status === "draft" || c.status === "completed") ?? [];

  function handleExecute() {
    if (!selected) return;
    executeMutation.mutate(selected.id, {
      onSuccess: (data) => {
        toast.success("Campaign executed", {
          description: `${data.events_created} delivery events created for ${data.audience_size} customers.`,
        });
      },
      onError: (err) => {
        toast.error("Execution failed", { description: err.message });
      },
    });
  }

  if (isLoading) {
    return (
      <AppLayout title="Campaigns" subtitle="Loading campaigns…">
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-3 text-[14px] text-muted-foreground">Loading campaigns…</span>
        </div>
      </AppLayout>
    );
  }

  if (isError) {
    return (
      <AppLayout title="Campaigns" subtitle="Error">
        <div className="rounded-[24px] border border-destructive/30 bg-destructive/5 p-8 text-center">
          <AlertTriangle className="mx-auto h-8 w-8 text-destructive" />
          <div className="mt-3 text-[16px] font-semibold text-destructive">Failed to load campaigns</div>
        </div>
      </AppLayout>
    );
  }

  const list = campaigns ?? [];

  if (list.length === 0) {
    return (
      <AppLayout title="Campaigns" subtitle="No campaigns yet"
        actions={
          <Link to="/copilot" className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-[12px] font-semibold text-primary-foreground">
            <Plus className="h-4 w-4" /> Generate with AI
          </Link>
        }>
        <div className="rounded-[24px] border border-border bg-muted/30 p-12 text-center">
          <div className="text-[18px] font-semibold">No campaigns created yet</div>
          <p className="mt-2 text-[13px] text-muted-foreground">Use the AI Copilot to generate your first campaign.</p>
          <Link to="/copilot" className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-[13px] font-semibold text-primary-foreground">
            Generate Campaign
          </Link>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout title="Campaigns" subtitle={`${list.length} total · ${activeCampaigns.length} active`}
      actions={
        <Link to="/copilot" className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-[12px] font-semibold text-primary-foreground">
          <Plus className="h-4 w-4" /> New Campaign
        </Link>
      }>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
        <SectionCard className="lg:col-span-7" title="All campaigns" subtitle="Click a row to view detail">
          <div className="overflow-hidden rounded-2xl border border-border">
            <table className="w-full text-left text-[13px]">
              <thead className="bg-muted/60 text-[11px] uppercase tracking-wider text-muted-foreground">
                <tr>{["Name","Segment","Channel","Status","Created"].map(h => <th key={h} className="px-4 py-3 font-semibold">{h}</th>)}</tr>
              </thead>
              <tbody>
                {list.map(c => (
                  <tr key={c.id} onClick={() => setSelectedId(c.id)}
                    className={["cursor-pointer border-t border-border transition-colors hover:bg-muted/40",
                      selected?.id === c.id ? "bg-[color:var(--color-surface-alt)]" : ""].join(" ")}>
                    <td className="px-4 py-3">
                      <div className="font-semibold">{c.name}</div>
                      <div className="text-[11px] text-muted-foreground">#{c.id}</div>
                    </td>
                    <td className="px-4 py-3"><Badge tone={segmentTone(c.segment_name)}>{c.segment_name}</Badge></td>
                    <td className="px-4 py-3"><Badge tone="default">{c.channel}</Badge></td>
                    <td className="px-4 py-3">
                      <Badge tone={c.status === "completed" ? "green" : c.status === "draft" ? "yellow" : "blue"}>{c.status}</Badge>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground text-[11px]">
                      {c.created_at ? new Date(c.created_at).toLocaleDateString() : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>

        <div className="space-y-5 lg:col-span-5">
          {selected && (
            <SectionCard title={selected.name} subtitle={`#${selected.id} · ${selected.created_at ? new Date(selected.created_at).toLocaleDateString() : "—"}`}>
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone={segmentTone(selected.segment_name)}>{selected.segment_name}</Badge>
                <Badge tone="default">{selected.channel}</Badge>
                <Badge tone={selected.status === "completed" ? "green" : "yellow"}>{selected.status}</Badge>
              </div>

              {selected.subject_line && (
                <div className="mt-4 rounded-2xl border border-border p-3">
                  <div className="text-[10px] font-semibold uppercase text-muted-foreground">Subject</div>
                  <div className="mt-1 text-[13px] font-semibold">{selected.subject_line}</div>
                </div>
              )}

              {selected.message && (
                <div className="mt-2 rounded-2xl border border-border p-3">
                  <div className="text-[10px] font-semibold uppercase text-muted-foreground">Message</div>
                  <div className="mt-1 text-[13px]">{selected.message}</div>
                </div>
              )}

              {/* Analytics for completed campaigns */}
              {selected.status === "completed" && analyticsLoading && (
                <div className="mt-4 flex items-center justify-center py-4">
                  <Loader2 className="h-5 w-5 animate-spin text-primary" />
                </div>
              )}
              {analytics && (
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <Stat icon={<Send className="h-4 w-4" />} label="Sent" value={num(analytics.total_sent)} />
                  <Stat icon={<MailCheck className="h-4 w-4" />} label="Opened" value={`${num(analytics.opened)} (${analytics.open_rate_percentage}%)`} />
                  <Stat icon={<MousePointerClick className="h-4 w-4" />} label="Clicked" value={`${num(analytics.clicked)} (${analytics.click_rate_percentage}%)`} />
                  <Stat icon={<AlertTriangle className="h-4 w-4" />} label="Delivered" value={num(analytics.delivered)} />
                </div>
              )}

              <div className="mt-4 flex items-center gap-2">
                {selected.status === "draft" && (
                  <button onClick={handleExecute} disabled={executeMutation.isPending}
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-[12px] font-semibold text-primary-foreground disabled:opacity-60">
                    {executeMutation.isPending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Play className="h-3.5 w-3.5" />}
                    Execute
                  </button>
                )}
                <button className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-[12px] font-semibold"><Eye className="h-3.5 w-3.5" /> Preview</button>
              </div>
            </SectionCard>
          )}
        </div>
      </div>
    </AppLayout>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-muted/60 p-3">
      <div className="text-muted-foreground">{icon}</div>
      <div className="mt-1.5 text-[20px] font-bold leading-tight">{value}</div>
      <div className="text-[11px] text-muted-foreground">{label}</div>
    </div>
  );
}
