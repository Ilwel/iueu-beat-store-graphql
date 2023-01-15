import SignInInputData from "../inputs/SignInInputData";
import { IContext } from "../interfaces/IContext";
import { compare, hash } from 'bcrypt'
import AuthConfig from "../configs/AuthConfig";
import { sign } from 'jsonwebtoken'
import { CreateOneUserArgs } from "@generated/type-graphql";
import SignInArgs from "../args/SignInArgs";

export default class UserService {

  public async signUp(ctx: IContext, args: CreateOneUserArgs) {
    const { data } = args
    const password = await hash(data.password, 10)
    const user = await ctx.prisma.user.create({ data: { ...data, password, isAdmin: false } })
    if (!user) throw new Error('internal error')
    return 'user created'
  }

  public async signIn(ctx: IContext, args: SignInArgs) {
    const { data: { username, password } } = args
    const user = await ctx.prisma.user.findUnique({ where: { username } })
    if (!user) throw new Error('wrong user or password')

    const passwordMatched = await compare(password, user.password)

    if (!passwordMatched) throw new Error('wrong user or password')

    const { secret, expiresIn } = AuthConfig.jwt
    const token = sign({
      id: user.id,
      username: user.username,
    }, secret, { expiresIn })
    const { password: pw, ...dataUser } = user
    return {
      token,
      user: dataUser
    }
  }
}