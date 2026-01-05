import { Clock, User, ChevronRight, AlertTriangle, Clock3 } from "lucide-react";
import { WorkerReport, ReportStatus } from "@/types/reports";
import { cn } from "@/lib/utils";
import { useMemo } from "react";

interface WorkerReportsListProps {
  reports: WorkerReport[];
  selectedReportId: string | null;
  onSelectReport: (report: WorkerReport) => void;
}

// Sort priority: has-issues first, then late, then normal
function getStatusPriority(status: ReportStatus): number {
  switch (status) {
    case "has-issues":
      return 0;
    case "late":
      return 1;
    case "normal":
      return 2;
  }
}

export function WorkerReportsList({
  reports,
  selectedReportId,
  onSelectReport,
}: WorkerReportsListProps) {
  const sortedReports = useMemo(() => {
    return [...reports].sort((a, b) => {
      const priorityDiff = getStatusPriority(a.status) - getStatusPriority(b.status);
      if (priorityDiff !== 0) return priorityDiff;
      // Secondary sort by viewed status (unviewed first)
      if (!a.viewed && b.viewed) return -1;
      if (a.viewed && !b.viewed) return 1;
      return 0;
    });
  }, [reports]);

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-border px-4 py-3">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Worker Daily Reports
        </h2>
        <p className="mt-0.5 text-xs text-muted-foreground">
          {reports.length} reports submitted
        </p>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="space-y-2 p-3">
          {sortedReports.map((report) => (
            <WorkerReportCard
              key={report.id}
              report={report}
              isSelected={selectedReportId === report.id}
              onClick={() => onSelectReport(report)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

interface WorkerReportCardProps {
  report: WorkerReport;
  isSelected: boolean;
  onClick: () => void;
}

function StatusIndicator({ status, viewed }: { status: ReportStatus; viewed: boolean }) {
  if (status === "has-issues") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-destructive/10 px-1.5 py-0.5 text-[10px] font-medium text-destructive">
        <AlertTriangle className="h-2.5 w-2.5" />
        Has Issues
      </span>
    );
  }
  if (status === "late") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-status-pending/10 px-1.5 py-0.5 text-[10px] font-medium text-status-pending">
        <Clock3 className="h-2.5 w-2.5" />
        Late
      </span>
    );
  }
  if (!viewed) {
    return (
      <span className="rounded-full bg-accent px-1.5 py-0.5 text-[10px] font-medium text-accent-foreground">
        New
      </span>
    );
  }
  return null;
}

function WorkerReportCard({ report, isSelected, onClick }: WorkerReportCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full rounded-lg border border-border bg-card p-4 text-left transition-all hover:border-primary/30 hover:shadow-sm",
        isSelected && "border-primary bg-primary/5 shadow-sm",
        report.status === "has-issues" && !isSelected && "border-l-4 border-l-destructive",
        report.status === "late" && !isSelected && "border-l-4 border-l-status-pending",
        report.status === "normal" && !report.viewed && !isSelected && "border-l-4 border-l-accent"
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
            <User className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-foreground">{report.workerName}</span>
              <StatusIndicator status={report.status} viewed={report.viewed} />
            </div>
            <div className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
              <span>{report.role}</span>
              <span className="text-border">•</span>
              <span>{report.crew}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Clock className="h-3.5 w-3.5" />
          <span className="text-xs">{report.submittedAt}</span>
          <ChevronRight className="h-4 w-4" />
        </div>
      </div>

      <p className="mt-3 line-clamp-1 text-sm text-muted-foreground">
        {report.summarySnippet}
      </p>
    </button>
  );
}
