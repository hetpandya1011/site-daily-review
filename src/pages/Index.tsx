import { useState } from "react";
import { ReportHeader } from "@/components/reports/ReportHeader";
import { PageHeader } from "@/components/reports/PageHeader";
import { StatusDashboard } from "@/components/reports/StatusDashboard";
import { IssuesRisksCard } from "@/components/reports/IssuesRisksCard";
import { DailySiteSummary } from "@/components/reports/DailySiteSummary";
import { WorkerReportsTable } from "@/components/reports/WorkerReportsTable";
import { WeatherSummary } from "@/components/reports/WeatherSummary";
import { SiteMaterialsSummary } from "@/components/reports/SiteMaterialsSummary";
import { SiteEquipmentSummary } from "@/components/reports/SiteEquipmentSummary";
import { PlannedActivities } from "@/components/reports/PlannedActivities";
import { ReportFooter } from "@/components/reports/ReportFooter";
import {
  mockJob,
  mockWorkerReports,
  mockSiteSummary,
  mockMetrics,
  mockWeather,
  mockShift,
  mockMaterials,
  mockEquipment,
  mockPlannedActivities,
} from "@/data/mockReports";

const Index = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handlePreviousDay = () => {
    setSelectedDate((prev) => {
      const newDate = new Date(prev);
      newDate.setDate(newDate.getDate() - 1);
      return newDate;
    });
  };

  const handleNextDay = () => {
    const today = new Date();
    if (selectedDate.toDateString() !== today.toDateString()) {
      setSelectedDate((prev) => {
        const newDate = new Date(prev);
        newDate.setDate(newDate.getDate() + 1);
        return newDate;
      });
    }
  };

  const handleToday = () => {
    setSelectedDate(new Date());
  };

  const handleYesterday = () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    setSelectedDate(yesterday);
  };

  const submittedReportsCount = mockWorkerReports.filter(r => r.status !== "missing").length;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Report-style Header */}
      <ReportHeader
        job={mockJob}
        shift={mockShift}
        reportDate={selectedDate}
      />

      {/* Date Navigation Bar */}
      <PageHeader
        job={mockJob}
        shift={mockShift}
        selectedDate={selectedDate}
        onPreviousDay={handlePreviousDay}
        onNextDay={handleNextDay}
        onToday={handleToday}
        onYesterday={handleYesterday}
      />

      <main className="flex-1 p-6 space-y-8">
        {/* 1. Weather + KPI Metrics Row */}
        <section className="space-y-3">
          <WeatherSummary weather={mockWeather} />
          <StatusDashboard metrics={mockMetrics} />
        </section>

        {/* 2. Issues/Risks - Prioritized immediately after KPIs */}
        <section>
          <IssuesRisksCard issues={mockSiteSummary.issuesAndRisks} />
        </section>

        {/* 3. Daily Site Summary */}
        <section>
          <DailySiteSummary 
            summary={mockSiteSummary} 
            reportCount={submittedReportsCount}
          />
        </section>

        {/* 4. Site-Level Materials & Equipment */}
        <section>
          <h3 className="report-section-title">Site Resources</h3>
          <div className="grid gap-4 lg:grid-cols-2">
            <SiteMaterialsSummary materials={mockMaterials} />
            <SiteEquipmentSummary equipment={mockEquipment} />
          </div>
        </section>

        {/* 5. Planned Activities - Next Shift */}
        <section>
          <PlannedActivities activities={mockPlannedActivities} />
        </section>

        {/* 6. Worker Daily Reports */}
        <section className="pt-2">
          <h3 className="report-section-title">Individual Worker Reports</h3>
          <WorkerReportsTable reports={mockWorkerReports} />
        </section>
      </main>

      {/* Report Footer */}
      <ReportFooter timezone="America/New_York" />
    </div>
  );
};

export default Index;
