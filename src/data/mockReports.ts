import { 
  WorkerReport, 
  SiteSummary, 
  JobInfo, 
  DailySummaryMetrics,
  WeatherSummary,
  ShiftInfo,
  SiteMaterials,
  SiteEquipment,
  PlannedActivity
} from "@/types/reports";

export const mockJob: JobInfo = {
  id: "job-001",
  name: "Oakwood Industrial Site Remediation",
  location: "Oakwood Business Park",
  address: "1420 Industrial Boulevard, Oakwood, OH 45873",
};

export const mockWorkerReports: WorkerReport[] = [
  // Missing reports - should appear at top
  {
    id: "report-missing-001",
    workerId: "worker-008",
    workerName: "Michael Foster",
    role: "Heavy Equipment Operator",
    crew: "Crew B",
    submittedAt: null,
    summarySnippet: "",
    status: "missing",
    confidence: "low",
    hasIssues: false,
  },
  {
    id: "report-missing-002",
    workerId: "worker-009",
    workerName: "Patricia Wong",
    role: "Site Supervisor",
    crew: "Crew A",
    submittedAt: null,
    summarySnippet: "",
    status: "missing",
    confidence: "low",
    hasIssues: false,
  },
  // Submitted reports
  {
    id: "report-001",
    workerId: "worker-001",
    workerName: "Marcus Johnson",
    role: "Excavation Lead",
    crew: "Crew A",
    submittedAt: "4:32 PM",
    summarySnippet: "Completed excavation of Zone B-3, removed 45 cubic yards",
    status: "submitted",
    confidence: "high",
    hasIssues: true,
    fullReport: {
      workCompleted: "Completed excavation of contaminated soil in Zone B-3. Removed approximately 45 cubic yards of soil to a depth of 6 feet. Exposed former underground storage tank foundation. Area prepared for confirmation sampling.",
      hoursWorked: 9.5,
      equipmentUsed: ["CAT 320 Excavator", "Articulated Dump Trucks (2)", "Water Truck"],
      materialsQuantities: [
        { item: "Soil Removed", quantity: "45 cubic yards" },
        { item: "Poly Sheeting", quantity: "200 sq ft" },
      ],
      qualityControlNotes: "All excavated soil staged on poly sheeting per HASP requirements. Dust suppression maintained throughout excavation.",
      issues: "Encountered unexpected debris (concrete chunks) at 4-ft depth. Slowed progress by approximately 1 hour.",
      observations: "Soil color and odor consistent with petroleum contamination below 3-ft depth. Recommend additional sampling at UST foundation.",
    },
  },
  {
    id: "report-002",
    workerId: "worker-002",
    workerName: "Sarah Chen",
    role: "Environmental Technician",
    crew: "Crew A",
    submittedAt: "4:45 PM",
    summarySnippet: "Collected 12 confirmation soil samples from Zone B-3",
    status: "submitted",
    confidence: "high",
    hasIssues: false,
    fullReport: {
      workCompleted: "Collected 12 confirmation soil samples from Zone B-3 excavation sidewalls and floor. Samples labeled and documented per project protocol. Prepared samples for overnight shipment to lab.",
      hoursWorked: 8,
      equipmentUsed: ["Stainless Steel Hand Auger", "Brass Sampling Tubes", "PID Meter"],
      materialsQuantities: [
        { item: "Soil Samples", quantity: "12 samples" },
        { item: "Sample Containers", quantity: "36 jars" },
      ],
      qualityControlNotes: "PID readings ranged from 0.2 to 8.4 ppm in excavation. Decontamination procedures followed between each sample location.",
      issues: "",
      observations: "Elevated PID readings (>5 ppm) observed primarily on the north sidewall. May indicate source direction.",
    },
  },
  {
    id: "report-003",
    workerId: "worker-003",
    workerName: "James Rivera",
    role: "Equipment Operator",
    crew: "Crew B",
    submittedAt: "6:12 PM",
    summarySnippet: "Operated vacuum truck for groundwater extraction",
    status: "late",
    confidence: "medium",
    hasIssues: true,
    fullReport: {
      workCompleted: "Operated vacuum truck for groundwater extraction in monitoring well network. Purged and sampled 6 monitoring wells (MW-1 through MW-6). Transported extracted groundwater to on-site treatment system.",
      hoursWorked: 8.5,
      equipmentUsed: ["Vacuum Truck", "Submersible Pump", "Flow Meter"],
      materialsQuantities: [
        { item: "Groundwater Extracted", quantity: "2,400 gallons" },
        { item: "Wells Sampled", quantity: "6 wells" },
      ],
      qualityControlNotes: "Stabilization criteria met for all wells before sampling. Flow rates documented.",
      issues: "MW-4 showing reduced yield compared to previous month. May need redevelopment.",
      observations: "Water clarity improved in MW-2 and MW-3 compared to last sampling event.",
    },
  },
  {
    id: "report-004",
    workerId: "worker-004",
    workerName: "Linda Okonkwo",
    role: "Safety Officer",
    crew: "Site-Wide",
    submittedAt: "5:15 PM",
    summarySnippet: "Conducted daily safety inspection and air monitoring",
    status: "submitted",
    confidence: "high",
    hasIssues: true,
    fullReport: {
      workCompleted: "Conducted daily site safety inspection and air monitoring. Reviewed work permits for excavation and hot work activities. Held tailgate safety meeting with all crews.",
      hoursWorked: 8,
      equipmentUsed: ["Multi-Gas Meter", "Particulate Monitor", "Noise Dosimeter"],
      materialsQuantities: [
        { item: "Safety Inspections", quantity: "3 areas" },
        { item: "Air Samples", quantity: "8 readings" },
      ],
      qualityControlNotes: "All air monitoring readings below action levels. Perimeter readings non-detect.",
      issues: "One near-miss reported: unsecured tool fell from excavator cab. Addressed immediately with operator.",
      observations: "Excellent safety compliance observed. Recommend recognition for Crew A at next safety meeting.",
    },
  },
  {
    id: "report-005",
    workerId: "worker-005",
    workerName: "Robert Kim",
    role: "Treatment System Operator",
    crew: "Crew C",
    submittedAt: "4:20 PM",
    summarySnippet: "Operated groundwater treatment system, processed 2,400 gallons",
    status: "submitted",
    confidence: "high",
    hasIssues: true,
    fullReport: {
      workCompleted: "Operated groundwater treatment system. Processed 2,400 gallons through GAC system. Performed daily system checks and documented influent/effluent parameters.",
      hoursWorked: 8,
      equipmentUsed: ["GAC Treatment System", "Oil/Water Separator", "Sample Pumps"],
      materialsQuantities: [
        { item: "Water Treated", quantity: "2,400 gallons" },
        { item: "GAC Media", quantity: "0 lbs (no change-out)" },
      ],
      qualityControlNotes: "Effluent meets discharge criteria. Influent benzene at 0.8 mg/L, effluent non-detect.",
      issues: "Pressure differential across GAC vessel increasing. Schedule media change-out within 2 weeks.",
      observations: "System running efficiently. Consider increasing throughput if extraction rates allow.",
    },
  },
  {
    id: "report-006",
    workerId: "worker-006",
    workerName: "Angela Martinez",
    role: "Field Geologist",
    crew: "Crew A",
    submittedAt: "5:02 PM",
    summarySnippet: "Logged soil borings SB-15 through SB-18 in expansion area",
    status: "submitted",
    confidence: "medium",
    hasIssues: true,
    fullReport: {
      workCompleted: "Logged soil borings SB-15 through SB-18 in proposed expansion area. Documented lithology and collected samples for laboratory analysis. Updated site geological model.",
      hoursWorked: 9,
      equipmentUsed: ["Direct Push Drill Rig", "Split Spoon Sampler", "Hand Lens"],
      materialsQuantities: [
        { item: "Borings Completed", quantity: "4 borings" },
        { item: "Soil Samples", quantity: "24 samples" },
      ],
      qualityControlNotes: "All samples collected per ASTM D1586. Recovery rates >80% for all intervals.",
      issues: "SB-17 encountered refusal at 22 ft. Possibly bedrock or large obstruction.",
      observations: "Clay layer encountered at 15-18 ft depth appears continuous across expansion area. May act as confining unit.",
    },
  },
  {
    id: "report-007",
    workerId: "worker-007",
    workerName: "Derek Thompson",
    role: "Laborer",
    crew: "Crew B",
    submittedAt: "3:45 PM",
    summarySnippet: "Managed IDW staging area, moved 8 drums to storage",
    status: "submitted",
    confidence: "high",
    hasIssues: false,
    fullReport: {
      workCompleted: "Assisted with well sampling and site housekeeping. Managed investigation-derived waste (IDW) staging area. Moved empty drums to designated storage.",
      hoursWorked: 8,
      equipmentUsed: ["Drum Dolly", "Spill Kit", "Hand Tools"],
      materialsQuantities: [
        { item: "Drums Staged", quantity: "8 drums" },
        { item: "IDW Containers", quantity: "3 containers" },
      ],
      qualityControlNotes: "All drums properly labeled and staged on secondary containment.",
      issues: "",
      observations: "IDW staging area nearing capacity. Recommend scheduling waste disposal within 1 week.",
    },
  },
];

export const mockSiteSummary: SiteSummary = {
  keyHighlights: [
    "Zone B-3 excavation completed — 45 cubic yards removed to 6 ft depth",
    "4 issues flagged requiring attention (see Issues section)",
    "36 soil samples collected; 2,400 gallons groundwater processed",
  ],
  workCompleted: [
    "Zone B-3 excavation completed to 6 feet depth, 45 cubic yards removed",
    "12 confirmation soil samples collected from excavation",
    "6 monitoring wells purged and sampled",
    "4 soil borings (SB-15 through SB-18) completed in expansion area",
    "2,400 gallons groundwater processed through treatment system",
    "Daily safety inspection and air monitoring completed",
  ],
  issuesAndRisks: [
    { text: "Near-miss incident: unsecured tool fell from excavator cab (addressed)", severity: "high" },
    { text: "GAC pressure differential increasing — media change-out needed within 2 weeks", severity: "medium" },
    { text: "MW-4 showing reduced yield — may need redevelopment", severity: "low" },
    { text: "SB-17 refusal at 22 ft (possible bedrock)", severity: "low" },
    { text: "IDW staging area nearing capacity — disposal needed within 1 week", severity: "medium" },
  ],
  equipmentUsed: [
    "CAT 320 Excavator",
    "Articulated Dump Trucks (2)",
    "Vacuum Truck",
    "Direct Push Drill Rig",
    "GAC Treatment System",
    "Multi-Gas and Particulate Monitors",
  ],
  quantities: [
    { item: "Soil Removed", total: "45 cubic yards" },
    { item: "Soil Samples Collected", total: "36 samples" },
    { item: "Groundwater Extracted/Treated", total: "2,400 gallons" },
    { item: "Monitoring Wells Sampled", total: "6 wells" },
    { item: "Borings Completed", total: "4 borings" },
  ],
  qualityControlNotes: [
    "All excavated soil staged on poly sheeting per HASP",
    "PID readings documented: 0.2 to 8.4 ppm in excavation area",
    "Well stabilization criteria met before all sampling",
    "Air monitoring readings below action levels throughout day",
    "Effluent meets discharge criteria (benzene non-detect)",
  ],
  observations: [
    "Petroleum contamination indicators strongest on north sidewall of excavation",
    "Water clarity improving in MW-2 and MW-3",
    "Clay confining unit identified at 15-18 ft in expansion area",
  ],
};

export const mockMetrics: DailySummaryMetrics = {
  reportsSubmitted: 7,
  totalWorkers: 9,
  missingReports: 2,
  totalHoursWorked: 59,
  activeCrews: 3,
  safetyIssues: 1,
};

export const mockWeather: WeatherSummary = {
  tempLow: 42,
  tempHigh: 58,
  windSpeed: 12,
  windDirection: "NW",
  precipitation: "None",
  cloudCover: "Partly Cloudy",
};

export const mockShift: ShiftInfo = {
  shiftType: "Day",
  startTime: "6:00 AM",
  endTime: "4:30 PM",
  workersAssigned: 9,
};

export const mockMaterials: SiteMaterials = {
  bentoniteUsed: "1,200 lbs",
  slurryBatches: 4,
  backfillPlaced: "28 cubic yards",
  loadsHauled: 12,
};

export const mockEquipment: SiteEquipment[] = [
  { name: "CAT 320 Excavator", count: 2 },
  { name: "Articulated Dump Truck", count: 3 },
  { name: "Vacuum Truck", count: 1 },
  { name: "Direct Push Drill Rig", count: 1 },
  { name: "Water Truck", count: 1 },
  { name: "GAC Treatment System", count: 1 },
];

export const mockPlannedActivities: PlannedActivity[] = [
  { activity: "Continue Zone B-3 confirmation sampling" },
  { activity: "Begin excavation of Zone C-1 (west section)" },
  { activity: "Complete GAC media change-out" },
  { activity: "Dispose of staged IDW drums" },
  { activity: "Install 2 new monitoring wells (MW-7, MW-8)" },
];
