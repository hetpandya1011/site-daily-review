import { ChevronLeft, ChevronRight, MapPin, Calendar, Users, Clock, HardHat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { JobInfo, DailySummaryMetrics } from "@/types/reports";

interface ReportHeaderProps {
  job: JobInfo;
  selectedDate: Date;
  onPreviousDay: () => void;
  onNextDay: () => void;
  metrics: DailySummaryMetrics;
}

export function ReportHeader({
  job,
  selectedDate,
  onPreviousDay,
  onNextDay,
  metrics,
}: ReportHeaderProps) {
  const formattedDate = selectedDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const isToday = new Date().toDateString() === selectedDate.toDateString();

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
      <div className="mb-5 flex items-center gap-3">
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
          disabled={isToday}
          className="h-9 w-9"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
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
          icon={Calendar}
          label="Completion"
          value={`${Math.round((metrics.reportsSubmitted / metrics.totalWorkers) * 100)}%`}
          sublabel="reports in"
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
}

function MetricCard({ icon: Icon, label, value, sublabel }: MetricCardProps) {
  return (
    <div className="rounded-lg border border-border bg-background p-3">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Icon className="h-4 w-4" />
        <span className="text-xs font-medium uppercase tracking-wide">{label}</span>
      </div>
      <div className="mt-1">
        <span className="text-xl font-semibold text-foreground">{value}</span>
        <span className="ml-1 text-xs text-muted-foreground">{sublabel}</span>
      </div>
    </div>
  );
}