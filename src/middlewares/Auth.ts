import { verify } from "jsonwebtoken";
import { Middleware } from "type-graphql/dist/interfaces/Middleware";
import AuthConfig from "../configs/AuthConfig";
import { IContext } from "../interfaces/IContext";
import { IUser } from "../interfaces/IUser";

const Auth: Middleware<IContext> = async ({ context }, next) => {

  const { req: { headers: { authorization } } } = context;
  if (!authorization) {
    return Error('error: unauthorized')
  }
  const token = authorization.split(' ')[1]

  const decoded = verify(token, AuthConfig.jwt.secret) as IUser
  context.user = decoded

  return await next()

}

export default Auth