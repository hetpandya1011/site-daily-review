import { Sparkles, CheckCircle, AlertTriangle } from "lucide-react";
import { SiteSummary } from "@/types/reports";

interface DailySiteSummaryProps {
  summary: SiteSummary;
  reportCount: number;
}

export function DailySiteSummary({ summary, reportCount }: DailySiteSummaryProps) {
  const hasIssues = summary.issuesAndRisks.length > 0;

  return (
    <div className="rounded-xl border border-border bg-card shadow-sm">
      {/* Header */}
      <div className="border-b border-border px-5 py-4">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Daily Site Summary</h2>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          Generated from {reportCount} worker reports
        </p>
      </div>

      {/* Content */}
      <div className="p-5 space-y-5">
        {/* Key Highlights */}
        <section>
          <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-primary" />
            Key Highlights
          </h3>
          <ul className="space-y-2">
            {summary.keyHighlights.map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-foreground">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary/60" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Work Completed */}
        <section>
          <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-status-submitted" />
            Work Completed
          </h3>
          <ul className="space-y-1.5">
            {summary.workCompleted.slice(0, 5).map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-border" />
                {item}
              </li>
            ))}
            {summary.workCompleted.length > 5 && (
              <li className="text-xs text-muted-foreground pl-3">
                +{summary.workCompleted.length - 5} more items
              </li>
            )}
          </ul>
        </section>

        {/* Issues / Risks */}
        {hasIssues && (
          <section className="rounded-lg border border-destructive/20 bg-destructive/5 p-4">
            <h3 className="text-sm font-semibold text-destructive mb-3 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Issues / Risks ({summary.issuesAndRisks.length})
            </h3>
            <ul className="space-y-2">
              {summary.issuesAndRisks.map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-foreground">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-destructive" />
                  {item}
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}
