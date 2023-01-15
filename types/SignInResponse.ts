import { Field, ObjectType } from "type-graphql"

@ObjectType()
class DataUser {
  @Field(() => Number)
  id: number
  @Field(() => String)
  username: string
  @Field(() => String)
  instagram: string | null
  @Field(() => String)
  youtubeLink: string | null
  @Field(() => String)
  spotifyLink: string | null
  @Field(() => Boolean)
  isAdmin: boolean

}

@ObjectType()
export default class SignInResponse {
  @Field(() => String)
  token: string
  @Field(() => DataUser)
  user: DataUser
}