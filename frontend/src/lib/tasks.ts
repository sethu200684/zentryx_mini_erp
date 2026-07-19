import api from "./api";
import { Task, Priority, Status } from "@/types";

export interface TaskInput {
  title: string;
  description?: string;
  dueDate: string;
  priority: Priority;
  status?: Status;
}

export async function fetchTasks() {
  const res = await api.get<{ tasks: Task[] }>("/tasks");
  return res.data.tasks;
}

export async function createTask(data: TaskInput) {
  const res = await api.post<{ task: Task }>("/tasks", data);
  return res.data.task;
}

export async function updateTask(id: string, data: Partial<TaskInput>) {
  const res = await api.patch<{ task: Task }>(`/tasks/${id}`, data);
  return res.data.task;
}

export async function deleteTask(id: string) {
  await api.delete(`/tasks/${id}`);
}