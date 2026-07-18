import { Request, Response } from "express";
import prisma from "../lib/prisma";

export async function getAnalytics(req: Request, res: Response) {
  try {
    const userId = req.user!.userId;

    const tasks = await prisma.task.findMany({
      where: { userId },
    });

    // Status distribution (for pie/donut chart)
    const statusCounts = {
      TODO: 0,
      IN_PROGRESS: 0,
      COMPLETED: 0,
    };

    // Priority breakdown (for bar chart)
    const priorityCounts = {
      LOW: 0,
      MEDIUM: 0,
      HIGH: 0,
    };

    let completedToday = 0;
    let overdue = 0;

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    const now = new Date();

    for (const task of tasks) {
      statusCounts[task.status]++;
      priorityCounts[task.priority]++;

      if (
        task.status === "COMPLETED" &&
        task.updatedAt >= startOfToday &&
        task.updatedAt <= endOfToday
      ) {
        completedToday++;
      }

      if (task.status !== "COMPLETED" && new Date(task.dueDate) < now) {
        overdue++;
      }
    }

    const totalActive = tasks.filter((t) => t.status !== "COMPLETED").length;

    return res.status(200).json({
      statusDistribution: [
        { name: "To Do", value: statusCounts.TODO },
        { name: "In Progress", value: statusCounts.IN_PROGRESS },
        { name: "Completed", value: statusCounts.COMPLETED },
      ],
      priorityBreakdown: [
        { name: "Low", value: priorityCounts.LOW },
        { name: "Medium", value: priorityCounts.MEDIUM },
        { name: "High", value: priorityCounts.HIGH },
      ],
      summary: {
        totalActive,
        completedToday,
        overdue,
      },
    });
  } catch (error) {
    console.error("Analytics error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
}