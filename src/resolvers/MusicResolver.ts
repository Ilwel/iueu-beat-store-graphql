import { FindManyMusicArgs, Music } from "@generated/type-graphql";
import { Args, Ctx, Query, Resolver } from "type-graphql";
import { IContext } from "../interfaces/IContext";

@Resolver(Music)
export class MusicResolver {

  @Query(() => [Music])
  async listAllMusics(@Ctx() ctx: IContext, @Args(() => FindManyMusicArgs) args: FindManyMusicArgs): Promise<Music[]> {
    const musics = await ctx.prisma.music.findMany(args)
    return musics
  }

}