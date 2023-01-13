import { PrismaClient } from ".prisma/client";
import { IContext } from "./interfaces/IContext";

const prisma = new PrismaClient()

export const context = async ({ req, res }: any) => {
  const context: IContext = {
    req,
    res,
    prisma
  }
  return context
}