import { FindManyMusicArgs, Music, CreateOneMusicArgs } from "@generated/type-graphql";
import { Args, Ctx, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import Auth from "../middlewares/Auth";
import AdminAuth from '../middlewares/AdminAuth'
import { IContext } from "../interfaces/IContext";

@Resolver(Music)
export class MusicResolver {

  @Query(() => [Music])
  async listAllMusics(@Ctx() ctx: IContext, @Args(() => FindManyMusicArgs) args: FindManyMusicArgs): Promise<Music[]> {
    const musics = await ctx.prisma.music.findMany(args)
    return musics
  }

  @Mutation(() => String)
  @UseMiddleware(Auth, AdminAuth)
  async addMusic(@Ctx() ctx: IContext, @Args(() => CreateOneMusicArgs) { data }: CreateOneMusicArgs): Promise<String> {
    console.log(data)
    const createdMusic = await ctx.prisma.music.create({ data })
    if (!createdMusic) throw Error('internal error')
    return 'created'
  }

}