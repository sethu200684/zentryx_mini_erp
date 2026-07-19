import api from "./api";
import { AnalyticsData } from "@/types";

export async function fetchAnalytics() {
  const res = await api.get<AnalyticsData>("/analytics");
  return res.data;
}