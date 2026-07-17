import jwt from "jsonwebtoken";
import { JwtPayload } from "../types/express";

const JWT_SECRET = process.env.JWT_SECRET as string;

export function generateToken(payload: JwtPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
}