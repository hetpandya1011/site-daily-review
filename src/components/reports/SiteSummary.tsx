import {
  CheckCircle,
  Wrench,
  Package,
  ClipboardCheck,
  AlertTriangle,
  Eye,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import { SiteSummary as SiteSummaryType } from "@/types/reports";
import { Separator } from "@/components/ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface SiteSummaryProps {
  summary: SiteSummaryType;
  reportCount: number;
}

export function SiteSummary({ summary, reportCount }: SiteSummaryProps) {
  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-border px-4 py-3">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-muted-foreground" />
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Daily Site Summary
          </h2>
        </div>
        <p className="mt-0.5 text-xs text-muted-foreground">
          Generated from {reportCount} worker reports
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-5">
          {/* Key Highlights - Always visible at top */}
          <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
            <h3 className="mb-3 text-sm font-semibold text-foreground">Key Highlights</h3>
            <ul className="space-y-2">
              {summary.keyHighlights.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-sm text-foreground"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <Separator />

          <SummarySection
            icon={CheckCircle}
            title="Work Completed"
            items={summary.workCompleted}
            variant="success"
          />

          <Separator />

          {/* Equipment Used - Collapsible */}
          <CollapsibleSection icon={Wrench} title="Equipment Used">
            <ul className="space-y-1.5 pl-6">
              {summary.equipmentUsed.map((item, index) => (
                <li
                  key={index}
                  className="relative text-sm text-muted-foreground before:absolute before:-left-3 before:top-2 before:h-1 before:w-1 before:rounded-full before:bg-border"
                >
                  {item}
                </li>
              ))}
            </ul>
          </CollapsibleSection>

          <Separator />

          <QuantitiesSection quantities={summary.quantities} />

          <Separator />

          <SummarySection
            icon={ClipboardCheck}
            title="Quality Control Notes"
            items={summary.qualityControlNotes}
          />

          <Separator />

          <SummarySection
            icon={AlertTriangle}
            title="Issues"
            items={summary.issues}
            variant="warning"
          />

          <Separator />

          <SummarySection
            icon={Eye}
            title="Observations"
            items={summary.observations}
          />
        </div>
      </div>
    </div>
  );
}

interface SummarySectionProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  items: string[];
  variant?: "default" | "success" | "warning";
}

function SummarySection({
  icon: Icon,
  title,
  items,
  variant = "default",
}: SummarySectionProps) {
  const iconColorClass = {
    default: "text-muted-foreground",
    success: "text-status-submitted",
    warning: "text-status-pending",
  }[variant];

  return (
    <div>
      <div className="mb-2 flex items-center gap-2">
        <Icon className={`h-4 w-4 ${iconColorClass}`} />
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      </div>
      <ul className="space-y-1.5 pl-6">
        {items.map((item, index) => (
          <li
            key={index}
            className="relative text-sm text-muted-foreground before:absolute before:-left-3 before:top-2 before:h-1 before:w-1 before:rounded-full before:bg-border"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

interface QuantitiesSectionProps {
  quantities: { item: string; total: string }[];
}

function QuantitiesSection({ quantities }: QuantitiesSectionProps) {
  return (
    <div>
      <div className="mb-2 flex items-center gap-2">
        <Package className="h-4 w-4 text-muted-foreground" />
        <h3 className="text-sm font-semibold text-foreground">Quantities</h3>
      </div>
      <div className="rounded-lg border border-border bg-background">
        <table className="w-full">
          <tbody>
            {quantities.map((q, index) => (
              <tr
                key={index}
                className={index !== quantities.length - 1 ? "border-b border-border" : ""}
              >
                <td className="px-3 py-2 text-sm text-muted-foreground">{q.item}</td>
                <td className="px-3 py-2 text-right text-sm font-medium text-foreground">
                  {q.total}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

interface CollapsibleSectionProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  children: React.ReactNode;
}

function CollapsibleSection({ icon: Icon, title, children }: CollapsibleSectionProps) {
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
