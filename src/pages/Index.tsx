import { useState } from "react";
import { PageHeader } from "@/components/reports/PageHeader";
import { StatusDashboard } from "@/components/reports/StatusDashboard";
import { DailySiteSummary } from "@/components/reports/DailySiteSummary";
import { WorkerReportsTable } from "@/components/reports/WorkerReportsTable";
import { WeatherSummary } from "@/components/reports/WeatherSummary";
import { SiteMaterialsSummary } from "@/components/reports/SiteMaterialsSummary";
import { SiteEquipmentSummary } from "@/components/reports/SiteEquipmentSummary";
import { PlannedActivities } from "@/components/reports/PlannedActivities";
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
    <div className="min-h-screen bg-background">
      {/* Page Header with Job Info, Shift Info, and Date Navigation */}
      <PageHeader
        job={mockJob}
        shift={mockShift}
        selectedDate={selectedDate}
        onPreviousDay={handlePreviousDay}
        onNextDay={handleNextDay}
        onToday={handleToday}
        onYesterday={handleYesterday}
      />

      <main className="p-6 space-y-6">
        {/* 1. Weather Summary - Compact top row */}
        <section>
          <WeatherSummary weather={mockWeather} />
        </section>

        {/* 2. Status Dashboard - Key metrics */}
        <section>
          <StatusDashboard metrics={mockMetrics} />
        </section>

        {/* 3. Daily Site Summary - Prominent AI-generated summary */}
        <section>
          <DailySiteSummary 
            summary={mockSiteSummary} 
            reportCount={submittedReportsCount}
          />
        </section>

        {/* 4. Site-Level Materials & Equipment */}
        <section className="grid gap-6 lg:grid-cols-2">
          <SiteMaterialsSummary materials={mockMaterials} />
          <SiteEquipmentSummary equipment={mockEquipment} />
        </section>

        {/* 5. Planned Activities - Next Shift */}
        <section>
          <PlannedActivities activities={mockPlannedActivities} />
        </section>

        {/* 6. Worker Daily Reports - Compact expandable list */}
        <section>
          <WorkerReportsTable reports={mockWorkerReports} />
        </section>
      </main>
    </div>
  );
};

export default Index;
