export interface WorkerReport {
  id: string;
  workerId: string;
  workerName: string;
  role: string;
  crew: string;
  submittedAt: string;
  summarySnippet: string;
  viewed: boolean;
  fullReport: {
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
  workCompleted: string[];
  equipmentUsed: string[];
  quantities: { item: string; total: string }[];
  qualityControlNotes: string[];
  issues: string[];
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
  totalHoursWorked: number;
  activeCrews: number;
}