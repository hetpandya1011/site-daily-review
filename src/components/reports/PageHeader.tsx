import { ChevronLeft, ChevronRight, MapPin, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { JobInfo } from "@/types/reports";

interface PageHeaderProps {
  job: JobInfo;
  selectedDate: Date;
  onPreviousDay: () => void;
  onNextDay: () => void;
  onToday: () => void;
  onYesterday: () => void;
}

export function PageHeader({
  job,
  selectedDate,
  onPreviousDay,
  onNextDay,
  onToday,
  onYesterday,
}: PageHeaderProps) {
  const formattedDate = selectedDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const today = new Date();
  const isToday = today.toDateString() === selectedDate.toDateString();
  
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const isYesterday = yesterday.toDateString() === selectedDate.toDateString();

  const isFutureDisabled = isToday;

  return (
    <header className="border-b border-border bg-card px-6 py-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Job Info */}
        <div>
          <h1 className="text-xl font-semibold text-foreground">{job.name}</h1>
          <div className="mt-1 flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span className="text-sm">{job.address}</span>
          </div>
        </div>

        {/* Date Navigation */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            <Button
              variant={isToday ? "secondary" : "outline"}
              size="sm"
              onClick={onToday}
              disabled={isToday}
              className="h-8 text-xs"
            >
              Today
            </Button>
            <Button
              variant={isYesterday ? "secondary" : "outline"}
              size="sm"
              onClick={onYesterday}
              disabled={isYesterday}
              className="h-8 text-xs"
            >
              Yesterday
            </Button>
          </div>

          <div className="h-6 w-px bg-border" />

          {/* Date Picker */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={onPreviousDay}
              className="h-8 w-8"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-2 min-w-[180px]">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">
                {formattedDate}
              </span>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={onNextDay}
              disabled={isFutureDisabled}
              className="h-8 w-8"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
