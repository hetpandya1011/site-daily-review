import { ChevronLeft, ChevronRight, MapPin, Calendar, Users, Clock, HardHat, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { JobInfo, DailySummaryMetrics } from "@/types/reports";

interface ReportHeaderProps {
  job: JobInfo;
  selectedDate: Date;
  onPreviousDay: () => void;
  onNextDay: () => void;
  onToday: () => void;
  onYesterday: () => void;
  metrics: DailySummaryMetrics;
}

export function ReportHeader({
  job,
  selectedDate,
  onPreviousDay,
  onNextDay,
  onToday,
  onYesterday,
  metrics,
}: ReportHeaderProps) {
  const formattedDate = selectedDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const today = new Date();
  const isToday = today.toDateString() === selectedDate.toDateString();
  
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const isYesterday = yesterday.toDateString() === selectedDate.toDateString();

  const isFutureDisabled = isToday;

  return (
    <header className="border-b border-border bg-card px-6 py-5">
      {/* Job Info */}
      <div className="mb-4">
        <h1 className="text-2xl font-semibold text-foreground">{job.name}</h1>
        <div className="mt-1 flex items-center gap-2 text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span className="text-sm">{job.address}</span>
        </div>
      </div>

      {/* Date Navigation */}
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <Button
          variant="outline"
          size="icon"
          onClick={onPreviousDay}
          className="h-9 w-9"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="text-base font-medium text-foreground">
            {formattedDate}
          </span>
          {isToday && (
            <span className="rounded-full bg-accent px-2 py-0.5 text-xs font-medium text-accent-foreground">
              Today
            </span>
          )}
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={onNextDay}
          disabled={isFutureDisabled}
          className="h-9 w-9"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>

        {/* Quick Actions */}
        <div className="flex items-center gap-2 border-l border-border pl-3">
          <Button
            variant={isToday ? "secondary" : "ghost"}
            size="sm"
            onClick={onToday}
            disabled={isToday}
            className="h-8 text-xs"
          >
            Today
          </Button>
          <Button
            variant={isYesterday ? "secondary" : "ghost"}
            size="sm"
            onClick={onYesterday}
            disabled={isYesterday}
            className="h-8 text-xs"
          >
            Yesterday
          </Button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <MetricCard
          icon={Users}
          label="Reports Submitted"
          value={`${metrics.reportsSubmitted} of ${metrics.totalWorkers}`}
          sublabel="workers reported"
        />
        <MetricCard
          icon={Clock}
          label="Total Hours"
          value={`${metrics.totalHoursWorked}`}
          sublabel="hours worked"
        />
        <MetricCard
          icon={HardHat}
          label="Active Crews"
          value={`${metrics.activeCrews}`}
          sublabel="crews on site"
        />
        <MetricCard
          icon={AlertCircle}
          label="Missing Reports"
          value={`${metrics.missingReports}`}
          sublabel={metrics.missingReports === 1 ? "worker pending" : "workers pending"}
          variant={metrics.missingReports > 0 ? "warning" : "default"}
        />
      </div>
    </header>
  );
}

interface MetricCardProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  sublabel: string;
  variant?: "default" | "warning";
}

function MetricCard({ icon: Icon, label, value, sublabel, variant = "default" }: MetricCardProps) {
  const isWarning = variant === "warning";
  
  return (
    <div className={`rounded-lg border p-3 ${isWarning ? "border-status-pending/30 bg-status-pending/5" : "border-border bg-background"}`}>
      <div className={`flex items-center gap-2 ${isWarning ? "text-status-pending" : "text-muted-foreground"}`}>
        <Icon className="h-4 w-4" />
        <span className="text-xs font-medium uppercase tracking-wide">{label}</span>
      </div>
      <div className="mt-1">
        <span className={`text-xl font-semibold ${isWarning ? "text-status-pending" : "text-foreground"}`}>{value}</span>
        <span className={`ml-1 text-xs ${isWarning ? "text-status-pending/80" : "text-muted-foreground"}`}>{sublabel}</span>
      </div>
    </div>
  );
}
