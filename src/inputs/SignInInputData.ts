import { Field, InputType } from "type-graphql";

@InputType()
export default class SignInInputData {

  @Field(() => String)
  username: string;

  @Field(() => String)
  password: string;

}