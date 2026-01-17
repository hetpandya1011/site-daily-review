import { Users, UserX, Clock, HardHat, AlertTriangle, FileCheck } from "lucide-react";
import { DailySummaryMetrics } from "@/types/reports";
import { cn } from "@/lib/utils";

interface StatusDashboardProps {
  metrics: DailySummaryMetrics;
}

export function StatusDashboard({ metrics }: StatusDashboardProps) {
  const submissionRate = Math.round((metrics.reportsSubmitted / metrics.totalWorkers) * 100);
  
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
      <MetricCard
        icon={FileCheck}
        value={`${metrics.reportsSubmitted}/${metrics.totalWorkers}`}
        label="Reports In"
        sublabel={`${submissionRate}%`}
        variant={submissionRate === 100 ? "success" : "default"}
      />
      <MetricCard
        icon={UserX}
        value={metrics.missingReports.toString()}
        label="Missing"
        sublabel="pending"
        variant={metrics.missingReports > 0 ? "danger" : "success"}
      />
      <MetricCard
        icon={Clock}
        value={`${metrics.totalHoursWorked}`}
        label="Hours"
        sublabel="worked"
      />
      <MetricCard
        icon={HardHat}
        value={metrics.activeCrews.toString()}
        label="Crews"
        sublabel="active"
      />
      <MetricCard
        icon={AlertTriangle}
        value={metrics.safetyIssues.toString()}
        label="Safety"
        sublabel="issues"
        variant={metrics.safetyIssues > 0 ? "warning" : "success"}
      />
      <MetricCard
        icon={Users}
        value={metrics.totalWorkers.toString()}
        label="Workers"
        sublabel="on site"
      />
    </div>
  );
}

interface MetricCardProps {
  icon: React.ComponentType<{ className?: string }>;
  value: string;
  label: string;
  sublabel: string;
  variant?: "default" | "success" | "warning" | "danger";
}

function MetricCard({ icon: Icon, value, label, sublabel, variant = "default" }: MetricCardProps) {
  const styles = {
    default: {
      container: "border-border/60 bg-muted/30",
      icon: "text-muted-foreground",
      value: "text-foreground",
      label: "text-muted-foreground",
    },
    success: {
      container: "border-status-submitted/20 bg-status-submitted/5",
      icon: "text-status-submitted",
      value: "text-status-submitted",
      label: "text-status-submitted/70",
    },
    warning: {
      container: "border-status-pending/20 bg-status-pending/5",
      icon: "text-status-pending",
      value: "text-status-pending",
      label: "text-status-pending/70",
    },
    danger: {
      container: "border-destructive/20 bg-destructive/5",
      icon: "text-destructive",
      value: "text-destructive",
      label: "text-destructive/70",
    },
  };

  const s = styles[variant];

  return (
    <div className={cn("rounded-md border px-2.5 py-2", s.container)}>
      <div className={cn("flex items-center gap-1.5 mb-0.5", s.icon)}>
        <Icon className="h-3.5 w-3.5" />
        <span className="text-[10px] font-medium uppercase tracking-wide">{label}</span>
      </div>
      <div className="flex items-baseline gap-1">
        <span className={cn("text-xl font-bold", s.value)}>{value}</span>
        <span className={cn("text-[10px]", s.label)}>{sublabel}</span>
      </div>
    </div>
  );
}
