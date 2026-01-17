import { useState, useMemo } from "react";
import { 
  User, 
  Clock, 
  AlertTriangle, 
  ChevronDown, 
  UserX,
  CheckCircle,
  Clock3,
  Wrench,
  Package,
  ClipboardCheck,
  Eye
} from "lucide-react";
import { WorkerReport, ConfidenceLevel } from "@/types/reports";
import { cn } from "@/lib/utils";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";

interface WorkerReportsTableProps {
  reports: WorkerReport[];
}

// Sort priority: missing first, then has-issues, then late, then submitted
function getStatusPriority(report: WorkerReport): number {
  if (report.status === "missing") return 0;
  if (report.hasIssues) return 1;
  if (report.status === "late") return 2;
  return 3;
}

export function WorkerReportsTable({ reports }: WorkerReportsTableProps) {
  const sortedReports = useMemo(() => {
    return [...reports].sort((a, b) => {
      return getStatusPriority(a) - getStatusPriority(b);
    });
  }, [reports]);

  const submittedCount = reports.filter(r => r.status !== "missing").length;
  const missingCount = reports.filter(r => r.status === "missing").length;

  return (
    <div className="rounded-xl border border-border bg-card shadow-sm">
      {/* Header */}
      <div className="border-b border-border px-5 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Worker Daily Reports</h2>
            <p className="mt-0.5 text-sm text-muted-foreground">
              {submittedCount} submitted
              {missingCount > 0 && (
                <span className="text-destructive font-medium"> • {missingCount} missing</span>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Reports List */}
      <div className="divide-y divide-border">
        {sortedReports.map((report) => (
          <WorkerReportRow key={report.id} report={report} />
        ))}
      </div>
    </div>
  );
}

interface WorkerReportRowProps {
  report: WorkerReport;
}

function WorkerReportRow({ report }: WorkerReportRowProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isMissing = report.status === "missing";

  return (
    <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
      <CollapsibleTrigger 
        className={cn(
          "w-full px-5 py-3 text-left transition-colors hover:bg-muted/50",
          isMissing && "bg-destructive/5 hover:bg-destructive/10"
        )}
        disabled={isMissing}
      >
        <div className="flex items-center gap-4">
          {/* Worker Avatar */}
          <div className={cn(
            "flex h-10 w-10 items-center justify-center rounded-full flex-shrink-0",
            isMissing ? "bg-destructive/10 text-destructive" : "bg-secondary text-secondary-foreground"
          )}>
            {isMissing ? <UserX className="h-5 w-5" /> : <User className="h-5 w-5" />}
          </div>

          {/* Worker Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={cn(
                "font-medium",
                isMissing ? "text-destructive" : "text-foreground"
              )}>
                {report.workerName}
              </span>
              <StatusBadge status={report.status} />
              <ConfidenceBadge confidence={report.confidence} />
              {report.hasIssues && !isMissing && (
                <span className="inline-flex items-center gap-1 rounded-full bg-destructive/10 px-1.5 py-0.5 text-[10px] font-medium text-destructive">
                  <AlertTriangle className="h-2.5 w-2.5" />
                  Issue
                </span>
              )}
            </div>
            <div className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
              <span>{report.role}</span>
              <span className="text-border">•</span>
              <span>{report.crew}</span>
            </div>
          </div>

          {/* Activity Summary */}
          {!isMissing && (
            <p className="hidden md:block text-sm text-muted-foreground max-w-xs truncate">
              {report.summarySnippet}
            </p>
          )}
          {isMissing && (
            <p className="text-sm font-medium text-destructive">
              Report not submitted
            </p>
          )}

          {/* Timestamp */}
          {!isMissing && (
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground flex-shrink-0">
              <Clock className="h-3.5 w-3.5" />
              {report.submittedAt}
            </div>
          )}

          {/* Expand Icon */}
          {!isMissing && (
            <ChevronDown className={cn(
              "h-4 w-4 text-muted-foreground transition-transform flex-shrink-0",
              isExpanded && "rotate-180"
            )} />
          )}
        </div>
      </CollapsibleTrigger>

      {!isMissing && report.fullReport && (
        <CollapsibleContent>
          <ExpandedReportContent report={report} />
        </CollapsibleContent>
      )}
    </Collapsible>
  );
}

function StatusBadge({ status }: { status: WorkerReport["status"] }) {
  switch (status) {
    case "missing":
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-destructive/10 px-2 py-0.5 text-[10px] font-medium text-destructive">
          <UserX className="h-2.5 w-2.5" />
          Missing
        </span>
      );
    case "late":
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-status-pending/10 px-2 py-0.5 text-[10px] font-medium text-status-pending">
          <Clock3 className="h-2.5 w-2.5" />
          Late
        </span>
      );
    case "submitted":
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-status-submitted/10 px-2 py-0.5 text-[10px] font-medium text-status-submitted">
          <CheckCircle className="h-2.5 w-2.5" />
          Submitted
        </span>
      );
  }
}

function ConfidenceBadge({ confidence }: { confidence: ConfidenceLevel }) {
  const styles = {
    high: "bg-status-submitted/10 text-status-submitted",
    medium: "bg-status-pending/10 text-status-pending",
    low: "bg-muted text-muted-foreground",
  };

  return (
    <span className={cn(
      "rounded-full px-1.5 py-0.5 text-[10px] font-medium capitalize",
      styles[confidence]
    )}>
      {confidence} conf.
    </span>
  );
}

function ExpandedReportContent({ report }: { report: WorkerReport }) {
  const { fullReport } = report;
  if (!fullReport) return null;

  const hasIssues = fullReport.issues && fullReport.issues.trim() !== "";

  return (
    <div className="px-5 pb-5 pt-2 ml-14 border-t border-border/50 bg-muted/30">
      <div className="grid gap-5 md:grid-cols-2">
        {/* Left Column */}
        <div className="space-y-4">
          {/* Work Completed */}
          <section>
            <h4 className="text-sm font-semibold text-foreground mb-2">Work Completed</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {fullReport.workCompleted}
            </p>
          </section>

          {/* Issues */}
          {hasIssues && (
            <section className="rounded-lg border border-destructive/30 bg-destructive/5 p-3">
              <h4 className="text-sm font-semibold text-destructive mb-2 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Issues Reported
              </h4>
              <p className="text-sm text-foreground leading-relaxed">
                {fullReport.issues}
              </p>
            </section>
          )}

          {/* Metrics */}
          <section className="flex gap-4">
            <div className="rounded-lg border border-border bg-background px-3 py-2">
              <div className="text-xs text-muted-foreground">Hours Worked</div>
              <div className="text-lg font-semibold text-foreground">{fullReport.hoursWorked}</div>
            </div>
          </section>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          {/* Equipment Used */}
          <section>
            <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
              <Wrench className="h-4 w-4 text-muted-foreground" />
              Equipment Used
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {fullReport.equipmentUsed.map((item, index) => (
                <span
                  key={index}
                  className="rounded border border-border bg-background px-2 py-1 text-xs text-foreground"
                >
                  {item}
                </span>
              ))}
            </div>
          </section>

          {/* Materials & Quantities */}
          <section>
            <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
              <Package className="h-4 w-4 text-muted-foreground" />
              Materials & Quantities
            </h4>
            <div className="rounded border border-border bg-background overflow-hidden">
              {fullReport.materialsQuantities.map((mq, index) => (
                <div 
                  key={index} 
                  className={cn(
                    "flex justify-between px-3 py-1.5 text-xs",
                    index !== fullReport.materialsQuantities.length - 1 && "border-b border-border"
                  )}
                >
                  <span className="text-muted-foreground">{mq.item}</span>
                  <span className="font-medium text-foreground">{mq.quantity}</span>
                </div>
              ))}
            </div>
          </section>

          {/* QC Notes */}
          <section>
            <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
              <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
              QC Notes
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {fullReport.qualityControlNotes}
            </p>
          </section>

          {/* Observations */}
          {fullReport.observations && (
            <section>
              <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                <Eye className="h-4 w-4 text-muted-foreground" />
                Observations
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {fullReport.observations}
              </p>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
