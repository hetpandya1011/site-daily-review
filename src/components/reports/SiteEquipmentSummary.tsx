import { HardHat } from "lucide-react";
import { SiteEquipment } from "@/types/reports";

interface SiteEquipmentSummaryProps {
  equipment: SiteEquipment[];
}

export function SiteEquipmentSummary({ equipment }: SiteEquipmentSummaryProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
        <HardHat className="h-4 w-4 text-muted-foreground" />
        Equipment Used Today
      </h3>
      <div className="flex flex-wrap gap-2">
        {equipment.map((item) => (
          <div
            key={item.name}
            className="inline-flex items-center gap-1.5 rounded-md border border-border bg-muted/30 px-2.5 py-1.5 text-sm"
          >
            <span className="text-foreground">{item.name}</span>
            {item.count > 1 && (
              <span className="rounded bg-primary/10 px-1.5 py-0.5 text-xs font-medium text-primary">
                ×{item.count}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
