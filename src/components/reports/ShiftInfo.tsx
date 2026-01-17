import { Sun, Moon, Clock, Users } from "lucide-react";
import { ShiftInfo as ShiftInfoType } from "@/types/reports";
import { cn } from "@/lib/utils";

interface ShiftInfoProps {
  shift: ShiftInfoType;
}

export function ShiftInfo({ shift }: ShiftInfoProps) {
  const isDay = shift.shiftType === "Day";

  return (
    <div className="flex items-center gap-3 text-sm">
      {/* Shift Type Badge */}
      <div
        className={cn(
          "flex items-center gap-1.5 rounded-full px-2.5 py-1 font-medium",
          isDay
            ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
            : "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400"
        )}
      >
        {isDay ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
        <span>{shift.shiftType}</span>
      </div>

      {/* Times */}
      <div className="flex items-center gap-1.5 text-muted-foreground">
        <Clock className="h-3.5 w-3.5" />
        <span>
          {shift.startTime} – {shift.endTime}
        </span>
      </div>

      {/* Workers */}
      <div className="flex items-center gap-1.5 text-muted-foreground">
        <Users className="h-3.5 w-3.5" />
        <span>{shift.workersAssigned} workers</span>
      </div>
    </div>
  );
}
