import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles, Send, Loader2, CheckCircle2, Zap, Mail, Edit3, Target, Users, MessageSquare, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { AppLayout } from "@/components/app-layout";
import { SectionCard, Badge } from "@/components/ui-bits";
import { useGenerateCampaign, useExecuteCampaign } from "@/hooks/use-campaigns";
import type { CampaignGenerateResponse } from "@/lib/api/types";

export const Route = createFileRoute("/copilot")({
  head: () => ({
    meta: [
      { title: "AI Copilot · CamPilot" },
      { name: "description", content: "Describe a business goal and let AI generate a complete CRM campaign strategy, content, and audience." },
    ],
  }),
  component: CopilotPage,
});

const examples = [
  "Increase repeat purchases from mid-tier customers",
  "Re-engage dormant customers from the last 90 days",
  "Upsell premium products to High Value segment",
  "Increase order frequency for weekend buyers",
];

function CopilotPage() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState<CampaignGenerateResponse | null>(null);
  const [editing, setEditing] = useState(false);

  const generateMutation = useGenerateCampaign();
  const executeMutation = useExecuteCampaign();

  function generate() {
    if (!prompt.trim()) { toast.error("Add a business goal to continue"); return; }
    setResult(null);
    generateMutation.mutate(
      { goal: prompt },
      {
        onSuccess: (data) => {
          setResult(data);
          if (data.status === "fallback") {
            toast.warning("AI was unavailable — used fallback strategy", {
              description: "The campaign was created with safe defaults. You can edit it before launching.",
            });
          } else {
            toast.success("Campaign generated successfully!");
          }
        },
        onError: (err) => {
          toast.error("Campaign generation failed", {
            description: err.message,
          });
        },
      }
    );
  }

  function execute() {
    if (!result) return;
    executeMutation.mutate(result.campaign_id, {
      onSuccess: (data) => {
        toast.success("Campaign executed", {
          description: `Sent to ${data.audience_size.toLocaleString("en-IN")} customers. ${data.events_created} delivery events created.`,
        });
      },
      onError: (err) => {
        toast.error("Execution failed", { description: err.message });
      },
    });
  }

  const isGenerating = generateMutation.isPending;
  const isExecuting = executeMutation.isPending;

  return (
    <AppLayout title="AI Campaign Copilot" subtitle="Generate complete campaign strategies with one prompt">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-[32px] border border-border bg-card p-8 md:p-12 text-center">
        <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-primary/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-12 h-72 w-72 rounded-full bg-[color:var(--color-surface-alt)] blur-3xl" />
        <div className="relative">
          <div className="inline-flex items-center gap-2 rounded-full surface-alt px-3 py-1.5 text-[11px] font-semibold">
            <Sparkles className="h-3.5 w-3.5" /> Powered by Gemini
          </div>
          <h2 className="mt-4 text-[34px] font-bold leading-tight tracking-tight md:text-[44px]">
            Generate CRM Campaigns with AI
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[15px] text-muted-foreground">
            Describe your business goal and let AI create a complete campaign strategy — audience, content, channel, and predicted outcomes.
          </p>
        </div>
      </div>

      {/* Prompt + Examples */}
      <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-12">
        <SectionCard className="lg:col-span-8" title="Describe your goal" subtitle="Be specific — segment, outcome, timing">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g. Re-engage dormant customers who haven't purchased in 90 days and recover at least ₹15L this month."
            className="min-h-[140px] w-full resize-none rounded-2xl border border-border bg-background p-4 text-[14px] outline-none transition-shadow focus:shadow-[0_0_0_4px_rgba(244,210,77,0.25)]"
          />
          <div className="mt-3 flex items-center justify-between">
            <div className="text-[11px] text-muted-foreground">{prompt.length} characters</div>
            <button
              onClick={generate}
              disabled={isGenerating}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-[14px] font-bold text-primary-foreground transition-transform hover:-translate-y-0.5 disabled:opacity-60"
            >
              {isGenerating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
              {isGenerating ? "Generating…" : "Generate Campaign"}
            </button>
          </div>
        </SectionCard>

        <SectionCard className="lg:col-span-4" title="Example prompts" subtitle="Tap to fill the box">
          <ul className="space-y-2">
            {examples.map((ex) => (
              <li key={ex}>
                <button onClick={() => setPrompt(ex)} className="w-full rounded-2xl border border-border bg-card px-4 py-3 text-left text-[13px] transition-colors hover:bg-muted/60">
                  <Zap className="mr-2 inline h-3.5 w-3.5 text-primary" />
                  {ex}
                </button>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>

      {/* Loading state */}
      {isGenerating && (
        <SectionCard className="mt-6" title="Working on it…" subtitle="CamPilot AI is composing your campaign">
          <ul className="space-y-3">
            {[
              "Analyzing Customer Data...",
              "Identifying Best Segment...",
              "Generating Campaign Strategy...",
              "Optimizing Messaging...",
              "Finalizing Recommendations...",
            ].map((s, i) => (
              <li key={s} className="flex items-center gap-3 text-[13.5px]">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-primary text-primary-foreground">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                </span>
                <span className="font-semibold">{s}</span>
              </li>
            ))}
          </ul>
        </SectionCard>
      )}

      {/* Error state */}
      {generateMutation.isError && (
        <SectionCard className="mt-6">
          <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-6 text-center">
            <AlertTriangle className="mx-auto h-6 w-6 text-destructive" />
            <div className="mt-2 text-[14px] font-semibold text-destructive">Campaign generation failed</div>
            <p className="mt-1 text-[12px] text-muted-foreground">
              {generateMutation.error?.message ?? "Please try again."}
            </p>
          </div>
        </SectionCard>
      )}

      {/* Result */}
      {result && (
        <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-12">
          <SectionCard className="lg:col-span-5" title="Audience & Reasoning" subtitle="Selected by AI based on your goal">
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-primary p-4">
                <Users className="h-4 w-4" />
                <div className="mt-2 text-[10px] font-semibold uppercase">Segment</div>
                <div className="text-[20px] font-bold">{result.selected_segment.segment_name}</div>
              </div>
              <div className="rounded-2xl bg-muted/60 p-4">
                <Target className="h-4 w-4" />
                <div className="mt-2 text-[10px] font-semibold uppercase text-muted-foreground">Audience size</div>
                <div className="text-[20px] font-bold">{result.segment_stats.audience_size.toLocaleString("en-IN")}</div>
              </div>
            </div>
            <div className="mt-4 rounded-2xl border border-border p-4">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Segment Stats</div>
              <div className="mt-2 grid grid-cols-2 gap-2 text-[13px]">
                <div>Avg Spend: <span className="font-semibold">₹{result.segment_stats.average_spend.toLocaleString("en-IN")}</span></div>
                <div>Avg Orders: <span className="font-semibold">{result.segment_stats.average_orders.toFixed(1)}</span></div>
              </div>
            </div>
            {result.status === "fallback" && (
              <div className="mt-4 rounded-2xl border border-yellow-400/40 bg-yellow-50 p-4">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-yellow-700">⚠ Fallback Mode</div>
                <p className="mt-1 text-[13px] text-yellow-800">AI was unavailable. This is a safe default campaign. You can edit all fields before launching.</p>
              </div>
            )}
          </SectionCard>

          <SectionCard
            className="lg:col-span-7"
            title="Campaign content"
            subtitle="Edit any field before launch"
            right={
              <button onClick={() => setEditing(e => !e)} className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 text-[11px] font-semibold">
                <Edit3 className="h-3 w-3" /> {editing ? "Done" : "Edit"}
              </button>
            }
          >
            <div className="space-y-3">
              <Field label="Campaign name" value={result.campaign.campaign_name} editing={editing} onChange={(v) => setResult({ ...result, campaign: { ...result.campaign, campaign_name: v } })} />
              <Field label="Subject line" value={result.campaign.subject_line} editing={editing} onChange={(v) => setResult({ ...result, campaign: { ...result.campaign, subject_line: v } })} icon={<Mail className="h-3.5 w-3.5" />} />
              <Field label="Message" value={result.campaign.message} editing={editing} onChange={(v) => setResult({ ...result, campaign: { ...result.campaign, message: v } })} multiline icon={<MessageSquare className="h-3.5 w-3.5" />} />
              <div className="grid grid-cols-2 gap-3">
                <Field label="CTA" value={result.campaign.cta} editing={editing} onChange={(v) => setResult({ ...result, campaign: { ...result.campaign, cta: v } })} />
                <Field label="Channel" value={result.campaign.recommended_channel} editing={editing} onChange={(v) => setResult({ ...result, campaign: { ...result.campaign, recommended_channel: v } })} />
              </div>
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Badge tone="dark">{result.campaign.recommended_channel}</Badge>
                <Badge tone={result.status === "fallback" ? "yellow" : "green"}>
                  {result.status === "fallback" ? "Fallback" : "AI Generated"}
                </Badge>
                <Badge tone="dark">Campaign #{result.campaign_id}</Badge>
              </div>
            </div>

            <button
              onClick={execute}
              disabled={isExecuting}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-secondary px-6 py-3.5 text-[14px] font-bold text-secondary-foreground transition-transform hover:-translate-y-0.5 disabled:opacity-60"
            >
              {isExecuting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              {isExecuting ? "Executing…" : "Execute Campaign"}
            </button>

            {executeMutation.isSuccess && (
              <div className="mt-3 flex items-center gap-2 rounded-2xl bg-[color:var(--color-success)]/10 p-3 text-[13px] font-semibold text-[color:var(--color-success)]">
                <CheckCircle2 className="h-4 w-4" />
                Campaign executed — {executeMutation.data.events_created} events sent to {executeMutation.data.audience_size} customers
              </div>
            )}
          </SectionCard>
        </div>
      )}
    </AppLayout>
  );
}

function Field({ label, value, editing, onChange, multiline, icon }: { label: string; value: string; editing: boolean; onChange: (v: string) => void; multiline?: boolean; icon?: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-3.5">
      <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{icon}{label}</div>
      {editing ? (
        multiline ? (
          <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={3} className="mt-1 w-full resize-none bg-transparent text-[13.5px] outline-none" />
        ) : (
          <input value={value} onChange={(e) => onChange(e.target.value)} className="mt-1 w-full bg-transparent text-[13.5px] font-semibold outline-none" />
        )
      ) : (
        <div className={["mt-1 text-[13.5px]", multiline ? "" : "font-semibold"].join(" ")}>{value}</div>
      )}
    </div>
  );
}
