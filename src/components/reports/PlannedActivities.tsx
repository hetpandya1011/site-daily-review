import { CalendarClock, ArrowRight } from "lucide-react";
import { PlannedActivity } from "@/types/reports";

interface PlannedActivitiesProps {
  activities: PlannedActivity[];
}

export function PlannedActivities({ activities }: PlannedActivitiesProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
        <CalendarClock className="h-4 w-4 text-muted-foreground" />
        Planned Activities – Next Shift
      </h3>
      <ul className="space-y-2">
        {activities.map((item, index) => (
          <li key={index} className="flex items-start gap-2 text-sm">
            <ArrowRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
            <span className="text-foreground">{item.activity}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
