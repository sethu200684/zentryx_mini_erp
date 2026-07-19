import api from "./api";
import { AuthResponse } from "@/types";

export async function registerUser(name: string, email: string, password: string) {
  const res = await api.post<AuthResponse>("/auth/register", { name, email, password });
  return res.data;
}

export async function loginUser(email: string, password: string) {
  const res = await api.post<AuthResponse>("/auth/login", { email, password });
  return res.data;
}

export async function getCurrentUser() {
  const res = await api.get<{ user: AuthResponse["user"] }>("/auth/me");
  return res.data.user;
}