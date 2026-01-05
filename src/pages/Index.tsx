import { useState } from "react";
import { ReportHeader } from "@/components/reports/ReportHeader";
import { WorkerReportsList } from "@/components/reports/WorkerReportsList";
import { SiteSummary } from "@/components/reports/SiteSummary";
import { WorkerReportPanel } from "@/components/reports/WorkerReportPanel";
import {
  mockJob,
  mockWorkerReports,
  mockSiteSummary,
  mockMetrics,
} from "@/data/mockReports";
import { WorkerReport } from "@/types/reports";

const Index = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedReport, setSelectedReport] = useState<WorkerReport | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

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

  const handleSelectReport = (report: WorkerReport) => {
    setSelectedReport(report);
    setIsPanelOpen(true);
  };

  const handleClosePanel = () => {
    setIsPanelOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <ReportHeader
        job={mockJob}
        selectedDate={selectedDate}
        onPreviousDay={handlePreviousDay}
        onNextDay={handleNextDay}
        onToday={handleToday}
        onYesterday={handleYesterday}
        metrics={mockMetrics}
      />

      <main className="p-6">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Left Column: Worker Reports */}
          <div className="rounded-lg border border-border bg-card shadow-sm">
            <WorkerReportsList
              reports={mockWorkerReports}
              selectedReportId={selectedReport?.id ?? null}
              onSelectReport={handleSelectReport}
            />
          </div>

          {/* Right Column: Site Summary */}
          <div className="rounded-lg border border-border bg-card shadow-sm">
            <SiteSummary 
              summary={mockSiteSummary} 
              reportCount={mockWorkerReports.length}
            />
          </div>
        </div>
      </main>

      {/* Slide-out Panel */}
      <WorkerReportPanel
        report={selectedReport}
        isOpen={isPanelOpen}
        onClose={handleClosePanel}
      />
    </div>
  );
};

export default Index;