import { Middleware } from "type-graphql/dist/interfaces/Middleware";
import { IContext } from "../interfaces/IContext";

const AdminAuth: Middleware<IContext> = async ({ context }, next) => {
  const { user, prisma } = context
  const dbUser = await prisma.user.findUnique({ where: { id: user?.id } })
  if (!dbUser) throw new Error('user not found')
  if (!dbUser.isAdmin) throw new Error('error: unauthorized, you are not a admin')
  return await next()
}

export default AdminAuth