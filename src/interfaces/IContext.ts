import { PrismaClient } from ".prisma/client";

export interface IContext {
  req: any
  prisma: PrismaClient,
}