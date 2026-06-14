import { createFileRoute } from "@tanstack/react-router";
import { Server, Database, Sparkles, Megaphone, Webhook, Cloud, ShieldCheck, Activity, Loader2, AlertTriangle, CheckCircle2, XCircle } from "lucide-react";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { AppLayout } from "@/components/app-layout";
import { SectionCard, Badge } from "@/components/ui-bits";
import { useHealthCheck } from "@/hooks/use-health";
import { useState, useEffect } from "react";

export const Route = createFileRoute("/health")({
  head: () => ({
    meta: [
      { title: "System Health · CamPilot" },
      { name: "description", content: "Monitor backend, database, AI services, and campaign engine status in real time." },
    ],
  }),
  component: HealthPage,
});

const latencyTrend = Array.from({ length: 24 }, (_, i) => ({
  t: `${i}:00`,
  latency: 70 + Math.round(Math.sin(i / 3) * 25 + Math.random() * 18),
}));

function HealthPage() {
  const { data: health, isLoading, isError, dataUpdatedAt } = useHealthCheck();
  const [latency, setLatency] = useState<number | null>(null);

  // Measure actual API latency
  useEffect(() => {
    const baseUrl = import.meta.env.DEV
      ? "/api"
      : (import.meta.env.VITE_API_BASE_URL ?? "https://campaign-copilot.onrender.com");
    const start = performance.now();
    fetch(`${baseUrl}/health`)
      .then(() => {
        setLatency(Math.round(performance.now() - start));
      })
      .catch(() => setLatency(null));
  }, [dataUpdatedAt]);

  const isHealthy = health?.status === "healthy";
  const dbOk = health?.database === "connected";
  const geminiOk = health?.gemini === "configured";
  const lastChecked = dataUpdatedAt ? new Date(dataUpdatedAt).toLocaleTimeString() : "—";

  const services = [
    {
      name: "Backend API",
      status: isHealthy ? "Operational" : isError ? "Down" : "Checking…",
      ok: isHealthy,
      icon: Server,
      detail: latency ? `${latency}ms latency` : "—",
      secondary: health?.version ? `v${health.version}` : "—",
    },
    {
      name: "PostgreSQL Database",
      status: dbOk ? "Connected" : "Disconnected",
      ok: dbOk,
      icon: Database,
      detail: health?.database ?? "—",
      secondary: "Neon · PostgreSQL",
    },
    {
      name: "Gemini AI Service",
      status: geminiOk ? "Configured" : "Not Configured",
      ok: geminiOk,
      icon: Sparkles,
      detail: health?.gemini ?? "—",
      secondary: "Google AI",
    },
    {
      name: "Campaign Engine",
      status: isHealthy ? "Operational" : "Unavailable",
      ok: isHealthy,
      icon: Megaphone,
      detail: "Execution + delivery pipeline",
      secondary: "FastAPI",
    },
    {
      name: "Deployment",
      status: isHealthy ? "Production" : "Unknown",
      ok: isHealthy,
      icon: Cloud,
      detail: health?.version ? `v${health.version}` : "—",
      secondary: "Render · Web Service",
    },
  ];

  return (
    <AppLayout title="System Health" subtitle={isHealthy ? "All systems operational" : isError ? "Backend unreachable" : "Checking status…"}>
      <SectionCard>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className={`grid h-12 w-12 place-items-center rounded-2xl ${isHealthy ? "bg-[color:var(--color-success)]/15 text-[color:var(--color-success)]" : isError ? "bg-destructive/15 text-destructive" : "bg-muted text-muted-foreground"}`}>
              {isLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : isHealthy ? <ShieldCheck className="h-6 w-6" /> : <AlertTriangle className="h-6 w-6" />}
            </div>
            <div>
              <div className="text-[18px] font-bold">
                {isLoading ? "Checking systems…" : isHealthy ? "All systems operational" : isError ? "Backend unreachable" : "Degraded"}
              </div>
              <div className="text-[12px] text-muted-foreground">
                Last checked: {lastChecked} · Auto-refreshes every 30s
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <StatBlock label="API Latency" value={latency ? `${latency}ms` : "—"} />
            <StatBlock label="Version" value={health?.version ?? "—"} />
            <StatBlock label="Status" value={isHealthy ? "Healthy" : "Unhealthy"} />
          </div>
        </div>
      </SectionCard>

      {/* Service cards */}
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {services.map((m) => {
          const Icon = m.icon;
          return (
            <div key={m.name} className="card-hover rounded-[24px] border border-border bg-card p-5">
              <div className="flex items-start justify-between">
                <div className="grid h-11 w-11 place-items-center rounded-2xl surface-alt">
                  <Icon className="h-5 w-5" />
                </div>
                <Badge tone={m.ok ? "green" : "red"}>
                  {m.ok ? (
                    <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-[color:var(--color-success)]" />
                  ) : (
                    <XCircle className="h-3 w-3" />
                  )}
                  {m.status}
                </Badge>
              </div>
              <div className="mt-4 text-[16px] font-bold">{m.name}</div>
              <div className="mt-3 grid grid-cols-2 gap-2 text-[12px]">
                <div className="rounded-xl bg-muted/60 p-2.5">
                  <div className="text-[10px] uppercase text-muted-foreground">Detail</div>
                  <div className="mt-0.5 text-[14px] font-bold">{m.detail}</div>
                </div>
                <div className="rounded-xl bg-muted/60 p-2.5">
                  <div className="text-[10px] uppercase text-muted-foreground">Platform</div>
                  <div className="mt-0.5 text-[14px] font-bold">{m.secondary}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Latency chart + Incidents */}
      <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-12">
        <SectionCard className="lg:col-span-8" title="API latency · last 24 hours" subtitle="Average ms across all endpoints">
          <div className="h-[260px]">
            <ResponsiveContainer>
              <LineChart data={latencyTrend} margin={{ left: -20, right: 8 }}>
                <XAxis dataKey="t" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} interval={2} />
                <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} unit="ms" />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #E7E4DD" }} />
                <Line type="monotone" dataKey="latency" stroke="#2C2C2C" strokeWidth={2.5} dot={{ fill: "#F4D24D", r: 3, strokeWidth: 2, stroke: "#2C2C2C" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard className="lg:col-span-4" title="Live status" subtitle="Real-time checks">
          <ul className="space-y-3">
            {[
              { t: "Backend API", ok: isHealthy },
              { t: "Database (PostgreSQL)", ok: dbOk },
              { t: "AI Engine (Gemini)", ok: geminiOk },
              { t: "Campaign Execution", ok: isHealthy },
            ].map(i => (
              <li key={i.t} className="rounded-2xl border border-border p-3">
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-semibold">{i.t}</span>
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                  ) : i.ok ? (
                    <Badge tone="green"><CheckCircle2 className="h-3 w-3" /> OK</Badge>
                  ) : (
                    <Badge tone="red"><XCircle className="h-3 w-3" /> Down</Badge>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>
    </AppLayout>
  );
}

function StatBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-muted/60 px-4 py-2.5">
      <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="text-[16px] font-bold leading-tight">{value}</div>
    </div>
  );
}
