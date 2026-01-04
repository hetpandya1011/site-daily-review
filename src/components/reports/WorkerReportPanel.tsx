import { X, Clock, User, Wrench, Package, ClipboardCheck, AlertTriangle, Eye } from "lucide-react";
import { WorkerReport } from "@/types/reports";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface WorkerReportPanelProps {
  report: WorkerReport | null;
  isOpen: boolean;
  onClose: () => void;
}

export function WorkerReportPanel({ report, isOpen, onClose }: WorkerReportPanelProps) {
  if (!report) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-foreground/20 transition-opacity",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={cn(
          "fixed right-0 top-0 z-50 h-full w-full max-w-lg transform border-l border-border bg-card shadow-xl transition-transform duration-300 ease-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Panel Header */}
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                <User className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">
                  {report.workerName}
                </h2>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>{report.role}</span>
                  <span className="text-border">•</span>
                  <span>{report.crew}</span>
                </div>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Submission Info */}
          <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-5 py-2.5">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Submitted at {report.submittedAt}
            </span>
            <span className="text-muted-foreground">•</span>
            <span className="text-sm font-medium text-foreground">
              {report.fullReport.hoursWorked} hours worked
            </span>
          </div>

          {/* Panel Content */}
          <div className="flex-1 overflow-y-auto p-5">
            <div className="space-y-5">
              {/* Work Completed */}
              <ReportSection title="Work Completed">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {report.fullReport.workCompleted}
                </p>
              </ReportSection>

              <Separator />

              {/* Equipment Used */}
              <ReportSection title="Equipment Used" icon={Wrench}>
                <div className="flex flex-wrap gap-2">
                  {report.fullReport.equipmentUsed.map((item, index) => (
                    <span
                      key={index}
                      className="rounded-md border border-border bg-background px-2.5 py-1 text-sm text-foreground"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </ReportSection>

              <Separator />

              {/* Materials & Quantities */}
              <ReportSection title="Materials & Quantities" icon={Package}>
                <div className="rounded-lg border border-border bg-background">
                  <table className="w-full">
                    <tbody>
                      {report.fullReport.materialsQuantities.map((mq, index) => (
                        <tr
                          key={index}
                          className={
                            index !== report.fullReport.materialsQuantities.length - 1
                              ? "border-b border-border"
                              : ""
                          }
                        >
                          <td className="px-3 py-2 text-sm text-muted-foreground">
                            {mq.item}
                          </td>
                          <td className="px-3 py-2 text-right text-sm font-medium text-foreground">
                            {mq.quantity}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </ReportSection>

              <Separator />

              {/* Quality Control Notes */}
              <ReportSection title="Quality Control Notes" icon={ClipboardCheck}>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {report.fullReport.qualityControlNotes}
                </p>
              </ReportSection>

              <Separator />

              {/* Issues */}
              <ReportSection title="Issues" icon={AlertTriangle} variant="warning">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {report.fullReport.issues || "No issues reported"}
                </p>
              </ReportSection>

              <Separator />

              {/* Observations */}
              <ReportSection title="Observations" icon={Eye}>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {report.fullReport.observations || "No additional observations"}
                </p>
              </ReportSection>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

interface ReportSectionProps {
  title: string;
  icon?: React.ComponentType<{ className?: string }>;
  variant?: "default" | "warning";
  children: React.ReactNode;
}

function ReportSection({
  title,
  icon: Icon,
  variant = "default",
  children,
}: ReportSectionProps) {
  const iconColorClass = variant === "warning" ? "text-status-pending" : "text-muted-foreground";

  return (
    <div>
      <div className="mb-2 flex items-center gap-2">
        {Icon && <Icon className={`h-4 w-4 ${iconColorClass}`} />}
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      </div>
      {children}
    </div>
  );
}