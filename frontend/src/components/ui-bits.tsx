import type { ReactNode } from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export function KpiCard({
  label, value, delta, icon, accent,
}: {
  label: string; value: ReactNode; delta?: number; icon: ReactNode; accent?: boolean;
}) {
  const positive = (delta ?? 0) >= 0;
  return (
    <div className={[
      "card-hover group relative overflow-hidden rounded-[24px] border border-border p-5",
      accent ? "bg-primary text-primary-foreground" : "bg-card",
    ].join(" ")}>
      <div className="flex items-start justify-between">
        <div className={["grid h-10 w-10 place-items-center rounded-2xl", accent ? "bg-black/10" : "bg-muted"].join(" ")}>
          {icon}
        </div>
        {typeof delta === "number" && (
          <div className={[
            "flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-semibold",
            positive ? (accent ? "bg-black/15 text-foreground" : "bg-[color:var(--color-success)]/12 text-[color:var(--color-success)]") : "bg-destructive/10 text-destructive",
          ].join(" ")}>
            {positive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
            {Math.abs(delta).toFixed(1)}%
          </div>
        )}
      </div>
      <div className="mt-5">
        <div className={["text-[28px] font-bold tracking-tight md:text-[32px]", accent ? "" : ""].join(" ")}>{value}</div>
        <div className={["mt-1 text-[13px]", accent ? "text-foreground/70" : "text-muted-foreground"].join(" ")}>{label}</div>
      </div>
    </div>
  );
}

export function SectionCard({ title, subtitle, right, children, className }: { title?: string; subtitle?: string; right?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <div className={["rounded-[24px] border border-border bg-card p-5 shadow-[0_4px_20px_rgba(0,0,0,0.04)]", className ?? ""].join(" ")}>
      {(title || right) && (
        <div className="mb-4 flex items-start justify-between gap-3">
          <div className="min-w-0">
            {title && <h3 className="truncate text-[17px] font-semibold tracking-tight">{title}</h3>}
            {subtitle && <p className="mt-0.5 text-[12px] text-muted-foreground">{subtitle}</p>}
          </div>
          {right}
        </div>
      )}
      {children}
    </div>
  );
}

export function Badge({ children, tone = "default" }: { children: ReactNode; tone?: "default" | "yellow" | "green" | "red" | "blue" | "dark" }) {
  const map: Record<string, string> = {
    default: "bg-muted text-foreground/70",
    yellow: "bg-[color:var(--color-surface-alt)] text-foreground",
    green: "bg-[color:var(--color-success)]/12 text-[color:var(--color-success)]",
    red: "bg-destructive/10 text-destructive",
    blue: "bg-[color:var(--color-info)]/12 text-[color:var(--color-info)]",
    dark: "bg-secondary text-secondary-foreground",
  };
  return <span className={["inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold", map[tone]].join(" ")}>{children}</span>;
}

export function segmentTone(seg: string): "yellow" | "green" | "blue" | "red" {
  return seg === "High Value" ? "yellow" : seg === "Medium Value" ? "blue" : seg === "Low Value" ? "green" : "red";
}
