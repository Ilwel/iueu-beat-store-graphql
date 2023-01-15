import { Args, Ctx, Mutation, Resolver } from "type-graphql";
import { User, CreateOneUserArgs } from "@generated/type-graphql";
import { IContext } from "../interfaces/IContext";
import UserService from "../services/UserService";
import SignInArgs from "../args/SignInArgs";
import SignInResponse from "../../types/SignInResponse";

@Resolver(User)
export default class UserResolver {

  userService = new UserService()

  @Mutation(() => String)
  public async signUp(@Ctx() ctx: IContext, @Args(() => CreateOneUserArgs) args: CreateOneUserArgs) {
    return await this.userService.signUp(ctx, args)
  }

  @Mutation(() => SignInResponse)
  public async signIn(@Ctx() ctx: IContext, @Args(() => SignInArgs) args: SignInArgs) {
    return await this.userService.signIn(ctx, args)
  }

}