import {
  CheckCircle,
  Wrench,
  Package,
  ClipboardCheck,
  AlertTriangle,
  Eye,
  Sparkles,
} from "lucide-react";
import { SiteSummary as SiteSummaryType } from "@/types/reports";
import { Separator } from "@/components/ui/separator";

interface SiteSummaryProps {
  summary: SiteSummaryType;
}

export function SiteSummary({ summary }: SiteSummaryProps) {
  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-border px-4 py-3">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-muted-foreground" />
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Site Summary (Generated)
          </h2>
        </div>
        <p className="mt-0.5 text-xs text-muted-foreground">
          Aggregated from all worker reports
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-5">
          <SummarySection
            icon={CheckCircle}
            title="Work Completed"
            items={summary.workCompleted}
            variant="success"
          />

          <Separator />

          <SummarySection
            icon={Wrench}
            title="Equipment Used"
            items={summary.equipmentUsed}
          />

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