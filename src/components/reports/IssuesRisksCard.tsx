import { AlertTriangle } from "lucide-react";
import { IssueItem, IssueSeverity } from "@/types/reports";
import { cn } from "@/lib/utils";

interface IssuesRisksCardProps {
  issues: IssueItem[];
}

export function IssuesRisksCard({ issues }: IssuesRisksCardProps) {
  if (issues.length === 0) return null;

  return (
    <div className="rounded-xl border-2 border-destructive/40 bg-destructive/5 shadow-sm">
      {/* Header */}
      <div className="border-b border-destructive/20 bg-destructive/10 px-5 py-3">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-destructive" />
          <h2 className="text-sm font-bold text-destructive uppercase tracking-wide">
            Issues / Risks ({issues.length})
          </h2>
        </div>
        <p className="mt-0.5 text-xs text-destructive/70">
          Items requiring attention
        </p>
      </div>

      {/* Issues List */}
      <div className="p-4 space-y-2.5">
        {issues.map((issue, index) => (
          <div
            key={index}
            className="flex items-start gap-3"
          >
            <SeverityBadge severity={issue.severity} />
            <span className="text-sm text-foreground flex-1">{issue.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SeverityBadge({ severity }: { severity: IssueSeverity }) {
  const styles = {
    high: "bg-destructive text-destructive-foreground",
    medium: "bg-status-pending text-white",
    low: "bg-muted text-muted-foreground",
  };

  return (
    <span
      className={cn(
        "flex-shrink-0 rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide",
        styles[severity]
      )}
    >
      {severity}
    </span>
  );
}
