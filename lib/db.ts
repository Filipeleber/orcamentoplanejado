import { PrismaClient } from "@prisma/client";

declare global {
  // Permite usar var global para o prisma sem erro de TypeScript
  var prisma: PrismaClient | undefined;
}

export const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}