import { Thermometer, Wind, CloudRain, Cloud } from "lucide-react";
import { WeatherSummary as WeatherSummaryType } from "@/types/reports";

interface WeatherSummaryProps {
  weather: WeatherSummaryType;
}

export function WeatherSummary({ weather }: WeatherSummaryProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-3">
      <div className="flex flex-wrap items-center gap-4 text-sm">
        {/* Temperature */}
        <div className="flex items-center gap-2">
          <Thermometer className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium text-foreground">
            {weather.tempLow}° / {weather.tempHigh}°F
          </span>
        </div>

        <div className="h-4 w-px bg-border" />

        {/* Wind */}
        <div className="flex items-center gap-2">
          <Wind className="h-4 w-4 text-muted-foreground" />
          <span className="text-foreground">
            {weather.windSpeed} mph {weather.windDirection}
          </span>
        </div>

        <div className="h-4 w-px bg-border" />

        {/* Precipitation */}
        <div className="flex items-center gap-2">
          <CloudRain className="h-4 w-4 text-muted-foreground" />
          <span className="text-foreground">{weather.precipitation}</span>
        </div>

        <div className="h-4 w-px bg-border" />

        {/* Cloud Cover */}
        <div className="flex items-center gap-2">
          <Cloud className="h-4 w-4 text-muted-foreground" />
          <span className="text-foreground">{weather.cloudCover}</span>
        </div>
      </div>
    </div>
  );
}
