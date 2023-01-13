import { PrismaClient } from ".prisma/client";
import { IUser } from "./IUser";

export interface IContext {
  req: any,
  res: any,
  user?: IUser,
  prisma: PrismaClient,
}