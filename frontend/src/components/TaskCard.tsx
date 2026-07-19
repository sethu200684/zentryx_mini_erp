"use client";

import { Task, Status } from "@/types";

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: Status) => void;
}

const priorityStyles: Record<string, string> = {
  LOW: "bg-gray-100 text-gray-600",
  MEDIUM: "bg-yellow-100 text-yellow-700",
  HIGH: "bg-red-100 text-red-700",
};

const statusStyles: Record<string, string> = {
  TODO: "bg-gray-100 text-gray-600",
  IN_PROGRESS: "bg-blue-100 text-blue-700",
  COMPLETED: "bg-green-100 text-green-700",
};

export default function TaskCard({ task, onEdit, onDelete, onStatusChange }: TaskCardProps) {
  const isOverdue =
    task.status !== "COMPLETED" && new Date(task.dueDate) < new Date(new Date().toDateString());

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-medium text-gray-900">{task.title}</h3>
        <span className={`text-xs px-2 py-1 rounded-full font-medium ${priorityStyles[task.priority]}`}>
          {task.priority}
        </span>
      </div>

      {task.description && (
        <p className="text-sm text-gray-500 line-clamp-2">{task.description}</p>
      )}

      <div className="flex items-center justify-between text-sm">
        <span className={isOverdue ? "text-red-600 font-medium" : "text-gray-500"}>
          Due {new Date(task.dueDate).toLocaleDateString()}
          {isOverdue && " (Overdue)"}
        </span>

        <select
          value={task.status}
          onChange={(e) => onStatusChange(task.id, e.target.value as Status)}
          className={`text-xs px-2 py-1 rounded-full font-medium border-none focus:outline-none focus:ring-2 focus:ring-blue-500 ${statusStyles[task.status]}`}
        >
          <option value="TODO">To Do</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
        </select>
      </div>

      <div className="flex gap-2 pt-2 border-t border-gray-100">
        <button
          onClick={() => onEdit(task)}
          className="flex-1 text-sm text-gray-600 hover:text-blue-600 font-medium py-1"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="flex-1 text-sm text-gray-600 hover:text-red-600 font-medium py-1"
        >
          Delete
        </button>
      </div>
    </div>
  );
}