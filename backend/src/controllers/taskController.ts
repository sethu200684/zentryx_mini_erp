import { Request, Response } from "express";
import prisma from "../lib/prisma";

export async function createTask(req: Request, res: Response) {
  try {
    const { title, description, dueDate, priority } = req.body;
    const userId = req.user!.userId;

    if (!title || !dueDate || !priority) {
      return res.status(400).json({ message: "Title, due date, and priority are required" });
    }

    const validPriorities = ["LOW", "MEDIUM", "HIGH"];
    if (!validPriorities.includes(priority)) {
      return res.status(400).json({ message: "Priority must be LOW, MEDIUM, or HIGH" });
    }

    const task = await prisma.task.create({
      data: {
        title,
        description: description || null,
        dueDate: new Date(dueDate),
        priority,
        userId,
      },
    });

    return res.status(201).json({ task });
  } catch (error) {
    console.error("Create task error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
}

export async function getTasks(req: Request, res: Response) {
  try {
    const userId = req.user!.userId;

    const tasks = await prisma.task.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    return res.status(200).json({ tasks });
  } catch (error) {
    console.error("Get tasks error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
}

export async function getTaskById(req: Request, res: Response) {
  try {
    const userId = req.user!.userId;
    const { id } = req.params;

    const task = await prisma.task.findFirst({
      where: { id, userId },
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json({ task });
  } catch (error) {
    console.error("Get task error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
}

export async function updateTask(req: Request, res: Response) {
  try {
    const userId = req.user!.userId;
    const { id } = req.params;
    const { title, description, dueDate, priority, status } = req.body;

    const existingTask = await prisma.task.findFirst({
      where: { id, userId },
    });

    if (!existingTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    const validPriorities = ["LOW", "MEDIUM", "HIGH"];
    if (priority && !validPriorities.includes(priority)) {
      return res.status(400).json({ message: "Priority must be LOW, MEDIUM, or HIGH" });
    }

    const validStatuses = ["TODO", "IN_PROGRESS", "COMPLETED"];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({ message: "Status must be TODO, IN_PROGRESS, or COMPLETED" });
    }

    const updatedTask = await prisma.task.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(dueDate !== undefined && { dueDate: new Date(dueDate) }),
        ...(priority !== undefined && { priority }),
        ...(status !== undefined && { status }),
      },
    });

    return res.status(200).json({ task: updatedTask });
  } catch (error) {
    console.error("Update task error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
}

export async function deleteTask(req: Request, res: Response) {
  try {
    const userId = req.user!.userId;
    const { id } = req.params;

    const existingTask = await prisma.task.findFirst({
      where: { id, userId },
    });

    if (!existingTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    await prisma.task.delete({ where: { id } });

    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Delete task error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
}