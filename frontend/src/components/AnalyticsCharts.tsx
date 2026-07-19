"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { ChartDataPoint } from "@/types";

interface AnalyticsChartsProps {
  statusDistribution: ChartDataPoint[];
  priorityBreakdown: ChartDataPoint[];
}

const STATUS_COLORS = ["#9CA3AF", "#3B82F6", "#10B981"];
const PRIORITY_COLORS = ["#9CA3AF", "#F59E0B", "#EF4444"];

export default function AnalyticsCharts({
  statusDistribution,
  priorityBreakdown,
}: AnalyticsChartsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <h3 className="text-sm font-medium text-gray-700 mb-4">Task Status Distribution</h3>
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie
              data={statusDistribution}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={2}
            >
              {statusDistribution.map((_, index) => (
                <Cell key={index} fill={STATUS_COLORS[index % STATUS_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <h3 className="text-sm font-medium text-gray-700 mb-4">Priority Breakdown</h3>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={priorityBreakdown}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
            <XAxis dataKey="name" stroke="#6B7280" fontSize={12} />
            <YAxis stroke="#6B7280" fontSize={12} allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="value" radius={[6, 6, 0, 0]}>
              {priorityBreakdown.map((_, index) => (
                <Cell key={index} fill={PRIORITY_COLORS[index % PRIORITY_COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}