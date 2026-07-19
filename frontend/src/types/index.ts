export interface User {
  id: string;
  name: string;
  email: string;
  createdAt?: string;
}

export type Priority = "LOW" | "MEDIUM" | "HIGH";
export type Status = "TODO" | "IN_PROGRESS" | "COMPLETED";

export interface Task {
  id: string;
  title: string;
  description: string | null;
  dueDate: string;
  priority: Priority;
  status: Status;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface ChartDataPoint {
  name: string;
  value: number;
}

export interface AnalyticsData {
  statusDistribution: ChartDataPoint[];
  priorityBreakdown: ChartDataPoint[];
  summary: {
    totalActive: number;
    completedToday: number;
    overdue: number;
  };
}