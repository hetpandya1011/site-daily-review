export type ReportStatus = "submitted" | "missing" | "late";
export type ConfidenceLevel = "high" | "medium" | "low";

export interface WorkerReport {
  id: string;
  workerId: string;
  workerName: string;
  role: string;
  crew: string;
  submittedAt: string | null;
  summarySnippet: string;
  status: ReportStatus;
  confidence: ConfidenceLevel;
  hasIssues: boolean;
  fullReport?: {
    workCompleted: string;
    hoursWorked: number;
    equipmentUsed: string[];
    materialsQuantities: { item: string; quantity: string }[];
    qualityControlNotes: string;
    issues: string;
    observations: string;
  };
}

export interface SiteSummary {
  keyHighlights: string[];
  workCompleted: string[];
  issuesAndRisks: string[];
  equipmentUsed: string[];
  quantities: { item: string; total: string }[];
  qualityControlNotes: string[];
  observations: string[];
}

export interface JobInfo {
  id: string;
  name: string;
  location: string;
  address: string;
}

export interface DailySummaryMetrics {
  reportsSubmitted: number;
  totalWorkers: number;
  missingReports: number;
  totalHoursWorked: number;
  activeCrews: number;
  safetyIssues: number;
}

export interface WeatherSummary {
  tempLow: number;
  tempHigh: number;
  windSpeed: number;
  windDirection: string;
  precipitation: string;
  cloudCover: string;
}

export interface ShiftInfo {
  shiftType: "Day" | "Night";
  startTime: string;
  endTime: string;
  workersAssigned: number;
}

export interface SiteMaterials {
  bentoniteUsed: string;
  slurryBatches: number;
  backfillPlaced: string;
  loadsHauled: number;
}

export interface SiteEquipment {
  name: string;
  count: number;
}

export interface PlannedActivity {
  activity: string;
}
