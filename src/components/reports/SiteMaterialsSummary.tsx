import { Package, Beaker, Truck, Layers } from "lucide-react";
import { SiteMaterials } from "@/types/reports";

interface SiteMaterialsSummaryProps {
  materials: SiteMaterials;
}

export function SiteMaterialsSummary({ materials }: SiteMaterialsSummaryProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <h3 className="text-sm font-semibold text-foreground mb-3">
        Materials Used Today
      </h3>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <MaterialItem
          icon={Package}
          label="Bentonite"
          value={materials.bentoniteUsed}
        />
        <MaterialItem
          icon={Beaker}
          label="Slurry Batches"
          value={materials.slurryBatches.toString()}
        />
        <MaterialItem
          icon={Layers}
          label="Backfill Placed"
          value={materials.backfillPlaced}
        />
        <MaterialItem
          icon={Truck}
          label="Loads Hauled"
          value={materials.loadsHauled.toString()}
        />
      </div>
    </div>
  );
}

interface MaterialItemProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}

function MaterialItem({ icon: Icon, label, value }: MaterialItemProps) {
  return (
    <div className="flex items-start gap-2">
      <Icon className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
      <div>
        <div className="text-xs text-muted-foreground">{label}</div>
        <div className="text-sm font-medium text-foreground">{value}</div>
      </div>
    </div>
  );
}
