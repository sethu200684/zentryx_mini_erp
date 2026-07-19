"use client";

import { useState, useEffect } from "react";
import { AnalyticsData } from "@/types";
import { fetchAnalytics } from "@/lib/analytics";
import SummaryCard from "@/components/SummaryCard";
import AnalyticsCharts from "@/components/AnalyticsCharts";

export default function DashboardPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAnalytics() {
      try {
        const result = await fetchAnalytics();
        setData(result);
      } catch (err) {
        console.error("Failed to load analytics", err);
      } finally {
        setLoading(false);
      }
    }

    loadAnalytics();
  }, []);

  if (loading) {
    return <p className="text-gray-500">Loading dashboard...</p>;
  }

  if (!data) {
    return <p className="text-gray-500">Failed to load analytics.</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <SummaryCard label="Total Active Tasks" value={data.summary.totalActive} accent="blue" />
        <SummaryCard label="Completed Today" value={data.summary.completedToday} accent="green" />
        <SummaryCard label="Overdue" value={data.summary.overdue} accent="red" />
      </div>

      <AnalyticsCharts
        statusDistribution={data.statusDistribution}
        priorityBreakdown={data.priorityBreakdown}
      />
    </div>
  );
}