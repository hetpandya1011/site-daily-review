import { Users, UserX, Clock, HardHat, AlertTriangle, FileCheck } from "lucide-react";
import { DailySummaryMetrics } from "@/types/reports";
import { cn } from "@/lib/utils";

interface StatusDashboardProps {
  metrics: DailySummaryMetrics;
}

export function StatusDashboard({ metrics }: StatusDashboardProps) {
  const submissionRate = Math.round((metrics.reportsSubmitted / metrics.totalWorkers) * 100);
  
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      <MetricCard
        icon={FileCheck}
        value={`${metrics.reportsSubmitted}/${metrics.totalWorkers}`}
        label="Reports In"
        sublabel={`${submissionRate}% submitted`}
        variant={submissionRate === 100 ? "success" : "default"}
      />
      <MetricCard
        icon={UserX}
        value={metrics.missingReports.toString()}
        label="Missing Reports"
        sublabel={metrics.missingReports === 1 ? "worker pending" : "workers pending"}
        variant={metrics.missingReports > 0 ? "danger" : "success"}
      />
      <MetricCard
        icon={Clock}
        value={`${metrics.totalHoursWorked}`}
        label="Total Hours"
        sublabel="hours worked"
      />
      <MetricCard
        icon={HardHat}
        value={metrics.activeCrews.toString()}
        label="Active Crews"
        sublabel="crews on site"
      />
      <MetricCard
        icon={AlertTriangle}
        value={metrics.safetyIssues.toString()}
        label="Safety Issues"
        sublabel={metrics.safetyIssues === 1 ? "issue reported" : "issues reported"}
        variant={metrics.safetyIssues > 0 ? "warning" : "success"}
      />
      <MetricCard
        icon={Users}
        value={metrics.totalWorkers.toString()}
        label="Total Workers"
        sublabel="on site today"
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
      container: "border-border bg-card",
      icon: "text-muted-foreground",
      value: "text-foreground",
      label: "text-muted-foreground",
    },
    success: {
      container: "border-status-submitted/30 bg-status-submitted/5",
      icon: "text-status-submitted",
      value: "text-status-submitted",
      label: "text-status-submitted/80",
    },
    warning: {
      container: "border-status-pending/30 bg-status-pending/5",
      icon: "text-status-pending",
      value: "text-status-pending",
      label: "text-status-pending/80",
    },
    danger: {
      container: "border-destructive/30 bg-destructive/5",
      icon: "text-destructive",
      value: "text-destructive",
      label: "text-destructive/80",
    },
  };

  const s = styles[variant];

  return (
    <div className={cn("rounded-lg border p-3", s.container)}>
      <div className={cn("flex items-center gap-2 mb-1", s.icon)}>
        <Icon className="h-4 w-4" />
        <span className="text-xs font-medium uppercase tracking-wide">{label}</span>
      </div>
      <div className="flex items-baseline gap-1">
        <span className={cn("text-2xl font-bold", s.value)}>{value}</span>
        <span className={cn("text-xs", s.label)}>{sublabel}</span>
      </div>
    </div>
  );
}
