import { X, Clock, User, Wrench, Package, ClipboardCheck, AlertTriangle, Eye, ChevronDown } from "lucide-react";
import { WorkerReport } from "@/types/reports";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface WorkerReportPanelProps {
  report: WorkerReport | null;
  isOpen: boolean;
  onClose: () => void;
}

export function WorkerReportPanel({ report, isOpen, onClose }: WorkerReportPanelProps) {
  if (!report) return null;

  const hasIssues = report.fullReport.issues && report.fullReport.issues.trim() !== "";

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
              {/* Work Completed - Always visible */}
              <ReportSection title="Work Completed">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {report.fullReport.workCompleted}
                </p>
              </ReportSection>

              <Separator />

              {/* Issues - Always visible when present */}
              {hasIssues && (
                <>
                  <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-destructive" />
                      <h3 className="text-sm font-semibold text-destructive">Issues Reported</h3>
                    </div>
                    <p className="text-sm leading-relaxed text-foreground">
                      {report.fullReport.issues}
                    </p>
                  </div>
                  <Separator />
                </>
              )}

              {/* Equipment Used - Collapsible */}
              <CollapsibleSection title="Equipment Used" icon={Wrench}>
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
              </CollapsibleSection>

              <Separator />

              {/* Materials & Quantities - Collapsible */}
              <CollapsibleSection title="Materials & Quantities" icon={Package}>
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
              </CollapsibleSection>

              <Separator />

              {/* Quality Control Notes - Collapsible */}
              <CollapsibleSection title="Quality Control Notes" icon={ClipboardCheck}>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {report.fullReport.qualityControlNotes}
                </p>
              </CollapsibleSection>

              <Separator />

              {/* Observations - Collapsible */}
              <CollapsibleSection title="Observations" icon={Eye}>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {report.fullReport.observations || "No additional observations"}
                </p>
              </CollapsibleSection>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

interface ReportSectionProps {
  title: string;
  children: React.ReactNode;
}

function ReportSection({ title, children }: ReportSectionProps) {
  return (
    <div>
      <div className="mb-2">
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      </div>
      {children}
    </div>
  );
}

interface CollapsibleSectionProps {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}

function CollapsibleSection({ title, icon: Icon, children }: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className="flex w-full items-center justify-between py-1 text-left">
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        </div>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-muted-foreground transition-transform",
            isOpen && "rotate-180"
          )}
        />
      </CollapsibleTrigger>
      <CollapsibleContent className="pt-3">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
}
