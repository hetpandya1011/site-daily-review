import { useState } from "react";
import { Sparkles, CheckCircle, ChevronDown } from "lucide-react";
import { SiteSummary } from "@/types/reports";
import { cn } from "@/lib/utils";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface DailySiteSummaryProps {
  summary: SiteSummary;
  reportCount: number;
}

export function DailySiteSummary({ summary, reportCount }: DailySiteSummaryProps) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="rounded-xl border-2 border-primary/20 bg-card shadow-md">
      {/* Header */}
      <div className="border-b border-primary/10 bg-primary/5 px-6 py-4">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-bold text-foreground">Daily Site Summary</h2>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          Generated from {reportCount} worker reports
        </p>
      </div>

      {/* Content */}
      <div className="p-6 space-y-5">
        {/* Key Highlights - Compact Pills */}
        <section>
          <div className="flex flex-wrap gap-2">
            {summary.keyHighlights.slice(0, 3).map((item, index) => (
              <div
                key={index}
                className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-3 py-1.5"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                <span className="text-sm font-medium text-foreground">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Collapsible Details */}
        <Collapsible open={showDetails} onOpenChange={setShowDetails}>
          <CollapsibleTrigger className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors font-medium">
            <ChevronDown className={cn(
              "h-4 w-4 transition-transform",
              showDetails && "rotate-180"
            )} />
            {showDetails ? "Hide details" : "View details"}
          </CollapsibleTrigger>

          <CollapsibleContent className="mt-4 space-y-5">
            {/* Work Completed */}
            <section>
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-status-submitted" />
                Work Completed
              </h3>
              <ul className="space-y-2">
                {summary.workCompleted.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-muted-foreground/40" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
}
